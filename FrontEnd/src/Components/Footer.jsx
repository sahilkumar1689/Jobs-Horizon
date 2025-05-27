import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="site-footer">
        <a href="#top" className="smoothscroll scroll-top">
          <span className="icon-keyboard_arrow_up" />
        </a>
        <div className="container">
          <div className="row mb-5">
            <div className="col-6 col-md-3 mb-4 mb-md-0">
              <h3>Search Trending</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to={"#"}>Web Design</Link>
                </li>
                <li>
                  <Link to={"#"}>Graphic Design</Link>
                </li>
                <li>
                  <Link to={"#"}>Web Developers</Link>
                </li>
                <li>
                  <Link to={"#"}>Python</Link>
                </li>
                <li>
                  <Link to={"#"}>HTML5</Link>
                </li>
                <li>
                  <Link to={"#"}>CSS3</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-4 mb-md-0">
              <h3>Company</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to={"/about"}>About Us</Link>
                </li>
                <li>
                  <Link to={"#"}>Career</Link>
                </li>
                <li>
                  <Link to={"/blog"}>Blog</Link>
                </li>
                <li>
                  <Link to={"#"}>Resources</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-4 mb-md-0">
              <h3>Support</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to={"#"}>Support</Link>
                </li>
                <li>
                  <Link to={"#"}>Privacy</Link>
                </li>
                <li>
                  <Link to={"#"}>Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-4 mb-md-0">
              <h3>Contact Us</h3>
              <div className="footer-social">
                <Link to={"#"} className="ml-2">
                  <span className="icon-facebook" />
                </Link>
                <Link to={"#"} className="ml-2">
                  <span className="icon-twitter" />
                </Link>
                <Link to={"#"} className="ml-2">
                  <span className="icon-instagram" />
                </Link>
                <Link to={"#"} className="ml-2">
                  <span className="icon-linkedin" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12">
              <p className="copyright">
                <small>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved by JOB'S HORIZON 2025
                </small>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
