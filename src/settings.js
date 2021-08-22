import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Image, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";
import firebase from "./firebase";
import "firebase/storage";

export default function Settings() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const { currentUser, updateEmail, updatePassword, setDisplayName, deleteUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [URL, setURL] = useState();
  const history = useHistory();
  const coverRef = useRef();
  const [admin, setAdmin] = useState(false);
  const adminRef = firebase.firestore().collection("users").doc("admins");
  const userRef = firebase.firestore().collection("users").doc(currentUser.uid);

  var storageRef = firebase.storage().ref();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(currentUser);

  function getAdmin() {
    adminRef.get().then((doc) => {
      setAdmin(doc.data().accounts.includes(currentUser.email));
    });
  }

  useEffect(() => {
    getAdmin();
  }, []);

  async function handleDelete() {
    console.log("deleting");
    try {
      setError("");
      setLoading(true);
      await deleteUser();
      await userRef.delete().then(() => {
        history.push("/signup");
      });
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (nameRef.current.value !== currentUser.displayName) {
      promises.push(setDisplayName(nameRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleImage() {
    console.log("uploading");
    if (coverRef.current.files.length > 0) {
      const picRef = storageRef.child(`instructors/${currentUser.uid}.png`);
      picRef
        .put(coverRef.current.files[0])
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
        })
        .then(() => {
          picRef.getDownloadURL().then((urllink) => {
            currentUser
              .updateProfile({
                photoURL: urllink,
              })
              .then(() => {
                setURL(urllink);
              })
              .then(() => {
                adminRef.get().then((doc) => {
                  if (doc.data()) {
                    doc.data().courses[currentUser.email.split(".")[0]].map((c) => {
                      console.log(c);
                      firebase
                        .firestore()
                        .collection("courses")
                        .doc(c)
                        .update({
                          [`instructor_pic`]: urllink,
                          [`instructor`]: nameRef.current.value,
                        })
                        .then(() => {
                          console.log("Document successfully deleted!");
                        });
                    });
                  }
                });
              });
          });
        });
    }
  }

  return (
    <>
      <div>
        <Card className="card mx-5 mt-5 p-5">
          <Card.Body>
            <h1 className="text-shblue mb-3 text-center">Settings</h1>
            <p className="text-center">Leave password field blank to keep the same</p>
            {error && <Alert variant="danger">{error}</Alert>}

            {admin && (
              <>
                <div className="d-flex justify-content-center mb-4">
                  <Image src={currentUser.photoURL ? currentUser.photoURL : "../defaultpfp.png"} roundedCircle style={{ height: "150px", width: "150px" }} />
                </div>
                <Form.Group controlId="formFile" className="mb-2">
                  <Form.Label>
                    <strong>Select new Profile Image {">"}</strong>
                  </Form.Label>
                  <Form.Control ref={coverRef} type="file" />
                </Form.Group>
                <p>
                  Upload a photo above and click Replace Image below to save changes. Wait until your profile picture uploads before exiting this page. If you are updating your display name, you must also click the button below in addition to the Update Profile button to save changes across all of
                  your courses. <strong>Square images are ideal for profile photos.</strong>
                </p>
                <Button bsPrefix="button-sh" className="mb-3" onClick={handleImage}>
                  Replace Image and Update Display Name
                </Button>
              </>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="name" className="mb-3 form-floating">
                <Form.Control type="text" ref={nameRef} className="form-control" placeholder="name" id="InputName" aria-describedby="name" required defaultValue={currentUser.displayName} />
                <Form.Label for="InputName" className="form-label floatingInput">
                  New Display Name
                </Form.Label>
              </Form.Group>
              <Form.Group id="email" className="mb-3 form-floating">
                <Form.Control type="email" ref={emailRef} className="form-control" placeholder="name@example.com" id="InputEmail" aria-describedby="email" required defaultValue={currentUser.email} />
                <Form.Label for="InputEmail" className="form-label floatingInput">
                  New Email address
                </Form.Label>
              </Form.Group>
              <Form.Group id="password" className="mb-3 form-floating">
                <Form.Control type="password" ref={passwordRef} className="form-control" placeholder="Password" id="InputPassword" aria-describedby="password" />
                <Form.Label for="InputPassword" className="form-label floatingInput">
                  New Password
                </Form.Label>
              </Form.Group>
              <Form.Group id="passwordconfirm" className="mb-3 form-floating">
                <Form.Control type="password" ref={passwordConfirmRef} className="form-control" placeholder="Confirm Password" id="InputPasswordConfirm" aria-describedby="password confirm" />
                <Form.Label for="InputPasswordConfirm" className="form-label floatingInput">
                  New Password Confirmation
                </Form.Label>
              </Form.Group>
              <Button bsPrefix="button-sh" className="w-100" type="submit" disabled={loading}>
                Update Profile
              </Button>
            </Form>
            <Button variant="danger" className="my-3 w-100" onClick={handleShow}>
              Delete Account
            </Button>
          </Card.Body>
        </Card>
        <div className="w-100 text-center my-3">
          <Link to="../dashboard">Cancel</Link>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is a permanent! Your account can not be recovered!</Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes delete my account!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
