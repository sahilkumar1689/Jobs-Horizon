const Skill = require("../../Models/SkillsAndLocationModels/Skill.model");

const getSkills = async (req, res) => {
  try {
    const skillsArr = await Skill.find().select("-createdAt -updatedAt -__v");

    if (!skillsArr)
      return res.status(400).json({
        message: "Error While Fetching Skill.",
      });

    return res.status(200).json({
      message: "Data Sent Successfullly.",
      skills: skillsArr,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error, Try Again Later.",
    });
  }
};

module.exports = getSkills;
