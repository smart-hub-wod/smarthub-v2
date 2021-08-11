import React, { useRef, useState, useEffect } from "react";
import { Card, Button, Alert, Modal, Form } from "react-bootstrap";
// import firebase from './firebase'
import firebase from "firebase/app";

import { useAuth } from "./contexts/AuthContext.js";
import { useHistory, Link } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const nameRef = useRef();
  const { currentUser, logout, setDisplayName } = useAuth();
  const history = useHistory();
  const userRef = firebase.firestore().collection("users").doc(currentUser.uid);
  const adminRef = firebase.firestore().collection("users").doc("admins");

  // Modal Commands
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChild() {
    console.log(user.children);
    const childName = nameRef.current.value;
    if (childName) {
      userRef.update({
        [`cart.${childName}`]: [],
        [`children.${Object.keys(user.children).length}`]: {
          name: childName,
          courses: {},
        },
        //[`ids`]: firebase.firestore.FieldValue.arrayUnion(childName)
      });
    }
    handleClose();
    getUser();
  }

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  async function getUser() {
    setLoading(true);
    await userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
          console.log("the user", user);
          setLoading(false);
        } else {
          firebase.firestore().collection("users").doc(currentUser.uid).set({
            children: {},
            cart: {},
            cartTotal: 0,
          });
          setDisplayName(currentUser.email);
          getUser();
          setLoading(false);
        }
      })
      .then(() => {
        adminRef.get().then((doc) => {
          if (doc.data().accounts.includes(currentUser.email)) {
            setAdmin(true);
          }
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setLoading(false);
    console.log(admin);
    history.push("/dashboard");
  }

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <h1 className="text-shblue pt-3">Loading...</h1>;
  }

  return (
    <>
      <Card className="card m-5 p-5">
        <Card.Body>
          <Link to="/settings">
            <Button bsPrefix="button-sh" className="float-end">
              Settings
            </Button>
          </Link>
          <h1 className="text-center text-shblue">Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {!admin ? (
            <>
              <h6>Welcome!</h6>
              <h1 className="text-shblue">{currentUser.displayName}</h1>
              <p>Tip: Change your display name in settings!</p>
              <p>Welcome! Here is your dashboard to manage your students! Here you can manage and access each student’s account. </p>
              <br />
              <div className="row justify-content-between">
                <div className="col-4">
                  <h3 className="text-shblue">My Students</h3>
                </div>
                <div className="col-4">
                  <Button bsPrefix="button-sh" className="float-end" onClick={handleShow}>
                    Add New Student
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="add-course">
                <Button bsPrefix="button-sh">Add Course</Button>
              </Link>
              <span className="ml-5"> </span>
              {currentUser.email === "dev@smarthub.ca" && (
                <Link to="add-admin">
                  <Button bsPrefix="button-sh">Add Admins</Button>
                </Link>
              )}
            </>
          )}
          <div className="pt-2">
            {!user ? (
              <h1>Loading</h1>
            ) : (
              Object.keys(user.children).map((key) => {
                return (
                  <Card className="p-3 is-shblue mb-3 text-white w-50">
                    <Card.Body>
                      <div>
                        <h3 className="">{user.children[key].name}</h3>
                        <Link to={`student-dashboard/${key}`}>
                          <Button bsPrefix="button-sh" className="mt-2">
                            View {user.children[key].name}'s dashboard
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })
            )}
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="is-shblue text-white">
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group id="name" className="mb-3 form-floating">
            <Form.Control type="text" ref={nameRef} className="form-control" placeholder="name" id="InputName" aria-describedby="name" required />
            <Form.Label for="InputName" className="form-label floatingInput">
              New Student Name
            </Form.Label>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={handleClose}>
            Cancel
          </Button>
          <Button bsPrefix="button-sh" onClick={handleChild}>
            Add Student
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
