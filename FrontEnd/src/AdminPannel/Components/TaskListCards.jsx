import React from "react";
import "../TaskList.css";
import Footer from "./Footer";

const TasksListSection = () => {
  // Sample tasks data - you'll replace this with your own data
  const tasks = [
    {
      id: 1,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 1,
      priority: "High",
      status: "Planning",
      completion: 80,
      companyLogo: "/AdminAssets/LatestJobs/seniorFullstack.png", // Replace with actual path
    },
    {
      id: 2,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 3,
      priority: "Medium",
      status: "In Progress",
      completion: 68,
      companyLogo: "/AdminAssets/LatestJobs/R.png",
    },
    {
      id: 3,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 4,
      priority: "Low",
      status: "In Progress",
      completion: 20,
      companyLogo: "/AdminAssets/LatestJobs/UX.png",
    },
    {
      id: 4,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 5,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/Marketing.png",
    },
    {
      id: 5,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 8,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/Director.png",
    },
    {
      id: 6,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 12,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/seniorFullstack.png",
    },
    {
      id: 7,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 14,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/UX.png",
    },
    {
      id: 8,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 23,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/Marketing.png",
    },
    {
      id: 9,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 25,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/Director.png",
    },
    {
      id: 10,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 24,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/Director.png",
    },
    {
      id: 11,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 30,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/R.png",
    },
    {
      id: 12,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 32,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/UX.png",
    },
    {
      id: 13,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 34,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/Marketing.png",
    },
    {
      id: 14,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 36,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/Director.png",
    },
    {
      id: 15,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 3,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/R.png",
    },
    {
      id: 16,
      title: "Senior Full Stack Engineer, Creator Success",
      startDays: 36,
      priority: "",
      status: "Completed",
      completion: 100,
      companyLogo: "/AdminAssets/LatestJobs/Marketing.png",
    },
  ];

  // Get status label and color
  const getStatusLabel = (status) => {
    switch (status) {
      case "Planning":
        return <span className="status-label planning">Planning</span>;
      case "In Progress":
        return <span className="status-label in-progress">In Progress</span>;
      case "Completed":
        return <span className="status-label completed">Completed</span>;
      default:
        return null;
    }
  };

  // Get priority label and color
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "High":
        return <span className="priority-label high">High</span>;
      case "Medium":
        return <span className="priority-label medium">Medium</span>;
      case "Low":
        return <span className="priority-label low">Low</span>;
      default:
        return null;
    }
  };

  return (
    <div className="tasks-list-container">
      {/* Task cards grid */}
      <div className="tasks-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <div className="task-logo-container">
                <img
                  src={task.companyLogo}
                  alt="Company logo"
                  className="task-logo"
                />
              </div>
              <div className="task-info">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-date">Start: {task.startDays} days ago</p>
              </div>
            </div>

            <div className="task-footer">
              <div className="task-status-row">
                {task.priority && getPriorityLabel(task.priority)}
                {getStatusLabel(task.status)}
              </div>

              <div className="task-completion">
                <div className="completion-text">
                  Complete: {task.completion}%
                </div>
                <div className="completion-bar">
                  <div
                    className="completion-progress"
                    style={{ width: `${task.completion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="pagination-btn prev">
          <span>&lt;</span>
        </button>
        <button className="pagination-btn">1</button>
        <button className="pagination-btn active">2</button>
        <button className="pagination-btn">3</button>
        <button className="pagination-btn">4</button>
        <button className="pagination-btn">5</button>
        <button className="pagination-btn">6</button>
        <button className="pagination-btn">7</button>
        <button className="pagination-btn next">
          <span>&gt;</span>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default TasksListSection;
