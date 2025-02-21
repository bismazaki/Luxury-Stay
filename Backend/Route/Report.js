const express = require("express");
const mongoose = require("mongoose");
const Report = require("../Models/ReportsAnalytics"); // Import Report model

const router = express.Router();

// ✅ 1. Create a new report
router.post("/", async (req, res) => {
  try {
    const { reportType, generatedBy } = req.body;

    // Validate required fields
    if (!reportType || !generatedBy) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new report
    const newReport = new Report({ reportType, generatedBy });
    await newReport.save();

    res.status(201).json({ message: "Report created successfully", newReport });
  } catch (error) {
    res.status(500).json({ message: "Error creating report", error: error.message });
  }
});

// ✅ 2. Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().populate("generatedBy", "name email"); // Populate user info
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
});

// ✅ 3. Get a single report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate("generatedBy", "name email");
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error: error.message });
  }
});

// ✅ 4. Update a report by ID
router.put("/:id", async (req, res) => {
  try {
    const { reportType, generatedBy } = req.body;
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { reportType, generatedBy },
      { new: true, runValidators: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report updated successfully", updatedReport });
  } catch (error) {
    res.status(500).json({ message: "Error updating report", error: error.message });
  }
});

// ✅ 5. Delete a report by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error: error.message });
  }
});

module.exports = router;
