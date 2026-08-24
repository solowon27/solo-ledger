import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
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
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* SEO structured data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.06),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              SoloLedger
            </Link>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <FileText className="h-5 w-5" />
              </div>

              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-400">
                Free Tool
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
              Create a professional invoice
              <span className="block text-blue-600">
                without the paperwork.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Build a clean, professional freelance invoice, calculate what
              your client owes, and download a ready-to-send PDF in seconds.
              No signup. No complicated software.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Free to use
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                PDF download
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No account required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INVOICE GENERATOR
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Invoice workspace
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              Build your invoice
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
              Enter your details, add your services, and export the finished
              invoice as a PDF.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-500 shadow-sm sm:flex dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Browser-based
          </div>
        </div>

        <InvoiceGenerator />
      </section>

      {/* =====================================================
          WHY USE SOLOLEDGER
      ====================================================== */}

      <section className="border-y border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                <Sparkles className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                Everything you need for a simple invoice.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                SoloLedger keeps invoicing simple. You shouldn't need an
                accounting degree just to send a client a bill.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CROSS SELL
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
            Grow your freelance business
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
            Ready to make invoicing easier?
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            SoloLedger gives you the tools to calculate what you should
            charge, invoice clients, and run your freelance business more
            professionally.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AffiliateCard
            category="Automated Billing"
            badge="Top Pick"
            title="FreshBooks"
            description="Automate recurring invoices, accept online payments, track expenses, and simplify your freelance bookkeeping."
            perk="Free trial available"
            affiliateUrl={AFFILIATE_LINKS.freshbooks}
          />

          <AffiliateCard
            category="Global Payments"
            title="Wise Business"
            description="Receive international client payments and manage multiple currencies while keeping transfer costs under control."
            perk="Built for international payments"
            affiliateUrl={AFFILIATE_LINKS.wise}
          />

          <AffiliateCard
            category="Contractor Management"
            title="Deel"
            description="Manage international contracts, payments, and contractor workflows when your freelance business works across borders."
            perk="Contract tools available"
            affiliateUrl={AFFILIATE_LINKS.deel}
          />
        </div>
      </section>

      {/* =====================================================
          RATE CALCULATOR CTA
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">
                Don't undercharge
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Know what you should charge before you send the quote.
              </h2>

              <p className="mt-4 text-sm leading-6 text-zinc-400">
                Calculate a sustainable freelance hourly rate based on your
                income goal, business expenses, taxes, vacation, and realistic
                billable hours.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-zinc-100"
            >
              Calculate My Rate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}