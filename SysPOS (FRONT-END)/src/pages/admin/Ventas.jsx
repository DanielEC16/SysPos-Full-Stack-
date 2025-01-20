import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { VentasTable } from "../../components/Tables/VentasTable";
import { VentaFormAdd } from "../../components/Forms/VentaForm";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const modalAddShow = () => {
    setShowAddModal(!showAddModal);
  };
  const modalEditShow = () => {
    setShowEditModal(!showEditModal);
  };

  const listarVentas = async () => {
    try{
      const response = await fetch("http://localhost:8080/operaciones/listar")
      const data = await response.json()
      console.log(data)
      setVentas(data)
    }catch (error){
      console.log(error)
    }
  }
  useEffect(()=>{
    listarVentas()
  },[])
  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Ventas</h2>
        <div className="agregar-venta">
          <Button onClick={modalAddShow}>Generar nueva venta</Button>
        </div>
      </div>
      <div className="tabla-ventas">
        <VentasTable dataVentas={ventas} />
      </div>
      <VentaFormAdd show={showAddModal} intercalarView={modalAddShow} listar={listarVentas}/>
    </>
  );
};
export default Ventas;
