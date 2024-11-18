import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import EspecieForm from "../EspecieForm/EspecieForm";
import "./CaracteristicaBitacora.css";

const CaracteristicaBitacora = () => {
  const { id } = useParams();
  const [selectedBitacora, setSelectedBitacora] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(""); // Estado para la URL de la nueva fotografía
  const [selectedEspecie, setSelectedEspecie] = useState(null); // Especie seleccionada para editar

  useEffect(() => {
    const fetchBitacoraDetails = async () => {
      const bitacoraDoc = await getDoc(doc(db, "bitacoras", id));
      if (bitacoraDoc.exists()) {
        setSelectedBitacora({ id: bitacoraDoc.id, ...bitacoraDoc.data() });
      } else {
        console.log("No se encontró la bitácora.");
      }
    };
    fetchBitacoraDetails();
  }, [id]);

  // Función para agregar una nueva especie
  const handleAddEspecie = async (newEspecie) => {
    const bitacoraRef = doc(db, "bitacoras", selectedBitacora.id);
    const updatedEspecies = [...(selectedBitacora.especies || []), newEspecie];
    await updateDoc(bitacoraRef, { especies: updatedEspecies });
    setSelectedBitacora({ ...selectedBitacora, especies: updatedEspecies });
  };

  // Función para agregar una nueva fotografía
  const handleAddFotografia = async () => {
    const bitacoraRef = doc(db, "bitacoras", selectedBitacora.id);
    const updatedFotografias = [
      ...(selectedBitacora.fotografias || []),
      fotoUrl,
    ];
    await updateDoc(bitacoraRef, { fotografias: updatedFotografias });
    setSelectedBitacora({
      ...selectedBitacora,
      fotografias: updatedFotografias,
    });
    setFotoUrl(""); // Limpiar el campo de URL de la foto después de agregarla
  };

  // Función para eliminar una especie
  const handleDeleteEspecie = async (index) => {
    const bitacoraRef = doc(db, "bitacoras", selectedBitacora.id);
    const updatedEspecies = selectedBitacora.especies.filter(
      (especie, idx) => idx !== index
    );
    await updateDoc(bitacoraRef, { especies: updatedEspecies });
    setSelectedBitacora({ ...selectedBitacora, especies: updatedEspecies });
  };

  // Función para seleccionar una especie para editar
  const handleEditEspecie = (especie) => {
    setSelectedEspecie(especie); // Establece la especie seleccionada para editar
  };

  // Función para actualizar una especie editada
  const handleUpdateEspecie = async (updatedEspecie) => {
    const bitacoraRef = doc(db, "bitacoras", selectedBitacora.id);
    const updatedEspecies = selectedBitacora.especies.map((especie) =>
      especie.nombreCientifico === updatedEspecie.nombreCientifico
        ? updatedEspecie
        : especie
    );
    await updateDoc(bitacoraRef, { especies: updatedEspecies });
    setSelectedBitacora({ ...selectedBitacora, especies: updatedEspecies });
    setSelectedEspecie(null); // Limpiar después de la actualización
  };

  return (
    <main className="main_caracteristicasBitacora">
      <h1 id="Titulo_caracteristicasBitacoras">Característica Bitácora</h1>
      <div className="contenedor_caracteristicasBitacoras">
        {selectedBitacora && (
          <div className="bitacora-details">
            {/* Mostrar detalles generales de la bitácora */}
            <h2>Detalles de la Bitácora</h2>
            <p>
              <strong>Título:</strong> {selectedBitacora.titulo}
            </p>
            <p>
              <strong>Fecha y Hora:</strong> {selectedBitacora.fechaHora}
            </p>
            <p>
              <strong>Localización Geográfica:</strong>{" "}
              {selectedBitacora.localizacion}
            </p>
            <p>
              <strong>Condiciones Climáticas:</strong>{" "}
              {selectedBitacora.condicionesClimaticas}
            </p>
            <p>
              <strong>Descripción del Hábitat:</strong>{" "}
              {selectedBitacora.descripcionHabitat}
            </p>

            {/* Mostrar fotografías */}
            {selectedBitacora.fotografias &&
              selectedBitacora.fotografias.length > 0 && (
                <div>
                  <h3>Fotografías:</h3>
                  <div className="fotografias-grid">
                    {selectedBitacora.fotografias.map((foto, index) => (
                      <img
                        key={index}
                        src={foto}
                        alt={`Fotografía ${index + 1}`}
                        style={{
                          width: "150px",
                          height: "auto",
                          margin: "10px",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

            {/* Formulario para agregar una nueva fotografía */}
            <h3>Agregar Fotografía</h3>
            <input
              type="text"
              placeholder="URL de la fotografía"
              value={fotoUrl}
              onChange={(e) => setFotoUrl(e.target.value)}
            />
            <button onClick={handleAddFotografia}>Agregar Fotografía</button>

            {/* Sección de especies */}
            <h4>Especies:</h4>
            <div className="prueba">
              {selectedBitacora.especies?.map((especie, index) => (
                <div className="bitacora-card" key={index}>
                  <p>Nombre Científico: {especie.nombreCientifico}</p>
                  <p>Nombre Común: {especie.nombreComun}</p>
                  <p>Familia: {especie.familia}</p>
                  <p>Cantidad: {especie.cantidad}</p>
                  <p>Estado: {especie.estado}</p>
                  {especie.imagenUrl && (
                    <img
                      src={especie.imagenUrl}
                      alt={`Imagen de ${especie.nombreCientifico}`}
                      style={{ width: "150px", height: "auto" }}
                    />
                  )}
                  <button onClick={() => handleEditEspecie(especie)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteEspecie(index)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulario para agregar o editar especies */}
        <EspecieForm
          onAddEspecie={handleAddEspecie}
          selectedEspecie={selectedEspecie}
          onUpdateEspecie={handleUpdateEspecie}
          onClose={() => setSelectedEspecie(null)}
        />
      </div>
    </main>
  );
};

export default CaracteristicaBitacora;
