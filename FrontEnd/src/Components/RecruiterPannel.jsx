import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { companyProfileActions } from "../ReduxStore/Slices/CompanyProfile";
import CompanyProfile from "./CompanyProfile";
import { HashLoader } from "react-spinners";

function RecruiterPannel() {
  const dispatch = useDispatch();

  let [isLoading, setIsLoading] = useState(true);

  // Fetching the profile data when the component mounts
  useEffect(() => {
    getCmpProfile();
  }, []);

  const getCmpProfile = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userLogIn"));
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}details/getCompanyData`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log("Company Details:", data);
      if (data) dispatch(companyProfileActions.setCompanyProfile(data.details));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile data,Try LogIn Again");
    }
  };

  return (
    <>
      <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>{" "}
        {/* .site-mobile-menu */}
        {/* NAVBAR */}
        <NavBar />
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Company Profile</h1>
                <div className="custom-breadcrumbs">
                  <a href="/">Home</a> <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>CompanyProfile</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {isLoading ? (
          <div className="loading">
            <HashLoader
              color="#00ff27"
              loading={true}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="loaderSpinner"
              cssOverride={{
                margin: "100px auto",
              }}
            />
          </div>
        ) : (
          <CompanyProfile />
        )}
        <Footer />
      </div>
    </>
  );
}

export default RecruiterPannel;
