import mongoose from 'mongoose'
const notificationSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    viewed:{
        type:Boolean,
        default:false
    },
    url:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export default mongoose.model("notification",notificationSchema)