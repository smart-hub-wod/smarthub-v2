import React from "react"
import { Accordion, Card, Button } from 'react-bootstrap'


export default function ParentFAQ() {
    return (
        <>
        <div>
            <div className="text-center">
                <h1 className="text-shblue mt-4">ParentFAQ</h1>
                <p>Welcome!</p>
            </div>
            <div className="mx-5">
                <Accordion>
                    {/* Q1 */}
                    <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} 
                        bsPrefix="sh-link" eventKey="0">
                        Question #1
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        Answer #1
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                    {/* Q2 */}
                    <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} 
                        bsPrefix="sh-link" eventKey="2">
                        Question #2
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                        Answer #2
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                    {/* Q3 */}
                    <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} 
                        bsPrefix="sh-link" eventKey="3">
                        Question #3
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                        Answer #3
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        </>
    )
}