import { Container, Row, Col } from 'react-bootstrap';
import { useState } from "react";
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';

const CheckoutView = () => {
  const [shipping, setShipping] = useState({
    tipo: null,
    precio: 2.20
  });

  return (
    <Container>
      <Breadcrumb />
      <Row className='py-4'>
        <Col lg={8} md={12}>
          <CheckoutForm 
          shipping={shipping}
          setShipping={setShipping}
          />
        </Col>

        <Col lg={4} md={12}>
          <OrderSummary shipping={shipping.precio} />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutView;
