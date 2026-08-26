"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  DollarSign,
  Info,
  RotateCcw,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

function parseNumber(value: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatHours(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(value);
}

export function ProjectPricingCalculator() {
  const [hourlyRate, setHourlyRate] = useState("75");
  const [productionHours, setProductionHours] = useState("30");
  const [adminHours, setAdminHours] = useState("4");
  const [revisionHours, setRevisionHours] = useState("5");
  const [expenses, setExpenses] = useState("0");
  const [buffer, setBuffer] = useState("20");

  const results = useMemo(() => {
    const rate = parseNumber(hourlyRate);
    const production = parseNumber(productionHours);
    const admin = parseNumber(adminHours);
    const revisions = parseNumber(revisionHours);
    const projectExpenses = parseNumber(expenses);
    const bufferPercent = parseNumber(buffer);

    const totalHours = production + admin + revisions;
    const laborCost = totalHours * rate;
    const subtotal = laborCost + projectExpenses;
    const bufferAmount = subtotal * (bufferPercent / 100);
    const projectPrice = subtotal + bufferAmount;

    const effectiveHourlyRate =
      totalHours > 0 ? projectPrice / totalHours : 0;

    return {
      rate,
      production,
      admin,
      revisions,
      projectExpenses,
      bufferPercent,
      totalHours,
      laborCost,
      subtotal,
      bufferAmount,
      projectPrice,
      effectiveHourlyRate,
    };
  }, [
    hourlyRate,
    productionHours,
    adminHours,
    revisionHours,
    expenses,
    buffer,
  ]);

  function resetCalculator() {
    setHourlyRate("75");
    setProductionHours("30");
    setAdminHours("4");
    setRevisionHours("5");
    setExpenses("0");
    setBuffer("20");
  }

  return (
    <div className="space-y-8">
      {/* =========================================================
          HEADER
      ========================================================== */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
            <Calculator className="h-3.5 w-3.5" />
            Project Pricing
          </div>

          <h2 className="text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl">
            What should you charge for this project?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Build a project quote from your hourly rate, estimated work,
            expenses, revisions, and a buffer for unexpected work.
          </p>
        </div>

        <button
          type="button"
          onClick={resetCalculator}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* =========================================================
          MAIN CALCULATOR
      ========================================================== */}

      <div className="grid gap-6 lg:grid-cols-12">
        {/* =======================================================
            INPUTS
        ======================================================== */}

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-7 sm:p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <CircleDollarSign className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h3 className="text-sm font-black text-zinc-950">
                Project details
              </h3>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Enter your estimated project requirements to calculate a
                recommended quote.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-7">
            {/* RATE + PRODUCTION */}

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5 text-blue-600" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                  Your rate & core work
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  id="hourly-rate"
                  label="Your hourly rate"
                  prefix="$"
                  value={hourlyRate}
                  min={0}
                  step={1}
                  onChange={setHourlyRate}
                />

                <NumberInput
                  id="production-hours"
                  label="Production hours"
                  suffix="hrs"
                  value={productionHours}
                  min={0}
                  step={0.5}
                  onChange={setProductionHours}
                />
              </div>
            </div>

            {/* ADMIN + REVISIONS */}

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Calculator className="h-3.5 w-3.5 text-blue-600" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                  Project overhead
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  id="admin-hours"
                  label="Administration & communication"
                  suffix="hrs"
                  value={adminHours}
                  min={0}
                  step={0.5}
                  onChange={setAdminHours}
                />

                <NumberInput
                  id="revision-hours"
                  label="Revision hours"
                  suffix="hrs"
                  value={revisionHours}
                  min={0}
                  step={0.5}
                  onChange={setRevisionHours}
                />
              </div>
            </div>

            {/* EXPENSES + BUFFER */}

            <div>
              <div className="mb-3 flex items-center gap-2">
                <WalletCards className="h-3.5 w-3.5 text-blue-600" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                  Expenses & protection
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  id="project-expenses"
                  label="Project expenses"
                  prefix="$"
                  value={expenses}
                  min={0}
                  step={1}
                  onChange={setExpenses}
                />

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <label
                      htmlFor="project-buffer"
                      className="text-xs font-bold text-zinc-600"
                    >
                      Project buffer
                    </label>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-700">
                      {buffer}%
                    </span>
                  </div>

                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5">
                    <input
                      id="project-buffer"
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={buffer}
                      onChange={(event) => setBuffer(event.target.value)}
                      className="w-full accent-blue-600"
                    />

                    <div className="mt-2 flex justify-between text-[9px] font-bold text-zinc-400">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EXPLANATION */}

          <div className="mt-8 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

            <p className="text-xs leading-5 text-blue-900/70">
              Your quote should account for more than hands-on production.
              Meetings, communication, revisions, expenses, and unexpected
              work all affect the real cost of delivering a project.
            </p>
          </div>
        </div>

        {/* =======================================================
            RESULT
        ======================================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-sm lg:col-span-5 sm:p-7">
          {/* Decorative background */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-400">
                  Your estimate
                </div>

                <p className="mt-1 text-xs text-zinc-400">
                  Recommended project quote
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <WalletCards className="h-5 w-5 text-blue-400" />
              </div>
            </div>

            {/* MAIN PRICE */}

            <div className="mt-8">
              <p className="text-sm font-medium text-zinc-400">
                Recommended project price
              </p>

              <div className="mt-1 text-5xl font-black tracking-tight text-white sm:text-6xl">
                {formatCurrency(results.projectPrice)}
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1 text-[11px] font-bold text-blue-300">
                <ArrowUpRight className="h-3 w-3" />
                {formatHours(results.totalHours)} estimated hours
              </div>
            </div>

            {/* KEY NUMBERS */}

            <div className="mt-8 grid grid-cols-2 gap-3">
              <DarkResultStat
                label="Labor"
                value={formatCurrency(results.laborCost)}
              />

              <DarkResultStat
                label="Expenses"
                value={formatCurrency(results.projectExpenses)}
              />

              <DarkResultStat
                label={`Buffer (${results.bufferPercent}%)`}
                value={formatCurrency(results.bufferAmount)}
              />

              <DarkResultStat
                label="Total hours"
                value={`${formatHours(results.totalHours)} hrs`}
              />
            </div>

            {/* BREAKDOWN */}

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                Project breakdown
              </div>

              <div className="mt-4 space-y-3">
                <ResultRow
                  label="Production"
                  value={`${formatHours(results.production)} hrs`}
                />

                <ResultRow
                  label="Administration"
                  value={`${formatHours(results.admin)} hrs`}
                />

                <ResultRow
                  label="Revisions"
                  value={`${formatHours(results.revisions)} hrs`}
                />

                <div className="my-3 border-t border-white/10" />

                <ResultRow
                  label="Total labor"
                  value={formatCurrency(results.laborCost)}
                  strong
                />

                <ResultRow
                  label="Project expenses"
                  value={formatCurrency(results.projectExpenses)}
                />

                <ResultRow
                  label={`Project buffer (${results.bufferPercent}%)`}
                  value={formatCurrency(results.bufferAmount)}
                />
              </div>
            </div>

            {/* EFFECTIVE RATE */}

            <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                <div>
                  <div className="text-xs font-bold text-white">
                    Effective project rate
                  </div>

                  <p className="mt-1.5 text-xs leading-5 text-zinc-400">
                    Your final quote works out to approximately{" "}
                    <span className="font-black text-white">
                      {formatCurrency(results.effectiveHourlyRate)}/hr
                    </span>{" "}
                    across all estimated project hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          PROJECT BREAKDOWN
      ========================================================== */}

      <div>
        <div className="mb-5">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
            Pricing breakdown
          </div>

          <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-950">
            Where your project quote comes from
          </h3>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500">
            Your final price combines labor, project expenses, and a buffer
            designed to protect you from unexpected work.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BreakdownCard
            icon={Clock3}
            title="Total hours"
            value={`${formatHours(results.totalHours)} hrs`}
            description="Production, administration, and revision time."
            tone="blue"
          />

          <BreakdownCard
            icon={CircleDollarSign}
            title="Labor"
            value={formatCurrency(results.laborCost)}
            description="Your estimated hours multiplied by your hourly rate."
            tone="emerald"
          />

          <BreakdownCard
            icon={WalletCards}
            title="Expenses"
            value={formatCurrency(results.projectExpenses)}
            description="Software, contractors, materials, travel, and other costs."
            tone="amber"
          />

          <BreakdownCard
            icon={ShieldCheck}
            title="Buffer"
            value={formatCurrency(results.bufferAmount)}
            description="Protection against scope changes and unexpected work."
            tone="blue"
          />
        </div>
      </div>

      {/* =========================================================
          QUOTE SUMMARY
      ========================================================== */}

      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-2">
          <div className="p-6 sm:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            <h3 className="mt-5 text-xl font-black tracking-tight text-zinc-950">
              Your project quote
            </h3>

            <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-500">
              Based on your current assumptions, this project should be quoted
              around{" "}
              <strong className="text-zinc-800">
                {formatCurrency(results.projectPrice)}
              </strong>
              .
            </p>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                Recommended minimum
              </div>

              <div className="mt-2 text-4xl font-black tracking-tight text-zinc-950">
                {formatCurrency(results.projectPrice)}
              </div>

              <div className="mt-2 text-xs text-zinc-500">
                ≈ {formatCurrency(results.effectiveHourlyRate)}/hr effective
                project rate
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 bg-zinc-50 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
              Before sending the quote
            </div>

            <ul className="mt-5 space-y-4">
              <Tip>
                Make sure your production estimate includes all deliverables.
              </Tip>

              <Tip>
                Include meetings, emails, project management, and communication
                time.
              </Tip>

              <Tip>
                Clarify how many revision rounds are included in the project.
              </Tip>

              <Tip>
                Confirm whether project expenses are paid by you or the client.
              </Tip>

              <Tip>
                Use a buffer when scope or requirements are uncertain.
              </Tip>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================
          FORMULA
      ========================================================== */}

      <div className="flex gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
            Pricing formula
          </div>

          <p className="mt-1.5 text-[11px] leading-5 text-zinc-500">
            ({formatHours(results.totalHours)} hours ×{" "}
            {formatCurrency(results.rate)}) +{" "}
            {formatCurrency(results.projectExpenses)} expenses +{" "}
            {formatCurrency(results.bufferAmount)} buffer ={" "}
            <strong className="text-zinc-700">
              {formatCurrency(results.projectPrice)}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   NUMBER INPUT
================================================================ */

function NumberInput({
  id,
  label,
  value,
  min,
  step = 1,
  prefix,
  suffix,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  min: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-xs font-bold text-zinc-600">
        {label}
      </span>

      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
            {prefix}
          </span>
        )}

        <input
          id={id}
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 text-sm font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            prefix ? "pl-8" : "pl-3"
          } ${suffix ? "pr-12" : "pr-3"}`}
        />

        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

/* ===============================================================
   DARK RESULT STAT
================================================================ */

function DarkResultStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
        {label}
      </div>

      <div className="mt-1 text-sm font-black text-white">{value}</div>
    </div>
  );
}

/* ===============================================================
   RESULT ROW
================================================================ */

function ResultRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      <span
        className={
          strong
            ? "font-bold text-zinc-200"
            : "font-medium text-zinc-500"
        }
      >
        {label}
      </span>

      <span
        className={
          strong ? "font-black text-white" : "font-semibold text-zinc-300"
        }
      >
        {value}
      </span>
    </div>
  );
}

/* ===============================================================
   BREAKDOWN CARD
================================================================ */

function BreakdownCard({
  icon: Icon,
  title,
  value,
  description,
  tone,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  tone: "blue" | "emerald" | "amber";
}) {
  const toneClasses = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="text-lg font-black text-zinc-950">{value}</span>
      </div>

      <div className="mt-4 text-sm font-black text-zinc-950">{title}</div>

      <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
    </div>
  );
}

/* ===============================================================
   TIP
================================================================ */

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-xs leading-5 text-zinc-600">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
      <span>{children}</span>
    </li>
  );
}