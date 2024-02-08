import userPlanSchema from "../models/userSubscriptionPurschaseHistory.js"

export const findAllUserPlansActive = async (req, res) => {
    try {
        const date = new Date()
        const plans = await userPlanSchema.find({ expiryDate: { $gt: date } })
        return plans
    } catch (error) {
        throw error
    }
}
export const findUserPlanbWithUserId = async (user) => {
    try {
        const planHistory = await userPlanSchema.findOne({ user })
        return planHistory
    } catch (error) {
        throw error
    }
}

export const updatePlan = async (user, limit, expiryDate) => {
    try {
        const updatedPlan = await userPlanSchema.findOneAndUpdate({ user }, {
            $inc: { jobLimit: limit },
            $set: { expiryDate: expiryDate },
        }, { new: true });
        return updatedPlan;
    } catch (error) {
        throw error;
    }
};

export const updateDecrementPlan = async (user) => {
    try {
        const updatedPlan = await userPlanSchema.findOneAndUpdate({ user }, {
            $inc: { jobLimit: -1 }
        }, { new: true });
        return updatedPlan;
    } catch (error) {
        throw error;
    }
};


export const createNewPlan = async (user, jobLimit, expiryDate) => {
    try {
        const plan = await new userPlanSchema({
            user, jobLimit,
            expiryDate
        }).save()
        return plan
    } catch (error) {
        throw error
    }
}