const express = require("express");
const router = express.Router();
const Housekeeping = require("../Models/Housekeeping&Maintaince");
const { body, validationResult } = require("express-validator");

// ✅ POST: Create a new housekeeping task
router.post(
  "/create",
  [
    body("roomId", "Room ID is required").notEmpty(),
    body("assignedStaffId", "Assigned Staff ID is required").notEmpty(),
    body("taskType", "Invalid task type").isIn(["Cleaning", "Maintenance", "Inspection"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { roomId, assignedStaffId, taskType, remarks } = req.body;
      const newTask = new Housekeeping({ roomId, assignedStaffId, taskType, remarks });
      await newTask.save();
      res.status(201).json({ message: "Housekeeping task created successfully", task: newTask });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ✅ GET: Fetch all housekeeping tasks
router.get("/get", async (req, res) => {
  try {
    const tasks = await Housekeeping.find().populate("roomId assignedStaffId");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ PUT: Update task status
// router.put(
//   "/update/:taskId",
//   [
//     body("status", "Invalid status").isIn(["Pending", "In Progress", "Completed"]),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { taskId } = req.params;
//       const { status, remarks } = req.body;
//       const updatedTask = await Housekeeping.findByIdAndUpdate(
//         taskId,
//         { status, remarks },
//         { new: true }
//       );

//       if (!updatedTask) {
//         return res.status(404).json({ error: "Task not found" });
//       }

//       res.status(200).json({ message: "Task updated successfully", task: updatedTask });
//     } catch (error) {
//       console.error("Error updating task:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );
const mongoose = require("mongoose");

router.put(
  "/update/:id", // Change `taskId` to `id`
  [
    body("status", "Invalid status").isIn(["Pending", "In Progress", "Completed"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params; // Get `_id` instead of `taskId`

      // Check if `id` is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Task ID format" });
      }

      const { status, remarks } = req.body;
      const updatedTask = await Housekeeping.findByIdAndUpdate(
        id, // Use `_id` for searching
        { status, remarks },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


module.exports = router;
