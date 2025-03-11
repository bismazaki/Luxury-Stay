const express = require("express");
const router = express.Router();
const Transaction = require("../Models/Transaction");
const Billing = require("../Models/Billing");
const Booking = require("../Models/Booking");
const { body, validationResult } = require("express-validator");

// POST /api/payments - Process payments

router.post(
  "/create-payments",
  [
      body("userId", "User ID is required").notEmpty(),
      body("amount", "Amount must be a number").isNumeric(),
      body("method", "Invalid payment method").isIn(["Cash", "Card", "Online"]),
      body("roomId", "Room ID is required").notEmpty(),
      body("guestName", "Guest name is required").notEmpty(),
      body("checkInDate", "Check-in date is required").isISO8601(),
      body("checkOutDate", "Check-out date is required").isISO8601(),
      body("cardNumber").optional().isLength({ min: 16, max: 16 }),
      body("cardHolderName").optional().notEmpty(),
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      try {
          let { userId, amount, method, cardNumber, cardHolderName, roomId, guestName, checkInDate, checkOutDate } = req.body;

          // Set initial payment status
          let status = method === "Cash" ? "Completed" : "Pending";

          // Save the payment
          const payment = new Transaction({
              userId,
              amount,
              method,
              cardNumber: method === "Card" ? cardNumber : null,
              cardHolderName: method === "Card" ? cardHolderName : null,
              status
          });

          const savedPayment = await payment.save();

          // Save the booking
          const booking = new Booking({
              roomId,
              guestId: userId,
              guestName,
              checkInDate,
              checkOutDate,
              totalAmount: amount,
              paymentStatus: status === "Completed" ? "Paid" : "Pending",
          });

          const savedBooking = await booking.save();

          // If payment method is not cash, simulate the payment process
          if (method !== "Cash") {
              savedPayment.status = "Completed";
              await savedPayment.save();

              // Update the booking's paymentStatus to "Paid"
              savedBooking.paymentStatus = "Paid";
              await savedBooking.save();
          }

          res.status(201).json({ message: "Payment successful & Booking confirmed!", payment: savedPayment, booking: savedBooking });
      } catch (error) {
          console.error("Error processing payment:", error);
          res.status(500).json({ message: "Payment or Booking failed", error: error.message });
      }
  }
);

// GET /api/invoices/:id - Fetch invoice details
router.get("/invoices/:id", async (req, res) => {
  try {
    const invoice = await Billing.findById(req.params.id).populate("GuestId").populate("BookingId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: "Error fetching invoice", error: err.message });
  }
});

module.exports = router;
