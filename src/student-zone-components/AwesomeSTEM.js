import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Player, BigPlayButton } from "video-react";

export default function AwesomeSTEM() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     document
  //       .getElementById("student-zone-header")
  //       .setAttribute("className", "appear");
  //   }, 5000);
  // }, []);

  function handleClick() {}
  return (
    <div id="stem-carousel">
      <h1
        id="student-zone-header"
        className="text-center text-shblue"
        onClick={handleClick}
      >
        {" "}
        Watch these awesome videos to see how the STEM is used in our real life!{" "}
      </h1>
      {/* prevent auto scrolling
       add subtitle
       use <Player> or what?
       adjust the size of the scrolling carousel button
        */}
      <Carousel className="carousel">
        <Carousel.Item>
          <iframe
            className="carousel"
            src={`https://www.youtube.com/embed/5GWhwUN9iaY`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Carousel.Caption style={{ color: "black" }}>
            <h3>Nanotechnology</h3>
            <p>Above is the use of nanotechnology Cool eh?</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <iframe
            className="carousel"
            src={`https://www.youtube.com/embed/5GWhwUN9iaY`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <Carousel.Caption style={{ color: "black" }}>
            <h3>Mechanical Engineering </h3>
            <p>
              {" "}
              Above is the use of Mechanical Engineering in life. Above
              technology is called ....
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <iframe
            className="carousel"
            src={`https://www.youtube.com/embed/5GWhwUN9iaY`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <Carousel.Caption style={{ color: "black" }}>
            <h3> Artificial Intelligence </h3>
            <p>
              Currently, A.I is developed to the point where we can have an
              actual person who is computer.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
