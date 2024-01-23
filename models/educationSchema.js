import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    graduationStartDate: {
        type: Date,
        required: true
    },
    graduationEndDate: {
        type: Date,
    }
}, {
    timestamps: true
});

export default mongoose.model('education', educationSchema);
