import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Bullseye } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <section
        className="top-catcher"
        style={{ backgroundImage: "url(../Shapes_3.gif)" }}
      >
        <h1> SmartHub is Our Solution To One Of The Educational Problem </h1>
      </section>
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
              <p className="mb-5">
                {" "}
                Smart Hub is a new and exciting STEM-based virtual learning
                platform for elementary school children. We provide children
                with simplified course materials to help them gain real-life
                experience and hands-on learning. Smart Hub makes online
                learning fun and accessible by providing flexible learning
                opportunities, engaging lessons and kid-friendly STEM material.
                Our c ourses are developed and reviewed by Ontario College of
                Teachers (OCT) certified teachers and will aid your child in
                learning complex STEM materials in a simplified manner.{" "}
              </p>
            </Col>
            <Col md={6}>{/* insert video below */}</Col>
          </Row>
        </section>
      </Container>

      <section className="value-section">
        <Container className="value-container py-5">
          <h2 className="text-white mt-2 mb-5" style={{ fontWeight: "800" }}>
            {" "}
            What We Value{" "}
          </h2>
          <Row>
            <Col lg={4} md={6}>
              <Card>
                <Card.Title style={{ color: "black" }}> Value 1 </Card.Title>
                <Card.Img>{/* put icon here */}</Card.Img>
                <Card.Body>explanation about body</Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card>
                <Card.Title> Value 1 </Card.Title>
                <Card.Img>{/* put icon here */}</Card.Img>
                <Card.Body>explanation about body</Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card>
                <Card.Title> Value 1 </Card.Title>
                <Card.Img>{/* put icon here */}</Card.Img>
                <Card.Body>explanation about body</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="row2">
            <Col className="d-flex justify-content-end" lg={6} md={6}>
              <Card className="me-5">
                <Card.Title> Value 1 </Card.Title>
                <Card.Img>{/* put icon here */}</Card.Img>
                <Card.Body>explanation about body</Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={6}>
              <Card className="ms-5">
                <Card.Title> Value 1 </Card.Title>
                <Card.Img>{/* put icon here */}</Card.Img>
                <Card.Body>explanation about body</Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="st-meet-team py-5">
        <h2 className="ms-5" style={{ fontWeight: "800" }}>
          {" "}
          Meet Our Team{" "}
          <Link className="text-shblue" to="/meet-the-team">
            Here
          </Link>
        </h2>
      </section>
    </div>
  );
}
