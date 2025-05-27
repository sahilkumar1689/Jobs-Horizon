// Import the important Configurations:
const app = require("./app");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 3000;
const databaseConnection = require("./Config/Database.config");

// DataBase Connection Logic:
databaseConnection()
  .then((res) => {
    console.log("DataBase Connection Successful.");
    app.listen(PORT, () => {
      console.log(`Server Start Running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DataBase Connection Failed.", err.message);
  });
