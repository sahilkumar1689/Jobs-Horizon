const express = require("express");
const detailsRotuer = express.Router();

const getSkills = require("../../Controllers/skillAndLocationControllers/getSkills.controller");

const getLocation = require("../../Controllers/skillAndLocationControllers/getLocations.controller");

detailsRotuer.get("/skills", getSkills);
detailsRotuer.get("/locations", getLocation);

module.exports = detailsRotuer;
