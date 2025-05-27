const ContactModel = require("../../Models/ContactModel/contactUs.model");
const { check, validationResult } = require("express-validator");

const contactUs = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("First Name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please Enter Valid Email.")
    .bail()
    .normalizeEmail(),
  check("contact").notEmpty().withMessage("Contact Number is required"),
  check("message").notEmpty().withMessage("Message is required"),

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

      const { firstName, lastName, email, contact, message } = req.body;

      if (!firstName || !lastName || !email || !contact || !message)
        return res.status(400).json({
          message: "All Details Are Required.",
        });

      const newObj = await ContactModel.insertOne({
        firstName,
        lastName,
        email,
        contact: Number(contact),
        message,
      });

      if (!newObj)
        return res.status(400).json({
          message: "Something Went Wrong while saving the data.",
        });

      return res.status(200).json({
        message: "Details Send Successfully.",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server Error, Try Again Later.",
      });
    }
  },
];

module.exports = contactUs;
