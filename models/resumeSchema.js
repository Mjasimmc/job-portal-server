import mongoose from 'mongoose';

const resumeSchema = mongoose.Schema({
    __filename: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    file_id:{
        type:String,
        required:true
    }
},{
    timestamps: true  
});


export default mongoose.model('Resume', resumeSchema);
