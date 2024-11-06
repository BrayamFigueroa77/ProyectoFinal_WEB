import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrearUsuario from "./Componentes/CrearUsuario/CrearUsuario";
import Login from "./Componentes/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CrearUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
