import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
const HomePage = () => {
  return (
    <>
      <header className="mb-5 text-center">
        <h1>Bienvenido a tu libreria Digital</h1>
        <p className="lead">Descubre miles de libros fisicos y digitales.</p>
      </header>
      <h1>Aquí checkout/proceso de compra (datos de cliente, método de pago...)</h1>
    <Footer />
    </>
  );
};

export default HomePage;