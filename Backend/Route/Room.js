const express = require("express");
const router = express.Router();
const Room = require("../Models/Room");
const { body, validationResult } = require("express-validator");

// GET /api/rooms - Fetch all rooms
router.get("/getrooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/rooms - Add a new room
router.post(
  "/addroom",
  [
    body("roomId", "Room ID is required").notEmpty(),
    body("roomType", "Room type is required").isIn(["Single", "Double", "Suite", "Deluxe"]),
    body("pricePerNight", "Price per night must be a number").isNumeric(),
    body("availabilityStatus", "Invalid availability status").isIn([
      "Available",
      "Booked",
      "Under Maintenance",
      "Cleaning",
    ]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const room = new Room(req.body);
      await room.save();
      res.status(201).json({ message: "Room added successfully!", room });
    } catch (err) {
      res.status(500).json({ message: "Error adding room", error: err.message });
    }
  }
);

// PUT /api/rooms/:id - Update room details
router.put(
  "/:id",
  [
    body("roomType").optional().isIn(["Single", "Double", "Suite", "Deluxe"]),
    body("pricePerNight").optional().isNumeric(),
    body("availabilityStatus").optional().isIn(["Available", "Booked", "Under Maintenance", "Cleaning"]),
    body("housekeepingStatus").optional().isIn(["Cleaned", "Pendings"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      res.json({ message: "Room updated successfully!", room });
    } catch (err) {
      res.status(500).json({ message: "Error updating room", error: err.message });
    }
  }
);

module.exports = router;
