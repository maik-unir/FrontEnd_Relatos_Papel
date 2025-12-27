import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductGrid = ({ books }) => {
    return (
        <Row className="g-4 mt-3">
            {books.map((book) => (
                <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard book={book} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductGrid;
