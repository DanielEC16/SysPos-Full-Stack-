import { useEffect, useState } from "react";
import Table from "../../components/dashboard/Table";
import "../scss/Usuarios.scss";
import { Button, Modal} from "react-bootstrap";

const FormCliente = ({view,action}) => {
  const [newClient, setNewClient] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
  });

  return (
    <>
      <Modal show={view} onHide={action} centered data-bs-theme="dark" className="text-white">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={action}>
            Close
          </Button>
          <Button variant="primary" onClick={action}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Usuarios = () => {
  const [addCliente, setAddCliente] = useState(false);

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
          <Button onClick={()=>setAddCliente(true)}>Agregar Cliente</Button>
          <FormCliente view={addCliente} action={() => setAddCliente(false)}/>
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
