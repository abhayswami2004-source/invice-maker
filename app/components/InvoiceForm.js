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
  onPrint,
}) {
  return (
    <div>
      <div className="app-title">Simple Invoice Maker</div>
      <div className="app-subtitle">
        Fill the form, preview on the right, and print / save as PDF.
      </div>

      <span className="badge">Live Preview</span>

      {/* Your Details */}
      <div className="section-title">Your Details</div>
      <div className="card">
        <div className="flex-row">
          <div className="flex-1">
            <label className="label">Your / Business Name</label>
            <input
              className="input"
              value={from.name}
              onChange={(e) => onFieldChange("from", "name", e.target.value)}
              placeholder="Your Name / Business"
            />
          </div>
        </div>

        <label className="label" style={{ marginTop: 8 }}>
          Address
        </label>
        <textarea
          className="textarea"
          value={from.address}
          onChange={(e) => onFieldChange("from", "address", e.target.value)}
          placeholder="Street, City, ZIP, Country"
        />

        <div className="flex-row" style={{ marginTop: 8 }}>
          <div className="flex-1">
            <label className="label">Email</label>
            <input
              className="input"
              value={from.email}
              onChange={(e) => onFieldChange("from", "email", e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="flex-1">
            <label className="label">Phone</label>
            <input
              className="input"
              value={from.phone}
              onChange={(e) => onFieldChange("from", "phone", e.target.value)}
              placeholder="+91-00000-00000"
            />
          </div>
        </div>
      </div>

      {/* Client Details */}
      <div className="section-title">Client Details</div>
      <div className="card">
        <div className="flex-row">
          <div className="flex-1">
            <label className="label">Client Name</label>
            <input
              className="input"
              value={to.name}
              onChange={(e) => onFieldChange("to", "name", e.target.value)}
              placeholder="Client / Company Name"
            />
          </div>
        </div>

        <label className="label" style={{ marginTop: 8 }}>
          Address
        </label>
        <textarea
          className="textarea"
          value={to.address}
          onChange={(e) => onFieldChange("to", "address", e.target.value)}
          placeholder="Client address"
        />

        <div className="flex-row" style={{ marginTop: 8 }}>
          <div className="flex-1">
            <label className="label">Email</label>
            <input
              className="input"
              value={to.email}
              onChange={(e) => onFieldChange("to", "email", e.target.value)}
              placeholder="client@example.com"
            />
          </div>
          <div className="flex-1">
            <label className="label">Phone</label>
            <input
              className="input"
              value={to.phone}
              onChange={(e) => onFieldChange("to", "phone", e.target.value)}
              placeholder="+91-00000-00000"
            />
          </div>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="section-title">Invoice Info</div>
      <div className="card">
        <div className="flex-row">
          <div className="flex-1">
            <label className="label">Invoice Number</label>
            <input
              className="input"
              value={invoiceNumber}
              onChange={(e) =>
                onFieldChange("meta", "invoiceNumber", e.target.value)
              }
              placeholder="INV-0001"
            />
          </div>
          <div className="flex-1">
            <label className="label">Invoice Date</label>
            <input
              type="date"
              className="input"
              value={invoiceDate}
              onChange={(e) =>
                onFieldChange("meta", "invoiceDate", e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex-row" style={{ marginTop: 8 }}>
          <div className="flex-1">
            <label className="label">Due Date</label>
            <input
              type="date"
              className="input"
              value={dueDate}
              onChange={(e) =>
                onFieldChange("meta", "dueDate", e.target.value)
              }
            />
          </div>
          <div className="flex-1">
            <label className="label">Currency</label>
            <select
              className="select"
              value={currency}
              onChange={(e) =>
                onFieldChange("meta", "currency", e.target.value)
              }
            >
              <option value="₹">INR (₹)</option>
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="section-title">Line Items</div>
      <div className="card">
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              borderBottom:
                index !== items.length - 1 ? "1px dashed #e5e7eb" : "none",
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            <label className="label">Description</label>
            <input
              className="input"
              value={item.description}
              onChange={(e) =>
                onItemChange(index, "description", e.target.value)
              }
              placeholder="e.g. Website design, Product X"
            />

            <div className="flex-row" style={{ marginTop: 8 }}>
              <div className="flex-1">
                <label className="label">Quantity</label>
                <input
                  type="number"
                  min="0"
                  className="input"
                  value={item.quantity}
                  onChange={(e) =>
                    onItemChange(index, "quantity", e.target.value)
                  }
                />
              </div>
              <div className="flex-1">
                <label className="label">Unit Price</label>
                <input
                  type="number"
                  min="0"
                  className="input"
                  value={item.unitPrice}
                  onChange={(e) =>
                    onItemChange(index, "unitPrice", e.target.value)
                  }
                />
              </div>
            </div>

            {items.length > 1 && (
              <button
                type="button"
                className="button button-ghost"
                style={{ marginTop: 8, fontSize: 12, padding: "6px 10px" }}
                onClick={() => onRemoveItem(index)}
              >
                ✕ Remove item
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="button button-ghost"
          onClick={onAddItem}
        >
          + Add line item
        </button>
      </div>

      {/* Tax & Notes */}
      <div className="section-title">Tax & Notes</div>
      <div className="card">
        <div className="flex-row">
          <div className="flex-1">
            <label className="label">Tax (%)</label>
            <input
              type="number"
              min="0"
              className="input"
              value={taxRate}
              onChange={(e) =>
                onFieldChange("meta", "taxRate", e.target.value)
              }
            />
          </div>
        </div>

        <label className="label" style={{ marginTop: 8 }}>
          Notes (optional)
        </label>
        <textarea
          className="textarea"
          value={notes}
          onChange={(e) => onFieldChange("meta", "notes", e.target.value)}
          placeholder="Payment terms, thank you note, bank details, etc."
        />
      </div>

      {/* Actions */}
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button
          type="button"
          className="button button-primary"
          onClick={onPrint}
        >
          🖨️ Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
/* ---------- Print rules for a neat single-page invoice ---------- */
@page {
  size: A4;
  margin: 10mm; /* adjust margin if you want smaller/larger printable area */
}

@media print {
  /* hide everything by default */
  body * {
    visibility: hidden !important;
    display: none !important;
  }

  /* show only the invoice preview area */
  .preview-container,
  .preview-container * {
    visibility: visible !important;
    display: block !important;
  }

  /* make the preview occupy printable A4 width and center it */
  .preview-container {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    margin: 0 auto !important;
    width: calc(210mm - 20mm) !important; /* A4 width minus left+right page margins */
    max-width: 100% !important;
    box-shadow: none !important;
    background: #fff !important;
    border-radius: 0 !important;
    padding: 8mm 12mm !important; /* inner padding for print */
    box-sizing: border-box !important;
    color: #111 !important;
    -webkit-print-color-adjust: exact !important;
  }

  /* tighten typography a bit for print so it fits nicely */
  .preview-container .invoice-title { font-size: 22px !important; }
  .preview-container .invoice-number,
  .preview-container .invoice-meta { font-size: 12px !important; }
  .preview-container .items-table th,
  .preview-container .items-table td { font-size: 12px !important; }

  /* avoid page breaks inside invoice sections */
  .preview-container, .preview-container * {
    page-break-inside: avoid !important;
  }

  /* hide explicit no-print elements if any */
  .no-print {
    display: none !important;
    visibility: hidden !important;
  }
}
