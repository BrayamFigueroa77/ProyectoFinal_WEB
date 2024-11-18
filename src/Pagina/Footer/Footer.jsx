import React from "react";
import Yuliana from "../../../src/img_footer/sin.png";
import Figueroa from "../../../src/img_footer/Figueroa.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="imagenes_footer">
      <p id="derechos">&copy; 2024 Grupo de trabajo:</p>

      <img
        className="logo_imagenes_footer"
        src={Figueroa}
        alt="Brayam Figueroa"
      />
      <h5 className="integrantes_footer">Brayam Stiven Figueroa</h5>

      <img className="logo_imagenes_footer" src={Yuliana} alt="Yuliana Trejos" />
      <h5 className="integrantes_footer">Yuliana Trejos</h5>

      <img
        className="logo_imagenes_footer"
        src="https://chaira.uniamazonia.edu.co/Administrativo/Vistas/Privado/TalentoHumano/FotoPerfil/Fotos.aspx?estudiante=1050049"
        alt="Compañero"
      />
      <h5 className="integrantes_footer">Compañero perez</h5>
    </footer>
  );
};

export default Footer;
