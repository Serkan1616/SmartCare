const express = require('express');
const {
    getProfile,
    updateHealthProfile,
    updateProfile
} = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getProfile);
router.put('/update', authMiddleware, updateHealthProfile);
router.put('/update-profile', authMiddleware, updateProfile);

module.exports = router;
