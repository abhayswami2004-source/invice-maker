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
      <div id="invoice-pdf" div className="preview-container">
      {/* Header */}
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

      {/* From / To */}
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

      {/* Items table */}
      <table className="items-table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Item</th>
            <th style={{ width: "15%" }}>Qty</th>
            <th style={{ width: "20%" }}>Unit Price</th>
            <th style={{ width: "25%" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td
                colSpan={4}
                style={{ fontSize: 12, color: "#9ca3af" }}
              >
                No items yet. Add line items on the left.
              </td>
            </tr>
          )}

          {items.map((item, index) => {
            const lineTotal =
              (Number(item.quantity) || 0) *
              (Number(item.unitPrice) || 0);

            return (
              <tr key={index}>
                <td>{item.description || "Item"}</td>
                <td>{item.quantity || 0}</td>
                <td className="amount">
                  {formatMoney(Number(item.unitPrice) || 0)}
                </td>
                <td className="amount">
                  {formatMoney(lineTotal)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Summary */}
      <div className="summary-row">
        <table className="summary-table">
          <tbody>
            <tr>
              <td className="summary-label">Subtotal</td>
              <td className="summary-value">
                {formatMoney(subTotal)}
              </td>
            </tr>
            <tr>
              <td className="summary-label">
                Tax ({taxRate || 0}%)
              </td>
              <td className="summary-value">
                {formatMoney(taxAmount)}
              </td>
            </tr>
            <tr>
              <td className="summary-label summary-total">
                Total
              </td>
              <td className="summary-value summary-total">
                {formatMoney(total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notes */}
      {notes && (
        <div className="footer-note">
          <strong>Notes:</strong>
          <br />
          {notes}
        </div>
      )}

      <div
        style={{
          fontSize: 11,
          color: "#9ca3af",
          marginTop: 12,
        }}
      >
        Thank you for your business!
      </div>
    </div>
  );
}
