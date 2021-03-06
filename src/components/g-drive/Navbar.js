import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar
      bg="light"
      expand="sm"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Navbar.Brand as={Link} to="/">
        G Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
