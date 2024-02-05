import { findUserWithUserId } from "../../dbOperation/userMangement.js"
import { decodeJwtToken } from "./jwtAuth.js"

export const validateUser = async (req,res,next)=>{
    try {
        const decoded =  decodeJwtToken(req.headers.authorization)
        const user = await findUserWithUserId(decoded._id)
        if(!user){
            throw "user not found"
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send("user not validated")
    }
}
export const validateAdmin = async (req,res,next)=>{
    try {
        const decoded =  decodeJwtToken(req.headers.authorization)
        next()
    } catch (error) {
        res.status(401).send("user not validated")
    }
}