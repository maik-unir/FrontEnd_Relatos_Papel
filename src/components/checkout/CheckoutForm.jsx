import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const METODOS_ENVIO = [
  { tipo: "Entrega en puerta", precio: 2.2 },
  { tipo: "Entrega estándar", precio: 5.0 },
  { tipo: "Entrega express", precio: 10.5 },
  { tipo: "Recogida en tienda", precio: 0.0 },
];

const FRANQUICIAS = {
  visa: "VISA",
  mastercard: "Mastercard",
  amex: "AMEX",
  discover: "Discover",
  diners: "Diners",
};

const cardUtils = {
  identificarFranquicia: (numero) => {
    const num = numero.replace(/\s/g, "");
    if (/^4/.test(num)) return "visa";
    if (/^5[1-5]/.test(num)) return "mastercard";
    if (/^3[47]/.test(num)) return "amex";
    if (/^6(?:011|5)/.test(num)) return "discover";
    if (/^3[0689]/.test(num)) return "diners";
    return null;
  },

  formatearNumero: (num, franchise) => {
    const clean = num.replace(/\D/g, "");
    if (franchise === "amex") {
      return (
        clean.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3") ||
        clean.match(/.{1,4}/g)?.join(" ") ||
        clean
      );
    }
    return clean.match(/.{1,4}/g)?.join(" ") || clean;
  },

  validarLuhn: (numero) => {
    const num = numero.replace(/\s/g, "");
    if (!/^\d+$/.test(num)) return false;

    let sum = 0;
    let isEven = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  },

  validarFecha: (fecha) => {
    if (!/^\d{2}\/\d{2,4}$/.test(fecha)) return false;

    const [mes, añoStr] = fecha.split("/");
    const mesNum = parseInt(mes);
    let añoNum = parseInt(añoStr);

    // Si el año tiene 2 dígitos, convertir a 4 (asumiendo 2000-2099)
    if (añoStr.length === 2) {
      añoNum = 2000 + añoNum;
    }

    const ahora = new Date();
    const añoActual = ahora.getFullYear();
    const mesActual = ahora.getMonth() + 1;

    return (
      mesNum >= 1 &&
      mesNum <= 12 &&
      (añoNum > añoActual || (añoNum === añoActual && mesNum >= mesActual))
    );
  },

  validarCVV: (cvv, franchise) => {
    return (
      /^\d+$/.test(cvv) &&
      (franchise === "amex" ? cvv.length === 4 : cvv.length === 3)
    );
  },

  validarNombre: (nombre) => {
    return (
      nombre.trim().length >= 3 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)
    );
  },
};

const CheckoutForm = ({ shipping, setShipping }) => {
  const navigate = useNavigate();
  const { getTotalPrice } = useContext(CartContext);

  const [direccionEnvio, setDireccionEnvio] = useState(null);
  const [metodoEnvio, setMetodoEnvio] = useState(null);
  const [editingDireccion, setEditingDireccion] = useState(false);
  const [editingEnvio, setEditingEnvio] = useState(false);
  const [tempDireccion, setTempDireccion] = useState({
    calle: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
  });
  const [tempEnvio, setTempEnvio] = useState(null);

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    franchise: null,
  });
  const [errors, setErrors] = useState({});
  const [direccionEntrega, setDireccionEntrega] = useState("misma");
  const [guardarInfo, setGuardarInfo] = useState(false);

  const updateError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const updateCardData = (field, value) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditDireccion = () => {
    setTempDireccion(
      direccionEnvio || { calle: "", ciudad: "", estado: "", codigoPostal: "" }
    );
    setEditingDireccion(true);
  };

  const handleSaveDireccion = () => {
    setDireccionEnvio(tempDireccion);
    setEditingDireccion(false);
  };

  const handleCancelDireccion = () => {
    setTempDireccion(
      direccionEnvio || { calle: "", ciudad: "", estado: "", codigoPostal: "" }
    );
    setEditingDireccion(false);
  };

  // Handlers de envío
  const handleEditEnvio = () => {
    setTempEnvio(metodoEnvio || METODOS_ENVIO[0]);
    setEditingEnvio(true);
  };

  const handleSaveEnvio = () => {
    setMetodoEnvio(tempEnvio);
    setShipping(tempEnvio);
    setEditingEnvio(false);
  };

  const handleCancelEnvio = () => {
    setTempEnvio(metodoEnvio || null);
    setEditingEnvio(false);
  };

  const handleCardNumber = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    const franchise = cardUtils.identificarFranquicia(valor);
    const maxLength = franchise === "amex" ? 15 : 16;

    if (valor.length <= maxLength) {
      const formateado = cardUtils.formatearNumero(valor, franchise);
      updateCardData("franchise", franchise);
      updateCardData("number", formateado);

      if (valor.length === maxLength) {
        updateError(
          "cardNumber",
          cardUtils.validarLuhn(valor) ? "" : "Número de tarjeta inválido"
        );
      } else {
        updateError("cardNumber", "");
      }
    }
  };

  const handleCardName = (e) => {
    const valor = e.target.value;
    updateCardData("name", valor);
    updateError(
      "cardName",
      valor && !cardUtils.validarNombre(valor) ? "Ingrese un nombre válido" : ""
    );
  };

  const handleCardExpiry = (e) => {
    let valor = e.target.value.replace(/\D/g, "");

    // Formatear: MM/AA o MM/AAAA
    if (valor.length >= 2) {
      if (valor.length <= 4) {
        // Formato corto MM/AA
        valor = valor.substring(0, 2) + "/" + valor.substring(2, 4);
      } else {
        // Formato largo MM/AAAA
        valor = valor.substring(0, 2) + "/" + valor.substring(2, 6);
      }
    }

    updateCardData("expiry", valor);

    // Validar cuando tenga formato completo (MM/AA o MM/AAAA)
    if (valor.length === 5 || valor.length === 7) {
      updateError(
        "cardExpiry",
        cardUtils.validarFecha(valor) ? "" : "Fecha inválida"
      );
    } else {
      updateError("cardExpiry", "");
    }
  };

  const handleCardCvv = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    const maxLength = cardData.franchise === "amex" ? 4 : 3;

    if (valor.length <= maxLength) {
      updateCardData("cvv", valor);
      if (valor.length === maxLength) {
        updateError(
          "cardCvv",
          cardUtils.validarCVV(valor, cardData.franchise) ? "" : "CVV inválido"
        );
      } else {
        updateError("cardCvv", "");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    const cardNum = cardData.number.replace(/\s/g, "");
    if (!cardNum || cardNum.length < 13 || !cardUtils.validarLuhn(cardNum)) {
      newErrors.cardNumber = "Número de tarjeta inválido";
      isValid = false;
    }
    if (!cardData.name || !cardUtils.validarNombre(cardData.name)) {
      newErrors.cardName = "Ingrese un nombre válido";
      isValid = false;
    }
    if (!cardData.expiry || !cardUtils.validarFecha(cardData.expiry)) {
      newErrors.cardExpiry = "Fecha inválida";
      isValid = false;
    }
    if (
      !cardData.cvv ||
      !cardUtils.validarCVV(cardData.cvv, cardData.franchise)
    ) {
      newErrors.cardCvv = "CVV inválido";
      isValid = false;
    }

    setErrors(newErrors);
    if (isValid) {
      // Preparar datos de la orden para la confirmación
      const orderData = {
        customerName: cardData.name || "Estudiante UNIR",
        billingAddress: direccionEnvio
          ? {
              nombre: cardData.name || "Estudiante UNIR",
              calle: direccionEnvio.calle,
              ciudad: `${direccionEnvio.ciudad}, ${direccionEnvio.estado} ${direccionEnvio.codigoPostal}`,
              pais: "Logroño, España",
            }
          : null,
        shippingAddress: direccionEnvio
          ? {
              nombre: cardData.name || "Estudiante UNIR",
              calle: direccionEnvio.calle,
              ciudad: `${direccionEnvio.ciudad}, ${direccionEnvio.estado} ${direccionEnvio.codigoPostal}`,
              pais: "Logroño, España",
            }
          : null,
        shippingMethod: metodoEnvio
          ? {
              tipo: metodoEnvio.tipo,
              tiempo: "Tiempo de entrega estimado, 3 a 6 días",
            }
          : null,
        paymentMethod: {
          franchise: cardData.franchise || "visa",
          lastDigits: cardData.number.slice(-4).replace(/\s/g, "") || "3217",
        },
        shipping: shipping?.precio || 2.2,
        taxes: (getTotalPrice() * 0.07).toFixed(2),
      };

      // Redirigir a la página de confirmación con los datos
      navigate("/confirmacion", { state: { orderData } });
    }
  };

  const formatearDireccion = () => {
    return direccionEnvio
      ? `${direccionEnvio.calle}, ${direccionEnvio.ciudad}, ${direccionEnvio.estado} ${direccionEnvio.codigoPostal}`
      : "No se ha agregado una dirección";
  };

  const formatearEnvio = () => {
    return metodoEnvio
      ? `${metodoEnvio.tipo}, $${metodoEnvio.precio.toFixed(2)}`
      : "No se ha seleccionado un método de envío";
  };

  return (
    <Card className="p-3 shadow-sm mb-4">
      <Card.Body>
        {/* Dirección de envío */}
        <div className="mb-3">
          <strong>Dirección de envío</strong>
          {!editingDireccion ? (
            <div className="d-flex justify-content-between align-items-center">
              <span className={!direccionEnvio ? "text-muted" : ""}>
                {formatearDireccion()}
              </span>
              <Button variant="link" size="sm" onClick={handleEditDireccion}>
                {direccionEnvio ? "Editar" : "Agregar"}
              </Button>
            </div>
          ) : (
            <div className="mt-2 p-3 border rounded">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    value={tempDireccion.calle}
                    onChange={(e) =>
                      setTempDireccion({
                        ...tempDireccion,
                        calle: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    value={tempDireccion.ciudad}
                    onChange={(e) =>
                      setTempDireccion({
                        ...tempDireccion,
                        ciudad: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        value={tempDireccion.estado}
                        onChange={(e) =>
                          setTempDireccion({
                            ...tempDireccion,
                            estado: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Código Postal</Form.Label>
                      <Form.Control
                        value={tempDireccion.codigoPostal}
                        onChange={(e) =>
                          setTempDireccion({
                            ...tempDireccion,
                            codigoPostal: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex gap-2 justify-content-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCancelDireccion}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveDireccion}
                  >
                    Guardar
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>

        <div className="mb-3">
          <strong>Método de envío</strong>
          {!editingEnvio ? (
            <div className="d-flex justify-content-between align-items-center">
              <span className={!metodoEnvio ? "text-muted" : ""}>
                {formatearEnvio()}
              </span>
              <Button variant="link" size="sm" onClick={handleEditEnvio}>
                {metodoEnvio ? "Editar" : "Agregar"}
              </Button>
            </div>
          ) : (
            <div className="mt-2 p-3 border rounded">
              <Form>
                {METODOS_ENVIO.map((metodo, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    name="metodoEnvio"
                    label={`${metodo.tipo} - $${metodo.precio.toFixed(2)}`}
                    checked={tempEnvio?.tipo === metodo.tipo}
                    onChange={() => setTempEnvio(metodo)}
                    className="mb-2"
                  />
                ))}
                <div className="d-flex gap-2 justify-content-end mt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCancelEnvio}
                  >
                    Cancelar
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSaveEnvio}>
                    Guardar
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>

        <h6 className="mt-4 mb-3">
          Método de pago
          {cardData.franchise && (
            <span className="ms-2">{FRANQUICIAS[cardData.franchise]}</span>
          )}
        </h6>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tarjeta número</Form.Label>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={handleCardNumber}
                maxLength={cardData.franchise === "amex" ? 17 : 19}
                isInvalid={!!errors.cardNumber}
                className={cardData.franchise ? "pe-5" : ""}
              />
              {cardData.franchise && (
                <span
                  className="position-absolute end-0 top-50 translate-middle-y me-2"
                  style={{ fontSize: "1.2rem" }}
                >
                  💳
                </span>
              )}
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre de tarjeta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre completo"
                  value={cardData.name}
                  onChange={handleCardName}
                  isInvalid={!!errors.cardName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3} className="mt-2 mt-md-0">
              <Form.Group>
                <Form.Label>MM/AAAA</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/AAAA"
                  value={cardData.expiry}
                  onChange={handleCardExpiry}
                  maxLength={7}
                  isInvalid={!!errors.cardExpiry}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardExpiry}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3} className="mt-2 mt-md-0">
              <Form.Group>
                <Form.Label>
                  CVV{" "}
                  <span className="ms-1" title="Código de seguridad">
                    ?
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={cardData.franchise === "amex" ? "1234" : "123"}
                  value={cardData.cvv}
                  onChange={handleCardCvv}
                  maxLength={cardData.franchise === "amex" ? 4 : 3}
                  isInvalid={!!errors.cardCvv}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardCvv}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <h6 className="mt-4">Dirección de entrega</h6>
          <Form.Check
            type="radio"
            label="Misma dirección de compra"
            name="direccionEntrega"
            checked={direccionEntrega === "misma"}
            onChange={() => setDireccionEntrega("misma")}
          />
          <Form.Check
            type="radio"
            label="Usar dirección diferente para la entrega"
            name="direccionEntrega"
            checked={direccionEntrega === "diferente"}
            onChange={() => setDireccionEntrega("diferente")}
            className="mb-3"
          />

          <h6 className="mt-3 mb-2">Recordarme</h6>
          <Form.Check
            type="checkbox"
            label="Guardar mi información para futuras compras"
            checked={guardarInfo}
            onChange={(e) => setGuardarInfo(e.target.checked)}
            className="mb-4"
          />

          <div className="d-flex justify-content-between align-items-center">
            {/* <Button variant="link" type="button">
              &lt; Volver a Información del cliente
            </Button> */}
            <Button variant="primary" type="submit">
              Completar Orden
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CheckoutForm;
