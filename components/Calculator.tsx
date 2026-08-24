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
    { name: "Starter", income: 50000, expenses: 3000, hours: 20, vacation: 4, tax: 25 },
    { name: "Professional", income: 75000, expenses: 5000, hours: 25, vacation: 4, tax: 28 },
    { name: "Expert", income: 120000, expenses: 10000, hours: 30, vacation: 5, tax: 30 },
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
    const annualBillableHours = inputs.billableHoursPerWeek * workingWeeks;
    const weeklyRevenue = results.annualGrossTarget / workingWeeks;
    const monthlyRevenue = results.annualGrossTarget / 12;
    const estimatedMonthlyTakeHome = inputs.targetNetIncome / 12;
    const estimatedWeeklyTakeHome = inputs.targetNetIncome / workingWeeks;
    const utilization = Math.round((inputs.billableHoursPerWeek / 40) * 100);
    const taxAmount = results.estimatedAnnualTaxes;
    const expenseAmount = inputs.annualExpenses;
    const netAmount = inputs.targetNetIncome;
    const total = Math.max(1, taxAmount + expenseAmount + netAmount);

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
    if (rate < 50) return { label: "Entry level", text: "Your target rate is on the lower end. Ensure your expenses and hours are realistic.", percentage: 35 };
    if (rate < 100) return { label: "Professional", text: "This is a common range for many experienced independent professionals.", percentage: 65 };
    if (rate < 175) return { label: "Premium", text: "Your pricing reflects a higher-value specialist or experienced consultant.", percentage: 85 };
    return { label: "High-value", text: "Your required rate is significant. Ensure your positioning supports the price.", percentage: 100 };
  }, [results.recommendedHourlyRate]);

  return (
    <div className="space-y-8">
      {/* =========================================================
          PAGE HEADER
      ========================================================== */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-blue-100/50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
            <CalculatorIcon className="h-3.5 w-3.5" />
            Rate intelligence
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            What should you charge?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Build your freelance rate from your income target, taxes, expenses,
            and the amount of work you can realistically bill.
          </p>
        </div>

        <button
          type="button"
          onClick={resetCalculator}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset parameters
        </button>
      </div>

      {/* =========================================================
          QUICK PRESETS (Darker background for depth)
      ========================================================== */}
      <div className="rounded-2xl border border-slate-200 bg-slate-100/80 p-4 shadow-inner">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              Quick scenarios
            </span>
          </div>
          <span className="hidden text-[10px] font-bold text-slate-400 sm:block">
            Start with a profile, then customize
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {presets.map((preset, index) => {
            const active = activePreset === index;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(index)}
                className={`group rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-blue-400 bg-blue-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-black ${active ? "text-blue-900" : "text-slate-900"}`}>
                    {preset.name}
                  </span>
                  {active ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                      <Check className="h-3 w-3" />
                    </div>
                  ) : (
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
                  )}
                </div>
                <div className={`mt-2 text-xs ${active ? "text-blue-700" : "text-slate-500"}`}>
                  {currency(preset.income)} take-home · {preset.hours} hrs/wk
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          MAIN CALCULATOR
      ========================================================== */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* INPUT PANEL (Slightly darker slate-50 to pop the white inputs) */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-7 lg:col-span-7">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shadow-sm">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black tracking-tight text-slate-900">
                Your financial assumptions
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                These numbers determine the minimum revenue your business needs to generate.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {/* TARGET INCOME */}
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <label className="text-sm font-black text-slate-800">
                    Target take-home income
                  </label>
                  <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
                    What you want to personally keep after taxes and business expenses.
                  </p>
                </div>
                <div className="shrink-0 rounded-xl bg-slate-900 px-3 py-2 text-lg font-black text-white shadow-md">
                  {currency(inputs.targetNetIncome)}
                </div>
              </div>
              <input
                type="range"
                min="30000"
                max="250000"
                step="5000"
                value={inputs.targetNetIncome}
                onChange={(event) => updateInput("targetNetIncome", Number(event.target.value))}
                className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-300 accent-blue-600"
              />
              <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
                <span>$30k</span>
                <span>$250k+</span>
              </div>
            </div>

            {/* EXPENSES */}
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-black text-slate-800">
                    Annual business expenses
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                  </label>
                  <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
                    Software, equipment, insurance, and other operating costs.
                  </p>
                </div>
                <div className="shrink-0 text-lg font-black text-slate-900">
                  {currency(inputs.annualExpenses)}
                </div>
              </div>
              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={inputs.annualExpenses}
                onChange={(event) => updateInput("annualExpenses", Number(event.target.value))}
                className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-300 accent-blue-600"
              />
              <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
                <span>$1k</span>
                <span>$30k+</span>
              </div>
            </div>

            {/* BILLABLE HOURS */}
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-black text-slate-800">
                    Billable hours per week
                    <Clock3 className="h-3.5 w-3.5 text-slate-400" />
                  </label>
                  <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
                    Only count time clients realistically pay you for.
                  </p>
                </div>
                <div className="shrink-0 text-lg font-black text-slate-900">
                  {inputs.billableHoursPerWeek}
                  <span className="ml-1 text-xs font-bold text-slate-400">hrs</span>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={inputs.billableHoursPerWeek}
                onChange={(event) => updateInput("billableHoursPerWeek", Number(event.target.value))}
                className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-300 accent-blue-600"
              />
              <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
                <span>10 hrs</span>
                <span>40 hrs</span>
              </div>
              
              {/* Highlighted nested card for capacity */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
                <span className="text-xs font-semibold text-slate-500">Annual billable capacity</span>
                <span className="text-sm font-black text-slate-900">
                  {calculatedMetrics.annualBillableHours.toLocaleString()} hrs
                </span>
              </div>
            </div>

            {/* VACATION + TAX */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-black text-slate-800">
                  <Plane className="h-3.5 w-3.5 text-slate-400" />
                  Vacation weeks
                </label>
                <p className="mt-1 text-xs leading-5 text-slate-500">Weeks away from billable work.</p>
                <div className="relative mt-3">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={inputs.vacationWeeks}
                    onChange={(event) => updateInput("vacationWeeks", clamp(Number(event.target.value) || 0, 0, 20))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    weeks
                  </span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-black text-slate-800">
                  <Receipt className="h-3.5 w-3.5 text-slate-400" />
                  Tax buffer
                </label>
                <p className="mt-1 text-xs leading-5 text-slate-500">Estimated percentage reserved for taxes.</p>
                <div className="relative mt-3">
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={inputs.taxRate}
                    onChange={(event) => updateInput("taxRate", clamp(Number(event.target.value) || 0, 0, 60))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            RESULT PANEL
        ========================================================== */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-5 text-white shadow-xl sm:p-7 lg:col-span-5 border border-slate-800">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                  Recommended pricing
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Based on your current financial assumptions
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <DollarSign className="h-4 w-4 text-blue-400" />
              </div>
            </div>

            {/* MAIN RATE */}
            <div className="mt-10">
              <div className="text-xs font-medium text-slate-400">
                Recommended hourly rate
              </div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-6xl font-black tracking-[-0.05em] text-white">
                  ${results.recommendedHourlyRate}
                </span>
                <span className="mb-2 text-sm font-semibold text-slate-500">
                  / hour
                </span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-black text-blue-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                {rateLevel.label} pricing
              </div>
            </div>

            {/* RATE SNAPSHOT */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <DarkStat icon={BriefcaseBusiness} label="Day rate" value={`$${results.dayRate}`} note="8 billable hours" />
              <DarkStat icon={TrendingUp} label="Annual gross" value={currency(results.annualGrossTarget)} note="Revenue target" />
              <DarkStat icon={Wallet} label="Monthly gross" value={currency(calculatedMetrics.monthlyRevenue)} note="Average target" />
              <DarkStat icon={Clock3} label="Capacity" value={`${calculatedMetrics.utilization}%`} note="Utilization" />
            </div>

            {/* REVENUE BREAKDOWN */}
            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Revenue allocation
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  Annual
                </span>
              </div>
              <div className="space-y-4">
                <RevenueBar label="Take-home income" value={currency(calculatedMetrics.netAmount)} percentage={calculatedMetrics.netPercent} barClass="bg-blue-500" />
                <RevenueBar label="Estimated taxes" value={currency(calculatedMetrics.taxAmount)} percentage={calculatedMetrics.taxPercent} barClass="bg-amber-500" />
                <RevenueBar label="Business expenses" value={currency(calculatedMetrics.expenseAmount)} percentage={calculatedMetrics.expensePercent} barClass="bg-indigo-500" />
              </div>
            </div>

            {/* POSITION */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-slate-200">
                    Pricing position
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">
                    Relative to common freelance rate bands
                  </div>
                </div>
                <span className="text-sm font-black text-blue-400">
                  {rateLevel.percentage}%
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${rateLevel.percentage}%` }}
                />
              </div>
              <p className="mt-3 text-[11px] leading-5 text-slate-400">
                {rateLevel.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          FINANCIAL SNAPSHOT (Darker cards for contrast)
      ========================================================== */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
              Financial snapshot
            </div>
            <h3 className="mt-1 text-lg font-black tracking-tight text-slate-900">
              Your freelance numbers at a glance
            </h3>
          </div>
          <div className="hidden text-xs font-semibold text-slate-400 sm:block">
            Based on current assumptions
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard icon={Wallet} label="Monthly revenue" value={currency(calculatedMetrics.monthlyRevenue)} accent="emerald" />
          <MetricCard icon={TrendingUp} label="Weekly revenue" value={currency(calculatedMetrics.weeklyRevenue)} accent="blue" />
          <MetricCard icon={DollarSign} label="Monthly take-home" value={currency(calculatedMetrics.estimatedMonthlyTakeHome)} accent="emerald" />
          <MetricCard icon={Clock3} label="Billable utilization" value={`${calculatedMetrics.utilization}%`} accent="amber" />
        </div>
      </div>

      {/* =========================================================
          EXPLANATION CARDS (Darker inset backgrounds)
      ========================================================== */}
      <div className="grid gap-4 md:grid-cols-3">
        <InfoCard icon={Receipt} title="Taxes are included" text={`Your calculation currently reserves ${inputs.taxRate}% of required revenue for your estimated tax buffer.`} />
        <InfoCard icon={BriefcaseBusiness} title="Billable time matters" text={`You're planning around ${inputs.billableHoursPerWeek} billable hours per week, not a standard 40-hour client schedule.`} />
        <InfoCard icon={Plane} title="Time off is protected" text={`Your calculation assumes ${inputs.vacationWeeks} weeks away from billable work each year.`} />
      </div>
    </div>
  );
}

/* ===============================================================
   DARK STAT
================================================================ */

function DarkStat({ icon: Icon, label, value, note }: { icon: React.ElementType; label: string; value: string; note: string; }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-black uppercase tracking-[0.12em]">{label}</span>
      </div>
      <div className="mt-2 truncate text-lg font-black text-white">{value}</div>
      <div className="mt-1 text-[10px] text-slate-500">{note}</div>
    </div>
  );
}

/* ===============================================================
   REVENUE BAR
================================================================ */

function RevenueBar({ label, value, percentage, barClass }: { label: string; value: string; percentage: number; barClass: string; }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-400">{label}</span>
        <span className="font-black text-white">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div className={`h-full rounded-full transition-all duration-500 ${barClass}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
    </div>
  );
}

/* ===============================================================
   METRIC CARD (Using bg-slate-50 to pop against the dashboard)
================================================================ */

function MetricCard({ icon: Icon, label, value, accent = "emerald" }: { icon: React.ElementType; label: string; value: string; accent?: "emerald" | "blue" | "amber"; }) {
  const accentClasses = {
    emerald: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <TrendingUp className="h-3.5 w-3.5 text-slate-300 transition group-hover:text-slate-400" />
      </div>
      <div className="mt-5 text-[10px] font-black uppercase tracking-[0.13em] text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-2xl font-black tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

/* ===============================================================
   INFO CARD (Using bg-slate-50 to pop against the dashboard)
================================================================ */

function InfoCard({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string; }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-slate-300">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-xs border border-slate-100">
        <Icon className="h-4 w-4 text-slate-600" />
      </div>
      <h3 className="mt-4 text-sm font-black tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}