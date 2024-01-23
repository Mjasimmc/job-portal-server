import { applyJob, employeeFindAllAppliedJobs, findApplicantWithId, findJobAppliedWithUserIdAndJobId, getAllApplicantWithJobId } from "../../dbOperation/jobApplication.js"


export const userAppyJob = async (req,res)=>{
    try {
        const {
            coverLetter,
            selectedResumeId,
            jobId
        } = req.body
        const application = await applyJob(req.user._id,selectedResumeId,coverLetter,jobId)
        res.status(200).send(application)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}

export const findJobApplicantWithJobIdAndUser = async(req,res)=>{
    try {
        const {jobId} = req.params
        const application  = await findJobAppliedWithUserIdAndJobId(req.user._id,jobId)
        res.status(200).send(application)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}

export const findAllAppliedJobsWithUser  = async (req,res)=>{
    try {
        const applications  = await employeeFindAllAppliedJobs(req.user._id)
        res.status(200).send(applications)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}


export const getAllApplicantsOfJob = async (req,res )=>{
    try {
        const  {jobId} = req.params
        const applicants  = await getAllApplicantWithJobId(jobId)
        res.status(200).send(applicants)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}


export const getApplicantDataWithId = async (req,res)=>{
    try {
        const  {applicantId} = req.params
        const applicant  = await findApplicantWithId(applicantId)
        res.status(200).send(applicant)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}