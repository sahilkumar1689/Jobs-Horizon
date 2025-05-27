import React from "react";
import { Link } from "react-router-dom";
import TasksListSection from "./TaskListCards";

function TaskListContent() {
  return (
    <>
      <div className="dashBoradTitle">
        <h3>Task List</h3>
        <div className="tileInnerContainer">
          <i className="fa-solid fa-house"></i>
          <Link to="/adminPannel">Admin {">"} </Link>
          <span> Recruiters</span>
        </div>
      </div>
      <TasksListSection />
    </>
  );
}

export default TaskListContent;
