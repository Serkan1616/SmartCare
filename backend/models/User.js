const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    healthProfile: {
        age: Number,
        height: String,
        weight: String,
        bloodType: String,
        smoking: String,
        alcohol: String,
        medicalConditions: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
