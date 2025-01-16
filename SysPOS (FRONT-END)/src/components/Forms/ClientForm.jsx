import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export const ClientFormAdd = ({ show, intercalarView, listar }) => {
  const [validated, setValidated] = useState(false);
  const [newClient, setNewClient] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
  });

  const agregarCliente = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await fetch("http://localhost:8080/clientes/guardar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newClient),
        });
        listar();
        intercalarView();
        setNewClient({ nombre: "", apellido: "", dni: "", telefono: "" });
      } catch (error) {
        console.error("error al agregar cliente", error);
      } finally {
        setValidated(true);
      }
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={intercalarView}
        centered
        data-bs-theme="dark"
        className="text-white"
      >
        <Form noValidate validated={validated} onSubmit={agregarCliente}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Cliente</Modal.Title>
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
                    value={newClient.nombre || ""}
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
                    value={newClient.apellido || ""}
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
                    value={newClient.dni || ""}
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
                    value={newClient.telefono || ""}
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
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
            <Button variant="secondary" onClick={intercalarView}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export const ClientFormEdit = ({
  show,
  intercalarView,
  dataClientEdit,
  listar,
}) => {
  const [validated, setValidated] = useState(false);
  const [editClient, setEditClient] = useState(
    dataClientEdit || { nombre: "", apellido: "", dni: "", telefono: "" }
  );

  useEffect(() => {
    if (dataClientEdit) {
      setEditClient(dataClientEdit);
    }
  }, [dataClientEdit]);

  const editarCliente = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true)
      return;
    } else {
      try {
        const response = await fetch(
          "http://localhost:8080/clientes/actualizar/" + editClient.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editClient),
          }
        );
        listar();
        intercalarView();
      } catch (error) {
        console.error("Error al editar cliente:", error);
      } finally {
        setValidated(true);
      }
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={intercalarView}
        centered
        data-bs-theme="dark"
        className="text-white"
      >
        <Form noValidate validated={validated} onSubmit={editarCliente}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Cliente</Modal.Title>
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
                    value={editClient.nombre}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(
                        /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                        ""
                      );
                    }}
                    onChange={(e) =>
                      setEditClient({ ...editClient, nombre: e.target.value })
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
                    value={editClient.apellido}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(
                        /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                        ""
                      );
                    }}
                    onChange={(e) =>
                      setEditClient({ ...editClient, apellido: e.target.value })
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
                    value={editClient.dni}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    onChange={(e) =>
                      setEditClient({ ...editClient, dni: e.target.value })
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
                    value={editClient.telefono}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    onChange={(e) =>
                      setEditClient({ ...editClient, telefono: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
            <Button variant="secondary" onClick={intercalarView}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
