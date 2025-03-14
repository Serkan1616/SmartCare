const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // JWT doğrulama için

// Kullanıcı Kaydı (Register)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ msg: "Lütfen tüm alanları doldurun." });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: "Bu email ile kayıtlı bir kullanıcı zaten var." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: "Kayıt başarılı! Giriş yapabilirsiniz." });

    } catch (error) {
        res.status(500).json({ msg: "Sunucu hatası" });
    }
});

// Kullanıcı Girişi (Login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ msg: "Lütfen tüm alanları doldurun." });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Email veya şifre hatalı." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Email veya şifre hatalı." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });

    } catch (error) {
        res.status(500).json({ msg: "Sunucu hatası" });
    }
});

// Kullanıcı Profilini Getirme
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Şifreyi göndermiyoruz
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Kullanıcı Sağlık Profilini Güncelleme
router.put('/profile/update', authMiddleware, async (req, res) => {
    try {
        const { age, height, weight, bloodType, smoking, alcohol, medicalConditions } = req.body;

        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        user.healthProfile = { age, height, weight, bloodType, smoking, alcohol, medicalConditions };
        await user.save();

        res.status(200).json({ msg: "Health profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
