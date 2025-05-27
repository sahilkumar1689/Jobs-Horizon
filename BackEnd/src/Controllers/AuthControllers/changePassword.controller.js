const User = require("../../Models/AuthModel/User.model");
const Admin = require("../../Models/AdminModel/Admin.model");
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
  try {
    // Chenking for credentials:
    const { email, newPassword, userType } = req.body;

    if (!email || !newPassword || !userType)
      return res.status(400).json({
        message: "Please Send All The Credentials.",
      });

    let userObj = null;

    if (userType === 3) {
      userObj = await Admin.findOne({ email });
    } else {
      userObj = await User.findOne({ email });
    }

    // Email Verification:

    if (!userObj)
      return res.status(400).json({
        message: "Email Invalid.",
      });

    // If email Valid then change password:

    const newHashPass = await bcrypt.hash(newPassword, 12);

    userObj.password = newHashPass;

    const newUserObj = await userObj.save();

    if (!newUserObj)
      return res.status(400).json({
        message: "Error while changing the Password.",
      });

    return res.status(200).json({
      message: "Password Change Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error, Try Again Later.",
    });
  }
};

module.exports = changePassword;
