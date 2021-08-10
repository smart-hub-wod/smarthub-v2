
// 5. map thru the obj and fill in the tag properties for instructor and team member
// 6. fix animation


import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {} from "react-bootstrap-icons";

function MeetTeam() {
  // Here add instructor into the array that contains the objects use it for adding instructor
  var [instructor, setInstructor] = useState([
    {
      name: "Omar Murju",
      intro:
        "Lorem iscelerisque fermentum duiaucibuselis donec et se in. Lacinia quis vel eros donec ac odio tempor orci. Pelleaucibuselis donec et se in. Lacinia quis vel eros donec ac odio tempor orci. Pelle faucibuselis donec et se in. Lacinia quis vel eros donec ac odio tempor orci. Pellentesque sit amet porttitor eget dolor. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Praesent tristique magna sit amet purus gravida.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim lobortis scelerisque fermentum dui faucibus in ornare quam.",
      profileImg: "../Omar+Murji+Photo+-+Transparent+BG.png",
    },
  ]);

  const members = [
    {
      name: "Junseo Kim",
      team: "Software Internship",
      contribution: "contribution",
      profileImg: "../Omar+Murji+Photo+-+Transparent+BG.png",
    },
    {
      name: "Khloe Ramdhan",
      team: "Software Internship",
      contribution: "contribution",
      profileImg: "../Omar+Murji+Photo+-+Transparent+BG.png",
    },
    {
      name: "Zayan Hussain",
      team: "Smarthub Leader",
      contribution: "contribution",
      profileImg: "../Omar+Murji+Photo+-+Transparent+BG.png",
    },
    {
      name: "Komal",
      team: "Software Internship",
      contribution: "contribution",
      profileImg: "../Omar+Murji+Photo+-+Transparent+BG.png",
    },
    {
      name: "Rachel Zhu",
      team: "Business Development",
      contribution: "contribution",
      profileImg: "../Omar+Murji+Photo+-+Transparent+BG.png",
    },
    {
      name: "Anne Yin",
      team: "Business Development",
      contribution: "contribution",
      profileImg: "../Omar+Murji+Photo+-+Transparent+BG.png",
    },
    {
      name: "Cassidy West",
      team: "Business Development",
      contribution: "contribution",
      profileImg: "../Omar+Murji+Photo+-+Transparent+BG.png",
    },
  ];


  return (
    <div id="meet-team">
      <h1
        className="text-center text-shblue mb-5"
        style={{ marginTop: "5rem" }}
      >
        {" "}
        Meet Our Team{" "}
      </h1>
      <Container>
        <h1 className="text-shblue" style={{ margin: "5rem 0" }}> Our Instructors </h1>
        <Row>
          <Col xs={6}>
            <div className="instructor-container is-shblue p-4">
              <img
                className="instructor-img mb-3"
                src={instructor[0].profileImg}
                alt="a person"
              />
              <h2 className="text-white"> {instructor[0].name} </h2>
              <p className="text-white"> {instructor[0].intro} </p>
            </div>
          </Col>

          <Col xs={6} id="instructor2">
            <div className="instructor-container is-shblue p-4">
              <img
                className="instructor-img mb-3"
                src={instructor[0].profileImg}
                alt="a person"
              />
              <h2 className="text-white"> {instructor[0].name} </h2>
              <p className="text-white"> {instructor[0].intro} </p>
            </div>
          </Col>
        </Row>

        <h1 className="text-shblue" style={{ marginTop: "5rem", marginBottom: "5rem" }}> Our Smarthub Members </h1>
        {/* gotta use some if-statement plus  */}
        <Row>
          <Col lg={3} md={6}>
            <Card
              className="text-center card"
            >
              <Card.Img variant="top" src={members[0].profileImg} />

              <Card.Title
                style={{
                  fontWeight: "600",
                }}
                className="my-2"
              >
                {members[0].name}
              </Card.Title>

              <Card.Text className="mb-2">{members[0].team}</Card.Text>
            </Card>
          </Col>
          <Col lg={3} md={6}>
          <Card
              className="text-center card"
            >
              <Card.Img variant="top" src={members[0].profileImg} />

              <Card.Title
                style={{
                  fontWeight: "600",
                }}
                className="my-2"
              >
                {members[0].name}
              </Card.Title>

              <Card.Text className="mb-2">{members[0].team}</Card.Text>
            </Card>
          </Col>
          <Col lg={3} md={6}>
          <Card
              className="text-center card"
            >
              <Card.Img variant="top" src={members[0].profileImg} />

              <Card.Title
                style={{
                  fontWeight: "600",
                }}
                className="my-2"
              >
                {members[0].name}
              </Card.Title>

              <Card.Text className="mb-2">{members[0].team}</Card.Text>
            </Card>
          </Col>
          <Col lg={3} md={6}>
          <Card
              className="text-center card"
            >
              <Card.Img variant="top" src={members[0].profileImg} />

              <Card.Title
                style={{
                  fontWeight: "600",
                }}
                className="my-2"
              >
                {members[0].name}
              </Card.Title>

              <Card.Text className="mb-2">{members[0].team}</Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MeetTeam;
