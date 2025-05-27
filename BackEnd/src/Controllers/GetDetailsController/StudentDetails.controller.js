const Candidate = require("../../Models/CandidateModel/Candidate.model");

const studentDetailsController = async (req, res) => {
  try {
    const data = req.userPayload;
    // console.log(req.userPayload);

    if (!data)
      return res.status(401).json({
        message: "Token Missing",
      });

    // Find the candidate on the basis of token studentId;

    const candidateObj = await Candidate.findOne({ _id: data.studentId })
      .select(
        "-__v -_id -userId -createdAt -updatedAt -jobApplied -cloudinaryId"
      ) // For Candidate fields
      .populate({
        path: "userId",
        select: "-_id -__v -createdAt -updatedAt -password", // For populated User fields
      })
      .populate({
        path: "skills",
        select: "skillName", // For populated User fields
      })
      .populate({
        path: "preferLocation",
        select: "locationName", // For populated User fields
      });

    if (!candidateObj)
      return res.status(404).json({
        message: "Candidate Not Found.",
      });

    if (candidateObj) {
      return res.status(200).json({
        message: "Candidate details send successfully.",
        details: candidateObj,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server Error Try Again Later.",
    });
  }
};

module.exports = studentDetailsController;
