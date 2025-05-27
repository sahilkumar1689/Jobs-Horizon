const Company = require("../../Models/CompanyModel/Company.model");

const companyDetailsController = async (req, res) => {
  try {
    const data = req.userPayload;
    // console.log(req.userPayload);

    if (!data)
      return res.status(401).json({
        message: "Token Missing",
      });

    // Find the company on the basis of token;

    const companyObj = await Company.findOne({ _id: data.companyId })
      .select("-__v -_id -userId -createdAt -updatedAt -logoCloudinaryId") // For Candidate fields
      .populate({
        path: "userId",
        select: "-_id -__v -createdAt -updatedAt -password", // For populated User fields
      })
      .populate({
        path: "location",
        select: "locationName", // For populated User fields
      });

    if (!companyObj)
      return res.status(404).json({
        message: "Company Not Found.",
      });

    if (companyObj) {
      return res.status(200).json({
        message: "Company details send successfully.",
        details: companyObj,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server Error Try Again Later.",
    });
  }
};

module.exports = companyDetailsController;
