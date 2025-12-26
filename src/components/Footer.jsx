import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import '../App.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Email subscribed:', email);
    setEmail('');
  };

  return (
    <footer style={{  }}>
      <Container>
        {/* Primera fila - Nombre, categorías y suscripción */}
        <Row className="align-items-center mb-3">
          <Col lg={8} className="mb-3 mb-lg-0">
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <span style={{ fontSize: '16px' }}>Nombre Sitio</span>
            </div>
          </Col>

          <Col lg={4}>
            <div className="d-flex gap-2 justify-content-lg-end">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  maxWidth: '250px',
                  backgroundColor: '#ffffff'
                }}
              />
              <Button 
                onClick={handleSubscribe}
                style={{ 
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  fontWeight: '400',
                  padding: '6px 20px'
                }}
              >
                Subscribe
              </Button>
            </div>
          </Col>
        </Row>

        {/* Segunda fila - Logos de pago */}
        <Row className="mb-3">
          <Col>
            <div className="d-flex gap-2">
                <FontAwesomeIcon icon={faCcVisa} size="2x" beat/>
                <FontAwesomeIcon icon={faCcMastercard} size="2x" beat/>
                <FontAwesomeIcon icon={faCcAmex} size="2x" beat/>
            </div>
          </Col>
        </Row>

        {/* Tercera fila - Copyright */}
        <Row>
          <Col className="text-center">
            <p style={{ margin: 0, fontSize: '14px' }}>
              {new Date().getFullYear()} Copyright © - Todos los derechos reservados
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;