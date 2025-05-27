const mongoose = require("mongoose");
require("dotenv").config({
  path: "./.env",
});

// console.log(process.env.DataBaseUrl);

const databaseConnection = async () => {
  try {
    const response = await mongoose.connect(
      `${process.env.DataBaseUrl}/Storage`
    );
    // console.log("Response is:",response);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = databaseConnection;
