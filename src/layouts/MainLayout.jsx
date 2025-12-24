import { Navbar, Container, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
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

      <footer className="text-center py-3 bg-light mt-auto">
        <p>&copy; 2025 - Relatos de papel - MISSI Unir 2025-2026</p>
      </footer>
    </>
  );
};

export default MainLayout;