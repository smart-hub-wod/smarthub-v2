import React, { useEffect } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { faChild, faHandsWash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Player, BigPlayButton, LoadingSpinner } from "video-react";
import AOS from "aos";

export default function About() {
  useEffect(() => {
    AOS.init();
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <div id="about-us">
        <section
          className="top-catcher-container text-start"
          // style={{ backgroundImage: "url(../about-video.gif)" }}
        >
          <div className="d-flex justify-content-center my-4">
            <h1 className="ms-5 heading-text">
              {" "}
              ​​SmartHub offers STEM education to our youngest learners in
              elementary school.
            </h1>
          </div>

          <video
            autoPlay={true}
            loop={true}
            muted={true}
            src="../about-video.mp4"
            className="top-catcher-video"
          />
        </section>

        <div className="w-100 is-white">
          <Container>
            <section className="introduce">
              <Row>
                <Col md={6}>
                  <h2
                    className="text-shblue mt-5 mb-3"
                    style={{ fontWeight: "800", fontSize: "2.5rem" }}
                  >
                    {" "}
                    Who We Are{" "}
                  </h2>
                  <p className="mb-5 text-shblue">
                    {" "}
                    Smart Hub is a new and exciting STEM-based virtual learning
                    platform for elementary school children. We provide children
                    with simplified course materials to help them gain real-life
                    experience and hands-on learning. Smart Hub makes online
                    learning fun and accessible by providing flexible learning
                    opportunities, engaging lessons and kid-friendly STEM
                    material. Our courses are developed and reviewed by Ontario
                    College of Teachers (OCT) certified teachers and will aid
                    your child in learning complex STEM materials in a
                    simplified manner.{" "}
                  </p>

                  <div
                    data-aos="fade-up"
                    className=" d-flex justify-content-center"
                  >
                    <Link to="/meet-the-team">
                      <Button className="px-4 py-2 mb-5" bsPrefix="button-sh">
                        {" "}
                        Meet Our Team{" "}
                      </Button>
                    </Link>
                  </div>
                </Col>
                <Col md={6}>
                  <div
                    className="p-3 is-shblue my-4"
                    style={{
                      borderRadius: "2rem",
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                    }}
                  >
                    <Player playsInline src="../intro_video.mp4">
                      <BigPlayButton position="center" />
                      <LoadingSpinner />
                    </Player>
                  </div>
                </Col>
              </Row>
            </section>
          </Container>
        </div>
        <section className="value-section">
          <Container className="value-container py-5">
            <h2
              className="text-white text-center mt-2 mb-5"
              style={{ fontWeight: "800", fontSize: "3rem" }}
            >
              {" "}
              Our Focus{" "}
            </h2>
            <Row className="justify-content-center">
              <Col lg={4} md={6}>
                <Card data-aos="fade-right">
                  <Card.Title> Engaging Content </Card.Title>
                  {/* <EmojiHeartEyes className="w-100 justify-content-center my-2" size={70} /> */}
                  <div className="d-flex justify-content-center">
                    <img
                      className="focus-icon my-2"
                      src="../about-ani/fun-engaging.gif"
                      alt="icon"
                    />
                  </div>
                  <Card.Body>
                    The key problem with online learning is the lack of focus.
                    However, our instructors tackle this issue by teaching STEM
                    concepts that initiate children's curiosity to enhance
                    learning.
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card data-aos="fade-left">
                  <Card.Title> Accountability </Card.Title>
                  {/* <Alarm className="w-100 justify-content-center my-2" size={70} /> */}
                  <div className="d-flex justify-content-center">
                    <img
                      className="focus-icon my-2"
                      src="../about-ani/accountability.gif"
                      alt="icon"
                    />
                  </div>

                  <Card.Body>
                    Smart Hub values accountability and sends detailed
                    notifications to parents and teachers about their student’s
                    progress.
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card data-aos="fade-right">
                  <Card.Title> Hands On Learning </Card.Title>
                  <div className="d-flex justify-content-center">
                    <img
                      className="focus-icon my-2"
                      src="../about-ani/hands-on-learning.gif"
                      alt="icon"
                    />
                  </div>

                  <Card.Body>
                    Knowledge is potential that only becomes power when used.
                    Our courses aren't just videos and articles, we have
                    opportunities for your child to participate in experiential
                    learning and gain real-life knowledge.
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="row2">
              <Col className="d-flex justify-content-end" lg={6} md={6}>
                <Card data-aos="fade-right" className="me-5">
                  <Card.Title> Experienced Instructors </Card.Title>
                  <div className="d-flex justify-content-center">
                    <img
                      className="focus-icon w-50 my-2"
                      src="../about-ani/exp-instructor.gif"
                      alt="icon"
                    />
                  </div>

                  <Card.Body>
                    Our instructors are highly specialized in education: every
                    course is reviewed by Ontario College of Teachers (OCT)
                    certified teachers.
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} md={6}>
                <Card data-aos="fade-left" className="ms-5">
                  <Card.Title> Life Lessons </Card.Title>
                  <div className="d-flex justify-content-center">
                    <img
                      className="focus-icon my-2 w-50"
                      src="../about-ani/success.gif"
                      alt="icon"
                    />
                  </div>

                  <Card.Body>
                    We teach our students not only about STEM, but how to
                    independently learn and apply complex STEM materials. We
                    equip them with not only knowledge about the subject, but we
                    also spark curiosity and prepare them to learn independently
                    allowing them to thrive
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        {/* <section className="st-meet-team py-5">
          <h2 className="ms-5" style={{ fontWeight: "800", fontSize: "2.5rem" }}>
            {" "}
            Curious About How We Look?{" "}
            <Link className="text-shblue" to="/meet-the-team">
              Click Here
            </Link>
          </h2>
        </section> */}

        <div className="d-flex justify-content-evenly align-items-end is-white">
          <img className="meet-us-img ms-5" src="../members/nayaab.png" />
          <img className="meet-us-img me-5" src="../members/aaliyah.png" />
        </div>

        <div className=" py-3 d-flex justify-content-center is-white">
          <Link to="/meet-the-team">
            <Button
              style={{ padding: "0 15rem", fontSize: "3rem" }}
              bsPrefix="button-sh"
            >
              {" "}
              Meet Our Team{" "}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
