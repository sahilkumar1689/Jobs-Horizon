const express = require("express");
const appliedJobRouter = express.Router();

const appliedJobController = require("../../Controllers/AppliedJobController/jobApplied.controller");

appliedJobRouter.post("/appliedJob",appliedJobController);

module.exports = appliedJobRouter;