const Company = require("../../Models/CompanyModel/Company.model");
const JobPost = require("../../Models/JobPostModel/JobPost.model");

const companyAddJobs = async (req, res) => {
  try {
    // Token Checking and the authorization checking:

    const data = req.userPayload;

    if (!data)
      return res.status(400).json({
        message: "Token Not Found.",
      });

    if (data.userType !== 2)
      return res.status(400).json({
        message: "You are not authorized to access this data.",
      });

    // Checking the company present or not:
    const companyObj = await Company.findOne({ _id: data.companyId });

    if (!companyObj)
      return res.status(400).json({
        message: "Company Not Found, Invalid Company Id.",
      });

    // Finding all the job posted by the company and their respective

    const jobsObjArr = await JobPost.find({ companyId: data.companyId })
      .select("_id autoId title location empStatus appliedCandidate")
      .populate({
        path: "appliedCandidate",
        select: "_id resume contact", // you can customize what's needed
        populate: {
          path: "userId",
          select: "firstName lastName email -_id", // only necessary user fields
        },
      })
      .populate({
        path: "location",
        select: "locationName",
      });

    // jobsObjArr.forEach((jobObj) => {
    //   jobObj.appliedCandidate.forEach((cndObj) => {
    //     cndObj.jobApplied = cndObj.jobApplied.filter(
    //       (statusObj) => statusObj.jobId.toString() === jobObj._id.toString()
    //     );
    //   });
    // });

    return res.status(200).json({
      message: "Data send Successfully.",
      data: jobsObjArr,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error , Try again later." });
  }
};

module.exports = companyAddJobs;
