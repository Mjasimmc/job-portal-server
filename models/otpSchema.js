import mongoose from 'mongoose'
const otpSchema = mongoose.Schema({
    otp:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    used:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export default mongoose.model("otp",otpSchema)