import otpSchema from "../models/otpSchema.js"

export const saveOtp = async (otp, user) => {
    try {
        const newOtp = await new otpSchema({
            otp,
            user
        }).save()
        return newOtp._id
    } catch (error) {
        throw error
    }
}

export const getOtpWithId = async (otp_id) => {
    try {
        const data = await otpSchema.findOne({ _id: otp_id })
        .populate('user')
        return data
    } catch (error) {
        throw error
    }
}

export const updateOtpWithNewOtp = async (user, otp) => {
    try {
        const data = await otpSchema.findOneAndUpdate({ user }, {
            $set: {
                otp,
                used: false
            }
        }, { new: true })
        return data._id
    } catch (error) {
        throw error
    }
}
