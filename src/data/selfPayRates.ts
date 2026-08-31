/**
 * Global self-pay rates for Twilight Psychology services.
 *
 * NOTE: A fee schedule update takes effect December 1, 2026.
 * On that date, update to:
 *   therapy: "$120"
 *   psychologicalEvaluation: "$1,500"
 *   psychoeducationalEvaluation: "$1,900"
 * See /blog/announcements/fee-schedule-updates-december-2026 for details.
 */
export const SELF_PAY_RATES = {
  therapy: "$100",
  intake: "$250",
  psychologicalEvaluation: "$1,300",
  psychoeducationalEvaluation: "$1,500",
} as const;

export type SelfPayRateKey = keyof typeof SELF_PAY_RATES;
