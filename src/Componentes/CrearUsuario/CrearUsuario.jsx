import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CrearUsuario.css";

function CrearUsuario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    console.log("Cuenta creada");
    // Lógica para crear cuenta aquí
  };

  const handleLoginRedirect = () => {
    navigate("/"); // Cambia "/login" a la ruta correspondiente si es necesario
  };

  return (
    <div className="create-account">
      <div className="login-background">
        <img
          src="https://wallpapers.com/images/hd/botanical-garden-1920-x-1080-wallpaper-l83b48hixd1iiozt.jpg"
          alt="Background"
        />
      </div>
      <div className="background-image">
        <div className="container">
          <img
            src="https://thumbs.dreamstime.com/b/texto-verde-de-la-palabra-escrita-mano-botanica-hoja-para-el-dise%C3%B1o-del-logotipo-tipograf%C3%ADa-138739737.jpg"
            alt="logo"
            className="logo-img"
          />
          <h2 className="title">Crear Cuenta</h2>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo"
            className="input"
          />

          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              className="input"
            />
            <span
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Ocultar" : "Mostrar"}
            </span>
          </div>

          <button onClick={handleCreateAccount} className="create-account-btn">
            Crear Cuenta
          </button>

          <div className="footer">
            <span>¿Ya tienes cuenta?</span>
            <button onClick={handleLoginRedirect} className="login-btn">
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;
