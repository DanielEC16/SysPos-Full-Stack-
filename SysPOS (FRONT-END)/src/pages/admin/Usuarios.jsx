import { useEffect, useRef, useState } from "react";
import "../scss/Usuarios.scss";
import { Button } from "react-bootstrap";
import { ClientsTable } from "../../components/Tables/ClientsTable";

export const Usuarios = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/clientes/listar");
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setClients(data); // Actualiza los clientes
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteCli = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/eliminar/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el cliente");
      }

      // Actualizar la lista de clientes después de eliminar
      setClients(clients.filter(client => client.id !== id));
      console.log("Cliente borrado exitosamente");
    } catch (err) {
      setError(err.message);
    }
  };

  const editCli = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/listar/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del cliente");
      }

      const data = await response.json();
      console.log("Datos del cliente para editar:", data);
      // Aquí puedes actualizar el estado para mostrar el formulario de edición
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
        <h1>Usuarios</h1>
        <div className="agregar-cliente">
          <Button>Agregar Cliente</Button>
        </div>
      </div>
      <div className="tabla-clientes">
        <ClientsTable deletedClient={deleteCli}
          editClient={editCli}
          dataClients={clients} />
      </div>
    </>
  );
};
