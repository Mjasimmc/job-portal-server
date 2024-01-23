import { getAllPayementDataWithPlanId } from "../../dbOperation/payment.js"
import { createSubscriptionPlan, findPlanDataWithId, getAllPlans, updateWithSubscriptionPlan } from "../../dbOperation/subscriptionPlan.js"

export const createNewSubscriptionPlan = async (req, res) => {
    try {
        const { name,
            duration,
            cost,
            jobLimit, } = req.body

        await createSubscriptionPlan(name, cost, duration, jobLimit)

        res.status(200).send('plan created successfully')
    } catch (error) {
        res.status(500).send('internal server error')
    }
}
export const updateSubscriptionPlan = async (req, res) => {
    try {
        const { name,
            duration,
            cost,
            jobLimit, _id } = req.body
        await updateWithSubscriptionPlan(name, cost, duration, jobLimit, _id)
        res.status(200).send('plan created successfully')
    } catch (error) {
        res.status(500).send('internal server error')
    }
}


export const getAllSubscriptionPlansData = async (req, res) => {
    try {
        const plans = await getAllPlans()
        res.status(200).send(plans)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

export const getPlanWithId = async (req, res) => {
    try {
        const { plan_id } = req.params
        const plan = await findPlanDataWithId(plan_id)
        res.status(200).send(plan)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

export const getAllPlanPurchases = async (req,res)=>{
    try {
        const plan = req.params.plan_id
        const plans = await getAllPayementDataWithPlanId(plan)
        res.status(200).send(plans)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}