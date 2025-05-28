const MealPlan = require("../models/MealPlanSchema");

exports.saveMealPlan = async (req, res) => {
  try {
    const userId = req.user.id; // authMiddleware ile geliyor
    const { diagnosis, mealPlanText } = req.body;

    if (!diagnosis || !mealPlanText) {
      return res
        .status(400)
        .json({ msg: "Diagnosis and meal plan text are required." });
    }

    const newMealPlan = new MealPlan({
      userId,
      diagnosis,
      mealPlanText,
    });

    await newMealPlan.save();

    res.status(201).json({ msg: "Meal plan saved successfully." });
  } catch (error) {
    console.error("Error saving meal plan:", error);
    res.status(500).json({ msg: "Server error." });
  }
};

exports.getMealPlan = async (req, res) => {
  try {
    const userId = req.user.id; // authMiddleware ile geliyor
    const diagnosis = req.query.diagnosis;

    let mealPlan;

    if (diagnosis) {
      // Belirli bir tanıya göre meal plan ara
      mealPlan = await MealPlan.findOne({ userId, diagnosis });
    } else {
      // Tanı gönderilmemişse, en son oluşturulan meal plan'ı getir
      mealPlan = await MealPlan.findOne({ userId }).sort({ createdAt: -1 });
    }

    if (!mealPlan) {
      return res.status(404).json({ msg: "Meal plan not found." });
    }

    // Meal planı döndür
    res.status(200).json({
      diagnosis: mealPlan.diagnosis,
      mealPlanText: mealPlan.mealPlanText,
    });
  } catch (error) {
    console.error("Error fetching meal plan:", error);
    res.status(500).json({ msg: "Server error." });
  }
};
