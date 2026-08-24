"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator as CalculatorIcon,
  Check,
  Clock3,
  DollarSign,
  Info,
  Plane,
  Receipt,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { computeFreelanceRate, RateInputs } from "@/lib/calculations";

interface CalculatorProps {
  initialValues?: Partial<RateInputs>;
}

type InputKey =
  | "targetNetIncome"
  | "annualExpenses"
  | "billableHoursPerWeek"
  | "vacationWeeks"
  | "taxRate";

const DEFAULT_VALUES: RateInputs = {
  targetNetIncome: 75000,
  annualExpenses: 5000,
  billableHoursPerWeek: 25,
  vacationWeeks: 4,
  taxRate: 28,
};

const currency = (value: number) =>
  `$${Math.round(value).toLocaleString("en-US")}`;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function Calculator({ initialValues }: CalculatorProps) {
  const [inputs, setInputs] = useState<RateInputs>({
    ...DEFAULT_VALUES,
    ...initialValues,
  });

  const results = computeFreelanceRate(inputs);

  const [activePreset, setActivePreset] = useState<number | null>(null);

  const updateInput = (key: InputKey, value: number) => {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));

    setActivePreset(null);
  };

  const resetCalculator = () => {
    setInputs({
      ...DEFAULT_VALUES,
      ...initialValues,
    });

    setActivePreset(null);
  };

  const presets = [
    {
      name: "Starter",
      income: 50000,
      expenses: 3000,
      hours: 20,
      vacation: 4,
      tax: 25,
    },
    {
      name: "Professional",
      income: 75000,
      expenses: 5000,
      hours: 25,
      vacation: 4,
      tax: 28,
    },
    {
      name: "Expert",
      income: 120000,
      expenses: 10000,
      hours: 30,
      vacation: 5,
      tax: 30,
    },
  ];

  const applyPreset = (index: number) => {
    const preset = presets[index];

    setInputs({
      targetNetIncome: preset.income,
      annualExpenses: preset.expenses,
      billableHoursPerWeek: preset.hours,
      vacationWeeks: preset.vacation,
      taxRate: preset.tax,
    });

    setActivePreset(index);
  };

  const calculatedMetrics = useMemo(() => {
    const workingWeeks = Math.max(1, 52 - inputs.vacationWeeks);

    const annualBillableHours =
      inputs.billableHoursPerWeek * workingWeeks;

    const weeklyRevenue =
      results.annualGrossTarget / workingWeeks;

    const monthlyRevenue =
      results.annualGrossTarget / 12;

    const estimatedMonthlyTakeHome =
      inputs.targetNetIncome / 12;

    const estimatedWeeklyTakeHome =
      inputs.targetNetIncome / workingWeeks;

    const utilization =
      Math.round((inputs.billableHoursPerWeek / 40) * 100);

    const taxAmount =
      results.estimatedAnnualTaxes;

    const expenseAmount =
      inputs.annualExpenses;

    const netAmount =
      inputs.targetNetIncome;

    const total =
      Math.max(1, taxAmount + expenseAmount + netAmount);

    return {
      workingWeeks,
      annualBillableHours,
      weeklyRevenue,
      monthlyRevenue,
      estimatedMonthlyTakeHome,
      estimatedWeeklyTakeHome,
      utilization,
      taxAmount,
      expenseAmount,
      netAmount,
      taxPercent: (taxAmount / total) * 100,
      expensePercent: (expenseAmount / total) * 100,
      netPercent: (netAmount / total) * 100,
    };
  }, [inputs, results]);

  const rateLevel = useMemo(() => {
    const rate = Number(results.recommendedHourlyRate);

    if (rate < 50) {
      return {
        label: "Entry level",
        text: "Your target rate is on the lower end. Make sure your expenses and billable hours are realistic.",
        percentage: 35,
      };
    }

    if (rate < 100) {
      return {
        label: "Professional",
        text: "This is a common range for many experienced independent professionals.",
        percentage: 65,
      };
    }

    if (rate < 175) {
      return {
        label: "Premium",
        text: "Your pricing reflects a higher-value specialist or experienced consultant.",
        percentage: 85,
      };
    }

    return {
      label: "High-value",
      text: "Your required rate is significant. Make sure your positioning and offer support the price.",
      percentage: 100,
    };
  }, [results.recommendedHourlyRate]);

  return (
    <div className="space-y-6">

      {/* =========================================================
          PAGE HEADER
      ========================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-400">
            <CalculatorIcon className="h-3.5 w-3.5" />
            Rate intelligence
          </div>

          <h2 className="text-3xl font-black tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-4xl">
            What should you charge?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Build your freelance rate from your income target, taxes,
            expenses, available working time, and the amount of work
            you can realistically bill.
          </p>
        </div>

        <button
          type="button"
          onClick={resetCalculator}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset calculator
        </button>
      </div>

      {/* =========================================================
          QUICK PRESETS
      ========================================================== */}

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />

            <span className="text-xs font-black uppercase tracking-[0.12em] text-zinc-500">
              Quick scenarios
            </span>
          </div>

          <span className="hidden text-[10px] font-medium text-zinc-400 sm:block">
            Start with a profile, then customize
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {presets.map((preset, index) => {
            const active = activePreset === index;

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(index)}
                className={`group rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/20"
                    : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-zinc-950 dark:text-white">
                    {preset.name}
                  </span>

                  {active ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  ) : (
                    <ArrowRight className="h-4 w-4 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-zinc-500" />
                  )}
                </div>

                <div className="mt-2 text-xs text-zinc-500">
                  {currency(preset.income)} take-home ·{" "}
                  {preset.hours} billable hrs/wk
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          MAIN CALCULATOR
      ========================================================== */}

      <div className="grid gap-5 lg:grid-cols-12">

        {/* INPUT PANEL */}

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-7 dark:border-zinc-800 dark:bg-zinc-900">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
              <Wallet className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-black tracking-tight text-zinc-950 dark:text-white">
                Your financial assumptions
              </h3>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                These numbers determine the minimum revenue your
                freelance business needs to generate.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-8">

            {/* TARGET INCOME */}

            <div>
              <div className="flex items-end justify-between gap-4">

                <div>
                  <label className="text-sm font-black text-zinc-800 dark:text-zinc-200">
                    Target take-home income
                  </label>

                  <p className="mt-1 max-w-md text-xs leading-5 text-zinc-500">
                    What you want to personally keep after taxes
                    and business expenses.
                  </p>
                </div>

                <div className="shrink-0 rounded-xl bg-zinc-950 px-3 py-2 text-lg font-black text-white dark:bg-white dark:text-zinc-950">
                  {currency(inputs.targetNetIncome)}
                </div>
              </div>

              <input
                type="range"
                min="30000"
                max="250000"
                step="5000"
                value={inputs.targetNetIncome}
                onChange={(event) =>
                  updateInput(
                    "targetNetIncome",
                    Number(event.target.value),
                  )
                }
                className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-emerald-600 dark:bg-zinc-800"
              />

              <div className="mt-2 flex justify-between text-[10px] font-bold text-zinc-400">
                <span>$30k</span>
                <span>$250k+</span>
              </div>
            </div>

            {/* EXPENSES */}

            <div>
              <div className="flex items-end justify-between gap-4">

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-black text-zinc-800 dark:text-zinc-200">
                    Annual business expenses
                    <Info className="h-3.5 w-3.5 text-zinc-400" />
                  </label>

                  <p className="mt-1 max-w-md text-xs leading-5 text-zinc-500">
                    Software, equipment, insurance, accounting,
                    marketing, and other operating costs.
                  </p>
                </div>

                <div className="shrink-0 text-lg font-black text-zinc-950 dark:text-white">
                  {currency(inputs.annualExpenses)}
                </div>
              </div>

              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={inputs.annualExpenses}
                onChange={(event) =>
                  updateInput(
                    "annualExpenses",
                    Number(event.target.value),
                  )
                }
                className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-emerald-600 dark:bg-zinc-800"
              />

              <div className="mt-2 flex justify-between text-[10px] font-bold text-zinc-400">
                <span>$1k</span>
                <span>$30k+</span>
              </div>
            </div>

            {/* BILLABLE HOURS */}

            <div>
              <div className="flex items-end justify-between gap-4">

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-black text-zinc-800 dark:text-zinc-200">
                    Billable hours per week
                    <Clock3 className="h-3.5 w-3.5 text-zinc-400" />
                  </label>

                  <p className="mt-1 max-w-md text-xs leading-5 text-zinc-500">
                    Only count time clients realistically pay you
                    for.
                  </p>
                </div>

                <div className="shrink-0 text-lg font-black text-zinc-950 dark:text-white">
                  {inputs.billableHoursPerWeek}
                  <span className="ml-1 text-xs font-bold text-zinc-400">
                    hrs
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={inputs.billableHoursPerWeek}
                onChange={(event) =>
                  updateInput(
                    "billableHoursPerWeek",
                    Number(event.target.value),
                  )
                }
                className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-emerald-600 dark:bg-zinc-800"
              />

              <div className="mt-2 flex justify-between text-[10px] font-bold text-zinc-400">
                <span>10 hrs</span>
                <span>40 hrs</span>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950">
                <span className="text-xs text-zinc-500">
                  Annual billable capacity
                </span>

                <span className="text-xs font-black text-zinc-900 dark:text-white">
                  {calculatedMetrics.annualBillableHours.toLocaleString()} hrs
                </span>
              </div>
            </div>

            {/* VACATION + TAX */}

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="flex items-center gap-1.5 text-sm font-black text-zinc-800 dark:text-zinc-200">
                  <Plane className="h-3.5 w-3.5 text-zinc-400" />
                  Vacation weeks
                </label>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Weeks you don't expect to bill clients.
                </p>

                <div className="relative mt-3">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={inputs.vacationWeeks}
                    onChange={(event) =>
                      updateInput(
                        "vacationWeeks",
                        clamp(
                          Number(event.target.value) || 0,
                          0,
                          20,
                        ),
                      )
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400">
                    weeks
                  </span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-black text-zinc-800 dark:text-zinc-200">
                  <Receipt className="h-3.5 w-3.5 text-zinc-400" />
                  Tax buffer
                </label>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Estimated percentage reserved for taxes.
                </p>

                <div className="relative mt-3">
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={inputs.taxRate}
                    onChange={(event) =>
                      updateInput(
                        "taxRate",
                        clamp(
                          Number(event.target.value) || 0,
                          0,
                          60,
                        ),
                      )
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400">
                    %
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* INPUT FOOTER */}

          <div className="mt-8 flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

            <p className="text-xs leading-5 text-emerald-900/70 dark:text-emerald-300/70">
              The calculator is designed around your real business
              economics—not simply a desired hourly number.
            </p>
          </div>
        </div>

        {/* =========================================================
            RESULT PANEL
        ========================================================== */}

        <div className="relative overflow-hidden rounded-3xl bg-[#07110d] p-5 text-white shadow-2xl sm:p-7 lg:col-span-5">

          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">

            <div className="flex items-center justify-between">

              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                  Recommended pricing
                </div>

                <div className="mt-1 text-xs text-zinc-500">
                  Based on your current financial assumptions
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                <DollarSign className="h-4 w-4 text-emerald-400" />
              </div>
            </div>

            {/* MAIN RATE */}

            <div className="mt-10">

              <div className="text-xs font-medium text-zinc-500">
                Recommended hourly rate
              </div>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-6xl font-black tracking-[-0.055em]">
                  ${results.recommendedHourlyRate}
                </span>

                <span className="mb-2 text-sm font-semibold text-zinc-500">
                  / hour
                </span>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                {rateLevel.label} pricing
              </div>
            </div>

            {/* RATE SNAPSHOT */}

            <div className="mt-8 grid grid-cols-2 gap-3">

              <DarkStat
                icon={BriefcaseBusiness}
                label="Day rate"
                value={`$${results.dayRate}`}
                note="8 billable hours"
              />

              <DarkStat
                icon={TrendingUp}
                label="Annual gross"
                value={currency(results.annualGrossTarget)}
                note="Revenue target"
              />

              <DarkStat
                icon={Wallet}
                label="Monthly gross"
                value={currency(calculatedMetrics.monthlyRevenue)}
                note="Average target"
              />

              <DarkStat
                icon={Clock3}
                label="Billable capacity"
                value={`${calculatedMetrics.utilization}%`}
                note="Utilization"
              />

            </div>

            {/* REVENUE BREAKDOWN */}

            <div className="mt-7 border-t border-white/10 pt-6">

              <div className="mb-5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                  Revenue allocation
                </span>

                <span className="text-[10px] font-bold text-zinc-600">
                  Annual
                </span>
              </div>

              <div className="space-y-4">

                <RevenueBar
                  label="Take-home income"
                  value={currency(calculatedMetrics.netAmount)}
                  percentage={calculatedMetrics.netPercent}
                  barClass="bg-emerald-500"
                />

                <RevenueBar
                  label="Estimated taxes"
                  value={currency(calculatedMetrics.taxAmount)}
                  percentage={calculatedMetrics.taxPercent}
                  barClass="bg-amber-500"
                />

                <RevenueBar
                  label="Business expenses"
                  value={currency(calculatedMetrics.expenseAmount)}
                  percentage={calculatedMetrics.expensePercent}
                  barClass="bg-blue-500"
                />

              </div>
            </div>

            {/* POSITION */}

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">

              <div className="flex items-center justify-between">

                <div>
                  <div className="text-xs font-black text-zinc-200">
                    Pricing position
                  </div>

                  <div className="mt-1 text-[10px] text-zinc-500">
                    Relative to common freelance rate bands
                  </div>
                </div>

                <span className="text-sm font-black text-emerald-400">
                  {rateLevel.percentage}%
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${rateLevel.percentage}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-[11px] leading-5 text-zinc-500">
                {rateLevel.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          FINANCIAL SNAPSHOT
      ========================================================== */}

      <div>

        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
              Financial snapshot
            </div>

            <h3 className="mt-1 text-lg font-black tracking-tight text-zinc-950 dark:text-white">
              Your freelance numbers at a glance
            </h3>
          </div>

          <div className="hidden text-xs text-zinc-400 sm:block">
            Based on current assumptions
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <MetricCard
            icon={Wallet}
            label="Monthly revenue"
            value={currency(calculatedMetrics.monthlyRevenue)}
            accent="emerald"
          />

          <MetricCard
            icon={TrendingUp}
            label="Weekly revenue"
            value={currency(calculatedMetrics.weeklyRevenue)}
            accent="blue"
          />

          <MetricCard
            icon={DollarSign}
            label="Monthly take-home"
            value={currency(calculatedMetrics.estimatedMonthlyTakeHome)}
            accent="emerald"
          />

          <MetricCard
            icon={Clock3}
            label="Billable utilization"
            value={`${calculatedMetrics.utilization}%`}
            accent="amber"
          />

        </div>
      </div>

      {/* =========================================================
          EXPLANATION CARDS
      ========================================================== */}

      <div className="grid gap-4 md:grid-cols-3">

        <InfoCard
          icon={Receipt}
          title="Taxes are included"
          text={`Your calculation currently reserves ${inputs.taxRate}% of required revenue for your estimated tax buffer.`}
        />

        <InfoCard
          icon={BriefcaseBusiness}
          title="Billable time matters"
          text={`You're planning around ${inputs.billableHoursPerWeek} billable hours per week, not a 40-hour client schedule.`}
        />

        <InfoCard
          icon={Plane}
          title="Time off is protected"
          text={`Your calculation assumes ${inputs.vacationWeeks} weeks away from billable work each year.`}
        />

      </div>

      {/* =========================================================
          NEGOTIATION / ACTION CARD
      ========================================================== */}

      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
              <CalculatorIcon className="h-5 w-5" />
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                Next move
              </div>

              <h3 className="mt-1 text-lg font-black tracking-tight text-zinc-950 dark:text-white">
                Your rate is only the beginning.
              </h3>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500">
                Use this recommended hourly rate as the foundation
                for project pricing, retainers, day rates, and client
                proposals.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-xs font-black text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Adjust my numbers
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

        </div>
      </div>

      {/* =========================================================
          DISCLAIMER
      ========================================================== */}

      <div className="flex gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">

        <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

        <p className="text-[11px] leading-5 text-zinc-500">
          This calculator provides an estimate for planning and
          pricing purposes. It is not tax, legal, accounting, or
          financial advice. Actual tax obligations vary based on
          location, deductions, business structure, and individual
          circumstances.
        </p>
      </div>
    </div>
  );
}

/* ===============================================================
   DARK STAT
================================================================ */

function DarkStat({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:bg-white/[0.07]">
      <div className="flex items-center gap-2 text-zinc-500">
        <Icon className="h-3.5 w-3.5" />

        <span className="text-[10px] font-black uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>

      <div className="mt-2 truncate text-lg font-black text-white">
        {value}
      </div>

      <div className="mt-1 text-[10px] text-zinc-600">
        {note}
      </div>
    </div>
  );
}

/* ===============================================================
   REVENUE BAR
================================================================ */

function RevenueBar({
  label,
  value,
  percentage,
  barClass,
}: {
  label: string;
  value: string;
  percentage: number;
  barClass: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-zinc-400">{label}</span>

        <span className="font-black text-white">
          {value}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barClass}`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ===============================================================
   METRIC CARD
================================================================ */

function MetricCard({
  icon: Icon,
  label,
  value,
  accent = "emerald",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: "emerald" | "blue" | "amber";
}) {
  const accentClasses = {
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  };

  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentClasses[accent]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <TrendingUp className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-700" />
      </div>

      <div className="mt-5 text-[10px] font-black uppercase tracking-[0.13em] text-zinc-400">
        {label}
      </div>

      <div className="mt-1 text-2xl font-black tracking-[-0.03em] text-zinc-950 dark:text-white">
        {value}
      </div>
    </div>
  );
}

/* ===============================================================
   INFO CARD
================================================================ */

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <Icon className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
      </div>

      <h3 className="mt-4 text-sm font-black tracking-tight text-zinc-950 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-zinc-500">
        {text}
      </p>
    </div>
  );
}