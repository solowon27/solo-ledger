export interface RateInputs {
  targetNetIncome: number;      // Desired take-home cash per year (e.g. 80000)
  annualExpenses: number;       // Software, hardware, health insurance (e.g. 6000)
  billableHoursPerWeek: number; // Actual paid client hours (e.g. 25)
  vacationWeeks: number;        // Weeks off per year (e.g. 4)
  taxRate: number;              // Estimated combined self-employment + income tax % (e.g. 28)
}

export interface RateResult {
  minHourlyRate: number;
  recommendedHourlyRate: number;
  dayRate: number;
  annualGrossTarget: number;
  totalAnnualBillableHours: number;
  monthlyTakeHome: number;
  estimatedAnnualTaxes: number;
}

export function computeFreelanceRate(inputs: RateInputs): RateResult {
  const workingWeeks = Math.max(1, 52 - inputs.vacationWeeks);
  const totalAnnualBillableHours = workingWeeks * inputs.billableHoursPerWeek;

  // Gross needed to cover target net income + overhead + taxes
  const grossNeeded = (inputs.targetNetIncome + inputs.annualExpenses) / (1 - inputs.taxRate / 100);
  
  const rawHourly = totalAnnualBillableHours > 0 ? grossNeeded / totalAnnualBillableHours : 0;
  const minHourlyRate = Math.ceil(rawHourly);
  // Add a 20% safety margin for unpaid client management, admin work, and slow pipeline
  const recommendedHourlyRate = Math.ceil(minHourlyRate * 1.2);
  const dayRate = recommendedHourlyRate * 8;
  const estimatedAnnualTaxes = Math.round(grossNeeded * (inputs.taxRate / 100));

  return {
    minHourlyRate,
    recommendedHourlyRate,
    dayRate,
    annualGrossTarget: Math.round(grossNeeded),
    totalAnnualBillableHours,
    monthlyTakeHome: Math.round(inputs.targetNetIncome / 12),
    estimatedAnnualTaxes,
  };
}