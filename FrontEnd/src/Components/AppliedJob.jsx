import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import AppliedJobsTable from "./AppliedJobsTable";
import { HashLoader } from "react-spinners";

function AppliedJob() {
  const [isLoading, setIsLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    getAppliedJobs();
  }, []);

  const getAppliedJobs = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userLogIn"));
      // console.log("Token :", token);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}details/studentAppliedJobs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log("Jobs :", data.jobArr);
      setAppliedJobs(data.jobArr);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      return;
    }
  };

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
        <NavBar />
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Applied Jobs</h1>
                <div className="custom-breadcrumbs">
                  <a href="/">Home</a> <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>Applied Jobs</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {isLoading ? (
          <div className="text-center">
            <HashLoader
              color="#00ff27"
              loading={true}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="loaderSpinner"
              cssOverride={{
                margin: "100px auto",
              }}
            />
          </div>
        ) : (
          <AppliedJobsTable jobArr={appliedJobs} />
        )}
        <Footer />
      </div>
    </>
  );
}

export default AppliedJob;
