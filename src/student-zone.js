import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

export default function StudentZone() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div
      id="student-page"
      className="d-flex align-items-center mb-5"
      style={{ flexDirection: "column" }}
    >
      {/* <section className="holder-container">
        <hr style={{ border: "10px solid white" }} />
        <video className="background-video" style={{ top: "0" }} src="../student-videos/tablet.mp4" autoPlay loop />
        <div className="subtitle-container">
          <h1> Don't you want to have fun as well! </h1>
        </div>
      </section>

      <section className="holder-container">
        <hr style={{ border: "10px solid white" }} />
        <video className="background-video" style={{ zIndex: "-9998", top: "100vh" }} src="../student-videos/kampus.mp4" autoPlay loop />
        <div className="subtitle-container">
          <h1> Don't you want to have fun as well! </h1>
        </div>
      </section>

      <section className="holder-container">
        <hr style={{ border: "10px solid white" }} />
        <video className="background-video" style={{ zIndex: "-9997", top: "200vh" }} src="../student-videos/pavel.mp4" autoPlay loop />
        <div className="subtitle-container">
          <h1> Don't you want to have fun as well! </h1>
        </div>
      </section> */}
      <h1 className="heading-text my-5 text-shblue">
        {" "}
        Hey!!! Do You Know What Is The STEM?{" "}
      </h1>
      <p className="text-shblue mb-5">
        STEM stands for Science Technology Engineering Mathematics.
      </p>
      <div>
        <Button bsPrefix="button-sh d-inline mx-5 px-5">Yes!</Button>
        <Button bsPrefix="button-sh d-inline mx-5 px-5">No</Button>
      </div>
    </div>
  );
}
