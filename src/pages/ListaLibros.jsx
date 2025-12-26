import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
    <Container>
      <header className="mb-5 text-center">
        <h1>Bienvenido a tu libreria Digital</h1>
        <p className="lead">Descubre miles de libros fisicos y digitales.</p>
      </header>
      <h1>Lista de Libros (página principal)</h1>
    </Container>
    <Footer />
    </>
  );
};

export default HomePage;