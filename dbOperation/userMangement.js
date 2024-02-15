import userSchema from "../models/userSchema.js"

export const createNewUser = async (name, email, phone, password) => {
    try {
        const newUser = await userSchema({
            name,
            email: {
                mail_id: email,
                validated: false
            },
            phone: {
                number: phone,
                validated: false
            },
            password
        }).save()
        return newUser
    } catch (error) {
        throw error
    }
}
export const updateUserProfileData = async (userId, name, email, phone, password) => {
    try {
        const updatedUser = await userSchema.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    name,
                    email: {
                        mail_id: email,
                        validated: false
                    },
                    phone: {
                        number: phone,
                        validated: false
                    },
                    password
                }
            },
            { new: true }
        );

        return updatedUser;
    } catch (error) {
        throw error;
    }
};
export const findUserWithEmail = async (email) => {
    try {
        const user = await userSchema.findOne({ "email.mail_id": email })
        return user
    } catch (error) {
        throw error
    }
}
export const findUserWithUserId = async (_id) => {
    try {
        const user = await userSchema.findOne({ _id })
        return user
    } catch (error) {
        throw error
    }
}
export const findUserWithName = async (name) => {
    try {
        const user = await userSchema.findOne({ name: name })
        return user
    } catch (error) {
        throw error
    }
}
export const findUserWithPhone = async (phone) => {
    try {
        const user = await userSchema.findOne({ "phone.number": phone })
        return user
    } catch (error) {
        throw error
    }
}

export const validateEmail = async (_id) => {
    try {
        const updatedUser = await userSchema.findOneAndUpdate({ _id }, {
            $set: {
                "email.validated": true
            }
        }, { new: true })
        return updatedUser
    } catch (error) {
        throw error
    }
}

export const findAllUsersDate = async () => {
    try {
        const user = await userSchema.find({}, { password: 0 })
        return user
    } catch (error) {
        throw error
    }
}

export const updatePassword = async (email, password) => {
    try {
        const updatedPass = await userSchema.findOneAndUpdate({ "email.mail_id": email }, {
            $set: {
                password
            }
        })
        return updatedPass
    } catch (error) {
        throw error
    }
}


export const updateEmployer = async (user, employer) => {
    try {
        const updateEmployee = await userSchema.findOneAndUpdate({ _id: user }, {
            $set: {
                employer
            }
        })
        return updateEmployee
    } catch (error) {
        throw error
    }
}
export const updateEmployee = async (user, employee) => {
    try {
        const updateEmployee = await userSchema.findOneAndUpdate({ _id: user }, {
            $set: {
                employee
            }
        })
        return updateEmployee
    } catch (error) {
        throw error
    }
}

export const blockUser = async (userId) => {
    try {
        const updateEmployee = await userSchema.findOneAndUpdate({ _id: userId }, {
            $set: {
                block: true
            }
        },{new:true})
        return updateEmployee
    } catch (error) {
        throw error
    }
}

export const unBlockUser = async (userId) => {
    try {
        const updateEmployee = await userSchema.findOneAndUpdate({ _id: userId }, {
            $set: {
                block: false
            }
        },{new:true})
        return updateEmployee
    } catch (error) {
        throw error
    }
}