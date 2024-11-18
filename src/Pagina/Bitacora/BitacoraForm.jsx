import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import Swal from "sweetalert2";
import { deleteDoc } from "firebase/firestore";

import "./BitacoraForm.css";

const Bitacora = () => {
  const [newBitacora, setNewBitacora] = useState({
    titulo: "",
    fecha: "",
    localizacion: "",
    coordenadas: { lat: null, lng: null },
    condiciones: "",
    descripcionHabitat: "",
    observaciones: "",
    fotos: null,
  });

  const [bitacoras, setBitacoras] = useState([]); // Estado para almacenar las bitácoras
  const [editingBitacoraId, setEditingBitacoraId] = useState(null); // Estado para manejar la edición

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC9YPQj18xev4kXRv2CtshM87OPwLbgpA8",
  });

  const initialCenter = { lat: 4.5709, lng: -74.2973 }; // Cambiar por la ubicación inicial deseada
  const storage = getStorage(); // Inicializa Firebase Storage

  // Función para cargar las bitácoras desde Firestore
  const fetchBitacoras = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bitacoras"));
      const bitacorasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBitacoras(bitacorasData); // Guardar las bitácoras en el estado
    } catch (error) {
      console.error("Error al obtener las bitácoras:", error);
    }
  };

  useEffect(() => {
    fetchBitacoras(); // Cargar las bitácoras al montar el componente
  }, []); // Solo se ejecuta al montar el componente

  const handleAddBitacora = async () => {
    try {
      let fotoURL = null;

      // Subir la imagen a Firebase Storage si existe
      if (newBitacora.fotos) {
        const storageRef = ref(storage, `bitacoras/${newBitacora.fotos.name}`);
        await uploadBytes(storageRef, newBitacora.fotos);
        fotoURL = await getDownloadURL(storageRef); // Obtiene la URL de la imagen subida
      }

      // Si estamos editando una bitácora, actualizamos en lugar de agregar
      if (editingBitacoraId) {
        const bitacoraRef = doc(db, "bitacoras", editingBitacoraId);
        await updateDoc(bitacoraRef, {
          ...newBitacora,
          fotos: fotoURL, // Guarda la URL de la foto (si existe)
        });
        Swal.fire("¡Éxito!", "Bitácora actualizada con éxito", "success");
        setEditingBitacoraId(null); // Resetea el modo de edición
      } else {
        // Si no estamos editando, agregamos una nueva bitácora
        const bitacoraRef = collection(db, "bitacoras");
        await addDoc(bitacoraRef, {
          ...newBitacora,
          fotos: fotoURL, // Guarda la URL de la foto (si existe)
        });
        Swal.fire("¡Éxito!", "Bitácora agregada con éxito", "success");
      }

      // Limpiar el formulario
      setNewBitacora({
        titulo: "",
        fecha: "",
        localizacion: "",
        coordenadas: { lat: null, lng: null },
        condiciones: "",
        descripcionHabitat: "",
        observaciones: "",
        fotos: null,
      });

      // Actualizar las bitácoras
      fetchBitacoras(); // Ahora esta función está definida y disponible
    } catch (error) {
      console.error("Error al agregar/actualizar la bitácora: ", error);
      Swal.fire("Error", "Hubo un problema al agregar/actualizar la bitácora", "error");
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setNewBitacora((prev) => ({
      ...prev,
      coordenadas: { lat, lng },
      localizacion: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewBitacora((prev) => ({ ...prev, fotos: file }));
  };

  const EliminarBitacora = async (bitacoraId) => {
    try {
      // Preguntar al usuario si está seguro de eliminar
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        // Obtener la referencia del documento y eliminarlo
        const bitacoraRef = doc(db, "bitacoras", bitacoraId);
        await deleteDoc(bitacoraRef);

        // Mostrar mensaje de éxito
        Swal.fire("¡Eliminado!", "La bitácora ha sido eliminada.", "success");

        // Actualizar la lista de bitácoras después de eliminar
        fetchBitacoras();
      }
    } catch (error) {
      console.error("Error al eliminar la bitácora: ", error);
      Swal.fire("Error", "Hubo un problema al eliminar la bitácora", "error");
    }
  };

  // Función para cargar los datos de la bitácora seleccionada para editar
  const handleEditBitacora = (bitacora) => {
    setNewBitacora({
      titulo: bitacora.titulo,
      fecha: bitacora.fecha,
      localizacion: bitacora.localizacion,
      coordenadas: { lat: bitacora.coordenadas.lat, lng: bitacora.coordenadas.lng },
      condiciones: bitacora.condiciones,
      descripcionHabitat: bitacora.descripcionHabitat,
      observaciones: bitacora.observaciones,
      fotos: null, // Si deseas permitir la edición de la foto, puedes gestionarlo aquí
    });
    setEditingBitacoraId(bitacora.id); // Establecer el ID de la bitácora que estamos editando
  };

  return (
    <div className="form-container">
      <h2>{editingBitacoraId ? "EDITAR BITÁCORA" : "AGREGAR NUEVA BITÁCORA"}</h2>
      <form>
        <label>Título:</label>
        <input
          type="text"
          value={newBitacora.titulo}
          onChange={(e) =>
            setNewBitacora({ ...newBitacora, titulo: e.target.value })
          }
        />
        <label>Fecha:</label>
        <input
          type="date"
          value={newBitacora.fecha}
          onChange={(e) =>
            setNewBitacora({ ...newBitacora, fecha: e.target.value })
          }
        />
        <label>Localización:</label>
        <input type="text" value={newBitacora.localizacion} disabled />
        <div className="map-container">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "300px" }}
              center={initialCenter}
              zoom={6}
              onClick={handleMapClick}
            >
              {newBitacora.coordenadas.lat && newBitacora.coordenadas.lng && (
                <Marker position={newBitacora.coordenadas} />
              )}
            </GoogleMap>
          )}
        </div>
        <label>Condiciones Climáticas:</label>
        <input
          type="text"
          value={newBitacora.condiciones}
          onChange={(e) =>
            setNewBitacora({ ...newBitacora, condiciones: e.target.value })
          }
        />
        <label>Descripción del Hábitat:</label>
        <input
          type="text"
          value={newBitacora.descripcionHabitat}
          onChange={(e) =>
            setNewBitacora({
              ...newBitacora,
              descripcionHabitat: e.target.value,
            })
          }
        />
        <label>Observaciones:</label>
        <input
          type="text"
          value={newBitacora.observaciones}
          onChange={(e) =>
            setNewBitacora({ ...newBitacora, observaciones: e.target.value })
          }
        />
        <label>Foto:</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        <button type="button" onClick={handleAddBitacora}>
          {editingBitacoraId ? "Actualizar" : "Agregar"} Bitácora
        </button>
      </form>

      <h3>Bitácoras Existentes</h3>
      <div className="bitacoras-list">
        {bitacoras.map((bitacora) => (
          <div key={bitacora.id} className="bitacora-item">
            <h4>{bitacora.titulo}</h4>
            <p>{bitacora.fecha}</p>
            <p>{bitacora.localizacion}</p>
            <button onClick={() => handleEditBitacora(bitacora)}>Editar</button>
            <button
              className="delete-btn"
              onClick={() => EliminarBitacora(bitacora.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bitacora;
