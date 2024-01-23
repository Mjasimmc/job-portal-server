import mongoose from 'mongoose'
const jobApplicationSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    job_id: {
        type: String,
        ref: 'job'
    },
    coverLetter: {
        type: String,
    },
    resume_id:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})

export default mongoose.model("job-applicant", jobApplicationSchema)