import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext.js"

export default function Settings() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const nameRef = useRef()
    const { currentUser, updateEmail, updatePassword, setDisplayName } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    function handleSubmit(e) {
        e.preventDefault()
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (nameRef.current.value !== currentUser.displayName) {
            promises.push(setDisplayName(nameRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/dashboard")
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
  
    }

    return (
        <>
        <div>
            <Card className="card mx-5 mt-5 p-5">
                <Card.Body>
                    <h1 className="text-shblue mb-3 text-center">Settings</h1>
                    <p className="text-center">Leave password field blank to keep the same</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}> 
                        <Form.Group id="name" className="mb-3 form-floating">
                            <Form.Control type="text" ref={nameRef} className="form-control" placeholder="name" id="InputName" aria-describedby="name" required defaultValue={currentUser.displayName}/>
                            <Form.Label for="InputName" className="form-label floatingInput">New Display Name</Form.Label>
                        </Form.Group>
                        <Form.Group id="email" className="mb-3 form-floating">
                            <Form.Control type="email" ref={emailRef} className="form-control" placeholder="name@example.com" id="InputEmail" aria-describedby="email" required defaultValue={currentUser.email}/>
                            <Form.Label for="InputEmail" className="form-label floatingInput">New Email address</Form.Label>
                        </Form.Group>
                        <Form.Group id="password" className="mb-3 form-floating">
                            <Form.Control type="password" ref={passwordRef} className="form-control" placeholder="Password" id="InputPassword" aria-describedby="password"/>
                            <Form.Label for="InputPassword" className="form-label floatingInput">New Password</Form.Label>
                        </Form.Group>
                        <Form.Group id="passwordconfirm" className="mb-3 form-floating">
                            <Form.Control type="password" ref={passwordConfirmRef} className="form-control" placeholder="Confirm Password" id="InputPasswordConfirm" aria-describedby="password confirm"/>
                            <Form.Label for="InputPasswordConfirm" className="form-label floatingInput">New Password Confirmation</Form.Label>
                        </Form.Group>
                        <Button  bsPrefix="button-sh" className="w-100" type="submit" disabled={loading}>Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center my-3">
                <Link to="../dashboard">Cancel</Link>
            </div>
        </div>
        </>
    )
}