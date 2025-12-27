import {Button} from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import Badge from 'react-bootstrap/Badge';
import {Link} from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


const IconCarrito = () => {

   const { getTotalItems, getTotalPrice  } = useContext(CartContext);

    return (

        <Link to="/carrito">
                <Button variant="outline-light">
                    <Cart className="me-2" /><Badge bg="danger">{getTotalPrice()}</Badge>  
                </Button>
        </Link>
        
    );
};

export default IconCarrito;