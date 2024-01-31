import { getAllJobPosts } from "../../dbOperation/job.js"
import { getAllPaymentOfLastMonth, getLastThiryDaysPaymentList } from "../../dbOperation/payment.js"
import { findAllUsersDate } from "../../dbOperation/userMangement.js"
import { findAllUserPlansActive } from "../../dbOperation/userSubscription.js"

export const getDashboardData = async (req, res) => {
    try {
        const users = await findAllUsersDate()
        const jobs = await getAllJobPosts()
        const userSubscribed = await findAllUserPlansActive()
        const lastMonthTotalPayment = await getAllPaymentOfLastMonth()
        res.status(200).send({
            users: users.length,
            jobs: jobs.length,
            userSubscribed: userSubscribed.length,
            lastMonthTotalPayment
        })
    } catch (error) {

        res.status(500).send('internal server error')
    }
}

export const chartDataofLastMonth = async (req, res) => {
    try {
        const last30DaysStartDate = new Date();
        last30DaysStartDate.setDate(last30DaysStartDate.getDate() - 30);
        const last30DaysEndDate = new Date();
        last30DaysEndDate.setHours(23, 59, 59, 999);
        const payments = await getLastThiryDaysPaymentList()
        const paymentsByDate = new Map();
        payments.forEach(payment => {
            const date = payment.createdAt.toISOString().split('T')[0];
            const amount = parseFloat(payment.amount) || 0;
            if (!paymentsByDate.has(date)) {
                paymentsByDate.set(date, []);
            }

            paymentsByDate.get(date).push(amount);
        });
        const chartData = [];
        let currentDate = new Date(last30DaysStartDate);
        while (currentDate <= last30DaysEndDate) {
            const dateKey = currentDate.toISOString().split('T')[0];
            const dailyPayments = paymentsByDate.get(dateKey) || [];
            const dailyTotal = dailyPayments.reduce((total, amount) => total + amount, 0);
            chartData.push([dateKey, dailyTotal]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        res.status(200).send(chartData)
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}