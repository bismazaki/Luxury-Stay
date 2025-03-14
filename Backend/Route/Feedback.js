const express = require("express");
const router = express.Router();
const Feedback = require("../Models/Feedback");
const { body, validationResult } = require("express-validator");

// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Public
router.post(
  "/feedback",
  [
    body("guestId").notEmpty().withMessage("Guest ID is required"),
    body("serviceType").isIn(["Room", "Food", "Cleanliness", "Customer Service"]).withMessage("Invalid service type"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comments").optional().isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { guestId, serviceType, rating, comments } = req.body;

      const newFeedback = new Feedback({
        guestId,
        serviceType,
        rating,
        comments
      });

      await newFeedback.save();

      res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
// ✅ 1. GET all feedbacks (For Admin Panel)
router.get("/get-feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("guestId", "name email").sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ 2. Update response status (Admin can change "Pending" → "Responded")
router.put(
  "/feedback/:id",
  [body("responseStatus").isIn(["Responded", "Pending"]).withMessage("Invalid response status")],
  async (req, res) => {
    const { responseStatus } = req.body;
    try {
      const feedback = await Feedback.findByIdAndUpdate(req.params.id, { responseStatus }, { new: true });
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      res.json({ message: "Feedback status updated", feedback });
    } catch (error) {
      console.error("Error updating feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ✅ 3. Delete feedback (Admin can delete)
router.delete("/feedback/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
