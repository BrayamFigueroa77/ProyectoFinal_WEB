import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import "./CrearUsuario.css";

import Swal from 'sweetalert2';


function CrearUsuario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    // Verificar si la contraseña y el email están vacíos antes de mostrar la alerta
    if (!email || !password) {
      Swal.fire({
        title: "¡Error!",
        text: "Por favor, complete todos los campos.",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }

    // Alerta de confirmación antes de crear la cuenta
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres crear esta cuenta con el correo: " + email + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, crear cuenta",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Crear cuenta con Firebase
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("Cuenta creada exitosamente", userCredential.user);
            Swal.fire({
              title: "¡Cuenta creada!",
              text: "Tu cuenta ha sido creada con éxito.",
              icon: "success",
              confirmButtonText: "OK"
            });
            navigate("/"); // Redirige al login después de crear la cuenta
          })
          .catch((error) => {
            console.error("Error al crear cuenta", error);
            Swal.fire({
              title: "¡Error!",
              text: "Hubo un problema al crear la cuenta.",
              icon: "error",
              confirmButtonText: "OK"
            });
          });
      }
    });
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
            <button onClick={() => navigate('/')} className="login-btn">
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;
