
import { findUserWithUserId } from '../../dbOperation/userMangement.js'
import { loggedData } from '../authentication/userAuth.js'
export const authenticateUser = async (req,res)=>{
    try {
        const user = await findUserWithUserId(req.user._id)
        const response = loggedData(user)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}