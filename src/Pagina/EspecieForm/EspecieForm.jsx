import React, { useState, useEffect } from "react";

const EspecieForm = ({ onAddEspecie, selectedEspecie, onClose }) => {
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombreComun, setNombreComun] = useState("");
  const [familia, setFamilia] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [estado, setEstado] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  // Si hay una especie seleccionada para editar, llenar los campos con esos valores
  useEffect(() => {
    if (selectedEspecie) {
      setNombreCientifico(selectedEspecie.nombreCientifico || "");
      setNombreComun(selectedEspecie.nombreComun || "");
      setFamilia(selectedEspecie.familia || "");
      setCantidad(selectedEspecie.cantidad || "");
      setEstado(selectedEspecie.estado || "");
      setImagenUrl(selectedEspecie.imagenUrl || "");
    }
  }, [selectedEspecie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEspecie = {
      nombreCientifico,
      nombreComun,
      familia,
      cantidad,
      estado,
      imagenUrl,
    };

    onAddEspecie(newEspecie); // Esto podría ser una función que agrega o actualiza la especie
    // Limpiar los campos
    setNombreCientifico("");
    setNombreComun("");
    setFamilia("");
    setCantidad("");
    setEstado("");
    setImagenUrl("");
    onClose(); // Cerrar el formulario después de agregar o editar
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedEspecie ? "Editar Especie" : "Agregar nueva especie"}</h3>
      <input
        type="text"
        placeholder="Nombre Científico"
        value={nombreCientifico}
        onChange={(e) => setNombreCientifico(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nombre Común"
        value={nombreComun}
        onChange={(e) => setNombreComun(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Familia"
        value={familia}
        onChange={(e) => setFamilia(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imagenUrl}
        onChange={(e) => setImagenUrl(e.target.value)}
      />
      <button type="submit">
        {selectedEspecie ? "Actualizar Especie" : "Agregar Especie"}
      </button>
      <button type="button" onClick={onClose}>Cerrar</button>
    </form>
  );
};

export default EspecieForm;
