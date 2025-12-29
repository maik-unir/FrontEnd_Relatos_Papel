import { Card } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const OrderSummary = ({ shipping }) => {
  const { cart, getTotalPrice } = useContext(CartContext);

  const subtotal = getTotalPrice();
const shippingCost = shipping ?? 2.20;
const taxes = parseFloat((subtotal * 0.07).toFixed(2));
const total = (subtotal + shippingCost + taxes).toFixed(2);

  return (
    <Card className="text-bg-secondary bg-opacity-25 p-3 shadow-sm text-dark">
      <Card.Body>
        <h5 className="mb-3">
          <strong>
            Resumen ({cart.length} {cart.length === 1 ? "item" : "items"})
          </strong>
        </h5>

        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Envío</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span>Impuestos (estimados)</span>
          <span>${taxes.toFixed(2)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderSummary;
