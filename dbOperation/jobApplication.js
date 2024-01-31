import jobApplicationSchema from "../models/jobApplicationSchema.js"
import { addApplicantToJob } from "./job.js";


export const applyJob = async (user, resume_id, coverLetter, job_id) => {
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/[-T:]/g, '').split('.')[0];
        const applicantId = `${formattedDate}_application`;

        const application = await new jobApplicationSchema({
            _id: applicantId,
            user,
            resume_id,
            coverLetter,
            job_id
        }).save()
        await addApplicantToJob(job_id,applicantId , user)
        return application
    } catch (error) {
        throw error
    }
}


export const findJobAppliedWithUserIdAndJobId = async (user, job_id) => {
    try {
        const application = await jobApplicationSchema.findOne({ user, job_id })
        return application
    } catch (error) {
        throw error
    }
}

export const employeeFindAllAppliedJobs = async (user) => {
    try {
        const applications = await jobApplicationSchema.find({ user })
            .populate('job_id')
        return applications
    } catch (error) {
        throw error
    }
}


export const getAllApplicantWithJobId = async (job_id) => {
    try {
        const applicants = await jobApplicationSchema.find({ job_id })
            .populate('job_id user')

        return applicants
    } catch (error) {
        throw error
    }
}


export const findApplicantWithId = async (_id) => {
    try {
        const applicant = await jobApplicationSchema.findOne({ _id })
            .populate('job_id user')
        return applicant
    } catch (error) {
        throw error
    }
}