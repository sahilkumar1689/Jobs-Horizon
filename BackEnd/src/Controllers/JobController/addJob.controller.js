const JobPost = require("../../Models/JobPostModel/JobPost.model");
const Company = require("../../Models/CompanyModel/Company.model");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../../Utility/CloudinaryUtilities/Cloudinary");

const addJobController = async (req, res) => {
  try {
    // Authorization and Token Checking:
    const data = req.userPayload;

    if (!data)
      return res.status(400).json({
        message: "Token Not Present",
      });

    if (data.userType !== 2)
      return res.status(401).json({
        message: "You are not Authorized to add a job.",
      });

    // Checking the authenticity of the company:
    const companyObj = await Company.findOne({ _id: data.companyId }).populate(
      "userId"
    );
    // console.log("CompanyObj :", companyObj);

    if (!companyObj)
      return res.status(404).json({
        message: "Company Not Found.",
      });

    // Parse JSON fields if needed:
    ["skills"].forEach((field) => {
      if (req.body[field] && typeof req.body[field] === "string") {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          console.error(`Invalid JSON in field ${field}:`, e);
        }
      }
    });

    // Checking if all the required field present:
    const {
      title,
      location,
      skills,
      empStatus,
      experience,
      salary,
      gender,
      deadlinedate,
      vacancy,
      description,
    } = req.body;

    if (
      !title ||
      !location ||
      !empStatus ||
      !experience ||
      !salary ||
      !gender ||
      !deadlinedate ||
      !vacancy ||
      !description ||
      !skills
    )
      return res.status(400).json({
        message: "All fields are required",
      });

    // Checking if the images present:
    const fileObj = req.file;

    if (!fileObj)
      return res.status(400).json({
        message: "Job Image is not present",
      });

    // If present then store in the cloudinary:
    const filePath = fileObj.path;
    const uploadResponse = await uploadOnCloudinary(filePath, companyObj.id, 3);

    if (!uploadResponse)
      return res.status(500).json({
        message: "File Upload Failed,Try Again Later",
      });

    // Create the jobPost Object:
    // Fetch the total number of job posts for the company
    const totalJobPosts = await JobPost.countDocuments();

    // Create the job object with autoId based on the total job posts
    const jobObj = new JobPost({
      companyId: companyObj.id,
      title,
      autoId: totalJobPosts + 1,
      location,
      skills,
      empStatus,
      experience,
      salary: String(salary),
      gender,
      deadlinedate: String(deadlinedate),
      vacancy: Number(vacancy),
      description,
      jobImg: uploadResponse.url,
      jobImgCloudinaryId: uploadResponse.public_id,
    });

    // Create the job:

    const newJobObj = await jobObj.save();

    if (!newJobObj)
      return res.status(500).json({
        message: "Someting went wrong while creating the jobPost",
      });

    return res.status(200).json({
      message: "Job Created Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server Error Try Again Later",
    });
  }
};

module.exports = addJobController;
