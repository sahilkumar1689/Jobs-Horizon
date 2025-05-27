const express = require("express");
const AuthRouter = express.Router();

const {
  registerController,
} = require("../../Controllers/AuthControllers/Register.controller");
const {
  loginController,
} = require("../../Controllers/AuthControllers/Login.controller");

const changePasswordController = require("../../Controllers/AuthControllers/changePassword.controller");

AuthRouter.post("/registerUser", registerController);
AuthRouter.post("/loginUser", loginController);
AuthRouter.post("/changePassword", changePasswordController);

module.exports = { AuthRouter };
