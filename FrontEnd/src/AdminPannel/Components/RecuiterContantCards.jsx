import React from "react";
import "../Recruiters.css";

const RecruitersSectionCard = () => {
  // Sample recruiters/companies data - you'll replace this with your own data
  const recruiters = [
    {
      id: 1,
      name: "Car Toys",
      logo: "/AdminAssets/RecruiterImg/Amazon.png", // Replace with actual path
      rating: 5,
      reviews: 67,
      location: "New York, US",
      jobsOpen: 12,
      logoColor: "#1e40af", // Blue
    },
    {
      id: 2,
      name: "Carols Daughter",
      logo: "/AdminAssets/RecruiterImg/AshFord.png",
      rating: 5,
      reviews: 61,
      location: "London, UK",
      jobsOpen: 25,
      logoColor: "#0d9488", // Teal
    },
    {
      id: 3,
      name: "Amazon",
      logo: "/AdminAssets/RecruiterImg/BaseBall.png",
      rating: 5,
      reviews: 52,
      location: "Tokyo, Japan",
      jobsOpen: 54,
      logoColor: "#1e3a8a", // Dark blue
    },
    {
      id: 4,
      name: "Baseball Savings",
      logo: "/AdminAssets/RecruiterImg/CallWayGolf.png",
      rating: 5,
      reviews: 48,
      location: "Chicago, US",
      jobsOpen: 6,
      logoColor: "#06b6d4", // Cyan
    },
    {
      id: 5,
      name: "Ashford",
      logo: "/AdminAssets/RecruiterImg/CarToy.png",
      rating: 5,
      reviews: 53,
      location: "Toronto, Italia",
      jobsOpen: 67,
      logoColor: "#5b21b6", // Purple
    },
    {
      id: 6,
      name: "Callaway Golf",
      logo: "/AdminAssets/RecruiterImg/ExcelMovers.png",
      rating: 5,
      reviews: 47,
      location: "San Francisco, US",
      jobsOpen: 45,
      logoColor: "#0d9488", // Teal
    },
    {
      id: 7,
      name: "Percepta",
      logo: "/AdminAssets/RecruiterImg/Laybrith.png",
      rating: 5,
      reviews: 59,
      location: "Chinatown, Singapore",
      jobsOpen: 64,
      logoColor: "#dc2626", // Red
    },
    {
      id: 8,
      name: "Exela Movers",
      logo: "/AdminAssets/RecruiterImg/Percepta.png",
      rating: 5,
      reviews: 51,
      location: "New York, US",
      jobsOpen: 87,
      logoColor: "#d97706", // Amber
    },
    {
      id: 9,
      name: "Ibotta, Inc",
      logo: "/AdminAssets/RecruiterImg/Amazon.png",
      rating: 5,
      reviews: 55,
      location: "New York, US",
      jobsOpen: 22,
      logoColor: "#0d9488", // Teal
    },
    {
      id: 10,
      name: "Wanderu",
      logo: "/AdminAssets/RecruiterImg/AshFord.png",
      rating: 5,
      reviews: 58,
      location: "New York, US",
      jobsOpen: 45,
      logoColor: "#1e3a8a", // Dark blue
    },
    {
      id: 11,
      name: "Aceable, Inc.",
      logo: "/AdminAssets/RecruiterImg/BaseBall.png",
      rating: 5,
      reviews: 54,
      location: "New York, US",
      jobsOpen: 42,
      logoColor: "#047857", // Green
    },
    {
      id: 12,
      name: "Intrepid Travel",
      logo: "/AdminAssets/RecruiterImg/CallWayGolf.png",
      rating: 5,
      reviews: 63,
      location: "New York, US",
      jobsOpen: 53,
      logoColor: "#1e3a8a", // Dark blue
    },
    {
      id: 13,
      name: "Ibotta, Inc",
      logo: "/AdminAssets/RecruiterImg/CarToy.png",
      rating: 5,
      reviews: 55,
      location: "New York, US",
      jobsOpen: 22,
      logoColor: "#0d9488", // Teal
    },
    {
      id: 14,
      name: "Wanderu",
      logo: "/AdminAssets/RecruiterImg/ExcelMovers.png",
      rating: 5,
      reviews: 58,
      location: "New York, US",
      jobsOpen: 45,
      logoColor: "#1e3a8a", // Dark blue
    },
    {
      id: 15,
      name: "Aceable, Inc.",
      logo: "/AdminAssets/RecruiterImg/Laybrith.png",
      rating: 5,
      reviews: 54,
      location: "New York, US",
      jobsOpen: 42,
      logoColor: "#047857", // Green
    },
    {
      id: 16,
      name: "Intrepid Travel",
      logo: "/AdminAssets/RecruiterImg/Percepta.png",
      rating: 5,
      reviews: 63,
      location: "New York, US",
      jobsOpen: 53,
      logoColor: "#1e3a8a", // Dark blue
    },
  ];

  // Alphabet filter
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Function to render stars for rating
  const renderStars = (rating, reviews) => {
    return (
      <div className="recruiter-Content-rating">
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`star ${i < rating ? "active" : ""}`}>
              ★
            </span>
          ))}
        </div>
        <span className="reviews">({reviews})</span>
      </div>
    );
  };

  return (
    <div className="recruiters-container">
      {/* Alphabet filter */}
      <div className="alphabet-filter">
        {alphabet.map((letter) => (
          <button key={letter} className="letter-btn">
            {letter}
          </button>
        ))}
      </div>

      {/* Recruiters grid */}
      <div className="recruiters-Content-grid">
        {recruiters.map((recruiter) => (
          <div key={recruiter.id} className="recruiter-Content-card">
            <div
              className="recruiter-logo-container"
              style={{ backgroundColor: recruiter.logoColor }}
            >
              {/* Replace with actual logos */}
              <img
                src={recruiter.logo}
                alt={`${recruiter.name} logo`}
                className="recruiter-Content-logo"
              />
            </div>

            <div className="recruiter-Content-info">
              <h3 className="recruiter-Content-name">{recruiter.name}</h3>
              {renderStars(recruiter.rating, recruiter.reviews)}
              <p className="recruiter-Content-location">{recruiter.location}</p>
            </div>

            <div className="recruiter-Content-jobs">
              <p className="jobs-count">{recruiter.jobsOpen} Jobs Open</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitersSectionCard;
