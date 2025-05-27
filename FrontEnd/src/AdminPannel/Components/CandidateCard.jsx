import React from "react";
// import locationIcon from "../assets/location-icon.svg";
// import verifiedIcon from "../assets/verified-icon.svg";

function CandidateCard({ candidate }) {
  const { name, image, position, location, rating, reviews } = candidate;

  // Generate star ratings
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ));

  return (
    <div className="candidate-card">
      <div className="candidate-left">
        <div className="candidate-image">
          <img src={image} alt={name} />
          <div className="verified-badge">
            {/* <img src={verifiedIcon} alt="Verified" /> */}
          </div>
        </div>
        <div className="candidate-info">
          <h4>{name}</h4>
          <p className="position">{position}</p>
        </div>
      </div>
      <div className="candidate-right">
        <div className="location">
          <i class="fa-solid fa-location-dot"></i>
          {/* <img src={locationIcon} alt="Location" /> */}
          <span>{location}</span>
        </div>
        <div className="rating">
          <div className="stars">{stars}</div>
          <span className="reviews">({reviews})</span>
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
