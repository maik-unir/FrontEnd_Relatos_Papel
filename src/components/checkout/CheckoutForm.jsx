import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

const CheckoutForm = () => {
  // Estado para dirección de envío (null por defecto)
  const [direccionEnvio, setDireccionEnvio] = useState(null);

  // Estado para método de envío (null por defecto)
  const [metodoEnvio, setMetodoEnvio] = useState(null);

  // Estados para mostrar/ocultar formularios inline
  const [editingDireccion, setEditingDireccion] = useState(false);
  const [editingEnvio, setEditingEnvio] = useState(false);

  // Estados temporales para formularios
  const [tempDireccion, setTempDireccion] = useState({
    calle: "",
    ciudad: "",
    estado: "",
    codigoPostal: ""
  });
  const [tempEnvio, setTempEnvio] = useState(null);

  // Métodos de envío disponibles
  const metodosEnvioDisponibles = [
    { tipo: "Entrega en puerta", precio: 2.20 },
    { tipo: "Entrega estándar", precio: 5.00 },
    { tipo: "Entrega express", precio: 10.50 },
    { tipo: "Recogida en tienda", precio: 0.00 }
  ];

  // Verificar si hay dirección guardada
  const tieneDireccion = direccionEnvio !== null;

  // Verificar si hay método de envío guardado
  const tieneEnvio = metodoEnvio !== null;

  // Iniciar edición/agregado de dirección
  const handleEditDireccion = () => {
    if (direccionEnvio) {
      setTempDireccion(direccionEnvio);
    } else {
      setTempDireccion({
        calle: "",
        ciudad: "",
        estado: "",
        codigoPostal: ""
      });
    }
    setEditingDireccion(true);
  };

  // Guardar dirección
  const handleSaveDireccion = () => {
    setDireccionEnvio(tempDireccion);
    setEditingDireccion(false);
  };

  // Cancelar edición de dirección
  const handleCancelDireccion = () => {
    if (direccionEnvio) {
      setTempDireccion(direccionEnvio);
    } else {
      setTempDireccion({
        calle: "",
        ciudad: "",
        estado: "",
        codigoPostal: ""
      });
    }
    setEditingDireccion(false);
  };

  // Iniciar edición/agregado de envío
  const handleEditEnvio = () => {
    if (metodoEnvio) {
      setTempEnvio(metodoEnvio);
    } else {
      setTempEnvio(metodosEnvioDisponibles[0]);
    }
    setEditingEnvio(true);
  };

  // Guardar método de envío
  const handleSaveEnvio = () => {
    setMetodoEnvio(tempEnvio);
    setEditingEnvio(false);
  };

  // Cancelar edición de envío
  const handleCancelEnvio = () => {
    if (metodoEnvio) {
      setTempEnvio(metodoEnvio);
    } else {
      setTempEnvio(null);
    }
    setEditingEnvio(false);
  };

  // Formatear dirección para mostrar
  const formatearDireccion = () => {
    if (!direccionEnvio) return "No se ha agregado una dirección";
    return `${direccionEnvio.calle}, ${direccionEnvio.ciudad}, ${direccionEnvio.estado} ${direccionEnvio.codigoPostal}`;
  };

  // Formatear método de envío para mostrar
  const formatearEnvio = () => {
    if (!metodoEnvio) return "No se ha seleccionado un método de envío";
    return `${metodoEnvio.tipo}, $${metodoEnvio.precio.toFixed(2)}`;
  };

  return (
    <Card className="p-3 shadow-sm mb-4">
      <Card.Body>
        {/* Dirección de envío */}
        <div className="mb-3">
          <strong>Dirección de envío</strong>
          {!editingDireccion ? (
            <div className="d-flex justify-content-between align-items-center">
              <span className={!tieneDireccion ? "text-muted" : ""}>{formatearDireccion()}</span>
              <Button variant="link" size="sm" onClick={handleEditDireccion}>
                {tieneDireccion ? "Editar" : "Agregar"}
              </Button>
            </div>
          ) : (
            <div className="mt-2 p-3 border rounded">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    type="text"
                    value={tempDireccion.calle}
                    onChange={(e) => setTempDireccion({ ...tempDireccion, calle: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    value={tempDireccion.ciudad}
                    onChange={(e) => setTempDireccion({ ...tempDireccion, ciudad: e.target.value })}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        type="text"
                        value={tempDireccion.estado}
                        onChange={(e) => setTempDireccion({ ...tempDireccion, estado: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Código Postal</Form.Label>
                      <Form.Control
                        type="text"
                        value={tempDireccion.codigoPostal}
                        onChange={(e) => setTempDireccion({ ...tempDireccion, codigoPostal: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex gap-2 justify-content-end">
                  <Button variant="secondary" size="sm" onClick={handleCancelDireccion}>
                    Cancelar
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSaveDireccion}>
                    Guardar
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>

        {/* Método de envío */}
        <div className="mb-3">
          <strong>Método de envío</strong>
          {!editingEnvio ? (
            <div className="d-flex justify-content-between align-items-center">
              <span className={!tieneEnvio ? "text-muted" : ""}>{formatearEnvio()}</span>
              <Button variant="link" size="sm" onClick={handleEditEnvio}>
                {tieneEnvio ? "Editar" : "Agregar"}
              </Button>
            </div>
          ) : (
            <div className="mt-2 p-3 border rounded">
              <Form>
                {metodosEnvioDisponibles.map((metodo, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    name="metodoEnvio"
                    label={`${metodo.tipo} - $${metodo.precio.toFixed(2)}`}
                    checked={tempEnvio && tempEnvio.tipo === metodo.tipo}
                    onChange={() => setTempEnvio(metodo)}
                    className="mb-2"
                  />
                ))}
                <div className="d-flex gap-2 justify-content-end mt-3">
                  <Button variant="secondary" size="sm" onClick={handleCancelEnvio}>
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

   
        <h6 className="mt-4 mb-3">Método de pago</h6>

        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Número de tarjeta" />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control type="text" placeholder="Nombre en la tarjeta" />
            </Col>
            <Col md={3} className="mt-2 mt-md-0">
              <Form.Control type="text" placeholder="MM/AAAA" />
            </Col>
            <Col md={3} className="mt-2 mt-md-0">
              <Form.Control type="text" placeholder="CVV" />
            </Col>
          </Row>

          <h6 className="mt-4">Dirección de entrega</h6>
          <Form.Check
            type="radio"
            label="Misma dirección de compra"
            name="direccionEntrega"
            defaultChecked
          />
          <Form.Check
            type="radio"
            label="Usar dirección diferente para la entrega"
            name="direccionEntrega"
            className="mb-3"
          />

       
          <Form.Check
            type="checkbox"
            label="Guardar mi información para futuras compras"
            className="mb-4"
          />

          <div className="d-flex justify-content-between align-items-center">
            <Button variant="link">&lt; Volver a Información del cliente</Button>
            <Button variant="primary">Completar Orden</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CheckoutForm;
