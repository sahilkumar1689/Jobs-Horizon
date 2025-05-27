const express = require("express");

const searchRouter = express.Router();

const searchController = require("../../Controllers/SearchController/search.controller");

searchRouter.post("/jobs", searchController);

module.exports = searchRouter;
