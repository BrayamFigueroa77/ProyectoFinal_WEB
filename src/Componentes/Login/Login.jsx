import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = () => {
    console.log('Iniciar sesión');
    // Lógica para iniciar sesión aquí
  };

  const handleForgotPassword = () => {
    console.log('Olvidaste tu contraseña');
  };

  const handleRegister = () => {
    navigate('/create-account'); // Redirige a la página de creación de cuenta
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

        <div className="login-actions">
          <button onClick={handleForgotPassword} className="forgot-password">
            Olvidaste tu contraseña?
          </button>
          <button onClick={handleLogin} className="login-button">
            Iniciar
          </button>
        </div>

        <div className="register">
          <p>No tiene cuenta?</p>
          <button onClick={handleRegister} className="register-button">Registrarse</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
