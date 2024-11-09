import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/FirebaseConfig';
import './Login.css';

import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();


  const handleLogin = () => {
    // Validación de los campos de login
    if (!email && !password) {
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor, digite su correo y contraseña.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!email) {
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor, ingrese su correo.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!password) {
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor, ingrese la contraseña.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Inicio de sesión exitoso', userCredential.user);
      navigate('/dashboard'); // Redirige después del inicio de sesión
    })
    .catch((error) => {
      console.error('Error de autenticación', error);

      // Manejo específico de los errores
      if (error.code === 'auth/user-not-found') {
        Swal.fire({
          title: '¡Error!',
          text: 'El correo ingresado no está registrado.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else if (error.code === 'auth/wrong-password') {
        Swal.fire({
          title: '¡Error!',
          text: 'La contraseña ingresada es incorrecta.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un problema con el inicio de sesión. Verifique su correo y contraseña.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    });
};

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Inicio de sesión con Google exitoso:", result.user);
        navigate('/dashboard'); // Redirige después del inicio de sesión con Google
      })
      .catch((error) => {
        console.error("Error en el inicio de sesión con Google:", error);
      });
  };

  return (
    <div className="login-container">
    <div className="login-background">
      <img src="https://wallpapers.com/images/hd/botanical-garden-1920-x-1080-wallpaper-l83b48hixd1iiozt.jpg" alt="Background" />
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
