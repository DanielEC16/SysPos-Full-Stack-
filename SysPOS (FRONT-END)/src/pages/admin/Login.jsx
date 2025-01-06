import { Link, Outlet } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1>Este es el Login</h1>
      <Link to="/dashboard/productos">Iniciar</Link>
      <Outlet />
    </>
  );
};
export default Login;
