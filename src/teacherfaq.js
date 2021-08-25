import React, { useState, useEffect } from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import { ArrowDownSquareFill, ArrowUpSquareFill } from "react-bootstrap-icons";

export default function TeacherFAQ() {
  const [clicked, setClicked] = useState([false, false, false]);
  useEffect(() => {
    window.scrollTo(0, 0);
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
        "Our courses are designed for students in grades 1-4, although the course content is useful for all ages!",
    },
    {
      question: "How can we pay for Smart Hub courses?",
      answer: "[PayPal] *insert other methods here* ",
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
      <div className="mb-5">
        <div className="text-center">
          <h1 className="text-shblue mt-4">Teacher FAQ</h1>
          <p>Welcome!</p>
        </div>
        <Container style={{ maxWidth: "65%" }}>
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

          <h1 className="text-shblue mt-4 text-center">
            Do you want to be a instructor on Smarthub? <br />
            <a> Click here to Join </a>
          </h1>
        </Container>
      </div>
    </>
  );
}
