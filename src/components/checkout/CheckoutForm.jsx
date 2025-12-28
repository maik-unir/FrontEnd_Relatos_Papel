import { Card, Form, Button, Row, Col } from "react-bootstrap";

const CheckoutForm = () => {
  return (
    <Card className="background-light p-3">
      <Card.Body>
        {/* Dirección de envío */}
        <div className="mb-3">
          <h4><strong>Dirección de envío</strong></h4>
          <div className="d-flex justify-content-between">
            <span>Calle 123, abc, NY 11200</span>
            <Button variant="link" size="sm">Editar</Button>
          </div>
        </div>

        {/* Método de envío */}
        <div className="mb-3">
          <h4><strong>Método de envío</strong></h4>
          <div className="d-flex justify-content-between">
            <span>Entrega en puerta, $2.20</span>
            <Button variant="link" size="sm">Editar</Button>
          </div>
        </div>

        {/* Método de pago */}
        <h4 className="mt-4 mb-3"><strong>Método de pago</strong></h4>

        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Número de tarjeta" />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control type="text" placeholder="Nombre en la tarjeta" />
            </Col>
            <Col md={3} className="mt-2 mt-md-0">
              <Form.Control type="text" placeholder="MM/AAAA" />
            </Col>
            <Col md={3} className="mt-2 mt-md-0">
              <Form.Control type="text" placeholder="CVV" />
            </Col>
          </Row>

          {/* Dirección de entrega */}
          <h6 className="mt-4">Dirección de entrega</h6>
          <Form.Check
            type="radio"
            label="Misma dirección de compra"
            name="direccionEntrega"
            defaultChecked
          />
          <Form.Check
            type="radio"
            label="Usar dirección diferente para la entrega"
            name="direccionEntrega"
            className="mb-3"
          />

          {/* Recordarme */}
          <Form.Check
            type="checkbox"
            label="Guardar mi información para futuras compras"
            className="mb-4"
          />

          <div className="d-flex justify-content-between align-items-center">
            <Button variant="link">&lt; Volver a Información del cliente</Button>
            <Button variant="primary">Completar Orden</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CheckoutForm;
