import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config()
const jwtSecret = process.env.JWT_SECRET || 'secret'
export const decodeJwtToken = (token) => {
    try {
        const decodedData = jwt.verify(token, jwtSecret)
        return decodedData;
    } catch (error) {
        throw "not validated";
    }
}

export const createJwtToken = (data) => {
    const token = jwt.sign(data, jwtSecret, { expiresIn: '7d' })
    return token
}
