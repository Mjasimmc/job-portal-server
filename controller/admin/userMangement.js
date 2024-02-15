import { getEducationOfUser } from "../../dbOperation/education.js"
import { findEmployeeWithUser } from "../../dbOperation/employee.js"
import { getExperienceOfUser } from "../../dbOperation/experience.js"
import { blockUser, createNewUser, findAllUsersDate, findUserWithEmail, findUserWithName, findUserWithPhone, findUserWithUserId, unBlockUser, updateUserProfileData } from "../../dbOperation/userMangement.js"
import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10)
    } catch (error) {
        throw error
    }
}
export const getuserWithId = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await findUserWithUserId(userId)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}

export const blockUserWithId = async (req, res) => {
    try {
       
        const { userId } = req.params
        const user = await blockUser(userId)
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}
export const unBlockUserWithId = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await unBlockUser(userId)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}


export const getUserEmployeeData = async (req, res) => {
    try {
        const { userId } = req.params
        const employee = await findEmployeeWithUser(userId)
        const education = await getEducationOfUser(userId)
        const experience = await getExperienceOfUser(userId)
        res.status(200).send({ employee, education, experience })
    } catch (error) {
        CONSOL
        res.status(500).send("internal server error")
    }
}

// const generateOtp = () => Math.floor(Math.random() * 1000000)

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
        const { name, email, phone, password, userId } = req.body
        // const emailExist = await findUserWithEmail(email)
        // const nameExist = await findUserWithName(name)
        // const phoneExist = await findUserWithPhone(phone)
        // 

        const hashPass = await hashPassword(password)
        const createdUser = await updateUserProfileData(userId, name, email, phone, hashPass)

        res.status(200).send(createdUser)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}