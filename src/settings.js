import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";
import firebase from "./firebase";
import "firebase/storage";

export default function Settings() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const { currentUser, updateEmail, updatePassword, setDisplayName } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [URL, setURL] = useState();
  const history = useHistory();
  const coverRef = useRef();

  var storageRef = firebase.storage().ref();

  console.log(currentUser);

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
          picRef.getDownloadURL().then((URL) => {
            currentUser
              .updateProfile({
                photoURL: URL,
              })
              .then(() => {
                setURL(URL);
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
            <div className="d-flex justify-content-center mb-4">
              <Image src={currentUser.photoURL ? currentUser.photoURL : "../defaultpfp.png"} roundedCircle style={{ height: "150px", width: "150px" }} />
            </div>
            <Form.Group controlId="formFile" className="mb-2">
              <Form.Label>
                <strong>Replace Profile Image {">"}</strong>
              </Form.Label>
              <Form.Control ref={coverRef} type="file" />
            </Form.Group>
            <Button bsPrefix="button-sh" className="mb-3" onClick={handleImage}>
              Replace Image
            </Button>

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
          </Card.Body>
        </Card>
        <div className="w-100 text-center my-3">
          <Link to="../dashboard">Cancel</Link>
        </div>
      </div>
    </>
  );
}
