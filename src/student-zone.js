import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import STEMExplained from "./student-zone-components/STEMExplained";
import AwesomeSTEM from "./student-zone-components/AwesomeSTEM";

export default function StudentZone() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [yesBtn, setYesBtn] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function hanldeYesBtn() {
    setYesBtn(true);
  }

  // Create the  bool variables using state function
  // Then, use modal to create the STEM explaining video
  // How can I add trasition animations between two pages?
  // Then, for yes button, lead to the full screen paranoma, u know the boostrap thing full screen with awesome vidoes
  //

  return (
    <div id="student-page" style={{ flexDirection: "column" }}>
      {yesBtn ? (
        <AwesomeSTEM />
      ) : (
        <div className="d-flex text-center mb-5">
          <h1 className="heading-text my-5 text-shblue">
            {" "}
            Hey!!! Do You Know What Is The STEM?{" "}
          </h1>
          <p className="text-shblue mb-5">
            STEM stands for Science Technology Engineering Mathematics.
          </p>
          {/* <video
          muted
          autoPlay
          loop
          src="https://www.youtube.com/watch?v=5GWhwUN9iaY"
        /> */}
          <div>
            <Button
              bsPrefix="button-sh d-inline mx-5 px-5"
              onClick={hanldeYesBtn}
            >
              Yes!
            </Button>
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
              <Modal.Header variant="success">
                <Modal.Title className="text-shblue">
                  {" "}
                  Don't worry. We got you.{" "}
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
      )}
    </div>
  );
}
