
import { createEmployer,  findEmployerWithUser, updateEmployerDataWithUser } from "../../dbOperation/employer.js"
import { updateEmployer } from "../../dbOperation/userMangement.js";


export const createEmployerProfile = async (req, res) => {
    try {
        const user = req.user._id
        const employerExist = await findEmployerWithUser(user)
        let employer = req.body;
        if (employerExist) {
            employer = await updateEmployerDataWithUser({ ...req.body }, employerExist._id)
        } else {
            employer = await createEmployer({ ...employer, user })
            await updateEmployer(user, employer._id)
        }
        res.status(200).send("employer updated")
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}

export const getEmployerData = async (req, res) => {
    try {
        const user = req.user._id
        const employerExist = await findEmployerWithUser(user)
        res.status(200).send(employerExist)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}
