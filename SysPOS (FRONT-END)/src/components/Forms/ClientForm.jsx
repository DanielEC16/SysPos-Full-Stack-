import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const ClientForm = () => {
  return (
    <>
      <Modal
        show={show}
        onHide={accion}
        centered
        data-bs-theme="dark"
        className="text-white"
      >
        <Form noValidate validated={validated} onSubmit={agregarCliente}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modo === "editar" ? "Editar Cliente " : "Agregar Cliente"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md="6">
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    placeholder="Nombre"
                    type="text"
                    maxLength={20}
                    value={newClient.nombre}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(
                        /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                        ""
                      );
                    }}
                    onChange={(e) =>
                      setNewClient({ ...newClient, nombre: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    required
                    placeholder="Apellido"
                    type="text"
                    maxLength={20}
                    value={newClient.apellido}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(
                        /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                        ""
                      );
                    }}
                    onChange={(e) =>
                      setNewClient({ ...newClient, apellido: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Group>
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    required
                    placeholder="Ej:12345678"
                    type="text"
                    pattern="[0-9]{8}"
                    maxLength={8}
                    value={newClient.dni}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    onChange={(e) =>
                      setNewClient({ ...newClient, dni: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    required
                    placeholder="Ej:123456789"
                    type="text"
                    pattern="[0-9]{9}"
                    maxLength={9}
                    value={newClient.telefono}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    onChange={(e) =>
                      setNewClient({ ...newClient, telefono: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={accion}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
