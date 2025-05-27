const mogoose = require("mongoose");

const ContactSchema = new mogoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    contact: {
      type: Number,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mogoose.model("ContactModel", ContactSchema);
