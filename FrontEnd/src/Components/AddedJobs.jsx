import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddedJobsTable from "./AddedJobsTable";
import { useDispatch } from "react-redux";
import { addedJobsActions } from "../ReduxStore/Slices/AddedJobs";
import { HashLoader } from "react-spinners";

function AddedJobs() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAddedJobs();
  }, []);

  const getAddedJobs = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("userLogIn"));
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}details/companyAddedJobs`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        // console.log(res.data.data);
        dispatch(addedJobsActions.setAddedJobs(res.data.data));
        setIsLoading(false);
      }
    } catch (error) {
      // console.log("Error", error.response.data.errorMessage);
      toast.error(
        error.response.data.errorMessage ||
          "Something went wrong,Try Login Again"
      );
      if (error.response.status === 401) {
        localStorage.removeItem("userLogIn");
        nav("/login");
      }
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
                <h1 className="text-white font-weight-bold">
                  Company Added Jobs
                </h1>
                <div className="custom-breadcrumbs">
                  <a href="/">Home</a> <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>addedJobs</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {isLoading ? (
          <div className="text-center">
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
          <AddedJobsTable />
        )}
        <Footer />
      </div>
    </>
  );
}

export default AddedJobs;
