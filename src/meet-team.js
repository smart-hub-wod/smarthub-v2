// 5. map thru the obj and fill in the tag properties for instructor and team member
// 6. fix animation

import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {} from "react-bootstrap-icons";

function MeetTeam() {
  // Here add instructor into the array that contains the objects use it for adding instructor
  var [instructors, setInstructors] = useState([
    {
      name: "Omar Murju",
      intro:
        "Lorem iscelerisque fermentum duiaucibuselis donec et se in. Lacinia quis vel eros donec ac odio tempor orci. Pelleaucibuselis donec et se in. Lacinia quis vel eros donec ac odio tempor orci. Pelle faucibuselis donec et se in. Lacinia quis vel eros donec ac odio tempor orci. Pellentesque sit amet porttitor eget dolor. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Praesent tristique magna sit amet purus gravida.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim lobortis scelerisque fermentum dui faucibus in ornare quam.",
      profileImg: "../Omar+Murji+Photo+-+Transparent+BG.png",
    },
    {
      name: "Alikhan",
      intro:
        "Lorem iscelerisque fermentum duiaucibuselis donec et se in. Lacinia quis vel eros donec ac odio tempor orci. Pelleaucibuselis donec et se in. Lacinia quis vel eros donec ac odio tempor orci. Pelle faucibuselis donec et se in. Lacinia quis vel eros donec ac odio tempor orci. Pellentesque sit amet porttitor eget dolor. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Praesent tristique magna sit amet purus gravida.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim lobortis scelerisque fermentum dui faucibus in ornare quam.",
      profileImg: "../instructors/alikhan.png",
    },
  ]);

  const members = [
    {
      name: "Zayan Hussain",
      team: "Smarthub Leader",
      contribution: "contribution",
      profileImg: "../members/komal.png",
    },
    {
      name: "Khloe Ramdhan",
      team: "Software Internship",
      contribution: "contribution",
      profileImg: "../members/khloe.png",
    },
    {
      name: "Junseo Kim",
      team: "Software Internship",
      contribution: "contribution",
      profileImg: "../members/jun.png",
    },
    {
      name: "Komal Vachhani",
      team: "Software Internship",
      contribution: "contribution",
      profileImg: "../members/komal.png",
    },
    {
      name: "Aaliyah Jaleel",
      team: "Software Internship",
      contribution: "contribution",
      profileImg: "../members/aaliyah.png",
    },
    {
      name: "Nayaab Ali",
      team: "Software Internship",
      contribution: "contribution",
      profileImg: "../members/nayaab.png",
    },
    {
      name: "Rachel Zhu",
      team: "Business Development",
      contribution: "contribution",
      profileImg: "../members/rachael.jpg",
    },
    {
      name: "Anne Yin",
      team: "Business Development",
      contribution: "contribution",
      profileImg: "../members/anne.png",
    },
    {
      name: "Cassidy West",
      team: "Business Development",
      contribution: "contribution",
      profileImg: "../members/cassidy.png",
    },
    // {
    //   name: "Aryaan",
    //   team: "Business Development",
    //   contribution: "contribution",
    //   profileImg: "../members/aryaan.png",
    // },
  ];

  return (
    <div id="meet-team">
      <h1
        className="text-center text-shblue mb-5"
        style={{ marginTop: "5rem", fontSize: "3rem" }}
      >
        {" "}
        Meet Our Team{" "}
      </h1>
      <Container>
        <h1 className="text-shblue" style={{ margin: "5rem 0 0 0" }}>
          {" "}
          Our Instructors{" "}
        </h1>
        <Row>
          {/* */}

          {instructors.map((instructor, index) => {
            console.log(typeof index);

            return (
              <>
                {index == 0 ? (
                  <Col as="div" md={12} className="mt-5 col-j-6">
                    <div className="instructor-container is-shblue p-4">
                      <img
                        className="instructor-img"
                        src={instructor.profileImg}
                        alt="a person"
                      />
                      <h2 className="text-white"> {instructor.name} </h2>
                      <p className="text-white"> {instructor.intro} </p>
                    </div>
                  </Col>
                ) : (
                  <Col
                    as="div"
                    md={12}
                    id="instructor2"
                    className="mt-5 col-j-6"
                  >
                    <div className="instructor-container is-shblue p-4">
                      <img
                        className="instructor-img mb-3"
                        src={instructor.profileImg}
                        alt="Fa person"
                      />
                      <h2 className="text-white"> {instructor.name} </h2>
                      <p className="text-white"> {instructor.intro} </p>
                    </div>
                  </Col>
                )}
              </>
            );
          })}
        </Row>

        <h1
          className="text-shblue"
          style={{ marginTop: "7rem", marginBottom: "5rem" }}
        >
          {" "}
          Our Smarthub Members{" "}
        </h1>

        <Row>
          {members.map((member) => {
            return (
              <Col lg={2} md={3} sm={4}>
                <Card className="text-center card mt-5">
                  <Card.Img
                    className="member-img"
                    variant="top"
                    src={member.profileImg}
                  />

                  <Card.Title
                    style={{
                      fontWeight: "600",
                    }}
                    className="my-2"
                  >
                    {member.name}
                  </Card.Title>

                  <Card.Text className="mb-2">{member.team}</Card.Text>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default MeetTeam;
