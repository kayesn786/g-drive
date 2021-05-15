import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);
      setError("Failed to log in");
    }
  }
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </CenteredContainer>
  );
}
