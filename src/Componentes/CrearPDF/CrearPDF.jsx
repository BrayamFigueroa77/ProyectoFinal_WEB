// crearPDF.jsx
import React from "react";
import { jsPDF } from "jspdf";
import "./CrearPDF.css";

import { db } from "../../Firebase/FirebaseConfig"; // Asegúrate de tener db exportado en FirebaseConfig.js
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
const CrearPDF = () => {

  const generatePDF = () => {
    const doc = new jsPDF();

//     const [bitacoras, setBitacoras] = useState([]);
//     const [showForm, setShowForm] = useState(false); // Estado para controlar el formulario

//     useEffect(() => {
//       const fetchBitacoras = async () => {
//         const bitacoraCollection = collection(db, "bitacoras");
//         const bitacoraSnapshot = await getDocs(bitacoraCollection);
//         const bitacoraList = bitacoraSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setBitacoras(bitacoraList);
//       };

//       fetchBitacoras();
//     }, [showForm]);

//     // Configurar el título principal
//     doc.setFontSize(20);
//     doc.setTextColor(40, 40, 40);
//     doc.text("Reporte de bitacoras creadas", 20, 20);
// doc.titulo(20, 20)
//     // Subtítulo
//     doc.setFontSize(12);
//     doc.setTextColor(100, 100, 100);
//     doc.text("Informe generado automáticamente", 20, 30);

//     // Línea divisoria
//     doc.setLineWidth(0.5);
//     doc.line(20, 35, 190, 35);

//     // Agregar imagen (por ejemplo, un logo)
//     const imageUrl =
//       "https://www.educaciontrespuntocero.com/wp-content/uploads/2020/04/mejores-bancos-de-imagenes-gratis.jpg"; // URL de la imagen
//     doc.addImage(imageUrl, "JPEG", 150, 10, 50, 30); // posición y tamaño

//     // Contenido con formato
//     doc.setFontSize(14);
//     doc.setTextColor(40, 40, 40);
//     doc.text("Detalles del Usuario", 20, 50);

//     // Texto de contenido con formato

//     const bitacoraList = collection(db, "bitacoras");

//     // Función para cargar usuarios
//     const cargarBitacoras = async () => {
//       const data = await getDocs(bitacoraList);
//       setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };

//     // Llama a cargarUsuarios cuando el componente se monta
//     useEffect(() => {
//       cargarBitacoras();
//     }, []);

//     doc.setFontSize(12);
//     doc.setTextColor(60, 60, 60);
//     doc.text(cargarBitacoras, 20, 70);

//     // Tabla de datos (simulada)
//     doc.text(bitacoras.);
//     doc.setFont("helvetica", "bold");
//     doc.text("Fecha", 20, 110);
//     doc.text("Actividad", 70, 110);
//     doc.text("Estado", 150, 110);
//     doc.setFont("helvetica", "normal");

//     doc.text("01/11/2024", 20, 120);
//     doc.text("Ingreso al sistema", 70, 120);
//     doc.text("Exitoso", 150, 120);

//     doc.text("02/11/2024", 20, 130);
//     doc.text("Actualización de perfil", 70, 130);
//     doc.text("Exitoso", 150, 130);

//     // Pie de página
//     doc.setFontSize(10);
//     doc.setTextColor(150, 150, 150);
//     doc.text(
//       "Este documento fue generado automáticamente por el sistema.",
//       20,
//       280
//     );

//     {
//       /* Lista de bitácoras */
//     }
//     <div className="bitacoras-list">
//       {bitacoras.map((bitacora) => (
//         <div
//           key={bitacora.id}
//           className="bitacora-card"
//           onClick={() => handleSelectBitacora(bitacora.id)}
//         >
//         <h3>Titulo: {bitacora.titulo}</h3>
//           <p>Fecha: {bitacora.fecha}</p>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleDelete(bitacora.id);
//             }}
//           >
//             Eliminar
//           </button>
//         </div>
//       ))}
//     </div>;



    // Descargar el PDF
    doc.save("reporte-usuarios.pdf");
  };

  return (
    <div>
      <button className="pdf" onClick={generatePDF}>
        Descargar PDF
      </button>
    </div>
  );
};

export default CrearPDF;
