import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Alarm, PersonCheck, EmojiHeartEyes } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { faChild, faHandsWash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Player, BigPlayButton, LoadingSpinner } from "video-react";

export default function About() {
  return (
    <div id="about-us">
      <section
        className="top-catcher"
        style={{ backgroundImage: "url(../Shapes_3.gif)" }}
      >
        <h1 style={{ marginTop: "10rem", fontSize: "3rem", width: "70%" }}>
          {" "}
          SmartHub is Our Solution To One Of The Educational Problem{" "}
        </h1>
      </section>
      <div className="w-100 is-white">
        <Container>
          <section className="introduce">
            <Row>
              <Col md={6}>
                <h2
                  className="text-shblue mt-5 mb-3"
                  style={{ fontWeight: "800" }}
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
                  material. Our c ourses are developed and reviewed by Ontario
                  College of Teachers (OCT) certified teachers and will aid your
                  child in learning complex STEM materials in a simplified
                  manner.{" "}
                </p>
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
          <h2 className="text-white mt-2 mb-5" style={{ fontWeight: "800" }}>
            {" "}
            What We Focus{" "}
          </h2>
          <Row>
            <Col lg={4} md={6}>
              <Card>
                <Card.Title> Engaging Contents </Card.Title>
                <EmojiHeartEyes
                  className="w-100 justify-content-center my-2"
                  size={70}
                />
                <Card.Body>
                  {" "}
                  One of the problems with virtual learning was the lack of the
                  focus. However, our instructors only teaches very interesting
                  STEM concepts that will initiate child's curiousity{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card>
                <Card.Title> Accountability </Card.Title>
                <Alarm
                  className="w-100 justify-content-center my-2"
                  size={70}
                />
                <Card.Body>
                  {" "}
                  One of the problems of online courses is that there's no
                  Accountability. However, we send notification to parents
                  detailed about child's progress, making the course accountable{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card>
                <Card.Title> Hands on learning </Card.Title>

                {/* <Book className="w-100 justify-content-center my-2" size={70} /> */}
                <FontAwesomeIcon
                  className="w-100 justify-content-center my-2"
                  icon={faHandsWash}
                  size="5x"
                />

                <Card.Body>
                  {" "}
                  Knowledge is only potential, it becomes power when we use it.
                  So, our courses aren't just videos, and articles, we have
                  tutorials for child to do some experiments, and gain real-life
                  experience{" "}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="row2">
            <Col className="d-flex justify-content-end" lg={6} md={6}>
              <Card className="me-5">
                <Card.Title> Experienced Instructors </Card.Title>{" "}
                <PersonCheck
                  className="w-100 justify-content-center my-2"
                  size={70}
                />
                <Card.Body>
                  {" "}
                  Our instructors are highly specialized people in child's
                  education.{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={6}>
              <Card className="ms-5">
                <Card.Title> Life Lessons </Card.Title>
                <FontAwesomeIcon
                  className="w-100 justify-content-center my-2"
                  icon={faChild}
                  size="5x"
                />
                <Card.Body>
                  {" "}
                  We also teach our students, not only about STEM but how to
                  independantly learn STEM knowledge to themselves and how to
                  thrive with the knowledge later in future!{" "}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="st-meet-team py-5">
        <h2 className="ms-5" style={{ fontWeight: "800", fontSize: "2.5rem" }}>
          {" "}
          Curious About How We Look?{" "}
          <Link className="text-shblue" to="/meet-the-team">
            Click Here
          </Link>
        </h2>
      </section>
    </div>
  );
}
