import React, { useState, useEffect } from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import { ArrowDownSquareFill, ArrowUpSquareFill } from "react-bootstrap-icons";

export default function ParentFAQ() {
  const [clicked, setClicked] = useState([false, false, false]);

  var faq = {};
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
      <div>
        <div className="text-center">
          <h1 className="text-shblue mt-4">ParentFAQ</h1>
          <p>Welcome!</p>
        </div>
        <Container style={{ maxWidth: "65%" }}>
          <Accordion defaultActiveKey="0">
            {/* Q1 */}
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Accordion.Toggle
                  style={{ border: "none", backgroundColor: "auto" }}
                  id="0"
                  onClick={handleClick}
                  bsPrefix="sh-link"
                  eventKey="0"
                  className="w-100 text-start"
                >
                  Question #1
                </Accordion.Toggle>
                {clicked[0] ? (
                  <ArrowUpSquareFill size={30} />
                ) : (
                  <ArrowDownSquareFill size={30} />
                )}
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>Answer #1</Card.Body>
              </Accordion.Collapse>
            </Card>
            {/* Q2 */}
            <Card>
              <Card.Header as="div" className="d-flex justify-content-between">
                <Accordion.Toggle
                  style={{ border: "none", backgroundColor: "auto" }}
                  id="1"
                  onClick={handleClick}
                  bsPrefix="sh-link"
                  eventKey="2"
                  className="w-100 text-start"
                >
                  Question #2
                </Accordion.Toggle>
                {clicked[1] ? (
                  <ArrowUpSquareFill size={30} />
                ) : (
                  <ArrowDownSquareFill size={30} />
                )}
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>Answer #2</Card.Body>
              </Accordion.Collapse>
            </Card>
            {/* Q3 */}
            <Card>
              <Card.Header as="div" className="d-flex justify-content-between">
                <Accordion.Toggle
                  style={{ border: "none", backgroundColor: "white!important" }}
                  id="2"
                  onClick={handleClick}
                  bsPrefix="sh-link"
                  eventKey="3"
                  className="w-100 text-start"
                >
                  Question #3
                </Accordion.Toggle>
                {clicked[2] ? (
                  <ArrowUpSquareFill size={30} />
                ) : (
                  <ArrowDownSquareFill size={30} />
                )}
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>Answer #3</Card.Body>
              </Accordion.Collapse>
            </Card>{" "}
          </Accordion>
        </Container>
      </div>
    </>
  );
}
