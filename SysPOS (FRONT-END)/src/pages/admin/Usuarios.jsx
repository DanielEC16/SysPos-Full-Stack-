import { useEffect, useRef, useState } from "react";
import Table from "../../components/dashboard/Table";
import "../scss/Usuarios.scss";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const FormCliente = ({ show, accion, modo, listaClientes ,clienteEdit}) => {
  const [newClient, setNewClient] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (modo === "editar" && clienteEdit) {
      setNewClient(clienteEdit);
    }
  }, [modo, clienteEdit]);

  const agregarCliente = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    e.preventDefault();
    const url =
      modo === "editar"
        ? `http://localhost:8080/clientes/listar/${clienteEdit.id}`
        : "http://localhost:8080/clientes/guardar";
    const method = modo === "editar" ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    })
      .then((response) => response.json())
      .then(() => {
        setNewClient({
          nombre: "",
          apellido: "",
          dni: "",
          telefono: "",
        });
        setValidated(false); // Reinicia la validación
        accion(); // Cierra el modal
        listaClientes();
      });
  };

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

export const Usuarios = () => {
  const [clientes, setClientes] = useState([]);
  const [show, setShow] = useState(false);
  const [modo, setModo] = useState("agregar");
  const [clienteEdit, setClienteEdit] = useState(null);

  const columns = [
    { header: "Nombre", key: "nombre" },
    { header: "Apellido", key: "apellido" },
    { header: "DNI", key: "dni" },
    { header: "Telefono", key: "telefono" },
  ];

  const listaClientes = () => {
    fetch("http://localhost:8080/clientes/listar")
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
        console.log(data);
      });
  };

  const actionsCliente = [
    {
      label: "Editar",
      className: "btn-edit",
      onClick: (cliente) => {
        setModo("editar");
        setClienteEdit(cliente);
        setShow(true);
      },
    },
    {
      label: "Eliminar",
      className: "btn-delete",
      onClick: (cliente) => {
        fetch("http://localhost:8080/clientes/eliminar/" + cliente.id, {
          method: "DELETE",
        }).then(() => {
          listaClientes();
        });
      },
    },
  ];
  useEffect(() => {
    listaClientes();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>Usuarios</h1>
        <div className="agregar-cliente">
          <Button
            onClick={() => {
              setModo("agregar");
              setShow(true);
              setClienteEdit(null);
            }}
          >
            Agregar Cliente
          </Button>
          <FormCliente
            show={show}
            accion={() => setShow(false)}
            modo ={modo}
            clienteEdit ={clienteEdit}
            listaClientes={listaClientes}
          />
        </div>
      </div>
      <div className="tabla-clientes">
        <Table
          color={"#000"}
          columns={columns}
          data={clientes}
          actions={actionsCliente}
        />
      </div>
    </>
  );
};
