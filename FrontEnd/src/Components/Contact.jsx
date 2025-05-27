import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Contact() {
  // Creating Refrences:
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const messageRef = useRef(null);

  // Handle Submit Function:
  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch all refrences data:
    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    let email = emailRef.current.value;
    let contact = contactRef.current.value;
    let message = messageRef.current.value;

    // Check the fields:
    if (!firstName || !lastName || !email || !contact || !message) {
      toast.error("Please fill all the fields.");
      return;
    }

    // Make the field empty:
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    contactRef.current.value = "";
    messageRef.current.value = "";

    // console.log(firstName, lastName, email, contact, message);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}additional/contactUs`, {
        firstName,
        lastName,
        email,
        contact,
        message,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
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
            style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold">Contact Us</h1>
                  <div className="custom-breadcrumbs">
                    <a href="/">Home</a> <span className="mx-2 slash">/</span>
                    <span className="text-white">
                      <strong>Contact Us</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section" id="next-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <form action="#" className="" onSubmit={handleSubmit}>
                    <div className="row form-group">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label className="text-black" htmlFor="fname">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="fname"
                          className="form-control"
                          ref={firstNameRef}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="text-black" htmlFor="lname">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lname"
                          className="form-control"
                          ref={lastNameRef}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-12">
                        <label className="text-black" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          ref={emailRef}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-12">
                        <label className="text-black" htmlFor="subject">
                          Contact
                        </label>

                        <input
                          type="number"
                          id="subject"
                          className="form-control"
                          ref={contactRef}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-12">
                        <label className="text-black" htmlFor="message">
                          Message
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          cols={30}
                          rows={7}
                          className="form-control"
                          placeholder="Write your notes or questions here..."
                          defaultValue={""}
                          ref={messageRef}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-12">
                        <input
                          type="submit"
                          defaultValue="Send Message"
                          className="btn btn-primary btn-md text-white"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-5 ml-auto">
                  <div className="p-4 mb-3 bg-white">
                    <p className="mb-0 font-weight-bold">Address</p>
                    <p className="mb-4">
                      203 Fake St. Mountain View, Model Town, Jalandhar,
                      Punjab,India
                    </p>
                    <p className="mb-0 font-weight-bold">Phone</p>
                    <p className="mb-4">
                      <a href="#">+1 232 3235 324</a>
                    </p>
                    <p className="mb-0 font-weight-bold">Email Address</p>
                    <p className="mb-0">
                      <a href="#">temp@domain.com</a>
                    </p>
                  </div>
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

export default Contact;
