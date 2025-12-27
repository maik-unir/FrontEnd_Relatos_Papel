import { Container, Row, Col } from 'react-bootstrap';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';

const CheckoutView = () => {
  return (
    <Container>
      <Row className='py-4'>
        <Col lg={8} md={12}>
          <CheckoutForm />
        </Col>

        <Col lg={4} md={12}>
          <OrderSummary />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutView;
