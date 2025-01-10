import { useEffect, useRef, useState } from "react";
import Table from "../../components/dashboard/Table";
import "../scss/Usuarios.scss";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const FormCliente = ({ onClose }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Cierra el modal al hacer clic fuera.
    }
  };


  return (
    <div className="form-modal">
      <div className="form-content">
        <h1>Agregar Cliente</h1>
        <form>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" />
          <label htmlFor="apellido">Apellido</label>
          <input type="text" id="apellido" />
          <label htmlFor="dni">DNI</label>
          <input type="text" id="dni" />
          <label htmlFor="telefono">Telefono</label>
          <input type="text" id="telefono" />
        </form>
      </div>
    </div>
  );
};

export const Usuarios = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

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
        fetch("http://localhost:8080/clientes/listar/" + cliente.id)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
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
              navigate("agregar");
            }}
          >
            AgregarCliente
          </Button>
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
      <Outlet />
    </>
  );
};
