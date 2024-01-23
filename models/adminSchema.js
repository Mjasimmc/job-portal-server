import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model('admin',adminSchema)