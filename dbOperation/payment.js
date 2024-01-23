import paymentSchema from "../models/paymentSchema.js"


export const createPayment = async (user, plan, amount) => {
    try {
        const payment = await new paymentSchema({
            user, plan, amount
        }).save()
        return payment
    } catch (error) {
        throw error
    }
}

export const completePayment = async (_id, paymentData) => {
    try {
        const payment = await paymentSchema.findOneAndUpdate({ _id }, {
            $set: {
                paymentData,
                isCompleted: true
            }
        }, { new: true })
            .populate('plan')
        return payment
    } catch (error) {
        throw error
    }
}
export const getAllPayementDataWithPlanId = async (plan)=>{
    try {
        const payments = await paymentSchema.find({plan,  isCompleted : true})
        .populate('user plan' , 'name _id')
        return payments
    } catch (error) {
        throw error
    }
}
