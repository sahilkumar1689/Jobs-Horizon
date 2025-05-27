import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const nav = useNavigate();
  const cmpdetails = useSelector((state) => state.companyProfile);
  // console.log("Cmp", cmpdetails);

  // Refs for form inputs and textareas

  const jobTitleRef = useRef(null);
  const featuredImageRef = useRef(null);
  const jobTypeRef = useRef(null);
  const jobDescriptionRef = useRef(null);
  const experienceRef = useRef(null);
  const salaryRef = useRef(null);
  const vacancyRef = useRef(null);
  const deadlineRef = useRef(null);
  const jobLocationRef = useRef(null);
  const genderRef = useRef(null);
  const skillRef = useRef(null);

  // Fecting the locations and skills from the backend
  const [locationOptions, setLocationOptions] = useState([]);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      const skillsRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}get/skills`
      );
      //   console.log("Skills Response:", skillsRes.data);
      const locationsRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}get/locations`
      );

      setSkillsOptions(
        skillsRes.data?.skills.map((skill) => ({
          value: skill._id,
          label: skill.skillName,
        }))
      );

      setLocationOptions(
        locationsRes.data?.locations.map((loc) => ({
          value: loc._id,
          label: loc.locationName,
        }))
      );
    };

    fetchOptions();
  }, []);
  // console.log("Skills Options:", skillsOptions);
  // console.log("Location Options:", locationOptions);

  const handleSaveJob = () => {
    // Checking if the company profile completed or not , inorder to add a job:

    if (!cmpdetails || !cmpdetails.companyName) {
      toast.error("Complete Profile To Add Jobs.");
      nav("/companyProfile");
      return;
    }

    // Access the values from the refs

    const jobTitle = jobTitleRef.current.value;
    const featuredImage = featuredImageRef.current.files[0]; // Access the file object
    const jobType = jobTypeRef.current.value;
    const jobDescription = jobDescriptionRef.current.value;
    // console.log("Job Description:", jobDescriptionRef.current.value);
    const experience = experienceRef.current.value;
    const salary = salaryRef.current.value;
    const vacancy = vacancyRef.current.value;
    const deadline = deadlineRef.current.value;
    const jobLocation = jobLocationRef.current.value;
    const gender = genderRef.current.value;
    // const skill = skillRef.current.value;
    const skill = skillRef.current.getValue().map((skillObj) => skillObj.value); // Access the selected skills

    if (
      !jobTitle ||
      !featuredImage ||
      !jobType ||
      !jobDescription ||
      !experience ||
      !salary ||
      !vacancy ||
      !deadline ||
      !jobLocation ||
      !gender ||
      !skill
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    // Clear the refs after logging the values

    jobTitleRef.current.value = "";
    featuredImageRef.current.value = null;
    jobTypeRef.current.value = "";
    jobDescriptionRef.current.value = "";
    experienceRef.current.value = "";
    salaryRef.current.value = "";
    vacancyRef.current.value = "";
    deadlineRef.current.value = "";
    genderRef.current.value = "";
    jobLocationRef.current.value = "";
    skillRef.current.clearValue();

    const tempData = {
      title: jobTitle,
      jobImg: featuredImage,
      empStatus: jobType,
      description: jobDescription,
      experience,
      salary,
      vacancy,
      deadlinedate: deadline,
      location: jobLocation,
      gender,
      skills: skill,
    };

    // console.log(tempData);

    const formDataToSend = new FormData();

    for (const key in tempData) {
      if (tempData.hasOwnProperty(key)) {
        if (key === "jobImg") {
          formDataToSend.append(key, tempData[key]);
        } else if (
          Array.isArray(tempData[key]) ||
          typeof tempData[key] === "object"
        ) {
          formDataToSend.append(key, JSON.stringify(tempData[key]));
        } else {
          formDataToSend.append(key, tempData[key]);
        }
      }
    }

    // console.log("FormData to send:", formDataToSend);

    // console.log("FormData entries:");
    // for (let pair of formDataToSend.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    // Send the form data to the backend

    const token = JSON.parse(localStorage.getItem("userLogIn"));
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}add/postJob`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("Response:", res.data);
        toast.success(res.data.message);
        setIsLoading(false);
        // nav("/candidateProfile");
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <>
        <div className="site-wrap">
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle" />
              </div>
            </div>
            <div className="site-mobile-menu-body" />
          </div>{" "}
          {/* .site-mobile-menu */}
          {/* NAVBAR */}
          <NavBar />
          {/* HOME */}
          <section
            className="section-hero overlay inner-page bg-image"
            style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold">Post A Job</h1>
                  <div className="custom-breadcrumbs">
                    <a href="/">Home</a> <span className="mx-2 slash">/</span>
                    <span className="text-white">
                      <strong>Post a Job</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row align-items-center mb-5">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2>Post A Job</h2>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-6">
                      <button
                        onClick={handleSaveJob}
                        className="btn btn-block btn-primary btn-md"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Add Job"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-lg-12">
                  <form className="p-4 p-md-5 border rounded" method="post">
                    <h3 className="text-black mb-5 border-bottom pb-2">
                      Job Details
                    </h3>
                    <div className="form-group">
                      <label htmlFor="company-website-tw d-block">
                        Upload Featured Image
                      </label>{" "}
                      <br />
                      <label className="btn btn-primary btn-md btn-file">
                        Browse File
                        <input type="file" ref={featuredImageRef} />
                      </label>
                    </div>

                    <div className="form-group">
                      <label htmlFor="job-title">Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="job-title"
                        placeholder="Product Designer"
                        ref={jobTitleRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Experience</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="1-2 Years"
                        ref={experienceRef}
                      />
                    </div>

                    <div className="form-row row">
                      <div className="form-group col-md-6">
                        <label htmlFor="salary">Salary</label>
                        <input
                          type="text"
                          className="form-control"
                          id="salary"
                          placeholder="20-30k"
                          ref={salaryRef}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="vacancy">Vacancy</label>
                        <input
                          type="number"
                          className="form-control"
                          id="vacancy"
                          placeholder="10-20"
                          ref={vacancyRef}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="job-location">DeadLine</label>
                      <input
                        type="date"
                        className="form-control"
                        id="job-location"
                        placeholder="MM/DD/YYYY"
                        min={new Date().toISOString().split("T")[0]} // 👈 this line ensures no past dates
                        ref={deadlineRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="job-region">Job Location</label>
                      <select
                        className="form-control"
                        id="job-region"
                        data-style="btn-black"
                        data-width="100%"
                        data-live-search="true"
                        title="Select Region"
                        ref={jobLocationRef}
                      >
                        {locationOptions.map((location) => (
                          <option key={location.value} value={location.value}>
                            {location.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="job-region">Skills</label>
                      <Select
                        isMulti
                        options={skillsOptions}
                        id="job-region"
                        data-style="btn-black"
                        data-width="100%"
                        data-live-search="true"
                        title="Select Region"
                        ref={skillRef}
                      ></Select>
                    </div>

                    <div className="form-row row">
                      <div className="form-group col-md-6">
                        <label htmlFor="job-type">Job Type</label>
                        <select
                          className="form-control"
                          id="job-type"
                          title="Select Job Type"
                          ref={jobTypeRef}
                        >
                          <option selected disabled>
                            Select
                          </option>
                          <option>PartTime</option>
                          <option>FullTime</option>
                        </select>
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="gender">Gender</label>
                        <select
                          className="form-control"
                          id="gender"
                          title="Select Gender"
                          ref={genderRef}
                        >
                          <option selected disabled>
                            Select
                          </option>
                          <option>Any</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="job-description">Job Description</label>
                      <div className="editor">
                        <textarea
                          name="job-description"
                          id="job-description"
                          cols={110}
                          rows={12}
                          className=""
                          placeholder="Write something about job"
                          defaultValue={""}
                          ref={jobDescriptionRef}
                          style={{ border: "1px solid black", padding: "10px" }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row align-items-center mb-5">
                <div className="col-lg-4 mx-auto">
                  <div className="row">
                    <div className="col-8">
                      <button
                        onClick={handleSaveJob}
                        className="btn btn-block btn-primary btn-md"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Add Job"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {isLoading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <Footer />
        </div>
      </>
    </>
  );
}

export default PostJob;
