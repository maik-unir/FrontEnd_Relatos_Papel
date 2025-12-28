import { Card, Form, Button } from "react-bootstrap";

const OrderSummary = () => {
  return (
    <Card className="text-bg-secondary bg-opacity-25 p-3 shadow-lg text-dark">
      <Card.Body>
        <h5 className="mb-3"><strong>Resumen (1 item)</strong></h5>

        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>$20.00</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Envío</span>
          <span>$2.20</span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span>Impuestos (estimados)</span>
          <span>$1.40</span>
        </div>

        {/* <Form.Group className="mb-3">
          <Form.Label>Código de descuento</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control type="text" />
            <Button variant="secondary">Validar</Button>
          </div>
        </Form.Group> */}

        <hr />

        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>$23.60</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderSummary;
