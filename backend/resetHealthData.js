const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Bağlantısı
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/your_db_name";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Sağlık Verileri Modeli
const HealthTracking = require('./models/HealthTracking'); // Model dosyanızın yolu doğru olmalı!

// 🔥 Veritabanındaki Tüm Sağlık Verilerini Sil
const resetHealthData = async () => {
    try {
        const result = await HealthTracking.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} health tracking records.`);
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error resetting health data:", error);
        mongoose.connection.close();
    }
};

// Fonksiyonu Çalıştır
resetHealthData();
