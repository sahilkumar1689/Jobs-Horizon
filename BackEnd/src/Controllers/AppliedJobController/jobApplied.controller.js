const JobPost = require("../../Models/JobPostModel/JobPost.model");
const Candidate = require("../../Models/CandidateModel/Candidate.model");

const appliedJobController = async (req, res) => {
  try {
    // Token Checking and autorization checking:
    const data = req.userPayload;

    if (!data)
      return res.status(400).json({
        message: "Token Not Found",
      });

    if (data.userType !== 1)
      return res.status(401).json({
        message: "Your are not authorized for applied a job.",
      });

    // Check the student is present or not:

    const studentObj = await Candidate.findOne({ _id: data.studentId });

    if (!studentObj)
      return res.status(400).json({
        message: "Invalid Student Id",
      });

    // Check the job id:
    const { jobAppliedId } = req.body;

    if (!jobAppliedId)
      return res.status(400).json({
        message: "Job Applied Id is not found.",
      });

    const jobObj = await JobPost.findOne({ _id: jobAppliedId });

    if (!jobObj)
      return res.status(400).json({
        message: "Job Id is incorrect.",
      });

    // Check the job is already applied or not:
    const isAlreadyApplied = studentObj.jobApplied.find(
      (job) => job.jobId.toString() === jobAppliedId.toString()
    );
    if (isAlreadyApplied)
      return res.status(400).json({
        message: "You have already applied for this job.",
      });

    // Add Student id in the job obj:
    jobObj.appliedCandidate = [...jobObj.appliedCandidate, data.studentId];
    await jobObj.save();

    // Add jobid in the student obj:
    studentObj.jobApplied = [
      ...studentObj.jobApplied,
      { jobId: jobAppliedId, status: "Pending" },
    ];

    await studentObj.save();

    // Send the final Response:
    return res.status(200).json({
      message: "Job Applied Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error, Try Again Later",
    });
  }
};

module.exports = appliedJobController;
