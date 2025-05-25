require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const healthRoutes = require("./routes/healthRoutes");
const axios = require("axios");
const FormData = require("form-data"); // Eksik import eklendi
const fs = require("fs"); // Dosya okuma için gerekli
const path = require("path");
const multer = require("multer"); // Dosya yolu için gerekli

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Multer - Görsel yükleme için yapılandırma
const storage = multer.memoryStorage(); // Bellekte geçici saklama
const upload = multer({ storage: storage }); // ✅ `upload` middleware tanımlandı

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Yeni endpoint: AI analiz için
app.post("/api/analyze-ai", async (req, res) => {
  try {
    const { feature, values } = req.body;

    if (!feature || !values) {
      return res
        .status(400)
        .json({ error: "Feature and values are required." });
    }

    // Gemini API URL
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;

    const promptText = `Feature "${feature}" values from different times for the same person, ordered from oldest to newest: ${values.join(
      ", "
    )}. 
Give a short summary: are these changes good or bad? 
Mention possible health effects briefly.`;

    // Gemini API'ye POST isteği
    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse =
      response.data?.candidates?.[0]?.content || "No analysis returned.";

    let analysisText = "";

    if (typeof aiResponse === "string") {
      // Bazen direkt string dönebilir
      analysisText = aiResponse;
    } else if (aiResponse?.parts && Array.isArray(aiResponse.parts)) {
      // parts dizisindeki tüm text'leri birleştir
      analysisText = aiResponse.parts.map((part) => part.text).join("\n");
    } else {
      analysisText = JSON.stringify(aiResponse);
    }

    console.log("Extracted analysis text:", analysisText);

    res.json({ analysis: analysisText });
  } catch (error) {
    console.log("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI analysis failed." });
  }
});

app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/predict",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/anemia-report", require("./routes/anemiaReportRoutes"));
app.use("/api/health", healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
