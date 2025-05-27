import { Link, useNavigate } from "react-router-dom";
import "../Style/App.css";
import { CgProfile } from "react-icons/cg";
import { FaUserTie } from "react-icons/fa6";
import { MdExitToApp } from "react-icons/md";
import { BsJournalArrowUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logInAction } from "../ReduxStore/Slices/logInSlice";
import Swal from "sweetalert2";

function NavBar() {
  const nav = useNavigate();
  const isLogin = useSelector((store) => store.isLogin);
  const userType = JSON.parse(localStorage.getItem("userType"));
  // console.log(userType);
  const dispatch = useDispatch();

  // User Logout With Swal Handling
  const swalLogoutHandling = () => {
    Swal.fire({
      title: "Are you sure, You Want to logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Log Out!",
      cancelButtonText: "No, Keep",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userLogIn");
        localStorage.removeItem("userType");
        dispatch(logInAction.setLogIn(false));
        toast.success("Logged out successfully");
        nav("/");
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Log Out Canceled", "You are still logged in.", "info");
      }
    });
  };

  return (
    <>
      <header className="site-navbar mt-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="site-logo col-6">
              <Link to={"/"}>JOB'S HORIZON</Link>
            </div>
            <nav className="mx-auto site-navigation">
              <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                <li>
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/allJobs"} className="nav-link">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li className="">
                  <Link to={"/testimonial"}>Testimonials</Link>
                </li>
                <li className="">
                  <Link to={"/frequentQuestion"}>FAQ</Link>
                </li>

                <li>
                  <Link to={"/contact"}>Contact</Link>
                </li>
              </ul>
            </nav>
            <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
              <div className="ml-auto">
                {userType === 2 ? (
                  <Link
                    to={"/postJob"}
                    className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"
                  >
                    <span className="mr-2 icon-add" />
                    Post a Job
                  </Link>
                ) : null}

                {!isLogin ? (
                  <Link
                    to={"/login"}
                    className="btn btn-primary border-width-2 d-none d-lg-inline-block ml-5"
                  >
                    <span className="mr-2 icon-lock_outline" />
                    SignUp
                  </Link>
                ) : userType === 1 ? (
                  <div className="dropdownContainer">
                    <button className="dropbtn">
                      <FaUserTie />
                    </button>
                    <div className="dropdownContent">
                      <a
                        href="#"
                        onClick={() => {
                          nav("/candidateProfile");
                        }}
                      >
                        <CgProfile /> Profile
                      </a>
                      <a
                        href="#"
                        onClick={() => {
                          nav("/appliedJob");
                        }}
                      >
                        <BsJournalArrowUp /> Job Applied
                      </a>
                      <a
                        href="#"
                        onClick={() => {
                          swalLogoutHandling();
                        }}
                      >
                        <MdExitToApp /> Log Out
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="dropdownContainer">
                    <button className="dropbtn">
                      <FaUserTie />
                    </button>
                    <div className="dropdownContent">
                      <a
                        href="#"
                        onClick={() => {
                          nav("/companyProfile");
                        }}
                        style={{ fontSize: "15px" }}
                      >
                        <CgProfile /> CompanyProfile
                      </a>
                      <a
                        href="#"
                        onClick={() => {
                          nav("/addedJob");
                        }}
                      >
                        <BsJournalArrowUp /> Added Job
                      </a>
                      <a
                        href="#"
                        onClick={() => {
                          swalLogoutHandling();
                        }}
                      >
                        <MdExitToApp /> Log Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
