import React, { useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
    window.scrollTo(0, 0);
  });
  return (
    // justify-content-center text-center
    <div>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center pt-5"
      >
        <Row>
          <Col md={6} style={{ paddingTop: "5rem" }}>
            <div className="text-shblue ms-5">
              <img
                style={{ left: "25rem", top: "8.11rem", zIndex: "1" }}
                className="shape"
                src="../triangle.png"
                alt="shape-pic"
              />
              {/* <img
                style={{ left: "45rem", top: "9rem" }}
                className="shape"
                src="../square.jpg"
                alt="shape-pic"
              /> */}
              <img
                style={{ top: "30rem", left: "10rem" }}
                className="shape"
                src="../square.jpg"
                alt="shape-pic"
              />
              <img
                style={{ left: "5rem", top: "6rem" }}
                className="shape"
                src="../triangle.png"
                alt="shape-pic"
              />
              <img
                style={{ top: "25rem", left: "40rem" }}
                className="shape"
                src="../square.jpg"
                alt="shape-pic"
              />

              <h1 className="heading-text">A Head Start Into the Future</h1>
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
          <Col md={6}>
            <div className="slide-top">
              <div className="w-100">
                <video muted autoPlay src="../student-videos/home-video.mp4" />
              </div>
              {/* <img
                className="slide-top"
                // src="../land-1pic.png"
                src="../laptop-bg.png"
                alt="1 landing page pic"
              /> */}
            </div>
            {/* <video className="slide-top" src="../laptop-video.mp4" autoPlay /> */}

            <img
              style={{ right: "3rem", top: "8.11rem", zIndex: "1" }}
              className="shape"
              src="../triangle.png"
              alt="shape-pic"
            />
            {/* <img style={{ top: "17rem", right: "10rem" }} className="shape" src="../square.jpg" alt="shape-pic" />
            <img style={{ right: "7rem", top: "29rem" }} className="shape" src="../triangle.png" alt="shape-pic" /> */}
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center text-center py-5 mt-5 is-shblue text-white"
      >
        <Row className="justify-content-center">
          <Col lg={4}>
            <img alt="" src="../book-lover.svg" height="200" />
          </Col>
          <Col lg={6}>
            <h1>Our Mission</h1>
            <p className="mission-res">
              <strong>Smart Hub</strong>???s mission is to provide course
              materials on STEM-related real-life applications such as
              biomedical engineering, software engineering and quantum computing
              in a simplified and understandable manner for elementary school
              children to get a head start on their future interests and
              careers.
            </p>
          </Col>
        </Row>
        {/* <div className="row justify-content-center">
          <div className="col-2">
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
        </div> */}
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center text-center pt-5"
      >
        <div className="text-shblue">
          <h1>Why Choose Smart Hub?</h1>
          <div className="row align-items-start row justify-content-center">
            <div
              data-aos="slide-up"
              data-aos-duration="900"
              className="col-md-3 col-sm-12"
            >
              <img alt="" src="../boat.gif" height="175" />
              <h5>Kid Friendly</h5>
              <p>
                All materials are presented in a kid-friendly and easily
                understandable manner.
              </p>
            </div>
            <div
              data-aos="slide-up"
              data-aos-delay="200"
              className="col-md-3 col-sm-12"
            >
              <img alt="" src="../school.gif" height="175" />
              <h5>Engaging Lessons</h5>
              <p>
                Interactive online course material and hands-on learning with
                STEM kits.
              </p>
            </div>
            <div
              data-aos="slide-up"
              data-aos-delay="400"
              className="col-md-3 col-sm-12"
            >
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
          <Col md={4}>
            {/* Delete image and add Carousel below */}
            <img alt="" src="../octlogo.png" height="150" />
          </Col>

          <Col md={4}>
            <h1>Trustworthy Content</h1>
            <p>
              All courses have been reviewed by Ontario College of Teachers
              (OCT) certified teachers.
            </p>
          </Col>
        </div>
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center text-center py-5 mt-5 text-shblue"
      >
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <h1>What are you waiting for?</h1>
            <p>
              Get started today and learn just how easy it is to get your child
              into STEM!
            </p>
            <Link to="../signup">
              <Button data-aos="fade-up" bsPrefix="button-sh" className="mt-3">
                Sign Up Today!
              </Button>
            </Link>
          </div>
          <div className="col-md-5 col-sm-12">
            <img alt="" src="../engineer-icon.svg" height="200" />
          </div>
        </div>
      </Container>
    </div>
  );
}
