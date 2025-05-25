const express = require("express");
const router = express.Router();
const {
  addAnemiaReport,
  getAnemiaReports,
} = require("../controllers/addAnemiaReport");
const authMiddleware = require("../middleware/authMiddleware");

// Yeni rapor ekleme
router.post("/add", authMiddleware, addAnemiaReport);

// Tüm raporları listeleme (yeni)
router.get("/list", authMiddleware, getAnemiaReports);

module.exports = router;
