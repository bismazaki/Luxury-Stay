const mongoose = require("mongoose");

const housekeepingSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Unique Task ID
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room", // Foreign key reference to Room collection
    required: true,
  },
  assignedStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Foreign key reference to User collection
    required: true,
  },
  taskType: {
    type: String,
    enum: ["Cleaning", "Maintenance", "Inspection"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "In Progress",
  },
  remarks: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Housekeeping", housekeepingSchema);
