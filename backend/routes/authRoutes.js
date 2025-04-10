const express = require('express');
const {
    register,
    verifyOTP,
    forgotPassword,
    resetPassword,
    login
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/login', login);


module.exports = router;
