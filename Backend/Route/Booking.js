const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');

const router = express.Router();

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post(
    '/booking',
    [
        body('guestId').notEmpty().isMongoId().withMessage('Invalid guest ID'),
        body('roomId').notEmpty().isMongoId().withMessage('Invalid room ID'),
        body('checkInDate').notEmpty().isISO8601().withMessage('Invalid check-in date'),
        body('checkOutDate').notEmpty().isISO8601().withMessage('Invalid check-out date'),
        body('totalAmount').isFloat({ min: 0 }).withMessage('Total amount must be a positive number'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { guestId, roomId, checkInDate, checkOutDate, totalAmount } = req.body;

            const newBooking = new Booking({
                guestId,
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
        const bookings = await Booking.find().populate('guestId', 'name email').populate('roomId', 'roomNumber');
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
// router.put('/update:id/cancel', async (req, res) => {
//     try {
//         const booking = await Booking.findById(req.params.id);

//         if (!booking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         booking.status = "Cancelled";
//         await booking.save();

//         res.status(200).json({ message: "Booking cancelled successfully", booking });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });
router.put('/update/:id/cancel', async (req, res) => {
    try {
        const { checkOutDate, totalAmount } = req.body; // Get updated fields

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Update the fields only if new values are provided
        if (checkOutDate) booking.checkOutDate = checkOutDate;
        if (totalAmount) booking.totalAmount = totalAmount;

        booking.status = "Cancelled"; // Set status to Cancelled
        await booking.save();

        res.status(200).json({ message: "Booking updated & cancelled successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;
