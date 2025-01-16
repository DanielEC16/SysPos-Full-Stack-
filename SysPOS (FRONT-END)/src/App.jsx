import Login from "./pages/admin/Login";
import Productos from "./pages/admin/Productos";
import Navbar from "./components/dashboard/Navbar";
import Inicio from "./pages/admin/Inicio";
import Ventas from "./pages/admin/Ventas";
import { Route, Routes } from "react-router-dom";
import { Usuarios } from "./pages/admin/Usuarios";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Navbar />}>
          <Route path="inicio" element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
