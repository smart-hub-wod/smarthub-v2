import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";
import { Google } from "react-bootstrap-icons";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }
  async function handleGoogle(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await googleLogin();
      history.push("/dashboard");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <>
      <Container className="auth-container my-5 d-flex justify-content-center">
        <Card className=" px-md-5 pt-4 mb-2 auth-card">
          <Card.Body>
            <h1 className="text-center text-shblue mb-3 ">LOGIN</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button
              bsPrefix="button-sh"
              className="auth-btn mt-2 mb-2"
              disabled={loading}
              onClick={handleGoogle}
            >
              <p>
                Sign In with Google
                <br /> <Google color="white" size={20} />
              </p>
            </Button>
            <p className="text-center">or</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3 mt-4 form-floating">
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
                  Email address
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
              <Button
                bsPrefix="button-sh"
                className="auth-btn mt-4"
                type="submit"
                disabled={loading}
              >
                Login
              </Button>
            </Form>
            <div className="w-100 text-center my-3">
              <Link to="../forgot-password">Forgot Password? </Link>
            </div>
            <div className="w-100 text-center my-3">
              Need an account? <Link to="../signup">Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
