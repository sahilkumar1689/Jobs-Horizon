const express = require("express");
const contactRouter = express.Router();

const contactUsController = require("../../Controllers/ContactUsController/contactUs.Controller");

contactRouter.post("/contactUs", contactUsController);

module.exports = contactRouter;
