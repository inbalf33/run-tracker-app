const mongoose = require("mongoose");

const runSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    distance: {
      type: Number,
      required: true,
      min: [0.1, "Distance must be greater than 0"],
    },
    duration: {
      type: Number, 
      required: true,
      min: [1, "Duration must be at least 1 minute"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      maxLength: 500,
    },
  },
  { timestamps: true }
);

const Run = mongoose.model("Run", runSchema);

module.exports = Run;