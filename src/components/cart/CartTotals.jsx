import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartTotals = ({ onClear }) => {
    const { cart, getTotalPrice } = useContext(CartContext);
    
    const subtotal = getTotalPrice() || 0;
    const shipping = subtotal > 0 ? 2.20 : 0;
    const taxes = subtotal * 0.07;
    const total = subtotal + shipping + taxes;

    return (
        <Card className="p-3">
            <h5 className="mb-3">
                Resumen ({cart.length} {cart.length === 1 ? "item" : "items"})
            </h5>
            <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <span>Impuestos:</span>
                <span>${taxes.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>

            {cart.length > 0 && (
                <Button variant="outline-danger" onClick={onClear} className="w-100">
                    Vaciar carrito
                </Button>
            )}
        </Card>
    );
};

export default CartTotals;
