const mongoose = require('mongoose');

const HealthTrackingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    calories: Number,
    water: Number,
    exercise: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthTracking', HealthTrackingSchema);
