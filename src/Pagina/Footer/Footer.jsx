import React from "react";
import Yuliana from "../../../src/img_footer/Yuliana.jpg";
import Figueroa from "../../../src/img_footer/Figueroa.png";
import Esteban from "../../../src/img_footer/Esteban.jpg";
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
        src={Esteban}
        alt="Esteban"
      />
      <h5 className="integrantes_footer">Esteban Barrios</h5>
    </footer>
  );
};

export default Footer;
