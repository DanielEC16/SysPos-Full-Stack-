import { Link, Outlet } from "react-router-dom";
import "./Navbar.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faBasketShopping,
  faCircleChevronLeft,
  faCircleChevronRight,
  faHouse,
  faTruckFast,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isActive, setIsActive] = useState(true);
  const menuNav = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <div className="admin-dashboard">
        <div className={`ds-left-menu ${isActive ? "menu-active" : ""}`}>
          <button className="btn-menu" onClick={menuNav}>
            <FontAwesomeIcon
              icon={isActive ? faCircleChevronRight : faCircleChevronLeft}
            />
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
                  <FontAwesomeIcon icon={faHouse} />
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/productos">
                  <FontAwesomeIcon icon={faTruckFast} />
                  <span>Productos</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/ventas">
                  <FontAwesomeIcon icon={faBasketShopping} />
                  <span>Ventas</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/usuarios">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Usuarios</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sign-off">
            <Link to="/login" className="btn-sign-off">
              <FontAwesomeIcon icon={faArrowRightToBracket} />
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
