import { createJwtToken } from "./jwtAuth.js"

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await createJwtToken({email,password})
        res.status(200).send({token})
    } catch (error) {
        res.status(500).send('internal server error')
    }
}