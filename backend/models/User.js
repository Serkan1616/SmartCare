const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },  // Onay Kodu
    otpExpires: { type: Date }, // OTP’nin geçerlilik süresi
    // 🟢 Sağlık Profili Alanı
    healthProfile: {
        age: String,
        height: String,
        weight: String,
        bloodType: String,
        smoking: String,
        alcohol: String,
        medicalConditions: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
