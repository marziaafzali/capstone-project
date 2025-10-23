// src/utils/downloadPdf.js
import jsPDF from "jspdf";

export const downloadPdf = (aiResponse) => {
  const doc = new jsPDF();

  // 🟢 Header section (solid green background)
  doc.setFillColor(4, 120, 87); // deep green
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255); // white text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("BizzPlanner AI Suggestions", 20, 17);

  // 🕐 Add some spacing before main text to avoid overlap
  let yPosition = 40; // start lower on the page

  // 🧠 AI Response Text
  doc.setTextColor(0, 0, 0); // pure black
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const text = aiResponse || "No AI response available.";

  // Split and wrap long text properly
  const lines = doc.splitTextToSize(text, 170);

  // Render text line-by-line with spacing
  lines.forEach((line) => {
    if (yPosition > 270) {
      // add new page if text overflows
      doc.addPage();
      yPosition = 20;
    }
    doc.text(line, 20, yPosition);
    yPosition += 8; // line spacing
  });

  // 🩶 Footer section
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Generated with ❤️ by BizzPlanner", 20, 285);

  // 💾 Save PDF
  doc.save("bizzplanner-ai-tips.pdf");
};
