const express = require("express");
const getDetails = express.Router();

const studentDetailsController = require("../../Controllers/GetDetailsController/StudentDetails.controller");

const companyDetailsController = require("../../Controllers/GetDetailsController/CompanyDetails.Controller");

const companyAddJobsController = require("../../Controllers/GetDetailsController/companyAddJobs.controller");

const studentAppliedJobsController = require("../../Controllers/GetDetailsController/studentAppliedJobs.controller");


getDetails.get("/getStdData",studentDetailsController);
getDetails.get("/getCompanyData",companyDetailsController);

getDetails.get("/companyAddedJobs",companyAddJobsController);

getDetails.get("/studentAppliedJobs",studentAppliedJobsController);

module.exports = getDetails;