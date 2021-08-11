import React from "react";
import { Nav, Container } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Container fluid className="is-shblue text-white d-flex row justify-content-center py-3 position-sticky bottom-0 end-0 text-center mt-5">
        <div className="d-flex flex-row justify-content-center pb-1">
          <Nav.Link>
            <Link className="link" to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="link" to="/about">
              About
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="link" to="/courses">
              Courses
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="link" to="/meet-the-team">
              Meet The Team
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="link" to="/contact-us">
              Contact Us
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/parent-faq" className="link">
              For Parents
            </Link>
          </Nav.Link>
        </div>
        <div className="d-flex flex-row justify-content-center py-1">
          <div className="px-2">
            <a href="https://www.facebook.com/">
              <Facebook color="white" size={30} />
            </a>
          </div>
          <div className="px-2">
            <a href="https://www.instagram.com/">
              <Instagram color="white" size={30} />
            </a>
          </div>
          <div className="px-2">
            <a href="https://www.linkedin.com/">
              <Linkedin color="white" size={30} />
            </a>
          </div>
        </div>
        <div>
          <img src="../smarthub-logo.png" height="50" className="d-inline-block align-top" alt="Smart Hub logo" />
        </div>
        <p>© West Oak Design Inc. | All rights reserved</p>
        <p className="iconstext text-light">
          Animated Icons by{" "}
          <a className="text-white" href="https://lordicon.com">
            Lordicon.com
          </a>
        </p>
        <div className="d-flex flex-row justify-content-center">
          <Nav.Link>
            <Link className="link" to="/terms-and-conditions">
              Terms and Conditions
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="link" to="/privacy-policy">
              Privacy Policy
            </Link>
          </Nav.Link>
        </div>
      </Container>
    </footer>
  );
}
