const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    autoId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    skills: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
      default: [],
    },
    empStatus: {
      type: String,
      enum: ["FullTime", "PartTime", "Contract"],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Any"],
      required: true,
    },
    deadlinedate: {
      type: String,
      required: true,
    },
    vacancy: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    jobImg: {
      type: String,
      required: true,
    },
    appliedCandidate: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
      },
    ],
    jobImgCloudinaryId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", JobPostSchema);
