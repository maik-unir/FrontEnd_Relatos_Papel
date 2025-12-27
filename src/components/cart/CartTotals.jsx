import { Card, Button } from "react-bootstrap";

const CartTotals = ({ items, onClear }) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 9 : 0;
    const taxes = subtotal * 0.08;
    const total = subtotal + shipping + taxes;

    return (
        <Card className="p-3">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Envío: ${shipping.toFixed(2)}</p>
            <p>Impuestos: ${taxes.toFixed(2)}</p>
            <hr />
            <h5>Total: ${total.toFixed(2)}</h5>

            <Button variant="outline-danger" onClick={onClear}>
                Vaciar carrito
            </Button>
        </Card>
    );
};

export default CartTotals;
