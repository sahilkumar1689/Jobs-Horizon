import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import "../Style/UpdateProfileForm.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

const UpdateProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const details = useSelector((state) => state.candidateProfile);
  const tempObj = {
    firstName: details.userId.firstName,
    lastName: details.userId.lastName,
    email: details.userId.email,
    bio: details.bio,
    skills: [],
    currentLocation: details.currentLocation,
    qualification: details.qualification,
    experience: details.experience,
    preferLocation: [],
    contact: details.contact || "0000000000",
    resume: null,
    bioImg: null,
  };

  const [formData, setFormData] = useState({ ...tempObj });
  const [locationOptions, setLocationOptions] = useState([]);
  const [skillsOptions, setSkillsOptions] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected, field) => {
    // console.log("Selected:", selected);
    setFormData((prev) => ({
      ...prev,
      [field]: selected.map((item) => item.value),
    }));
  };

  const handleChangeImg = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    // console.log("File:", file);
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  // console.log("File:", file);
  // console.log("File Reader Result:", reader.result);

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.qualification];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, qualification: updated }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, experience: updated }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      qualification: [
        ...prev.qualification,
        {
          courseName: "",
          instituteName: "",
          startingYear: "",
          passingYear: "",
          percentage: "",
          backlog: false,
        },
      ],
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          role: "",
          duration: "",
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onUpdate(formData);
    // console.log("Updated Data:", formData);

    // Removing the _id field:
    const updatedData = {
      ...formData,
      qualification: formData.qualification.map(({ _id, ...rest }) => rest),
      experience: formData.experience.map(({ _id, ...rest }) => rest),
    };
    // console.log("Updated Data without _id:", updatedData);

    const formDataToSend = new FormData();

    for (const key in updatedData) {
      if (updatedData.hasOwnProperty(key)) {
        if (key === "bioImg" || key === "resume") {
          formDataToSend.append(key, updatedData[key]);
        } else if (
          Array.isArray(updatedData[key]) ||
          typeof updatedData[key] === "object"
        ) {
          formDataToSend.append(key, JSON.stringify(updatedData[key]));
        } else {
          formDataToSend.append(key, updatedData[key]);
        }
      }
    }

    // console.log("FormData to send:", formDataToSend);

    // console.log("FormData entries:");
    // for (let pair of formDataToSend.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    const token = JSON.parse(localStorage.getItem("userLogIn"));
    setIsLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}updates/studentUpdates`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Response:", res.data);
        toast.success(res.data.message);
        setIsLoading(false);
        nav("/candidateProfile");
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Error updating profile");
        setIsLoading(false);
      });
  };

  return (
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
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Profile Updates</h1>
              <div className="custom-breadcrumbs">
                <a href="/">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>profileUpdates</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <form
        className="update-form"
        onSubmit={handleSubmit}
        style={{ margin: "50px auto" }}
      >
        <div className="d-flex justify-content-between">
          <h2>Update Profile</h2>
          <Link to="/candidateProfile">
            <button className="btn bg-primary text-white">
              <i className="fa fa-chevron-left"></i> Back
            </button>
          </Link>
        </div>

        <label>FirstName</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleChange}
        />
        <label>LastName</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName || ""}
          onChange={handleChange}
        />
        <label>Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.contact || ""}
          onChange={handleChange}
        />

        <label>Current Location</label>
        <input
          type="text"
          name="currentLocation"
          value={formData.currentLocation || ""}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
        />

        <label>Bio</label>
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
        ></textarea>

        <label>Bio Image</label>
        <input type="file" name="bioImg" onChange={handleChangeImg} />

        <label>Resume Upload</label>
        <input type="file" name="resume" onChange={handleChangeImg} />

        <label>Skills</label>
        <Select
          isMulti
          options={skillsOptions}
          // value={skillsOptions.filter((opt) =>
          //   formData.skills?.some((skill) => skill._id === opt.value)
          // )}
          onChange={(selected) => handleSelectChange(selected, "skills")}
        />

        <label>Preferred Locations</label>
        <Select
          isMulti
          options={locationOptions}
          onChange={(selected) =>
            handleSelectChange(selected, "preferLocation")
          }
        />

        <h3 className="edExHeading">Education</h3>
        {formData.qualification?.map((edu, idx) => (
          <div key={idx} className="nested-group">
            <label>Course Name</label>
            <input
              value={edu.courseName}
              onChange={(e) =>
                handleEducationChange(idx, "courseName", e.target.value)
              }
            />
            <label>Institute Name</label>
            <input
              value={edu.instituteName}
              onChange={(e) =>
                handleEducationChange(idx, "instituteName", e.target.value)
              }
            />
            <label>Starting Year</label>
            <input
              type="number"
              value={edu.startingYear}
              onChange={(e) =>
                handleEducationChange(idx, "startingYear", e.target.value)
              }
            />
            <label>Passing Year</label>
            <input
              type="number"
              value={edu.passingYear}
              onChange={(e) =>
                handleEducationChange(idx, "passingYear", e.target.value)
              }
            />
            <label>Percentage</label>
            <input
              type="number"
              value={edu.percentage}
              onChange={(e) =>
                handleEducationChange(idx, "percentage", e.target.value)
              }
            />
            <label>Backlog</label>
            <input
              type="checkbox"
              style={{ width: "16px", height: "16px" }}
              checked={edu.backlog}
              onChange={(e) =>
                handleEducationChange(idx, "backlog", e.target.checked)
              }
            />
          </div>
        ))}
        <button type="button" onClick={addEducation}>
          + Add Education
        </button>

        <h3 className="edExHeading">Experience</h3>
        {formData.experience?.map((exp, idx) => (
          <div key={idx} className="nested-group">
            <label>Company</label>
            <input
              value={exp.company}
              onChange={(e) =>
                handleExperienceChange(idx, "company", e.target.value)
              }
            />
            <label>Role</label>
            <input
              value={exp.role}
              onChange={(e) =>
                handleExperienceChange(idx, "role", e.target.value)
              }
            />
            <label>Duration</label>
            <input
              value={exp.duration}
              onChange={(e) =>
                handleExperienceChange(idx, "duration", e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={addExperience}>
          + Add Experience
        </button>
        <br />
        <button type="submit" className="btn bg-primary">
          {isLoading ? "Saving..." : "Save Updated"}
        </button>
      </form>
      {isLoading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UpdateProfileForm;
