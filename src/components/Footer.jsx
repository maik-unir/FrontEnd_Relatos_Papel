import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from "@fortawesome/free-brands-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useNewsletter } from "../hooks/useNewsletter";

const Footer = () => {
  const { email, onEmailChange, onSubscribe } = useNewsletter();

  return (
    <footer className="py-4 footerBackground">
      <Container>

        <Row className="align-items-center mb-3">
          <Col lg={8}>
            <span className="d-inline-flex align-items-center gap-2 text-white fs-6">
              <FontAwesomeIcon icon={faBookOpen} size="2x" />
              Librería Digital
            </span>
          </Col>

          <Col lg={4}>
            <form
              onSubmit={onSubscribe}
              className="d-flex gap-2 justify-content-lg-end backgroundWhite p-2 maxW250"
            >
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={onEmailChange}
              />
              <Button type="submit">
                Suscríbete
              </Button>
            </form>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <div className="d-flex gap-3">
              <FontAwesomeIcon icon={faCcVisa} size="2x" beatnp />
              <FontAwesomeIcon icon={faCcMastercard} size="2x" beatnp />
              <FontAwesomeIcon icon={faCcAmex} size="2x" beatnp />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p className="fontSize14 colorWhite margin0">
              {new Date().getFullYear()} © Todos los derechos reservados
            </p>
          </Col>
        </Row>

      </Container>
    </footer>
  );
};

export default Footer;
