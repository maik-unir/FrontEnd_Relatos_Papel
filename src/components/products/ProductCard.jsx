import { Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import "./ProductCard.css";

const ProductCard = ({ book }) => {
  const isDisponible = book.estado === "Disponible" && book.cantidad > 0;

  return (
    <Card className="product-card h-100 shadow-sm">
      <div className="product-card-img-wrapper">
        <Card.Img
          src={book.fotos}
          alt={book.nombre}
          className="product-card-img"
          onError={(e) => {
            e.target.src = "https://placehold.co/300x400?text=Libro";
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title>{book.nombre}</Card.Title>

        <Card.Text className="mb-2">
          <strong>${book.precio}</strong>
        </Card.Text>

        <div className="mb-2">
          <Badge bg={isDisponible ? "success" : "secondary"}>
            {book.estado}
          </Badge>
        </div>

        <Button
          as={Link}
          to={`/libros/${book.id}`}
          variant="warning"
          disabled={!isDisponible}
          className="mt-auto"
        >
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
