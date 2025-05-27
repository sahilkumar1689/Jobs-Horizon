import React, { useState } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import CandidateContent from "./Components/CandidateContent";
import RecuiterContent from "./Components/RecuiterContent";
import TaskListContent from "./Components/TaskListContent";
import LogOutContent from "./Components/LogOutContent";
import { Route, Routes } from "react-router-dom";
import "./Admin.css";

function AdminPannel() {
  const [collapsed, setCollapsed] = useState(0);
  return (
    <>
      <Header />
      <div className="adminContentContainer">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="contentContainer">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="candidateContent" element={<CandidateContent />} />
            <Route path="recuiterContent" element={<RecuiterContent />} />
            <Route path="taskListContent" element={<TaskListContent />} />
            <Route path="logOutContent" element={<LogOutContent />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminPannel;
