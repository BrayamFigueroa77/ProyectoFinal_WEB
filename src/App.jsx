// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrearUsuario from "./Componentes/CrearUsuario/CrearUsuario";
import Login from "./Componentes/Login/Login";

import Encabezado from './Componentes/Encabezado/Encabezado';
import CrudUsuarios from './Componentes/CrudUsuarios/crudUsuarios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CrearUsuario />} />
        <Route path="/dashboard" element={<Encabezado />} />
        <Route path="/crudUsuarios" element={<CrudUsuarios />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
