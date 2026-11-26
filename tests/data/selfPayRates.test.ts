import { describe, expect, it } from "vitest";
import { SELF_PAY_RATES } from "../../src/data/selfPayRates";

describe("SELF_PAY_RATES", () => {
  it("exposes all four major self-pay rates", () => {
    expect(SELF_PAY_RATES.therapy).toBe("$120");
    expect(SELF_PAY_RATES.therapy_45).toBe("$120");
    expect(SELF_PAY_RATES.intake).toBe("$250");
    expect(SELF_PAY_RATES.psychologicalEvaluation).toBe("$1,500");
    expect(SELF_PAY_RATES.psychoeducationalEvaluation).toBe("$1,900");
  });

  it("exposes couples counseling and intensive session rates", () => {
    expect(SELF_PAY_RATES.couplesCounseling).toBe("$120");
    expect(SELF_PAY_RATES.intensive90).toBe("$150");
  });

  it("has all rates formatted as dollar strings", () => {
    for (const value of Object.values(SELF_PAY_RATES)) {
      expect(value).toMatch(/^\$[\d,]+$/);
    }
  });
});
