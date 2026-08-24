"use client";

import React, { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Info,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import {
  computeW2vs1099,
  W2Inputs,
} from "@/lib/w2Calculations";

const DEFAULT_INPUTS: W2Inputs = {
  w2Salary: 100000,
  ptoDays: 15,
  healthInsuranceValue: 6000,
  match401kPercent: 4,
  annualBusinessExpenses: 5000,
  billableHoursPerWeek: 30,
};

const money = (value: number) =>
  `$${Math.max(0, value).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;

export function W2Calculator() {
  const [inputs, setInputs] = useState<W2Inputs>(DEFAULT_INPUTS);

  const result = computeW2vs1099(inputs);

  const update = <K extends keyof W2Inputs>(
    field: K,
    value: W2Inputs[K],
  ) => {
    setInputs((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const reset = () => {
    setInputs(DEFAULT_INPUTS);
  };

  const annualRevenue = result.equivalent1099AnnualGross;

  const monthlyRevenue = useMemo(
    () => Math.round(annualRevenue / 12),
    [annualRevenue],
  );

  const weeklyRevenue = useMemo(
    () => Math.round(annualRevenue / 52),
    [annualRevenue],
  );

  const employeeHourlyRate = inputs.w2Salary / 2080;

  const hourlyDifference = Math.max(
    0,
    result.equivalent1099HourlyRate - employeeHourlyRate,
  );

  const premiumPercent =
    employeeHourlyRate > 0
      ? Math.round(
          ((result.equivalent1099HourlyRate - employeeHourlyRate) /
            employeeHourlyRate) *
            100,
        )
      : 0;

  return (
    <div className="space-y-8">
      {/* =========================================================
          HEADER
      ========================================================== */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            W-2 vs 1099
          </div>

          <h2 className="text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl">
            What should you charge as a contractor?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Compare your current employee compensation with the freelance
            revenue you would need to replace salary, benefits, retirement,
            paid time off, and business costs.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* =========================================================
          SUMMARY STRIP
      ========================================================== */}

      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryCard
          label="W-2 salary"
          value={money(inputs.w2Salary)}
          icon={CircleDollarSign}
        />

        <SummaryCard
          label="1099 annual target"
          value={money(result.equivalent1099AnnualGross)}
          icon={TrendingUp}
          positive
        />

        <SummaryCard
          label="Contractor hourly rate"
          value={`$${result.equivalent1099HourlyRate}/hr`}
          icon={ArrowUpRight}
          positive
        />
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
                Your W-2 compensation
              </h3>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Enter the value of the employee package you are comparing
                against a freelance opportunity.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-7">
            {/* Salary */}

            <RangeInput
              label="Annual W-2 salary"
              value={inputs.w2Salary}
              min={40000}
              max={300000}
              step={5000}
              display={money(inputs.w2Salary)}
              onChange={(value) => update("w2Salary", value)}
            />

            {/* Billable hours */}

            <RangeInput
              label="Weekly billable capacity"
              value={inputs.billableHoursPerWeek}
              min={10}
              max={40}
              step={1}
              display={`${inputs.billableHoursPerWeek} hrs/week`}
              onChange={(value) =>
                update("billableHoursPerWeek", value)
              }
            />

            {/* PTO / Retirement */}

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Paid time off"
                suffix="days"
                value={inputs.ptoDays}
                min={0}
                max={60}
                onChange={(value) => update("ptoDays", value)}
              />

              <NumberInput
                label="401(k) employer match"
                suffix="%"
                value={inputs.match401kPercent}
                min={0}
                max={20}
                step={0.5}
                onChange={(value) =>
                  update("match401kPercent", value)
                }
              />
            </div>

            {/* Benefits / Expenses */}

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Annual health benefits"
                prefix="$"
                value={inputs.healthInsuranceValue}
                min={0}
                max={50000}
                step={500}
                onChange={(value) =>
                  update("healthInsuranceValue", value)
                }
              />

              <NumberInput
                label="Estimated 1099 expenses"
                prefix="$"
                value={inputs.annualBusinessExpenses}
                min={0}
                max={50000}
                step={500}
                onChange={(value) =>
                  update("annualBusinessExpenses", value)
                }
              />
            </div>
          </div>

          {/* Explanation */}

          <div className="mt-8 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

            <p className="text-xs leading-5 text-blue-900/70">
              Salary is only one part of employee compensation. Benefits,
              retirement matching, paid leave, and the additional costs of
              contracting all affect the rate you need.
            </p>
          </div>
        </div>

        {/* =======================================================
            RESULT
        ======================================================== */}

        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-sm lg:col-span-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                1099 equivalent
              </div>

              <p className="mt-1 text-xs text-zinc-500">
                Estimated contractor requirement
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-zinc-500">
              Target contractor hourly rate
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tight text-zinc-950 sm:text-6xl">
                ${result.equivalent1099HourlyRate}
              </span>

              <span className="text-base font-bold text-zinc-400">
                /hr
              </span>
            </div>

            {premiumPercent > 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                <ArrowUpRight className="h-3 w-3" />
                {premiumPercent}% above salary equivalent
              </div>
            )}
          </div>

          {/* Key numbers */}

          <div className="mt-8 grid grid-cols-2 gap-3">
            <ResultStat
              label="Annual target"
              value={money(result.equivalent1099AnnualGross)}
            />

            <ResultStat
              label="Monthly target"
              value={money(monthlyRevenue)}
            />

            <ResultStat
              label="Weekly target"
              value={money(weeklyRevenue)}
            />

            <ResultStat
              label="Billable hours"
              value={`${result.workingHoursAnnual.toLocaleString()} hrs`}
            />
          </div>

          {/* Comparison */}

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-zinc-500">
                Employee hourly equivalent
              </span>

              <span className="text-sm font-black text-zinc-950">
                {money(employeeHourlyRate)}/hr
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-xs text-zinc-500">
                Contractor difference
              </span>

              <span className="text-sm font-black text-emerald-600">
                +{money(hourlyDifference)}/hr
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-100 bg-white/80 p-4">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

              <p className="text-xs leading-5 text-zinc-500">
                This is your estimated financial break-even rate—not simply
                your W-2 salary divided by working hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BREAKDOWN
      ========================================================== */}

      <div>
        <div className="mb-5">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
            Compensation breakdown
          </div>

          <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-950">
            Where the difference comes from
          </h3>

          <p className="mt-1 text-xs leading-5 text-zinc-500">
            Contracting replaces more than a paycheck. These are the major
            financial components included in the estimate.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BreakdownCard
            icon={TrendingUp}
            title="Benefits"
            value={money(result.totalBenefitsValue)}
            description="Estimated value of benefits you would give up."
            tone="blue"
          />

          <BreakdownCard
            icon={ShieldCheck}
            title="Tax burden"
            value={money(result.additionalTaxBurden)}
            description="Estimated additional employment-tax burden."
            tone="emerald"
          />

          <BreakdownCard
            icon={BriefcaseBusiness}
            title="Business costs"
            value={money(inputs.annualBusinessExpenses)}
            description="Software, equipment, insurance, accounting and more."
            tone="amber"
          />

          <BreakdownCard
            icon={CircleDollarSign}
            title="Target revenue"
            value={money(result.equivalent1099AnnualGross)}
            description="Estimated annual revenue required from freelance work."
            tone="blue"
          />
        </div>
      </div>

      {/* =========================================================
          NEGOTIATION CARD
      ========================================================== */}

      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-2">
          <div className="p-6 sm:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            <h3 className="mt-5 text-xl font-black tracking-tight text-zinc-950">
              Your negotiation floor
            </h3>

            <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-500">
              If a company wants you to leave a{" "}
              <strong className="text-zinc-700">
                ${inputs.w2Salary.toLocaleString()}
              </strong>{" "}
              W-2 position and become a contractor, compare the offer against
              this number—not just your current salary divided by 2,080 hours.
            </p>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                Suggested minimum
              </div>

              <div className="mt-2 text-4xl font-black tracking-tight text-zinc-950">
                ${result.equivalent1099HourlyRate}
                <span className="ml-1 text-base font-bold text-zinc-400">
                  /hr
                </span>
              </div>

              <div className="mt-2 text-xs text-zinc-500">
                ≈ {money(result.equivalent1099AnnualGross)} annual gross
                revenue
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 bg-zinc-50 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
              Before accepting a contract
            </div>

            <ul className="mt-5 space-y-4">
              <Tip>
                Freelancers generally don't receive paid vacation or holidays.
              </Tip>

              <Tip>
                You may need to purchase your own health insurance and
                retirement benefits.
              </Tip>

              <Tip>
                Business expenses reduce your actual take-home income.
              </Tip>

              <Tip>
                Client hours are not necessarily the same as total hours
                worked.
              </Tip>

              <Tip>
                Actual tax liability varies by location and personal
                circumstances.
              </Tip>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================
          DISCLAIMER
      ========================================================== */}

      <div className="flex gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

        <p className="text-[11px] leading-5 text-zinc-500">
          This calculator provides an estimate for planning and negotiation
          purposes. It is not tax, legal, accounting, or financial advice.
          Actual compensation and tax obligations vary by employer, location,
          business structure, deductions, and individual circumstances.
        </p>
      </div>
    </div>
  );
}

/* ===============================================================
   SUMMARY CARD
================================================================ */

function SummaryCard({
  label,
  value,
  icon: Icon,
  positive = false,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            positive ? "bg-emerald-50" : "bg-blue-50"
          }`}
        >
          <Icon
            className={`h-4 w-4 ${
              positive ? "text-emerald-600" : "text-blue-600"
            }`}
          />
        </div>

        {positive && (
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-700">
            Target
          </span>
        )}
      </div>

      <div className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </div>

      <div className="mt-1 text-xl font-black tracking-tight text-zinc-950">
        {value}
      </div>
    </div>
  );
}

/* ===============================================================
   RANGE INPUT
================================================================ */

function RangeInput({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-bold text-zinc-700">
          {label}
        </label>

        <span className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-sm font-black text-zinc-950">
          {display}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-blue-600"
      />

      <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
        <span>
          {min >= 1000
            ? `$${min.toLocaleString()}`
            : min}
        </span>

        <span>
          {max >= 1000
            ? `$${max.toLocaleString()}`
            : max}
        </span>
      </div>
    </div>
  );
}

/* ===============================================================
   NUMBER INPUT
================================================================ */

function NumberInput({
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
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
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => {
            const number = Number(event.target.value);

            onChange(
              Math.min(
                max,
                Math.max(
                  min,
                  Number.isFinite(number) ? number : 0,
                ),
              ),
            );
          }}
          className={`w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 text-sm font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            prefix ? "pl-8 pr-3" : "px-3"
          } ${suffix ? "pr-12" : ""}`}
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
   RESULT STAT
================================================================ */

function ResultStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
        {label}
      </div>

      <div className="mt-1 text-sm font-black text-zinc-950">
        {value}
      </div>
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
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="text-lg font-black text-zinc-950">
          {value}
        </span>
      </div>

      <div className="mt-4 text-sm font-black text-zinc-950">
        {title}
      </div>

      <p className="mt-1 text-xs leading-5 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

/* ===============================================================
   TIP
================================================================ */

function Tip({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 text-xs leading-5 text-zinc-600">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
      <span>{children}</span>
    </li>
  );
}