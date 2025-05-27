const User = require("../../Models/AuthModel/User.model");
const Company = require("../../Models/CompanyModel/Company.model");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../../Utility/CloudinaryUtilities/Cloudinary");

const companyUpdateController = async (req, res) => {
  try {
    // Checking for the user Payload data:
    const data = req.userPayload;
    // console.log(req.userPayload);

    if (!data)
      return res.status(401).json({
        message: "Token Missing",
      });

    // Find the candidate on the basis of token studentId:

    const companyObj = await Company.findOne({ _id: data.companyId }).populate(
      "userId"
    );

    // console.log(candidateObj);

    if (!companyObj)
      return res.status(404).json({
        message: "Company Not Found.",
      });

    // Checking if the images present then store in the cloudinary:
    const fileObj = req.file;
    // console.log(fileObj);
    if (fileObj) {
      const filePath = fileObj.path;
      const uploadResponse = await uploadOnCloudinary(
        filePath,
        companyObj.id,
        companyObj.userId.userType
      );

      if (!uploadResponse)
        return res.status(500).json({
          message: "File Upload Failed,Try Again Later",
        });

      if (companyObj.logoCloudinaryId) {
        const deleteResponse = await deleteFromCloudinary(
          companyObj.logoCloudinaryId
        );
        if (!deleteResponse)
          return res.status(500).json({
            message: "File Upload Failed,Try Again Later",
          });
      }

      companyObj.logoCloudinaryId = uploadResponse.public_id;
      companyObj.companyLogo = uploadResponse.url;
    }

    // Parse JSON fields if needed:
    ["location"].forEach((field) => {
      if (req.body[field] && typeof req.body[field] === "string") {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          console.error(`Invalid JSON in field ${field}:`, e);
        }
      }
    });

    // update rest of the fields if present:
    const { companyName, description, websiteUrl, location } = req.body;

    if (companyName) companyObj.companyName = companyName;

    if (description) companyObj.description = description;

    if (websiteUrl) companyObj.websiteUrl = websiteUrl;

    if (location) companyObj.location = [...location];

    // Save the candidate object:
    const updatedCompany = await companyObj.save();

    if (updatedCompany)
      return res.status(200).json({
        message: "Company Details Updated Successfully.",
        // updatedData: updatedCompany,
      });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error Try Again Later",
    });
  }
};

module.exports = companyUpdateController;
