// const express = require("express");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const Billing = require("../Models/Billing"); 
// const fetchUser = require('../Middleware/authmiddleware');
// // const Booking = require("../Models/Booking");

// router.get("/my-invoices", fetchUser, async (req, res) => {
//   try {
//     // Sirf logged-in user ka GuestId ke invoices fetch karega
//     const invoices = await Billing.find({ GuestId: req.user.id }).populate("GuestId").populate("BookingId");

//     if (!invoices.length) {
//       return res.status(404).json({ message: "No invoices found for this guest" });
//     }

//     res.json(invoices);
//   } catch (error) {
//     console.error("Error fetching invoices:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/create-billing", async (req, res) => {
//   try {
//       const { GuestId, Guestname, BookingId, ServiceCharges, TotalAmount, PaymentMode } = req.body;

//       // Unique Invoice ID generate karna
//       const InvoiceId = "INV-" + Date.now();

//       const newBilling = new Billing({
//           InvoiceId,
//           GuestId,
//           Guestname,
//           BookingId,
//           ServiceCharges,
//           TotalAmount,
//           PaymentMode,
//       });

//       await newBilling.save();
//       res.status(201).json({ message: "Billing details saved successfully", billing: newBilling });

//   } catch (error) {
//       console.error("Billing error:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// // ✅ Create Invoice


// /**
//  * @route   GET /api/bookings
//  * @desc    Fetch logged-in guest's booking history with room type & price
//  * @access  Private (Only logged-in users)
//  */
// // router.get('/get-booking', fetchUser, async (req, res) => {
// //   try {
// //       const guestId = req.user.id; // Extract logged-in user's ID

// //       const bookings = await Booking.find({ guestId })
// //           .populate('guestId', 'name email')
// //           .populate('roomId', 'roomType pricePerNight'); // Populate room type & price

// //           console.log("Fetched Bookings:", bookings);
// //       res.status(200).json({ bookings });
// //   } catch (error) {
// //       res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // });

// // ✅ Get All Invoices



// router.get("/all", async (req, res) => {
//   try {
//     const invoices = await Billing.find().populate("GuestId").populate("BookingId");
//     res.json(invoices);
//   } catch (error) {
//     console.error("Error fetching invoices:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ Get Invoice By ID
// router.get("/:id", async (req, res) => {
//   try {
//     const invoice = await Billing.findById(req.params.id).populate("GuestId").populate("BookingId");

//     if (!invoice) {
//       return res.status(404).json({ error: "Invoice not found" });
//     }

//     res.json(invoice);
//   } catch (error) {
//     console.error("Error fetching invoice:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ Update Invoice
// router.put(
//   "/update/:id",
//   [
//     body("ServiceCharges").optional().isIn(["Food", "Laundry", "ExtraBed"]),
//     body("TotalAmount").optional().notEmpty(),
//     body("PaymentMode").optional().isIn(["Cash", "Card", "online"]),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const updatedInvoice = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });

//       if (!updatedInvoice) {
//         return res.status(404).json({ error: "Invoice not found" });
//       }

//       res.json({ message: "Invoice updated successfully!", invoice: updatedInvoice });
//     } catch (error) {
//       console.error("Error updating invoice:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

// // ✅ Delete Invoice
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const deletedInvoice = await Billing.findByIdAndDelete(req.params.id);

//     if (!deletedInvoice) {
//       return res.status(404).json({ error: "Invoice not found" });
//     }

//     res.json({ message: "Invoice deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting invoice:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// router.get("/payments", async (req, res) => {
//   try {
//       const payments = await Billing.find().populate("GuestId").populate("BookingId");
//       res.json(payments);
//   } catch (error) {
//       console.error("Error fetching payments:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// router.get("/invoice/download/:id", async (req, res) => {
//   try {
//       const invoice = await Billing.findById(req.params.id).populate("GuestId").populate("BookingId");

//       if (!invoice) {
//           return res.status(404).json({ error: "Invoice not found" });
//       }

//       const doc = new PDFDocument();
//       const fileName = `invoice-${invoice._id}.pdf`;
//       const filePath = `./invoices/${fileName}`;

//       doc.pipe(fs.createWriteStream(filePath));
//       doc.fontSize(20).text("Hotel Invoice", { align: "center" });
//       doc.moveDown();
//       doc.text(`Invoice ID: ${invoice.InvoiceId}`);
//       doc.text(`Guest Name: ${invoice.Guestname}`);
//       doc.text(`Total Amount: $${invoice.TotalAmount}`);
//       doc.text(`Payment Mode: ${invoice.PaymentMode}`);
//       doc.text(`Service Charges: ${invoice.ServiceCharges}`);
//       doc.text(`Booking ID: ${invoice.BookingId._id}`);
//       doc.end();

//       res.download(filePath, fileName);
//   } catch (error) {
//       console.error("Error generating invoice:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Billing = require("../Models/Billing"); 
const fetchUser = require("../Middleware/authmiddleware");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const path = require("path");


// ✅ Get logged-in user's invoices
router.get("/my-invoices", fetchUser, async (req, res) => {
  try {
    const invoices = await Billing.find({ GuestId: req.user.id })
      .populate("GuestId", "name email")
      .populate("BookingId");

    if (!invoices.length) {
      return res.status(404).json({ message: "No invoices found for this guest" });
    }

    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Create a new invoice
router.post("/create-billing", async (req, res) => {
  try {
    const { GuestId, BookingId, ServiceCharges, TotalAmount, PaymentMode } = req.body;

    if (!mongoose.Types.ObjectId.isValid(GuestId) || !mongoose.Types.ObjectId.isValid(BookingId)) {
      return res.status(400).json({ message: "Invalid GuestId or BookingId" });
    }

    const InvoiceId = "INV-" + Date.now();

    const newBilling = new Billing({
      InvoiceId,
      GuestId,
      BookingId,
      ServiceCharges,
      TotalAmount,
      PaymentMode
    });

    await newBilling.save();
    res.status(201).json({ message: "Billing details saved successfully", billing: newBilling });

  } catch (error) {
    console.error("Billing error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get all invoices
router.get("/all", async (req, res) => {
  try {
    const invoices = await Billing.find().populate("GuestId", "name email").populate("BookingId");
    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get Invoice by ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid invoice ID" });
    }

    const invoice = await Billing.findById(req.params.id)
      .populate("GuestId", "name email")
      .populate("BookingId");

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Download Invoice as PDF
// router.get("/invoice/download/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid invoice ID" });
//   }

//   try {
//     const invoice = await Billing.findById(id)
//       .populate("GuestId", "name email")
//       .populate("BookingId");

//     if (!invoice) {
//       return res.status(404).json({ error: "Invoice not found" });
//     }

//     const doc = new PDFDocument();
//     const fileName = `invoice-${invoice._id}.pdf`;
//     const filePath = `./invoices/${fileName}`;

//     doc.pipe(fs.createWriteStream(filePath));
//     doc.fontSize(20).text("Hotel Invoice", { align: "center" });
//     doc.moveDown();
//     doc.text(`Invoice ID: ${invoice.InvoiceId}`);
//     doc.text(`Guest Name: ${invoice.GuestId.name}`);
//     doc.text(`Total Amount: $${invoice.TotalAmount}`);
//     doc.text(`Payment Mode: ${invoice.PaymentMode}`);
//     doc.text(`Service Charges: ${invoice.ServiceCharges}`);
//     doc.text(`Booking ID: ${invoice.BookingId._id}`);
//     doc.end();

//     res.download(filePath, fileName);
//   } catch (error) {
//     console.error("Error generating invoice:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });




router.get("/invoice/download/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid invoice ID" });
  }

  try {
    const invoice = await Billing.findById(id)
      .populate("GuestId", "name email")
      .populate("BookingId");

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // ✅ Ensure GuestId exists before accessing properties
    const guestName = invoice.GuestId ? invoice.GuestId.name : "N/A";
    const guestEmail = invoice.GuestId ? invoice.GuestId.email : "N/A";

    // ✅ Ensure invoices directory exists
    const invoiceDir = path.join(__dirname, "../invoices");
    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }

    const fileName = `invoice-${invoice._id}.pdf`;
    const filePath = path.join(invoiceDir, fileName);

    console.log("Invoice directory path:", invoiceDir);
    console.log("Full invoice file path:", filePath);

    // ✅ Ensure file does not already exist before overwriting
    if (fs.existsSync(filePath)) {
      console.log("Invoice already exists. Sending file...");
      return res.download(filePath, fileName);
    }

    // ✅ Generate PDF
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text("Hotel Invoice", { align: "center" });
    doc.moveDown();
    doc.text(`Invoice ID: ${invoice.InvoiceId}`);
    doc.text(`Guest Name: ${guestName}`);
    doc.text(`Guest Email: ${guestEmail}`);
    doc.text(`Total Amount: $${invoice.TotalAmount}`);
    doc.text(`Payment Mode: ${invoice.PaymentMode}`);
    doc.text(`Service Charges: ${invoice.ServiceCharges}`);
    doc.text(`Booking ID: ${invoice.BookingId ? invoice.BookingId._id : "N/A"}`);
    doc.end();

    // ✅ Send response only after file is created
    writeStream.on("finish", () => {
      res.download(filePath, fileName);
    });

    writeStream.on("error", (err) => {
      console.error("Error writing file:", err);
      res.status(500).json({ error: "Error generating invoice file" });
    });

  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
