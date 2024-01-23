import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    employmentStartDate: {
        type: Date,
        required: true
    },
    employmentEndDate: {
        type: Date,
    }
}, {
    timestamps: true
});

export default mongoose.model('experience', experienceSchema);
