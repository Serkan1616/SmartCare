const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1]; // ✅ "Bearer " kısmını kes
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Token içindeki user ID'yi al
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
