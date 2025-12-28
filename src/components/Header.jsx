import {Navbar, Container, Button} from "react-bootstrap";
import IconCarrito from "./IconCarrito";
import Nav from 'react-bootstrap/Nav';



const Header = () => {
    return (
       
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                 <Navbar.Brand href="/" className="d-flex align-items-center">
                   
                    <span className="fw-bold">Libreria Digital</span>
                </Navbar.Brand>
                 <Nav className="me-auto">
                    <Nav.Link href="ListaLibros">Lista Libros</Nav.Link>
                    <Nav.Link href="Carrito">Carrito</Nav.Link>
                </Nav>

                <IconCarrito/>

            </Container>
        </Navbar>
    );
};


export default Header;
