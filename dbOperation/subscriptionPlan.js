import subscriptionPlanSchema from "../models/subscriptionPlanSchema.js";


export const createSubscriptionPlan = async (name, price, duration, jobPostLimit) => {
    try {
        const newSubscriptionPlan = await new subscriptionPlanSchema({
            name,
            price,
            duration,
            jobPostLimit,
        }).save();
        return newSubscriptionPlan;
    } catch (error) {
        throw error;
    }
};

export const updateWithSubscriptionPlan = async (name, price, duration, jobPostLimit, _id) => {
    try {
        const newSubscriptionPlan = await subscriptionPlanSchema.findOneAndUpdate({ _id }, {
            $set: {
                name,
                price,
                duration,
                jobPostLimit,
            }
        }, { new: true })
        return newSubscriptionPlan;
    } catch (error) {
        throw error;
    }
};

export const getAllPlans = async () => {
    try {
        return await subscriptionPlanSchema.find()
    } catch (error) {
        throw error;
    }
}
export const findPlanDataWithId = async (_id) => {
    try {
        return await subscriptionPlanSchema.findOne({ _id })
    } catch (error) {
        throw error
    }
}