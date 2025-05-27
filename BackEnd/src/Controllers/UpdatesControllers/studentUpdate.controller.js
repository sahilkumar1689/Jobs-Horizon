const Candidate = require("../../Models/CandidateModel/Candidate.model");
const User = require("../../Models/AuthModel/User.model");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../../Utility/CloudinaryUtilities/Cloudinary");

const studentUpdateController = async (req, res) => {
  try {
    // Checking for the user Payload data:
    const data = req.userPayload;
    // console.log(req.userPayload);

    if (!data)
      return res.status(401).json({
        message: "Token Missing",
      });

    // Find the candidate on the basis of token studentId;

    const candidateObj = await Candidate.findOne({
      _id: data.studentId,
    }).populate({
      path: "userId",
      select: "-password -createdAt -updatedAt -__v -status",
    });

    // console.log(candidateObj);

    if (!candidateObj)
      return res.status(404).json({
        message: "Candidate Not Found.",
      });

    // Checking if the images present then store in the cloudinary:
    const filesCount = Object.keys(req.files || {}).length;

    if (filesCount !== 0) {
      if (req.files?.bioImg) {
        const filePath = req.files.bioImg[0].path;
        const uploadResponse = await uploadOnCloudinary(
          filePath,
          candidateObj.id,
          candidateObj.userId.userType
        );

        if (!uploadResponse)
          return res.status(500).json({
            message: "File Upload Failed,Try Again Later",
          });

        if (candidateObj.cloudinaryId.bioImgId) {
          const deleteResponse = await deleteFromCloudinary(
            candidateObj.cloudinaryId.bioImgId
          );
          if (!deleteResponse)
            return res.status(500).json({
              message: "File Upload Failed,Try Again Later",
            });
        }

        candidateObj.cloudinaryId.bioImgId = uploadResponse.public_id;
        candidateObj.bioImg = uploadResponse.url;
      }

      if (req.files?.resume) {
        const filePath = req.files.resume[0].path;
        const uploadResponse = await uploadOnCloudinary(
          filePath,
          candidateObj.id,
          candidateObj.userId.userType
        );

        if (!uploadResponse)
          return res.status(500).json({
            message: "File Upload Failed,Try Again Later",
          });

        if (candidateObj.cloudinaryId.resumeId) {
          const deleteResponse = await deleteFromCloudinary(
            candidateObj.cloudinaryId.resumeId
          );
          if (!deleteResponse)
            return res.status(500).json({
              message: "File Upload Failed,Try Again Later",
            });
        }

        candidateObj.cloudinaryId.resumeId = uploadResponse.public_id;
        candidateObj.resume = uploadResponse.url;
      }
    }

    // Parse JSON fields if needed
    ["skills", "preferLocation", "experience", "qualification"].forEach(
      (field) => {
        if (req.body[field] && typeof req.body[field] === "string") {
          try {
            req.body[field] = JSON.parse(req.body[field]);
          } catch (e) {
            console.error(`Invalid JSON in field ${field}:`, e);
          }
        }
      }
    );

    // update rest of the fields if present:
    const {
      bio,
      contact,
      currentLocation,
      firstName,
      lastName,
      skills,
      preferLocation,
      experience,
      qualification,
    } = req.body;

    if (bio) candidateObj.bio = bio;

    if (contact) candidateObj.contact = Number(contact);

    if (currentLocation) candidateObj.currentLocation = currentLocation;

    if (firstName && lastName) {
      let userObj = await User.findOne({ _id: candidateObj.userId });
      userObj.firstName = firstName;
      userObj.lastName = lastName;

      await userObj.save();
    }

    if (skills && skills.length !== 0) candidateObj.skills = [...skills];

    if (preferLocation && preferLocation.length !== 0)
      candidateObj.preferLocation = [...preferLocation];

    if (experience) candidateObj.experience = [...experience];

    if (qualification) candidateObj.qualification = [...qualification];

    // Save the candidate object:
    const updatedCandidate = await candidateObj.save();
    // const updatedCandidate = updateObj
    //   .populate({
    //     path: "skills",
    //     select: "skillName", // For populated User fields
    //   })
    //   .populate({
    //     path: "preferLocation",
    //     select: "locationName", // For populated User fields
    //   });

    if (updatedCandidate)
      return res.status(200).json({
        message: "Candidate Details Updated Successfully",
        // updatedData: updatedCandidate,
      });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error,Try Again Later",
      error: err.message,
    });
  }
};

module.exports = studentUpdateController;
