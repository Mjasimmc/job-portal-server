import { decodeJwtToken } from "./jwtAuth.js"

export const validateUser = async (req,res,next)=>{
    try {
        const decoded =  decodeJwtToken(req.headers.authorization)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send("user not validated")
    }
}
export const validateAdmin = async (req,res,next)=>{
    try {
        const decoded =  decodeJwtToken(req.headers.authorization)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send("user not validated")
    }
}