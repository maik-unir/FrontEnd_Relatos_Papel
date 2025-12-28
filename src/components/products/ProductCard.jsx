import { Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";

const ProductCard = ({ book }) => {
  const isDisponible = book.estado === "Disponible" && book.cantidad > 0;

  return (
    <Card className="h-100 shadow-sm">
      <div style={{ height: "250px", overflow: "hidden" }}>
        <Card.Img
          src={book.fotos}
          alt={book.nombre}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
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
