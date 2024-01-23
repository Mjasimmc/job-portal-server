import { sendMail } from "../../connect/sendMail.js"
import { getOtpWithId, saveOtp, updateOtpWithNewOtp } from "../../dbOperation/otpManagement.js"
import {
    createNewUser,
    findUserWithEmail,
    findUserWithName,
    findUserWithPhone,
    updatePassword,
    validateEmail
} from "../../dbOperation/userMangement.js"
import bcrypt from 'bcrypt'
import { createJwtToken } from "./jwtAuth.js"

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10)
    } catch (error) {
        throw error
    }
}
const comparePassword = async (password, hashPass) => {
    try {
        const passMatch = await bcrypt.compare(password, hashPass)
        return passMatch
    } catch (error) {
        throw error
    }
}

const generateOtp = () => Math.floor(Math.random() * 1000000)


export const loggedData = (data) => {
    try {
        const { name, email, _id, phone } = data
        const token = createJwtToken({
            name, _id, email, phone
        })
        const result = { name, email, token, phone , _id }
        return result
    } catch (error) {
        throw error
    }
}

export const userRegister = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        const emailExist = await findUserWithEmail(email)
        const nameExist = await findUserWithName(name)
        const phoneExist = await findUserWithPhone(phone)
        if (emailExist || nameExist || phoneExist) {
            return res.status(401).send("user already exist")
        }
        const hashPass = await hashPassword(password)
        const createdUser = await createNewUser(name, email, phone, hashPass)
        const otp = generateOtp()
        await sendMail(email, "Your Otp Is " + otp)
        const sendOtp = await saveOtp(otp, createdUser._id)
        res.status(200).send(sendOtp)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

export const validateEmailOtp = async (req, res) => {
    try {
        const { otp, otp_id } = req.body
        const data = await getOtpWithId(otp_id)
        if (data.otp != otp) {
            return res.status(404).send("otp not validated")
        }
        const user = await validateEmail(data.user)
        const result = loggedData(user)
        res.status(200).send(result)    
    } catch (error) {
        res.status(500).send('internal server error')
    }
}


export const userLogin = async (req, res) => {
    try {
        const { password, userId } = req.body
        const emailExist = await findUserWithEmail(userId)
        const nameExist = await findUserWithName(userId)
        const user = emailExist || nameExist
        if (!user) {
            return res.status(401).send("user not found")
        }
        const passMatch = await comparePassword(password , user.password)
        if (!passMatch) {
            return res.status(401).send("password not match")
        }

        if(!user.email.validated){
            return res.status(203).send('email not validated')
        }
        
        const result = loggedData(user)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

export const getNewOtpForUser = async (req,res)=>{
    try {
        const {email} = req.body
        const emailExist = await findUserWithEmail(email)
        if(!emailExist){
            return res.status(404).send("user not found")
        }
        const otp = generateOtp()
        await sendMail(email, "Your Otp Is " + otp)
        const date = new Date()
        const sendOtp = await updateOtpWithNewOtp(emailExist._id, otp)
        res.status(200).send({otp_id:sendOtp,date})
    } catch (error) {   
        res.status(500).send('internal server error')
    }
}


export const changePassword = async (req,res)=>{
    try {
      const {email,password} = req.body
      const hashPass = await hashPassword(password)
        const user = await updatePassword(email,hashPass)
        const result = loggedData(user)
        res.status(200).send(result)     
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}