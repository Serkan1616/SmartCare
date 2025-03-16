require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const axios = require('axios');
const FormData = require('form-data');  // Eksik import eklendi
const fs = require('fs');               // Dosya okuma için gerekli
const path = require('path');
const multer = require('multer');    // Dosya yolu için gerekli

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Multer - Görsel yükleme için yapılandırma
const storage = multer.memoryStorage(); // Bellekte geçici saklama
const upload = multer({ storage: storage });  // ✅ `upload` middleware tanımlandı

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


app.post('/api/predict', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8000/predict', req.body);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Prediction failed" });
    }
});

// 🟢 Retina Prediction Endpoint
app.post('/api/retina-predict', upload.single('file'), async (req, res) => {
    try {
        const formData = new FormData();
        formData.append('file', req.file.buffer, req.file.originalname);

        const response = await axios.post('http://localhost:8000/retina-predict', formData, {
            headers: { ...formData.getHeaders() }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Retina prediction failed" });
    }
});


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/health', healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
