"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  Percent,
  Receipt,
  RotateCcw,
  ShieldCheck,
  TrendingDown,
  Wallet,
} from "lucide-react";

type FilingStatus = "single" | "married";

const currency = (val: number) => `$${Math.round(val).toLocaleString("en-US")}`;

export function TaxCalculator() {
  const [grossIncome, setGrossIncome] = useState<number>(85000);
  const [expenses, setExpenses] = useState<number>(8000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [stateTaxRate, setStateTaxRate] = useState<number>(5);

  const taxCalculations = useMemo(() => {
    // 1. Net Schedule C Profit
    const netProfit = Math.max(0, grossIncome - expenses);

    // 2. Self-Employment Tax (15.3% on 92.35% of net profit)
    const taxableSEIncome = netProfit * 0.9235;
    // Social Security Cap check (approx $168,600 cap for 12.4% portion)
    const ssTax = Math.min(taxableSEIncome, 168600) * 0.124;
    const medicareTax = taxableSEIncome * 0.029;
    const totalSETax = ssTax + medicareTax;

    // 3. Estimated Federal Income Tax (simplified effective estimate post 50% SE deduction + standard deduction)
    const seDeduction = totalSETax / 2;
    const standardDeduction = filingStatus === "single" ? 14600 : 29200;
    const taxableIncome = Math.max(0, netProfit - seDeduction - standardDeduction);
    
    // Progressive estimated federal brackets
    let estimatedFederalTax = 0;
    if (taxableIncome > 0) {
      if (taxableIncome <= 11600) {
        estimatedFederalTax = taxableIncome * 0.10;
      } else if (taxableIncome <= 47150) {
        estimatedFederalTax = 1160 + (taxableIncome - 11600) * 0.12;
      } else if (taxableIncome <= 100525) {
        estimatedFederalTax = 5426 + (taxableIncome - 47150) * 0.22;
      } else {
        estimatedFederalTax = 17168 + (taxableIncome - 100525) * 0.24;
      }
    }

    // 4. State Tax
    const estimatedStateTax = netProfit * (stateTaxRate / 100);

    // 5. Totals
    const totalTaxLiability = totalSETax + estimatedFederalTax + estimatedStateTax;
    const effectiveTaxRate = grossIncome > 0 ? (totalTaxLiability / grossIncome) * 100 : 0;
    const quarterlyPayment = totalTaxLiability / 4;
    const netTakeHome = grossIncome - expenses - totalTaxLiability;

    return {
      netProfit,
      totalSETax,
      estimatedFederalTax,
      estimatedStateTax,
      totalTaxLiability,
      effectiveTaxRate,
      quarterlyPayment,
      netTakeHome,
    };
  }, [grossIncome, expenses, filingStatus, stateTaxRate]);

  return (
    <div className="w-full space-y-8">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* INPUT PANEL */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div>
              <h3 className="font-black text-slate-900">Income & Expense Inputs</h3>
              <p className="text-xs text-slate-500">Calculate exact self-employment and quarterly taxes.</p>
            </div>
            <button
              onClick={() => {
                setGrossIncome(85000);
                setExpenses(8000);
                setFilingStatus("single");
                setStateTaxRate(5);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {/* GROSS 1099 REVENUE */}
            <div>
              <label className="text-sm font-black text-slate-800">
                Annual Gross 1099 Revenue
              </label>
              <p className="text-xs text-slate-500">Total client billings before any deductions.</p>
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={grossIncome || ""}
                  onChange={(e) => setGrossIncome(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-4 font-black text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                  placeholder="85000"
                />
              </div>
            </div>

            {/* DEDUCTIBLE EXPENSES */}
            <div>
              <label className="text-sm font-black text-slate-800">
                Deductible Business Expenses
              </label>
              <p className="text-xs text-slate-500">Software, hardware, home office, hosting, subscriptions.</p>
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={expenses || ""}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-4 font-black text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                  placeholder="8000"
                />
              </div>
            </div>

            {/* FILING STATUS + STATE TAX */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-black text-slate-800">Filing Status</label>
                <div className="mt-2 flex rounded-xl border border-slate-200 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setFilingStatus("single")}
                    className={`w-1/2 rounded-lg py-2 text-xs font-bold transition ${
                      filingStatus === "single" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Single
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilingStatus("married")}
                    className={`w-1/2 rounded-lg py-2 text-xs font-bold transition ${
                      filingStatus === "married" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Married
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-black text-slate-800">State Tax Rate</label>
                <div className="relative mt-2">
                  <input
                    type="number"
                    value={stateTaxRate || ""}
                    onChange={(e) => setStateTaxRate(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-4 font-black text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                    placeholder="5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="relative flex flex-col justify-between rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl lg:col-span-5 border border-slate-800">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">
              Estimated Total Tax Due
            </div>
            <div className="mt-2 text-5xl font-black text-white">
              {currency(taxCalculations.totalTaxLiability)}
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-black text-blue-300 border border-blue-500/20">
              Effective Tax Rate: {taxCalculations.effectiveTaxRate.toFixed(1)}%
            </div>

            {/* TAX BREAKDOWN */}
            <div className="mt-8 space-y-3 border-t border-slate-800 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">15.3% Self-Employment Tax</span>
                <span className="font-bold text-white">{currency(taxCalculations.totalSETax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Est. Federal Income Tax</span>
                <span className="font-bold text-white">{currency(taxCalculations.estimatedFederalTax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Est. State Income Tax</span>
                <span className="font-bold text-white">{currency(taxCalculations.estimatedStateTax)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-slate-800 pt-2 font-black">
                <span className="text-emerald-400">Net Take-Home Cash</span>
                <span className="text-emerald-400">{currency(taxCalculations.netTakeHome)}</span>
              </div>
            </div>
          </div>

          {/* QUARTERLY ESTIMATE CALLOUT */}
          <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-950/40 p-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-300">
              <Calendar className="h-4 w-4 text-blue-400" />
              Quarterly IRS Estimated Payment
            </div>
            <div className="mt-2 text-2xl font-black text-white">
              {currency(taxCalculations.quarterlyPayment)} <span className="text-xs font-medium text-slate-400">/ quarter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}