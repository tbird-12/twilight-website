import { describe, it, expect } from "vitest";
import { providers } from "../../src/data/staff";

describe("staff provider data", () => {
  it("exports a non-empty providers array", () => {
    expect(providers.length).toBeGreaterThan(0);
  });

  it("every provider has required fields", () => {
    for (const p of providers) {
      expect(p.name).toBeTruthy();
      expect(p.slug).toBeTruthy();
      expect(p.credential).toBeTruthy();
      expect(p.name_with_education).toBeTruthy();
      expect(p.services_offered.length).toBeGreaterThan(0);
      expect(p.states_served.length).toBeGreaterThan(0);
      expect(p.ins.length).toBeGreaterThan(0);
    }
  });

  it("every provider has the new matcher fields", () => {
    for (const p of providers) {
      expect(p.service_categories.length).toBeGreaterThan(0);
      expect(p.age_groups.length).toBeGreaterThan(0);
      expect(p.availability_note).toBeTruthy();
      expect(["open", "waitlist", "closed"]).toContain(p.availability_status);
      expect(p.contact_url).toMatch(/^https?:\/\//);
    }
  });

  it("provider slugs are unique", () => {
    const slugs = providers.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("provider slugs are URL-safe kebab-case", () => {
    for (const p of providers) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("all providers include Kentucky in states_served", () => {
    for (const p of providers) {
      expect(p.states_served).toContain("Kentucky");
    }
  });

  it("Cornett has PsyPact interstate authority", () => {
    const cornett = providers.find((p) => p.slug === "heather-cornett");
    expect(cornett).toBeDefined();
    const hasPsypact = cornett!.states_served.some((s) => /psypact/i.test(s));
    expect(hasPsypact).toBe(true);
  });

  it("Burns is dual-licensed in Tennessee", () => {
    const burns = providers.find((p) => p.slug === "michael-burns");
    expect(burns).toBeDefined();
    expect(burns!.states_served).toContain("Tennessee");
  });

  it("service_categories contain only valid values", () => {
    const valid = new Set(["Therapy", "Psychological Testing", "Medication Management"]);
    for (const p of providers) {
      for (const cat of p.service_categories) {
        expect(valid.has(cat)).toBe(true);
      }
    }
  });

  it("age_groups contain only valid values", () => {
    const valid = new Set(["Child (3–11)", "Teen (12–17)", "Adult (18–64)", "Older Adult (65+)"]);
    for (const p of providers) {
      for (const ag of p.age_groups) {
        expect(valid.has(ag)).toBe(true);
      }
    }
  });
});
