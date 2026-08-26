import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileCheck2,
  FileText,
  Globe2,
  LockKeyhole,
  ReceiptText,
  Sparkles,
  Zap,
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
  {
    icon: FileCheck2,
    title: "Professional invoices",
    description:
      "Create clean, client-ready invoices without complicated accounting software.",
  },
  {
    icon: Zap,
    title: "Automatic calculations",
    description:
      "Line-item amounts and invoice totals update automatically as you work.",
  },
  {
    icon: ReceiptText,
    title: "PDF ready",
    description:
      "Download a polished PDF that you can immediately send to your client.",
  },
  {
    icon: Globe2,
    title: "Built for freelancers",
    description:
      "Designed around services, hourly work, projects, and independent contracts.",
  },
  {
    icon: LockKeyhole,
    title: "Browser-based",
    description:
      "Build your invoice directly in your browser without creating an account.",
  },
  {
    icon: CheckCircle2,
    title: "Simple by design",
    description:
      "No bloated accounting dashboard. Just the tools you need to get paid.",
  },
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
    <main className="min-h-screen w-full bg-zinc-50 text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* =========================================================
          PAGE SHELL
      ========================================================== */}

      <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">
        <div className="space-y-8 lg:space-y-10">

          {/* =====================================================
              TOP NAV / CONTEXT BAR
          ====================================================== */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="group inline-flex w-fit items-center gap-2 text-xs font-bold text-zinc-500 transition hover:text-zinc-950"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm transition group-hover:-translate-x-0.5 group-hover:border-zinc-300">
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>

              <span>Back to SoloLedger</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Free tool
              </span>

              <span className="hidden items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-bold text-zinc-500 sm:inline-flex">
                <LockKeyhole className="h-3 w-3" />
                No signup required
              </span>
            </div>
          </div>

          {/* =====================================================
              HERO
          ====================================================== */}

          <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

            <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 xl:px-16">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

                {/* Hero copy */}
                <div className="max-w-4xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    <FileText className="h-3.5 w-3.5" />
                    Freelance invoicing
                  </div>

                  <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] text-zinc-950 sm:text-5xl lg:text-6xl xl:text-7xl">
                    Create an invoice.
                    <br />
                    <span className="text-blue-600">
                      Get paid faster.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base sm:leading-7 lg:text-lg">
                    Build a professional freelance invoice, calculate your
                    project total, and download a ready-to-send PDF in seconds.
                    No accounting software. No signup. No unnecessary complexity.
                  </p>

                  {/* Trust row */}
                  <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Free to use
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Instant PDF
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      No account
                    </div>
                  </div>
                </div>

                {/* Hero badge */}
                <div className="hidden lg:block">
                  <div className="relative w-64 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <ReceiptText className="h-5 w-5" />
                      </div>

                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-600">
                        Ready
                      </span>
                    </div>

                    <div className="mt-6">
                      <div className="text-[9px] font-black uppercase tracking-[0.16em] text-zinc-400">
                        Invoice total
                      </div>

                      <div className="mt-1 text-3xl font-black tracking-tight text-zinc-950">
                        $4,250
                      </div>
                    </div>

                    <div className="mt-5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="h-2 w-20 rounded-full bg-zinc-200" />
                        <span className="h-2 w-10 rounded-full bg-zinc-100" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="h-2 w-24 rounded-full bg-zinc-200" />
                        <span className="h-2 w-14 rounded-full bg-zinc-100" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="h-2 w-16 rounded-full bg-zinc-200" />
                        <span className="h-2 w-12 rounded-full bg-zinc-100" />
                      </div>
                    </div>

                    <div className="mt-5 border-t border-zinc-200 pt-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                        <Check className="h-3.5 w-3.5" />
                        Professional PDF
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              CALCULATOR SECTION HEADER
          ====================================================== */}

          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                  Invoice builder
                </div>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl">
                  Build your invoice
                </h2>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500 sm:text-sm">
                  Add your business details, client information, services,
                  rates, and quantities. Your invoice updates as you type.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-[10px] font-bold text-zinc-400 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live calculation
              </div>
            </div>

            {/* =================================================
                ACTUAL INVOICE GENERATOR
            ================================================== */}

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-2 shadow-sm sm:p-3 lg:p-4">
              <InvoiceGenerator />
            </div>
          </section>

          {/* =====================================================
              BENEFITS
          ====================================================== */}

          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-2xl font-black tracking-tight text-zinc-950">
                  Everything you need to send a professional invoice.
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  SoloLedger gives freelancers the essentials without turning
                  a simple invoice into a complicated accounting workflow.
                </p>
              </div>

              <div className="hidden rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 sm:block">
                <div className="text-[9px] font-black uppercase tracking-[0.16em] text-zinc-400">
                  Built for
                </div>

                <div className="mt-1 text-sm font-black text-zinc-900">
                  Freelancers & contractors
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-zinc-600 shadow-sm ring-1 ring-zinc-200 transition group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:ring-blue-100">
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className="mt-4 text-sm font-black text-zinc-950">
                      {benefit.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-zinc-500">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* =====================================================
              SIMPLE WORKFLOW
          ====================================================== */}

          <section className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-400">
                  Simple workflow
                </div>

                <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  From work completed
                  <br />
                  to invoice sent.
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
                  Keep your billing process simple. Enter your information,
                  review the total, and download your invoice.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <WorkflowStep
                  number="01"
                  title="Add details"
                  description="Enter your business and client information."
                />

                <WorkflowStep
                  number="02"
                  title="Add services"
                  description="List your work, hours, quantities, and rates."
                />

                <WorkflowStep
                  number="03"
                  title="Download"
                  description="Generate a polished PDF ready to send."
                />
              </div>
            </div>
          </section>

          {/* =====================================================
              AFFILIATE / BUSINESS TOOLS
          ====================================================== */}

          <section>
            <div className="mb-6">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                When you grow
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950">
                Need more than a simple invoice?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
                Once your freelance business grows, dedicated billing and
                payment platforms can help automate recurring invoices,
                international payments, bookkeeping, and contractor workflows.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <AffiliateCard
                category="Automated Billing"
                badge="Top Pick"
                title="FreshBooks"
                description="Automate recurring invoices, accept online payments, track expenses, and simplify your freelance bookkeeping."
                perk="Free trial available"
                affiliateUrl={
                  AFFILIATE_LINKS?.freshbooks || "https://freshbooks.com"
                }
              />

              <AffiliateCard
                category="Global Payments"
                title="Wise Business"
                description="Receive international client payments and manage multiple currencies while keeping transfer costs under control."
                perk="Zero fee on first transfer"
                affiliateUrl={
                  AFFILIATE_LINKS?.wise || "https://wise.com"
                }
              />

              <AffiliateCard
                category="Contractor Management"
                title="Deel"
                description="Manage international contracts, payments, and contractor workflows when your freelance business works across borders."
                perk="Free Standard Templates"
                affiliateUrl={
                  AFFILIATE_LINKS?.deel || "https://deel.com"
                }
              />
            </div>
          </section>

          {/* =====================================================
              FINAL CTA
          ====================================================== */}

          <section className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  SoloLedger
                </div>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950">
                  Ready to send your invoice?
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-500">
                  Build it above, download the PDF, and send it to your client.
                </p>
              </div>

              <Link
                href="/"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-zinc-800"
              >
                Explore SoloLedger
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </section>

          {/* =====================================================
              FOOTER NOTE
          ====================================================== */}

          <div className="pb-4 text-center text-[10px] font-medium text-zinc-400">
            SoloLedger invoice generator is provided for general business
            purposes and does not constitute accounting, tax, or legal advice.
          </div>
        </div>
      </div>
    </main>
  );
}

/* ===============================================================
   WORKFLOW STEP
================================================================ */

function WorkflowStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.07]">
      <div className="text-[10px] font-black tracking-[0.16em] text-blue-400">
        {number}
      </div>

      <h3 className="mt-5 text-sm font-black text-white">
        {title}
      </h3>

      <p className="mt-1.5 text-xs leading-5 text-zinc-400">
        {description}
      </p>
    </div>
  );
}