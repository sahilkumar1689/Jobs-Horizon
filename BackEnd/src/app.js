// Creating the App using the express:
const express = require("express");
const app = express();
const jwtAuthMiddleware = require("./Middleware/JwtVerification");

// Handle Cors:
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Important MiddleWare Configurations:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import All Routings:
const { AuthRouter } = require("./Routers/AuthRouters/Auth.router");
const getDetails = require("./Routers/GetDetailsRotuers/getDetails.router");
const updateRouter = require("./Routers/UpdateRouters/updates.router");
const addJobRouter = require("./Routers/JobRouter/addJob.router");
const appliedJobRouter = require("./Routers/JobAppliedRouter/jobapplied.router");
const jobDetailRouter = require("./Routers/JobDetails/getJobDetails.router");
const contactRouter = require("./Routers/ContactRouter/contact.router");
const detailsRouter = require("./Routers/DetailsRouter/details.router");
const searchRouter = require("./Routers/SearchRouter/search.router");

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Server Starts Serving",
  });
});

// Calling the auth router for register and login user:
app.use("/auth", AuthRouter);

app.use("/jobs", jobDetailRouter);

app.use("/get", detailsRouter);

app.use("/additional", contactRouter);

app.use("/search", searchRouter);

// Calling the Jwt Verification Middleware:
app.use(jwtAuthMiddleware);

// Calling the details router for getting any details:
app.use("/details", getDetails);

// Calling the update router for updating the student details:
app.use("/updates", updateRouter);

// Calling the jobPost router:
app.use("/add", addJobRouter);

// Calling the applied job router:
app.use("/applied", appliedJobRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;
