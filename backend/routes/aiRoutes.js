const express = require("express");
const {
  analyzeFeatureChanges,
  generateMealPlan,
} = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/analyze-ai", analyzeFeatureChanges);
router.post("/meal-plan", generateMealPlan);

module.exports = router;
