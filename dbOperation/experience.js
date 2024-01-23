import experienceSchema from "../models/experienceSchema.js";

export const addExperienceToUser = async (userId, position, company, employmentStartDate, employmentEndDate = null) => {
    try {
        const newExperience = new experienceSchema({
            user: userId,
            position,
            company,
            employmentStartDate,
            employmentEndDate,
        });

        const savedExperience = await newExperience.save();

        return savedExperience;
    } catch (error) {
        throw error;
    }
};
export const getExperienceOfUser = async (userId) => {
    try {
        const educationData = await experienceSchema.find({ user: userId }).sort({ createdAt: 1 });
        return educationData;
    } catch (error) {
        throw error;
    }
};