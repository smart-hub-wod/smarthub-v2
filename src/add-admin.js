import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import firebase from "firebase/app";

export default function AddAdmin() {
  const emailRef = useRef();
  const [alert, setAlert] = useState();
  const adminref = firebase.firestore().collection("users").doc("admins");

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(emailRef.current.value);
    adminref.update({
      ["accounts"]: firebase.firestore.FieldValue.arrayUnion(emailRef.current.value),
    });
    setAlert(`Success! ${emailRef.current.value} was added as an admin`);
    document.getElementById("InputEmail").value = "";
  };

  return (
    <>
      <div>
        <Card className="card m-5 p-5">
          <Card.Body>
            <div className="text-center">
              <h1 className="text-shblue mt-4"> Add Admin </h1>
              {alert ? <Alert variant="success">{alert}</Alert> : ""}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3 mt-4 form-floating">
                  <Form.Control type="email" ref={emailRef} className="form-control" placeholder="name@example.com" id="InputEmail" aria-describedby="email" required />
                  <Form.Label for="InputEmail" className="form-label floatingInput">
                    Email address
                  </Form.Label>
                </Form.Group>
                <Button bsPrefix="button-sh" className="mt-4" type="submit">
                  Add Admin Address
                </Button>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
