import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { ProjectPricingCalculator } from "./ProjectPricingCalculator";

export const metadata: Metadata = {
  title: "Project Pricing Calculator | Solo Ledger",
  description:
    "Turn your freelance hourly rate into a project price. Estimate production time, administration, revisions, expenses, and a project buffer.",
  keywords: [
    "project pricing calculator",
    "freelance project pricing calculator",
    "freelance project quote calculator",
    "freelance project rate calculator",
    "how to price a freelance project",
    "freelance project quote",
  ],
};

const benefits = [
  "Uses your hourly rate",
  "Accounts for admin time",
  "Includes revision time",
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
    title: "Get your project price",
    description:
      "Solo Ledger combines your time and optional expenses into a practical project quote.",
  },
];

const examples = [
  {
    title: "Website project",
    description:
      "Useful for web developers, designers, and agencies pricing websites or landing pages.",
  },
  {
    title: "Design project",
    description:
      "Estimate design production, client communication, revisions, and project overhead.",
  },
  {
    title: "Content project",
    description:
      "Price writing, editing, research, meetings, revisions, and other non-billable work.",
  },
  {
    title: "Video project",
    description:
      "Account for production, editing, revisions, communication, and project expenses.",
  },
];

const faqs = [
  {
    question: "Should I use my hourly rate or a different project rate?",
    answer:
      "Start with the hourly rate that represents what your time is worth. If you normally price fixed projects differently, you can adjust the rate in the calculator before generating your project price.",
  },
  {
    question: "Why include administration hours?",
    answer:
      "A project can involve emails, meetings, planning, file management, research, client communication, and other work that is easy to forget when estimating the actual effort required.",
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
    <main className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-280px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              Freelance project pricing calculator
            </div>

            <h1 className="text-5xl font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Turn your rate into a
              <span className="block text-blue-600">project price.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
              Estimate the real time behind a project, account for revisions
              and project overhead, and turn your hourly rate into a practical
              fixed-project price.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#calculator"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Price my project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3.5 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 sm:w-auto dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                How it works
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-xs font-medium text-zinc-500"
                >
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section
        id="calculator"
        className="scroll-mt-20 border-y border-zinc-200 bg-zinc-50 py-14 sm:py-20 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Your project
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Build your project price
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base dark:text-zinc-400">
              Enter your expected time and expenses. The calculator handles the
              math.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <ProjectPricingCalculator />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-20 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Simple by design
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Price the whole project
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Don't calculate a fixed project price from production hours
              alone. Include the work that happens around the work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="text-xs font-black tracking-widest text-blue-600">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PROJECT HOURS MATTER */}
      <section className="bg-zinc-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-blue-400">
                Think beyond production
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
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
                  text: "The actual hands-on work creating the deliverable.",
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
                  title: "Buffer",
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

                    <h3 className="mt-4 text-sm font-bold">{item.title}</h3>

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

      {/* USE CASES */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Built for freelancers
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Useful for almost any project
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Whether you're building, designing, writing, editing, or
              consulting, the basic pricing logic is the same.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {examples.map((example) => (
              <div
                key={example.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40">
                    <Calculator className="h-4 w-4 text-blue-600" />
                  </div>

                  <ChevronRight className="h-4 w-4 text-zinc-300 transition group-hover:translate-x-1 dark:text-zinc-700" />
                </div>

                <h3 className="mt-5 text-sm font-bold">
                  {example.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLANATION */}
      <section className="py-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7 sm:p-10 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Use the number as a planning tool
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  A project price should reflect the actual scope of work,
                  not just a number pulled from the market. Use this calculator
                  to understand your internal price floor, then review the
                  client's requirements before sending a final proposal.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Hourly rate",
                    "Production",
                    "Admin",
                    "Revisions",
                    "Expenses",
                    "Buffer",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="border-t border-zinc-200 bg-zinc-50 py-16 sm:py-20 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              FAQ
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Common questions
            </h2>
          </div>

          <div className="mt-8 divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white px-6 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-sm font-bold">
                  {faq.question}

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition group-open:rotate-45 dark:bg-zinc-800">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>

                <p className="mt-4 pr-10 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-zinc-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
            <Calculator className="h-5 w-5" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
            Stop guessing your project price.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
            Start with what your time is worth, account for the work around
            the deliverable, and build a project price you can defend.
          </p>

          <Link
            href="#calculator"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-zinc-950 transition hover:bg-zinc-200"
          >
            Price my project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href="/" className="font-black tracking-tight">
                Solo Ledger
              </Link>

              <p className="mt-2 text-xs text-zinc-500">
                Simple financial tools for freelancers and independent
                professionals.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-xs text-zinc-500">
              <Link
                href="/"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                Rate Calculator
              </Link>

              <Link
                href="/project-pricing"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                Project Pricing
              </Link>

              <Link
                href="/w2-to-1099-calculator"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                W-2 vs 1099
              </Link>

              <Link
                href="/invoice-generator"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                Invoice Maker
              </Link>

              <Link
                href="#faq"
                className="hover:text-zinc-950 dark:hover:text-white"
              >
                FAQ
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-200 pt-5 text-[11px] text-zinc-400 dark:border-zinc-800">
            © {new Date().getFullYear()} Solo Ledger. For informational
            purposes only. Not financial or tax advice.
          </div>
        </div>
      </footer>
    </main>
  );
}