import React from "react";
import { Link } from "react-router-dom";
import RecruitersSectionCard from "./RecuiterContantCards";
import Footer from "./Footer";

function RecuiterContent() {
  return (
    <>
      <div className="dashBoradTitle">
        <h3>Recruiters</h3>
        <div className="tileInnerContainer">
          <i className="fa-solid fa-house"></i>
          <Link to="/adminPannel">Admin {">"} </Link>
          <span> Recruiters</span>
        </div>
      </div>
      <RecruitersSectionCard />
      <Footer />
    </>
  );
}

export default RecuiterContent;
