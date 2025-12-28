import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const DetalleLibro = ({ libro }) => {
  return (
    <Card className="p-4 shadow-sm">
      <Row className="align-items-center">
        <Col md={4} className="text-center mb-3 mb-md-0">
          <Image
            src={libro.fotos}
            alt={libro.nombre}
            fluid
            rounded
            style={{ maxHeight: "400px" }}
          />
        </Col>

        <Col md={8}>
          <Card.Body>
            <Card.Title as="h2">{libro.nombre}</Card.Title>
            <Card.Text className="text-muted">
              {libro.descripcion}
            </Card.Text>

            <Button as={Link} to="/" variant="secondary">
              Volver
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DetalleLibro;