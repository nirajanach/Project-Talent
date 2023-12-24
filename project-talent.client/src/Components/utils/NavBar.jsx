import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";


function NavBar() {

  return (
    <Navbar bg="dark" className="rounded mb-3" expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand target="/">React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link
              className="navbar-item"
              activeClassName="is-active"
              href="/"
              exact
            >
              Home
            </Nav.Link> */}
            <Link className="navbar-item nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/blogs">
              Blogs
            </Link>
            <Link className="nav-link" to="/stores">
              Stores
            </Link>
            <Link className="nav-link" to="/products">
              Products
            </Link>
            <Link className="nav-link" to="/customers">
              Customers
            </Link>

            {/* <Nav.Link href="#link">Products</Nav.Link>
            <Nav.Link href="#link">Stores</Nav.Link>
            <Nav.Link href="#link">Sales</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
