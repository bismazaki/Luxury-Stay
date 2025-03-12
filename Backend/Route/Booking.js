const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../Models/Booking');
const authMiddleware = require("../Middleware/authmiddleware");
const router = express.Router();

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
            .populate('roomId', 'roomType');

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
//         const { checkInDate, checkOutDate, totalAmount } = req.body;
//         const booking = await Booking.findById(req.params.id).populate("roomId"); // Updated here

//         if (!booking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         // Update fields only if new values are provided
//         if (checkInDate) booking.checkInDate = checkInDate;
//         if (checkOutDate) booking.checkOutDate = checkOutDate;
//         if (totalAmount) booking.totalAmount = totalAmount;

//         await booking.save();

//         res.status(200).json({ message: "Booking updated successfully", booking });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

router.put('/update/:id', authMiddleware, async (req, res) => {
    try {
        const { checkInDate, checkOutDate } = req.body;
        const booking = await Booking.findById(req.params.id).populate("roomId", "pricePerNight")

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (checkInDate) booking.checkInDate = checkInDate;
        if (checkOutDate) booking.checkOutDate = checkOutDate;

        // Ensure room has a price per night
        if (!booking.roomId || !booking.roomId.pricePerNight) {
            return res.status(400).json({ message: "Room price not found" });
        }

        const pricePerNight = booking.roomId.pricePerNight;
        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);

        const nights = Math.max(1, (checkOut - checkIn) / (1000 * 3600 * 24)); // Minimum 1 night charge
        booking.totalAmount = nights * pricePerNight; // Update total price dynamically

        await booking.save();

        res.status(200).json({ message: "Booking updated successfully", booking });
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
