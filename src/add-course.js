import React, {useRef} from "react"
import { Form, Button, Card, Alert } from 'react-bootstrap'
import firebase from './firebase'

export default function AddCourse() {
    const titleRef = useRef()
    const descriptionRef = useRef()
    const timelineRef = useRef()
    const IDRef = useRef()
    const outlineRef = useRef()
    const orderRef = useRef()

    const lessonref = firebase.firestore().collection("lessons")
    const courseref = firebase.firestore().collection("courses")

    function handleSubmit(e) {
        e.preventDefault()
        console.log(JSON.parse(outlineRef.current.value))
        lessonref.doc(IDRef.current.value).set({
            name: titleRef.current.value,
            lessons: orderRef.current.value.split(','),
            lessonContent: JSON.parse(outlineRef.current.value)
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    return (
        <>
        <div>
        <Card className="card m-5 p-5">
                <Card.Body>
                    <h1 className="text-center text-shblue">Add New Course</h1>
                    <Form onSubmit={handleSubmit}>
                        <p><strong>Course Title</strong> will be the display name. Example: Computer Engineering</p>
                        <Form.Group id="title" className="mb-3 form-floating">
                            <Form.Control type="text" ref={titleRef} className="form-control" placeholder="Course Title" id="InputName" aria-describedby="name" required/>
                            <Form.Label for="InputName" className="form-label floatingInput">Course Title</Form.Label>
                        </Form.Group>
                        <p><strong>Course ID</strong> should be course name hyphenated and lowercase. Example: computer-engineering</p>
                        <Form.Group id="courseid" className="mb-3 form-floating">
                            <Form.Control type="text" ref={IDRef} className="form-control" placeholder="Course ID" id="InputID" aria-describedby="id" required/>
                            <Form.Label for="InputID" className="form-label floatingInput">Course ID</Form.Label>
                        </Form.Group>
                        <Form.Group id="description" className="mb-3 form-floating">
                            <Form.Control as="textarea" style={{ height: '200px' }} type="text" ref={descriptionRef} className="form-control" placeholder="Description" id="InputDescription" aria-describedby="description" required/>
                            <Form.Label for="InputDescription" className="form-label floatingInput">Course Description</Form.Label>
                        </Form.Group>
                        <p><strong>Timeline</strong> Example: 3 weeks</p>
                        <Form.Group id="timeline" className="mb-3 form-floating">
                            <Form.Control type="text" ref={timelineRef} className="form-control" placeholder="Timeline" id="InputTimeline" aria-describedby="timeline" required/>
                            <Form.Label for="InputTimeline" className="form-label floatingInput">Timeline</Form.Label>
                        </Form.Group>
                        <p><strong>Content Outline</strong> Refer to <a href="https://www.notion.so/Adding-a-Course-e3cda0b54b4d49b8bd1dbd56f3a6d18a" target="_blank" rel="noopener noreferrer"> this document</a> for details on how to construct a course outline</p>
                        <Form.Group id="outline" className="mb-3 form-floating">
                            <Form.Control as="textarea" style={{ height: '200px' }} type="text" ref={outlineRef} className="form-control" placeholder="Outline" id="InputOutline" aria-describedby="content" required/>
                            <Form.Label for="InputOutline" className="form-label floatingInput">Course Content</Form.Label>
                        </Form.Group>
                        <p><strong>Course Order</strong> Refer to <a href="https://www.notion.so/Adding-a-Course-e3cda0b54b4d49b8bd1dbd56f3a6d18a" target="_blank" rel="noopener noreferrer">this document</a> for details on how to construct a course order</p>
                        <Form.Group id="order" className="mb-3 form-floating">
                            <Form.Control as="textarea" style={{ height: '200px' }} type="text" ref={orderRef} className="form-control" placeholder="Order" id="InputOrder" aria-describedby="order" required/>
                            <Form.Label for="InputOrder" className="form-label floatingInput">Course Order</Form.Label>
                        </Form.Group>
                        <Button  bsPrefix="button-sh" className="w-100" type="submit">Add Course</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}