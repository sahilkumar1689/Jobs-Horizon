import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Paginate from "./paginate";
import TopJobs from "./TopJobs";
import Search from "./Search";

function Home() {
  const navigate = useNavigate();
  const isLogin = useSelector((store) => store.isLogin);

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
        {/* HOME */}
        <section
          className="home-section section-hero overlay bg-image"
          style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <div className="mb-5 text-center">
                  <h1 className="text-white font-weight-bold">
                    The Easiest Way To Get Your Dream Job
                  </h1>
                  <p>
                    The Job Application Portal is dedicated to helping
                    individuals connect with top job opportunities across
                    diverse industries. It offers a seamless and user-friendly
                    experience for users to discover, apply for, and succeed in
                    their desired roles.
                  </p>
                </div>
                <Search />
              </div>
            </div>
          </div>
          <a href="#next" className="scroll-button smoothscroll">
            <span className=" icon-keyboard_arrow_down" />
          </a>
        </section>
        <section
          className="py-5 bg-image overlay-primary fixed overlay"
          id="next"
          style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        >
          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2 text-white">
                  JobBoard Site Stats
                </h2>
                <p className="lead text-white">
                  Our platform's advanced algorithms and personalized
                  recommendations have enabled 85% of users to secure jobs
                  aligned with their skills and aspirations, making it an
                  essential resource for job seekers.
                </p>
              </div>
            </div>
            <div className="row pb-0 block__19738 section-counter">
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={1930}>
                    0
                  </strong>
                </div>
                <span className="caption">Candidates</span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={54}>
                    0
                  </strong>
                </div>
                <span className="caption">Jobs Posted</span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={120}>
                    0
                  </strong>
                </div>
                <span className="caption">Jobs Filled</span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={550}>
                    0
                  </strong>
                </div>
                <span className="caption">Companies</span>
              </div>
            </div>
          </div>
        </section>
        {/* <Paginate /> */}
        <TopJobs />
        <section
          className="py-5 bg-image overlay-primary fixed overlay"
          style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        >
          {!isLogin ? (
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="text-white">Looking For A Job?</h2>
                  <p className="mb-0 text-white lead">
                    "Step into your future—start your job search today. Your
                    next big move awaits!"
                  </p>
                </div>
                <div className="col-md-3 ml-auto">
                  <a href="/login" className="btn btn-warning btn-block btn-lg">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </section>
        <section className="site-section py-4 my-10">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 text-center mt-4 mb-5">
                <div className="row justify-content-center">
                  <div className="col-md-7">
                    <h2 className="section-title mb-2">Company We've Helped</h2>
                    <p className="lead">
                      Over the years, we’ve had the privilege of partnering with
                      numerous esteemed companies to help them find exceptional
                      talent. Our efforts have facilitated over 500 successful
                      matches for Intel, enhanced productivity by 20% for
                      Tinder, and helped PayPal expand their workforce globally.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img
                  src="images/logo_mailchimp.svg"
                  alt="Image"
                  className="img-fluid logo-1"
                />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img
                  src="images/logo_paypal.svg"
                  alt="Image"
                  className="img-fluid logo-2"
                />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img
                  src="images/logo_stripe.svg"
                  alt="Image"
                  className="img-fluid logo-3"
                />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img
                  src="images/logo_visa.svg"
                  alt="Image"
                  className="img-fluid logo-4"
                />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img
                  src="images/logo_apple.svg"
                  alt="Image"
                  className="img-fluid logo-5"
                />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img
                  src="images/logo_tinder.svg"
                  alt="Image"
                  className="img-fluid logo-6"
                />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img
                  src="images/logo_sony.svg"
                  alt="Image"
                  className="img-fluid logo-7"
                />
              </div>
              <div className="col-6 col-lg-3 col-md-6 text-center">
                <img
                  src="images/logo_airbnb.svg"
                  alt="Image"
                  className="img-fluid logo-8"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-light pt-5 mb-10 testimony-full">
          <div className="owl-carousel single-carousel">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 align-self-center text-center text-lg-left">
                  <blockquote>
                    <p>
                      "The training and support I received here were
                      exceptional," shares one of our graduates. "I felt fully
                      prepared to step into my role and excel. The guidance and
                      resources provided were instrumental in my success, and I
                      couldn't have asked for a better start to my career."
                    </p>
                    <p>
                      <cite> — Corey Woods, @Dribbble</cite>
                    </p>
                  </blockquote>
                </div>
                <div className="col-lg-6 align-self-end text-center text-lg-right">
                  <img
                    src="images/person_transparent_2.png"
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
                      "The training and support I received here were
                      exceptional," shares one of our graduates. "I felt fully
                      prepared to step into my role and excel. The guidance and
                      resources provided were instrumental in my success, and I
                      couldn't have asked for a better start to my career."
                    </p>
                    <p>
                      <cite> — Chris Peters, @Google</cite>
                    </p>
                  </blockquote>
                </div>
                <div className="col-lg-6 align-self-end text-center text-lg-right">
                  <img
                    src="images/person_transparent.png"
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
          style={{
            backgroundImage: 'url("images/hero_1.jpg")',
            marginTop: "00px",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6 align-self-center text-center text-md-left mb-5 mb-md-0">
                <h2 className="text-white">Get The Mobile Apps</h2>
                <p className="mb-5 lead text-white">
                  "Stay connected on the go! Download our mobile app for
                  seamless access to job opportunities anytime, anywhere."
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
                    className="btn btn-dark btn-md px-4 border-width-2 ml-5"
                  >
                    <span className="icon-android mr-3" />
                    Play Store
                  </a>
                </p>
              </div>
              <div className="col-md-6 ml-auto align-self-end">
                <img
                  src="images/apps.png"
                  alt="Free Website Template by Free-Template.co"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Home;
