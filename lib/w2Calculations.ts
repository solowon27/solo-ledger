export interface W2Inputs {
  w2Salary: number;            // e.g. 100000
  ptoDays: number;             // e.g. 15 days paid time off
  healthInsuranceValue: number;// Annual employer health contribution (e.g. 6000)
  match401kPercent: number;    // Employer 401(k) match % (e.g. 4)
  annualBusinessExpenses: number; // Software, legal, hardware (e.g. 5000)
  billableHoursPerWeek: number;// Weekly client billable capacity (e.g. 30)
}

export interface W2ComparisonResult {
  equivalent1099HourlyRate: number;
  equivalent1099AnnualGross: number;
  totalBenefitsValue: number;
  additionalTaxBurden: number; // Employer portion of FICA (7.65%)
  workingHoursAnnual: number;
}

export function computeW2vs1099(inputs: W2Inputs): W2ComparisonResult {
  // Total corporate benefits value
  const match401kValue = inputs.w2Salary * (inputs.match401kPercent / 100);
  const totalBenefitsValue = inputs.healthInsuranceValue + match401kValue;

  // Extra FICA tax contractor must pay (7.65% employer share)
  const additionalTaxBurden = inputs.w2Salary * 0.0765;

  // Total compensation target a 1099 contractor must hit
  const equivalent1099AnnualGross =
    inputs.w2Salary + totalBenefitsValue + additionalTaxBurden + inputs.annualBusinessExpenses;

  // Calculate billable capacity
  const vacationWeeks = inputs.ptoDays / 5;
  const workingWeeks = Math.max(1, 52 - vacationWeeks);
  const workingHoursAnnual = workingWeeks * inputs.billableHoursPerWeek;

  const rawHourly = workingHoursAnnual > 0 ? equivalent1099AnnualGross / workingHoursAnnual : 0;
  const equivalent1099HourlyRate = Math.ceil(rawHourly);

  return {
    equivalent1099HourlyRate,
    equivalent1099AnnualGross: Math.round(equivalent1099AnnualGross),
    totalBenefitsValue: Math.round(totalBenefitsValue),
    additionalTaxBurden: Math.round(additionalTaxBurden),
    workingHoursAnnual,
  };
}