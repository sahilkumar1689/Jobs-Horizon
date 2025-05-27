import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchListJobs() {
  const nav = useNavigate();
  let searchData = useSelector((store) => store.searchData);
  // console.log("search Data :", searchData);

  const [isHovered, setIsHovered] = useState(false);

  return (
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
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">List Jobs</h1>
                <div className="custom-breadcrumbs">
                  <a href="/">Home</a> <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>List Jobs</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <h1 style={{ textAlign: "center", marginTop: "30px" }}>
            Job Listings
          </h1>
          {searchData.length === 0 ? (
            <h1
              style={{ margin: "150px 500px", fontSize: "30px", opacity: 0.5 }}
            >
              No Job Found Related Your Interest
            </h1>
          ) : (
            <div className="job-container">
              {searchData.map((job, idx) => (
                <div
                  className="job-card"
                  key={idx}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                  }}
                >
                  <div className="job-card-header">
                    <div className="company-logo">
                      <img
                        src={job.companyLogo || "/api/placeholder/60/60"}
                        alt={`${job.companyName} logo`}
                      />
                    </div>
                    <div className="company-info">
                      <h3 className="job-title">{job.title}</h3>
                      <h4 className="company-name">{job.companyName}</h4>
                    </div>
                  </div>

                  <div className="job-details">
                    <div className="job-detail-item">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="job-detail-item">
                      <Briefcase size={16} />
                      <span>{job.empStatus}</span>
                    </div>
                    <div className="job-detail-item">
                      <Clock size={16} />
                      <span>Apply Now</span>
                    </div>
                  </div>

                  <div className="job-description">
                    <p>{job.description}</p>
                  </div>

                  <div className="skills-container">
                    {job.skills &&
                      job.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                  </div>

                  <div className="job-card-footer">
                    <button
                      className="apply-button"
                      onClick={() => nav(`/jobSingle/${job.id}`)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SearchListJobs;
