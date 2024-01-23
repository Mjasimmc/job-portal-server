import employeeSchema from "../models/employeeSchema.js"


export const createEmployeeProfile = async (data) => {
    try {
        const {
            full_name,
            email,
            linkedIn,
            gitHub,
            phone,
            user
        } = data

        const employeeData = {
            user,
            ...(full_name && { full_name:full_name }),
            ...(email && { email:email }),
            ...(linkedIn && { linkedIn:linkedIn }),
            ...(gitHub && { gitHub:gitHub }),
            ...(phone && { phone:phone }),
        }
        const employee = await new employeeSchema(employeeData).save()
        return employee
    } catch (error) {
        throw error
    }
}


export const updateWithUserIdEmployeeProfile = async (data) => {
    try {
        const {
            full_name,
            email,
            linkedIn,
            gitHub,
            phone,
            user
        } = data
        const updatedEmployee = await employeeSchema.findOneAndUpdate({ user }, {
            $set: {
                full_name,
                email,
                linkedIn,
                gitHub,
                phone,
            }
        }, { new: true })
        return updatedEmployee
    } catch (error) {
        throw error
    }
}
export const findEmployeeWithUser = async (user) => {
    try {
        const employer = await employeeSchema.findOne({ user })
        return employer
    } catch (error) {
        throw error
    }
}