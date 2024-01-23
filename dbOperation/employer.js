import employerSchema from "../models/employerSchema.js"


export const createEmployer = async (employerData) => {
    const {
        company_name,
        company_location,
        company_website,
        company_email,
        employer_name,
        employer_position,
        employer_contact,
        user
    } = employerData
    try {
        const employer = await new employerSchema({
            company_name,
            company_location,
            company_website,
            company_email,
            employer_name,
            employer_position,
            employer_contact,
            user
        }).save()
        return employer
    } catch (error) {
        throw error
    }
}

export const updateEmployerDataWithUser = async (employerData, _id) => {
    const {
        company_name,
        company_location,
        company_website,
        company_email,
        employer_name,
        employer_position,
        employer_contact,
    } = employerData
    try {
        const updatedEmployer = await employerSchema.findOneAndUpdate({ _id }, {
            $set: {
                company_name,
                company_location,
                company_website,
                company_email,
                employer_name,
                employer_position,
                employer_contact,
            }
        })

        return updatedEmployer
    } catch (error) {
        throw error
    }
}

export const findEmployerWithUser = async (user) => {
    try {
        const employer = await employerSchema.findOne({ user })
        return employer
    } catch (error) {
        throw error
    }
}

