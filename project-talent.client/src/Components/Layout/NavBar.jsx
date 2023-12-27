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
            <Link className="navbar-item nav-link" to="/">
              Home
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
            <Link className="nav-link" to="/sales">
              Sales
            </Link>           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
