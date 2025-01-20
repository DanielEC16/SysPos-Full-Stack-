import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ProductsTable } from "../../components/Tables/ProductsTable";
import "../scss/Usuarios.scss"
import { ProductFormAdd } from "../../components/Forms/ProductForm";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const modalAddShow = () => {
    setShowAddModal(!showAddModal);
  };
  const modalEditShow = () => {
    setShowEditModal(!showEditModal);
  };

  const listarProductos = async () => {
    try {
      const response = await fetch("http://localhost:8080/productos/listar");
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProd = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/productos/eliminar/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar el cliente");
      }
      listarProductos();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    listarProductos();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Productos</h2>
        <div className="agregar-producto">
          <Button onClick={modalAddShow}>Agregar Producto</Button>
        </div>
      </div>
      <div className="tabla-productos">
        <ProductsTable dataProducts={productos} deletedProd={deleteProd}/>
      </div>
      <ProductFormAdd
      show={showAddModal}
      intercalarView={modalAddShow}
      listar={listarProductos}/>
    </>
  );
};

export default Productos;
