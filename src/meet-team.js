// 5. map thru the obj and fill in the tag properties for instructor and team member
// 6. fix animation

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {} from "react-bootstrap-icons";
import AOS from "aos";

function MeetTeam(props) {
  // setting default props

  useEffect(() => {
    AOS.init();
  });

  MeetTeam.defaultProps = {
    header: true,
  };
  // Here add instructor into the array that contains the objects use it for adding instructor
  var [instructors, setInstructors] = useState([
    {
      name: "Aryaan Bhimani",
      intro:
        "I am Aryaan, an 18-year-old student based in Toronto studying at the University of Waterloo with a passion for understanding technology and exploring philosophy. From learning about artificial intelligence, brain-computer interfaces, and even the blockchain, I strive to better understand the world through researching STEM and discussing philosophy.",
      profileImg: "../instructors/aryaan.png",
    },
    {
      name: "Alikhan",
      intro:
        "I am Alikhan Nazarani, I enjoy spending time exploring my passion for artificial intelligence and robotics which I fuse with my business interests to learn more about the applications of these technologies in our fast paced society.",
      profileImg: "../instructors/alikhan.png",
    },
    {
      name: "Anila Shawkat",
      intro: "",
      profileImg: "../instructors/anila.png",
    },
    {
      name: "Zayan Hussain",
      intro:
        "Zayan is a fintech enthusiast who’s really interested in building products that drive impact.",

      profileImg: "../instructors/zayan.jpg",
    },
  ]);

  const members = [
    // {
    //   name: "Zayan Hussain",
    //   team: "Project Lead (SmartHub)",
    //   contribution: "contribution",
    //   profileImg: "../members/zayan.jpg",
    // },
    {
      name: "Khloe Ramdhan",
      team: "Software Engineer",
      contribution: "contribution",
      profileImg: "../members/khloe.png",
    },
    {
      name: "Junseo Kim",
      team: "Software Engineer",
      contribution: "contribution",
      profileImg: "../members/jun.png",
    },
    {
      name: "Komal Vachhani",
      team: "Software Engineer",
      contribution: "contribution",
      profileImg: "../members/komal.png",
    },
    {
      name: "Aaliyah Jaleel",
      team: "Software Engineer",
      contribution: "contribution",
      profileImg: "../members/aaliyah.png",
    },
    {
      name: "Nayaab Ali",
      team: "Software Engineer",
      contribution: "contribution",
      profileImg: "../members/nayaab.png",
    },
    {
      name: "Rachel Zhu",
      team: "Business Development Associate",
      contribution: "contribution",
      profileImg: "../members/rachael.png",
    },
    {
      name: "Anne Yin",
      team: "Business Development Associate",
      contribution: "contribution",
      profileImg: "../members/anne.png",
    },
    {
      name: "Cassidy West",
      team: "Business Development Associate",
      contribution: "contribution",
      profileImg: "../members/cassidy.png",
    },
    // {
    //   name: "Abeer Thayani",
    //   team: "Business Development Associate",
    //   contribution: "contribution",
    //   profileImg: "../members/abeer.png",
    // },
    // {
    //   name: "Carolyn Huang",
    //   team: "Business Development Associate",
    //   contribution: "contribution",
    //   profileImg: "../members/cheng.png",
    // },
    // {
    //   name: "Samad Hemani",
    //   team: "Business Development Associate",
    //   contribution: "contribution",
    //   profileImg: "../members/samad.png",
    // },

    // {
    //   name: "Aryaan",
    //   team: "Business Development Associate",
    //   contribution: "contribution",
    //   profileImg: "../members/aryaan.png",
    // },
  ];

  return (
    <div
      id="meet-team"
      style={{ backgroundColor: "white" }}
      className={props.className}
    >
      {props.header ? (
        <h1
          className="text-center text-shblue mb-5"
          style={{ marginTop: "5rem", fontSize: "3rem", textAlign: "center" }}
        >
          {" "}
          Meet Our Team{" "}
        </h1>
      ) : (
        ""
      )}

      <Container>
        <h1 className="text-shblue" style={{ fontSize: "3rem" }}>
          {" "}
          Our Instructors{" "}
        </h1>
        <Row>
          {/* */}

          {instructors.map((instructor, index) => {
            console.log(typeof index);

            return (
              <>
                {index % 2 === 0 ? (
                  <Col as="div" md={12} className="mt-5 col-j-6">
                    <div
                      data-aos="instructor-spin1"
                      className="instructor-container is-shblue p-4"
                    >
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
                    <div
                      data-aos="instructor-spin2"
                      className="instructor-container is-shblue p-4"
                    >
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
          Our Smarthub Team{" "}
        </h1>

        {/* Each row for diffent team */}
        <Row className="justify-content-center">
          {members.map((member) => {
            if (member.team === "Software Engineer") {
              return (
                <Col lg={2} sm={4}>
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
            }
            return "";
          })}
        </Row>
        <hr
          className="is-white mt-5 mb-3"
          style={{ border: "dashed #0b3f84", borderWidth: "1.3rem 0 0 0" }}
        />
        <Row className="justify-content-center">
          {members.map((member) => {
            if (member.team === "Business Development Associate") {
              return (
                <Col lg={2} sm={4}>
                  <Card className="text-center card mt-5 mb-5">
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
            }
            return "";
          })}
        </Row>
      </Container>
    </div>
  );
}

export default MeetTeam;
