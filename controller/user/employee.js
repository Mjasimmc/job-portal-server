import { AddEducationToUser, getEducationOfUser } from "../../dbOperation/education.js";
import { createEmployeeProfile, findEmployeeWithUser, updateWithUserIdEmployeeProfile } from "../../dbOperation/employee.js";
import { findEmployerWithUser } from "../../dbOperation/employer.js";
import { addExperienceToUser, getExperienceOfUser } from "../../dbOperation/experience.js";
import { updateEmployee } from "../../dbOperation/userMangement.js";

export const updateEmployeeProfile = async (req, res) => {
    
    try {
        const user = req.user._id
        const employeeExist = await findEmployeeWithUser(user)
        let employee = null;
        if (employeeExist) {
            employee = await updateWithUserIdEmployeeProfile({ ...req.body, user })
        } else {
            employee = await createEmployeeProfile({ ...req.body, user })
            await updateEmployee(req.user._id, employee._id)
        }
        res.status(200).send(employee)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}

export const getEmployeeData = async (req, res) => {
    try {
        const user = req.user._id
        const employee = await findEmployeeWithUser(user)
        const education = await getEducationOfUser(user)
        const experience = await getExperienceOfUser(user)
        res.status(200).send({ employee, education, experience })
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}


export const AddEducation = async (req, res) => {
    try {
        const {
            degree,
            college,
            course,
            graduationStartDate,
            graduationEndDate,
        } = req.body

        const education = await AddEducationToUser(req.user._id, degree, college, course, graduationStartDate, graduationEndDate)
        res.status(200).send(education)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}

export const addExperience = async (req, res) => {
    try {
        const {
            position, company, employmentStartDate, employmentEndDate
        } = req.body
        const experience = await addExperienceToUser(req.user._id, position, company, employmentStartDate, employmentEndDate)
        res.status(200).send(experience)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}
