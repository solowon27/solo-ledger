"use client";

import React, { useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  Download,
  FileText,
  Mail,
  MapPin,
  Plus,
  ReceiptText,
  RotateCcw,
  Trash2,
} from "lucide-react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const DEFAULT_ITEMS: LineItem[] = [
  {
    id: "1",
    description: "Consulting & Engineering Work",
    quantity: 20,
    rate: 100,
  },
];

const today = new Date();
const defaultIssueDate = today.toISOString().split("T")[0];

const defaultDueDate = new Date(
  today.getTime() + 14 * 24 * 60 * 60 * 1000,
)
  .toISOString()
  .split("T")[0];

function formatCurrency(value: number) {
  return `$${Math.max(0, value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value: string) {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");

  const [issueDate, setIssueDate] = useState(defaultIssueDate);
  const [dueDate, setDueDate] = useState(defaultDueDate);

  const [senderName, setSenderName] = useState("Your Business Name");
  const [senderEmail, setSenderEmail] = useState("you@example.com");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderWebsite, setSenderWebsite] = useState("");

  const [clientName, setClientName] = useState("Client Business LLC");
  const [clientEmail, setClientEmail] = useState("billing@client.com");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  const [paymentTerms, setPaymentTerms] = useState("Net 14");

  const [items, setItems] = useState<LineItem[]>(DEFAULT_ITEMS);

  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [notes, setNotes] = useState(
    "Thank you for your business. Please include the invoice number with your payment.",
  );

  const [paymentInstructions, setPaymentInstructions] = useState(
    "Payment can be made by bank transfer or your agreed payment method.",
  );

  const [isGenerating, setIsGenerating] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    setItems((current) => [
      ...current,
      {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        rate: 100,
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((current) => {
      if (current.length <= 1) return current;
      return current.filter((item) => item.id !== id);
    });
  };

  const updateItem = (
    id: string,
    field: keyof LineItem,
    value: string | number,
  ) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                typeof value === "number"
                  ? Math.max(0, value)
                  : value,
            }
          : item,
      ),
    );
  };

  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.rate,
    0,
  );

  const discountAmount = Math.min(
    subtotal,
    Math.max(0, discount),
  );

  const taxableAmount = Math.max(
    0,
    subtotal - discountAmount,
  );

  const taxAmount =
    taxableAmount * (Math.max(0, taxRate) / 100);

  const total = taxableAmount + taxAmount;

  const resetInvoice = () => {
    setInvoiceNumber("INV-001");

    setIssueDate(defaultIssueDate);
    setDueDate(defaultDueDate);

    setSenderName("Your Business Name");
    setSenderEmail("you@example.com");
    setSenderPhone("");
    setSenderAddress("");
    setSenderWebsite("");

    setClientName("Client Business LLC");
    setClientEmail("billing@client.com");
    setClientPhone("");
    setClientAddress("");

    setPaymentTerms("Net 14");

    setItems(DEFAULT_ITEMS);

    setTaxRate(0);
    setDiscount(0);

    setNotes(
      "Thank you for your business. Please include the invoice number with your payment.",
    );

    setPaymentInstructions(
      "Payment can be made by bank transfer or your agreed payment method.",
    );
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;

    setIsGenerating(true);

    try {
      const element = printRef.current;

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        filter: (node) => {
          if (!(node instanceof HTMLElement)) return true;

          return !node.classList.contains(
            "invoice-editor-only",
          );
        },
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 297;

      const img = new Image();

      img.onload = () => {
        const imgHeight =
          (img.height * imgWidth) / img.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(
          dataUrl,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
        );

        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position -= pageHeight;

          pdf.addPage();

          pdf.addImage(
            dataUrl,
            "PNG",
            0,
            position,
            imgWidth,
            imgHeight,
          );

          heightLeft -= pageHeight;
        }

        pdf.save(`${invoiceNumber || "invoice"}.pdf`);

        setIsGenerating(false);
      };

      img.onerror = () => {
        console.error("Unable to load generated invoice image.");
        setIsGenerating(false);
      };

      img.src = dataUrl;
    } catch (error) {
      console.error("PDF export failed:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* =========================================================
          EDITOR HEADER
      ========================================================== */}

      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
            <ReceiptText className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
              Invoice builder
            </div>

            <h2 className="mt-1 text-lg font-black tracking-tight text-zinc-950">
              Create a professional invoice
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Add your business, client, services, payment terms,
              taxes, and notes.
            </p>
          </div>
        </div>

        <div className="invoice-editor-only flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={resetInvoice}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-black text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* =========================================================
          INVOICE
      ========================================================== */}

      <div
        ref={printRef}
        className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
      >
        {/* =======================================================
            TOP BRAND / INVOICE META
        ======================================================== */}

        <div className="border-b border-zinc-200 p-6 sm:p-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
                INVOICE
              </div>

              <input
                type="text"
                value={invoiceNumber}
                onChange={(event) =>
                  setInvoiceNumber(event.target.value)
                }
                className="mt-2 w-full max-w-md border-b-2 border-transparent bg-transparent text-3xl font-black tracking-tight text-zinc-950 outline-none transition hover:border-zinc-200 focus:border-blue-500 sm:text-4xl"
                aria-label="Invoice number"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-bold text-zinc-500">
                  {paymentTerms}
                </div>

                <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
                  Due {formatDate(dueDate)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
              <InvoiceMetaField
                icon={CalendarDays}
                label="Issue date"
                value={issueDate}
                type="date"
                onChange={setIssueDate}
              />

              <InvoiceMetaField
                icon={CalendarDays}
                label="Due date"
                value={dueDate}
                type="date"
                onChange={setDueDate}
              />

              <div className="col-span-2">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Payment terms
                  </span>

                  <select
                    value={paymentTerms}
                    onChange={(event) =>
                      setPaymentTerms(event.target.value)
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-xs font-bold text-zinc-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="Due on receipt">
                      Due on receipt
                    </option>
                    <option value="Net 7">Net 7</option>
                    <option value="Net 14">Net 14</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 45">Net 45</option>
                    <option value="Net 60">Net 60</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            BUSINESS + CLIENT
        ======================================================== */}

        <div className="grid border-b border-zinc-200 lg:grid-cols-2">
          <div className="border-b border-zinc-200 p-6 lg:border-b-0 lg:border-r sm:p-8">
            <SectionLabel>From</SectionLabel>

            <div className="mt-4 space-y-3">
              <TextInput
                value={senderName}
                onChange={setSenderName}
                placeholder="Your business or name"
                className="text-base"
              />

              <TextInput
                value={senderEmail}
                onChange={setSenderEmail}
                placeholder="Email address"
                type="email"
              />

              <TextInput
                value={senderPhone}
                onChange={setSenderPhone}
                placeholder="Phone number"
              />

              <TextArea
                value={senderAddress}
                onChange={setSenderAddress}
                placeholder="Business address"
                rows={2}
              />

              <TextInput
                value={senderWebsite}
                onChange={setSenderWebsite}
                placeholder="Website (optional)"
              />
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <SectionLabel>Billed to</SectionLabel>

            <div className="mt-4 space-y-3">
              <TextInput
                value={clientName}
                onChange={setClientName}
                placeholder="Client business or name"
                className="text-base"
              />

              <TextInput
                value={clientEmail}
                onChange={setClientEmail}
                placeholder="Client email"
                type="email"
              />

              <TextInput
                value={clientPhone}
                onChange={setClientPhone}
                placeholder="Client phone"
              />

              <TextArea
                value={clientAddress}
                onChange={setClientAddress}
                placeholder="Client billing address"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            LINE ITEMS
        ======================================================== */}

        <div className="p-6 sm:p-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>Services & items</SectionLabel>

              <p className="mt-1 text-xs text-zinc-500">
                Add each service, deliverable, expense, or other
                billable item separately.
              </p>
            </div>

            <button
              type="button"
              onClick={addItem}
              className="invoice-editor-only inline-flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3.5 py-2.5 text-xs font-black text-blue-700 transition hover:bg-blue-100"
            >
              <Plus className="h-3.5 w-3.5" />
              Add item
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="w-full min-w-[680px] text-left">
              <thead className="border-b border-zinc-200 bg-zinc-50">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Description
                  </th>

                  <th className="w-28 px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Qty
                  </th>

                  <th className="w-36 px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Rate
                  </th>

                  <th className="w-36 px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Amount
                  </th>

                  <th className="invoice-editor-only w-12 px-2 py-3" />
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-zinc-50/60"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(event) =>
                          updateItem(
                            item.id,
                            "description",
                            event.target.value,
                          )
                        }
                        placeholder="Service or deliverable"
                        className="w-full border-b border-transparent bg-transparent px-1 py-1 text-sm font-bold text-zinc-900 outline-none transition placeholder:text-zinc-300 hover:border-zinc-200 focus:border-blue-500"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={item.quantity}
                        onChange={(event) =>
                          updateItem(
                            item.id,
                            "quantity",
                            Number(event.target.value),
                          )
                        }
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-right text-sm font-bold text-zinc-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
                          $
                        </span>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={item.rate}
                          onChange={(event) =>
                            updateItem(
                              item.id,
                              "rate",
                              Number(event.target.value),
                            )
                          }
                          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-7 pr-3 text-right text-sm font-bold text-zinc-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>
                    </td>

                    <td className="px-4 py-4 text-right text-sm font-black text-zinc-950">
                      {formatCurrency(
                        item.quantity * item.rate,
                      )}
                    </td>

                    <td className="invoice-editor-only px-2 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length <= 1}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-300 transition hover:bg-red-50 hover:text-red-500 disabled:pointer-events-none disabled:opacity-30"
                        title="Delete item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =======================================================
            TOTALS
        ======================================================== */}

        <div className="border-t border-zinc-200 bg-zinc-50/60 p-6 sm:p-8">
          <div className="flex justify-end">
            <div className="w-full max-w-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-zinc-500">
                    Subtotal
                  </span>

                  <span className="font-bold text-zinc-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm text-zinc-500">
                    Discount
                  </label>

                  <div className="relative w-28">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
                      $
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={discount}
                      onChange={(event) =>
                        setDiscount(
                          Math.max(
                            0,
                            Number(event.target.value) || 0,
                          ),
                        )
                      }
                      className="invoice-editor-only w-full rounded-lg border border-zinc-200 bg-white py-2 pl-7 pr-2 text-right text-xs font-bold text-zinc-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <span className="hidden text-sm font-bold text-zinc-900">
                      {formatCurrency(discountAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-zinc-500">
                    Tax
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="invoice-editor-only relative w-20">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={taxRate}
                        onChange={(event) =>
                          setTaxRate(
                            Math.min(
                              100,
                              Math.max(
                                0,
                                Number(event.target.value) || 0,
                              ),
                            ),
                          )
                        }
                        className="w-full rounded-lg border border-zinc-200 bg-white px-2 py-2 text-right text-xs font-bold text-zinc-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
                        %
                      </span>
                    </div>

                    <span className="hidden">
                      {formatCurrency(taxAmount)}
                    </span>

                    <span className="text-sm font-bold text-zinc-900">
                      {formatCurrency(taxAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-zinc-200 pt-5">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                      Total due
                    </div>

                    <div className="mt-1 text-xs text-zinc-500">
                      Due {formatDate(dueDate)}
                    </div>
                  </div>

                  <div className="text-3xl font-black tracking-tight text-zinc-950">
                    {formatCurrency(total)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            PAYMENT + NOTES
        ======================================================== */}

        <div className="grid border-t border-zinc-200 lg:grid-cols-2">
          <div className="border-b border-zinc-200 p-6 lg:border-b-0 lg:border-r sm:p-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>

              <SectionLabel>
                Payment instructions
              </SectionLabel>
            </div>

            <textarea
              value={paymentInstructions}
              onChange={(event) =>
                setPaymentInstructions(event.target.value)
              }
              rows={4}
              className="mt-4 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs leading-5 text-zinc-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              placeholder="Bank details, payment link, payment method, etc."
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100">
                <FileText className="h-4 w-4 text-zinc-600" />
              </div>

              <SectionLabel>
                Notes & terms
              </SectionLabel>
            </div>

            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              rows={4}
              className="mt-4 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs leading-5 text-zinc-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              placeholder="Thank-you message, project terms, late payment terms, etc."
            />
          </div>
        </div>

        {/* =======================================================
            FOOTER
        ======================================================== */}

        <div className="border-t border-zinc-200 bg-zinc-950 px-6 py-5 text-white sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-black">
                {senderName || "Your Business"}
              </div>

              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-400">
                {senderEmail && (
                  <span>{senderEmail}</span>
                )}

                {senderPhone && (
                  <span>{senderPhone}</span>
                )}

                {senderWebsite && (
                  <span>{senderWebsite}</span>
                )}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                Amount due
              </div>

              <div className="mt-1 text-lg font-black text-white">
                {formatCurrency(total)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          DOWNLOAD BAR
      ========================================================== */}

      <div className="invoice-editor-only flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
            <Check className="h-4 w-4 text-blue-600" />
          </div>

          <div>
            <div className="text-xs font-black text-zinc-900">
              Invoice ready
            </div>

            <div className="text-[11px] text-zinc-500">
              Review the details, then export your professional PDF.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
        >
          <Download className="h-4 w-4" />
          {isGenerating
            ? "Generating PDF..."
            : "Download Invoice PDF"}
        </button>
      </div>
    </div>
  );
}

/* ===============================================================
   SMALL COMPONENTS
================================================================ */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      className={`w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 outline-none transition placeholder:text-zinc-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${className}`}
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold leading-5 text-zinc-900 outline-none transition placeholder:text-zinc-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
    />
  );
}

function InvoiceMetaField({
  icon: Icon,
  label,
  value,
  type,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-400">
        <Icon className="h-3 w-3" />
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-xs font-bold text-zinc-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
    </label>
  );
}