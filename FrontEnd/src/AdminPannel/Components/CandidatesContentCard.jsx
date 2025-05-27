import React from "react";
import "../Candidates.css";

const CandidatesContentSection = () => {
  // Sample candidate data - you'll replace this with your own data
  const candidates = [
    {
      id: 1,
      name: "Robert Fox",
      position: "UI/UX Designer",
      rating: 5,
      reviews: 68,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital", "Adobe Illustrator", "Sketch"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Alexander.png",
    },
    {
      id: 2,
      name: "Cody Fisher",
      position: "Python Developer",
      rating: 5,
      reviews: 61,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Cameron.png",
    },
    {
      id: 3,
      name: "Jerome Bell",
      position: "Content Writer",
      rating: 5,
      reviews: 49,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/CodeFisher.png",
    },
    {
      id: 4,
      name: "Jane Cooper",
      position: "ReactJS",
      rating: 5,
      reviews: 55,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/CourtHenry.png",
    },
    {
      id: 5,
      name: "Floyd Miles",
      position: "Frontend",
      rating: 5,
      reviews: 45,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/DevonLane.png",
    },
    {
      id: 6,
      name: "Devon Lane",
      position: "Online Marketing",
      rating: 5,
      reviews: 61,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Eleanor.png",
    },
    {
      id: 7,
      name: "Jerome Bell",
      position: "UI/UX Designer",
      rating: 5,
      reviews: 55,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/FloydMiles.png",
    },
    {
      id: 8,
      name: "Eleanor",
      position: "UI/UX Designer",
      rating: 5,
      reviews: 47,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Hawkins.png",
    },
    {
      id: 9,
      name: "Haward",
      position: "UI/UX Designer",
      rating: 5,
      reviews: 47,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Howard.png",
    },
    {
      id: 10,
      name: "Robert Fox",
      position: "UI/UX Designer",
      rating: 5,
      reviews: 68,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital", "Adobe Illustrator", "Sketch"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/JacobJones.png",
    },
    {
      id: 11,
      name: "Cody Fisher",
      position: "Python Developer",
      rating: 5,
      reviews: 61,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/janeCooper.png",
    },
    {
      id: 12,
      name: "Jerome Bell",
      position: "Content Writer",
      rating: 5,
      reviews: 49,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Jrome3.png",
    },
    {
      id: 13,
      name: "Jane Cooper",
      position: "ReactJS",
      rating: 5,
      reviews: 55,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/JromeBell2.png",
    },
    {
      id: 14,
      name: "Floyd Miles",
      position: "Frontend",
      rating: 5,
      reviews: 45,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Robert.png",
    },
    {
      id: 15,
      name: "Devon Lane",
      position: "Online Marketing",
      rating: 5,
      reviews: 61,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Theresa.png",
    },
    {
      id: 16,
      name: "Jerome Bell",
      position: "UI/UX Designer",
      rating: 5,
      reviews: 55,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Hawkins.png",
    },
    {
      id: 17,
      name: "Eleanor",
      position: "UI/UX Designer",
      rating: 5,
      reviews: 47,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Howard.png",
    },
    {
      id: 18,
      name: "Devon Lane",
      position: "Online Marketing",
      rating: 5,
      reviews: 61,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Eleanor.png",
    },
    {
      id: 19,
      name: "Jerome Bell",
      position: "UI/UX Designer",
      rating: 5,
      reviews: 55,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/FloydMiles.png",
    },
    {
      id: 20,
      name: "Eleanor",
      position: "UI/UX Designer",
      rating: 5,
      reviews: 47,
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vitae repellendus magni, atque delectus molestias quis?",
      skills: ["Figma", "Adobe XD", "PSD", "App"],
      tags: ["Digital"],
      location: "Chicago, US",
      hourlyRate: 45,
      path: "/AdminAssets/CandidatesImg/Hawkins.png",
    },
  ];

  // Alphabet filter
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Function to render stars for rating
  const renderStars = (rating, reviews) => {
    return (
      <div className="candidate-rating">
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
    <div className="candidates-container">
      {/* Alphabet filter */}
      <div className="alphabet-filter">
        {alphabet.map((letter) => (
          <button key={letter} className="letter-btn">
            {letter}
          </button>
        ))}
      </div>

      {/* Candidates grid */}
      <div className="candidates-grid">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="candidate-content-card">
            <div className="candidate-header">
              <div className="candidate-img-container">
                {/* This is a placeholder, you will replace with actual images */}
                <img
                  src={candidate.path}
                  alt={candidate.name}
                  className="candidate-content-img"
                />
                <span
                  className={`status-indicator ${
                    candidate.id % 2 === 0 ? "orange" : "green"
                  }`}
                ></span>
              </div>
              <div className="candidate-info">
                <h3 className="candidate-name">{candidate.name}</h3>
                <p className="candidate-position">{candidate.position}</p>
                {renderStars(candidate.rating, candidate.reviews)}
              </div>
            </div>

            <div className="candidate-description">{candidate.description}</div>

            <div className="candidate-skills">
              {candidate.skills.map((skill, index) => (
                <span key={index} className="skill">
                  {skill}
                </span>
              ))}
            </div>

            <div className="candidate-tags">
              {candidate.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="candidate-footer">
              <div className="location">
                <span className="location-icon">📍</span>
                <span>{candidate.location}</span>
              </div>
              <div className="hourly-rate">
                <span className="rate-icon">⏱️</span>
                <span>${candidate.hourlyRate}/hour</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatesContentSection;
