"use client";

import React, { useMemo, useState } from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator as CalculatorIcon,
  Check,
  ChevronDown,
  Clock3,
  DollarSign,
  Info,
  Plane,
  Receipt,
  RotateCcw,
  ShieldCheck,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  computeFreelanceRate,
  RateInputs,
} from "@/lib/calculations";

import {
  CountryConfig,
  DEFAULT_COUNTRY,
} from "@/lib/countries";

interface CalculatorProps {
  initialValues?: Partial<RateInputs>;
  country?: CountryConfig;
}

type InputKey =
  | "targetNetIncome"
  | "annualExpenses"
  | "billableHoursPerWeek"
  | "vacationWeeks"
  | "taxRate";

const BASE_DEFAULT_VALUES: RateInputs = {
  targetNetIncome: 75000,
  annualExpenses: 5000,
  billableHoursPerWeek: 25,
  vacationWeeks: 4,
  taxRate: DEFAULT_COUNTRY.defaultTaxRate,
};

function getDefaultValues(
  country: CountryConfig
): RateInputs {
  return {
    ...BASE_DEFAULT_VALUES,
    taxRate: country.defaultTaxRate,
  };
}

function formatCurrency(
  value: number,
  country: CountryConfig
) {
  return new Intl.NumberFormat(country.locale, {
    style: "currency",
    currency: country.currency,
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
}

const numberFormat = (value: number) =>
  Math.round(
    Math.max(0, value)
  ).toLocaleString("en-US");

const clamp = (
  value: number,
  min: number,
  max: number
) =>
  Math.min(
    Math.max(value, min),
    max
  );

const percent = (value: number) =>
  `${Math.round(
    Math.max(
      0,
      Math.min(100, value)
    )
  )}%`;

export function Calculator({
  initialValues,
  country = DEFAULT_COUNTRY,
}: CalculatorProps) {
  const defaultValues = useMemo(
    () => getDefaultValues(country),
    [country]
  );

  const [inputs, setInputs] =
    useState<RateInputs>({
      ...defaultValues,
      ...initialValues,
    });

  const [activePreset, setActivePreset] =
    useState<number | null>(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const results = useMemo(
    () =>
      computeFreelanceRate(
        inputs,
        {
          costOfLivingIndex:
            country.costOfLivingIndex,
          applyCostOfLivingAdjustment: true,
        }
      ),
    [inputs, country]
  );

  const presets = useMemo(
    () => [
      {
        name: "Lean",
        description:
          "Lower overhead and lighter workload",
        income: 50000,
        expenses: 3000,
        hours: 20,
        vacation: 4,
        tax: country.defaultTaxRate,
      },
      {
        name: "Balanced",
        description:
          "A practical full-time freelance plan",
        income: 75000,
        expenses: 5000,
        hours: 25,
        vacation: 4,
        tax: country.defaultTaxRate,
      },
      {
        name: "Growth",
        description:
          "Higher income with more billable capacity",
        income: 120000,
        expenses: 10000,
        hours: 30,
        vacation: 5,
        tax: country.defaultTaxRate,
      },
    ],
    [country.defaultTaxRate]
  );

  const money = (value: number) =>
    formatCurrency(value, country);

  const updateInput = (
    key: InputKey,
    value: number
  ) => {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));

    setActivePreset(null);
  };

  const resetCalculator = () => {
    setInputs({
      ...defaultValues,
      ...initialValues,
    });

    setActivePreset(null);
  };

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

  const metrics = useMemo(() => {
    const workingWeeks = Math.max(
      1,
      52 - inputs.vacationWeeks
    );

    const annualBillableHours =
      inputs.billableHoursPerWeek *
      workingWeeks;

    const nonBillableHoursPerWeek =
      Math.max(
        0,
        40 -
          inputs.billableHoursPerWeek
      );

    const billableShare =
      inputs.billableHoursPerWeek > 0
        ? (inputs.billableHoursPerWeek /
            40) *
          100
        : 0;

    const minimumWeeklyRevenue =
      results.weeklyGrossTarget;

    const recommendedWeeklyRevenue =
      results.recommendedAnnualRevenue /
      workingWeeks;

    const minimumMonthlyRevenue =
      results.monthlyGrossTarget;

    const recommendedMonthlyRevenue =
      results.recommendedMonthlyRevenue;

    const taxAmount =
      results.estimatedAnnualTaxes;

    const expenseAmount =
      inputs.annualExpenses;

    const netAmount =
      inputs.targetNetIncome;

    const totalAllocation = Math.max(
      1,
      taxAmount +
        expenseAmount +
        netAmount
    );

    const netPercent =
      (netAmount / totalAllocation) *
      100;

    const taxPercent =
      (taxAmount / totalAllocation) *
      100;

    const expensePercent =
      (expenseAmount / totalAllocation) *
      100;

    const effectiveRate =
      annualBillableHours > 0
        ? results.recommendedAnnualRevenue /
          annualBillableHours
        : 0;

    const safetyMarginPercent =
      results.annualGrossTarget > 0
        ? (results.annualSafetyMargin /
            results.annualGrossTarget) *
          100
        : 0;

    return {
      workingWeeks,
      annualBillableHours,
      nonBillableHoursPerWeek,
      billableShare,
      minimumWeeklyRevenue,
      recommendedWeeklyRevenue,
      minimumMonthlyRevenue,
      recommendedMonthlyRevenue,
      taxAmount,
      expenseAmount,
      netAmount,
      netPercent,
      taxPercent,
      expensePercent,
      effectiveRate,
      safetyMarginPercent,
    };
  }, [inputs, results]);

  const planStatus = useMemo(() => {
    const hours =
      inputs.billableHoursPerWeek;

    const income =
      inputs.targetNetIncome;

    if (hours <= 15) {
      return {
        label: "Conservative workload",
        description:
          "Your plan protects a lot of time outside client work. Your required rate will need to be higher to support the income goal.",
      };
    }

    if (
      hours <= 30 &&
      income <= 150000
    ) {
      return {
        label: "Balanced plan",
        description:
          "Your income goal and billable workload create a realistic starting point for a sustainable freelance business.",
      };
    }

    if (hours > 35) {
      return {
        label: "High billable workload",
        description:
          "Your plan depends on keeping a large percentage of your working week client-billable. Make sure you leave room for sales, admin, and recovery.",
      };
    }

    return {
      label: "Growth-oriented plan",
      description:
        "Your plan targets a higher income level and requires strong client demand and consistent billable work.",
    };
  }, [inputs]);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
            <CalculatorIcon className="h-3.5 w-3.5" />
            {country.name} freelance financial planner
          </div>

          <h2 className="text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl lg:text-4xl">
            Plan the business behind your income goal.
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
            Start with what you want to take home. We&apos;ll work backward
            through taxes, expenses, time off, billable capacity, revenue,
            and pricing to build a practical freelance financial plan.
          </p>
        </div>

        <button
          type="button"
          onClick={resetCalculator}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset plan
        </button>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />

              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                Financial scenarios
              </span>
            </div>

            <p className="mt-1 text-xs text-zinc-400">
              Start with a scenario, then customize the numbers.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {presets.map((preset, index) => {
            const active =
              activePreset === index;

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() =>
                  applyPreset(index)
                }
                className={[
                  "group rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-blue-300 bg-blue-50"
                    : "border-zinc-200 bg-zinc-50 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-sm",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={[
                      "text-sm font-black",
                      active
                        ? "text-blue-900"
                        : "text-zinc-950",
                    ].join(" ")}
                  >
                    {preset.name}
                  </span>

                  {active ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <ArrowRight className="h-4 w-4 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-zinc-500" />
                  )}
                </div>

                <div
                  className={[
                    "mt-2 text-xs",
                    active
                      ? "text-blue-700"
                      : "text-zinc-500",
                  ].join(" ")}
                >
                  {money(preset.income)} take-home ·{" "}
                  {preset.hours} billable hrs/wk
                </div>

                <p className="mt-2 text-[10px] leading-4 text-zinc-400">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-7 sm:p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Target className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h3 className="text-sm font-black text-zinc-950">
                Build your financial plan
              </h3>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Enter your goals and operating assumptions to calculate
                the revenue and rate your business needs.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-7">
            <InputField
              label="Target take-home income"
              description="What you want to personally keep after estimated taxes and business expenses."
              prefix={country.currencySymbol}
              value={inputs.targetNetIncome}
              placeholder="75000"
              onChange={(value) =>
                updateInput(
                  "targetNetIncome",
                  Math.max(0, value)
                )
              }
            />

            <InputField
              label="Annual business expenses"
              description="Software, equipment, insurance, accounting, marketing, and other operating costs."
              prefix={country.currencySymbol}
              value={inputs.annualExpenses}
              placeholder="5000"
              onChange={(value) =>
                updateInput(
                  "annualExpenses",
                  Math.max(0, value)
                )
              }
              info
            />

            <div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-black text-zinc-800">
                  Billable hours per week
                </label>

                <Clock3 className="h-3.5 w-3.5 text-zinc-400" />
              </div>

              <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-500">
                Only count time clients realistically pay you for—not
                proposals, admin, marketing, or unpaid meetings.
              </p>

              <div className="relative mt-3">
                <input
                  type="number"
                  min="0"
                  max="168"
                  value={
                    inputs.billableHoursPerWeek === 0
                      ? ""
                      : inputs.billableHoursPerWeek
                  }
                  onChange={(event) =>
                    updateInput(
                      "billableHoursPerWeek",
                      clamp(
                        Number(event.target.value) || 0,
                        0,
                        168
                      )
                    )
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  placeholder="25"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400">
                  hours
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <MiniMetric
                  label="Working weeks"
                  value={`${metrics.workingWeeks}`}
                  suffix="weeks"
                />

                <MiniMetric
                  label="Annual billable"
                  value={numberFormat(
                    metrics.annualBillableHours
                  )}
                  suffix="hrs"
                />

                <MiniMetric
                  label="Billable share"
                  value={percent(
                    metrics.billableShare
                  )}
                  suffix=""
                />
              </div>

              <div className="mt-3 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3">
                <p className="text-xs leading-5 text-blue-900/70">
                  At{" "}
                  <strong className="text-blue-900">
                    {inputs.billableHoursPerWeek}
                  </strong>{" "}
                  billable hours per week, you have roughly{" "}
                  <strong className="text-blue-900">
                    {metrics.nonBillableHoursPerWeek} hours
                  </strong>{" "}
                  each week for proposals, admin, sales, meetings,
                  bookkeeping, and other non-billable work.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <NumberPlanningInput
                label="Vacation / non-billable weeks"
                description="Weeks you plan to be away from billable client work."
                icon={Plane}
                value={inputs.vacationWeeks}
                placeholder="4"
                suffix="weeks"
                min={0}
                max={51}
                onChange={(value) =>
                  updateInput(
                    "vacationWeeks",
                    clamp(value, 0, 51)
                  )
                }
              />

              <NumberPlanningInput
                label="Estimated tax rate"
                description={`Starting estimate for ${country.name}. Adjust this based on your own situation.`}
                icon={Receipt}
                value={inputs.taxRate}
                placeholder={String(
                  country.defaultTaxRate
                )}
                suffix="%"
                min={0}
                max={95}
                onChange={(value) =>
                  updateInput(
                    "taxRate",
                    clamp(value, 0, 95)
                  )
                }
              />
            </div>

            <div className="flex gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

              <p className="text-[11px] leading-5 text-amber-900/70">
                Tax calculations are estimates based on the percentage
                you provide. They are not a tax return, tax advice, or a
                substitute for advice from a qualified tax professional.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-6 shadow-sm lg:col-span-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                Your financial plan
              </div>

              <p className="mt-1 text-xs text-zinc-500">
                Based on your current assumptions
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-zinc-500">
              Recommended annual revenue
            </p>

            <div className="mt-1 text-5xl font-black tracking-tight text-zinc-950 sm:text-6xl">
              {money(
                results.recommendedAnnualRevenue
              )}
            </div>

            <p className="mt-3 max-w-md text-xs leading-5 text-zinc-500">
              Revenue target designed to support your income goal while
              adding a 20% operating safety margin and local market
              adjustment.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <ResultStat
              label="Minimum required"
              value={money(
                results.annualGrossTarget
              )}
            />

            <ResultStat
              label="Safety margin"
              value={`+${money(
                results.annualSafetyMargin
              )}`}
            />

            <ResultStat
              label="Monthly target"
              value={money(
                results.recommendedMonthlyRevenue
              )}
            />

            <ResultStat
              label="Weekly target"
              value={money(
                metrics.recommendedWeeklyRevenue
              )}
            />
          </div>

          <div className="mt-7 border-t border-zinc-200 pt-6">
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
              What this means for pricing
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DarkLightStat
                icon={DollarSign}
                label="Hourly"
                value={money(
                  results.recommendedHourlyRate
                )}
                note="Recommended"
                featured
              />

              <DarkLightStat
                icon={BriefcaseBusiness}
                label="Day rate"
                value={money(
                  results.dayRate
                )}
                note="8 billable hours"
              />

              <DarkLightStat
                icon={Wallet}
                label="Monthly"
                value={money(
                  results.recommendedMonthlyRevenue
                )}
                note="Revenue target"
              />

              <DarkLightStat
                icon={TrendingUp}
                label="Effective rate"
                value={money(
                  metrics.effectiveRate
                )}
                note="Annual capacity"
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

              <div>
                <div className="text-xs font-black text-zinc-900">
                  {planStatus.label}
                </div>

                <p className="mt-1 text-[10px] leading-5 text-zinc-500">
                  {planStatus.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
            Financial snapshot
          </div>

          <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-950">
            Your plan at a glance
          </h3>

          <p className="mt-1 text-xs leading-5 text-zinc-500">
            The numbers that matter most when planning your freelance
            business.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={Wallet}
            label="Target take-home"
            value={money(
              inputs.targetNetIncome
            )}
            accent="emerald"
          />

          <MetricCard
            icon={TrendingUp}
            label="Recommended annual"
            value={money(
              results.recommendedAnnualRevenue
            )}
            accent="blue"
          />

          <MetricCard
            icon={DollarSign}
            label="Recommended monthly"
            value={money(
              results.recommendedMonthlyRevenue
            )}
            accent="blue"
          />

          <MetricCard
            icon={Clock3}
            label="Annual billable hours"
            value={numberFormat(
              metrics.annualBillableHours
            )}
            accent="amber"
          />
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
              Revenue allocation
            </div>

            <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-950">
              Where your required revenue goes
            </h3>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500">
              Your minimum revenue target must cover personal income,
              estimated taxes, and business operating expenses.
            </p>
          </div>

          <div className="text-xs font-bold text-zinc-400">
            Minimum annual target
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <RevenueBar
            label="Your take-home income"
            value={money(metrics.netAmount)}
            percentage={metrics.netPercent}
            barClass="bg-blue-500"
          />

          <RevenueBar
            label="Estimated taxes"
            value={money(metrics.taxAmount)}
            percentage={metrics.taxPercent}
            barClass="bg-amber-500"
          />

          <RevenueBar
            label="Business expenses"
            value={money(metrics.expenseAmount)}
            percentage={metrics.expensePercent}
            barClass="bg-indigo-500"
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <AllocationCard
            label="Take-home"
            value={money(metrics.netAmount)}
            percentage={metrics.netPercent}
          />

          <AllocationCard
            label="Taxes"
            value={money(metrics.taxAmount)}
            percentage={metrics.taxPercent}
          />

          <AllocationCard
            label="Expenses"
            value={money(metrics.expenseAmount)}
            percentage={metrics.expensePercent}
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Clock3 className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
                Workload plan
              </div>

              <h3 className="mt-1 text-lg font-black text-zinc-950">
                Can your schedule support the goal?
              </h3>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Your revenue target is directly connected to how much
                client-billable work you can realistically complete.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <PlanningStat
              label="Billable / week"
              value={`${inputs.billableHoursPerWeek} hrs`}
            />

            <PlanningStat
              label="Working weeks"
              value={`${metrics.workingWeeks}`}
            />

            <PlanningStat
              label="Annual billable"
              value={`${numberFormat(
                metrics.annualBillableHours
              )} hrs`}
            />

            <PlanningStat
              label="Billable share"
              value={percent(
                metrics.billableShare
              )}
            />
          </div>

          <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-zinc-500">
                Client-billable time
              </span>

              <span className="text-sm font-black text-zinc-950">
                {inputs.billableHoursPerWeek} hrs
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    metrics.billableShare,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[10px] font-semibold text-zinc-400">
              <span>0 hrs</span>
              <span>40 hrs</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-zinc-950 p-6 text-white shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-400">
                Business protection
              </div>

              <h3 className="mt-1 text-lg font-black text-white">
                Your safety margin
              </h3>
            </div>
          </div>

          <div className="mt-7 text-4xl font-black tracking-tight">
            +{money(
              results.annualSafetyMargin
            )}
          </div>

          <p className="mt-3 text-xs leading-5 text-zinc-400">
            Your recommended pricing target creates additional annual
            revenue above the minimum required to support your financial
            goal.
          </p>

          <div className="mt-6 space-y-3">
            <ProtectionItem text="Slow client periods" />
            <ProtectionItem text="Scope creep and unpaid work" />
            <ProtectionItem text="Cancellations and payment delays" />
            <ProtectionItem text="Sales, marketing, and administration" />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400">
                Safety margin above minimum
              </span>

              <span className="text-sm font-black text-blue-400">
                {percent(
                  metrics.safetyMarginPercent
                )}
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    metrics.safetyMarginPercent,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
            Revenue targets
          </div>

          <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-950">
            Turn the annual goal into a working plan
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TargetCard
            label="Minimum monthly"
            value={money(
              metrics.minimumMonthlyRevenue
            )}
            note="Required to support your goal"
          />

          <TargetCard
            label="Recommended monthly"
            value={money(
              metrics.recommendedMonthlyRevenue
            )}
            note="Includes safety margin and local market adjustment"
            featured
          />

          <TargetCard
            label="Minimum weekly"
            value={money(
              metrics.minimumWeeklyRevenue
            )}
            note="During working weeks"
          />

          <TargetCard
            label="Recommended weekly"
            value={money(
              metrics.recommendedWeeklyRevenue
            )}
            note="During working weeks"
            featured
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() =>
            setShowDetails(
              (current) => !current
            )
          }
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
        >
          <div>
            <div className="text-sm font-black text-zinc-950">
              How your plan is calculated
            </div>

            <div className="mt-1 text-xs text-zinc-500">
              Understand the math behind your financial target.
            </div>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50">
            <ChevronDown
              className={[
                "h-4 w-4 text-zinc-400 transition-transform",
                showDetails
                  ? "rotate-180"
                  : "",
              ].join(" ")}
            />
          </div>
        </button>

        {showDetails && (
          <div className="border-t border-zinc-200 bg-zinc-50/60 px-5 py-5 sm:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              <FormulaCard
                number="01"
                title="Start with your goal"
                text={`Your target take-home income is ${money(
                  inputs.targetNetIncome
                )}.`}
              />

              <FormulaCard
                number="02"
                title="Add business costs"
                text={`Your plan includes ${money(
                  inputs.annualExpenses
                )} of annual business expenses.`}
              />

              <FormulaCard
                number="03"
                title="Reserve for taxes"
                text={`The calculator reserves approximately ${inputs.taxRate}% for estimated taxes.`}
              />

              <FormulaCard
                number="04"
                title="Account for time off"
                text={`You have ${metrics.workingWeeks} working weeks after ${inputs.vacationWeeks} weeks away.`}
              />

              <FormulaCard
                number="05"
                title="Calculate billable capacity"
                text={`At ${inputs.billableHoursPerWeek} billable hours per week, your annual capacity is ${numberFormat(
                  metrics.annualBillableHours
                )} hours.`}
              />

              <FormulaCard
                number="06"
                title="Add operating protection"
                text={`The recommended rate applies a 20% safety multiplier plus a ${Math.round(
                  country.costOfLivingIndex
                )}% local-market pricing factor.`}
              />
            </div>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-blue-100 bg-blue-50/60 p-6 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
              Your plan
            </div>

            <h3 className="mt-2 max-w-3xl text-xl font-black tracking-tight text-zinc-950 sm:text-2xl">
              Your {country.name} freelance business needs to generate{" "}
              {money(
                results.recommendedAnnualRevenue
              )}{" "}
              per year.
            </h3>

            <p className="mt-2 max-w-3xl text-xs leading-5 text-zinc-600">
              That supports your{" "}
              {money(
                inputs.targetNetIncome
              )}{" "}
              take-home goal, accounts for{" "}
              {money(
                inputs.annualExpenses
              )}{" "}
              in business expenses and your estimated{" "}
              {inputs.taxRate}% tax rate, while including a 20% operating
              safety margin.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-blue-100 bg-white px-6 py-5 text-center shadow-sm">
            <div className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-400">
              Recommended rate
            </div>

            <div className="mt-1 text-3xl font-black tracking-tight text-zinc-950">
              {money(
                results.recommendedHourlyRate
              )}

              <span className="ml-1 text-xs font-bold text-zinc-400">
                /hr
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InputField({
  label,
  description,
  prefix,
  value,
  placeholder,
  onChange,
  info = false,
}: {
  label: string;
  description: string;
  prefix?: string;
  value: number;
  placeholder: string;
  onChange: (value: number) => void;
  info?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-black text-zinc-800">
        {label}

        {info && (
          <Info className="h-3.5 w-3.5 text-zinc-400" />
        )}
      </label>

      <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-500">
        {description}
      </p>

      <div className="relative mt-3">
        {prefix && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-zinc-400">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          value={
            value === 0
              ? ""
              : value
          }
          placeholder={placeholder}
          onChange={(event) =>
            onChange(
              Number(event.target.value) || 0
            )
          }
          className={[
            "w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 text-sm font-semibold text-zinc-950 outline-none transition",
            "focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10",
            prefix
              ? "pl-12 pr-4"
              : "px-4",
          ].join(" ")}
        />
      </div>
    </div>
  );
}

function NumberPlanningInput({
  label,
  description,
  icon: Icon,
  value,
  placeholder,
  suffix,
  min,
  max,
  onChange,
}: {
  label: string;
  description: string;
  icon: React.ElementType;
  value: number;
  placeholder: string;
  suffix: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-black text-zinc-800">
        <Icon className="h-3.5 w-3.5 text-zinc-400" />
        {label}
      </label>

      <p className="mt-1 text-xs leading-5 text-zinc-500">
        {description}
      </p>

      <div className="relative mt-3">
        <input
          type="number"
          min={min}
          max={max}
          value={
            value === 0
              ? ""
              : value
          }
          placeholder={placeholder}
          onChange={(event) =>
            onChange(
              clamp(
                Number(event.target.value) || 0,
                min,
                max
              )
            )
          }
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pr-16 text-sm font-semibold text-zinc-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}

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

function DarkLightStat({
  icon: Icon,
  label,
  value,
  note,
  featured = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  note: string;
  featured?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-4 transition",
        featured
          ? "border-blue-200 bg-blue-50"
          : "border-zinc-200 bg-zinc-50",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={[
            "h-3.5 w-3.5",
            featured
              ? "text-blue-600"
              : "text-zinc-400",
          ].join(" ")}
        />

        <span className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-500">
          {label}
        </span>
      </div>

      <div className="mt-2 truncate text-lg font-black text-zinc-950">
        {value}
      </div>

      <div className="mt-1 text-[10px] text-zinc-400">
        {note}
      </div>
    </div>
  );
}

function MiniMetric({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3">
      <div className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400">
        {label}
      </div>

      <div className="mt-1 text-sm font-black text-zinc-900">
        {value}{" "}

        {suffix && (
          <span className="text-[10px] font-semibold text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

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
    emerald:
      "bg-emerald-50 text-emerald-600",
    blue:
      "bg-blue-50 text-blue-600",
    amber:
      "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div
          className={[
            "flex h-9 w-9 items-center justify-center rounded-xl",
            accentClasses[accent],
          ].join(" ")}
        >
          <Icon className="h-4 w-4" />
        </div>

        <TrendingUp className="h-3.5 w-3.5 text-zinc-300" />
      </div>

      <div className="mt-5 text-[10px] font-black uppercase tracking-[0.13em] text-zinc-400">
        {label}
      </div>

      <div className="mt-1 text-2xl font-black tracking-tight text-zinc-950">
        {value}
      </div>
    </div>
  );
}

function AllocationCard({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-500">
          {label}
        </span>

        <span className="text-xs font-black text-zinc-950">
          {percent(percentage)}
        </span>
      </div>

      <div className="mt-2 text-lg font-black text-zinc-950">
        {value}
      </div>
    </div>
  );
}

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
      <div className="mb-1.5 flex items-center justify-between gap-4 text-xs">
        <span className="font-medium text-zinc-500">
          {label}
        </span>

        <span className="font-black text-zinc-950">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barClass}`}
          style={{
            width: `${Math.min(
              Math.max(
                percentage,
                0
              ),
              100
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

function PlanningStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400">
        {label}
      </div>

      <div className="mt-1 text-lg font-black text-zinc-950">
        {value}
      </div>
    </div>
  );
}

function TargetCard({
  label,
  value,
  note,
  featured = false,
}: {
  label: string;
  value: string;
  note: string;
  featured?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        featured
          ? "border-blue-200 bg-blue-50"
          : "border-zinc-200 bg-white",
      ].join(" ")}
    >
      <div
        className={[
          "text-[9px] font-black uppercase tracking-[0.13em]",
          featured
            ? "text-blue-600"
            : "text-zinc-400",
        ].join(" ")}
      >
        {label}
      </div>

      <div className="mt-2 text-2xl font-black tracking-tight text-zinc-950">
        {value}
      </div>

      <div className="mt-1 text-[10px] leading-4 text-zinc-400">
        {note}
      </div>
    </div>
  );
}

function ProtectionItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
        <Check className="h-3 w-3" />
      </div>

      <span className="text-xs font-medium text-zinc-300">
        {text}
      </span>
    </div>
  );
}

function FormulaCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-black tracking-wider text-blue-600">
          {number}
        </span>

        <h4 className="text-xs font-black text-zinc-950">
          {title}
        </h4>
      </div>

      <p className="mt-2 text-[11px] leading-5 text-zinc-500">
        {text}
      </p>
    </div>
  );
}