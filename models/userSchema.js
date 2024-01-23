import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        number: {
            type: Number,
            required: true
        },
        validated: {
            type: Boolean,
            default: false
        }
    },
    email: {
        mail_id: {
            type: String,
            required: true
        },
        validated: {
            type: Boolean,
            default: false
        }
    }, 
    password: {
        type: String,
        required: true
    },
    block: {
        type: Boolean,
        default: false,
    },
    delete: {
        type: Boolean,
        default: false,
    },
    employee:{
        type:mongoose.Schema.ObjectId,
        reg:'employee'
    },
    employer:{
        type:mongoose.Schema.ObjectId,
        reg:'employer'
    },
    online:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })


export default mongoose.model('user', userSchema)