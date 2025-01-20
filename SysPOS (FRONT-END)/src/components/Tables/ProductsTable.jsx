import "./Table.scss";

export const ProductsTable = ({editProd, deletedProd, dataProducts}) => {
    return(
        <>
        <div className="table-container">
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {dataProducts.map((product,index)=>(
                        <tr key={index}>
                            <th>{product.codigo}</th>
                            <th><img src={product.foto?product.foto:"/default.png"} alt="" width="50"/></th>
                            <td>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>{product.categoria.nombre}</td>
                            <td>
                                <button onClick={() => editProd(product.id)} className="btn btn-primary">Editar</button>
                                <button onClick={() => deletedProd(product.id)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>
        </div>
        </>
    )
}