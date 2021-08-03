import React from "react";
import {Container, Form, Row, Col, Button } from "react-bootstrap";
import { Front } from "react-bootstrap-icons";

// breakdown this page
// set up the layout
// figure out how to employ the layout



export default function Contact() {

    return (

        <Container id="contact" className="text-left" style={{
            width: "60%"
            }}>
            <div>
                <h1 className="heading-text">
                    Contact Us
                </h1>
                <hr/>
            </div>
            
            <Form>
                <Row>
                    
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="my-4 label-text">
                                First Name
                            </Form.Label>

                            <Form.Control
                                className="input" 
                                type="text" 
                                placeHolder="type your first name"
                                required
                            />

                        </Form.Group>
                        
                    </Col>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="my-4 label-text">
                                Last Name
                            </Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                placeholder="type your last name"
                                required
                            />
                        </Form.Group>
                        
                    </Col>
                </Row>

                <Row>
                    
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="my-4 label-text">
                                Phone Number
                            </Form.Label>

                            <Form.Control 
                                className="input"
                                type="tel" 
                                placeHolder="type your phone number"
                                required
                            />
                        </Form.Group>
                       
                    </Col>

                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label className="my-4 label-text" >
                                Email
                            </Form.Label>
                            <Form.Control
                                className="input"
                                type="email"
                                placeholder="type your email"
                                required
                            />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col xs={12}>
                        <Form.Group className="my-4 label-text">
                            <Form.Label>
                                Message
                            </Form.Label>
                            <Form.Control
                                className="input"
                                as="textarea"
                                placeholder="type your message here"
                                style={{height: "2rem;"}}
                                required
                            />
                        </Form.Group>
                        
                    </Col>
                </Row>
                <Form.Group>
                    <Button 
                        size="lg"
                        as="input" 
                        type="submit"
                        value="Send"
                    />   
                </Form.Group>
                
            </Form>
        </Container>
        
    );
    
}