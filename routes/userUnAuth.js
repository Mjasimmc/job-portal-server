import express from 'express'
import {
    getFilteredDataOfJobs,
    getJobDetails
} from '../controller/user/job.js'
const router = express()


router.get('/get-job-data/:jobId', getJobDetails)
router.post('/get-filtered-data', getFilteredDataOfJobs)



export default router