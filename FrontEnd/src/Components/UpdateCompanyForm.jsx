import Footer from "./Footer";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import "../Style/UpdateProfileForm.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function UpdateCompanyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const details = useSelector((state) => state.companyProfile);
  const tempObj = {
    firstName: details.userId.firstName,
    lastName: details.userId.lastName,
    email: details.userId.email,
    description: details.description,
    location: [],
    companyLogo: null,
    companyName: details.companyName,
    websiteUrl: details.websiteUrl,
  };
  //   console.log(tempObj);

  const [formData, setFormData] = useState({ ...tempObj });
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const locationsRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}get/locations`
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected, field) => {
    console.log("Selected:", selected);
    setFormData((prev) => ({
      ...prev,
      [field]: selected.map((item) => item.value),
    }));
  };

  const handleChangeImg = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    console.log("File:", file);
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onUpdate(formData);
    // console.log("Updated Data:", formData);

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "companyLogo") {
          formDataToSend.append(key, formData[key]);
        } else if (
          Array.isArray(formData[key]) ||
          typeof formData[key] === "object"
        ) {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
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
        `${import.meta.env.VITE_BACKEND_URL}updates/companyUpdates`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log("Response:", res.data);
        toast.success(res.data.message);
        setIsLoading(false);
        nav("/companyProfile");
      })
      .catch((err) => {
        // console.error("Error:", err);
        toast.error("Error updating profile");
        setIsLoading(false);
      });
  };

  return (
    <>
      {" "}
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
          style={{ border: "1px solid black", margin: "80px auto" }}
        >
          <div className="d-flex justify-content-between">
            <h2>Update Profile</h2>
            <Link to="/companyProfile">
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />

          <label>Company Logo</label>
          <input type="file" name="companyLogo" onChange={handleChangeImg} />

          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
          ></textarea>

          <label>Website Link:</label>
          <input
            type="text"
            name="websiteUrl"
            value={formData.websiteUrl || ""}
            onChange={handleChange}
          />

          <label>Locations</label>
          <Select
            isMulti
            options={locationOptions}
            onChange={(selected) => handleSelectChange(selected, "location")}
          />

          <br />
          <button type="submit" className="btn bg-primary text-white">
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
    </>
  );
}

export default UpdateCompanyForm;
