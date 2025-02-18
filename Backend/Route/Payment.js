const express = require("express");
const router = express.Router();
const Transaction = require("../Models/Transaction");
const Billing = require("../Models/Billing");
const { body, validationResult } = require("express-validator");

// POST /api/payments - Process payments
router.post(
  "/payments",
  [
    body("userId", "User ID is required").notEmpty(),
    body("amount", "Amount must be a number").isNumeric(),
    body("status", "Invalid status").isIn(["Pending", "Completed", "Failed"]),
    body("method", "Invalid payment method").isIn(["Cash", "Card", "Online"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const transaction = new Transaction(req.body);
      await transaction.save();
      res.status(201).json({ message: "Payment processed successfully!", transaction });
    } catch (err) {
      res.status(500).json({ message: "Error processing payment", error: err.message });
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
