import React, { useEffect } from "react";

export default function StudentZone() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div id="student-page">
      <section className="holder-container">
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
      </section>
    </div>
  );
}
