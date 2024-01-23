import { createNewUser, findAllUsersDate, findUserWithEmail, findUserWithName, findUserWithPhone, updateUserProfileData } from "../../dbOperation/userMangement.js"
import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10)
    } catch (error) {
        throw error
    }
}

const generateOtp = () => Math.floor(Math.random() * 1000000)

export const getAllUsersData = async (req, res) => {
    try {
        const users = await findAllUsersDate()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}


export const createNewUserAdmin = async (req, res) => {
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

        res.status(200).send(createdUser)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { name, email, phone, password,userId } = req.body
        // const emailExist = await findUserWithEmail(email)
        // const nameExist = await findUserWithName(name)
        // const phoneExist = await findUserWithPhone(phone)
        // 
        
        const hashPass = await hashPassword(password)
        const createdUser = await updateUserProfileData(userId,name, email, phone,hashPass)

        res.status(200).send(createdUser)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}