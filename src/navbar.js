import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";

export default function NavBar() {
  const { currentUser } = useAuth();

  var [toggled, setToggled] = useState(false);

  function toggleToggl() {
    if (toggled) {
      setToggled(false);
    } else {
      setToggled(true);
    }
    console.log(toggled);
  }

  return (
    <Navbar
      defaultExpnaded={false}
      //   onToggle={toggleToggl}
      collapseOnSelect
      className="is-shblue sticky-top fade-in"
      expand="md"
    >
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
        <Navbar.Toggle
          aria-controls="smarthub-nav"
          className="light"
          onClick={toggleToggl}
          //   bsPrefix={{ }}
        />
        <Navbar.Collapse id="smarthub-nav" className="justify-content-between" style={!toggled ? {margin: "0 1rem 0 5rem"} : {}}>
          <div>
            <Nav navbarScroll={true} className="">
              <Nav.Link>
                <Link to="/about" className="link">
                  About
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/courses" className="link">
                  Courses
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/meet-the-team" className="link">
                  Meet the Team
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/parent-faq" className="link">
                  For Parents
                </Link>
              </Nav.Link>
            </Nav>
          </div>
          <div>
            {currentUser ? (
              <Nav
                className=""
                // style={{ display: "flex", justifyContent: "end" }}
              >
                <Nav.Link>
                  <Link to="/dashboard" className="link">
                    My Profile
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/cart" className="link">
                    My Cart
                  </Link>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="">
                <Nav.Link>
                  <Link to="/login" className="link">
                    Log In
                  </Link>
                </Nav.Link>
                <Nav.Link className={!toggled ? "bg-light rounded" : ""}>
                  <Link
                    to="/signup"
                    className={
                      !toggled ? "text-sh-blue nounder" : "text-white nounder"
                    }
                  >
                    Sign Up
                  </Link>
                </Nav.Link>
              </Nav>
            )}
          </div>
        </Navbar.Collapse>
        {/* <div>
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
                </div> */}
      </Container>
    </Navbar>
  );
}
