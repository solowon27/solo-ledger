export interface RateInputs {
  targetNetIncome: number;
  annualExpenses: number;
  billableHoursPerWeek: number;
  vacationWeeks: number;
  taxRate: number;
}

export interface RateCalculationOptions {
  /**
   * Relative local-market pricing adjustment.
   *
   * 100 = baseline.
   * 110 = 10% higher.
   * 90 = 10% lower.
   *
   * This does NOT change the tax calculation.
   */
  costOfLivingIndex?: number;

  /**
   * Whether the local-market adjustment should affect
   * the recommended rate.
   *
   * Defaults to true.
   */
  applyCostOfLivingAdjustment?: boolean;
}

export interface RateResult {
  minHourlyRate: number;
  recommendedHourlyRate: number;
  dayRate: number;

  annualGrossTarget: number;
  totalAnnualBillableHours: number;

  monthlyTakeHome: number;
  estimatedAnnualTaxes: number;
  monthlyGrossTarget: number;
  weeklyGrossTarget: number;

  recommendedMonthlyRevenue: number;
  recommendedAnnualRevenue: number;

  annualSafetyMargin: number;

  billableUtilization: number;
  workingWeeks: number;

  weeklyTakeHome: number;

  /**
   * Local-market pricing adjustment.
   */
  costOfLivingAdjustment: number;
}

function roundUp(value: number): number {
  return Math.ceil(Math.max(0, value));
}

function roundNearest(value: number): number {
  return Math.round(Math.max(0, value));
}

function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(Math.max(value, min), max);
}

export function computeFreelanceRate(
  inputs: RateInputs,
  options: RateCalculationOptions = {}
): RateResult {
  const targetNetIncome = Math.max(
    0,
    inputs.targetNetIncome
  );

  const annualExpenses = Math.max(
    0,
    inputs.annualExpenses
  );

  const billableHoursPerWeek = clamp(
    Number(inputs.billableHoursPerWeek) || 0,
    0,
    168
  );

  const vacationWeeks = clamp(
    Number(inputs.vacationWeeks) || 0,
    0,
    51
  );

  const taxRate = clamp(
    Number(inputs.taxRate) || 0,
    0,
    95
  );

  const workingWeeks = Math.max(
    1,
    52 - vacationWeeks
  );

  const totalAnnualBillableHours =
    workingWeeks * billableHoursPerWeek;

  const taxableBase =
    targetNetIncome + annualExpenses;

  const taxMultiplier =
    1 - taxRate / 100;

  const grossNeeded =
    taxMultiplier > 0
      ? taxableBase / taxMultiplier
      : taxableBase;

  const rawHourly =
    totalAnnualBillableHours > 0
      ? grossNeeded / totalAnnualBillableHours
      : 0;

  const minHourlyRate = roundUp(rawHourly);

  /**
   * Base safety margin.
   */
 const safetyMultiplier = 1.2;

const safetyAdjustedRate =
  minHourlyRate * safetyMultiplier;

// Local market adjustment
const rawCostOfLivingIndex =
  Number(options.costOfLivingIndex) || 100;

const costOfLivingIndex = clamp(
  rawCostOfLivingIndex,
  50,
  200
);

const applyCostOfLivingAdjustment =
  options.applyCostOfLivingAdjustment ?? true;

const costOfLivingAdjustment =
  applyCostOfLivingAdjustment
    ? costOfLivingIndex / 100
    : 1;

// Recommended rate after local-market adjustment
const recommendedHourlyRate = roundUp(
  safetyAdjustedRate * costOfLivingAdjustment
);

// Revenue based on final recommended rate
const recommendedAnnualRevenue = roundNearest(
  recommendedHourlyRate * totalAnnualBillableHours
);

// Safety margin BEFORE local-market adjustment
const safetyAnnualRevenue = roundNearest(
  safetyAdjustedRate * totalAnnualBillableHours
);

const annualSafetyMargin = Math.max(
  0,
  safetyAnnualRevenue -
    roundNearest(grossNeeded)
);

  const dayRate = roundUp(
    recommendedHourlyRate * 8
  );

  const monthlyGrossTarget = roundNearest(
    grossNeeded / 12
  );

  const weeklyGrossTarget = roundNearest(
    grossNeeded / workingWeeks
  );

  const recommendedMonthlyRevenue =
    roundNearest(
      recommendedAnnualRevenue / 12
    );

  const monthlyTakeHome = roundNearest(
    targetNetIncome / 12
  );

  const weeklyTakeHome = roundNearest(
    targetNetIncome / workingWeeks
  );

  const estimatedAnnualTaxes =
    roundNearest(
      grossNeeded * (taxRate / 100)
    );

  const billableUtilization =
    roundNearest(
      (billableHoursPerWeek / 40) * 100
    );

  return {
    minHourlyRate,
    recommendedHourlyRate,
    dayRate,

    annualGrossTarget:
      roundNearest(grossNeeded),

    totalAnnualBillableHours,

    monthlyTakeHome,
    estimatedAnnualTaxes,
    monthlyGrossTarget,
    weeklyGrossTarget,

    recommendedMonthlyRevenue,
    recommendedAnnualRevenue,

    annualSafetyMargin,

    billableUtilization,
    workingWeeks,

    weeklyTakeHome,

    costOfLivingAdjustment,
  };
}