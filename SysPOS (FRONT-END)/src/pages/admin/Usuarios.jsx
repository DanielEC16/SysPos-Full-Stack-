import { useEffect, useState } from "react";
import Table from "../../components/dashboard/Table";
import "../scss/Usuarios.scss";

const FormCliente = () => {
  const [newClient, setNewClient] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
  });

  return (
    <>
        <div className="modal fade text-white" id="form-cliente" data-bs-theme="dark">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-tittle fs-5">
                  DATOS DEL CLIENTE
                </h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal"
								aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="row m-0 g-3 needs-validation" novalidate>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

const Usuarios = () => {
  const [clientes, setClientes] = useState([]);

  const columns = [
    { header: "Nombre", key: "nombre" },
    { header: "Apellido", key: "apellido" },
    { header: "DNI", key: "dni" },
    { header: "telefono", key: "telefono" },
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
      onClick: (cliente) => alert(`Editar: ${cliente.id}`),
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
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#form-cliente">Agregar Cliente</button>
          <FormCliente />
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

export default Usuarios;
