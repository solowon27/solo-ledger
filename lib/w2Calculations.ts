export interface W2Inputs {
  w2Salary: number;
  ptoDays: number;
  healthInsuranceValue: number;
  match401kPercent: number;
  annualBusinessExpenses: number;
  billableHoursPerWeek: number;
}

export interface W2ComparisonResult {
  equivalent1099HourlyRate: number;
  equivalent1099AnnualGross: number;
  totalBenefitsValue: number;
  additionalTaxBurden: number;
  workingHoursAnnual: number;

  // Additional breakdown values for the UI
  ptoValue: number;
  retirementMatchValue: number;
  healthInsuranceValue: number;
  businessExpenses: number;
  baseSalary: number;
  employeeHourlyEquivalent: number;
  contractorPremium: number;
}

const clamp = (
  value: number,
  min: number,
  max: number,
) => {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
};

export function computeW2vs1099(
  inputs: W2Inputs,
): W2ComparisonResult {
  /*
   * ------------------------------------------------------------
   * Normalize inputs
   * ------------------------------------------------------------
   *
   * This prevents invalid values from producing broken results.
   */

  const salary = Math.max(
    0,
    Number(inputs.w2Salary) || 0,
  );

  const ptoDays = clamp(
    Number(inputs.ptoDays) || 0,
    0,
    365,
  );

  const healthInsuranceValue = Math.max(
    0,
    Number(inputs.healthInsuranceValue) || 0,
  );

  const match401kPercent = clamp(
    Number(inputs.match401kPercent) || 0,
    0,
    100,
  );

  const businessExpenses = Math.max(
    0,
    Number(inputs.annualBusinessExpenses) || 0,
  );

  const billableHoursPerWeek = clamp(
    Number(inputs.billableHoursPerWeek) || 0,
    0,
    168,
  );

  /*
   * ------------------------------------------------------------
   * 1. Employer 401(k) match
   * ------------------------------------------------------------
   */

  const retirementMatchValue =
    salary * (match401kPercent / 100);

  /*
   * ------------------------------------------------------------
   * 2. Health insurance
   * ------------------------------------------------------------
   */

  const healthValue = healthInsuranceValue;

  /*
   * ------------------------------------------------------------
   * 3. PTO value
   * ------------------------------------------------------------
   *
   * Approximate value of paid time off using a standard
   * 260-workday year.
   *
   * Example:
   *
   * $100,000 salary / 260 workdays
   * = ~$384.62 per PTO day
   */

  const dailySalaryValue =
    salary / 260;

  const ptoValue =
    dailySalaryValue * ptoDays;

  /*
   * ------------------------------------------------------------
   * 4. Employer FICA contribution
   * ------------------------------------------------------------
   *
   * A W-2 employer generally pays the employer share of
   * Social Security + Medicare.
   *
   * 6.2% Social Security
   * + 1.45% Medicare
   * = 7.65%
   *
   * This model uses 7.65% as an estimate.
   */

  const additionalTaxBurden =
    salary * 0.0765;

  /*
   * ------------------------------------------------------------
   * 5. Total W-2 benefits value
   * ------------------------------------------------------------
   */

  const totalBenefitsValue =
    healthValue +
    retirementMatchValue +
    ptoValue;

  /*
   * ------------------------------------------------------------
   * 6. Contractor compensation target
   * ------------------------------------------------------------
   *
   * The contractor needs enough revenue to replace:
   *
   * - salary
   * - health insurance
   * - retirement contribution
   * - PTO
   * - employer payroll-tax contribution
   * - business expenses
   */

  const equivalent1099AnnualGross =
    salary +
    totalBenefitsValue +
    additionalTaxBurden +
    businessExpenses;

  /*
   * ------------------------------------------------------------
   * 7. Determine annual billable hours
   * ------------------------------------------------------------
   *
   * PTO days are converted into work weeks using a
   * five-day work week.
   */

  const vacationWeeks =
    ptoDays / 5;

  const workingWeeks =
    Math.max(
      1,
      52 - vacationWeeks,
    );

  const workingHoursAnnual =
    workingWeeks *
    billableHoursPerWeek;

  /*
   * ------------------------------------------------------------
   * 8. Contractor hourly rate
   * ------------------------------------------------------------
   */

  const rawHourly =
    workingHoursAnnual > 0
      ? equivalent1099AnnualGross /
        workingHoursAnnual
      : 0;

  const equivalent1099HourlyRate =
    Math.ceil(rawHourly);

  /*
   * ------------------------------------------------------------
   * 9. Employee hourly equivalent
   * ------------------------------------------------------------
   *
   * Standard comparison:
   *
   * 52 weeks × 40 hours = 2,080 hours.
   */

  const employeeHourlyEquivalent =
    salary / 2080;

  /*
   * ------------------------------------------------------------
   * 10. Contractor premium
   * ------------------------------------------------------------
   */

  const contractorPremium = Math.max(
    0,
    equivalent1099HourlyRate -
      employeeHourlyEquivalent,
  );

  /*
   * ------------------------------------------------------------
   * Return
   * ------------------------------------------------------------
   */

  return {
    equivalent1099HourlyRate,

    equivalent1099AnnualGross:
      Math.round(
        equivalent1099AnnualGross,
      ),

    totalBenefitsValue:
      Math.round(
        totalBenefitsValue,
      ),

    additionalTaxBurden:
      Math.round(
        additionalTaxBurden,
      ),

    workingHoursAnnual:
      Math.round(
        workingHoursAnnual,
      ),

    ptoValue:
      Math.round(
        ptoValue,
      ),

    retirementMatchValue:
      Math.round(
        retirementMatchValue,
      ),

    healthInsuranceValue:
      Math.round(
        healthValue,
      ),

    businessExpenses:
      Math.round(
        businessExpenses,
      ),

    baseSalary:
      Math.round(
        salary,
      ),

    employeeHourlyEquivalent:
      Math.round(
        employeeHourlyEquivalent * 100,
      ) / 100,

    contractorPremium:
      Math.round(
        contractorPremium * 100,
      ) / 100,
  };
}