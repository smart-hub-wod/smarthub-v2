import React, { useState, useEffect } from "react";
import { Accordion, Card, Container, Row, Col } from "react-bootstrap";
import { ArrowDownSquareFill, ArrowUpSquareFill } from "react-bootstrap-icons";
import AOS from "aos";

export default function ParentFAQ() {
  const [clicked, setClicked] = useState([false, false, false]);
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: "900",
    });
  });

  var faq = [
    {
      question: "Is online learning a good way for my child to learn?",
      answer:
        "Online learning is a great way for children to learn. It is here to stay and it is changing the way students learn. Smart Hub is a new and exciting platform that makes online learning fun and accessible by providing flexible learning opportunities, engaging lessons and kid-friendly STEM material. ",
    },
    {
      question:
        "How can we be sure that Smart Hub is credible and safe?/Who designs Smart Hub courses?",
      answer:
        "Every course provided on Smart Hub is developed and reviewed by Ontario College of Teachers (OCT) certified teachers. You can be sure that your child is learning from new, engaging, top-quality educational resources from accredited teachers in Ontario.",
    },
    {
      question:
        " What courses does Smart Hub provide and how can they benefit my child? ",
      answer:
        "We offer new, exciting STEM-based course material anywhere from robotics to software engineering, as well as biomedical engineering, quantum computing and more. We break down these complex subjects into fun, understandable and step-by-step content that is fit for young children to understand! ",
    },
    {
      question: " What grades are suitable for Smart Hub courses?",
      answer:
        "Our courses are designed for students in grades 1-8, although the course content is useful for all ages!",
    },
    {
      question: "How can we pay for Smart Hub courses?",
      answer: "Secure payment using PayPal is available at checkout!",
    },
    {
      question: "What do I do if I forget my username or password?",
      answer:
        "Simply press the “Login” button and then press “Forgot Password” to reset your password",
    },
    {
      question: "How can I enroll in Smart Hub courses?",
      answer:
        "Click on the “Courses” tab, and then select the course you wish to purchase. Add the course to your cart and then checkout and the course content will be available to you.",
    },
    {
      question: "How much time do I have before the course expires?",
      answer: "Further to be explored",
    },
    {
      question: "What do the courses entail?",
      answer: "Further to be explored",
    },
    // {
    //   question: "",
    //   answer: ""

    // },
  ];
  console.log(clicked);
  async function handleClick(e) {
    var selected = await parseInt(e.target.id);

    // console.log(bool);

    console.log(clicked[0]);
    if (!clicked[selected]) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }

  return (
    <>
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

      <section className="text-center">
        <Container className="mt-5">
          <Row data-aos="slide-left">
            <Col>
              <h1 className="mt-3 text-shblue">
                {" "}
                Is Online Learning Suitable For My Child?{" "}
              </h1>
              <p className="text-shblue">
                {" "}
                Smart Hub makes online learning fun and exciting for all
                children! (currently working on)
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
            <Row data-aos="slide-right">
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
                  Is STEM right for my child?{" "}
                </h1>
                <p className="text-white">
                  {" "}
                  If your child shows interest in Science, Technology,
                  Engineering, or Mathematics, Smart Hub provides a variety of
                  STEM fields that your child can explore.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* <Container className="mt-5">
          <Row data-aos="slide-left">
            <Col>
              <h1 className="mt-3 text-shblue">
                {" "}
                Does the STEM Right For Your Child?{" "}
              </h1>
              <p className="text-shblue">
                {" "}
                we have the answer to that! We have variety of different STEM
                fields that exposes your child into many different field. Your
                child might find the strong interest in particular field!
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
        </Container> */}

        <Container className="mt-5">
          <Row data-aos="slide-left">
            <Col>
              <h1 className="mt-3 text-shblue">
                {" "}
                Is your child curious about the world around them?{" "}
              </h1>
              <p className="text-shblue">
                {" "}
                Smart Hub allows your child to explore the way things work
                through easy-to-understand learning material (currently working
                on)
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
            <Row data-aos="slide-right">
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
                  Don't You Want Your Child's Curiosity To Be Satisfied?{" "}
                </h1>
                <p className="text-white">
                  {" "}
                  We can definitely Satisfy your child's questions. In fact,
                  that's how the children's learn...
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <div className="is-white py-5">
        <Container style={{ maxWidth: "65%" }}>
          <h1 className="text-shblue text-center mb-5"> Parent FAQ </h1>
          <Accordion defaultActiveKey="0">
            {/* Q1 */}
            {faq.map((content, index) => {
              return (
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <Accordion.Toggle
                      style={{ border: "none", backgroundColor: "auto" }}
                      id={index + 1}
                      onClick={handleClick}
                      bsPrefix="sh-link"
                      eventKey={index + 1}
                      className="w-100 text-start"
                    >
                      {content.question}
                    </Accordion.Toggle>
                    {clicked[0] ? (
                      <ArrowUpSquareFill size={30} />
                    ) : (
                      <ArrowDownSquareFill size={30} />
                    )}
                  </Card.Header>
                  <Accordion.Collapse eventKey={index + 1}>
                    <Card.Body> {content.answer}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        </Container>
      </div>
    </>
  );
}
