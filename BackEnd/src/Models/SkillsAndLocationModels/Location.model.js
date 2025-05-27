const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    autoId: {
      type: Number,
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
