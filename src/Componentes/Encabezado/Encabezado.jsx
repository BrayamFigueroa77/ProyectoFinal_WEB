import "./Encabezado.css";
import { useNavigate } from "react-router-dom";

import CerrarSession from "../CerrarSession/CerrarSession";


const Encabezado = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <img
          id="logo"
          src="https://i.pinimg.com/736x/60/a9/61/60a96199afa8469b7c3c46810ed86816.jpg"
          alt="Logo Dragon Ball Z"
        />
        <h1 className="Titulo">Dragon Ball Z</h1>

        <CerrarSession />
        <button onClick={() => navigate('/crudUsuarios')} > Administrar Usuarios</button>
        
      </header>

      <main>
        <h1>Bitacoras</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
          aspernatur accusantium explicabo enim, eum, beatae eius nemo sint
          doloremque dolores iusto consequatur obcaecati laboriosam perspiciatis
          itaque reiciendis cupiditate velit! Cum. Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Aut suscipit nulla quia, totam dolorem
          omnis aperiam iure quisquam vitae cumque. Sequi excepturi enim atque
          libero omnis molestiae autem ad ab.
        </p>
      </main>
    </div>
  );
};

export default Encabezado;
