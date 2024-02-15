import express from 'express'
import {
    blockUserWithId,
    createNewUserAdmin,
    getAllUsersData,
    getUserEmployeeData,
    getuserWithId,
    unBlockUserWithId
} from '../controller/admin/userMangement.js'
import { createNewSubscriptionPlan, getAllPlanPurchases, getAllSubscriptionPlansData, getPlanWithId, updateSubscriptionPlan } from '../controller/admin/subscription.js'
import { adminGetJobDetail, getAdminFilteredData } from '../controller/admin/jobManagement.js'
import { chartDataofLastMonth, getDashboardData } from '../controller/admin/dashboard.js'
const router = express()

router.use((req,res,next)=>{
    console.log( req.method +" : "+ req.url)
    next()
})

router.get('/get-all-users', getAllUsersData)
router.get('/get-user/:userId',getuserWithId)
router.get('/get-user-employee/:userId',getUserEmployeeData)


router.post('/create-user', createNewUserAdmin)
router.post('/update-user', createNewUserAdmin)


router.put('/create-subscription-plan', createNewSubscriptionPlan)
router.put('/update-subscription-plan', updateSubscriptionPlan)
router.get('/get-all-plans', getAllSubscriptionPlansData)

router.get('/get-plan-with-id/:plan_id', getPlanWithId)

router.post('/get-all-filtered-jobs',getAdminFilteredData)
router.get('/get-job-data/:jobId',adminGetJobDetail)


router.get('/get-all-plan-purchases/:plan_id',getAllPlanPurchases)


router.get('/get-home-data',getDashboardData)

router.get('/chart-data',chartDataofLastMonth)


router.get('/block-user/:userId',blockUserWithId)
router.get('/unblock-user/:userId',unBlockUserWithId)

export default router