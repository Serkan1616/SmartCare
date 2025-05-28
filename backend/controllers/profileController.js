const User = require("../models/User");
const bcrypt = require("bcryptjs");
const MealPlan = require("../models/MealPlanSchema");
const AnemiaReport = require("../models/ReportSchema");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const mealPlan = await MealPlan.findOne({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    const anemiaData = mealPlan?.diagnosis || {};
    const lastReport =
      anemiaData?.reports?.[anemiaData.reports.length - 1] || null;

    res.json({
      ...user.toObject(),
      mealPlan: mealPlan || null,
      lastAnemiaReport: lastReport,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// 🟢 Sağlık Profilini Güncelleme
exports.updateHealthProfile = async (req, res) => {
  try {
    const {
      age,
      height,
      weight,
      bloodType,
      smoking,
      alcohol,
      medicalConditions,
    } = req.body;

    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.healthProfile = {
      age,
      height,
      weight,
      bloodType,
      smoking,
      alcohol,
      medicalConditions,
    };
    await user.save();

    res.status(200).json({ msg: "Health profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 🟢 Profil Bilgilerini Güncelleme
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    let user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    // Mevcut şifre kontrolü
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Current password is incorrect" });

      // Yeni şifreyi hashleyerek kaydet
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // İsim ve email güncelleme
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.status(200).json({ msg: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
