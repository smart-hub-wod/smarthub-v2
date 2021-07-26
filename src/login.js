import React, {useRef, useState} from "react"
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext.js"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    return (
        <>
            <Card className="card m-5 p-5">
                <Card.Body>
                    <h1 className="text-center text-shblue">LOGIN</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-3 form-floating">
                            <Form.Control type="email" ref={emailRef} className="form-control" placeholder="name@example.com" id="InputEmail" aria-describedby="email" required/>
                            <Form.Label for="InputEmail" className="form-label floatingInput">Email address</Form.Label>
                        </Form.Group>
                        <Form.Group id="password" className="mb-3 form-floating">
                            <Form.Control type="password" ref={passwordRef} className="form-control" placeholder="Password" id="InputPassword" aria-describedby="password" required/>
                            <Form.Label for="InputPassword" className="form-label floatingInput">Password</Form.Label>
                        </Form.Group>
                        <Button  bsPrefix="button-sh" className="w-100" type="submit" disabled={loading}>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="../signup">Sign Up</Link>
            </div>
        </>
    )
}