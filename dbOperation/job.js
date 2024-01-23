import jobSchema from "../models/jobSchema.js";


export const createJobPostWithUserId = async (
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
    employer,
    vacancy,
    user
) => {
    try {
        // Generate _id with date including seconds, hours, days, months, and years
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/[-T:]/g, '').split('.')[0];
        const jobName = role.replace(/\s+/g, ''); // Remove spaces from job name
        const jobId = `${formattedDate}_${jobName}`;

        const newJob = await new jobSchema({
            _id: jobId,
            ...(role && { role }),
            ...(jobType && { jobType }),
            ...(qualification && { qualification }),
            ...(experience && { experience }),
            ...(description && { description }),
            ...(companyName && { companyName }),
            ...(salary && { salary }),
            ...(location && { location }),
            ...(deadline && { deadline }),
            ...(contactEmail && { contactEmail }),
            ...(skills && { skills }),
            ...(benefits && { benefits }),
            ...(requirements && { requirements }),
            ...(employer && { employer }),
            ...(vacancy && { vacancy }),
            ...(user && { user })
        }).save();

        return newJob;
    } catch (error) {
        console.log(error)
        throw error;
    }
};


export const findJobWithId = async (_id) => {
    try {
        const job = await jobSchema.findOne({ _id })
            .populate("employer")
        return job
    } catch (error) {
        throw error
    }
}

export const findJobWithEmployer = async (_id) => {
    try {
        const job = await jobSchema.findOne({ _id })
        return job
    } catch (error) {
        throw error
    }
}


export const findAllJobsWithEmployerId = async (employer) => {
    try {
        const jobs = await jobSchema.find({ employer })
            .populate("employer")
        return jobs
    } catch (error) {
        throw error
    }
}





export const filteredJobData = async ({
    role,
    jobType,
    company,
    locationQuery,
    salarySort,
    page
}) => {
    try {

        const filter = {
            ...(role && { role: { $regex: new RegExp(role, 'i') } }),
            ...(jobType && jobType.length > 0 && { jobType: { $in: jobType } }),
            ...(company && { companyName: { $regex: new RegExp(company, 'i') } }),
            ...(locationQuery && { location: { $regex: new RegExp(locationQuery, 'i') } }),
        };

        const limitPost = 10 * (page || 1)
        const skip = 10 * (page - 1)
        const sortOrder = salarySort === 'asc' ? 1 : salarySort === 'desc' ? -1 : null;

        const sortData = {
            ...(sortOrder && { salary: sortOrder }),
            ...{ createdAt: -1 }
        }

        const filteredJobs = await jobSchema
            .find(filter)
            .limit(limitPost)
            .skip(skip)
            .sort(sortData)
            .populate("employer")
        return filteredJobs;
    } catch (error) {
        throw error;
    }
};


export const adminFlteredJobData = async ({
    role,
    jobType,
    company,
    locationQuery,
    salarySort,
    page,
    employer
}) => {
    try {

        const filter = {
            ...(role && { role: { $regex: new RegExp(role, 'i') } }),
            ...(jobType && jobType.length > 0 && { jobType: { $in: jobType } }),
            ...(company && { companyName: { $regex: new RegExp(company, 'i') } }),
            ...(locationQuery && { location: { $regex: new RegExp(locationQuery, 'i') } }),
            ...(employer && { employer: employer }),
        };

        const limitPost = 10 * (page || 1)
        const skip = 10 * (page - 1)
        const sortOrder = salarySort === 'asc' ? 1 : salarySort === 'desc' ? -1 : null;

        const sortData = {
            ...(sortOrder && { salary: sortOrder }),
            ...{ createdAt: -1 }
        }

        const filteredJobs = await jobSchema
            .find(filter)
            .limit(limitPost)
            .skip(skip)
            .sort(sortData)
            .populate("employer")
        return filteredJobs;
    } catch (error) {
        throw error;
    }
};