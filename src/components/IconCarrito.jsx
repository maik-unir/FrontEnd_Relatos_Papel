import {Button} from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import Badge from 'react-bootstrap/Badge';
import {Link} from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Dropdown from 'react-bootstrap/Dropdown';
import { Trash } from "react-bootstrap-icons";


const IconCarrito = () => {

    const { cart, dispatch, getTotalItems, getTotalPrice} = useContext(CartContext);

    return (
        <Dropdown align="end">
            <Dropdown.Toggle
                variant="outline-light"
                id="mini-cart"
                aria-label="Carrito de compras"
                className="position-relative"
            >
                <Cart aria-hidden="true" />

                {getTotalItems() > 0 && (
                <Badge
                    bg="danger"
                    pill
                    aria-hidden="true"
                    className="position-absolute top-0 start-100 translate-middle"
                >
                    {getTotalItems()}
                </Badge>
                )}
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-3 mini-cart-menu">
                {cart.length === 0 ? (
                <p className="mb-0 text-muted">
                    El carrito está vacío
                </p>
                ) : (
                <>
                    {/* LISTA DE ITEMS */}
                    <ul className="list-unstyled mb-3">
                    {cart.map(item => (
                        <li
                        key={item.id}
                        className="d-flex justify-content-between align-items-center mb-2"
                        >
                        <div>
                            <span className="fw-semibold">
                            {item.nombre}
                            </span>
                            <br />
                            <small className="text-muted">
                            Cantidad: {item.cantidad}
                            </small>
                        </div>

                        <Button
                            variant="link"
                            className="text-danger p-0"
                            aria-label={`Eliminar ${item.nombre} del carrito`}
                            onClick={() =>
                            dispatch({
                                type: "REMOVE",
                                payload: item.id
                            })
                            }
                        >
                            <Trash aria-hidden="true" />
                        </Button>
                        </li>
                    ))}
                    </ul>

                    {/* SUBTOTAL */}
                    <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Subtotal</span>
                    <span>${getTotalPrice()}</span>
                    </div>

                    {/* ACCIONES */}
                    <div className="d-grid gap-2">
                    <Button
                        variant="primary"
                        as={Link}
                        to="/carrito"
                    >
                        Ir al carrito
                    </Button>
                    </div>
                </>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
    };

export default IconCarrito;