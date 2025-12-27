import { Navbar, Container, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar  expand="lg">
        <Container>
          <Navbar.Brand href="/">Front end creado en React para Proyecto transversal Relatos de papel - MISSI Unir 2025-2026</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Caterogia 1</Nav.Link>
            <Nav.Link href="/porDefinir">Caterogia 2</Nav.Link>
            <Nav.Link href="/porDefinir">Caterogia 3</Nav.Link>
            <Nav.Link href="/porDefinir">Caterogia 4</Nav.Link>
          </Nav>
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