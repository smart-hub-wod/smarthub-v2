import React from "react"
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext.js"

export default function NavBar() {
    const { currentUser } = useAuth()

    return (
        <Navbar className="is-shblue sticky-top fade-in">
            <Container fluid className="d-flex justify-content-between">
                <Navbar.Brand>
                    <Link to="/">
                        <img
                            src="../smarthub-logo.png"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Smart Hub logo"
                        />
                    </Link>
                </Navbar.Brand>
                <div>
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/about" className="link">About</Link></Nav.Link>
                        <Nav.Link><Link to="/courses" className="link">Courses</Link></Nav.Link>
                        <Nav.Link><Link to="/meet-the-team" className="link">Meet the Team</Link></Nav.Link>
                        <Nav.Link><Link to="/parent-faq" className="link">For Parents</Link></Nav.Link>
                    </Nav>
                </div>
                <div>
                    {currentUser ?
                    <Nav className="me-auto float-end">
                        <Nav.Link><Link to="/dashboard" className="link">My Profile</Link></Nav.Link>
                        <Nav.Link><Link to="/cart" className="link">My Cart</Link></Nav.Link>
                    </Nav>  :
                    <Nav className="me-auto float-end">
                        <Nav.Link><Link to="/login" className="link">Log In</Link></Nav.Link>
                        <Nav.Link className="bg-light rounded"><Link to="/signup" className="text-sh-blue nounder">Sign Up</Link></Nav.Link>
                    </Nav>}
                </div>
            </Container>
        </Navbar>
    )
}