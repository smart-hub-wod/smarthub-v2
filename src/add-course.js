import React, {useRef} from "react"
import { Form, Button, Card, Alert } from 'react-bootstrap'


export default function AddCourse() {
    const titleRef = useRef()
    const descriptionRef = useRef()
    const timelineRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        console.log(titleRef.current.value, descriptionRef.current.value, timelineRef.current.value)
        // Add to Database once all values are received
    }
    return (
        <>
        <div>
        <Card className="card m-5 p-5">
                <Card.Body>
                    <h1 className="text-center text-shblue">Add New Course</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="title" className="mb-3 form-floating">
                            <Form.Control type="text" ref={titleRef} className="form-control" placeholder="Course Title" id="InputName" aria-describedby="name" required/>
                            <Form.Label for="InputName" className="form-label floatingInput">Course Title</Form.Label>
                        </Form.Group>
                        <Form.Group id="description" className="mb-3 form-floating">
                            <Form.Control type="text" ref={descriptionRef} className="form-control" placeholder="Description" id="InputDescription" aria-describedby="name" required/>
                            <Form.Label for="InputDescription" className="form-label floatingInput">Course Description</Form.Label>
                        </Form.Group>
                        <Form.Group id="timeline" className="mb-3 form-floating">
                            <Form.Control type="text" ref={timelineRef} className="form-control" placeholder="Timeline" id="InputTimeline" aria-describedby="name" required/>
                            <Form.Label for="InputTimeline" className="form-label floatingInput">Timeline</Form.Label>
                        </Form.Group>
                        <Button  bsPrefix="button-sh" className="w-100" type="submit">Add Course</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}