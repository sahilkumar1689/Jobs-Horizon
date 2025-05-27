// components/Sidebar.jsx
import React, { useState } from "react";
import logoutIcon from "/AdminAssets/Logout.png";
import SideBarList from "./SideBarList";
import { Link } from "react-router-dom";

function Sidebar({ collapsed, setCollapsed }) {
  const [isLogOut, setLogOut] = useState(0);
  const [isActive, setIsActive] = useState("Dashboard");

  const sideBarData = [
    {
      imagePath: "/AdminAssets/dashboardIcon.png",
      name: "Dashboard",
      link: "/adminPannel",
    },
    {
      imagePath: "/AdminAssets/CandidateImg.png",
      name: "Candidates",
      link: "/adminPannel/candidateContent",
    },
    {
      imagePath: "/AdminAssets/RecuiterImg.png",
      name: "Recruiters",
      link: "/adminPannel/recuiterContent",
    },
    {
      imagePath: "/AdminAssets/taskList.png",
      name: "Tasks List",
      link: "/adminPannel/taskListContent",
    },
  ];

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      style={{ position: "relative" }}
    >
      <i
        className="fa-solid fa-circle-arrow-left"
        style={{
          fontSize: "30px",
          color: "#2977F5",
          position: "absolute",
          right: "-12px",
          top: "-10px",
        }}
        onClick={() => setCollapsed((prev) => (prev ? 0 : 1))}
      ></i>
      <nav className="sidebar-nav">
        <ul>
          {sideBarData.map((elem, idx) => {
            return (
              <SideBarList
                key={idx}
                elemObj={elem}
                isSet={elem.name === isActive}
                setIsActive={() => setIsActive(elem.name)}
                isLogOut={isLogOut}
                setLogOut={setLogOut}
              />
            );
          })}
          <li
            className={`logout ${isLogOut ? "active" : ""}`}
            onClick={() => {
              if (isActive !== null) {
                setIsActive(null);
              }
              setLogOut(1);
            }}
          >
            <Link to="/adminPannel/logOutContent">
              <img src={logoutIcon} alt="Logout" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
