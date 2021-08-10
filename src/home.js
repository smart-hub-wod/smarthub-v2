import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  // making the squre and triangle reducing function for responsive
  // function sqTr() {
  //     if()
  // }

  return (
    // justify-content-center text-center
    <div className="fade-in">
      {/* <div className="shape-container">
        <img className="shape" src="../square.jpg" alt="shape-pic" />
        <img className="shape" src="../triangle.png" alt="shape-pic" />
        <img className="shape" src="../square.jpg" alt="shape-pic" />
        <img className="shape" src="../triangle.png" alt="shape-pic" />
        <img className="shape" src="../square.jpg" alt="shape-pic" />
        <img className="shape" src="../triangle.png" alt="shape-pic" />
      </div> */}
      <Container
        fluid
        className="d-flex align-items-center justify-content-center pt-5"
      >
        <Row>
          <Col style={{ paddingTop: "5rem" }}>
            <div className="text-shblue ms-5">
              <h1 className="heading-text" style={{ width: "70%" }}>
                A Head Start Into the Future
              </h1>
              <h5>
                Introduce your child into the world of STEM to fuel their
                passion - with Smart Hub.
              </h5>
              <Link to="../signup">
                <Button bsPrefix="button-sh" className="mt-3">
                  Sign Up Today!
                </Button>
              </Link>
            </div>
          </Col>
          <Col>
            <img className="logo-ani" src="../land-1pic.png" alt="1 landing page pic" />
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center text-center py-5 mt-5 is-shblue text-white"
      >
        <div className="row justify-content-center">
          <div className="col-2">
            <img alt="" src="../book-lover.svg" height="175" />
          </div>
          <div className="col-6 align-self-center">
            <h1>Our Mission</h1>
            <p>
              The mission of Smart Hub is to provide course materials on
              STEM-related real-life applications such as biomedical
              engineering, software engineering and quantum computing in a
              simplified and understandable manner for elementary school
              children to get a head start on their future interests and
              careers!
            </p>
          </div>
        </div>
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center text-center pt-5"
      >
        <div className="text-shblue">
          <h1>Why Choose Smart Hub?</h1>
          <div className="row align-items-start row justify-content-center">
            <div className="col-3">
              <img alt="" src="../boat.gif" height="175" />
              <h5>Kid Friendly</h5>
              <p>
                All materials are presented in a kid-friendly and easily
                understandable manner.
              </p>
            </div>
            <div className="col-3">
              <img alt="" src="../school.gif" height="175" />
              <h5>Engaging Lessons</h5>
              <p>
                Interactive online course material and hands-on learning with
                STEM kits.
              </p>
            </div>
            <div className="col-3">
              <img alt="" src="../confetti.gif" height="175" />
              <h5>Certifications</h5>
              <p>
                After completing each course, children will receive a
                certificate of completion recognizing their accomplishment and
                acknowledging their skills in the completed course.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center text-center py-5 mt-5 is-shblue text-white"
      >
        <div className="row justify-content-evenly">
          <div className="col-4">
            <img alt="" src="../octlogo.png" height="150" />
          </div>
          <div className="col-4">
            <h1>Trustworthy Content</h1>
            <p>
              All courses have been reviewed by Ontario College of Teachers
              (OCT) certified teachers.
            </p>
          </div>
        </div>
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center text-center py-5 mt-5 text-shblue"
      >
        <div className="row justify-content-center">
          <div className="col-6">
            <h1>What are you waiting for?</h1>
            <p>
              Get started today and learn just how easy it is to get your child
              into STEM!
            </p>
            <Link to="../signup">
              <Button bsPrefix="button-sh" className="mt-3">
                Sign Up Today!
              </Button>
            </Link>
          </div>
          <div className="col-5">
            <img alt="" src="../engineer-icon.svg" height="200" />
          </div>
        </div>
      </Container>
    </div>
  );
}
