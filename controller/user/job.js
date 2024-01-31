import { findEmployerWithUser } from "../../dbOperation/employer.js";
import { createJobPostWithUserId, findJobWithId, filteredJobData, findAllJobsWithEmployerId, addToSavedList, removeFromSavedList } from "../../dbOperation/job.js";



export const createJobPost = async (req, res) => {
    try {
        const {
            role,
            jobType,
            qualification,
            experience,
            description,
            companyName,
            salary,
            location,
            deadline,
            contactEmail,
            skills,
            benefits,
            requirements,
            vacancy
        } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const requiredFields = [role, jobType, qualification, experience, description, companyName, salary, location, deadline, contactEmail, skills];
        if (requiredFields.some(field => !field)) {
            return res.status(400).send("Please provide all required fields.");
        }

        if (!emailRegex.test(contactEmail)) {
            return res.status(400).send("Invalid email address.");
        }

        const employer = await findEmployerWithUser(req.user._id);
        const job = await createJobPostWithUserId(role,
            jobType,
            qualification,
            experience,
            description,
            companyName,
            salary,
            location,
            deadline,
            contactEmail,
            skills,
            benefits,
            requirements,
            employer._id,
            vacancy,
            req.user._id);
        res.status(200).send(job);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

export const getJobDetails = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await findJobWithId(jobId);
        res.status(200).send(job);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};


export const getFilteredDataOfJobs = async (req, res) => {
    try {
        const { role, jobTypes, company, location, salarySort, page } = req.body;
        const user = req.user ? req.user._id : null
        const filteredJobs = await filteredJobData({
            role,
            jobType: jobTypes,
            company,
            locationQuery: location,
            salarySort,
            page,
            user
        });

        res.status(200).send(filteredJobs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


export const getMyJobsWithManageData = async (req, res) => {
    try {

        const employer = await findEmployerWithUser(req.user._id)

        if (employer) {
            const jobs = await findAllJobsWithEmployerId(employer._id)
            return res.status(200).send(jobs)
        }
        res.status(200).send([])
    } catch (error) {
        res.status(500).send("internal server error")
    }
}


export const saveJobs = async (req, res) => {
    try {
        const { jobId } = req.params
        const updatedJob = await addToSavedList(jobId, req.user._id)
        res.status(200).send(updatedJob)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}

export const removeJobsSavedList = async (req, res) => {
    try {
        const { jobId } = req.params
        const updatedJob = await removeFromSavedList(jobId, req.user._id)
        res.status(200).send(updatedJob)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}