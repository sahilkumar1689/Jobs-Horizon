import { useSelector } from "react-redux";
import "../Style/CandidateProfile.css";
import { FaPenClip } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CompanyProfile = () => {
  const nav = useNavigate();
  const profileObj = useSelector((state) => state.companyProfile);
  const {
    userId,
    companyName,
    companyLogo,
    description,
    location,
    websiteUrl,
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
            <img
              src={companyLogo || ""}
              alt="Profile"
              className="profile-img"
            />
            <h2>{companyName}</h2>
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
                nav("/updateCompanyForm");
              }}
            />
          </div>

          <div className="section">
            <h3>About Company</h3>
            <p className="bio">{description || ""}</p>
          </div>

          <div className="section">
            <h3>Company Details</h3>
            <p>
              <strong>Website:</strong>{" "}
              <a href={websiteUrl || "#"} target="_blank">
                Learn More
              </a>
            </p>
            <p>
              <strong>Locations:</strong>{" "}
              {location.length === 0
                ? " "
                : location.map((loc) => loc.locationName).join(", ")}
            </p>
          </div>

          <div className="section">
            <h3>Recruiter Details</h3>
            <p>
              <strong>Name:</strong> {userId.firstName || ""}{" "}
              {userId.lastName || ""}
            </p>
            <p>
              <strong>Email: </strong>
              {userId.email || ""}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfile;
