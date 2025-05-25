const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// 📧 Nodemailer Yapılandırması
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 🔐 OTP Oluşturma Fonksiyonu
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();  // 6 haneli OTP
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please provide email and password." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('❗ Kullanıcı bulunamadı.');
            return res.status(400).json({ msg: "Invalid email or password." });
        }

        // if (!user.isVerified) {
        //     return res.status(400).json({ msg: "Please verify your account first." });
        // }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`🔎 Girilen şifre doğru mu?: ${isMatch}`);

        if (!isMatch) {
            console.log('❗ Şifre eşleşmedi.');
            return res.status(400).json({ msg: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log('✅ Başarılı giriş yapıldı.');
        res.status(200).json({
            msg: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ msg: "Server error." });
    }
};



exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        console.log('✅ Register işlemi başlatıldı.');
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log('❗ Kullanıcı zaten mevcut.');
            return res.status(400).json({ msg: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isVerified: true  // ✅ Doğrudan doğrulanmış olarak kaydet
        });

        await newUser.save();

        // await transporter.sendMail({ ... });  // ❌ OTP gönderimini devre dışı bıraktık

        console.log('✅ Kayıt başarılı. (OTP gönderilmedi)');
        res.status(200).json({ msg: "User registered successfully." });

    } catch (error) {
        console.error("❌ Register Error:", error);
        res.status(500).json({ msg: "Server error." });
    }
};


// 🟢 OTP Kontrol ve E-posta Doğrulama
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found." });

        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ msg: "Invalid or expired OTP." });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).json({ msg: "Account verified successfully." });
    } catch (error) {
        res.status(500).json({ msg: "Server error." });
    }
};

// 🟢 Şifremi Unuttum OTP Gönderme
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found." });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 300000; // 5 dakika geçerli
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Code',
            html: `<h2>Reset Your Password</h2>
                   <p>Your password reset code is: <b>${otp}</b></p>
                   <p>This code will expire in 5 minutes.</p>`
        });

        res.status(200).json({ msg: "Password reset OTP sent successfully." });
    } catch (error) {
        res.status(500).json({ msg: "Server error." });
    }
};

// 🟢 Şifre Sıfırlama
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found." });

        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ msg: "Invalid or expired OTP." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).json({ msg: "Password reset successfully." });
    } catch (error) {
        res.status(500).json({ msg: "Server error." });
    }
};
