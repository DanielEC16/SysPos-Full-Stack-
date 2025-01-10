import Login from "./pages/admin/Login";
import Productos from "./pages/admin/Productos";
import Navbar from "./components/dashboard/Navbar";
import Inicio from "./pages/admin/Inicio";
import { FormCliente, Usuarios } from "./pages/admin/Usuarios";
import Ventas from "./pages/admin/Ventas";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Route, Routes } from "react-router-dom";
import { Table } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Navbar />}>
          <Route path="inicio" element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="usuarios" element={<Usuarios />}>
            <Route path="agregar" element={<FormCliente />} />
            <Route path="editar-:id" element={<FormCliente/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
