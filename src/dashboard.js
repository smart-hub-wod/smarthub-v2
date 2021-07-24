import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "./contexts/AuthContext.js"
import { useHistory } from 'react-router-dom'

export default function Dashboard() {
    // https://www.youtube.com/watch?v=PKwu15ldZ7k (Update User Profile happens at 38:43)
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <Card className="card m-5 p-5">
                <Card.Body>
                    <h1 className="text-center">Profile</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong>{currentUser.email}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}