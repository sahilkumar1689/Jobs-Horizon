// components/Header.jsx
import React from "react";
// import "./Header.css";
import logo from "/AdminAssets/image.png";
import adminImg from "/AdminAssets/adminImg.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();

  // User Logout With Swal Handling
  const swalLogoutHandling = () => {
    Swal.fire({
      title: "Are you sure, You Want to logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Log Out!",
      cancelButtonText: "No, Keep",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminLogIn");
        toast.success("Logged out successfully");
        navigate("/");
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Log Out Canceled", "You are still logged in.", "info");
      }
    });
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div
            className="logo-icon"
            style={{ width: "50px", marginBottom: "25px" }}
          >
            <img src={logo} alt="logo" style={{ width: "100%" }} />
          </div>
          <h1>JOB'S HORIZON</h1>
        </div>
        <span
          className="admin-area"
          style={{
            backgroundColor: "rgba(196, 196, 196, 0.28)",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          Admin area
        </span>
      </div>

      <div
        className="search-container"
        style={{ width: "300px", height: "50px" }}
      >
        <i
          className="fa-solid fa-magnifying-glass"
          style={{ marginRight: "10px" }}
        ></i>
        <input type="text" placeholder="Search" />
      </div>

      <nav className="main-nav">
        <ul style={{ marginTop: "20px" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <button className="post-job-btn" onClick={() => navigate("/postJob")}>
          <span className="btn-icon">
            <i className="fa-regular fa-pen-to-square"></i>
          </span>
          Post Job
        </button>
        <div className="notification">
          <i className="fa-regular fa-bell"></i>
        </div>
        <div className="user-profile">
          <i className="fa-solid fa-bars responseBtnNav"></i>
          <div className="dropdownContainer">
            <img
              src={adminImg}
              alt="User Profile"
              className="dropbtn"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "white",
              }}
            />
            <div className="dropdownContent">
              <a href="#" onClick={() => swalLogoutHandling()}>
                Log Out
              </a>
            </div>
          </div>
          <div className="user-info">
            <h3>Steven Jobs</h3>
            <span>Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
