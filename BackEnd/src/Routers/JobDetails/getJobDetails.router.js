const express = require("express");
const jobDetailRouter = express.Router();

const getSpecificJobController = require("../../Controllers/JobDetailsController/specificJob.controller");

const getAllPaginateController = require("../../Controllers/JobDetailsController/getJobPagenate.controller");

jobDetailRouter.get("/specificJob/:jobId", getSpecificJobController);
jobDetailRouter.get("/getAllPaginate", getAllPaginateController);

module.exports = jobDetailRouter;
