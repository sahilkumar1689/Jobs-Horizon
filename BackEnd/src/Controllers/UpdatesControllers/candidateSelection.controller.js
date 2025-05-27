const Candidate = require("../../Models/CandidateModel/Candidate.model");
const Mail = require("../../Utility/nodemailer");

const candidateSelection = async (req, res) => {
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

    // Checking complete data sended or not:
    const { jobId, studentId, result } = req.body;

    if (!jobId || !studentId || !result)
      return res.status(400).json({
        message: "Information Missing.",
      });

    // Check if the candidate present or not:
    const candidateObj = await Candidate.findById(studentId).populate([
      {
        path: "skills",
        select: "skillName",
      },
      {
        path: "preferLocation",
        select: "locationName",
      },
      {
        path: "userId",
        select: "email",
      },
    ]);

    if (!candidateObj)
      return res.status(400).json({
        message: "Student Not Found.",
      });

    // try to update the status of the candidate:
    candidateObj.jobApplied.forEach((elem, idx) => {
      // Try to compare the two object Ids:
      if (elem.jobId.equals(jobId)) {
        elem.status = result;
      }
    });

    // After that save the document:
    const savedObj = await candidateObj.save();

    // Sending the mail:
    const mailObj = {
      from: '"Temp Mail From Node Mailer 👻" <sahilKumar32755@gmail.com>', // sender address
      to: savedObj.userId.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>You Are Short Listed Further Details Send You Soon.</b>", // html body
    };

    const response = await Mail(mailObj);

    return res.status(200).json({
      message: "Status Updated Successfully",
      updatedData: savedObj,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error, Try Again Later.",
    });
  }
};

module.exports = candidateSelection;
