import notificationSchema from "../models/notificationSchema.js"


export const createNewNotification = async (user, description,url) => {
    try {
        const newNotification = await new notificationSchema({
            user, description ,url
        }).save();
        return newNotification
    } catch (error) {
        throw error
    }
}

export const getAllNotification = async (user) => {
    try {
        const notifications = await notificationSchema.find({ user })
        return notifications
    } catch (error) {
        throw error
    }
}