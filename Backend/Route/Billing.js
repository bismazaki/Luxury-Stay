const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Billing = require("../Models/Billing"); 
const fetchUser = require('../Middleware/authmiddleware');
const Booking = require("../Models/Booking");

router.get("/my-invoices", fetchUser, async (req, res) => {
  try {
    // Sirf logged-in user ka GuestId ke invoices fetch karega
    const invoices = await Billing.find({ GuestId: req.user.id }).populate("GuestId").populate("BookingId");

    if (!invoices.length) {
      return res.status(404).json({ message: "No invoices found for this guest" });
    }

    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create-billing", async (req, res) => {
  try {
      const { GuestId, Guestname, BookingId, ServiceCharges, TotalAmount, PaymentMode } = req.body;

      // Unique Invoice ID generate karna
      const InvoiceId = "INV-" + Date.now();

      const newBilling = new Billing({
          InvoiceId,
          GuestId,
          Guestname,
          BookingId,
          ServiceCharges,
          TotalAmount,
          PaymentMode,
      });

      await newBilling.save();
      res.status(201).json({ message: "Billing details saved successfully", billing: newBilling });

  } catch (error) {
      console.error("Billing error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});
// ✅ Create Invoice


/**
 * @route   GET /api/bookings
 * @desc    Fetch logged-in guest's booking history with room type & price
 * @access  Private (Only logged-in users)
 */
// router.get('/get-booking', fetchUser, async (req, res) => {
//   try {
//       const guestId = req.user.id; // Extract logged-in user's ID

//       const bookings = await Booking.find({ guestId })
//           .populate('guestId', 'name email')
//           .populate('roomId', 'roomType pricePerNight'); // Populate room type & price

//           console.log("Fetched Bookings:", bookings);
//       res.status(200).json({ bookings });
//   } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

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
