import html2pdf from "html2pdf.js";

export default function InvoiceForm({
  from,
  to,
  invoiceNumber,
  invoiceDate,
  dueDate,
  items,
  taxRate,
  notes,
  currency,
  onFieldChange,
  onItemChange,
  onAddItem,
  onRemoveItem,
}) {

  const downloadPDF = async () => {
    const invoice = document.getElementById("invoice-pdf");
    if (!invoice) {
      alert("Invoice not found");
      return;
    }

    // Clone invoice for clean render
    const clone = invoice.cloneNode(true);

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "0";
    wrapper.style.top = "0";
    wrapper.style.width = "210mm";
    wrapper.style.background = "#ffffff";
    wrapper.style.padding = "10mm";
    wrapper.style.zIndex = "99999";

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const options = {
      margin: 0,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    await html2pdf().set(options).from(wrapper).save();

    document.body.removeChild(wrapper);
  };

  return (
    <div>
      <div className="app-title">Simple Invoice Maker</div>
      <div className="app-subtitle">
        Fill the form, preview on the right, and download PDF.
      </div>

      <span className="badge">Live Preview</span>

      {/* Actions */}
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button
          type="button"
          className="button button-primary"
          onClick={downloadPDF}
        >
          ⬇️ Download Invoice PDF
        </button>
      </div>

      {/* --- REST OF YOUR FORM CODE SAME AS BEFORE --- */}
    </div>
  );
}
