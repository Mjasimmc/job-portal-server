import messageSchema from "../models/messageSchema.js"

export const createMessage = async (sender, message, typeOfMessage,applicationId) => {
    try {
        const messageSend = await new messageSchema({
            sender,
            message,
            viewers: [sender],
            typeOfMessage,
            applicationId
        }).save()
        return messageSend
    } catch (error) {
        throw error
    }
}


export const findAllMessagesWithApplicationId = async (applicationId)=>{
    try {
        const messages = await messageSchema.find({applicationId})
        return messages
    } catch (error) {
        throw error
    }
}