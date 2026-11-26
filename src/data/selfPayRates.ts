/**
 * Global self-pay rates for Twilight Psychology services.
 * Effective December 1, 2026.
 */
export const SELF_PAY_RATES = {
  therapy: "$120",
  therapy_45: "$120",
  couplesCounseling: "$120",
  intensive90: "$150",
  intake: "$250",
  mm_followup: "$150",
  psychologicalEvaluation: "$1,500",
  psychoeducationalEvaluation: "$1,900",
} as const;

export type SelfPayRateKey = keyof typeof SELF_PAY_RATES;
