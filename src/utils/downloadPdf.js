import jsPDF from "jspdf";

export function downloadPdf(content, fileName = "BusinessPlan.pdf") {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Split text neatly to fit within margins
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
  const lines = doc.splitTextToSize(content, pageWidth);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(lines, margin, 20);

  doc.save(fileName);
}
