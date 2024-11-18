import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import Mapa from "../Mapa/Mapa"; // Importa el componente del mapa
import "./InicioBitacora.css";
import CrearPDF from "../../Componentes/crearPDF/crearPDF";

const InicioBitacora = () => {
  const navigate = useNavigate();
  const [bitacoras, setBitacoras] = useState([]);
  const [bitacorasFiltradas, setBitacorasFiltradas] = useState([]);
  const [busquedaTitulo, setBusquedaTitulo] = useState("");
  const [busquedaFecha, setBusquedaFecha] = useState("");
  const [busquedaCondiciones, setBusquedaCondiciones] = useState("");
  const [orden, setOrden] = useState("titulo");
  const [ordenDescendente, setOrdenDescendente] = useState(false);
  const [mostrarMapa, setMostrarMapa] = useState(false); // Estado para controlar la visibilidad del mapa

  useEffect(() => {
    const fetchBitacoras = async () => {
      const bitacoraCollection = collection(db, "bitacoras");
      const bitacoraSnapshot = await getDocs(bitacoraCollection);
      const bitacoraList = bitacoraSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBitacoras(bitacoraList);
      setBitacorasFiltradas(bitacoraList);
    };

    fetchBitacoras();
  }, []);

  useEffect(() => {
    let filtradas = bitacoras.filter((bitacora) => {
      const coincideTitulo =
        busquedaTitulo === "" ||
        bitacora.titulo.toLowerCase().includes(busquedaTitulo.toLowerCase());
      const coincideFecha =
        busquedaFecha === "" || bitacora.fecha.includes(busquedaFecha);
      const coincideCondiciones =
        busquedaCondiciones === "" ||
        bitacora.condiciones
          .toLowerCase()
          .includes(busquedaCondiciones.toLowerCase());

      return coincideTitulo && coincideFecha && coincideCondiciones;
    });

    if (orden === "titulo") {
      filtradas = filtradas.sort((a, b) =>
        ordenDescendente
          ? b.titulo.localeCompare(a.titulo)
          : a.titulo.localeCompare(b.titulo)
      );
    } else if (orden === "fecha") {
      filtradas = filtradas.sort(
        (a, b) => new Date(a.fecha) - new Date(b.fecha)
      );
    } else if (orden === "localizacion") {
      filtradas = filtradas.sort((a, b) =>
        a.localizacion.localeCompare(b.localizacion)
      );
    }

    setBitacorasFiltradas(filtradas);
  }, [
    busquedaTitulo,
    busquedaFecha,
    busquedaCondiciones,
    bitacoras,
    orden,
    ordenDescendente,
  ]);

  const handleOrdenDescendenteCambio = () => {
    setOrdenDescendente(!ordenDescendente); // Cambiar entre ascendente y descendente
  };


  return (
    <div>
      <main>
      <div className="pdf_contenido"> 
        <h1 className="titulo">Bitácoras de campo</h1>
      <CrearPDF/>
      </div>

        <div className="contenedor_filtros">
          {/* Campos de búsqueda */}
          <input
            type="search"
            placeholder="Buscar por título"
            value={busquedaTitulo}
            onChange={(e) => setBusquedaTitulo(e.target.value)}
            className="campo-busqueda"
          />
          <input
            type="date"
            value={busquedaFecha}
            onChange={(e) => setBusquedaFecha(e.target.value)}
            className="campo-busqueda"
          />
          <input
            type="text"
            placeholder="Buscar por condiciones"
            value={busquedaCondiciones}
            onChange={(e) => setBusquedaCondiciones(e.target.value)}
            className="campo-busqueda"
          />
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="campo-busqueda"
          >
            <option value="titulo">Ordenar por Título</option>
            <option value="fecha">Ordenar por Fecha</option>
            <option value="localizacion">Ordenar por Lugar</option>
          </select>


         
        {orden === "titulo" && (
          <label
            className="campo-busqueda"
            >
            <input
            className="campo-busqueda"
              type="checkbox"
              checked={ordenDescendente}
              onChange={handleOrdenDescendenteCambio}
            />
            des
          </label>
        )}

          {/* Botón para mostrar el mapa */}
          <button onClick={() => setMostrarMapa(!mostrarMapa)}>
            {mostrarMapa ? "Ocultar Mapa" : "Mostrar Mapa"}
          </button>
        </div>

        {/* Mostrar el mapa si se activa el botón */}
        {mostrarMapa && <Mapa bitacoras={bitacorasFiltradas} />}

        {/* Mostrar las bitácoras filtradas */}
        {bitacorasFiltradas.length > 0 ? (
          <div className="bitacora-list">
            
            {bitacorasFiltradas.map((bitacora) => (
              <div
                key={bitacora.id}
                className="bitacora-card"
                onClick={() => navigate(`/bitacora/${bitacora.id}`)}
              >
                <h3 className="bitacora-titulo">{bitacora.titulo}</h3>

                <label>Fecha:</label>
                <p className="bitacora-text">{bitacora.fecha}</p>

                <label>Localización:</label>
                <p className="bitacora-text">{bitacora.localizacion}</p>

                <label>Condiciones Climáticas:</label>
                <p className="bitacora-text">{bitacora.condiciones}</p>

                <label>Descripción del Hábitat:</label>
                <p className="bitacora-text">{bitacora.descripcionHabitat}</p>

                <label>Observaciones:</label>
                <p className="bitacora-text">{bitacora.observaciones}</p>

                {bitacora.imagenUrl && (
                      <div className="bitacora-image-container" style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                        <img
                          src={bitacora.imagenUrl}
                          alt="Imagen de la bitácora"
                          className="bitacora-image"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}

              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron bitácoras</p>
        )}
      </main>
    </div>
  );
};

export default InicioBitacora;
