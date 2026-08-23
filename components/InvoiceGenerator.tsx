'use client';

import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LineItem {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

export function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [senderName, setSenderName] = useState('Your Business Name');
  const [senderEmail, setSenderEmail] = useState('you@example.com');
  const [clientName, setClientName] = useState('Client Business LLC');
  const [clientEmail, setClientEmail] = useState('billing@client.com');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: 'Consulting & Engineering Work', hours: 20, rate: 100 },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: 'New service item', hours: 1, rate: 100 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof LineItem, val: string | number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.hours * item.rate, 0);

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${invoiceNumber || 'invoice'}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {isGenerating ? 'Generating PDF...' : 'Download Invoice PDF'}
        </button>
      </div>

      {/* Printable Sheet */}
      <div
        ref={printRef}
        className="rounded-2xl border border-zinc-200 bg-white p-8 text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
      >
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">INVOICE</span>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="mt-1 block text-2xl font-extrabold bg-transparent border-b border-transparent hover:border-zinc-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500">Payment Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="block rounded-lg border border-zinc-300 bg-transparent px-3 py-1.5 text-sm dark:border-zinc-700"
            />
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-zinc-400">From (Your Details)</span>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your Name / LLC"
              className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1.5 text-sm dark:border-zinc-700"
            />
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1.5 text-sm dark:border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-zinc-400">Billed To (Client)</span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client Name / Business"
              className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1.5 text-sm dark:border-zinc-700"
            />
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Client Email"
              className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1.5 text-sm dark:border-zinc-700"
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
              <tr>
                <th className="py-3 px-2">Description</th>
                <th className="py-3 px-2 w-24">Hours/Qty</th>
                <th className="py-3 px-2 w-28">Rate ($)</th>
                <th className="py-3 px-2 w-28">Amount</th>
                <th className="py-3 px-2 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-0 p-0 text-sm"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      value={item.hours}
                      onChange={(e) => updateItem(item.id, 'hours', Number(e.target.value))}
                      className="w-full rounded border border-zinc-200 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                      className="w-full rounded border border-zinc-200 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
                    />
                  </td>
                  <td className="py-2 px-2 font-medium">
                    ${(item.hours * item.rate).toLocaleString()}
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-400 hover:text-red-500"
                      title="Delete line item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <button
            onClick={addItem}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            <Plus className="h-3.5 w-3.5" /> Add Line Item
          </button>
        </div>

        {/* Total calculation */}
        <div className="mt-6 flex justify-end border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-base font-bold">
              <span>Total Due:</span>
              <span className="text-blue-600 dark:text-blue-400">${subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}