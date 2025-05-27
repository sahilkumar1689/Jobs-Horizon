import { useState, useEffect } from "react";

const AppliedJobsTable = ({ jobArr }) => {
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
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Company</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Type</th>
            <th>Status</th>
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
                No Applied Jobs
              </td>
            </tr>
          ) : (
            currentJobs.map((job, idx) => (
              <tr key={idx}>
                <td>
                  <img src={job.companyLogo} alt="logo" />
                </td>
                <td>{job.companyName}</td>
                <td>{job.jobTitle}</td>
                <td>{job.location}</td>
                <td>{job.empStatus}</td>
                <td>
                  <span
                    className={`status-badge ${
                      job.status === "Accepted"
                        ? "status-accepted"
                        : "status-rejected"
                    }`}
                  >
                    {job.status}
                  </span>
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
  );
};

export default AppliedJobsTable;
