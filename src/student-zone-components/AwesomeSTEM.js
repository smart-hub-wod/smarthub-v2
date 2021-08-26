import React from "react";
import { Carousel } from "react-bootstrap";
import { Player, BigPlayButton } from "video-react";

export default function AwesomeSTEM() {
  return (
    <div id="stem-carousel">
      <h1>
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
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Player
            playsInline
            src="https://www.youtube.com/watch?v=5GWhwUN9iaY"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Player
            playsInline
            src="https://www.youtube.com/watch?v=5GWhwUN9iaY"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
