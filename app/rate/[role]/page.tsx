import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  FileText,
  Info,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

import { ROLES_DATA } from "@/lib/rolesData";
import { Calculator } from "@/components/Calculator";
import { AffiliateCard } from "@/components/AffiliateCard";
import { AFFILIATE_LINKS } from "@/lib/affiliates";

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ROLES_DATA).map((role) => ({
    role,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { role } = await params;
  const data = ROLES_DATA[role];

  if (!data) {
    return {};
  }

  return {
    title: `${data.title} Hourly Rate Calculator | SoloLedger`,
    description: data.description,
    keywords: data.seoKeywords,
    alternates: {
      canonical: `/rate/${data.slug}`,
    },
    openGraph: {
      title: `${data.title} Hourly Rate Calculator | SoloLedger`,
      description: data.description,
      type: "website",
    },
  };
}

export default async function RoleRatePage({
  params,
}: PageProps) {
  const { role } = await params;
  const data = ROLES_DATA[role];

  if (!data) {
    notFound();
  }

  const roleName = data.shortTitle;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${data.title} Rate Calculator`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: data.description,
    url: `/rate/${data.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* =====================================================
          STRUCTURED DATA
      ====================================================== */}

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

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
          {/* Breadcrumb */}

          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-400">
            <Link
              href="/"
              className="transition hover:text-blue-600"
            >
              SoloLedger
            </Link>

            <ChevronRight className="h-3.5 w-3.5" />

            <span>Rate Benchmarks</span>

            <ChevronRight className="h-3.5 w-3.5" />

            <span className="text-zinc-600 dark:text-zinc-300">
              {roleName}
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                {data.category}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-bold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                Free calculator
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
              {data.title}
              <span className="block text-blue-600">
                Hourly Rate Calculator
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              {data.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Personalized estimate
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Tax-aware calculation
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No signup required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK BENCHMARK
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                <Wallet className="h-4 w-4" />
              </div>

              <span className="text-xs font-bold text-zinc-400">
                Target Take-Home
              </span>
            </div>

            <p className="mt-4 text-2xl font-black text-zinc-950 dark:text-white">
              ${data.defaultTakeHome.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              Example annual income goal
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                <BriefcaseBusiness className="h-4 w-4" />
              </div>

              <span className="text-xs font-bold text-zinc-400">
                Annual Expenses
              </span>
            </div>

            <p className="mt-4 text-2xl font-black text-zinc-950 dark:text-white">
              ${data.defaultExpenses.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              Example business overhead
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400">
                <Clock3 className="h-4 w-4" />
              </div>

              <span className="text-xs font-bold text-zinc-400">
                Billable Hours
              </span>
            </div>

            <p className="mt-4 text-2xl font-black text-zinc-950 dark:text-white">
              {data.defaultBillableHours}
              <span className="ml-1 text-sm font-bold text-zinc-400">
                / week
              </span>
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              Realistic client hours
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                <DollarSign className="h-4 w-4" />
              </div>

              <span className="text-xs font-bold text-zinc-400">
                Tax Buffer
              </span>
            </div>

            <p className="mt-4 text-2xl font-black text-zinc-950 dark:text-white">
              {data.defaultTaxRate}%
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              Starting planning assumption
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CALCULATOR
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
            Personalized calculation
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
            Find your {roleName.toLowerCase()} rate
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            We've pre-filled the calculator with a baseline scenario for
            this profession. Adjust the numbers to match your actual
            business.
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
      </section>

      {/* =====================================================
          EXPLANATION
      ====================================================== */}

      <section className="border-y border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Understanding your rate
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                Your freelance rate is more than your salary.
              </h2>

              <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {data.longDescription}
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                A sustainable rate needs to account for the time you spend
                finding clients, answering emails, preparing proposals,
                managing projects, handling revisions, doing administrative
                work, and taking time away from the business.
              </p>

              <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/40 dark:bg-blue-950/20">
                <div className="flex gap-3">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

                  <div>
                    <h3 className="text-sm font-black text-blue-950 dark:text-blue-300">
                      Benchmark, not financial advice
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-blue-900/70 dark:text-blue-300/70">
                      The numbers shown here are planning estimates. Your
                      actual taxes, expenses, market rate, location, and
                      business structure may be different.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing models */}

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                  <FileText className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-black text-zinc-950 dark:text-white">
                  Common pricing models
                </h3>

                <div className="mt-5 space-y-2">
                  {data.pricingModels.map((model) => (
                    <div
                      key={model}
                      className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      {model}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              What you can charge for
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
              Popular {roleName.toLowerCase()} services
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Your hourly rate is only one way to price freelance work.
              Understanding your services helps you decide whether hourly,
              project, package, or retainer pricing makes more sense.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {data.commonServices.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>

                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TOOLS / AFFILIATES
      ====================================================== */}

      <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Freelancer toolkit
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
              Tools that can help you run the business
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Getting your rate right is only the beginning. The right tools
              can make invoicing, payments, contracts, and bookkeeping much
              easier.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AffiliateCard
              category="Accounting & Invoicing"
              badge="Essential"
              title="FreshBooks"
              description="Track expenses, create invoices, manage projects, and keep your freelance finances organized."
              perk="Free trial available"
              affiliateUrl={AFFILIATE_LINKS.freshbooks}
            />

            <AffiliateCard
              category="Cross-Border Payments"
              title="Wise Business"
              description="Receive international payments and manage multiple currencies with transparent exchange rates."
              perk="Built for international payments"
              affiliateUrl={AFFILIATE_LINKS.wise}
            />

            <AffiliateCard
              category="Contracts & Compliance"
              title="Deel"
              description="Create contractor agreements and manage international freelance relationships from one platform."
              perk="Contract tools available"
              affiliateUrl={AFFILIATE_LINKS.deel}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">
                SoloLedger
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Stop guessing your rate.
              </h2>

              <p className="mt-4 text-sm leading-6 text-zinc-400">
                Build a freelance rate around the income you actually want,
                the expenses you actually have, and the hours you can
                realistically bill.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-zinc-100"
            >
              Recalculate My Rate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}