import React from "react";
import { Link } from "react-router-dom";
import DashboardCards from "./DashboardCards";
import JobboxDashboard from "./JobboxDashboard";
import Footer from "./Footer";

function Dashboard() {
  return (
    <>
      <div className="dashBoradTitle">
        <h3>DashBoard</h3>
        <div className="tileInnerContainer">
          <i class="fa-solid fa-house"></i>
          <Link to="/adminPannel">Admin {">"} </Link>
          <span> DashBoard</span>
        </div>
      </div>
      <DashboardCards />
      <JobboxDashboard />
      <Footer />
    </>
  );
}

export default Dashboard;
