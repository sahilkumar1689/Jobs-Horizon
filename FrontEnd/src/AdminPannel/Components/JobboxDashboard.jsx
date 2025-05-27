import React from "react";
import "../JobboxDashboard.css";

// Main Dashboard Component
const JobboxDashboard = () => {
  return (
    <div className="jobBoxdashboard-container">
      <div className="jobBoxdashboard-content">
        <LatestJobs />
        <div className="jobBoxsidebar">
          <TopRecruiters />
          <QueriesBySearch />
        </div>
      </div>
    </div>
  );
};

// Latest Jobs Component
const LatestJobs = () => {
  const jobListings = [
    {
      id: 1,
      title: "Senior Full Stack Engineer, Creator Success",
      company: "Figma",
      logo: "/AdminAssets/LatestJobs/seniorFullstack.png", // Add your image path here
      location: "New York, US",
      type: "Full-time",
      postedAgo: "2 hours ago",
      tags: ["Figma", "Adobe XD"],
      salary: "$300/hour",
    },
    {
      id: 2,
      title: "Senior Full Stack Engineer, Creator Success",
      company: "Quora",
      logo: "/AdminAssets/LatestJobs/R.png", // Add your image path here
      location: "San Jose, US",
      type: "Full-time",
      postedAgo: "3 hours ago",
      tags: ["Figma", "Adobe XD", "PSD"],
      salary: "$450/hour",
    },
    {
      id: 3,
      title: "Lead Product/UX/UI Designer Role",
      company: "Google",
      logo: "/AdminAssets/LatestJobs/UX.png", // Add your image path here
      location: "Palo Alto, CA",
      type: "Full-time",
      postedAgo: "2 hours ago",
      tags: ["Figma", "Adobe XD", "PSD"],
      salary: "$1200/hour",
    },
    {
      id: 4,
      title: "Marketing Graphic Designer",
      company: "Stripe",
      logo: "/AdminAssets/LatestJobs/Marketing.png", // Add your image path here
      location: "Miami, FL",
      type: "Full-time",
      postedAgo: "5 hours ago",
      tags: ["Figma", "Adobe XD", "PSD"],
      salary: "$580/hour",
    },
    {
      id: 5,
      title: "Director, Product Design - Creator",
      company: "Meta",
      logo: "/AdminAssets/LatestJobs/Director.png", // Add your image path here
      location: "San Francisco, CA",
      type: "Full-time",
      postedAgo: "4 hours ago",
      tags: ["Figma", "Adobe XD", "PSD"],
      salary: "$1500/hour",
    },
    {
      id: 6,
      title: "Senior Full Stack Engineer, Creator Success",
      company: "Figma",
      logo: "/AdminAssets/LatestJobs/seniorFullstack.png", // Add your image path here
      location: "New York, US",
      type: "Full-time",
      postedAgo: "2 hours ago",
      tags: ["Figma", "Adobe XD"],
      salary: "$300/hour",
    },
    {
      id: 7,
      title: "Senior Full Stack Engineer, Creator Success",
      company: "Quora",
      logo: "/AdminAssets/LatestJobs/R.png", // Add your image path here
      location: "San Jose, US",
      type: "Full-time",
      postedAgo: "3 hours ago",
      tags: ["Figma", "Adobe XD", "PSD"],
      salary: "$450/hour",
    },
    {
      id: 8,
      title: "Marketing Graphic Designer",
      company: "Stripe",
      logo: "/AdminAssets/LatestJobs/Marketing.png", // Add your image path here
      location: "Miami, FL",
      type: "Full-time",
      postedAgo: "5 hours ago",
      tags: ["Figma", "Adobe XD", "PSD"],
      salary: "$580/hour",
    },
    {
      id: 9,
      title: "Director, Product Design - Creator",
      company: "Meta",
      logo: "/AdminAssets/LatestJobs/Director.png", // Add your image path here
      location: "San Francisco, CA",
      type: "Full-time",
      postedAgo: "4 hours ago",
      tags: ["Figma", "Adobe XD", "PSD"],
      salary: "$1500/hour",
    },
  ];

  return (
    <div className="latest-jobs-section">
      <div className="section-header">
        <h2>Latest Jobs</h2>
        <button className="filter-btn">
          <i className="filter-icon"></i>
        </button>
      </div>
      <div className="job-listings">
        {jobListings.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card-left">
              <div className="company-logo">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="company-logo-image"
                  />
                ) : (
                  job.company.charAt(0)
                )}
              </div>
              <div className="job-details">
                <h3 className="job-title">{job.title}</h3>
                <div className="job-meta">
                  <span className="job-type">{job.type}</span>
                  <span className="job-posted">{job.postedAgo}</span>
                  <span className="job-location">{job.location}</span>
                </div>
              </div>
            </div>
            <div className="job-card-right">
              <div className="job-tags">
                {job.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="job-salary">{job.salary}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Top Recruiters Component
const TopRecruiters = () => {
  const recruiters = [
    {
      id: 1,
      name: "Robert Fox",
      avatar: "/AdminAssets/TopCandidates/Robert.png", // Add your image path here
      location: "San Francisco, CA",
      rating: 4.8,
      reviews: 1253,
      openJobs: 25,
    },
    {
      id: 2,
      name: "Cody Fisher",
      avatar: "/AdminAssets/TopCandidates/CodeFisher.png", // Add your image path here
      location: "Chicago, US",
      rating: 4.9,
      reviews: 1428,
      openJobs: 21,
    },
    {
      id: 3,
      name: "Jane Cooper",
      avatar: "/AdminAssets/TopCandidates/janeCooper.png", // Add your image path here
      location: "Austin, TX",
      rating: 4.7,
      reviews: 875,
      openJobs: 15,
    },
    {
      id: 4,
      name: "Jerome Bell",
      avatar: "/AdminAssets/TopCandidates/JromeBell.png", // Add your image path here
      location: "Remote",
      rating: 4.9,
      reviews: 953,
      openJobs: 18,
    },
    {
      id: 5,
      name: "Floyd Miles",
      avatar: "/AdminAssets/TopCandidates/FloydMiles.png", // Add your image path here
      location: "Houston, US",
      rating: 4.8,
      reviews: 1015,
      openJobs: 23,
    },
    {
      id: 6,
      name: "Devon Lane",
      avatar: "/AdminAssets/TopCandidates/CodeFisher.png", // Add your image path here
      location: "Chicago, US",
      rating: 4.8,
      reviews: 945,
      openJobs: 20,
    },
  ];

  return (
    <div className="top-recruiters-section">
      <div className="section-header">
        <h2>Top Recruiters</h2>
        <button className="filter-btn">
          <i className="filter-icon"></i>
        </button>
      </div>
      <div className="recruiters-grid">
        {recruiters.map((recruiter) => (
          <div key={recruiter.id} className="recruiter-card">
            <div className="recruiter-avatar">
              {recruiter.avatar ? (
                <img
                  src={recruiter.avatar}
                  alt={`${recruiter.name} avatar`}
                  className="avatar-image"
                />
              ) : (
                recruiter.name.charAt(0)
              )}
            </div>
            <div className="recruiter-details">
              <h3 className="recruiter-name">{recruiter.name}</h3>
              <div className="recruiter-rating">
                <div className="stars">
                  {"★".repeat(Math.floor(recruiter.rating))}
                  {recruiter.rating % 1 !== 0 ? "☆" : ""}
                  {"☆".repeat(5 - Math.ceil(recruiter.rating))}
                </div>
                <span className="review-count">({recruiter.reviews})</span>
              </div>
              <div className="recruiter-location">{recruiter.location}</div>
              <div className="open-jobs">{recruiter.openJobs} Open Jobs</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Queries by Search Component
const QueriesBySearch = () => {
  const queries = [
    { id: 1, name: "Developer", count: 2435 },
    { id: 2, name: "UI/UX Designer", count: 1658 },
    { id: 3, name: "Marketing", count: 1452 },
    { id: 4, name: "Content manager", count: 1325 },
    { id: 5, name: "Ruby on rails", count: 985 },
    { id: 6, name: "Human hunter", count: 920 },
    { id: 7, name: "Finance", count: 863 },
  ];

  // Find the maximum count to calculate percentage for progress bars
  const maxCount = Math.max(...queries.map((q) => q.count));

  return (
    <div className="queries-section">
      <div className="section-header">
        <h2>Queries by search</h2>
        <button className="filter-btn">
          <i className="filter-icon"></i>
        </button>
      </div>
      <div className="queries-list">
        {queries.map((query) => (
          <div key={query.id} className="query-item">
            <div className="query-header">
              <div className="query-name">{query.name}</div>
              <div className="query-count">{query.count}</div>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${(query.count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobboxDashboard;
