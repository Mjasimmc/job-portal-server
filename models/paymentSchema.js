import mongoose from 'mongoose';

const userPaymentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: String,
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubscriptionPlan'
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    paymentData: { 
        razorpay_payment_id:{
            type:String
        },
        razorpay_order_id:{
            type:String
        },
        razorpay_signature:{
            type:String
        }
             }
}, {
    timestamps: true
});

export default mongoose.model('payment', userPaymentSchema);
