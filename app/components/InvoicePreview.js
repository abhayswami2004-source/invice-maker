export default function InvoicePreview({
  from,
  to,
  invoiceNumber,
  invoiceDate,
  dueDate,
  items,
  taxRate,
  notes,
  currency,
}) {
  const subTotal = items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    return sum + qty * price;
  }, 0);

  const taxAmount = subTotal * ((Number(taxRate) || 0) / 100);
  const total = subTotal + taxAmount;

  const formatMoney = (value) => `${currency} ${value.toFixed(2)}`;

  return (
    <div className="preview-container">
      <div className="invoice-header">
        <div>
          <div className="invoice-title">INVOICE</div>
          <div className="invoice-number">
            #{invoiceNumber || "INV-0001"}
          </div>
        </div>
        <div className="invoice-meta">
          <div>
            <strong>Invoice Date:</strong> {invoiceDate || "-"}
          </div>
          <div>
            <strong>Due Date:</strong> {dueDate || "-"}
          </div>
        </div>
      </div>

      <div className="invoice-two-column">
        <div>
          <div className="invoice-box-title">From</div>
          <div className="invoice-text">
            {from.name || "Your Name / Business"}
            <br />
            {from.address && (
              <>
                {from.address}
                <br />
              </>
            )}
            {from.email && <>📧 {from.email}</>}
            {from.email && from.phone && <br />}
            {from.phone && <>📞 {from.phone}</>}
          </div>
        </div>
        <div>
          <div className="invoice-box-title">Bill To</div>
          <div className="invoice-text">
            {to.name || "Client Name"}
            <br />
            {to.address && (
              <>
                {to.address}
                <br />
              </>
            )}
            {to.email && <>📧 {to.email}</>}
            {to.email && to.phone && <br />}
            {to.phone && <>📞 {to.phone}</>}
          </div>
        </div>
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Item</th>
            <th style={{ width: "15%" }}>Qty</th>
            <th styl
