const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    websiteUrl: {
      type: String,
      default: "",
    },
    location: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
      default: [],
    },
    companyLogo: {
      type: String,
      default: "",
    },
    logoCloudinaryId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
