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
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        {/* INPUTS */}
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40">
                  <Calculator className="h-4 w-4 text-blue-600" />
                </div>

                <h3 className="text-base font-black">
                  Project details
                </h3>
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                Estimate the total work required to complete the project.
              </p>
            </div>

            <button
              type="button"
              onClick={resetCalculator}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          <div className="mt-7 space-y-5">
            {/* HOURLY RATE */}
            <div>
              <label
                htmlFor="hourly-rate"
                className="mb-2 block text-xs font-bold text-zinc-700 dark:text-zinc-300"
              >
                Your hourly rate
              </label>

              <div className="relative">
                <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                <input
                  id="hourly-rate"
                  type="number"
                  min="0"
                  step="1"
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(event.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-9 pr-4 text-sm font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                  placeholder="75"
                />
              </div>

              <p className="mt-1.5 text-[11px] text-zinc-400">
                Tip: use the rate from your Solo Ledger rate calculator.
              </p>
            </div>

            {/* PRODUCTION */}
            <div>
              <label
                htmlFor="production-hours"
                className="mb-2 block text-xs font-bold text-zinc-700 dark:text-zinc-300"
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
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                placeholder="30"
              />

              <p className="mt-1.5 text-[11px] text-zinc-400">
                Actual hands-on work required to create the deliverable.
              </p>
            </div>

            {/* ADMIN */}
            <div>
              <label
                htmlFor="admin-hours"
                className="mb-2 block text-xs font-bold text-zinc-700 dark:text-zinc-300"
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
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                placeholder="4"
              />

              <p className="mt-1.5 text-[11px] text-zinc-400">
                Meetings, emails, planning, project management, research, etc.
              </p>
            </div>

            {/* REVISIONS */}
            <div>
              <label
                htmlFor="revision-hours"
                className="mb-2 block text-xs font-bold text-zinc-700 dark:text-zinc-300"
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
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                placeholder="5"
              />

              <p className="mt-1.5 text-[11px] text-zinc-400">
                Estimated time for changes and client feedback.
              </p>
            </div>

            {/* EXPENSES */}
            <div>
              <label
                htmlFor="project-expenses"
                className="mb-2 block text-xs font-bold text-zinc-700 dark:text-zinc-300"
              >
                Project expenses
              </label>

              <div className="relative">
                <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                <input
                  id="project-expenses"
                  type="number"
                  min="0"
                  step="1"
                  value={expenses}
                  onChange={(event) => setExpenses(event.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-9 pr-4 text-sm font-bold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                  placeholder="0"
                />
              </div>

              <p className="mt-1.5 text-[11px] text-zinc-400">
                Software, contractors, materials, travel, or other direct
                project costs.
              </p>
            </div>

            {/* BUFFER */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="project-buffer"
                  className="text-xs font-bold text-zinc-700 dark:text-zinc-300"
                >
                  Project buffer
                </label>

                <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
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
                className="w-full accent-blue-600"
              />

              <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
              </div>

              <p className="mt-2 text-[11px] text-zinc-400">
                Adds room for uncertainty, scope changes, and unexpected work.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="bg-zinc-950 p-5 text-white sm:p-7">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <WalletCards className="h-4 w-4" />
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                Your estimate
              </div>

              <h3 className="mt-0.5 text-base font-black">
                Project price
              </h3>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-xs font-bold text-zinc-500">
              Recommended project price
            </div>

            <div className="mt-2 text-5xl font-black tracking-[-0.04em] sm:text-6xl">
              {formatCurrency(results.projectPrice)}
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              Based on {formatHours(results.totalHours)} estimated hours
            </div>
          </div>

          <div className="mt-8 space-y-3">
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

            <div className="my-2 border-t border-zinc-800" />

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

          <div className="mt-7 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

              <div>
                <div className="text-xs font-bold text-zinc-200">
                  Effective project rate
                </div>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Your project price works out to approximately{" "}
                  <span className="font-bold text-zinc-300">
                    {formatCurrency(results.effectiveHourlyRate)}/hr
                  </span>{" "}
                  across all estimated project hours.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-2xl bg-white/5 p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
              Pricing formula
            </div>

            <p className="mt-2 text-xs leading-6 text-zinc-400">
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
            ? "font-bold text-zinc-200"
            : "font-medium text-zinc-500"
        }
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "font-black text-white"
            : "font-semibold text-zinc-300"
        }
      >
        {value}
      </span>
    </div>
  );
}