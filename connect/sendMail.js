// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendMail = async (toMail,textToSend) => {
    try {

        const mailOptions = {
            from: "CareerHarbor",
            to: toMail,
            subject: 'Test Email',
            text: textToSend,
        };
        const sended = await transporter.sendMail(mailOptions);
        return sended
    } catch (error) {
        throw error
    }
}