import React from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./CerrarSession.css";

const CerrarSession = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Se cerrará tu sesión!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div>
      <button className="cerrarSession" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default CerrarSession;
