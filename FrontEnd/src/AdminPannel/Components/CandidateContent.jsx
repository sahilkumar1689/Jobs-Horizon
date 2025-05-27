import React from "react";
import { Link } from "react-router-dom";
import CandidatesContentSection from "./CandidatesContentCard";
import Footer from "./Footer";

function CandidateContent() {
  return (
    <>
      <div className="dashBoradTitle">
        <h3>Candidate</h3>
        <div className="tileInnerContainer">
          <i className="fa-solid fa-house"></i>
          <Link to="/adminPannel">Admin {">"} </Link>
          <span> Candidate</span>
        </div>
      </div>
      <CandidatesContentSection />
      <Footer />
    </>
  );
}

export default CandidateContent;
