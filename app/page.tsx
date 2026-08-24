import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Calculator as CalculatorIcon,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileText,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import { Calculator } from "@/components/Calculator";
import { ROLES_DATA } from "@/lib/rolesData";

export const metadata: Metadata = {
  title: "Solo Ledger | Freelance Rate Calculator",
  description:
    "Calculate the freelance hourly rate you actually need based on your income goal, taxes, expenses, billable hours, and time off.",
  keywords: [
    "freelance hourly rate calculator",
    "freelance rate calculator",
    "freelance day rate calculator",
    "freelancer pricing calculator",
    "contractor rate calculator",
    "freelance income calculator",
    "project pricing calculator",
  ],
};

const popularRoles = Object.values(ROLES_DATA).slice(0, 8);

const benefits = [
  "Taxes included",
  "Business expenses included",
  "Time off included",
  "Billable hours considered",
];

const steps = [
  {
    number: "01",
    title: "Set your income goal",
    description:
      "Start with the amount you actually want to take home, not an arbitrary hourly number.",
  },
  {
    number: "02",
    title: "Add your business reality",
    description:
      "Account for taxes, expenses, non-billable time, and the time you plan to take off.",
  },
  {
    number: "03",
    title: "Get your target rate",
    description:
      "Solo Ledger turns those numbers into a minimum and recommended hourly rate.",
  },
];

const faqs = [
  {
    question: "What does the calculator actually calculate?",
    answer:
      "Solo Ledger works backwards from your desired take-home income. It considers your estimated taxes, business expenses, billable hours, and time off to determine the hourly rate your freelance business needs.",
  },
  {
    question: "Why are billable hours important?",
    answer:
      "Freelancers rarely bill every hour they work. Marketing, sales, administration, email, bookkeeping, learning, and other business activities consume time without directly generating revenue.",
  },
  {
    question: "What is the recommended rate?",
    answer:
      "Your minimum rate is designed to cover the assumptions you enter. The recommended rate adds a 20% cushion for slower periods, scope changes, cancellations, unpaid work, and unexpected business costs.",
  },
  {
    question: "Is this a tax calculator?",
    answer:
      "No. Solo Ledger uses the effective tax rate you provide to create a planning estimate. It is not a substitute for professional tax advice or an actual tax return.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Solo Ledger Freelance Rate Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  description:
    "Calculate the freelance hourly rate you need based on income goals, taxes, expenses, billable hours, and time off.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-240px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-[-120px] top-40 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Financial tools for independent professionals
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-[-0.055em] text-zinc-950 sm:text-6xl lg:text-7xl">
              Know what your freelance
              <span className="block text-blue-600">
                work is actually worth.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              Calculate the hourly rate you need to reach your income goals,
              price projects with confidence, and make better financial
              decisions for your freelance business.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#calculator"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
              >
                Calculate my rate
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/project-pricing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3.5 text-sm font-bold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 sm:w-auto"
              >
                Price a project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-xs font-semibold text-zinc-500"
                >
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Financial summary preview */}

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-2xl shadow-zinc-900/5">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5 sm:p-7">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                      <CircleDollarSign className="h-4 w-4 text-blue-600" />
                      Your target rate
                    </div>

                    <div className="mt-2 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
                      $87
                      <span className="text-lg font-bold text-zinc-400">
                        /hr
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-zinc-500">
                      Example based on your income, expenses and available
                      billable hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        Minimum
                      </div>
                      <div className="mt-1 text-xl font-black">$73/hr</div>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                      <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                        Recommended
                      </div>
                      <div className="mt-1 text-xl font-black text-emerald-700">
                        $87/hr
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-200">
                  <div className="h-full w-[74%] rounded-full bg-blue-600" />
                </div>

                <div className="mt-3 flex justify-between text-[10px] font-semibold text-zinc-400">
                  <span>Business costs</span>
                  <span>Income goal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TOOL OVERVIEW
      ========================================================== */}

      <section className="border-b border-zinc-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Your freelance financial toolkit
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              More than an hourly rate.
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
              Solo Ledger helps you make the financial decisions that happen
              before, during, and after a freelance project.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {/* Rate calculator */}

            <Link
              href="#calculator"
              className="group rounded-3xl border border-blue-100 bg-blue-50/60 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <CalculatorIcon className="h-5 w-5" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-blue-300 transition group-hover:text-blue-600" />
              </div>

              <div className="mt-7">
                <div className="text-xs font-black uppercase tracking-wider text-blue-600">
                  Start here
                </div>

                <h3 className="mt-2 text-xl font-black">
                  Freelance Rate Calculator
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Find the hourly rate you need based on your income goal,
                  taxes, expenses, billable hours, and time off.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-black text-blue-600">
                Calculate my rate
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Project pricing */}

            <Link
              href="/project-pricing"
              className="group rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                  <Target className="h-5 w-5" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-emerald-300 transition group-hover:text-emerald-600" />
              </div>

              <div className="mt-7">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-600">
                  Project pricing
                </div>

                <h3 className="mt-2 text-xl font-black">
                  Price a Fixed-Price Project
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Turn your target hourly rate and estimated project hours into
                  a realistic project price, including revisions and
                  administrative time.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-black text-emerald-700">
                Price a project
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Invoices */}

            <Link
              href="/invoice-generator"
              className="group rounded-3xl border border-zinc-200 bg-zinc-50 p-6 transition hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-lg hover:shadow-zinc-900/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-zinc-800 shadow-sm ring-1 ring-zinc-200">
                  <ReceiptText className="h-5 w-5" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-zinc-300 transition group-hover:text-zinc-700" />
              </div>

              <div className="mt-7">
                <div className="text-xs font-black uppercase tracking-wider text-zinc-500">
                  Get paid
                </div>

                <h3 className="mt-2 text-xl font-black">
                  Invoice Generator
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Create professional invoices for the work you have priced and
                  completed.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-black text-zinc-700">
                Create an invoice
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          RATE CALCULATOR
      ========================================================== */}

      <section
        id="calculator"
        className="scroll-mt-20 border-b border-zinc-200 bg-slate-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Hourly rate calculator
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Find the number your business needs.
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base">
                Enter your financial assumptions below. Solo Ledger handles the
                math so you can focus on choosing a rate that supports your
                business.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Planning estimate — not tax advice
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-xl shadow-zinc-900/5 sm:p-5">
            <Calculator />
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}

      <section
        id="how-it-works"
        className="scroll-mt-20 border-b border-zinc-200 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              How it works
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Built around your real business.
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
              Instead of asking what other freelancers charge, start with what
              your own business needs to earn.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-blue-600">
                  {step.number}
                </div>

                <h3 className="mt-6 text-lg font-black">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJECT PRICING PROMOTION
      ========================================================== */}

      <section className="border-b border-zinc-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-7 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
                  <Target className="h-3.5 w-3.5" />
                  New financial tool
                </div>

                <h2 className="mt-6 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
                  Your hourly rate is only half the pricing decision.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
                  Fixed-price work requires more than multiplying hours by a
                  number. Account for production time, project management,
                  revisions, overhead, and your desired margin before giving a
                  client a quote.
                </p>

                <Link
                  href="/project-pricing"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  Open Project Pricing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex items-center border-t border-emerald-100 bg-white/60 p-6 lg:border-l lg:border-t-0 sm:p-10">
                <div className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        Project estimate
                      </div>

                      <div className="mt-2 text-3xl font-black">
                        $3,480
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">
                        Production
                      </span>
                      <span className="font-bold">$2,625</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">
                        Administration
                      </span>
                      <span className="font-bold">$300</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">
                        Revisions
                      </span>
                      <span className="font-bold">$375</span>
                    </div>

                    <div className="border-t border-zinc-100 pt-3">
                      <div className="flex justify-between">
                        <span className="text-xs font-black">
                          Recommended quote
                        </span>
                        <span className="text-sm font-black text-emerald-600">
                          $3,480
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RATE BENCHMARKS
      ========================================================== */}

      <section
        id="rates"
        className="scroll-mt-20 border-b border-zinc-200 bg-slate-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Rate benchmarks
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Need a starting point?
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base">
                Explore profession-specific pricing guidance, then use your
                own financial numbers to create a personalized rate.
              </p>
            </div>

            <Link
              href="/rates"
              className="inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-700"
            >
              View all professions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/rate/${role.slug}`}
                className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                    <BriefcaseBusiness className="h-4 w-4 text-blue-600" />
                  </div>

                  <ChevronRight className="h-4 w-4 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>

                <h3 className="mt-5 text-sm font-black">
                  {role.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  Explore rates and pricing guidance.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY SOLO LEDGER
      ========================================================== */}

      <section className="border-b border-zinc-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Why Solo Ledger
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Stop pricing your work by guesswork.
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
                A freelance rate isn't just a market average. Your rate needs
                to support your personal income goal and the operating costs
                of your business.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: WalletCards,
                  title: "Income goal",
                  text: "Start with what you actually want to earn.",
                },
                {
                  icon: CircleDollarSign,
                  title: "Business costs",
                  text: "Account for the expenses behind your work.",
                },
                {
                  icon: TrendingUp,
                  title: "Billable capacity",
                  text: "Price around the hours you can realistically sell.",
                },
                {
                  icon: ShieldCheck,
                  title: "Financial cushion",
                  text: "Build room for uncertainty and slower periods.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>

                    <h3 className="mt-4 text-sm font-black">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-zinc-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}

      <section
        id="faq"
        className="scroll-mt-20 border-b border-zinc-200 bg-slate-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              FAQ
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Common questions
            </h2>
          </div>

          <div className="mt-9 divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white px-6 shadow-sm">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-sm font-bold">
                  {faq.question}

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>

                <p className="mt-4 pr-10 text-sm leading-7 text-zinc-500">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="bg-blue-600 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            <CalculatorIcon className="h-5 w-5" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
            Know your number.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100">
            Calculate the rate you need, price projects with confidence, and
            build a healthier freelance business.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              Calculate my rate
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/project-pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/15"
            >
              Price a project
              <Target className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="text-lg font-black tracking-tight"
              >
                Solo<span className="text-blue-600">Ledger</span>
              </Link>

              <p className="mt-3 max-w-sm text-xs leading-5 text-zinc-500">
                Simple financial tools for freelancers, contractors, and
                independent professionals.
              </p>
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                Tools
              </div>

              <div className="mt-3 space-y-2 text-xs font-semibold text-zinc-500">
                <Link
                  href="/"
                  className="block hover:text-zinc-950"
                >
                  Rate Calculator
                </Link>

                <Link
                  href="/project-pricing"
                  className="block hover:text-zinc-950"
                >
                  Project Pricing
                </Link>

                <Link
                  href="/w2-to-1099-calculator"
                  className="block hover:text-zinc-950"
                >
                  W-2 vs 1099
                </Link>

                <Link
                  href="/invoice-generator"
                  className="block hover:text-zinc-950"
                >
                  Invoice Maker
                </Link>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                Explore
              </div>

              <div className="mt-3 space-y-2 text-xs font-semibold text-zinc-500">
                <Link
                  href="/rates"
                  className="block hover:text-zinc-950"
                >
                  Rate Benchmarks
                </Link>

                <Link
                  href="#how-it-works"
                  className="block hover:text-zinc-950"
                >
                  How It Works
                </Link>

                <Link
                  href="#faq"
                  className="block hover:text-zinc-950"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-4 border-t border-zinc-200 pt-5 text-[11px] text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} Solo Ledger.
            </span>

            <span>
              For informational purposes only. Not financial or tax advice.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}