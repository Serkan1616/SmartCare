const AnemiaReport = require("../models/ReportSchema");

// Yeni rapor ekleme fonksiyonu (zaten vardı)
exports.addAnemiaReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { prediction, input_values } = req.body;

    if (!input_values) {
      return res.status(400).json({ error: "Input values are required" });
    }

    let anemiaReportDoc = await AnemiaReport.findOne({ userId });

    if (!anemiaReportDoc) {
      anemiaReportDoc = new AnemiaReport({ userId, reports: [] });
    }

    anemiaReportDoc.reports.push({
      features: input_values,
      prediction: prediction, // optional, dilersen ekle
    });

    await anemiaReportDoc.save();

    res.status(201).json({
      msg: "Report added successfully",
      reportCount: anemiaReportDoc.reports.length,
    });
  } catch (error) {
    console.error("Error saving anemia report:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Yeni: Kullanıcının raporlarını listeleme
exports.getAnemiaReports = async (req, res) => {
  try {
    const userId = req.user.id;

    const anemiaReportDoc = await AnemiaReport.findOne({ userId });

    if (!anemiaReportDoc || anemiaReportDoc.reports.length === 0) {
      return res.status(404).json({ message: "No reports found" });
    }

    res.status(200).json({
      reports: anemiaReportDoc.reports,
      total: anemiaReportDoc.reports.length,
    });
  } catch (error) {
    console.error("Error fetching anemia reports:", error);
    res.status(500).json({ error: "Server error" });
  }
};
