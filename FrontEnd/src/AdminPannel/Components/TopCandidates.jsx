import React from "react";

import CandidateCard from "./CandidateCard";

// import moreIcon from "../assets/more-icon.svg";

import robertFoxImg from "/AdminAssets/TopCandidates/Robert.png";
import codyFisherImg from "/AdminAssets/TopCandidates/CodeFisher.png";
import janeCooperImg from "/AdminAssets/TopCandidates/janeCooper.png";
import jeromeBellImg from "/AdminAssets/TopCandidates/JromeBell.png";
import floyedMiles from "/AdminAssets/TopCandidates/FloydMiles.png";

function TopCandidates() {
  const candidates = [
    {
      id: 1,
      name: "Robert Fox",
      image: robertFoxImg,
      position: "UI/UX Designer",
      location: "Chicago, US",
      rating: 5,
      reviews: 65,
    },
    {
      id: 2,
      name: "Cody Fisher",
      image: codyFisherImg,
      position: "Network Engineer",
      location: "New York, US",
      rating: 5,
      reviews: 65,
    },
    {
      id: 3,
      name: "Jane Cooper",
      image: janeCooperImg,
      position: "Content Manager",
      location: "Chicago, US",
      rating: 5,
      reviews: 65,
    },
    {
      id: 4,
      name: "Jerome Bell",
      image: jeromeBellImg,
      position: "Frontend Developer",
      location: "Chicago, US",
      rating: 5,
      reviews: 65,
    },
    {
      id: 5,
      name: "Floyed Miles",
      image: floyedMiles,
      position: "Frontend Developer",
      location: "Chicago, US",
      rating: 5,
      reviews: 65,
    },
  ];

  return (
    <div className="top-candidates">
      <div className="section-header">
        <h3>Top Candidates</h3>
        <button className="filter-btn">
          <i className="filter-icon"></i>
        </button>
      </div>
      <div className="candidates-list">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}

export default TopCandidates;
