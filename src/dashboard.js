import React, { useRef, useState, useEffect } from "react";
import { Card, Button, Alert, Modal, Form } from "react-bootstrap";
import firebase from "./firebase";

import app from "firebase/app";

import { useAuth } from "./contexts/AuthContext.js";
import { useHistory, Link } from "react-router-dom";
import { parse } from "@fortawesome/fontawesome-svg-core";

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
  const [courses, setCourses] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // here

  const pinRef = useRef();
  const childPass = useRef();
  const [isChildLogin, setIsChildLogin] = useState(false);

  const [delAlert, setDelAlert] = useState();

  // del modal components
  const [delShow, setDelShow] = useState(false);
  const handleDelClose = () => {
    setDelShow(false);
  };

  const [delKey, setDelKey] = useState();
  // child log in
  // const [childLogin, setChildLogin] = useState();

  const handleDelShow = (e) => {
    setDelShow(true);
    // console.log(typeof e.target.id);
    setDelKey(e.target.id.toString());
  };

  function childLogin(e) {
    // e.target.id dash

    var key = e.target.id.toString().split("-")[1];
    // const enteredPin = childPass.current.value;

    // console.log(typeof user.children[key].pin);

    console.log(childPass.current.value);
    // user.children[key].pin
    if (true === user.children[key].pin.toString()) {
      console.log("The pin is true");
      setIsChildLogin(true);
    } else {
      console.log("The pin is false");
      // below neccessary?
      setIsChildLogin(false);
    }
  }

  async function deleteChild() {
    // console.log(i);
    // userRef.update({
    //   [`cart.${childName}`]: NaN,
    //   [`children.${i}`]: NaN,
    // });
    const childName = await user.children[delKey].name;

    try {
      await userRef.update({
        [`cart.${childName}`]: app.firestore.FieldValue.delete(),
        [`children.${delKey}`]: app.firestore.FieldValue.delete(),
      });

      setDelAlert("Student was successfully deleted");
    } catch {
      setError("Student could not be deleted");
    }
  }

  async function removeDelAlert() {
    setTimeout(() => {
      setDelAlert("");
    }, 3000);
  }

  // end

  function handleChild() {
    console.log(user.children);
    const childName = nameRef.current.value;
    const childPin = parseInt(pinRef.current.value);
    if (childName) {
      userRef.update({
        [`cart.${childName}`]: [],
        [`children.${Object.keys(user.children).length}`]: {
          name: childName,
          pin: childPin,
          courses: [],
          complete: [],
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

  function titleMaker(title) {
    let finished = title.split("-");
    finished.pop();
    finished.map((word, index) => {
      finished[index] =
        word.charAt(0).toUpperCase() + word.slice(1, word.length);
    });
    return finished.join(" ");
  }

  function viewCourse() {
    console.log("viewing");
    //setCourses(courses);
    if (admin) {
      console.log("yup ur good");
      adminRef.get().then((doc) => {
        const adminCourses = doc.data().courses;
        if (currentUser.email.split(".")[0] in adminCourses) {
          setCourses(adminCourses[currentUser.email.split(".")[0]]);
          console.log(courses);
        }
      });
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
      })
      .then(() => {
        // if (admin) {
        //   console.log("yup ur good");
        //   adminRef.get().then((doc) => {
        //     const adminCourses = doc.data().courses;
        //     if (currentUser.email.split(".")[0] in adminCourses) {
        //       setCourses(adminCourses[currentUser.email.split(".")[0]]);
        //       console.log(courses);
        //     }
        //   });
        // }
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
              <p>
                Welcome! Here is your dashboard to manage your students! Here
                you can manage and access each student’s account.{" "}
              </p>
              <br />
              <div className="row justify-content-between">
                <div className="col-4">
                  <h3 className="text-shblue">My Students</h3>
                </div>
                <div className="col-4">
                  <Button
                    bsPrefix="button-sh"
                    className="float-end"
                    onClick={handleShow}
                  >
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
              <Button bsPrefix="button-sh" onClick={viewCourse}>
                View Course
              </Button>
              <span className="ml-5"> </span>

              <Button
                bsPrefix="button-sh"
                href="https://www.notion.so/Adding-a-Course-e3cda0b54b4d49b8bd1dbd56f3a6d18a"
              >
                Adding/Editing Course Guide
              </Button>
              <span className="ml-5"> </span>
              {currentUser.email === "dev@smarthub.ca" && (
                <Link to="add-admin">
                  <Button bsPrefix="button-sh">Add Admins</Button>
                </Link>
              )}
              <h3 className="text-shblue mt-5">My Courses</h3>
              <p>
                Click <strong>View Courses</strong> above to render courses
                below!
              </p>
              {courses &&
                courses.map((c) => {
                  return (
                    <Card className="p-3 is-shblue mb-3 text-white w-50">
                      <Card.Body>
                        {" "}
                        <h1>{titleMaker(c)}</h1>
                        <p>ID: {c}</p>
                        <Link to={`/edit-course/${c}`}>
                          <Button bsPrefix="button-sh">Edit Course</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  );
                })}
            </>
          )}
          <div className="pt-2">
            {!user ? (
              <h1>Loading</h1>
            ) : (
              <>
                {delAlert ? <Alert variant="success"> {delAlert}</Alert> : ""}
                {Object.keys(user.children).map((key) => {
                  return (
                    <Card className="p-3 is-shblue mb-3 text-white w-50">
                      <Card.Body>
                        <div>
                          <Button
                            bsPrefix="button-sh"
                            className="float-end"
                            onClick={handleDelShow}
                            id={key}
                          >
                            Delete This Student
                          </Button>
                          <h3 className="">{user.children[key].name}</h3>

                          <Form>
                            <Form.Group id="pin">
                              <Form.Control
                                // id="childPinPassInput"
                                type="password"
                                ref={childPass}
                                placeholder="Enter your PIN number"
                                className="form-control my-3 w-50"
                                style={{
                                  textDecoration: "none",
                                }}
                              />
                            </Form.Group>
                            <Button id={`dash-${key}`} onClick={childLogin}>
                              test
                            </Button>
                          </Form>

                          <Link
                            to={
                              isChildLogin
                                ? `student-dashboard/${key}`
                                : `/dashboard`
                            }
                          >
                            <Button
                              aria-disabled={true}
                              bsPrefix="button-sh"
                              className="mt-2"
                              // id={`dash-${key}`}
                              // onClick={childLogin}
                            >
                              View {user.children[key].name}'s Dashboard
                            </Button>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </>
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
        <Modal.Header closeButton={false} className="is-shblue text-white">
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group id="name" className="mb-3 form-floating">
            <Form.Control
              type="text"
              ref={nameRef}
              className="form-control"
              placeholder="name"
              id="InputName"
              aria-describedby="name"
              required
            />
            <Form.Label for="InputName" className="form-label floatingInput">
              New Student Name
            </Form.Label>
          </Form.Group>

          <Form.Group id="pin" className="mb-3 form-floating">
            <Form.Control
              type="number"
              ref={pinRef}
              className="form-control"
              placeholder="name"
              id="InputPIN"
              aria-describedby="name"
              required
            />
            <Form.Label for="InputPIN" className="form-label floatingInput">
              New student's PIN
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

      <Modal show={delShow} onHide={handleDelClose}>
        <Modal.Header
          style={{ backgroundColor: "red" }}
          closeButton={false}
          className="text-white"
        >
          <Modal.Title>
            Are you Sure You Want To Delete This Student?{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you delete this student, the courses you bought for this student,
          student's work including certificates will be permanently deleted.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="link" onClick={handleDelClose}>
            Cancel
          </Button>
          <Button
            bsPrefix="button-sh"
            onClick={async () => {
              await deleteChild();
              handleDelClose();
              getUser();
              await removeDelAlert();
            }}
          >
            Delete Student
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
