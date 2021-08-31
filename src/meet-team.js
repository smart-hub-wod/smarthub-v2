// 5. map thru the obj and fill in the tag properties for instructor and team member
// 6. fix animation

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";

function MeetTeam() {
  // setting default props

  useEffect(() => {
    AOS.init();
    window.scrollTo(0, 0);
  });

  // MeetTeam.defaultProps = {
  //   header: true,
  // };
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
      name: "Zayan Hussain",
      intro:
        "Hi, I’m Zayan, a Computer Science Undergrad at Western University. I am passionate about tackling different problems and learning more about emerging technologies. I am drawn to a high-paced work environment and enjoy building long-lasting professional relationships to expand my network. I'm super entrepreneurial and am always looking to drive impact on every project that I work on.",

      profileImg: "../instructors/zayan.jpg",
    },
    {
      name: " Isabella Liu",
      intro:
        "Isabella has an interest in finance, financial markets and banking. She has supported research on COVID-related impacts to the economy and shares her experiences through several innovative courses that explore the future of finance in Canada.",

      profileImg: "../instructors/isabella.png",
    },
    {
      name: "Aman Hemani",
      intro:
        "Hello, my name is Aman Hemani, and I'm currently a student at McMaster University attending the Health Science program. I am particularly interested in the healthcare and business sector, especially in the application of analytics in healthcare informatics and data science. I am self-motivated and passionate and teach my students about being positive and goal setting,",

      profileImg: "../instructors/aman.jpg",
    },
    {
      name: "Samad Hemani",
      intro:
        "Hello, my name is Samad Hemani, and I'm currently a student at Queen's University attending the Commerce Program actively looking for opportunities to make an impact in the world. I am particularly interested in management consulting, especially in the innovation and growth strategy space. I love solving problems and taking on new challenges.",

      profileImg: "../instructors/samad.png",
    },
    {
      name: "Anila Shawkat",
      intro:
        "Hello there, I am Anila! For as long as I can remember, science, nature, and the human body have fascinated me. To follow my passion, I will begin a Bachelor of Science degree this fall at the University of Manitoba, with the goal of pursuing a career in medicine. I want to do something where I can pursue research, preferably in an interdisciplinary field, and where I find passion and joy. I am curious to see where my scientific career will lead me in the coming years, and I hope that one day I will contribute positively to society.",
      profileImg: "../instructors/anila.png",
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
      team: "Lead Software Engineer",
      contribution: "contribution",
      profileImg: "../members/khloe.png",
    },
    {
      name: "Junseo Kim",
      team: "Lead Software Engineer",
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
      team: "UX Designer",
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
      name: "Cassidy West",
      team: "Business Development Associate",
      contribution: "contribution",
      profileImg: "../members/cassidy.png",
    },
    {
      name: "Anne Yin",
      team: "Business Development Associate",
      contribution: "contribution",
      profileImg: "../members/anne.png",
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
    <div id="meet-team" style={{ backgroundColor: "white" }}>
      <h1
        className="text-center text-shblue mb-5"
        style={{ marginTop: "5rem", fontSize: "3rem", textAlign: "center" }}
      >
        {" "}
        Meet Our Team{" "}
      </h1>

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
                        className="instructor-img"
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
            if (
              member.team.includes("Software Engineer") ||
              member.team === "UX Designer"
            ) {
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
                    <div style={{ backgroundColor: "rgb(133 176 232 / 53%)" }}>
                      <Card.Img
                        className="member-img"
                        variant="top"
                        src={member.profileImg}
                      />
                    </div>

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
        <div className="is-white py-3 d-flex justify-content-center">
          <Link to="/about">
            <Button
              style={{ padding: "0 5rem", fontSize: "3rem" }}
              bsPrefix="button-sh"
            >
              Learn More About Us
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default MeetTeam;
