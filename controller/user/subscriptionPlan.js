import { findPlanDataWithId, getAllPlans } from "../../dbOperation/subscriptionPlan.js"
import StripeImport from 'stripe';
import { findUserWithUserId } from "../../dbOperation/userMangement.js";
const stripe = StripeImport(process.env.STRIPE_SECRET_KEY)
import Razorpay from "razorpay";
import { createPayment, completePayment, getUserPaymentHistory } from "../../dbOperation/payment.js";
// const crypto = require('crypto');
import crypto from 'crypto'
import { createNewPlan, findUserPlanbWithUserId, updatePlan } from "../../dbOperation/userSubscription.js";

const verifyRazorpaySignature = (orderId, razorpayPaymentId, razorpaySignature, secret) => {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${orderId}|${razorpayPaymentId}`);
    const generatedSignature = hmac.digest('hex');

    return generatedSignature === razorpaySignature;
}
export const getAllSubscriptionsForUser = async (req, res) => {
    try {
        const planDatas = await getAllPlans()
        res.status(200).send(planDatas)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

export const userGetPlanDataWithId = async (req, res) => {
    try {
        const { planId } = req.params
        const planDatas = await findPlanDataWithId(planId)
        res.status(200).send(planDatas)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

export const paymentRazorpay = async (req, res) => {
    try {
        const { amount, planId } = req.body
        console.log(amount,planId)
        console.log(process.env.RAZORPAY_KEY_ID ,process.env.RAZORPAY_KEY_ID)
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const orderCreated = await createPayment(req.user._id, planId, amount)
        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: orderCreated._id,
        };
        const order = await instance.orders.create(options);
        console.log(order)
        if (!order) return res.status(500).send("Some error occured");
        // const order = {
        //     id: 'order_NVTNPzNSy7cyec',
        //     entity: 'order',
        //     amount: 900,
        //     amount_paid: 0,
        //     amount_due: 900,
        //     currency: 'INR',
        //     receipt: '65bb14de1f39c69bc3506a64',
        //     offer_id: null,
        //     status: 'created',
        //     attempts: 0,
        //     notes: [],
        //     created_at: 1706759390
        //   }
        res.status(200).send({ order, key_id: process.env.RAZORPAY_KEY_ID, orderId: orderCreated._id });
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}



export const completePaymentValidationAndCredit = async (req, res) => {
    try {
        const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const validatePayment = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature, process.env.RAZORPAY_SECRET);
        if (!validatePayment) return res.status(404).send('Unauthorized payment');
        const payment = await completePayment(orderId, {
            razorpay_payment_id, razorpay_order_id, razorpay_signature
        });

        const planExist = await findUserPlanbWithUserId(req.user._id);
        let updatedPlan = null;
        let durationDate = new Date();
        durationDate = durationDate.setMonth(durationDate.getMonth() + payment.plan.duration);
        if (!planExist) {
            updatedPlan = await createNewPlan(req.user._id, payment.plan.jobPostLimit, durationDate);
        } else {
            updatedPlan = await updatePlan(req.user._id, payment.plan.jobPostLimit, durationDate);
        }
        res.status(200).send(updatedPlan);
    } catch (error) {
       
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getSelfPlanDetailsWithUserId = async (req, res) => {
    try {
        const plan = await findUserPlanbWithUserId(req.user._id)
        const paymentHistory = await getUserPaymentHistory(req.user._id)
        res.status(200).send({ plan, paymentHistory })
    } catch (error) {
        
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
}