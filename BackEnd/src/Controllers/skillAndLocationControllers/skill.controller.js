const Skill = require("../../Models/SkillsAndLocationModels/Skill.model");

const addSkillController = async (req, res) => {
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
    const { skillName } = req.body;

    if (!skillName)
      return res.status(400).json({
        message: "Skill Name Not Found.",
      });

    // Checking for the skill Name Already Present:
    const skillPresent = await Skill.findOne({
      skillName: skillName.charAt(0).toUpperCase() + skillName.slice(1),
    });

    if (skillPresent)
      return res.status(400).json({
        message: "Skill Already Present.",
      });

    // Creating the model and save:
    const totalSkill = await Skill.countDocuments();

    const skillObj = await Skill.insertOne({
      autoId: totalSkill + 1,
      skillName,
      status: true,
    });

    if (!skillObj)
      return res.status(400).json({
        message: "Error While Saving the skills.",
      });

    return res.status(200).json({
      status: "success",
      message: "Skill Add Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error,Try Again Later.",
    });
  }
};

module.exports = addSkillController;
