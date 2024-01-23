import { getAllNotification } from "../../dbOperation/notification.js"

export const getAllNotificationWithUserId = async (req,res)=>{
    try {
        const notifications = await getAllNotification(req.user._id)
        
        res.status(200).send(notifications)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}