import { describe, it, expect } from "vitest";
import { insuranceProviders } from "../../src/data/insurances";

describe("insurances data", () => {
  it("exports a non-empty providers array", () => {
    expect(insuranceProviders.length).toBeGreaterThan(0);
  });

  it("every provider has a name and fileName", () => {
    for (const p of insuranceProviders) {
      expect(p.name).toBeTruthy();
      expect(p.fileName).toBeTruthy();
    }
  });

  it("fileNames have image extensions", () => {
    for (const p of insuranceProviders) {
      expect(p.fileName).toMatch(/\.(png|jpg|jpeg|svg|webp)$/i);
    }
  });

  it("provider names are unique", () => {
    const names = insuranceProviders.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
