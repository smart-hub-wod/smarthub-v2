import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const nameRef = useRef()
  const termsRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const pw = passwordRef.current.value;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (!termsRef.current.checked) {
      return setError("Please agree to the terms and conditions");
    }

    try {
      setError("");
      console.log("1");
      setLoading(true);
      console.log("2");
      await signup(email, pw);
      console.log("3");
      history.push("/dashboard");
      console.log("4");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  // function addUser(username) {
  //     firebase.firestore().collection("users").doc(email).set({
  //         name: username,
  //         children: {},
  //         cart: []
  //     })
  // }

  return (
    <>
      <Container className="auth-container mt-5 d-flex justify-content-center">
        <Card className="card auth-card p-5">
          <Card.Body>
            <h1 className="text-center text-shblue mb-4a">SIGN UP</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              {/* <Form.Group id="name" className="mt-4 mb-3 form-floating">
                            <Form.Control type="text" ref={nameRef} className="form-control" placeholder="Your Name" id="InputName" aria-describedby="name" required/>
                            <Form.Label for="InputName" className="form-label floatingInput">Parent's Name</Form.Label>
                        </Form.Group> */}
              <Form.Group id="email" className="mb-3 form-floating">
                <Form.Control
                  type="email"
                  ref={emailRef}
                  className="form-control"
                  placeholder="name@example.com"
                  id="InputEmail"
                  aria-describedby="email"
                  required
                />
                <Form.Label
                  for="InputEmail"
                  className="form-label floatingInput"
                >
                  Parent's Email address
                </Form.Label>
              </Form.Group>
              <Form.Group id="password" className="mb-3 form-floating">
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  className="form-control"
                  placeholder="Password"
                  id="InputPassword"
                  aria-describedby="password"
                  required
                />
                <Form.Label
                  for="InputPassword"
                  className="form-label floatingInput"
                >
                  Password
                </Form.Label>
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3 form-floating">
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  className="form-control"
                  placeholder="PasswordConfirm"
                  id="InputPasswordConfirm"
                  aria-describedby="confirmpassword"
                  required
                />
                <Form.Label
                  for="InputPasswordConfirm"
                  className="form-label floatingInput"
                >
                  Confirm Password
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3" controlId="termsCheckbox">
                <div className="d-flex flex-row justify-content-start">
                  <Form.Check
                    type="checkbox"
                    ref={termsRef}
                    id="InputCheckbox"
                  />
                  <Form.Check.Label for="InputCheckbox" className="form-label">
                    I agree to the{" "}
                    <Link to="/terms-and-conditions">Terms and Conditions</Link>
                  </Form.Check.Label>
                </div>
              </Form.Group>
              <Button
                bsPrefix="button-sh"
                className="auth-btn"
                type="submit"
                disabled={loading}
              >
                Sign Up
              </Button>
            </Form>
            <div className="w-100 text-center my-3">
              Already have an account? <Link to="../login">Log In</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
