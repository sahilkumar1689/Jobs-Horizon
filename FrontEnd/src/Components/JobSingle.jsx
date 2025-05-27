import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";

function JobSingle() {
  const { id } = useParams();
  const nav = useNavigate();

  const isLogin = useSelector((store) => store.isLogin);
  const details = useSelector((state) => state.candidateProfile);
  // console.log("CndObj", details);

  const [isLoad, setIsLoad] = useState(1);
  const [jobObj, setJobObj] = useState({});

  useEffect(() => {
    getIndividualJob();
  }, []);

  const getIndividualJob = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}jobs/specificJob/${id}`
      );
      // console.log(res.data.jobDeatails);
      setJobObj(res.data.jobDeatails);
      setIsLoad(0);
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };
  // console.log("Arr :", jobObj);

  const swalLogoutHandling = () => {
    Swal.fire({
      title: "Are you sure, You Want to Apply?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Sure!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = JSON.parse(localStorage.getItem("userLogIn"));
        // console.log("Token :", token);
        axios
          .post(
            `${import.meta.env.VITE_BACKEND_URL}applied/appliedJob`,
            {
              jobAppliedId: id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            // console.log(res.data);
            toast.success("Applied Successfully");
            Swal.fire(
              "Job Applied",
              "You have been applied successfully.",
              "success"
            );
          })
          .catch((err) => {
            toast.error("Already Applied");
            Swal.fire(
              "Already Applied",
              "You have been applied already.",
              "failure"
            );
            // console.log(err.respone);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Applied Canceled", "You are still logged in.", "info");
      }
    });
  };

  const handleApply = () => {
    if (!isLogin) {
      toast.error("Login or Register");
      nav("/logIn");
    } else {
      if (JSON.parse(localStorage.getItem("userType")) !== 1) {
        toast.error("Only Candidates Can Apply");
        return;
      }

      if (!details || !details.resume) {
        toast.error("Please Complete Your Profile.");
        nav("/candidateProfile");
        return;
      }
      swalLogoutHandling();
    }
  };

  return (
    <>
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
          {/* HOME */}
          <section
            className="section-hero overlay inner-page bg-image"
            style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold">Single Job</h1>
                  <div className="custom-breadcrumbs">
                    <a href="/">Home</a> <span className="mx-2 slash">/</span>
                    <span className="text-white">
                      <strong>Single Job</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {isLoad ? (
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
          ) : (
            <section className="site-section">
              <div className="container">
                <div className="row align-items-center mb-5">
                  <div className="col-lg-8 mb-4 mb-lg-0">
                    <div className="d-flex align-items-center">
                      <div className="border p-2 d-inline-block mr-3 rounded">
                        <img src={jobObj.companyId?.companyLogo} alt="Image" />
                      </div>
                      <div>
                        <h2>{jobObj.title}</h2>
                        <div>
                          <span className="ml-0 mr-2 mb-2">
                            <span className="icon-briefcase mr-2" />
                            {jobObj.companyId?.companyName}
                          </span>
                          <span className="m-2">
                            <span className="icon-room mr-2" />
                            {jobObj.location?.locationName}
                          </span>
                          <span className="m-2">
                            <span className="icon-clock-o mr-2" />
                            <span
                              className={`${
                                jobObj.empStatus === "FullTime"
                                  ? "text-primary"
                                  : "text-danger"
                              }`}
                            >
                              {jobObj.empStatus}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <button
                          className="btn btn-block btn-primary btn-md"
                          onClick={handleApply}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="mb-5">
                      <figure className="mb-5">
                        <img
                          src={
                            jobObj.location.locationName === "Chennai"
                              ? "/images/job_single_img_1.jpg"
                              : jobObj.jobImg
                          }
                          alt="Image"
                          className="img-fluid rounded"
                        />
                      </figure>
                      <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                        <span className="icon-align-left mr-3" />
                        Job Description
                      </h3>
                      <p>{jobObj.description}</p>
                    </div>
                    <div className="mb-5">
                      <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                        <span className="icon-rocket mr-3" />
                        Responsibilities
                      </h3>
                      <ul className="list-unstyled m-0 p-0">
                        <li className="d-flex align-items-start mb-2">
                          <span className="icon-check_circle mr-2 text-muted" />
                          <span>
                            Design, develop, test, and maintain software or
                            systems as per project requirements.
                          </span>
                        </li>
                        <li className="d-flex align-items-start mb-2">
                          <span className="icon-check_circle mr-2 text-muted" />
                          <span>
                            Troubleshoot and resolve technical issues to ensure
                            smooth operations.
                          </span>
                        </li>
                        <li className="d-flex align-items-start mb-2">
                          <span className="icon-check_circle mr-2 text-muted" />
                          <span>
                            Collaborate with team members and other departments
                            to meet goals and deadlines.
                          </span>
                        </li>
                        <li className="d-flex align-items-start mb-2">
                          <span className="icon-check_circle mr-2 text-muted" />
                          <span>
                            Follow company protocols related to security,
                            documentation, and quality standards.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-5">
                      <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                        <span className="icon-book mr-3" />
                        Education + Experience
                      </h3>
                      <ul className="list-unstyled m-0 p-0">
                        <li className="d-flex align-items-start mb-2">
                          <span className="icon-check_circle mr-2 text-muted" />
                          <span>
                            Bachelor’s degree in Computer Science, Information
                            Technology, or a related field.
                          </span>
                        </li>
                        <li className="d-flex align-items-start mb-2">
                          <span className="icon-check_circle mr-2 text-muted" />
                          <span>
                            Basic understanding of programming concepts and
                            software development lifecycle.
                          </span>
                        </li>
                        <li className="d-flex align-items-start mb-2">
                          <span className="icon-check_circle mr-2 text-muted" />
                          <span>
                            Hands-on experience through internships, personal
                            projects, or freelance work.
                          </span>
                        </li>
                        <li className="d-flex align-items-start mb-2">
                          <span className="icon-check_circle mr-2 text-muted" />
                          <span>
                            Familiarity with common tools and technologies like
                            Git, databases, and problem-solving platforms.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-5">
                      <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                        <span className="icon-turned_in mr-3" />
                        Other Benifits
                      </h3>
                      <ul className="list-unstyled m-0 p-0">
                        <li className="d-flex align-items-start mb-2">
                          <span className="mr-2 text-muted" />
                          <span>
                            💼 Health insurance (medical, dental, vision) for
                            employees and often their families.
                          </span>
                        </li>
                        <li className="d-flex align-items-start mb-2">
                          <span className="mr-2 text-muted" />
                          <span>
                            🕒 Paid time off (PTO) including vacation, sick
                            leave, and public holidays.
                          </span>
                        </li>
                        <li className="d-flex align-items-start mb-2">
                          <span className="mr-2 text-muted" />
                          <span>
                            📈 Retirement plans like EPF, 401(k), or pension
                            contributions.
                          </span>
                        </li>
                        <li className="d-flex align-items-start mb-2">
                          <span className="mr-2 text-muted" />
                          <span>
                            🌐 Flexible work options such as remote work, hybrid
                            models, or flexible hours.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="row mb-5">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <button
                          className="btn btn-block btn-primary btn-md"
                          onClick={handleApply}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="bg-light p-3 border rounded mb-4">
                      <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">
                        Job Summary
                      </h3>
                      <ul className="list-unstyled pl-3 mb-0">
                        <li className="mb-2">
                          <strong className="text-black">Published on:</strong>{" "}
                          {jobObj.createdAt.split("T")[0]}
                        </li>
                        <li className="mb-2">
                          <strong className="text-black">Skills:</strong>{" "}
                          {jobObj.skills?.map((elem, idx) => {
                            return elem.skillName + " ";
                          })}
                        </li>
                        <li className="mb-2">
                          <strong className="text-black">Vacancy:</strong>{" "}
                          {jobObj.vacancy}
                        </li>
                        <li className="mb-2">
                          <strong className="text-black">
                            Employment Status:
                          </strong>{" "}
                          {jobObj.empStatus}
                        </li>
                        <li className="mb-2">
                          <strong className="text-black">Experience:</strong>
                          {jobObj.experience}
                        </li>
                        <li className="mb-2">
                          <strong className="text-black">Job Location:</strong>{" "}
                          {jobObj.location?.locationName}
                        </li>
                        <li className="mb-2">
                          <strong className="text-black">Salary:</strong>{" "}
                          {jobObj.salary}
                        </li>
                        <li className="mb-2">
                          <strong className="text-black">Gender:</strong>{" "}
                          {jobObj.gender}
                        </li>
                        <li className="mb-2">
                          <strong className="text-black">
                            Application Deadline:
                          </strong>{" "}
                          {jobObj.deadlinedate}
                        </li>
                      </ul>
                    </div>
                    <div className="bg-light p-3 border rounded">
                      <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">
                        Website Url
                      </h3>
                      <div className="px-3">
                        <a
                          href={`${jobObj.companyId?.websiteUrl}`}
                          className="pt-3 pb-3 pr-3 pl-0"
                        >
                          {jobObj.companyId?.websiteUrl}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <section className="bg-light pt-5 testimony-full">
            <div className="owl-carousel single-carousel">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 align-self-center text-center text-lg-left">
                    <blockquote>
                      <p>
                        “Soluta quasi cum delectus eum facilis recusandae
                        nesciunt molestias accusantium libero dolores repellat
                        id in dolorem laborum ad modi qui at quas dolorum
                        voluptatem voluptatum repudiandae.”
                      </p>
                      <p>
                        <cite> — Corey Woods, @Dribbble</cite>
                      </p>
                    </blockquote>
                  </div>
                  <div className="col-lg-6 align-self-end text-center text-lg-right">
                    <img
                      src="/images/person_transparent_2.png"
                      alt="Image"
                      className="img-fluid mb-0"
                    />
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 align-self-center text-center text-lg-left">
                    <blockquote>
                      <p>
                        “Soluta quasi cum delectus eum facilis recusandae
                        nesciunt molestias accusantium libero dolores repellat
                        id in dolorem laborum ad modi qui at quas dolorum
                        voluptatem voluptatum repudiandae.”
                      </p>
                      <p>
                        <cite> — Chris Peters, @Google</cite>
                      </p>
                    </blockquote>
                  </div>
                  <div className="col-lg-6 align-self-end text-center text-lg-right">
                    <img
                      src="/images/person_transparent.png"
                      alt="Image"
                      className="img-fluid mb-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="pt-5 bg-image overlay-primary fixed overlay"
            style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6 align-self-center text-center text-md-left mb-5 mb-md-0">
                  <h2 className="text-white">Get The Mobile Apps</h2>
                  <p className="mb-5 lead text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    tempora adipisci impedit.
                  </p>
                  <p className="mb-0">
                    <a
                      href="#"
                      className="btn btn-dark btn-md px-4 border-width-2"
                    >
                      <span className="icon-apple mr-3" />
                      App Store
                    </a>
                    <a
                      href="#"
                      className="btn btn-dark btn-md px-4 border-width-2"
                    >
                      <span className="icon-android mr-3" />
                      Play Store
                    </a>
                  </p>
                </div>
                <div className="col-md-6 ml-auto align-self-end">
                  <img
                    src="/images/apps.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </>
    </>
  );
}

export default JobSingle;
