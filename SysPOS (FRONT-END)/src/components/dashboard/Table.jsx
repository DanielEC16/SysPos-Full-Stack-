import "./Table.scss";
const Table = ({ color ,columns = [], data = [], actions = [] }) => {
  return (
    <>
      <div className="table-container">
        <table className="align-middel content-table">
          <thead>
            <tr>
              <th>N°</th>
              {columns.map((column, index) => (
                <th key={index}>{column.header}</th>
              ))}
              {actions && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th>{rowIndex + 1}</th>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key]}</td>
                ))}
                {actions && (
                  <td>
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.onClick(row)}
                        className={`btn ${action.className}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>
        {`
          .content-table thead {
  background-color: ${color}; /* Fondo del encabezado */
  color: #ffffff;
}
.table-container::-webkit-scrollbar-track {
  background: linear-gradient(180deg, ${color} 44px, #ffffff 44px);
}
          `}
      </style>
    </>
  );
};

export default Table;
