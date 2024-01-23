import mongoose from 'mongoose';

const userSubscriptionHistorySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    jobLimit: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('UserSubscriptionHistory', userSubscriptionHistorySchema);
