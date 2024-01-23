import express from 'express';
import { config } from 'dotenv';
import apiRoute from './api.js';
import mongoose from './connect/mongoose.js';
import cors from 'cors'
import { Server } from 'socket.io';
import { createServer } from 'http'
import { socketIoMangeMent } from './socket.js';
const app = express()
// ====> configure envrionment
config()

// ====> calling db connect function
const datase_url = process.env.DATABASE_URL
mongoose(datase_url)

// ====> cors configuration
app.use(cors())

// ====> json parse configuration
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ extended: true, limit: '30mb' }))
app.use(express.static('./public'))

// ======> to api routes

app.use('/api', apiRoute)

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


io.on("connection", socketIoMangeMent)



const port = process.env.PORT
httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});