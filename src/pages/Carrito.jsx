import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import CartTotals from "../components/cart/CartTotals";
import { booksMock } from "../data/books.mock";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";

const Carrito = () => {
  const cartItems = booksMock.map((b) => ({ ...b, qty: 1 }));

  return (
    <>
      <Container className="py-4">
        <Breadcrumb />
        <Row>
          <Col md={8}>
            <h3>Productos en el carrito</h3>
            {/* Aquí luego va la lista real */}
          </Col>

          <Col md={4}>
            <CartTotals items={cartItems} onClear={() => alert("Carrito vacío")} />
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default Carrito;
