import React, { useEffect } from "react";
import { Accordion, Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";

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
      question: "1. How do I make my course?",
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
  ];

  return (
    <div id="faq">
      <section
        className="top-catcher align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "teacher1.jpg"})`,
        }}
      >
        <div className="text-center teacher-title py-3">
          <h1 className="heading-text  text-white mb-5">Welcome, Teachers</h1>
          <h3>
            {" "}
            SmartHub provides lots of great opportunities for teachers to share,
            learn and teach STEM courses to students
          </h3>
          {/* <div className="teacher-title-tri" /> */}
        </div>
      </section>

      <div id="teacher-page">
        <section
          className="top-catcher"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "teacher2.jpg"})`,
          }}
        >
          <div className="text-container">
            <h1 className="heading-text"> Courses for Your Students: </h1>
            <p className="text-white teacher-sub">
              Smarthub offers you a way to access OCT teacher-reviewed materials
              to use in your elementary classroom with students. All you need to
              do is create an account, add yourself as a student and select
              courses by grade to view and use them as a teacher.{" "}
            </p>
            <div className="d-flex justify-content-end me-5">
              <Link to="/signup">
                <Button
                  data-aos="fade-up"
                  bsPrefix="button-sh"
                  className="px-4 py-2"
                  style={{ fontSize: "1.5rem" }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section
          className="top-catcher"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "teacher3.jpg"})`,
          }}
        >
          <div className="text-container">
            <h1 className="heading-text"> Courses for Teachers: </h1>
            <p className="text-white teacher-sub">
              You will also be able to access courses specifically on how to use
              various technologies created specifically for teachers. When
              choosing a course, click on the 'teacher' choice from the menu to
              see courses that have been made just for you.
            </p>
            <div className="d-flex justify-content-end me-5">
              <Link to="/signup">
                <Button
                  data-aos="fade-up"
                  bsPrefix="button-sh"
                  className="px-4 py-2 mt-4"
                  style={{ fontSize: "1.5rem" }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section
          className="top-catcher"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "teacher4.jpg"})`,
          }}
        >
          <div className="text-container">
            <h1 className="heading-text"> Join the Team </h1>
            <p className="text-white teacher-sub">
              {" "}
              Are you a STEM teacher interested in contributing to the SmartHub
              community? Please e-mail{" "}
              <a href="mailto:smarthub-teach@onamap.ca">
                smarthub-teach@onamap.ca
              </a>{" "}
              to learn about how you can become a SmartHub teacher and share
              your skills with hundreds of our SmartHub students.{" "}
            </p>
          </div>
        </section>

        <div className="is-white py-5">
          <Container style={{ maxWidth: "65%" }}>
            <h1 className="text-shblue text-center mb-5"> Teacher FAQ </h1>
            <Accordion defaultActiveKey="0">
              <div className="accordion-container is-shblue">
                <h1 className="text-white"> Coming Soon! </h1>
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
    </div>
  );
}
