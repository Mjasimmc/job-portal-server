import mongoose from 'mongoose';

const employerSchema = mongoose.Schema({
    company_name: {
        type: String,
    },
    company_location: {
        type: String,
    },
    company_website: {
        type: String,
    },
    company_email: {
        type: String,
    },
    employer_name: {
        type: String
    },
    employer_position: {
        type: String,
    },
    employer_contact: {
        type: String,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }
}, { timestamps: true })


export default mongoose.model('employer', employerSchema)