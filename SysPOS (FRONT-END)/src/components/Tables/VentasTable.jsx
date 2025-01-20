import { faCircleInfo, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const VentasTable = ({ dataVentas }) => {
  return (
    <>
      <div className="table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>DNI(Cliente)</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataVentas.map((venta, index) => (
              <tr key={venta.id}>
                <td>{index + 1}</td>
                <td>{venta.cliente.dni}</td>
                <td>{venta.fecha}</td>
                <td>{venta.total}</td>
                <td>{venta.estado}</td>
                <td className="d-flex gap-1">
                  <button className="btn btn-warning">
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </button>
                  <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
