import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value, currentUser));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value, currentUser));
    }

    Promise.all(promises)
      .then(() => {
        setLoading(false);
        history.push("/user");
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to update account");
      });
  }
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
    </CenteredContainer>
  );
}
