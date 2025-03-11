

const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"] , default: "Pending" },
  method: { type: String, enum: ["Cash", "Card", "Online"], required: true },
  cardNumber: { type: String }, // Encrypt this field
  cardHolderName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
