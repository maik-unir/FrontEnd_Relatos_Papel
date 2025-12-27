import { Navbar, Container, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import '../App.css';

const MainLayout = () => {
  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
        <FontAwesomeIcon icon={faCcVisa} size="2x" beat/>
          <Navbar.Brand href="/">Libreria Digital</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Caterogia 1 |</Nav.Link>
            <Nav.Link href="/porDefinir">Caterogia 2 |</Nav.Link>
            <Nav.Link href="/porDefinir">Caterogia 3 |</Nav.Link>
            <Nav.Link href="/porDefinir">Caterogia 4 </Nav.Link>
          </Nav>
          <FontAwesomeIcon icon={faCcVisa} size="2x" />
          <FontAwesomeIcon icon={faCcMastercard} size="2x" />
          <FontAwesomeIcon icon={faCcAmex} size="2x" />
        </Container>
      </Navbar>

      {/* Aquí es donde se renderizarán las páginas */}
      <main className="py-4">
        <Outlet /> 
      </main>

    
      <Footer />
    </>
  );
};

export default MainLayout;