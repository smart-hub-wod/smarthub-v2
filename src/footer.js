import React from "react";
import { Nav, Container, Row, Col, Button } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer">
      {/* <Container fluid className="is-shblue">
        
      </Container> */}
      <Container
        fluid
        // className="is-shblue text-white d-flex row justify-content-center py-3 position-sticky bottom-0 end-0 text-center mt-5"
        className="is-shblue text-white position-sticky bottom-0 end-0 mt-3 pt-5"
      >
        <Row className="" style={{ margin: "0 5rem" }}>
          <Col xs={4}>
            <img className="logo" src="../defaultcourseimage.png" alt="logo" />
            <p className="ms-5 mt-3">
              Location:
              <br />
              Waterloo, ON N2L 6J2
              <br />
              Waterloo, ON N2L 6J2
              <br />
              Waterloo, ON N2L 6J2
            </p>
            <h2 className="ms-5 mt-3"> Links: </h2>
            {/* <div className="d-flex justify-content-center"> */}
            <Row className="mt-3 ms-4">
              <Col>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/">
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/about">
                    About
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/courses">
                    Courses
                  </Link>
                </Nav.Link>
              </Col>
              <Col>
                {/* <Nav.Link className="nav-text mx-3">
                    <Link className="link" to="/meet-the-team">
                      Meet The Team
                    </Link>
                  </Nav.Link> */}
                <Nav.Link className="nav-text mx-3">
                  <Link to="/parent-faq" className="link">
                    Parent Zone
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/contact-us">
                    Contact Us
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/terms-and-conditions">
                    Terms and Conditions
                  </Link>
                </Nav.Link>
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <h2 className="text-white"> Follow Us: </h2>
            <div className="d-flex justify-content-start ms-3 mt-3 mb-5">
              <div className=" px-2">
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
            <h2 style={{ marginTop: "6.8rem" }}>
              {" "}
              Subscribe Smarthub News Letter:{" "}
            </h2>
            <Button className="button-sh mt-3"> Smarthub News Letter</Button>
          </Col>
          <Col xs={4}>
            <h2 className="text-white"> Resources: </h2>
            <Row>
              <Col>
                <ul>
                  <li> Resource 1 </li>
                  <li> Resource 1 </li>
                  <li> Resource 1 </li>
                  <li> Resource 1 </li>
                </ul>
              </Col>
              <Col>
                <ul>
                  <li> Resource 1 </li>
                  <li> Resource 1 </li>
                  <li> Resource 1 </li>
                  <li> Resource 1 </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <div className="d-flex flex-row justify-content-center pb-1 my">
          <Nav.Link className="nav-text mx-3">
            <Link className="link" to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-text mx-3">
            <Link className="link" to="/about">
              About
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-text mx-3">
            <Link className="link" to="/courses">
              Courses
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-text mx-3">
            <Link className="link" to="/meet-the-team">
              Meet The Team
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-text mx-3">
            <Link to="/parent-faq" className="link">
              Parent Zone
            </Link>
          </Nav.Link>
          
          <Nav.Link className="nav-text mx-3">
            <Link className="link" to="/contact-us">
              Contact Us
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-text mx-3">
            <Link className="link" to="/terms-and-conditions">
              Terms and Conditions
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
          <img
            src="../smarthub-logo.png"
            height="50"
            className="d-inline-block align-top"
            alt="Smart Hub logo"
          />
        </div>
        <p>© West Oak Design Inc. | All rights reserved</p>
        <p className="iconstext text-light">
          Animated Icons by{" "}
          <a className="text-white" href="https://lordicon.com">
            Lordicon.com
          </a>
        </p> */}
        {/* <div className="d-flex flex-row justify-content-center">
          <Nav.Link className="nav-text mx-3">
            <Link className="link" to="/contact-us">
              Contact Us
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-text mx-3">
            <Link className="link" to="/terms-and-conditions">
              Terms and Conditions
            </Link>
          </Nav.Link>
        </div> */}
        <div className="text-center mt-5 pb-4" style={{ margin: "0 auto" }}>
          <p>© West Oak Design Inc. | All rights reserved</p>
          <p className="iconstext text-light">
            Animated Icons by{" "}
            <a className="text-white" href="https://lordicon.com">
              Lordicon.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
