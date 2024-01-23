import express from 'express';
import userRouter from './routes/userRoutes.js';
import authRoutes from './routes/authenticationRoute.js';
import adminRoutes from './routes/adminRoutes.js';
import userUnAuthRoutes from './routes/userUnAuth.js';
import { validateAdmin, validateUser } from './controller/authentication/jwtAuthenticator.js';

const apiRoute = express()

apiRoute.use("/auth", authRoutes)

apiRoute.use("/user", validateUser, userRouter)

apiRoute.use('/user-un-auth', userUnAuthRoutes)

apiRoute.use("/admin", validateAdmin, adminRoutes)

export default apiRoute