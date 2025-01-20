import { useEffect, useState } from "react";
import "../scss/Usuarios.scss";
import { Button } from "react-bootstrap";
import { ClientsTable } from "../../components/Tables/ClientsTable";
import {
  ClientFormAdd,
  ClientFormEdit,
} from "../../components/Forms/ClientForm";

export const Usuarios = () => {
  // Estado para guardar todos los clientes
  const [clients, setClients] = useState([]);

  // Estado para guardar un cliente seleccionado
  const [dataEdit, setDataEdit] = useState(null);

  // Estado de los modales de Editar cliente y Agregar cliente
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Estado de loaders y mensajes errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modalAddShow = () => {
    setShowAddModal(!showAddModal);
  };
  const modalEditShow = () => {
    setShowEditModal(!showEditModal);
  };

  const listClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/clientes/listar");
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteCli = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/clientes/eliminar/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el cliente");
      }

      // Actualizar la lista de clientes después de eliminar
      listClients();
      console.log("Cliente borrado exitosamente");
    } catch (err) {
      setError(err.message);
    }
  };

  const editCli = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/clientes/listar/${id}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos del cliente");
      }
      const data = await response.json();
      setDataEdit(data);
      setShowEditModal(true);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    listClients();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Usuarios</h2>
        <div className="agregar-cliente">
          <Button onClick={modalAddShow}>Agregar Cliente</Button>
        </div>
      </div>
      <div className="tabla-clientes">
        <ClientsTable
          deletedClient={deleteCli}
          editClient={editCli}
          dataClients={clients}
        />
      </div>
      <ClientFormAdd
        show={showAddModal}
        intercalarView={modalAddShow}
        listar={listClients}
      />
      <ClientFormEdit
        show={showEditModal}
        intercalarView={modalEditShow}
        dataClientEdit={dataEdit}
        listar={listClients}
      />
    </>
  );
};
