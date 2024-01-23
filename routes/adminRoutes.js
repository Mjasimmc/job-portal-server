import express from 'express'
import {
    createNewUserAdmin,
    getAllUsersData
} from '../controller/admin/userMangement.js'
import { createNewSubscriptionPlan, getAllPlanPurchases, getAllSubscriptionPlansData, getPlanWithId, updateSubscriptionPlan } from '../controller/admin/subscription.js'
import { adminGetJobDetail, getAdminFilteredData } from '../controller/admin/jobManagement.js'
const router = express()


router.get('/get-all-users', getAllUsersData)
router.post('/create-user', createNewUserAdmin)
router.post('/update-user', createNewUserAdmin)

router.put('/create-subscription-plan', createNewSubscriptionPlan)
router.put('/update-subscription-plan', updateSubscriptionPlan)
router.get('/get-all-plans', getAllSubscriptionPlansData)

router.get('/get-plan-with-id/:plan_id', getPlanWithId)

router.post('/get-all-filtered-jobs',getAdminFilteredData)
router.get('/get-job-data/:jobId',adminGetJobDetail)


router.get('/get-all-plan-purchases/:plan_id',getAllPlanPurchases)

export default router