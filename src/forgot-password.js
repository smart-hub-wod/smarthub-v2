import React, {useRef, useState} from "react"
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext.js"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions!')
        } catch {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        <>
          <Container className="auth-container">
            <Card className="card auth-card p-5">
                <Card.Body>
                    <h1 className="text-center text-shblue">PASSWORD RESET</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-3 mt-4 form-floating">
                            <Form.Control type="email" ref={emailRef} className="form-control" placeholder="name@example.com" id="InputEmail" aria-describedby="email" required/>
                            <Form.Label for="InputEmail" className="form-label floatingInput">Email address</Form.Label>
                        </Form.Group>
                        <Button  bsPrefix="button-sh" className="auth-btn mt-4" type="submit" disabled={loading}>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center my-3">
                        <Link to="../login">Login</Link>
                    </div>
                    <div className="w-100 text-center my-3">
                        Need an account? <Link to="../signup">Sign Up</Link>
                    </div>
                </Card.Body>
            </Card>


          </Container>
        </>
    )
}