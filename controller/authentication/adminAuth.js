import { createJwtToken } from "./jwtAuth.js"


const auth = {
    email: 'admin@gmail.com',
    password: 'Jasim123@'
}
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email !== auth.email || password !== auth.password) {
            return res.status(404).send("un authorized entry")
        }
        const token = await createJwtToken({ email, password })
        res.status(200).send({ token })
    } catch (error) {
        res.status(500).send('internal server error')
    }
}