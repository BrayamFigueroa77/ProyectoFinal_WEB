import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai"; // Iconos importados

import "./CrearUsuario.css";

function CrearUsuario() {
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const esCorreoValido = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleCreateAccount = () => {
    if (!email || !password || !primerNombre || !primerApellido) {
      Swal.fire({
        title: "¡Error!",
        text: "Por favor, complete todos los campos.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validación del correo electrónico (debe contener un @)
    if (!esCorreoValido(email)) {
      Swal.fire({
        title: "¡Error!",
        text: "Por favor, ingresa un correo electrónico válido.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validación de la contraseña (debe tener al menos 6 caracteres)
    if (password.length < 6) {
      Swal.fire({
        title: "¡Error!",
        text: "La contraseña debe tener al menos 6 caracteres.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres crear esta cuenta con el correo: " + email + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, crear cuenta",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            // Agregar datos adicionales en Firestore
            const userData = {
              uid: user.uid,
              primerNombre,
              segundoNombre,
              primerApellido,
              segundoApellido,
              email,
              password,
              createdAt: new Date(),
            };

            addDoc(collection(db, "Usuarios"), userData)
              .then(() => {
                Swal.fire({
                  title: "¡Cuenta creada!",
                  text: "Tu cuenta ha sido creada con éxito.",
                  icon: "success",
                  confirmButtonText: "OK",
                });
                navigate("/"); // Redirige al login después de crear la cuenta
              })
              .catch((error) => {
                console.error("Error al guardar los datos en Firestore", error);
                Swal.fire({
                  title: "¡Error!",
                  text: "Hubo un problema al guardar los datos.",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              });
          })
          .catch((error) => {
            console.error("Error al crear cuenta", error);
            Swal.fire({
              title: "¡Error!",
              text: "Hubo un problema al crear la cuenta.",
              icon: "error",
              confirmButtonText: "OK",
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
          <h2 className="title">Crear Cuenta de Usuario</h2>

          <div className="input-group">
            <AiOutlineUser className="input-icon" />
            <input
              type="text"
              value={primerNombre}
              onChange={(e) => setPrimerNombre(e.target.value)}
              placeholder="Primer Nombre"
              className="input"
            />
          </div>

          <div className="input-group">
            <AiOutlineUser className="input-icon" />
            <input
              type="text"
              value={segundoNombre}
              onChange={(e) => setSegundoNombre(e.target.value)}
              placeholder="Segundo Nombre"
              className="input"
            />
          </div>

          <div className="input-group">
            <AiOutlineUser className="input-icon" />
            <input
              type="text"
              value={primerApellido}
              onChange={(e) => setPrimerApellido(e.target.value)}
              placeholder="Primer Apellido"
              className="input"
            />
          </div>

          <div className="input-group">
            <AiOutlineUser className="input-icon" />
            <input
              type="text"
              value={segundoApellido}
              onChange={(e) => setSegundoApellido(e.target.value)}
              placeholder="Segundo Apellido"
              className="input"
            />
          </div>

          <div className="input-group">
            <AiOutlineMail className="input-icon" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo"
              className="input"
            />
          </div>

          <div className="password-input">
            <div className="input-group">
              <AiOutlineLock className="input-icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                className="input"
              />
            </div>
            <span
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button onClick={handleCreateAccount} className="create-account-btn">
            Crear Cuenta
          </button>

          <div className="footer">
            <span>¿Ya tienes cuenta?</span>
            <button onClick={() => navigate("/")} className="login-btn">
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;
