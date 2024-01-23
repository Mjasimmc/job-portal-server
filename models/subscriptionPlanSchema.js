import mongoose from 'mongoose';

const subscriptionPlanSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String, 
        required: true
    },
    jobPostLimit: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
