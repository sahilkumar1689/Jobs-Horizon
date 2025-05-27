const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    autoId: {
      type: Number,
      required: true,
    },
    skillName: {
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

module.exports = mongoose.model("Skill", SkillSchema);
