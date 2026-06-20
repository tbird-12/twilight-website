import { describe, it, expect } from "vitest";
import { services, specialties } from "../../src/data/services";

describe("services data", () => {
  it("exports a non-empty services array", () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it("every service has name, slug, and desc", () => {
    for (const s of services) {
      expect(s.name).toBeTruthy();
      expect(s.slug).toBeTruthy();
      expect(s.desc).toBeTruthy();
    }
  });

  it("service slugs are unique", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("service slugs are URL-safe", () => {
    for (const s of services) {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("includes a telehealth service entry", () => {
    const telehealth = services.find((s) => s.slug === "telehealth");
    expect(telehealth).toBeDefined();
    expect(telehealth?.name).toBeTruthy();
    expect(telehealth?.desc).toBeTruthy();
  });

  it("includes core clinical service slugs", () => {
    const slugs = new Set(services.map((s) => s.slug));
    expect(slugs.has("therapy")).toBe(true);
    expect(slugs.has("adhd-testing")).toBe(true);
    expect(slugs.has("autism-testing")).toBe(true);
    expect(slugs.has("medication-management")).toBe(true);
    expect(slugs.has("psychological-evaluations")).toBe(true);
  });
});

describe("specialties data", () => {
  it("exports a non-empty specialties array", () => {
    expect(specialties.length).toBeGreaterThan(0);
  });

  it("every specialty has name, slug, and desc", () => {
    for (const s of specialties) {
      expect(s.name).toBeTruthy();
      expect(s.slug).toBeTruthy();
      expect(s.desc).toBeTruthy();
    }
  });

  it("specialty slugs are unique", () => {
    const slugs = specialties.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("specialty slugs are URL-safe", () => {
    for (const s of specialties) {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
