import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    full_name:{
        type:String,

    },
    email:{
        type:String,
        
    },
    phone:{
        type:String,
    },
    linkedIn:{
        type:String,
        
    },
    gitHub:{
        type:String,
        
    },
    status:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })


export default mongoose.model('employee', employeeSchema)