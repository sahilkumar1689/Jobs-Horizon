const Location = require("../../Models/SkillsAndLocationModels/Location.model");

const addLocationController = async (req, res) => {
  try {
    // Authorization and Token Checking:
    const data = req.userPayload;

    if (!data)
      return res.status(400).json({
        message: "Token Not Present",
      });

    if (data.userType !== 3)
      return res.status(401).json({
        message: "You are not Authorized to add a job.",
      });

    // Checking for the skill Name:
    const { locationName } = req.body;

    if (!locationName)
      return res.status(400).json({
        message: "Skill Name Not Found.",
      });

    // Checking for the skill Name Already Present:
    const locationPresent = await Location.findOne({
      locationName:
        locationName.charAt(0).toUpperCase() + locationName.slice(1),
    });

    if (locationPresent)
      return res.status(400).json({
        message: "Location Already Present.",
      });

    // Creating the model and save:
    const totalLocation = await Location.countDocuments();

    const locationObj = await Location.insertOne({
      autoId: totalLocation + 1,
      locationName,
      status: true,
    });

    if (!locationObj)
      return res.status(400).json({
        message: "Error While Saving the skills.",
      });

    return res.status(200).json({
      status: "success",
      message: "Location Add Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error,Try Again Later.",
    });
  }
};

module.exports = addLocationController;
