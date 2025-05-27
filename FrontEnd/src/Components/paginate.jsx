import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

function Paginate() {
  const [isLoad, setIsLoad] = useState(1);

  // Pagination Handling
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;
  const [totalJobs, settotalJobs] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }jobs/getAllPaginate?page=${page}&limit=${limit}`
      );
      // console.log("res ", res);
      setJobs(res.data.data);
      setTotalPages(res.data.totalPages);
      settotalJobs(res.data.totalJobs);
      setIsLoad(0);
    } catch (err) {
      console.log(err.response.data);
      console.error("Failed to fetch jobs", err.response.data.error);
      toast.error(err.response.data.message);
    }
  };

  // console.log("data ", jobs);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      {isLoad ? (
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
      ) : (
        <section className="site-section">
          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2">{totalJobs} Job Listed</h2>
              </div>
            </div>
            <ul className="job-listings mb-5">
              {jobs.map((job, idx) => {
                return (
                  <li
                    key={idx}
                    className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                  >
                    <Link to={`/jobSingle/${job._id}`}></Link>
                    <div className="job-listing-logo">
                      <img
                        src={`${job.companyId.companyLogo}`}
                        alt="Free Website Template by Free-Template.co"
                        className="img-fluid"
                      />
                    </div>
                    <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                      <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                        <h2>{job.title}</h2>
                        <strong>{job.companyId.companyName}</strong>
                      </div>
                      <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                        <span className="icon-room" />{" "}
                        {job.location.locationName}
                      </div>
                      <div className="job-listing-meta">
                        <span
                          className={`badge ${
                            job.empStatus === "FullTime"
                              ? "badge-success"
                              : "badge-danger"
                          }`}
                        >
                          {job.empStatus}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="row pagination-wrap">
              <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
                <span>
                  Showing 1-{totalPages} Of {totalJobs} Jobs
                </span>
              </div>
              <div className="col-md-6 text-center text-md-right">
                <div className="custom-pagination ml-auto">
                  <button
                    className="prev"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    style={{
                      padding: "1px 12px",
                      margin: "0px 5px",
                      border: "none",
                      color: "white",
                      borderRadius: "3px",
                      backgroundColor: "#89BA16",
                    }}
                  >
                    Prev
                  </button>

                  <div className="d-inline-block">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                          padding: "2px 10px",
                          borderRadius: "50%",
                          margin: "0px 7px",
                          border: "0.5px solid black",
                          color: "#89BA16",
                          backgroundColor: "whitesmoke",
                          ...(page === index + 1 && {
                            backgroundColor: "#89ba16",
                            color: "#fff",
                          }),
                        }}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="next"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    style={{
                      padding: "1px 12px",
                      margin: "0px 5px",
                      border: "none",
                      color: "white",
                      borderRadius: "3px",
                      backgroundColor: "#89BA16",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Paginate;
