"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  Check,
  DollarSign,
  Info,
  RotateCcw,
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
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 shadow-sm">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        {/* INPUTS PANEL */}
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shadow-sm">
                  <Calculator className="h-5 w-5" />
                </div>

                <h3 className="text-base font-black text-slate-900">
                  Project details
                </h3>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Estimate the total work required to complete the project.
              </p>
            </div>

            <button
              type="button"
              onClick={resetCalculator}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 shadow-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {/* HOURLY RATE */}
            <div>
              <label
                htmlFor="hourly-rate"
                className="mb-2 block text-xs font-bold text-slate-800"
              >
                Your hourly rate
              </label>

              <div className="relative">
                <DollarSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="hourly-rate"
                  type="number"
                  min="0"
                  step="1"
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                  placeholder="75"
                />
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Tip: use the recommended rate from your SoloLedger calculator.
              </p>
            </div>

            {/* PRODUCTION */}
            <div>
              <label
                htmlFor="production-hours"
                className="mb-2 block text-xs font-bold text-slate-800"
              >
                Production hours
              </label>

              <input
                id="production-hours"
                type="number"
                min="0"
                step="0.5"
                value={productionHours}
                onChange={(event) =>
                  setProductionHours(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                placeholder="30"
              />

              <p className="mt-2 text-[11px] text-slate-500">
                Actual hands-on work required to create the deliverable.
              </p>
            </div>

            {/* ADMIN */}
            <div>
              <label
                htmlFor="admin-hours"
                className="mb-2 block text-xs font-bold text-slate-800"
              >
                Administration & communication hours
              </label>

              <input
                id="admin-hours"
                type="number"
                min="0"
                step="0.5"
                value={adminHours}
                onChange={(event) => setAdminHours(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                placeholder="4"
              />

              <p className="mt-2 text-[11px] text-slate-500">
                Meetings, emails, planning, project management, research, etc.
              </p>
            </div>

            {/* REVISIONS */}
            <div>
              <label
                htmlFor="revision-hours"
                className="mb-2 block text-xs font-bold text-slate-800"
              >
                Revision hours
              </label>

              <input
                id="revision-hours"
                type="number"
                min="0"
                step="0.5"
                value={revisionHours}
                onChange={(event) =>
                  setRevisionHours(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                placeholder="5"
              />

              <p className="mt-2 text-[11px] text-slate-500">
                Estimated time for changes and client feedback.
              </p>
            </div>

            {/* EXPENSES */}
            <div>
              <label
                htmlFor="project-expenses"
                className="mb-2 block text-xs font-bold text-slate-800"
              >
                Project expenses
              </label>

              <div className="relative">
                <DollarSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="project-expenses"
                  type="number"
                  min="0"
                  step="1"
                  value={expenses}
                  onChange={(event) => setExpenses(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                  placeholder="0"
                />
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Software, contractors, materials, travel, or other direct project costs.
              </p>
            </div>

            {/* BUFFER */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="project-buffer"
                  className="text-xs font-bold text-slate-800"
                >
                  Project buffer
                </label>

                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-black text-blue-700">
                  {buffer}%
                </span>
              </div>

              <input
                id="project-buffer"
                type="range"
                min="0"
                max="50"
                step="5"
                value={buffer}
                onChange={(event) => setBuffer(event.target.value)}
                className="mt-2 w-full accent-blue-600"
              />

              <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Adds room for uncertainty, scope changes, and unexpected work.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="relative bg-slate-900 p-5 text-white sm:p-7 border-l border-slate-800">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <WalletCards className="h-4 w-4 text-blue-400" />
              </div>

              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-400">
                  Your estimate
                </div>

                <h3 className="mt-0.5 text-base font-black text-white">
                  Project price
                </h3>
              </div>
            </div>

            <div className="mt-10">
              <div className="text-xs font-bold text-slate-400">
                Recommended project quote
              </div>

              <div className="mt-2 text-5xl font-black tracking-tight text-white sm:text-6xl">
                {formatCurrency(results.projectPrice)}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Check className="h-3.5 w-3.5 text-blue-400" />
                Based on {formatHours(results.totalHours)} estimated hours
              </div>
            </div>

            <div className="mt-10 space-y-4">
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

              <div className="my-3 border-t border-slate-800" />

              <ResultRow
                label="Total hours"
                value={`${formatHours(results.totalHours)} hrs`}
                strong
              />

              <ResultRow
                label="Labor"
                value={formatCurrency(results.laborCost)}
              />

              <ResultRow
                label="Expenses"
                value={formatCurrency(results.projectExpenses)}
              />

              <ResultRow
                label={`Buffer (${results.bufferPercent}%)`}
                value={formatCurrency(results.bufferAmount)}
              />
            </div>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-white/5 p-5 shadow-inner">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                <div>
                  <div className="text-xs font-bold text-slate-200">
                    Effective project rate
                  </div>

                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    Your project price works out to approximately{" "}
                    <span className="font-black text-white">
                      {formatCurrency(results.effectiveHourlyRate)}/hr
                    </span>{" "}
                    across all estimated project hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white/5 p-4 border border-white/5">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                Pricing formula
              </div>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                ({formatHours(results.totalHours)} hours ×{" "}
                {formatCurrency(results.rate)})
                {" + "}
                {formatCurrency(results.projectExpenses)}
                {" + "}
                {formatCurrency(results.bufferAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
            ? "font-bold text-slate-200"
            : "font-medium text-slate-400"
        }
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "font-black text-white"
            : "font-semibold text-slate-300"
        }
      >
        {value}
      </span>
    </div>
  );
}