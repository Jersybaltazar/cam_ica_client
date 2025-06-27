import { useCallback } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const usePdfExport = () => {
  const exportToPdf = useCallback(async (elementId: string) => {
    const input = document.getElementById(elementId);
    if (!input) return;

    const canvas = await html2canvas(input);
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
  }, []);

  return { exportToPdf };
};

export default usePdfExport;