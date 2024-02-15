import { findUserWithUserId } from "../../dbOperation/userMangement.js"
import { decodeJwtToken } from "./jwtAuth.js"

export const validateUser = async (req, res, next) => {
    try {
        const decoded = decodeJwtToken(req.headers.authorization);
        const user = await findUserWithUserId(decoded._id);
        if (!user) {
            return res.status(404).send("user not found");
        }
        if (user.block) {
            return res.status(403).send("User is blocked.");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send("User not validated");
    }
};
export const validateAdmin = async (req,res,next)=>{
    try {
        const decoded =  decodeJwtToken(req.headers.authorization)
        next()
    } catch (error) {
        res.status(401).send("user not validated")
    }
}