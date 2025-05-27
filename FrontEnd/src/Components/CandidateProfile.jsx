import { useSelector } from "react-redux";
import "../Style/CandidateProfile.css";
import { FaPenClip } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CandidateProfile = () => {
  const nav = useNavigate();
  const profileObj = useSelector((state) => state.candidateProfile);
  const {
    userId,
    bio,
    bioImg,
    resume,
    skills,
    contact,
    currentLocation,
    preferLocation,
    qualification,
    experience,
  } = profileObj;

  return (
    <>
      {!userId ? (
        (toast.error("Session Expired, Please Login Again"), nav("/login"))
      ) : (
        <div className="candidate-profile" style={{ margin: "80px auto" }}>
          <div
            className="header"
            style={{
              height: "200px",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "20px",
              position: "relative",
            }}
          >
            <img src={bioImg || ""} alt="Profile" className="profile-img" />
            <h2>
              {userId.firstName} {userId.lastName}
            </h2>
            <FaPenClip
              className="edit-icon"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "1px solid #000",
                padding: "5px",
                height: "40px",
                width: "40px",
                borderRadius: "10%",
              }}
              onClick={() => {
                nav("/updateProfileForm");
              }}
            />
          </div>

          <div className="section">
            <h3>Resume</h3>
            <div className="profile-info">
              <a
                href={resume || ""}
                target="_blank"
                rel="noreferrer"
                className="resume-link"
              >
                Resume
              </a>
            </div>
          </div>
          <div className="section">
            <h3>Skills</h3>
            <ul className="skills">
              {skills.length === 0
                ? " "
                : skills.map((skill) => (
                    <li key={skill._id}>{skill.skillName}</li>
                  ))}
            </ul>
          </div>

          <div className="section">
            <h3>Bio</h3>
            <p className="bio">{bio || ""}</p>
          </div>

          <div className="section">
            <h3>Contact & Location</h3>
            <p>
              <strong>Phone:</strong> {contact || ""}
            </p>
            <p>
              <strong>Email: </strong>
              {userId.email || ""}
            </p>
            <p>
              <strong>Current Location:</strong> {currentLocation || ""}
            </p>
            <p>
              <strong>Preferred Locations:</strong>{" "}
              {preferLocation.length === 0
                ? " "
                : preferLocation.map((loc) => loc.locationName).join(", ")}
            </p>
          </div>

          <div className="section">
            <h3>Education</h3>
            {qualification.length === 0
              ? " "
              : qualification
                  .map((q) => (
                    <div key={q._id} className="edu-item">
                      <p>
                        <strong>{q.courseName}</strong> - {q.instituteName}
                      </p>
                      <p>
                        {q.startingYear} - {q.passingYear} | {q.percentage}%
                      </p>
                    </div>
                  ))
                  .reverse()}
          </div>

          <div className="section">
            <h3>Experience</h3>
            {experience.length === 0
              ? " "
              : experience.map((exp) => (
                  <div key={exp._id} className="exp-item">
                    <p>
                      <strong>{exp.role}</strong> at {exp.company}
                    </p>
                    <p>Duration: {exp.duration}</p>
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CandidateProfile;
