import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";


const Mapa = () => {
  // Estado para las coordenadas
  const [coordenadas, setCoordenadas] = useState([]);

  // Cargar las coordenadas desde Firestore
  useEffect(() => {
    const loadCoordinates = async () => {
      const querySnapshot = await getDocs(collection(db, "bitacoras"));
      const coordenadasArray = [];
      querySnapshot.forEach((doc) => {
        const bitacora = doc.data();
        if (bitacora.coordenadas) {
          coordenadasArray.push(bitacora.coordenadas);
        }
      });
      setCoordenadas(coordenadasArray);
    };

    loadCoordinates();
  }, []);

  // Configuración del mapa
  const initialCenter = { lat: 4.570868, lng: -74.297333 }; // Coordenadas de Colombia
  const mapContainerStyle = { width: "100%", height: "300px" };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC9YPQj18xev4kXRv2CtshM87OPwLbgpA8", // Sustituye con tu API key
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="mapa-bitacoras">
      <h3>Mapa de Bitácoras</h3>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={initialCenter} // El centro inicial del mapa
        zoom={6}
      >
        {coordenadas.map((coordenada, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(coordenada.lat),
              lng: parseFloat(coordenada.lng),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Mapa;
