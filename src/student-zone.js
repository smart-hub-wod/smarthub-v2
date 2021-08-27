import React, { useEffect, useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function StudentZone() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // const [yesBtn, setYesBtn] = useState(false);
  // const [picAni, setPicAni] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function hanldeYesBtn() {
  //   setYesBtn(true);
  // }

  // function oldCityToggle() {
  //   if (picAni === "") {
  //     setPicAni("old-city-ani");
  //   } else {
  //     setPicAni("");
  //   }
  // }

  // async function handlePicture() {
  //   await setTimeout(oldCityToggle(), 3500);
  //   oldCityToggle();
  // }

  // Create the  bool variables using state function
  // Then, use modal to create the STEM explaining video
  // How can I add trasition animations between two pages?
  // Then, for yes button, lead to the full screen paranoma, u know the boostrap thing full screen with awesome vidoes
  //
  // make seperate url, component for the AwesomeSTEM
  return (
    <div id="student-page">
      <div>
        <div className="background-video-container">
          {/* <div className="text-center">
              <h1 className="heading-text text-shblue mt-4">
                Welcome, Students
              </h1>
            </div> */}
          <video
            className="background-video"
            src="../student-videos/online.mp4"
            autoPlay
            loop
          />
          <div className="text-center pt-4">
            <h1 className="heading-text text-white">Welcome, Students</h1>
          </div>
        </div>

        <Container>
          {/* make a class for below div */}
          <div
            className="d-flex text-center mb-5 px-5 pb-5 is-white"
            style={{ flexDirection: "column", borderRadius: "4rem 0 0 0" }}
          >
            <h1 className="heading-text my-5 text-shblue" data-aos="fade-in">
              {" "}
              Hey! Do You Know What STEM is?{" "}
            </h1>
            <p className="text-shblue mb-5" style={{ fontSize: "1.3rem" }}>
              {/* STEM is our future. Without STEM, our world would look like{" "}
                <Button prePrefix="button-sh" onClick={handlePicture}>
                  {" "}
                  This{" "}
                </Button>
                Back to our point, STEM stands for Science Technology Engineering
                Mathematics. We have ideas of how things around us work. Whenever,
                we have ideas, we use it. We use those ideas to solve real-world
                problems. Click "Yes" button See the examples of where we apply the
                ideas in our world! */}
              STEM is the way of the future. Without STEM, our world would be
              lacking in innovation and creativity! Many of the technologies you
              use today and the things you do are possible because of STEM. So
              what is STEM? STEM stands for Science, Technology, Engineering,
              Mathematics. These subjects help us to explore and learn about how
              things around us work. We use what we learn to solve real-world
              problems. Click the "YES" button below to see examples of how we
              apply STEM in our world!
            </p>
            {/* <img src="../old-city.jpg" className={} /> */}
            <h4 className="mb-4 text-shblue"> Do You Know What STEM is?</h4>
            {/* <video
              muted
              autoPlay
              loop
              src="https://www.youtube.com/watch?v=5GWhwUN9iaY"
            /> */}
            <div>
              <Link
                to="/student-zone/awesome-stem"
                style={{ textDecoration: "none" }}
              >
                <Button bsPrefix="button-sh d-inline mx-5 px-5">Yes!</Button>
              </Link>
              <Button
                bsPrefix="button-sh d-inline mx-5 px-5"
                onClick={handleShow}
              >
                No
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                animation={true}
                backdrop="static"
                size="lg"
              >
                <Modal.Header className="is-shblue">
                  <Modal.Title className="text-white">
                    {" "}
                    <strong>Don't worry. Watch Below Video!</strong>{" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <iframe
                    className="w-100"
                    height="400"
                    src={`https://www.youtube.com/embed/5GWhwUN9iaY`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Modal.Body>
                <Modal.Footer>
                  <Button bsPrefix="button-sh" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
