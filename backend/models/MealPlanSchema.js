const mongoose = require("mongoose");

const MealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  diagnosis: { type: String, required: true },
  mealPlanText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MealPlan", MealPlanSchema);
