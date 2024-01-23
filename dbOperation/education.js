import educationSchema from "../models/educationSchema.js";

export const AddEducationToUser = async (userId, degree, college, course, graduationStartDate, graduationEndDate) => {
    try {
        const newEducation = new educationSchema({
            user: userId,
            degree,
            college,
            course,
            graduationStartDate,
            graduationEndDate,
        });

        const savedEducation = await newEducation.save();

        return savedEducation;
    } catch (error) {
        throw error;
    }
};

export const getEducationOfUser = async (userId) => {
    try {
        const educationData = await educationSchema.find({ user: userId }).sort({ createdAt: 1 });
        return educationData;
    } catch (error) {
        throw error;
    }
};

