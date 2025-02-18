const express = require("express");
const router = express.Router();
const Room = require("../Models/Room");
const { body, validationResult } = require("express-validator");

// GET api/rooms - Fetch all rooms
router.get("/getrooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST api/rooms - Add a new room

router.post(
    "/addroom",
    [
      body("roomId", "Room ID is required").notEmpty(),
      body("roomType", "Room type is required").notEmpty(),
      body("pricePerNight", "Price per night is required").isNumeric(),
      body("availabilityStatus", "Availability status is required")
        .isIn(["Available", "Booked", "Under Maintenance", "Cleaning"]), // Updated validation
    ],
    async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        // Create and save the new room
        const room = new Room({
          roomId: req.body.roomId,
          roomType: req.body.roomType,
          pricePerNight: req.body.pricePerNight,
          availabilityStatus: req.body.availabilityStatus,
        });
        await room.save(); // ✅ Save the room to the database
  
        res.status(201).json({ message: "Room added successfully!", room });
      } catch (err) {
        res.status(500).json({ message: "Error adding room", error: err.message });
      }
    }
  );
  

module.exports = router;
