const express = require('express');
const HealthTracking = require('../models/HealthTracking');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/track-health', authMiddleware, async (req, res) => {
    try {
        const { calories, water, exercise } = req.body;
        if (!req.user || !req.user._id) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        const newTracking = new HealthTracking({
            userId: req.user._id,
            calories,
            water,
            exercise
        });

        await newTracking.save();
        res.status(201).json({ msg: "Health data saved!", data: newTracking });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
});


router.get('/get-health-data', authMiddleware, async (req, res) => {
    try {
        const healthData = await HealthTracking.find({ userId: req.user.id }).sort({ date: -1 }).limit(7);
        res.json(healthData);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
