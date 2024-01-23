import { createNewNotification } from "./dbOperation/notification.js";


export const socketIoMangeMent = (socket) => {
    socket.on('createRoom', (roomId) => {
        socket.join(roomId)
        console.log(roomId, "rooiD", socket.rooms)
    })
    socket.on('sendMessage', async (msg) => {
        console.log(msg.description)
        socket.to(msg.senderId).emit('messageReciever', msg)
        const url = msg.applicant ? '/job/applicant/' + msg.applicationId : '/applied/' + msg.applicationId
        await createNewNotification(msg.senderId,msg.description, url)
        socket.to(msg.senderId).emit('notification', { title: msg.description })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
};