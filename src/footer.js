import React from "react";
import { Nav, Container, Row, Col, Button } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import logo from "./assets/smarthub-logo.png";
import { InstagramMedia } from "react-instagram-media";

export default function Footer() {
  return (
    <footer id="footer">
      {/* <Container fluid className="is-shblue">
        
      </Container> */}
      <Container
        fluid
        // className="is-shblue text-white d-flex row justify-content-center py-3 position-sticky bottom-0 end-0 text-center mt-5"
        className="is-shblue text-white position-sticky bottom-0 end-0 pt-5"
      >
        <Row className="" style={{ margin: "0 5rem" }}>
          <Col xs={4}>
            <img className="logo" src={logo} alt="logo" />

            <h2 className="mt-3"> Links: </h2>
            {/* <div className="d-flex justify-content-center"> */}
            <Row className="mt-3 ms-1">
              <Col>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/">
                    <div>Home</div>
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/about">
                    <div>About</div>
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/courses">
                    <div>Courses</div>
                  </Link>
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link className="nav-text mx-3">
                  <Link to="/parent-faq" className="link">
                    <div>Parent Zone</div>
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/contact-us">
                    <div>Contact Us</div>
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-text mx-3">
                  <Link className="link" to="/terms-and-conditions">
                    <div>Terms and Conditions</div>
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
            <h2 style={{ marginTop: "6.8rem" }}> Subscribe Smarthub News Letter: </h2>
            <Button className="button-sh mt-3"> Smarthub News Letter</Button>
          </Col>
          {/* https://www.instagram.com/p/CSz1MWtppXR/?utm_source=ig_web_copy_link */}
          <Col xs={4}>
            {/* <InstagramMedia
              // uri="https://www.instagram.com/p/CSz1MWtppXR/"
              uri="https://www.instagram.com/p/B866lKJgReK/"
              renderItem={(mediaProps) => {
                console.log(mediaProps);
                return (
                  <img src={mediaProps.display_url} alt={mediaProps.caption} />
                );
              }}
              renderMediaList={(props) => {
                console.log(props);
              }}
              renderError={(error) => {
                console.log(error);
                return <div>there's render error</div>;
              }}
              renderLoading={() => {
                return <div> Smarthub instagram feed is loading </div>;
              }}
            /> */}
          </Col>
        </Row>

        <div className="text-center mt-5 pb-4" style={{ margin: "0 auto" }}>
          <p>© West Oak Design Inc. | All rights reserved</p>
          <p className="iconstext text-light">
            Animated Icons by{" "}
            <a className="text-white" href="https://lordicon.com" target="_blank" rel="noopener noreferrer">
              Lordicon.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
