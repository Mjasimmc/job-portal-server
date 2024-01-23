import { findUserWithEmail } from "../../dbOperation/userMangement.js"

const generateOtp = () => Math.floor(Math.random() * 1000000)

export const sendEmailForgetPassword = async (req,res)=>{
    try {
        const {email} = req.body
        const emailExist = await findUserWithEmail(email)
        if(!emailExist){
            return res.status(404).send("user not found")
        }
        const otp = generateOtp()
        await sendMail(email, "Your Otp Is " + otp)
        const sendOtp = await updateOtpWithNewOtp(emailExist._id, otp)
        res.status(200).send(sendOtp)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}