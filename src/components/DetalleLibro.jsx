import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const DetalleLibro = ({ libro }) => {
  const { dispatch } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  // Handler cantidad
  const handleQtyChange = (e) => {
    setCantidad(Number(e.target.value));
  };

  // Handler añadir al carrito
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: libro.id,
        nombre: libro.nombre,
        cantidad,
      },
    });
  };

  return (
    <Card className="p-4 shadow-sm">
      <Row>
        <Col md={8} className="text-center mb-3 mb-md-0">
          <img src={libro.fotos} alt={libro.nombre} fluid rounded className="detalle-img" />
        </Col>

        <Col md={4}>
          <Card.Body>
            <Card.Title as="div" className="d-flex justify-content-between align-items-center">
              
              <h2 className="mb-0">{libro.nombre}</h2>
              <span className="fs-4 fw-bold text-success"> ${libro.precio}</span>
              
            </Card.Title>

            <hr />

            <div className="mt-3">
              <label htmlFor="cantidad" className="form-label">
                <b>Cantidad</b>
              </label>
              <input id="cantidad" type="number" min="1" defaultValue="1" className="form-control" onChange={handleQtyChange} />
            </div>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-warning" onClick={handleAddToCart}>
                Añadir al carrito
              </button>

              <Link to="/" className="btn btn-secondary">
                Volver a inicio
              </Link>
            </div>
            
            <hr />

            <Card.Text className="text-muted">
              {libro.descripcion}
            </Card.Text>

          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DetalleLibro;