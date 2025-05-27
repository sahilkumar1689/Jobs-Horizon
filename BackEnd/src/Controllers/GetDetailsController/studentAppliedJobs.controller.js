const Candidate = require("../../Models/CandidateModel/Candidate.model");

const studentAppliedJobs = async (req, res) => {
  try {
    const data = req.userPayload;

    if (!data)
      return res.status(400).json({
        message: "Token Not Found.",
      });

    if (data.userType !== 1)
      return res.status(400).json({
        message: "You are not authorized to access this data.",
      });

    // Fetch candidate and populate job details, including company and location
    const jobObj = await Candidate.findOne({ _id: data.studentId }).populate({
      path: "jobApplied.jobId",
      select: "_id title location empStatus companyId",
      populate: [
        {
          path: "companyId",
          select: "_id companyName companyLogo",
        },
        {
          path: "location",
          select: "locationName", // Adjust field name based on your Location schema
        },
      ],
    });

    if (!jobObj)
      return res.status(400).json({
        message: "Student Not Found, Invalid Student Id.",
      });

    // Log the fully populated data (optional for debugging)
    // console.log("jobObj (Populated):", JSON.stringify(jobObj, null, 2));

    const jobAppliedArr = jobObj.jobApplied.map((item) => {
      return {
        companyName: item.jobId.companyId.companyName,
        companyLogo: item.jobId.companyId.companyLogo,
        jobTitle: item.jobId.title,
        location: item.jobId.location?.locationName || "N/A", // handle missing location
        empStatus: item.jobId.empStatus,
        status: item.status,
      };
    });

    return res.status(200).json({
      message: "Applied Job data sent successfully.",
      jobArr: jobAppliedArr,
    });
  } catch (err) {
    console.error("Error in studentAppliedJobs:", err);
    return res.status(500).json({
      message: "Server Error, Try Again Later.",
    });
  }
};

module.exports = studentAppliedJobs;
