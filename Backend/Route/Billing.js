const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Billing = require("../Models/Billing"); 

// ✅ Create Invoice
router.post(
  "/create",
  [
    body("InvoiceId", "Invoice ID is required").notEmpty(),
    body("GuestId", "Guest ID is required").notEmpty(),
    body("BookingId", "Booking ID is required").notEmpty(),
    body("ServiceCharges", "Invalid service charge").isIn(["Food", "Laundry", "ExtraBed"]),
    body("TotalAmount", "Total Amount is required").notEmpty(),
    body("PaymentMode", "Invalid Payment Mode").isIn(["Cash", "Card", "online"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newInvoice = new Billing(req.body);
      await newInvoice.save();
      res.status(201).json({ message: "Invoice created successfully!", invoice: newInvoice });
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ✅ Get All Invoices
router.get("/all", async (req, res) => {
  try {
    const invoices = await Billing.find().populate("GuestId").populate("BookingId");
    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get Invoice By ID
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Billing.findById(req.params.id).populate("GuestId").populate("BookingId");

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Update Invoice
router.put(
  "/update/:id",
  [
    body("ServiceCharges").optional().isIn(["Food", "Laundry", "ExtraBed"]),
    body("TotalAmount").optional().notEmpty(),
    body("PaymentMode").optional().isIn(["Cash", "Card", "online"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedInvoice = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!updatedInvoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }

      res.json({ message: "Invoice updated successfully!", invoice: updatedInvoice });
    } catch (error) {
      console.error("Error updating invoice:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ✅ Delete Invoice
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedInvoice = await Billing.findByIdAndDelete(req.params.id);

    if (!deletedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.json({ message: "Invoice deleted successfully!" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
