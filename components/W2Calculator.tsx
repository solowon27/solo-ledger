'use client';

import React, { useState } from 'react';
import { computeW2vs1099, W2Inputs } from '@/lib/w2Calculations';

export function W2Calculator() {
  const [inputs, setInputs] = useState<W2Inputs>({
    w2Salary: 100000,
    ptoDays: 15,
    healthInsuranceValue: 6000,
    match401kPercent: 4,
    annualBusinessExpenses: 5000,
    billableHoursPerWeek: 30,
  });

  const result = computeW2vs1099(inputs);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-7">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Full-Time (W-2) Compensation</h2>

        <div>
          <label className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>Base W-2 Annual Salary</span>
            <span className="font-bold text-zinc-900 dark:text-white">${inputs.w2Salary.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="40000"
            max="300000"
            step="5000"
            value={inputs.w2Salary}
            onChange={(e) => setInputs({ ...inputs, w2Salary: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">PTO / Holidays (Days)</label>
            <input
              type="number"
              value={inputs.ptoDays}
              onChange={(e) => setInputs({ ...inputs, ptoDays: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">401(k) Match (%)</label>
            <input
              type="number"
              value={inputs.match401kPercent}
              onChange={(e) => setInputs({ ...inputs, match401kPercent: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Annual Health Benefit ($)</label>
            <input
              type="number"
              value={inputs.healthInsuranceValue}
              onChange={(e) => setInputs({ ...inputs, healthInsuranceValue: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Est. 1099 Expenses ($)</label>
            <input
              type="number"
              value={inputs.annualBusinessExpenses}
              onChange={(e) => setInputs({ ...inputs, annualBusinessExpenses: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>Weekly Billable Capacity (Hours)</span>
            <span className="font-bold text-zinc-900 dark:text-white">{inputs.billableHoursPerWeek} hrs/week</span>
          </label>
          <input
            type="range"
            min="15"
            max="40"
            step="1"
            value={inputs.billableHoursPerWeek}
            onChange={(e) => setInputs({ ...inputs, billableHoursPerWeek: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-600"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-zinc-950 p-6 text-white lg:col-span-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">1099 Equivalency Target</span>
          <div className="mt-4">
            <span className="text-sm text-zinc-400">Target 1099 Hourly Rate</span>
            <div className="mt-1 text-5xl font-extrabold text-white">
              ${result.equivalent1099HourlyRate}<span className="text-xl text-zinc-400">/hr</span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              To match your ${inputs.w2Salary.toLocaleString()} W-2 compensation package.
            </p>
          </div>

          <div className="mt-6 space-y-3 border-t border-zinc-800 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Required 1099 Gross Revenue:</span>
              <span className="font-semibold text-white">${result.equivalent1099AnnualGross.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Lost Benefits Value:</span>
              <span className="font-semibold text-white">${result.totalBenefitsValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Extra Self-Employment Tax:</span>
              <span className="font-semibold text-white">${result.additionalTaxBurden.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Annual Billable Hours:</span>
              <span className="font-semibold text-white">{result.workingHoursAnnual} hrs</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-zinc-900/80 p-3 text-xs text-zinc-300">
          💡 Contractors pay both halves of Social Security and Medicare taxes (15.3% total), while W-2 employers cover 7.65%.
        </div>
      </div>
    </div>
  );
}