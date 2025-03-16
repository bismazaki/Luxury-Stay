const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../Models/Booking');
const authMiddleware = require("../Middleware/authmiddleware");
const Room = require('../Models/Room');
const Billing = require('../Models/Billing');
const router = express.Router();
const { v4: uuidv4 } = require("uuid"); // Import UUID for unique InvoiceId

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */


router.post(
    "/create-booking",
    authMiddleware, // Protect this route
    [
        body("roomId").notEmpty().isMongoId().withMessage("Invalid room ID"),
        body("checkInDate").notEmpty().isISO8601().withMessage("Invalid check-in date"),
        body("checkOutDate").notEmpty().isISO8601().withMessage("Invalid check-out date"),
        body("totalAmount").isFloat({ min: 0 }).withMessage("Total amount must be a positive number"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { roomId, checkInDate, checkOutDate, totalAmount } = req.body;
            const guestId = req.user.id; // Extract from token
            const guestName = req.user.name; // Extract from token

            const newBooking = new Booking({
                guestId,
                guestName,
                roomId,
                checkInDate,
                checkOutDate,
                totalAmount,
                paymentStatus: "Pending",
                status: "Confirmed",
            });

            await newBooking.save();
            res.status(201).json({ message: "Booking created successfully", booking: newBooking });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
);


/**
 * @route   GET /api/bookings
 * @desc    Fetch all bookings
 * @access  Public
 */
router.get('/get-booking', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('guestId', 'email')  // Only populate necessary fields
            .populate('roomId', 'roomType pricePerNight');

        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/get-booking-d", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find().populate("roomId"); // Populate room details

        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route   PUT /api/bookings/:id/cancel
 * @desc    Cancel a booking
 * @access  Public
 */

router.put("/:id/check-in", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        if (booking.status !== "Confirmed") {
            return res.status(400).json({ message: "Booking is not in a confirmable state" });
        }
        booking.status = "Checked-In";
        await booking.save();
        res.status(200).json({ message: "Guest checked in successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/:id/check-out", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        if (booking.status !== "Checked-In") {
            return res.status(400).json({ message: "Guest is not checked in" });
        }
        booking.status = "Checked-Out";
        await booking.save();
        res.status(200).json({ message: "Guest checked out successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
router.delete('/update/:id/cancel', authMiddleware, async (req, res) => {
    try {
        const guestId = req.user.id; // Logged-in user's ID
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Ensure that only the user who booked can delete it
        if (booking.guestId.toString() !== guestId) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own bookings" });
        }

        // Delete the booking from the database
        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
router.delete('/delete/:id/cancel', authMiddleware, async (req, res) => {
    try {
        
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Delete the booking from the database
        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// router.put('/update/:id', authMiddleware, async (req, res) => {
//     try {
//         const { checkInDate, checkOutDate } = req.body;
//         const booking = await Booking.findById(req.params.id);

//         if (!booking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         // ✅ Fetch Room details
//         const room = await Room.findById(booking.roomId);
//         if (!room || !room.pricePerNight) {
//             return res.status(400).json({ message: "Room price not found" });
//         }

//         const pricePerNight = room.pricePerNight;

//         // ✅ Update check-in/check-out date
//         if (checkInDate) booking.checkInDate = new Date(checkInDate);
//         if (checkOutDate) booking.checkOutDate = new Date(checkOutDate);

//         const checkIn = new Date(booking.checkInDate);
//         const checkOut = new Date(booking.checkOutDate);

//         if (checkOut <= checkIn) {
//             return res.status(400).json({ message: "Check-out date must be after check-in date" });
//         }

//         // ✅ Calculate total amount
//         const nights = Math.max(1, (checkOut - checkIn) / (1000 * 3600 * 24));
//         booking.totalAmount = nights * pricePerNight;

//         // ✅ Save updated booking
//         await booking.save();

//         // ✅ Update or Create Billing Entry
//         let billing = await Billing.findOne({ bookingId: booking._id });

//         if (billing) {
//             billing.TotalAmount = booking.totalAmount; // Update billing total
//             await billing.save();
//         } else {
//             billing = new Billing({
//                 bookingId: booking._id,
//                 guestId: booking.guestId,
//                 TotalAmount: booking.totalAmount,
//             });
//             await billing.save();
//         }

//         res.status(200).json({ 
//             message: "Booking updated successfully", 
//             booking: { ...booking._doc, pricePerNight },
//             billing
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });


// router.put('/update/:id', authMiddleware, async (req, res) => {
//     try {
//         const { checkInDate, checkOutDate } = req.body;
//         const booking = await Booking.findById(req.params.id);

//         if (!booking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         // ✅ Fetch Room details using ObjectId
//         const room = await Room.findById(booking.roomId);
//         if (!room || !room.pricePerNight) {
//             return res.status(400).json({ message: "Room price not found" });
//         }

//         const pricePerNight = room.pricePerNight;

//         // ✅ Update check-in/check-out date if provided
//         if (checkInDate) booking.checkInDate = new Date(checkInDate);
//         if (checkOutDate) booking.checkOutDate = new Date(checkOutDate);

//         const checkIn = new Date(booking.checkInDate);
//         const checkOut = new Date(booking.checkOutDate);

//         if (checkOut <= checkIn) {
//             return res.status(400).json({ message: "Check-out date must be after check-in date" });
//         }

//         // ✅ Calculate total amount
//         const nights = Math.max(1, (checkOut - checkIn) / (1000 * 3600 * 24));
//         booking.totalAmount = nights * pricePerNight;

//         await booking.save();

//         res.status(200).json({ 
//             message: "Booking updated successfully", 
//             booking: { ...booking._doc, pricePerNight } 
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });





router.put('/update/:id', authMiddleware, async (req, res) => {
    try {
        const { checkInDate, checkOutDate } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // ✅ Fetch Room details
        const room = await Room.findById(booking.roomId);
        if (!room || !room.pricePerNight) {
            return res.status(400).json({ message: "Room price not found" });
        }

        const pricePerNight = room.pricePerNight;

        // ✅ Update check-in/check-out date
        if (checkInDate) booking.checkInDate = new Date(checkInDate);
        if (checkOutDate) booking.checkOutDate = new Date(checkOutDate);

        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);

        if (checkOut <= checkIn) {
            return res.status(400).json({ message: "Check-out date must be after check-in date" });
        }

        // ✅ Calculate total amount
        const nights = Math.max(1, (checkOut - checkIn) / (1000 * 3600 * 24));
        booking.totalAmount = nights * pricePerNight;

        // ✅ Save updated booking
        await booking.save();

        // ✅ Update or Create Billing Entry
        let billing = await Billing.findOne({ BookingId: booking._id });

        if (billing) {
            billing.TotalAmount = booking.totalAmount; // ✅ Only update total amount
            await billing.save();
        } else {
            billing = new Billing({
                InvoiceId: `INV-${uuidv4()}`,  // ✅ Generate only when creating new entry
                GuestId: booking.guestId,
                BookingId: booking._id,
                TotalAmount: booking.totalAmount,
                PaymentMode: "Cash" // Default payment mode
            });
            await billing.save();
        }

        res.status(200).json({ 
            message: "Booking updated successfully", 
            booking: { ...booking._doc, pricePerNight },
            billing
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



router.get('/booking-history', authMiddleware, async (req, res) => {
    try {
        const guestId = req.user.id; // Extract logged-in user's ID

        const bookings = await Booking.find({ guestId })
            .populate('guestId', 'name email') // Fetch user's name & email
            .populate('roomId', 'roomType pricePerNight image') // Fetch room details
            .select('checkInDate checkOutDate totalAmount paymentStatus status'); // Fetch only necessary fields

        if (!bookings.length) {
            return res.status(404).json({ message: "No booking history found for this user." });
        }

        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
