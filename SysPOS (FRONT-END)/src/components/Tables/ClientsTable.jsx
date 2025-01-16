import { useState } from "react";
import "./Table.scss";
import { Loading } from "../dashboard/Loading";

export const ClientsTable = ({ editClient, deletedClient, dataClients }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <div className="table-container">
        {loading && <Loading />} {/* Muestra el loader */}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && (
          <table className="content-table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataClients.map((client, index) => (
                <tr key={index}>
                  <td>{client.id}</td>
                  <td>{client.nombre}</td>
                  <td>{client.apellido}</td>
                  <td>{client.dni}</td>
                  <td>{client.telefono}</td>
                  <td>
                    <button
                      onClick={() => editClient(client.id)}
                      className="btn btn-primary"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletedClient(client.id)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
