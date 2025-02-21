const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true, // Unique Feedback ID
    },
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Foreign key reference to User collection
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["Room", "Food", "Cleanliness", "Customer Service"],
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comments: {
      type: String,
      default: "",
    },
    responseStatus: {
      type: String,
      enum: ["Responded", "Pending"],
      default: "Pending",
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Feedback", feedbackSchema);
  