require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// MongoDB'ye bağlan
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB'ye bağlanıldı..."))
    .catch(err => console.error("❌ MongoDB bağlantı hatası:", err));

const deleteAllUsers = async () => {
    try {
        const result = await User.deleteMany({});
        console.log(`🗑️ ${result.deletedCount} kullanıcı silindi.`);
    } catch (error) {
        console.error("❌ Kullanıcıları silerken hata oluştu:", error);
    } finally {
        mongoose.connection.close();
    }
};

// Silme işlemini başlat
deleteAllUsers();
