const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: { type: String, default: "" },
    bioImg: { type: String, default: "" },
    qualification: {
      type: [
        {
          courseName: String,
          instituteName: String,
          startingYear: String,
          passingYear: String,
          percentage: String,
          backlog: Boolean,
        },
      ],
      default: [],
    },
    resume: { type: String, default: "" },
    skills: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
      default: [],
    },
    contact: { type: Number, default: "" },
    currentLocation: { type: String, default: "" },
    preferLocation: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
      default: [],
    },
    experience: {
      type: [{ company: String, role: String, duration: String }],
      default: [],
    },
    jobApplied: {
      type: [
        {
          jobId: { type: mongoose.Schema.Types.ObjectId, ref: "JobPost" },
          status: { type: String, enum: ["Pending", "Accepted", "Rejected"] },
        },
      ],
      default: [],
    },
    cloudinaryId: {
      type: {
        bioImgId: String,
        resumeId: String,
      },
      default: { bioImgId: "", resumeId: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
