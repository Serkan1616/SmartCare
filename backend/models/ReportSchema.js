const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  features: {
    WBC: Number,
    LYMp: Number,
    NEUTp: Number,
    LYMn: Number,
    NEUTn: Number,
    RBC: Number,
    HGB: Number,
    HCT: Number,
    MCV: Number,
    MCH: Number,
    MCHC: Number,
    PLT: Number,
    PDW: Number,
    PCT: Number,
  },
});

const AnemiaReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reports: [ReportSchema],
});

module.exports = mongoose.model("AnemiaReport", AnemiaReportSchema);
