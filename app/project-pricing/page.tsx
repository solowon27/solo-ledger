import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calculator as CalculatorIcon,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import { ProjectPricingCalculator } from "./ProjectPricingCalculator";

export const metadata: Metadata = {
  title: "Project Pricing Calculator | Solo Ledger",
  description:
    "Turn your freelance hourly rate into a realistic fixed-project price. Account for production time, administration, revisions, expenses, and project buffer.",
  keywords: [
    "project pricing calculator",
    "freelance project pricing calculator",
    "freelance project quote calculator",
    "freelance project rate calculator",
    "how to price a freelance project",
    "freelance project quote",
    "fixed project pricing calculator",
  ],
};

const benefits = [
  "Uses your hourly rate",
  "Accounts for admin time",
  "Includes revisions",
  "Includes expenses",
  "Adds a project buffer",
];

const steps = [
  {
    number: "01",
    title: "Start with your rate",
    description:
      "Enter the hourly rate you normally charge or the rate calculated by Solo Ledger.",
  },
  {
    number: "02",
    title: "Estimate the work",
    description:
      "Add production, administration, meetings, revisions, and other project time.",
  },
  {
    number: "03",
    title: "Build your project price",
    description:
      "Solo Ledger combines your time, expenses, and project buffer into a practical fixed-project price.",
  },
];

const projectTypes = [
  {
    title: "Website project",
    description:
      "Price websites, landing pages, web applications, and development projects.",
  },
  {
    title: "Design project",
    description:
      "Account for design production, client communication, revisions, and project overhead.",
  },
  {
    title: "Content project",
    description:
      "Estimate writing, editing, research, meetings, and revision time.",
  },
  {
    title: "Video project",
    description:
      "Include production, editing, revisions, communication, and project expenses.",
  },
];

const faqs = [
  {
    question: "Should I use my hourly rate for a fixed-price project?",
    answer:
      "Your hourly rate is a useful starting point for understanding what the project needs to earn. You can then adjust the final quote based on scope, complexity, value, deadline, client requirements, and risk.",
  },
  {
    question: "Why include administration hours?",
    answer:
      "Projects involve much more than the final deliverable. Emails, meetings, planning, research, file management, project management, and client communication all take time.",
  },
  {
    question: "What are revision hours?",
    answer:
      "Revision hours represent the time you expect to spend making changes after the first version or delivery. Including them helps prevent underpricing projects with multiple rounds of feedback.",
  },
  {
    question: "What does the project buffer do?",
    answer:
      "The buffer provides room for uncertainty. Scope changes, unexpected technical problems, additional communication, or small tasks can make a project take longer than the original estimate.",
  },
  {
    question: "Is this a quote I should automatically send to a client?",
    answer:
      "No. The result is a planning estimate. Review the project scope, deliverables, deadlines, payment terms, expenses, and client requirements before sending a final quote.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Solo Ledger Project Pricing Calculator",
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

export default function ProjectPricingPage() {
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

          <div className="absolute left-[-140px] top-72 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              Freelance project pricing calculator
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-[-0.055em] text-zinc-950 sm:text-6xl lg:text-7xl">
              Turn your rate into a
              <span className="block text-blue-600">project price.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              Estimate the real time behind a project, account for revisions
              and project overhead, and turn your hourly rate into a practical
              fixed-project price.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#calculator"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
              >
                Price my project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3.5 text-sm font-bold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 sm:w-auto"
              >
                How it works
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

          {/* Project pricing preview */}

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-2xl shadow-zinc-900/5">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5 sm:p-7">
                <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                      <Target className="h-4 w-4 text-emerald-600" />
                      Example project estimate
                    </div>

                    <div className="mt-2 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
                      $3,480
                    </div>

                    <p className="mt-2 max-w-md text-xs leading-5 text-zinc-500">
                      Example based on an hourly rate, production time,
                      administration, revisions, and project uncertainty.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:min-w-[340px]">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        Production
                      </div>

                      <div className="mt-1 text-xl font-black">$2,625</div>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                      <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                        Project price
                      </div>

                      <div className="mt-1 text-xl font-black text-blue-700">
                        $3,480
                      </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        Administration
                      </div>

                      <div className="mt-1 text-xl font-black">$300</div>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                      <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                        Revisions
                      </div>

                      <div className="mt-1 text-xl font-black text-emerald-700">
                        $375
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 h-2 overflow-hidden rounded-full bg-zinc-200">
                  <div className="h-full w-[76%] rounded-full bg-blue-600" />
                </div>

                <div className="mt-3 flex justify-between text-[10px] font-semibold text-zinc-400">
                  <span>Estimated project effort</span>
                  <span>Recommended quote</span>
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
            <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
              Project pricing toolkit
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Price more than the deliverable.
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
              A realistic project price accounts for everything required to
              take a project from the first conversation to final delivery.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                <Target className="h-5 w-5" />
              </div>

              <div className="mt-7 text-xs font-black uppercase tracking-wider text-emerald-600">
                Start with your rate
              </div>

              <h3 className="mt-2 text-xl font-black">
                Know what your time is worth
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Your hourly rate gives the project a financial foundation
                before you account for everything else.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Clock3 className="h-5 w-5" />
              </div>

              <div className="mt-7 text-xs font-black uppercase tracking-wider text-blue-600">
                Count the real work
              </div>

              <h3 className="mt-2 text-xl font-black">
                Include time around the work
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Meetings, planning, administration, communication, revisions,
                and production all affect your actual project effort.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-zinc-800 shadow-sm ring-1 ring-zinc-200">
                <CircleDollarSign className="h-5 w-5" />
              </div>

              <div className="mt-7 text-xs font-black uppercase tracking-wider text-zinc-500">
                Build the quote
              </div>

              <h3 className="mt-2 text-xl font-black">
                Turn effort into a price
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Combine your estimated hours, expenses, and buffer into a
                project price you can review before sending a proposal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CALCULATOR
      ========================================================== */}

      <section
        id="calculator"
        className="scroll-mt-20 border-b border-zinc-200 bg-slate-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                Project pricing calculator
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Build the number your project needs.
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base">
                Enter your rate, expected project time, expenses, revisions,
                and buffer. Solo Ledger handles the calculation.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Planning estimate — review before quoting
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-xl shadow-zinc-900/5 sm:p-5">
            <ProjectPricingCalculator />
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
              Price the whole project.
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
              Don't calculate a fixed project price from production hours
              alone. Include the work that happens around the work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
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
          WHY PROJECT HOURS MATTER
      ========================================================== */}

      <section className="border-b border-zinc-800 bg-zinc-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">
                Think beyond production
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                The project is bigger than the deliverable.
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                A project that takes 30 hours to produce may require several
                additional hours of meetings, planning, revisions,
                administration, and client communication.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Clock3,
                  title: "Production",
                  text: "The hands-on work creating the deliverable.",
                },
                {
                  icon: FileText,
                  title: "Administration",
                  text: "Planning, communication, meetings, and project management.",
                },
                {
                  icon: Check,
                  title: "Revisions",
                  text: "Changes and adjustments requested after delivery.",
                },
                {
                  icon: ShieldCheck,
                  title: "Project buffer",
                  text: "Protection against uncertainty and unexpected work.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                      <Icon className="h-4 w-4 text-zinc-200" />
                    </div>

                    <h3 className="mt-4 text-sm font-black">{item.title}</h3>

                    <p className="mt-2 text-xs leading-5 text-zinc-500">
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
          PROJECT TYPES
      ========================================================== */}

      <section className="border-b border-zinc-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Built for freelancers
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Useful for almost any project.
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600">
              Whether you're building, designing, writing, editing, or
              consulting, the basic pricing logic is the same.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projectTypes.map((project) => (
              <div
                key={project.title}
                className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-zinc-900/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                    <CalculatorIcon className="h-4 w-4 text-blue-600" />
                  </div>

                  <ChevronRight className="h-4 w-4 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>

                <h3 className="mt-5 text-sm font-black">
                  {project.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJECT PRICING EXPLANATION
      ========================================================== */}

      <section className="border-b border-zinc-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
                  <Target className="h-3.5 w-3.5" />
                  The pricing formula
                </div>

                <h2 className="mt-6 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
                  Your hourly rate is only the starting point.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
                  Fixed-price work requires more than multiplying your hourly
                  rate by production hours. A realistic quote accounts for
                  everything required to deliver the project successfully.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Hourly rate",
                    "Production",
                    "Administration",
                    "Revisions",
                    "Expenses",
                    "Buffer",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href="#calculator"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  Calculate my project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex items-center border-t border-emerald-100 bg-white/60 p-6 lg:border-l lg:border-t-0 sm:p-10">
                <div className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        Recommended quote
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
                      <span className="text-zinc-500">Production</span>
                      <span className="font-bold">$2,625</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Administration</span>
                      <span className="font-bold">$300</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Revisions</span>
                      <span className="font-bold">$375</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Buffer & expenses</span>
                      <span className="font-bold">$180</span>
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
            <Target className="h-5 w-5" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
            Stop guessing your project price.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100">
            Start with what your time is worth, account for the work around
            the deliverable, and build a project price you can defend.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              Price my project
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/15"
            >
              Calculate hourly rate
              <CalculatorIcon className="h-4 w-4" />
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
            <span>© {new Date().getFullYear()} Solo Ledger.</span>

            <span>
              For informational purposes only. Not financial or tax advice.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}