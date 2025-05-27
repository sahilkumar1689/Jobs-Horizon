import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AppliedApplicant() {
  const { autoId } = useParams();
  const jobArr = useSelector((state) => state.addedJobs);
  // console.log("Job Array", jobArr);

  const jobObj = jobArr.find((job) => job.autoId === Number(autoId));

  const cndArr = jobObj.appliedCandidate;

  // console.log("Applied Applicant", cndArr);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = cndArr.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(cndArr.length / jobsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleAction = async (e, stdId) => {
    console.log(e.target.value, stdId, jobObj._id);
    const handleObj = {
      jobId: jobObj._id,
      studentId: stdId,
      result: e.target.value,
    };
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("userLogIn"));
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}updates/candidateSelection`,
        handleObj,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      toast.success(res.data.message);
      setIsLoading(false);
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        toast.error(err.response.data.errorMessage);
        console.error("updation Error:", err.response.data);
        setIsLoading(false);
      } else {
        // No response from server (network/server error)
        toast.error("Server not responding. Please try again later.");
        console.error("updation Network Error:", err);
        setIsLoading(false);
      }
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
        {/* .site-mobile-menu */}
        {/* NAVBAR */}
        <NavBar />
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">
                  Applicant Applied
                </h1>
                <div className="custom-breadcrumbs">
                  <a href="/">Home</a> <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>appliedApplicant</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Pagination */}
        <div className="table-wrapper" style={{ margin: "100px auto" }}>
          <table>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Resume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "50px",
                      fontSize: "20px",
                    }}
                  >
                    No Applicant
                  </td>
                </tr>
              ) : (
                currentJobs.map((job, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1 + (currentPage - 1) * jobsPerPage}</td>

                    <td>{job.userId.firstName}</td>
                    <td>{job.userId.lastName}</td>
                    <td>{job.userId.email}</td>
                    <td>{job.contact}</td>
                    <td>
                      <a href={job.resume || "#"} target="_blank">
                        {" "}
                        Resume
                      </a>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        data-style="btn-white btn-lg"
                        data-width="100%"
                        data-live-search="true"
                        title="Select Job Type"
                        onChange={(e) => handleAction(e, job._id)}
                      >
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending" selected>
                          Pending
                        </option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div
            className="pagination d-flex justify-content-between"
            style={{ margin: "50px auto" }}
          >
            <div className="">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={
                    currentPage === i + 1 ? "bg-primary text-white" : ""
                  }
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <Link to="/addedJob">
              <button className="btn bg-primary text-white">
                <i className="fa fa-chevron-left"></i> Back
              </button>
            </Link>
          </div>
        </div>
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

export default AppliedApplicant;
