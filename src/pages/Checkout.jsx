import CheckoutView from '../views/CheckoutView';

const Checkout = () => {
  return (
    <>
      <header className="mb-5 text-center">
        <h1>Bienvenido a tu libreria Digital</h1>
        <p className="lead">Descubre miles de libros fisicos y digitales.</p>
      </header>
      <CheckoutView />
    </>
  );
};

export default Checkout;