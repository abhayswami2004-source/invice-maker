"use client";

import { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import "./globals.css";

export default function HomePage() {
  const today = new Date().toISOString().slice(0, 10);

  const [from, setFrom] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [to, setTo] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [meta, setMeta] = useState({
    invoiceNumber: "INV-0001",
    invoiceDate: today,
    dueDate: "",
    taxRate: 0,
    notes: "Thank you for your business.",
    currency: "₹",
  });

  const [items, setItems] = useState([
    { description: "Service / Product", quantity: 1, unitPrice: 0 },
  ]);

  const handleFieldChange = (section, field, value) => {
    if (section === "from") {
      setFrom((prev) => ({ ...prev, [field]: value }));
    } else if (section === "to") {
      setTo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "meta") {
      setMeta((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleItemChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { description: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const handleRemoveItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="main-container">
      <div className="app-shell">
        <InvoiceForm
          from={from}
          to={to}
          invoiceNumber={meta.invoiceNumber}
          invoiceDate={meta.invoiceDate}
          dueDate={meta.dueDate}
          items={items}
          taxRate={meta.taxRate}
          notes={meta.notes}
          currency={meta.currency}
          onFieldChange={handleFieldChange}
          onItemChange={handleItemChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />

        <InvoicePreview
          from={from}
          to={to}
          invoiceNumber={meta.invoiceNumber}
          invoiceDate={meta.invoiceDate}
          dueDate={meta.dueDate}
          items={items}
          taxRate={meta.taxRate}
          notes={meta.notes}
          currency={meta.currency}
        />
      </div>
    </main>
  );
}
