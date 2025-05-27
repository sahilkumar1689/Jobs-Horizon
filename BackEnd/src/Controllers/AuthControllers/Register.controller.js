const User = require("../../Models/AuthModel/User.model");
const Candidate = require("../../Models/CandidateModel/Candidate.model");
const Company = require("../../Models/CompanyModel/Company.model");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { createJwtToken } = require("../../Utility/CreateToken");

const registerController = [
  check("firstName")
    .notEmpty()
    .withMessage("Please Enter First Name")
    .bail()
    .trim()
    .isLength({ min: 3 })
    .withMessage("First Name atleast contains 3 Character.")
    .bail()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name should be alphabets."),

  check("lastName")
    .notEmpty()
    .withMessage("Please Enter Last Name")
    .bail()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last Name atleast contains 3 Character.")
    .bail()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name should be alphabets."),

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
      if (num !== 1 && num !== 2) {
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

      const { firstName, lastName, password, email, userType } = req.body;

      // Check if user already existed:
      const existedUser = await User.findOne({ email });
      if (existedUser)
        return res.status(400).json({ message: "User Already Exists." });

      // Try to hash the password:
      const hashedPassword = await bcrypt.hash(password, 12);

      // Creating new user:
      const newUser = await User.create({
        firstName,
        lastName,
        password: hashedPassword,
        email,
        userType,
        status: true,
      });

      // According to the userType set Jwt token:
      if (newUser) {
        if (newUser.userType == 1) {
          const newStudent = await Candidate.create({ userId: newUser.id });
          if (newStudent) {
            // Generating the token:
            const payload = {
              studentId: newStudent.id,
              userType: 1,
            };

            const newToken = createJwtToken(payload);

            return res.status(200).json({
              message: "Student Created Successfully.",
              token: newToken,
              userType: 1,
            });
          }
        } else if (newUser.userType == 2) {
          const newCompany = await Company.create({ userId: newUser.id });
          if (newCompany) {
            // Generating the token:
            const payload = {
              companyId: newCompany.id,
              userType: 2,
            };

            const newToken = createJwtToken(payload);

            return res.status(200).json({
              message: "Recruiter Created Successfully",
              token: newToken,
              userType: 2,
            });
          }
        }
      } else
        return res.status(400).json({
          message: "Something Went Wrong,Try Again Later",
        });
    } catch (err) {
      return res.status(500).json({
        message: "Server Error Try Again Later",
        success: false,
      });
    }
  },
];

module.exports = { registerController };
