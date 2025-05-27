const Location = require("../../Models/SkillsAndLocationModels/Location.model");

const getLocations = async (req, res) => {
  try {
    const locationsArr = await Location.find().select(
      "-createdAt -updatedAt -__v"
    );

    if (!locationsArr)
      return res.status(400).json({
        message: "Error While Fetching Location.",
      });

    return res.status(200).json({
      message: "Data Sent Successfullly.",
      locations: locationsArr,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error, Try Again Later.",
    });
  }
};

module.exports = getLocations;
