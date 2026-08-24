import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { InvoiceGenerator } from "@/components/InvoiceGenerator";
import { AffiliateCard } from "@/components/AffiliateCard";
import { AFFILIATE_LINKS } from "@/lib/affiliates";

export const metadata: Metadata = {
  title: "Free Invoice Generator for Freelancers | SoloLedger",
  description:
    "Create professional freelance invoices, calculate totals, and download polished PDF invoices instantly with SoloLedger. No signup required.",
  keywords: [
    "free invoice generator",
    "freelance invoice generator",
    "invoice maker",
    "freelance invoice maker pdf",
    "contractor invoice generator",
    "free invoice template",
    "self employed invoice generator",
  ],
};

const benefits = [
  "Create professional invoices in minutes",
  "Automatically calculate line-item totals",
  "Download your invoice as a PDF",
  "No account or signup required",
  "Works directly in your browser",
  "Designed specifically for freelancers",
];

export default function InvoicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SoloLedger Free Invoice Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Free invoice generator for freelancers and independent contractors.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen w-full bg-slate-100/70 p-4 sm:p-6 lg:p-8 xl:p-10 space-y-6 sm:space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Top Application Header Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:p-6">
        <div>
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText className="h-4 w-4" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Free Freelance Invoice Generator
            </h1>
          </div>

          <p className="mt-2 max-w-2xl text-xs text-slate-500 sm:text-sm">
            Build a clean, professional freelance invoice, calculate what your
            client owes, and download a ready-to-send PDF in seconds. No signup
            required.
          </p>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Secure Browser-Based Tool
          </span>
        </div>
      </div>

      {/* Workspace Wrapper */}
      <div className="w-full">
        <InvoiceGenerator />
      </div>

      {/* Benefits Grid */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">
              Everything you need for a simple invoice.
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              SoloLedger keeps invoicing simple. You shouldn't need an
              accounting degree just to send a client a bill.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span className="text-xs font-bold text-slate-700">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Cross-Sell */}
      <div className="w-full space-y-3">
        <h2 className="text-base font-black text-slate-900">
          Ready to automate your billing?
        </h2>
        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500">
          Tired of making manual invoices? Automate recurring client billing,
          send late payment reminders, and accept credit cards directly with
          dedicated software.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AffiliateCard
            category="Automated Billing"
            badge="Top Pick"
            title="FreshBooks"
            description="Automate recurring invoices, accept online payments, track expenses, and simplify your freelance bookkeeping."
            perk="Free trial available"
            affiliateUrl={AFFILIATE_LINKS?.freshbooks || "https://freshbooks.com"}
          />
          <AffiliateCard
            category="Global Payments"
            title="Wise Business"
            description="Receive international client payments and manage multiple currencies while keeping transfer costs under control."
            perk="Zero fee on first transfer"
            affiliateUrl={AFFILIATE_LINKS?.wise || "https://wise.com"}
          />
          <AffiliateCard
            category="Contractor Management"
            title="Deel"
            description="Manage international contracts, payments, and contractor workflows when your freelance business works across borders."
            perk="Free Standard Templates"
            affiliateUrl={AFFILIATE_LINKS?.deel || "https://deel.com"}
          />
        </div>
      </div>
    </div>
  );
}