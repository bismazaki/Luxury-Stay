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

module.exports = router;
