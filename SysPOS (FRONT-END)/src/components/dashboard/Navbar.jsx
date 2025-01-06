import { Link, Outlet } from "react-router-dom";
import "./Navbar.scss";
import { useState } from "react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const menuNav = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <div className="admin-dashboard">
        <div className={`ds-left-menu ${isActive ? "menu-active" : ""}`}>
          <button className="btn-menu" onClick={menuNav}>
            <i
              className={`fa-solid ${
                isActive ? "fa-circle-chevron-right" : "fa-circle-chevron-left"
              }`}
            ></i>
          </button>
          <div className="ds-perfil">
            <div className="foto">
              <img
                src="https://raw.githubusercontent.com/juliocesardw/dasboard/main/perfil.jpg"
                alt="Foto de perfil"
              />
            </div>
            <div className="info-perfil">
              <span>Admin</span>
              <h3>Daniel</h3>
            </div>
          </div>
          <div className="ds-menu">
            <ul className="ps-0">
              <li>
                <Link to="/dashboard/inicio">
                  <i className="fa-solid fa-house"></i>
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/productos">
                  <i className="fa-solid fa-truck-fast"></i>
                  <span>Productos</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/ventas">
                  <i className="fa-solid fa-basket-shopping"></i>
                  <span>Ventas</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/usuarios">
                  <i className="fa-solid fa-user"></i>
                  <span>Usuarios</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sign-off">
            <Link to="/login" className="btn-sign-off">
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              <span>Cerrar Sesión</span>
            </Link>
          </div>
        </div>
        <div className={`ds-panel ${isActive ? "tab-menu" : ""}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Navbar;
