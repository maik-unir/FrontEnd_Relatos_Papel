import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ConfirmOrder = ({ orderData }) => {
  const { cart, getTotalPrice } = useContext(CartContext);

  const orderNumber = orderData?.orderNumber || Math.floor(Math.random() * 1000000000).toString();
  
  // Datos del cliente (pueden venir de orderData o usar valores por defecto)
  const customerName = orderData?.customerName || "Estudiante UNIR";
  const billingAddress = orderData?.billingAddress || {
    nombre: "Estudiante UNIR",
    calle: "Calle 123, abc, NY 11200",
    ciudad: "Mishauken, NY 11200",
    pais: "Logroño, España"
  };
  const shippingAddress = orderData?.shippingAddress || billingAddress;
  const shippingMethod = orderData?.shippingMethod || {
    tipo: "UPS Ground",
    tiempo: "Tiempo de entrega estimado, 3 a 6 días"
  };
  const paymentMethod = orderData?.paymentMethod || {
    franchise: "visa",
    lastDigits: "3217"
  };

  // Calcular totales
  const subtotal = getTotalPrice();
  const shipping = orderData?.shipping || 2.20;
  const taxes = orderData?.taxes ? parseFloat(orderData.taxes) : parseFloat((subtotal * 0.07).toFixed(2));
  const total = (parseFloat(subtotal) + parseFloat(shipping) + taxes).toFixed(2);

  const franchiseNames = {
    visa: "VISA",
    mastercard: "Mastercard",
    amex: "AMEX",
    discover: "Discover",
    diners: "Diners"
  };

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          {/* Header con confirmación */}
          <div className="d-flex align-items-start mb-4">
            <div
              className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3"
              style={{ width: "60px", height: "60px", minWidth: "60px" }}
            >
              <span className="text-white" style={{ fontSize: "1.5rem" }}>✓</span>
            </div>
            <div>
              <p className="mb-1 text-muted">Orden {orderNumber}</p>
              <h2 className="mb-2 fw-bold">Gracias, {customerName}!</h2>
              <p className="mb-1 fw-semibold">Tu orden ha sido confirmada</p>
              <p className="text-muted mb-0">
                Hemos recibido tu orden y estamos procesando tu envío
              </p>
            </div>
          </div>

          {/* Información del cliente */}
          <div className="mb-4">
            <h5 className="mb-3 fw-bold">Información de cliente</h5>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <strong className="d-block mb-2">Dirección de Compra</strong>
                  <div className="text-muted">
                    <div>{billingAddress.nombre}</div>
                    <div>{billingAddress.calle}</div>
                    <div>{billingAddress.ciudad}</div>
                    <div>{billingAddress.pais}</div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <strong className="d-block mb-2">Dirección de Envío</strong>
                  <div className="text-muted">
                    <div>{shippingAddress.nombre}</div>
                    <div>{shippingAddress.calle}</div>
                    <div>{shippingAddress.ciudad}</div>
                    <div>{shippingAddress.pais}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Método de envío y pago */}
          <Row className="mb-4">
            <Col md={6}>
              <div>
                <strong className="d-block mb-2">Método de Envío</strong>
                <div className="text-muted">
                  {shippingMethod.tipo}
                  {shippingMethod.tiempo && (
                    <span className="d-block small">({shippingMethod.tiempo})</span>
                  )}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <strong className="d-block mb-2">Método de pago</strong>
                <div className="d-flex align-items-center text-muted">
                  <span className="me-2" style={{ fontSize: "1.2rem" }}>💳</span>
                  <span>
                    {franchiseNames[paymentMethod.franchise] || paymentMethod.franchise} 
                    {" "}Terminada en {paymentMethod.lastDigits} - ${total}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          {/* Botón para volver al home */}
          <div className="mt-4">
            <Button 
              as={Link}
              to="/"
              variant="primary"
              size="lg"
            >
              Volver al Inicio
            </Button>
          </div>
        </Col>

        {/* Resumen de la orden */}
        <Col lg={4}>
          <Card className="bg-light border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="mb-3 fw-bold">
                Resumen ({cart.length} {cart.length === 1 ? "item" : "items"})
              </h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Envío</span>
                <span>${parseFloat(shipping).toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Impuestos (estimados)</span>
                <span>${parseFloat(taxes).toFixed(2)}</span>
              </div>
              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmOrder;

