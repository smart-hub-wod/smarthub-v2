import React, { useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Player, BigPlayButton } from "video-react";

export default function AwesomeSTEM() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     document
  //       .getElementById("student-zone-header")
  //       .setAttribute("className", "appear");
  //   }, 5000);
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="stem-carousel">
      {/* <h1
        id="student-zone-header"
        className="text-center text-shblue"
      >
        {" "}
        Watch these awesome videos to see how the STEM is used in our real life!{" "}
      </h1> */}
      {/* prevent auto scrolling
       add subtitle
       use <Player> or what?
       adjust the size of the scrolling carousel button
        */}
      <Carousel className="carousel">
        <Carousel.Item>
          {/* <iframe
            className="carousel"
            src={`https://www.youtube.com/embed/5GWhwUN9iaY`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          {/* <Player src="../stem-videos/mechanic-eng.mp4" autoPlay loop muted>
            <BigPlayButton position="top" />
          </Player> */}

          <video
            className="stem-video"
            controls
            src="../stem-videos/mechanic-eng.mp4"
            autoPlay
          />

          <Carousel.Caption>
            <h3>Robotics </h3>
            <p> You can also create robots, by taking robotics course. </p>
            <div className="" style={{ margin: "" }}>
              <Link to="/courses">
                <Button bsPrefix="button-sh" className="mt-4">
                  View Courses
                </Button>
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <iframe
            className="carousel"
            src={`https://www.youtube.com/embed/5GWhwUN9iaY`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}

          {/* <Player src="../stem-videos/system-eng.mp4" autoPlay loop muted>
            <BigPlayButton position="top" />
          </Player> */}

          <video
            className="stem-video"
            controls
            src="../stem-videos/ai.mp4"
            autoPlay
          />

          <Carousel.Caption>
            <h3> Altificial Intelligence </h3>
            <p>
              {" "}
              Computer can think, move, and be completely like a human. Don't
              you want to learn more about it?
            </p>
            <div className="" style={{ margin: "" }}>
              <Link to="/courses">
                <Button bsPrefix="button-sh" className="mt-4">
                  View Courses
                </Button>
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <video
            className="stem-video"
            controls
            src="../stem-videos/aerospace-eng.mp4"
            autoPlay
          />
          {/* <iframe
            className="carousel"
            src={`https://www.youtube.com/embed/5GWhwUN9iaY`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}

          {/* <Player className="" src="../stem-videos/aerospace-eng.mp4" autoPlay loop muted>
            <BigPlayButton position="top" />
          </Player> */}

          <Carousel.Caption>
            <h3> Aerospace Engineering </h3>
            <p>
              We created amazing satellite that could travel nearly 54.6 million
              kilometers away from the Earth.
            </p>
            <div className="" style={{ margin: "" }}>
              <Link to="/courses">
                <Button bsPrefix="button-sh" className="mt-4">
                  View Courses
                </Button>
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
