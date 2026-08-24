import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { ProjectPricingCalculator } from "./ProjectPricingCalculator";
import { AffiliateCard } from "@/components/AffiliateCard";
import { AFFILIATE_LINKS } from "@/lib/affiliates";

export const metadata: Metadata = {
  title: "Project Pricing Engine | SoloLedger",
  description:
    "Turn your freelance hourly rate into a realistic fixed-project price. Account for production time, administration, revisions, expenses, and project buffer.",
  keywords: [
    "project pricing calculator",
    "freelance project quote calculator",
    "fixed project pricing calculator",
  ],
};

const quoteElements = [
  {
    icon: Clock3,
    title: "Production",
    text: "The hands-on work creating the actual deliverable.",
  },
  {
    icon: FileText,
    title: "Administration",
    text: "Planning, communication, meetings, and project management.",
  },
  {
    icon: CheckCircle2,
    title: "Revisions",
    text: "Changes and adjustments requested after initial delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Project Buffer",
    text: "Protection against scope creep and unexpected technical delays.",
  },
];

export default function ProjectPricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SoloLedger Project Pricing Engine",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    description:
      "Calculate a freelance project price using hourly rate, project hours, administration, revisions, expenses, and a project buffer.",
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
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Target className="h-4 w-4" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Project Pricing Engine
            </h1>
          </div>

          <p className="mt-2 max-w-2xl text-xs text-slate-500 sm:text-sm">
            Turn your freelance hourly rate into a realistic fixed-project price. Account for production time, administration, revisions, expenses, and project buffer before sending a quote.
          </p>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Pre-Quote Estimate
          </span>
        </div>
      </div>

      {/* Calculator Engine (Full-Bleed Card) */}
      <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-6 lg:p-8">
        <ProjectPricingCalculator />
      </div>

      {/* Quote Elements Grid */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">
              The anatomy of a fixed-price project.
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              A realistic project quote accounts for everything required to take a project from the first conversation to final delivery.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quoteElements.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/50 p-4"
              >
                <Icon className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-bold text-slate-900">
                  {item.title}
                </span>
                <span className="text-xs text-slate-500 leading-relaxed">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Affiliate Cross-Sell */}
      <div className="w-full space-y-3">
        <h2 className="text-base font-black text-slate-900">
          Professional Tooling for Fixed-Price Projects
        </h2>
        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500">
          Once you have your project price calculated, use these platforms to draft a professional proposal, build a compliant contract, and collect the final payment.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AffiliateCard
            category="Proposals & Invoicing"
            badge="Top Pick"
            title="FreshBooks"
            description="Turn your estimate into a professional proposal, collect digital signatures, and automatically convert it into an invoice."
            perk="Free trial available"
            affiliateUrl={AFFILIATE_LINKS?.freshbooks || "https://freshbooks.com"}
          />
          <AffiliateCard
            category="Global Payments"
            title="Wise Business"
            description="Collect large milestone payments from international clients with zero hidden exchange markup and low fees."
            perk="Zero fee on first transfer"
            affiliateUrl={AFFILIATE_LINKS?.wise || "https://wise.com"}
          />
          <AffiliateCard
            category="Contracts & Milestones"
            title="Deel"
            description="Protect your project scope with compliant independent contractor agreements and milestone-based payments."
            perk="Free Standard Templates"
            affiliateUrl={AFFILIATE_LINKS?.deel || "https://deel.com"}
          />
        </div>
      </div>
    </div>
  );
}