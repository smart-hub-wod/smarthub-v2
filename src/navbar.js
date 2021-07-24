import React from "react"
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext.js"

export default function NavBar() {
    const { currentUser } = useAuth()

    return (
        <Navbar className="is-shblue sticky-top">
            <Container fluid className="d-flex justify-content-between">
                <Navbar.Brand className="col-2 float-start">
                    <Link to="/">
                        <img
                            src="../smarthub-logo.png"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Smart Hub logo"
                        />
                    </Link>
                </Navbar.Brand>
                <div className="col-2">
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/about" className="link">About</Link></Nav.Link>
                        <Nav.Link><Link to="/courses" className="link">Courses</Link></Nav.Link>
                        <Nav.Link><Link to="/contact-us" className="link">Contact Us</Link></Nav.Link>
                    </Nav>
                </div>
                <div className="col-2 mr-5">
                    {currentUser ?
                    <Nav className="me-auto float-end">
                        <Nav.Link><Link to="/dashboard" className="link">My Profile</Link></Nav.Link>
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