const JobPost = require("../../Models/JobPostModel/JobPost.model");

const getPaginate = async (req, res) => {
  try {
    // Checking the limit and page:
    const limit = parseInt(req.query.limit) || 2;
    const page = parseInt(req.query.page) || 1;

    const skip = (page - 1) * limit;

    // Fetch paginated jobs
    const jobs = await JobPost.find()
      .sort({ createdAt: -1 }) // optional: latest first
      .skip(skip)
      .limit(limit)
      .select("_id title location empStatus")
      .populate({
        path: "companyId",
        select: "companyName companyLogo",
      })
      .populate({
        path: "location",
        select: "locationName",
      });

    // Total count for pagination
    const totalJobs = await JobPost.countDocuments();

    // Total pages
    const totalPages = Math.ceil(totalJobs / limit);

    return res.status(200).json({
      message: "Jobs fetched successfully",
      currentPage: page,
      totalPages,
      totalJobs,
      limit,
      data: jobs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = getPaginate;
