import { describe, expect, it } from "vitest";
import { SELF_PAY_RATES } from "../../src/data/selfPayRates";

describe("SELF_PAY_RATES", () => {
  it("exposes all four major self-pay rates", () => {
    expect(SELF_PAY_RATES.therapy).toBe("$100");
    expect(SELF_PAY_RATES.intake).toBe("$250");
    expect(SELF_PAY_RATES.psychologicalEvaluation).toBe("$1,300");
    expect(SELF_PAY_RATES.psychoeducationalEvaluation).toBe("$1,500");
  });

  it("has all rates formatted as dollar strings", () => {
    for (const [key, value] of Object.entries(SELF_PAY_RATES)) {
      expect(value).toMatch(/^\$[\d,]+$/);
    }
  });
});
