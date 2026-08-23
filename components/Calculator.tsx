'use client';

import React, { useState } from 'react';
import { computeFreelanceRate, RateInputs } from '@/lib/calculations';

interface CalculatorProps {
  initialValues?: Partial<RateInputs>;
}

export function Calculator({ initialValues }: CalculatorProps) {
  const [inputs, setInputs] = useState<RateInputs>({
    targetNetIncome: initialValues?.targetNetIncome ?? 75000,
    annualExpenses: initialValues?.annualExpenses ?? 5000,
    billableHoursPerWeek: initialValues?.billableHoursPerWeek ?? 25,
    vacationWeeks: initialValues?.vacationWeeks ?? 4,
    taxRate: initialValues?.taxRate ?? 28,
  });

  const results = computeFreelanceRate(inputs);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-7">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Financial Inputs</h2>

        <div>
          <label className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>Target Annual Take-Home Pay</span>
            <span className="font-bold text-zinc-900 dark:text-white">${inputs.targetNetIncome.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="30000"
            max="250000"
            step="5000"
            value={inputs.targetNetIncome}
            onChange={(e) => setInputs({ ...inputs, targetNetIncome: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-600"
          />
        </div>

        <div>
          <label className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>Annual Business Overhead</span>
            <span className="font-bold text-zinc-900 dark:text-white">${inputs.annualExpenses.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="1000"
            max="30000"
            step="500"
            value={inputs.annualExpenses}
            onChange={(e) => setInputs({ ...inputs, annualExpenses: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-600"
          />
        </div>

        <div>
          <label className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>Billable Hours / Week</span>
            <span className="font-bold text-zinc-900 dark:text-white">{inputs.billableHoursPerWeek} hrs/week</span>
          </label>
          <input
            type="range"
            min="10"
            max="40"
            step="1"
            value={inputs.billableHoursPerWeek}
            onChange={(e) => setInputs({ ...inputs, billableHoursPerWeek: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Vacation Weeks</label>
            <input
              type="number"
              value={inputs.vacationWeeks}
              onChange={(e) => setInputs({ ...inputs, vacationWeeks: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tax Buffer (%)</label>
            <input
              type="number"
              value={inputs.taxRate}
              onChange={(e) => setInputs({ ...inputs, taxRate: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-zinc-950 p-6 text-white lg:col-span-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Target Results</span>
          <div className="mt-4">
            <span className="text-sm text-zinc-400">Recommended Hourly Rate</span>
            <div className="mt-1 text-5xl font-extrabold text-white">
              ${results.recommendedHourlyRate}<span className="text-xl text-zinc-400">/hr</span>
            </div>
            <p className="mt-1 text-xs text-zinc-400">Includes a 20% cushion for non-billable hours & slow cycles.</p>
          </div>

          <div className="mt-6 space-y-3 border-t border-zinc-800 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Minimum Baseline Rate:</span>
              <span className="font-semibold text-white">${results.minHourlyRate}/hr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Day Rate (8 hrs):</span>
              <span className="font-semibold text-white">${results.dayRate}/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Gross Revenue Target:</span>
              <span className="font-semibold text-white">${results.annualGrossTarget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Estimated Taxes:</span>
              <span className="font-semibold text-white">${results.estimatedAnnualTaxes.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-zinc-900/80 p-3 text-xs text-zinc-300">
          💡 Benchmark calculated using industry averages for billable capacity.
        </div>
      </div>
    </div>
  );
}