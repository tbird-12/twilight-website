import { describe, it, expect } from "vitest";
import { services, specialities } from "../../src/data/services";

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
});

describe("specialities data", () => {
  it("exports a non-empty specialities array", () => {
    expect(specialities.length).toBeGreaterThan(0);
  });

  it("every speciality has name, slug, and desc", () => {
    for (const s of specialities) {
      expect(s.name).toBeTruthy();
      expect(s.slug).toBeTruthy();
      expect(s.desc).toBeTruthy();
    }
  });

  it("speciality slugs are unique", () => {
    const slugs = specialities.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("speciality slugs are URL-safe", () => {
    for (const s of specialities) {
      expect(s.slug).toMatch(/^[a-zA-Z0-9-]+$/);
    }
  });
});
