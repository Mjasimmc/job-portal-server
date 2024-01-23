import resumeSchema from "../models/resumeSchema.js"

export const createResume = async (file_id, _user, _filename) => {
    try {
        const resume =await new resumeSchema({
            __filename: _filename,
            user: _user,
            file_id

        }).save()
        return resume
    } catch (error) {
        throw error
    }
}

export const getEmployeeResumes = async (user) => {
    try {
        const resumes = await resumeSchema.find({ user })
            .populate("user")
        return resumes
    } catch (error) {
        throw error
    }
}