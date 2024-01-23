import { createMessage, findAllMessagesWithApplicationId } from "../../dbOperation/messages.js"

export const sendLiveMessage = async (req,res)=>{
    try {
        const user = req.user._id
        const {message , applicantId,typeOfMessage} = req.body
        if(!message || !applicantId || !typeOfMessage){
            return res.status(404).send('data not found')
        }
        const sendMessage = await createMessage(user,message,typeOfMessage,applicantId)
        res.status(200).send(sendMessage)
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}


export const getAllMessages = async (req,res)=>{
    try {
        const {applicantId} = req.params
        const messages =await findAllMessagesWithApplicationId(applicantId)
        res.status(200).send(messages)
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}