import express from 'express'
import {
    changePassword,
    checkOtpIdExist,
    genrateNewOtpWithId,
    getNewOtpForUser,
    loginWithGoogle,
    userLogin,
    userRegister,
    validateEmailOtp,
} from '../controller/authentication/userAuth.js'
import { adminLogin } from '../controller/authentication/adminAuth.js'
const router = express()


router.post('/register-user', userRegister)
router.post('/validate-otp', validateEmailOtp)
router.post('/get-new-otp',getNewOtpForUser)
router.post('/login-user',userLogin)
router.put('/change-pass',changePassword)

router.post('/login-admin',adminLogin)
router.post('/google-login',loginWithGoogle)

router.post('/resend-otp',genrateNewOtpWithId)

router.get('/validate-otp-id/:otpId',checkOtpIdExist)
export default router