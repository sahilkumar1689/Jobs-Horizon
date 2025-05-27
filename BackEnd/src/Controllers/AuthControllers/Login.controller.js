const User = require("../../Models/AuthModel/User.model");
const Candidate = require("../../Models/CandidateModel/Candidate.model");
const Company = require("../../Models/CompanyModel/Company.model");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { createJwtToken } = require("../../Utility/CreateToken");
const Admin = require("../../Models/AdminModel/Admin.model");

const loginController = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please Enter Valid Email.")
    .bail()
    .normalizeEmail(),

  check("password")
    .notEmpty()
    .withMessage("Please Enter the Password.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password atleast of 8 length.")
    .bail()
    .trim(),

  check("userType")
    .notEmpty()
    .withMessage("Please Enter the userType.")
    .bail()
    .isNumeric()
    .withMessage("userType need to be a number.")
    .bail()
    .custom((value) => {
      const num = Number(value);
      if (num !== 1 && num !== 2 && num !== 3) {
        throw new Error("userType need to be Valid.");
      }
      return true;
    }),
  async (req, res) => {
    try {
      // Try to checking for the errors:
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({
          message: "Bad Request Credential Not Matched",
          errorMsgArr: error.errors.map((elem) => elem.msg),
        });
      }

      const { password, email, userType } = req.body;

      // Checking for the admin login:

      if (userType === 3) {
        // Check if admin present:
        const originalAdmin = await Admin.findOne({ email });
        if (!originalAdmin) {
          return res.status(400).json({
            status: 400,
            message: "Invalid Email and Password",
          });
        }

        // Try to check if password is valid:
        const isValidPassword = await bcrypt.compare(
          password,
          originalAdmin.password
        );

        if (!isValidPassword) {
          return res.status(400).json({
            status: 400,
            message: "Invalid Email and Password",
          });
        }

        // Creating the payload:
        const payload = {
          adminId: originalAdmin.id,
          userType: 3,
        };
        // Generating the token:
        const newToken = createJwtToken(payload);

        // Sending Response:
        return res.status(200).json({
          message: "Admin Logged In Successfully.",
          token: newToken,
          userType: 3,
        });
      }

      // Check if user present:
      const originalUser = await User.findOne({ email });
      if (!originalUser) {
        return res.status(400).json({
          status: 400,
          message: "Invalid Email and Password",
        });
      }

      // Try to check if password is valid:
      const isValidPassword = await bcrypt.compare(
        password,
        originalUser.password
      );

      if (!isValidPassword) {
        return res.status(400).json({
          status: 400,
          message: "Invalid Email and Password",
        });
      }

      // According to the userType set Jwt token:
      if (originalUser) {
        if (!originalUser.status) {
          return res.status(400).json({
            message: "User Has No Access to Login.",
          });
        }

        if (originalUser.userType === 1) {
          const studentObj = await Candidate.findOne({
            userId: originalUser.id,
          });

          if (studentObj) {
            // Generating the token:
            const payload = {
              studentId: studentObj.id,
              userType: 1,
            };

            const newToken = createJwtToken(payload);

            return res.status(200).json({
              message: "Student Logged In Successfully.",
              token: newToken,
              userType: 1,
            });
          } else
            return res.status(400).json({
              message: "Student Not Present.",
            });
        } else if (originalUser.userType === 2) {
          const companyObj = await Company.findOne({ userId: originalUser.id });
          if (companyObj) {
            // Generating the token:
            const payload = {
              companyId: companyObj.id,
              userType: 2,
            };

            const newToken = createJwtToken(payload);

            return res.status(200).json({
              message: "Recruiter Logged In Successfully.",
              token: newToken,
              userType: 2,
            });
          }
        }
      }
    } catch (err) {
      return res.status(500).json({
        message: "Server Error Try Again Later",
        success: false,
      });
    }
  },
];

module.exports = { loginController };
