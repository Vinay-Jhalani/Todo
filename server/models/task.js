const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["backlog", "not-started", "completed"],
      default: "backlog",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
