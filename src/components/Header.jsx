import {Navbar, Container, Button} from "react-bootstrap";
import IconCarrito from "./IconCarrito";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import logoHeader from "../assets/images/LibroHeader.png";


const Header = () => {
    return (
       
     <header>

      <Navbar variant="dark" expand="lg" role="navigation" className="custom-navbar-header">
        <Container>

          <Navbar.Brand
            as={Link}
            to="/"
            aria-label="Ir a la página principal de la librería digital"
            className="d-flex align-items-center"
          >
            <img
              src={logoHeader}
              alt=""
              aria-hidden="true"
              width="110"
              height="87"
              className="me-2"
            />
            <span className="fw-bold">Librería Digital</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="main-navbar"
          />

          <Navbar.Collapse id="main-navbar">
            <Nav as="ul" className="me-auto">

              <Nav.Item as="li">
                <Nav.Link as={Link} to="/">
                  | Inicio
                </Nav.Link>
              </Nav.Item>

              <Nav.Item as="li">
                <Nav.Link as={Link} to="/libros">
                  | Catálogo
                </Nav.Link>
              </Nav.Item>

            </Nav>

           <IconCarrito/>

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
    );
};


export default Header;
