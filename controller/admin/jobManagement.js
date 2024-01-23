import { adminFlteredJobData } from "../../dbOperation/job.js";

export const getAdminFilteredData  = async (req,res)=>{
    try {
        const { role, jobTypes, company, location, salarySort , page , employer } = req.body;
        const filteredJobs = await adminFlteredJobData({
            role,
            jobType:jobTypes,
            company,
            locationQuery:location,
            salarySort,
            page,
            employer
        });
        res.status(200).send(filteredJobs);
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

export const adminGetJobDetail = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await findJobWithId(jobId);
        res.status(200).send(job);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};