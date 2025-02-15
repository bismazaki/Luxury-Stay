const reportSchema = new mongoose.Schema({
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true, // Unique Report ID
    },
    reportType: {
      type: String,
      enum: ["Revenue", "Occupancy", "Guest Feedback", "Staff Performance"],
      required: true,
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin ID
      required: true,
    },
    dateGenerated: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Report", reportSchema);
  