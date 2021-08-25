import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";
import firebase from "firebase/app";

import logo from "./assets/smarthub-logo.png";
import { CartFill } from "react-bootstrap-icons";

export default function NavBar() {
  const { currentUser } = useAuth();
  const [price, setPrice] = useState(0);
  const cartref = currentUser
    ? firebase.firestore().collection("users").doc(currentUser.uid)
    : "";

  var [toggled, setToggled] = useState(false);

  function toggleToggl() {
    if (toggled) {
      setToggled(false);
    } else {
      setToggled(true);
    }
    console.log(toggled);
  }

  async function getCart() {
    if (currentUser) {
      await cartref.onSnapshot((doc) => {
        if (doc.exists) {
          setPrice(doc.data().cartTotal);
        }
      });
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Navbar
      defaultExpanded={false}
      //   onToggle={toggleToggl}
      collapseOnSelect
      className="is-shblue sticky-top"
      expand="xl"
    >
      <Container fluid className="d-flex justify-content-between">
        <Navbar.Brand>
          <Link to="/">
            <img
              src={logo}
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
        <Navbar.Collapse
          id="smarthub-nav"
          className="justify-content-between"
          style={!toggled ? { margin: "0 1rem 0 5rem" } : {}}
        >
          <div>
            <Nav navbarScroll={true}>
              <Link to="/about" className="link nav-text mx-4">
                <div className="ms-2 me-3">About</div>
              </Link>
              <Link to="/courses" className="link nav-text mx-4">
                <div className="ms-2 me-3">Courses</div>
              </Link>
              {/* <Link to="/meet-the-team" className="link nav-text mx-4">
                <div className="ms-2 me-3">Meet the Team</div>
              </Link> */}
              <Link to="/student-zone" className="link nav-text mx-4">
                <div className="ms-2 me-3">Student</div>
              </Link>
              <Link to="/parent-faq" className="link nav-text mx-4">
                <div className="ms-2 me-3">Parent</div>
              </Link>
              <Link to="/teacher-faq" className="link nav-text mx-4 nav-link">
                <div className="ms-2 me-3">Teacher</div>
              </Link>
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
                    <CartFill color="white" size={25} />
                    {price > 0 && (
                      <span class="position-absolute top-75 start-75 translate-middle p-2 badge-sh rounded-circle">
                        <span class="visually-hidden">New alerts</span>
                      </span>
                    )}
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
                <Nav.Link
                  className={
                    toggled ? "is-white rounded" : "is-white rounded signup-nav"
                  }
                >
                  <Link to="/signup" className="nounder text-shblue">
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
