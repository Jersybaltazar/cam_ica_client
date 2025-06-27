import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface PdfExportProps {
  contentRef: React.RefObject<HTMLElement>;
}

const PdfExport: React.FC<PdfExportProps> = ({ contentRef }) => {
  const handleExport = async () => {
    const element = contentRef.current;

    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Adjust width as needed
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('trazabilidad.pdf');
    }
  };

  return (
    <button onClick={handleExport} className="px-4 py-2 bg-blue-500 text-white rounded">
      Export to PDF
    </button>
  );
};

export default PdfExport;