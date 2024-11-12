import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/FirebaseConfig"; // Asegúrate de tener la configuración correcta de Firebase
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Manejar el inicio de sesión con email y contraseña
  const handleLogin = async () => {
    try {
      // Crear la consulta para buscar el usuario con el email y contraseña ingresados
      const usersRef = collection(db, "Usuarios");
      const q = query(usersRef, where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Usuario encontrado
        Swal.fire({
          title: "¡Bienvenido!",
          text: "Inicio de sesión exitoso.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/dashboard"); // Redirigir al dashboard
      } else {
        // Usuario no encontrado
        Swal.fire({
          title: "Error",
          text: "Correo o contraseña incorrectos.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al iniciar sesión.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Manejar el inicio de sesión con Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      // Verificar si el usuario ya existe en Firestore
      const q = query(collection(db, "Usuarios"), where("email", "==", googleUser.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Si no existe, agregar el usuario a la colección "Usuarios"
        await addDoc(collection(db, "Usuarios"), {
          email: googleUser.email,
          displayName: googleUser.displayName,
          uid: googleUser.uid, // Guardar el UID de Google para la autenticación
        });
      }

      Swal.fire({
        title: "¡Bienvenido!",
        text: `Has iniciado sesión como ${googleUser.displayName}`,
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/dashboard"); // Redirigir al dashboard
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al iniciar sesión con Google.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <img
          src="https://wallpapers.com/images/hd/botanical-garden-1920-x-1080-wallpaper-l83b48hixd1iiozt.jpg"
          alt="Background"
        />
      </div>
      <div className="login-box">
        <img
          src="https://thumbs.dreamstime.com/b/texto-verde-de-la-palabra-escrita-mano-botanica-hoja-para-el-dise%C3%B1o-del-logotipo-tipograf%C3%ADa-138739737.jpg"
          alt="logo"
          className="login-logo"
        />
        <h2 className="welcome-text">Bienvenidos</h2>

        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su usuario o correo"
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*********"
          />
          <span
            className="toggle-visibility"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? 'Ocultar' : 'Mostrar'}
          </span>
        </div>

        <button onClick={handleLogin} className="login-button">Iniciar</button>

        <div className="social-login">
          <button onClick={handleGoogleLogin} className="google-login-button">
            Iniciar sesión con Google
          </button>
        </div>

        <div className="register">
          <p>No tiene cuenta?</p>
          <button onClick={() => navigate('/create-account')} className="register-button">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
