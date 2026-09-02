import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, FileText } from "lucide-react";

import { ROLES_DATA } from "@/lib/rolesData";
import { Calculator } from "@/components/Calculator";
import { AffiliateCard } from "@/components/AffiliateCard";
import { AFFILIATE_LINKS } from "@/lib/affiliates";
import { AdBanner } from "@/components/AdBanner";

interface PageProps {
  params: Promise<{ role: string }>;
}

const BASE_URL = "https://solo-ledger.com";

export async function generateStaticParams() {
  return Object.keys(ROLES_DATA).map((role) => ({ role }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const data = ROLES_DATA[role];
  if (!data) return {};

  return {
    title: `${data.title} Hourly Rate Calculator | SoloLedger`,
    description: data.description,
    keywords: data.seoKeywords,
    alternates: { canonical: `/rate/${data.slug}` },
    openGraph: {
      title: `${data.title} Hourly Rate Calculator | SoloLedger`,
      description: data.description,
      url: `${BASE_URL}/rate/${data.slug}`,
      type: "website",
    },
  };
}

export default async function RoleRatePage({ params }: PageProps) {
  const { role } = await params;
  const data = ROLES_DATA[role];

  if (!data) notFound();

  // Pick up to 4 other roles for lateral internal linking
  const relatedRoles = Object.entries(ROLES_DATA)
    .filter(([slug]) => slug !== role)
    .slice(0, 4);

  const fullUrl = `${BASE_URL}/rate/${data.slug}`;

  // Complete absolute structured data schemas
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${data.title} Rate Calculator`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: data.description,
    url: fullUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.category,
        item: `${BASE_URL}/#benchmarks`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.shortTitle,
        item: fullUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="w-full border-b border-slate-200 bg-white px-6 py-16 md:px-12 lg:px-24">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            SoloLedger
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Benchmarks</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-900">{data.shortTitle}</span>
        </nav>

        <div className="max-w-4xl">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700">
            {data.category}
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {data.title} <br className="hidden sm:block" />
            <span className="text-blue-600">Rate Calculator</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {data.description}
          </p>
        </div>
      </section>

      {/* =====================================================
          CALCULATOR
      ====================================================== */}
      <section className="w-full bg-slate-50 px-6 py-16 md:px-12 lg:px-24">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Customize your numbers
          </h2>
          <p className="mt-2 text-slate-600">
            We've pre-filled the baseline scenario for this profession. Adjust the inputs below to match your actual business goals.
          </p>
        </div>
        
        <Calculator
          initialValues={{
            targetNetIncome: data.defaultTakeHome,
            annualExpenses: data.defaultExpenses,
            billableHoursPerWeek: data.defaultBillableHours,
            vacationWeeks: data.defaultVacationWeeks,
            taxRate: data.defaultTaxRate,
          }}
        />
        <AdBanner dataAdSlot="2784443959" />
      </section>

      {/* =====================================================
          SERVICES & EXPLANATION
      ====================================================== */}
      <section className="w-full border-y border-slate-200 bg-white px-6 py-16 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-start">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Your rate is more than your salary.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {data.longDescription}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              A sustainable rate needs to account for the time you spend finding clients, answering emails, preparing proposals, managing projects, handling revisions, and doing administrative work.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Common Pricing Models
                </h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {data.pricingModels.map((model) => (
                  <span key={model} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {model}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-lg font-black text-slate-900">
                Highly-Billed Services
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.commonServices.map((service) => (
                  <div key={service} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED BENCHMARKS (Lateral Crawl Paths for Google)
      ====================================================== */}
      <section className="w-full border-b border-slate-200 bg-white px-6 py-16 md:px-12 lg:px-24">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Explore Other Freelance Rate Benchmarks
          </h2>
          <p className="mt-2 text-slate-600">
            Compare target rates, expenses, and pricing structures across other professions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedRoles.map(([slug, item]) => (
            <Link
              key={slug}
              href={`/rate/${slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-500 hover:bg-blue-50/50"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-blue-600">
                  {item.category}
                </span>
                <h3 className="mt-2 text-base font-bold text-slate-900">
                  {item.shortTitle}
                </h3>
              </div>
              <span className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600">
                View Calculator <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          TOOLS / AFFILIATES
      ====================================================== */}
      <section className="w-full bg-slate-50 px-6 py-16 md:px-12 lg:px-24">
        <div className="mb-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            The Freelance Stack
          </h2>
          <p className="mt-2 text-slate-600">
            Tools to help you run the business, track expenses, and get paid faster.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AffiliateCard
            category="Accounting & Invoicing"
            badge="Essential"
            title="FreshBooks"
            description="Track expenses, create invoices, manage projects, and keep your finances organized."
            perk="Free trial available"
            affiliateUrl={AFFILIATE_LINKS.freshbooks}
          />
          <AffiliateCard
            category="Cross-Border Payments"
            title="Wise Business"
            description="Receive international payments and manage multiple currencies with transparent rates."
            perk="Built for global payments"
            affiliateUrl={AFFILIATE_LINKS.wise}
          />
          <AffiliateCard
            category="Contracts & Compliance"
            title="Deel"
            description="Create contractor agreements and manage international freelance relationships."
            perk="Contract tools included"
            affiliateUrl={AFFILIATE_LINKS.deel}
          />
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="w-full bg-blue-600 px-6 py-20 text-center md:px-12 lg:px-24">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Stop guessing your rate.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
          Build a freelance rate around the income you actually want, the expenses you actually have, and the hours you can realistically bill.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-blue-900 transition hover:bg-slate-50 shadow-lg"
          >
            Start a Custom Calculation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}