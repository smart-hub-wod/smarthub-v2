import React from "react";
import { Nav, Container, Row, Col, Button } from "react-bootstrap";
import {
  Youtube,
  MusicNote,
  Instagram,
  Linkedin,
  EmojiSmileFill,
  EmojiFrownFill,
  EmojiNeutralFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
// import { useAuth } from "./contexts/AuthContext.js";
import logo from "./assets/smarthub-logo.png";
import { InstagramMedia } from "react-instagram-media";

import InstagramEmbed from "react-instagram-embed";

export default function Footer() {
  // const { currentUser } = useAuth();

  // function handleRating(e) {
  //   console.log(e.target.id);
  // }

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
          <Col md={4}>
            <img className="logo" src={logo} alt="logo" />

            <h2 className="mt-3"> Site Links: </h2>
            {/* <div className="d-flex justify-content-center"> */}
            {/* <Row className="mt-3 ms-1"> */}
            {/* <Col className="mt-3 ms-1" md={6}> */}
            {/* <Nav.Link className="nav-text mx-3">
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
                    <div>Parent </div>
                  </Link>
                </Nav.Link> */}
            <div
              className="d-flex  mt-3 ms-1"
              style={{ flexDirection: "column" }}
            >
              <Nav.Link className="nav-text mx-3">
                <Link className="link" to="/meet-the-team">
                  <div> Meet The Team </div>
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
            </div>
            {/* </Col> */}
            {/* </Row> */}
            {/* {currentUser && (
              <>
                <h2 className="mt-4">Enjoying Smart Hub so far?</h2>
                <Button bsPrefix="rating-button" onClick={handleRating} id="happy">
                  <p>
                    <EmojiSmileFill color="white" size={30} />
                  </p>
                </Button>
                <Button bsPrefix="rating-button" onClick={handleRating} id="neutral">
                  <EmojiNeutralFill color="white" size={30} />
                </Button>
                <Button bsPrefix="rating-button" onClick={handleRating} id="sad">
                  <EmojiFrownFill color="white" size={30} />
                </Button>
              </>
            )} */}
          </Col>
          <Col md={4} style={{ marginTop: "6.8rem" }}>
            <h2 className="text-white"> Follow Us: </h2>
            <div className="d-flex justify-content-start mt-3 mb-5">
              <div className=" px-2 mx-2">
                <a href="https://www.facebook.com/">
                  <Youtube color="white" size={40} />
                </a>
              </div>
              <div className="px-2 mx-1">
                <a href="https://www.instagram.com/gosmarthub" target="_blank">
                  <Instagram color="white" size={40} />
                </a>
              </div>
              <div className="px-2 mx-1">
                <a href="https://www.linkedin.com/">
                  <Linkedin color="white" size={40} />
                </a>
              </div>
              <div className="px-2 mx-1">
                <a href="https://www.linkedin.com/">
                  <MusicNote color="white" size={40} />
                </a>
              </div>
            </div>
            {/* <h2 style={{ marginTop: "0" }}>
                {" "}
                Please Give Us Your Feedback!{" "}
              </h2>
              <Button className="button-sh mt-3"> Evaluate Smarthub</Button> */}
          </Col>
          {/* https://www.instagram.com/p/CSz1MWtppXR/?utm_source=ig_web_copy_link */}
          <Col md={4} style={{ marginTop: "0" }}>
            <h2 style={{ marginTop: "6.8rem" }}>
              {" "}
              Please Give Us Your Feedback!{" "}
            </h2>
            <Button
              as="a"
              className="button-sh mt-3"
              href="https://docs.google.com/forms/d/e/1FAIpQLSee2cAFIDLC1imcwFBu4Ib7WuZqSGjzVhaycXzfnGVk6MmnGQ/viewform?usp=pp_url"
              target="_blank"
            >
              {" "}
              Evaluate Smarthub
            </Button>

            {/* <InstagramEmbed
                url="https://instagr.am/p/Zw9o4/"
                maxWidth={500}
                hideCaption={true}
                containerTagName="div"
                protocol=""
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {
                  return <p> posting failed</p>;
                }}
              /> */}
            {/* <InstagramMedia
                uri="https://www.instagram.com/p/B866lKJgReK/"
                renderItem={({ display_url, video_url, type, caption }) => {
                  if (type === "video") {
                    return (
                      <video poster={display_url} controls>
                        <source src={video_url} type="video/mp4" />
                      </video>
                    );
                  }
                  return <img src={display_url} alt={caption} />;
                }}
                renderMediaList={(children) => (
                  <div className="swiper">{children}</div>
                )}
                renderError={() => <div>I have failed to parse it</div>}
                renderLoading={() => <div>Loading</div>}
              /> */}
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
          <p>
            Copyright ©2021 SmartHub by Design Chêne Ouest Inc. | All rights
            reserved
          </p>
          <p>
            {" "}
            View{" "}
            <Link to="./terms-and-conditions">
              {" "}
              Policies, Terms & Conditions
            </Link>{" "}
          </p>
        </div>
      </Container>
    </footer>
  );
}
