import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "react-bootstrap";
import CheckoutView from '../views/CheckoutView';

const Checkout = () => {

  const { cart, dispatch } = useContext(CartContext);

  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("cart");
      console.log("🛒 libros en el carrito: 0");
    } else {
      console.log("🛒 libros en el carrito:", cart);
    }
  }, [cart]);

  // Handler para limpiar carrito
    const handleClearCart = () => {
      dispatch({ type: "CLEAR" });
    };


  return (
    <>
{/*       <header className="mb-5 text-center">
        <h1>Bienvenido a tu libreria Digital</h1>
        <p className="lead">Descubre miles de libros fisicos y digitales.</p>
      </header> */}
      {/* <Button
          className="m-2"
          variant="outline-danger"
          size="sm"
          onClick={handleClearCart}
        >
          Limpiar carrito
        </Button> */}
      <CheckoutView />

    </>
  );
};

export default Checkout;