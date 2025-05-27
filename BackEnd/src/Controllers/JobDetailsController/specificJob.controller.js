const jobPost = require("../../Models/JobPostModel/JobPost.model");

const specificJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId)
      return res.status(400).json({
        message: "Specific Job Id Not Found.",
      });

    // Find the job data:

    const jobDataObj = await jobPost
      .findById(jobId)
      .select("-jobImgCloudinaryId -updatedAt -__v -appliedCandidate")
      .populate({
        path: "companyId",
        select: "-userId -logoCloudinaryId -__v -createdAt -updatedAt",
        populate: {
          path: "location",
          select: "locationName",
        },
      })
      .populate({
        path: "skills",
        select: "skillName",
      })
      .populate({
        path: "location",
        select: "locationName",
      });

    if (!jobDataObj)
      return res.status(400).json({
        message: "Invalid Job Id.",
      });

    return res.status(200).json({
      message: "Data Send Successfully.",
      jobDeatails: jobDataObj,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error , Try Again Later.",
    });
  }
};

module.exports = specificJob;
