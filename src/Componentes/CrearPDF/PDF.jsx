import React from "react";
import { jsPDF } from "jspdf";

import React from "react";

const PDF = () => {
  const generatePDF = () => {
    // Crear una nueva instancia de jsPDF
    const doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text("Mi archivo PDF", 10, 10); // Título en la posición (10,10)
    doc.text("Este es un archivo PDF de ejemplo generado con jsPDF.", 10, 20);

    // Descargar el PDF con un nombre específico
    doc.save("mi-archivo.pdf");
  };

  return <div>PDF</div>;
};

export default PDF;
