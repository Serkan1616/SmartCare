const express = require("express");
const {
  saveMealPlan,
  getMealPlan,
} = require("../controllers/mealPlanController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, saveMealPlan);
router.get("/", authMiddleware, getMealPlan);

module.exports = router;
