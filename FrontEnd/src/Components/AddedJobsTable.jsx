import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddedJobsTable() {
  const nav = useNavigate();
  const jobArr = useSelector((state) => state.addedJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobArr.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobArr.length / jobsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };
  return (
    <>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Type</th>
              <th>Applicants</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "50px",
                    fontSize: "20px",
                  }}
                >
                  No Job Added
                </td>
              </tr>
            ) : (
              currentJobs.map((job, idx) => (
                <tr key={idx}>
                  <td>{idx + 1 + (currentPage - 1) * jobsPerPage}</td>

                  <td>{job.title}</td>
                  <td>{job.location.locationName}</td>
                  <td>{job.empStatus}</td>
                  <td>
                    <button
                      className=""
                      style={{
                        backgroundColor: "#00d22a",
                        color: "white",
                        padding: "7px",
                        borderRadius: "5px",
                        border: "none",
                      }}
                      onClick={() => {
                        nav(`/appliedApplicant/${job.autoId}`);
                      }}
                    >
                      View Applicant
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
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
              className={currentPage === i + 1 ? "active" : ""}
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
      </div>
    </>
  );
}

export default AddedJobsTable;
