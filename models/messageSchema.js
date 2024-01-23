import mongoose from 'mongoose'
const messageSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    message:{
       type:String,
       required:true
    },
    viewers:[String],
    typeOfMessage:{
        type:String,
        required:true
    },
    applicationId:{
        type:String,
        ref:'job-applicant'
    }
},{
    timestamps:true
})

export default mongoose.model("message",messageSchema)