const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema({
    InvoiceId: { type: String, required: true, unique: true },
    GuestId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    BookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    ServiceCharges: { type: String, enum: ["Food", "Laundry", "ExtraBed"], default: "Food" },
    TotalAmount: { type: Number, required: true }, // Changed from String to Number
    PaymentMode: { type: String, enum: ["Cash", "Card", "Online"], default: "Cash" },
    InvoiceDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Billing", BillingSchema);
