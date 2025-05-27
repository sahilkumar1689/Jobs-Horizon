const jobPost = require("../../Models/JobPostModel/JobPost.model");

const searchController = async (req, res) => {
  try {
    const { jobTitle, jobLocation, empStatus } = req.body;

    if (!jobTitle || !jobLocation || !empStatus) {
      return res.status(400).json({
        message: "All Details Are Requried.",
      });
    }

    // If location is anywhere send all data:
    let jobs;
    let filteredJobs;

    if (jobLocation === "Anywhere") {
      jobs = await jobPost
        .find()
        .populate("location")
        .populate("skills")
        .populate("companyId", "companyName companyLogo");

      filteredJobs = jobs;
    } else {
      // Fetch and populate location
      jobs = await jobPost
        .find({
          empStatus: empStatus,
          title: { $regex: jobTitle, $options: "i" },
        })
        .populate("location")
        .populate("skills")
        .populate("companyId", "companyName companyLogo");

      // Filter jobs by location name match
      filteredJobs = jobs.filter((job) =>
        job.location?.locationName
          ?.toLowerCase()
          .includes(jobLocation.toLowerCase())
      );
    }

    // console.log("data:", filteredJobs);

    // Send only selected fields
    const trimmedJobs = filteredJobs.map((job) => ({
      id: job._id,
      companyName: job.companyId?.companyName || "",
      companyLogo: job.companyId?.companyLogo || "",
      title: job.title,
      empStatus: job.empStatus,
      location: job.location?.locationName || "",
      skills: job.skills.map((elem) => elem.skillName) || "",
      description: job.description,
    }));

    return res.status(200).json({
      results: trimmedJobs.length,
      data: trimmedJobs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error, Try Again Later.",
    });
  }
};

module.exports = searchController;
