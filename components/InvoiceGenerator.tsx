'use client';

import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

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
    const element = printRef.current;

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210;
    const pageHeight = 297;

    const img = new Image();

    img.onload = () => {
      const imgHeight = (img.height * imgWidth) / img.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(
        dataUrl,
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;

        pdf.addPage();

        pdf.addImage(
          dataUrl,
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pageHeight;
      }

      pdf.save(`${invoiceNumber || 'invoice'}.pdf`);

      setIsGenerating(false);
    };

    img.onerror = () => {
      throw new Error('Unable to load generated invoice image.');
    };

    img.src = dataUrl;
  } catch (err) {
    console.error('PDF export failed:', err);
    setIsGenerating(false);
  }
};

  return (
    <div className="space-y-6">
      
      {/* Printable Sheet */}
      <div
        ref={printRef}
        className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 text-slate-900 shadow-sm"
      >
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
              INVOICE
            </span>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="mt-1 block w-full bg-transparent text-3xl font-black text-slate-900 border-b-2 border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="sm:text-right">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Payment Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-2 block w-full sm:w-auto rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
            />
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2">
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              From (Your Details)
            </span>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your Name / LLC"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
            />
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
            />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Billed To (Client)
            </span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client Name / Business"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
            />
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Client Email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/50">
              <tr>
                <th className="py-3 px-3 text-[10px] font-black uppercase tracking-wider text-slate-500">Description</th>
                <th className="py-3 px-3 w-28 text-[10px] font-black uppercase tracking-wider text-slate-500">Hours/Qty</th>
                <th className="py-3 px-3 w-32 text-[10px] font-black uppercase tracking-wider text-slate-500">Rate ($)</th>
                <th className="py-3 px-3 w-32 text-[10px] font-black uppercase tracking-wider text-slate-500">Amount</th>
                <th className="py-3 px-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none p-1 text-sm font-bold text-slate-900 transition-colors"
                      placeholder="Service description"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.hours}
                      onChange={(e) => updateItem(item.id, 'hours', Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </td>
                  <td className="py-3 px-3 text-base font-black text-slate-900">
                    ${(item.hours * item.rate).toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
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
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100 hover:text-blue-700"
          >
            <Plus className="h-3.5 w-3.5" /> Add Line Item
          </button>
        </div>

        {/* Total Calculation */}
        <div className="mt-10 flex justify-end border-t border-slate-200 pt-6">
          <div className="w-72 rounded-2xl bg-slate-50 p-5 border border-slate-200/60">
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold text-slate-500">Total Due:</span>
              <span className="text-2xl font-black text-slate-900">
                ${subtotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar (Moved to the bottom) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-inner">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-slate-800">Invoice Builder</span>
        </div>
        
        <button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
        >
          <Download className="h-4 w-4" />
          {isGenerating ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

    </div>
  );
}