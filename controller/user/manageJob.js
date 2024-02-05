export const getJobApplicants = async (req,res)=>{
    try {
        const jobId = req.params.jobId
    } catch (error) {
        res.status(500).send('internal server error')
    }
}