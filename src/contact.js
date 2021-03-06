import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { PhoneVibrate } from "react-bootstrap-icons";

// breakdown this page
// set up the layout
// figure out how to employ the layout

export default function Contact() {
  return (
    <Container
      id="contact"
      className="text-left mb-5"
      style={{
        width: "60%",
      }}
    >
      <div>
        <h1 className="heading-text">Contact Us</h1>
        <hr />
      </div>
      {/* Message part start  */}
      <h2 className="text-shblue" style={{ fontWeight: "600" }}>
        {" "}
        Send us a Message{" "}
      </h2>

      <p>
        {" "}
        When you send your email, please indicate the brief topic of your query
        in the subject line.
        {/* <br /> We take emails from 8 am to 3 pm. <br /> Mail us to{" "} */}
        <br />
        <a href="mailTo:smarthub@onamap.ca"> Email us here </a>
      </p>

      {/* Call part start */}

      <h2 className="text-shblue" style={{ fontWeight: "600" }}>
        {" "}
        Call us{" "}
      </h2>
      {/* <p>Our phone service is open </p> */}
      <Row>
        <Col xs={1}>
          <PhoneVibrate size={100}> </PhoneVibrate>
        </Col>
        <Col xs={10} className="ps-5">
          <p style={{ display: "inline", fontSize: "1.5rem" }}>
            {" "}
            Canada (+1) <br />
            437-886-6354{" "}
          </p>
        </Col>
      </Row>
      <p> We are ready for your call.</p>

      {/* Intructor contact start */}

      <h2 className="text-shblue"> Contact your instructor </h2>

      <p> Your instructor will be available during your course. </p>
      <p> Please consult course information to contact instructors. </p>

      <h2 className="text-shblue"> Company Information </h2>

      <a href=""> About Design Chêne Ouest Inc. </a>

      <p></p>

      {/* <Form action="mailTo:smarthubteam@onamap.ca">
        <Row>
          <Col xs={6}>
            <Form.Group>
              <Form.Label className="my-4 label-text">
                Name
              </Form.Label>

              <Form.Control
                className="input"
                type="text"
                placeHolder="type your name"
                required
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label className="my-4 label-text">
                Last Name
              </Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="type your last name"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <Form.Group>
              <Form.Label className="my-4 label-text">
                Phone Number
              </Form.Label>

              <Form.Control
                className="input"
                type="tel"
                placeHolder="type your phone number"
                required
              />
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group>
              <Form.Label className="my-4 label-text">
                Email
              </Form.Label>
              <Form.Control
                className="input"
                type="email"
                placeholder="type your email"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group className="my-4 label-text">
              <Form.Label>
                Message
              </Form.Label>
              <Form.Control
                className="input"
                as="textarea"
                placeholder="type your message here"
                style={{
                  height: "12rem",
                }}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Button
            size="lg"
            as="input"
            type="submit"
            value="Send"
            className="px-5"
          />
        </Form.Group>
      </Form>*/}
    </Container>
  );
}
