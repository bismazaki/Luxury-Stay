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

// POST /api/rooms - Add a new room (Includes Image Field)
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
    body("image", "Image URL is required").notEmpty(), // ✅ Image is required only here
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if roomId already exists
      const existingRoom = await Room.findOne({ roomId: req.body.roomId });
      if (existingRoom) {
        return res.status(400).json({ message: "Room ID already exists!" });
      }

      const room = new Room(req.body);
      await room.save();
      res.status(201).json({ message: "Room added successfully!", room });
    } catch (err) {
      res.status(500).json({ message: "Error adding room", error: err.message });
    }
  }
);

// PUT /api/rooms/:id - Update room details (No Image Field)
router.put(
  "/updateroom/:id",
  [
    body("roomType").optional().isIn(["Single", "Double", "Suite", "Deluxe"]),
    body("pricePerNight").optional().isNumeric(),
    body("availabilityStatus").optional().isIn(["Available", "Booked", "Under Maintenance", "Cleaning"]),
    body("housekeepingStatus").optional().isIn(["Cleaned", "Pending"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Remove image field if present in request body (to ensure it doesn't get updated)
      delete req.body.image;

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

// DELETE /api/rooms/:id - Delete a room
router.delete("/deleteroom/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting room", error: err.message });
  }
});

// PATCH /api/rooms/updateavailability/:id - Update room availability
router.patch(
  "/updateavailability/:id",
  [
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
      const room = await Room.findByIdAndUpdate(
        req.params.id,
        { availabilityStatus: req.body.availabilityStatus },
        { new: true }
      );

      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      res.json({ message: "Room availability updated successfully!", room });
    } catch (err) {
      res.status(500).json({ message: "Error updating availability", error: err.message });
    }
  }
);

module.exports = router;
