// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrearUsuario from "./Componentes/CrearUsuario/CrearUsuario";
import Login from "./Componentes/Login/Login";

import Encabezado from './Componentes/Encabezado/Encabezado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CrearUsuario />} />
        <Route path="/dashboard" element={<Encabezado />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
