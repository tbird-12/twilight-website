/** Global self-pay rates for Twilight Psychology services */

export const SELF_PAY_RATES = {
  therapy: "$100",
  intake: "$250",
  psychologicalEvaluation: "$1,300",
  psychoeducationalEvaluation: "$1,500",
} as const;

export type SelfPayRateKey = keyof typeof SELF_PAY_RATES;
