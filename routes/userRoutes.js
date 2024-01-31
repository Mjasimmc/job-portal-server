import express from 'express';


import {
    createEmployerProfile,
    getEmployerData
} from '../controller/user/employer.js';


import {
    AddEducation,
    addExperience,
    getEmployeeData,
    updateEmployeeProfile
} from '../controller/user/employee.js';
import {
    createJobPost, getFilteredDataOfJobs, getJobDetails, getMyJobsWithManageData, removeJobsSavedList, saveJobs
} from '../controller/user/job.js';
import { authenticateUser } from '../controller/user/auth.js';
import {
    findAllAppliedJobsWithUser,
    findJobApplicantWithJobIdAndUser,
    getAllApplicantsOfJob,
    getApplicantDataWithId,
    userAppyJob
} from '../controller/user/applyService.js';
import {
    getAllResumesWithUserId,
    uploadResume
} from '../controller/storeFiles/resumeUploader.js';
import {
    completePaymentValidationAndCredit,
    getAllSubscriptionsForUser,
    getSelfPlanDetailsWithUserId,
    paymentRazorpay,
    userGetPlanDataWithId
} from '../controller/user/subscriptionPlan.js';
import { getAllMessages, sendLiveMessage } from '../controller/user/applicantInteraction.js';
import { getAllNotificationWithUserId } from '../controller/user/notificationManagement.js';


const router = express()

router.get('/auth-user', authenticateUser)

router.get('/get-employer-data', getEmployerData)
router.post('/create-employer-profile', createEmployerProfile)

router.post('/update-employee-profile', updateEmployeeProfile)
router.get('/get-employee-profile', getEmployeeData)


router.post('/create-employer-post', createJobPost)
router.post('/add-education', AddEducation)
router.post('/add-experience', addExperience)


router.get('/employer-get-jobs', getMyJobsWithManageData)


router.put('/upload-resume', uploadResume)
router.get('/get-employee-resumes', getAllResumesWithUserId)

router.put('/apply-job', userAppyJob)

router.get('/job-applied-validation/:jobId', findJobApplicantWithJobIdAndUser)
router.get('/get-all-applied-jobs', findAllAppliedJobsWithUser)


router.get('/get-all-applicants/:jobId',getAllApplicantsOfJob)
router.get('/get-appicant-data/:applicantId',getApplicantDataWithId)


router.get('/get-all-plan-datas', getAllSubscriptionsForUser)
router.get('/get-plandata-with-id/:planId', userGetPlanDataWithId)


router.post('/credit-uploading-validate-payment', completePaymentValidationAndCredit)
router.post('/create-razorpay-instance', paymentRazorpay)





router.post('/send-message-applicant',sendLiveMessage)
router.get('/get-all-messages/:applicantId',getAllMessages)




// payment history
router.get('/get-self-plan-details',getSelfPlanDetailsWithUserId)


router.get('/get-all-notification',getAllNotificationWithUserId)


// authorized job data
router.get('/get-job-data/:jobId', getJobDetails)
router.post('/get-filtered-data', getFilteredDataOfJobs)

router.get('/save-jobs/:jobId',saveJobs)
router.get('/remove-jobs/:jobId',removeJobsSavedList)

export default router