import React, { useEffect } from "react";
import { Accordion, Card, Container, Row, Col } from "react-bootstrap";
import AOS from "aos";
import { Player, BigPlayButton } from "video-react";
import { Arrow90degDown } from "react-bootstrap-icons";

export default function ParentFAQ() {
  // const [clicked, setClicked] = useState([false, false, false]);
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: "900",
    });
  });

  var faq = [
    {
      question: "1. Is online learning a good way for my child to learn?",
      answer:
        "Online learning is a great way for children to learn. It is here to stay and it is changing the way students learn. Smart Hub is a new and exciting platform that makes online learning fun and accessible by providing flexible learning opportunities, engaging lessons and kid-friendly STEM material. ",
    },
    {
      question:
        "2. How can we be sure that Smart Hub is credible and safe?/Who designs Smart Hub courses?",
      answer:
        "Every course provided on Smart Hub is developed and reviewed by Ontario College of Teachers (OCT) certified teachers. You can be sure that your child is learning from new, engaging, top-quality educational resources from accredited teachers in Ontario.",
    },
    {
      question:
        " 3. What courses does Smart Hub provide and how can they benefit my child? ",
      answer:
        "We offer new, exciting STEM-based course material anywhere from robotics to software engineering, as well as biomedical engineering, quantum computing and more. We break down these complex subjects into fun, understandable and step-by-step content that is fit for young children to understand! ",
    },
    {
      question: " 4. What grades are suitable for Smart Hub courses?",
      answer:
        "Our courses are designed for students in grades 1-8, although the course content is useful for all ages!",
    },
    {
      question: "5. How can we pay for Smart Hub courses?",
      answer: "Secure payment using PayPal is available at checkout!",
    },
    {
      question: "6. What do I do if I forget my username or password?",
      answer:
        "Simply press the “Login” button and then press “Forgot Password” to reset your password",
    },
    {
      question: "7. How can I enroll in Smart Hub courses?",
      answer:
        "Click on the “Courses” tab, and then select the course you wish to purchase. Add the course to your cart and then checkout and the course content will be available to you.",
    },
    {
      question: "8. How much time do I have before the course expires?",
      answer:
        "The Course never expires. You have a life-time access to the course as well as the completion certificate.",
    },

    // {
    //   question: "",
    //   answer: ""

    // },
  ];
  // console.log(clicked);
  // async function handleClick(e) {
  //   var selected = await parseInt(e.target.id);

  //   // console.log(bool);

  //   console.log(clicked[0]);
  //   if (!clicked[selected]) {
  //     setClicked(true);
  //   } else {
  //     setClicked(false);
  //   }
  // }

  return (
    <div id="faq">
      {/* <section className="background-video-container">
        <video className="w-100 p-5 rounder" src="../student-videos/alena.mp4" autoPlay loop />
        <div className="text-center">
          <h1 className="text-white mt-4">Parent FAQ</h1>
          <p className="text-white">Welcome!</p>
        </div>
      </section> */}

      <section className="">
        <div className="text-center">
          <h1 className="heading-text text-shblue mt-4">Welcome, Parents</h1>
          <p className="text-shblue">We have some questions for you.</p>
        </div>
      </section>

      <section className="st-intro text-center">
        <Container className="mt-5">
          <Row data-aos="fade-in">
            <Col>
              <video
                className="w-100 p-3 is-shblue rounded-more"
                src="../parent-faq.mp4"
                controls
              />
              {/* <Player src="../parent-faq.mp4" className="" fluid={false}>
                <BigPlayButton position="center" />
              </Player> */}
            </Col>

            <Col>
              <h1 className="mt-3 text-shblue">Introduction for Parents</h1>

              <p className="text-shblue">
                Our world is a tech-full universe of robotics, engines,
                machines, systems, code and more. It's essential for young
                children to learn about these various STEM innovations as early
                as possible so that children know how to be responsible with
                STEM innovations. Our courses teach about various topics of
                interest, the dangers and risks as well as benefits of using
                these, and ethical ways to work with STEM innovation.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="text-center">
        <div className="is-shblue shblue-container py-5 mt-5">
          <Container>
            <Row data-aos="fade-right">
              <Col>
                <video
                  className="w-100 p-3 is-white rounded-more"
                  src="../student-videos/kampus.mp4"
                  autoPlay
                  loop
                />
              </Col>
              <Col>
                <h1 className="text-white mt-4">
                  {" "}
                  Is STEM Right For Your Child?{" "}
                </h1>
                <p className="text-white">
                  {" "}
                  We have variety of different STEM courses. Your child could be
                  exposed into various STEM fields, and might find their
                  interest in their early age.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="mt-5">
          <Row data-aos="fade-left">
            <Col>
              <h1 className="mt-3 text-shblue">
                {" "}
                Tired Of Answering Your Child's Continous 'Why' Questions?{" "}
              </h1>
              <p className="text-shblue">
                {" "}
                We got you. Your child's curiosity is what makes our world
                continously improve. We would never let that valuable curiosity
                go away. So, we want to lead your child, and explore their
                questions together.
              </p>
            </Col>
            <Col>
              <video
                className="w-100 p-3 is-shblue rounded-more"
                src="../student-videos/alena.mp4"
                autoPlay
                loop
              />
            </Col>
          </Row>
        </Container>

        <div className="is-shblue shblue-container py-5 mt-5">
          <Container>
            <Row data-aos="fade-right">
              <Col>
                <video
                  className="w-100 p-3 is-white rounded-more"
                  src="../student-videos/pavel.mp4"
                  autoPlay
                  loop
                />
              </Col>
              <Col>
                <h1 className="text-white mt-4">
                  {" "}
                  Don't Buy Into Online Learning?{" "}
                </h1>
                <p className="text-white">
                  {" "}
                  Smart Hub makes online learning fun and exciting for all
                  children! Your child will spend most of their time on making
                  or experimenting something rather than seating, and reading
                  some article.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="mt-5">
          <Row data-aos="fade-left">
            <Col>
              <h1 className="mt-3 text-shblue">
                Your Child Doesn't Seems to Be Interested In STEM?
              </h1>
              <p className="text-shblue">
                {" "}
                It could be a misconception, or your child probably didn't
                understood concepts. Smart Hub allows your child to explore the
                how things work through easy-to-understand learning materials.
              </p>
            </Col>
            <Col>
              <video
                className="w-100 p-3 is-shblue rounded-more"
                src="../student-videos/tablet.mp4"
                autoPlay
                loop
              />
            </Col>
          </Row>
        </Container>
      </section>

      <div className="is-white py-5">
        <Container style={{ maxWidth: "65%" }}>
          <h1 className="text-shblue text-center mb-5"> Parent FAQ </h1>
          <Accordion defaultActiveKey="0">
            <div className="accordion-container is-shblue">
              {faq.map((content, index) => {
                return (
                  <Card style={{ backgroundColor: "none" }} className="my-3">
                    <Card.Header
                      className="d-flex justify-content-between"
                      style={{ border: "none" }}
                    >
                      <Accordion.Toggle
                        bsPrefix="sh-link"
                        eventKey={index + 1}
                        className="w-100 text-start"
                      >
                        <Arrow90degDown
                          className="d-inline float-end"
                          color="white"
                          size={20}
                        />

                        <h2
                          className="text-white"
                          style={{ fontSize: "1.3rem", fontWeight: "600" }}
                        >
                          {content.question}
                        </h2>
                      </Accordion.Toggle>

                      {/* {clicked[0] ? (
                        <ArrowUpSquareFill size={30} />
                      ) : (
                        <ArrowDownSquareFill size={30} />
                      )} */}
                    </Card.Header>
                    <Accordion.Collapse eventKey={index + 1}>
                      <Card.Body className="text-white">
                        {" "}
                        {content.answer}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
            </div>
          </Accordion>
        </Container>
      </div>
    </div>
  );
}
