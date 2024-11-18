import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import './CrearPDF.css'; // Importa el archivo de estilos

const CrearPDF = () => {
  const [bitacoras, setBitacoras] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBitacoras = async () => {
      try {
        const bitacoraCollection = collection(db, "bitacoras");
        const bitacoraSnapshot = await getDocs(bitacoraCollection);
        const bitacoraList = bitacoraSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBitacoras(bitacoraList);
      } catch (error) {
        console.error("Error al obtener las bitácoras:", error);
      }
    };

    fetchBitacoras();
  }, []);

  const convertImgToBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error al convertir la imagen:", error);
      return null;
    }
  };

  const generatePDF = async () => {
    setLoading(true);
    const doc = new jsPDF();
    let yPosition = 10;

    try {
      for (const bitacora of bitacoras) {
        doc.text(`Título: ${bitacora.titulo || "Sin título"}`, 10, yPosition);
        yPosition += 10;
        doc.text(`Fecha: ${bitacora.fecha || "Sin fecha"}`, 10, yPosition);
        yPosition += 10;
        doc.text(
          `Localización: ${bitacora.localizacion || "Sin localización"}`,
          10,
          yPosition
        );
        yPosition += 10;
        doc.text(
          `Condiciones Climáticas: ${bitacora.condiciones || "N/A"}`,
          10,
          yPosition
        );
        yPosition += 10;
        doc.text(
          `Descripción del Hábitat: ${bitacora.descripcionHabitat || "N/A"}`,
          10,
          yPosition
        );
        yPosition += 10;
        doc.text(
          `Observaciones: ${bitacora.observaciones || "Sin observaciones"}`,
          10,
          yPosition
        );
        yPosition += 20;

        if (bitacora.fotografias) {
          for (const fotoUrl of bitacora.fotografias) {
            const base64Img = await convertImgToBase64(fotoUrl);
            if (base64Img) {
              doc.addImage(base64Img, "JPEG", 10, yPosition, 50, 50);
              yPosition += 60;
            }
          }
        }

        yPosition += 20;
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 10;
        }
      }

      doc.save("reporte-bitacoras.pdf");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generatePDF} className="pdf" disabled={loading}>
        {loading ? "Generando..." : "Descargar PDF"}
      </button>
    </div>
  );
};

export default CrearPDF;
