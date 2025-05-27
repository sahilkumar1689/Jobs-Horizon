import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

function FrequentQuestion() {
  const faqs = [
    {
      question: "How do I apply for a job on Job Horizon?",
      answer:
        "To apply for a job, first log in to your candidate account. Browse the job listings, and when you find a suitable job, click 'Apply Now.' Make sure your profile, resume, and other details are up to date before submitting your application.",
    },
    {
      question: "Can I update my resume or profile after applying for a job?",
      answer:
        "Yes, you can update your profile or resume at any time. However, updates made after applying will not affect previous applications. It's best to ensure your information is current before applying.",
    },
    {
      question: "How will I know if I’m shortlisted for a job?",
      answer:
        "If you're shortlisted, you'll receive an email notification and a status update in your dashboard. Recruiters may also contact you directly through your registered email or phone number.",
    },
    {
      question: "I’m an employer—how can I post a job?",
      answer:
        "First, sign in with your company account. Navigate to the “Post a Job” section, fill in all required details (job title, description, requirements, location), and click “Submit.” Your job will be live after admin verification.",
    },
    {
      question: "Is Job Horizon free to use?",
      answer:
        "Yes, Job Horizon is free for both job seekers and employers to register, browse, and apply/post jobs. However, we may offer premium features in the future like job promotions or highlighted listings.",
    },
  ];

  const collapseArr = [
    "collapseFive",
    "collapseSix",
    "collapseSeven",
    "collapseEight",
  ];

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
            style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold">
                    Frequently Ask Questions
                  </h1>
                  <div className="custom-breadcrumbs">
                    <a href="/">Home</a> <span className="mx-2 slash">/</span>
                    <span className="text-white">
                      <strong>FAQ</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section" id="accordion">
            <div className="container">
              <div className="row accordion justify-content-center block__76208">
                <div className="col-lg-6">
                  <img
                    src="images/sq_img_8.jpg"
                    alt="Image"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-lg-5 ml-auto">
                  {faqs.map((elem, idx) => {
                    return (
                      <div className="accordion-item" key={idx}>
                        <h3 className="mb-0 heading">
                          <a
                            className="btn-block h4"
                            data-toggle="collapse"
                            href={`#${collapseArr[idx]}`}
                            role="button"
                            aria-expanded="true"
                            aria-controls={`${collapseArr[idx]}`}
                          >
                            {elem.question}
                            <span className="icon" />
                          </a>
                        </h3>
                        <div
                          id={`${collapseArr[idx]}`}
                          className="collapse"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="body-text">
                            <p>{elem.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}{" "}
                </div>
              </div>
            </div>
          </section>
          <section className="site-section bg-light">
            <div className="container">
              <div className="row mb-5">
                <div className="col-12 text-center" data-aos="fade">
                  <h2 className="section-title mb-3">Happy Candidates Says</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="block__87154 bg-white rounded">
                    <blockquote>
                      <p>
                        “Ipsum harum assumenda in eum vel eveniet numquam cumque
                        vero vitae enim cupiditate deserunt eligendi officia
                        modi consectetur. Expedita tempora quos nobis earum hic
                        ex asperiores quisquam optio nostrum sit”
                      </p>
                    </blockquote>
                    <div className="block__91147 d-flex align-items-center">
                      <figure className="mr-4">
                        <img
                          src="images/person_1.jpg"
                          alt="Image"
                          className="img-fluid"
                        />
                      </figure>
                      <div>
                        <h3>Elisabeth Smith</h3>
                        <span className="position">Creative Director</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="block__87154 bg-white rounded">
                    <blockquote>
                      <p>
                        “Ipsum harum assumenda in eum vel eveniet numquam,
                        cumque vero vitae enim cupiditate deserunt eligendi
                        officia modi consectetur. Expedita tempora quos nobis
                        earum hic ex asperiores quisquam optio nostrum sit”
                      </p>
                    </blockquote>
                    <div className="block__91147 d-flex align-items-center">
                      <figure className="mr-4">
                        <img
                          src="images/person_2.jpg"
                          alt="Image"
                          className="img-fluid"
                        />
                      </figure>
                      <div>
                        <h3>Chris Peter</h3>
                        <span className="position">Web Designer</span>
                      </div>
                    </div>
                  </div>
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

export default FrequentQuestion;
