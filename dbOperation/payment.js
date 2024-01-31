import paymentSchema from "../models/paymentSchema.js"

export const getAllPaymentOfLastMonth = async ()=>{
    try {
        const last30DaysStartDate = new Date();
        last30DaysStartDate.setDate(last30DaysStartDate.getDate() - 30);
        last30DaysStartDate.setHours(0, 0, 0, 0);

        const last30DaysEndDate = new Date();
        last30DaysEndDate.setHours(23, 59, 59, 999);

        const payments = await paymentSchema.find({
            createdAt: {
                $gte: last30DaysStartDate,
                $lte: last30DaysEndDate,
            },
            isCompleted: true, // Optional: If you only want completed payments
        });
        const totalPayments = payments.reduce((total, payment) => {
            // Assuming 'amount' is a string, convert it to double
            const amount = parseFloat(payment.amount) || 0;
            return total + amount;
        }, 0);

        return totalPayments;
    } catch (error) {
        console.error('Error getting last month\'s total payments:', error);
        throw error;
    }
}

export const getLastThiryDaysPaymentList = async ()=>{
    try {
        const last30DaysStartDate = new Date();
        last30DaysStartDate.setDate(last30DaysStartDate.getDate() - 30);
        last30DaysStartDate.setHours(0, 0, 0, 0);

        const last30DaysEndDate = new Date();

        const payments = await paymentSchema.find({
            createdAt: {
                $gte: last30DaysStartDate,
                $lte: last30DaysEndDate,
            },
            isCompleted: true, // Optional: If you only want completed payments
        });
        return payments
    } catch (error) {
        throw error
    }
}



export const createPayment = async (user, plan, amount) => {
    try {
        const payment = await new paymentSchema({
            user, plan, amount
        }).save()
        return payment
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getUserPaymentHistory = async (user)=>{
    try {
        return await paymentSchema.find({user, isCompleted : true})
        .populate('plan')
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
