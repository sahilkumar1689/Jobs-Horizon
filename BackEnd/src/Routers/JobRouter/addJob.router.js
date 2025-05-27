const express = require("express");
const addJobRouter = express.Router();
const upload = require("../../Middleware/MulterMiddlewares/multerUpload");

const addJobController = require("../../Controllers/JobController/addJob.controller");

const addSkillController = require("../../Controllers/skillAndLocationControllers/skill.controller");

const addLocationController = require("../../Controllers/skillAndLocationControllers/Location.controller");

addJobRouter.post("/postJob", upload.single("jobImg"), addJobController);
addJobRouter.post("/skill", addSkillController);
addJobRouter.post("/location", addLocationController);

module.exports = addJobRouter;
