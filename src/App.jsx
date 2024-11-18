// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrearUsuario from "./Componentes/CrearUsuario/CrearUsuario";
import Login from "./Componentes/Login/Login.jsx";

import Encabezado from "./Componentes/Encabezado/Encabezado";
import CrudUsuarios from "./Componentes/CrudUsuarios/crudUsuarios";
import InicioBitacora from "./Pagina/Inicio/InicioBitacora";
import CaracteristicaBitacora from "./Pagina/Detalles/CaracteristicaBitacora";
import Footer from "./Pagina/Footer/Footer.jsx";
import Bitacora from "./Pagina/Bitacora/BitacoraForm.jsx";


function App() {
  return (
    <div className="contenedor">
      
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CrearUsuario />} />

          <Route
            path="/dashboard"
            element={
              <>
                <Encabezado />
                <InicioBitacora />
                <Footer />
              </>
            }
          />
          <Route path="/Crud_Bitacora" element={
              <>
              <Encabezado />
              <Bitacora />
              <Footer />
            </>
            } />
          
          <Route
            path="/bitacora/:id"
            element={
              <>
                <Encabezado />
                <CaracteristicaBitacora />
                <Footer />
              </>
            }
          />

          {/* Ruta para administración de usuarios */}
          <Route
            path="/crudUsuarios"
            element={
              <>
                <Encabezado />
                <CrudUsuarios />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
