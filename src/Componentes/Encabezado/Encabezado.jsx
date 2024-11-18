import "./Encabezado.css";
import { useNavigate } from "react-router-dom";
import CerrarSession from "../CerrarSession/CerrarSession";

const Encabezado = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="overlay"></div>
      <h1 className="Titulo">Campo botánico</h1>
      <nav className="botones_encabezado">
        <button
          className="cerrarSession"
          onClick={() => navigate("/dashboard")}
        >
          Inicio
        </button>
        <button
          className="cerrarSession"
          onClick={() => navigate("/crudUsuarios")}
        >
          Administrar Usuarios
        </button>
        <button
          className="cerrarSession"
          onClick={() => navigate("/Crud_Bitacora")}
        >
          Administrar Bitacoras
        </button>
        <CerrarSession />
      </nav>
    </header>
  );
};

export default Encabezado;
