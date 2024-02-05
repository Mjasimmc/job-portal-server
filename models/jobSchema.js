import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    employer: {
        type: mongoose.Schema.ObjectId,
        ref: 'employer',
        required: true
    }, 
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    vacancy: {
        type: String,
        required: true
    },
    jobType: [String],
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    skills: [String],
    benefits: [String],
    requirements: [String],
    applicants:[
        {
            applicantionId:{
                type:String,
                ref:'job-applicant',
                required:true
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user',
                required:true
            }

        }
    ],
    saved:[String],
    status:{
        type:Boolean,
        default:true
    }
}, {
    timestamps: true
});

export default mongoose.model('job', jobSchema);
