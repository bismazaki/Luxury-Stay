const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    BookingId: {type: String, required: true, unique: true},
    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Foreign key reference to User collection
        required: true,
      },
      checkInDate: {
        type: Date,
        required: true,
      },
      checkOutDate: {
        type: Date,
        required: true,
      },
      roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room", // Foreign key reference to Room collection
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Refunded"],
        default: "Pending",
      },
    }, { timestamps: true });
    
    module.exports = mongoose.model("Booking", BookingSchema);

