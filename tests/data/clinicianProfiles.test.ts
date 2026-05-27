import { describe, expect, it } from "vitest";
import {
  clinicianProfiles,
  getClinicianPageData,
} from "../../src/data/clinicianProfiles";

describe("clinician profile data", () => {
  it("is non-empty", () => {
    expect(clinicianProfiles.length).toBeGreaterThan(0);
  });

  it("includes required page metadata for every clinician", () => {
    for (const profile of clinicianProfiles) {
      expect(profile.slug).toMatch(/^[a-z0-9-]+$/);
      expect(profile.pageTitle).toBeTruthy();
      expect(profile.pageDescription).toBeTruthy();
      expect(profile.jobTitle).toBeTruthy();
      expect(profile.badge).toBeTruthy();
      expect(profile.headingPrimary).toBeTruthy();
      expect(profile.headingAccent).toBeTruthy();
    }
  });

  it("resolves every clinician profile to a provider", () => {
    for (const profile of clinicianProfiles) {
      const pageData = getClinicianPageData(profile.slug);

      expect(pageData).toBeDefined();
      expect(pageData?.provider.slug).toBe(profile.slug);
      expect(pageData?.provider.name).toBeTruthy();
    }
  });

  it("Cornett profile reflects PsyPact nationwide coverage", () => {
    const profile = clinicianProfiles.find((p) => p.slug === "heather-cornett");
    expect(profile).toBeDefined();
    const combined = `${profile!.pageTitle} ${profile!.pageDescription}`.toLowerCase();
    expect(combined).toContain("psypact");
    expect(combined).toMatch(/40\+|40 \+|forty/);
  });

  it("Burns profile reflects Tennessee dual licensure", () => {
    const profile = clinicianProfiles.find((p) => p.slug === "michael-burns");
    expect(profile).toBeDefined();
    const combined = `${profile!.pageTitle} ${profile!.pageDescription}`.toLowerCase();
    expect(combined).toContain("tennessee");
  });

  it("Boggs profile reflects Ohio dual licensure", () => {
    const profile = clinicianProfiles.find((p) => p.slug === "jatana-boggs");
    expect(profile).toBeDefined();
    const combined = `${profile!.pageTitle} ${profile!.pageDescription}`.toLowerCase();
    expect(combined).toContain("ohio");
  });

  it("provider states_served aligns with clinician profile coverage claims", () => {
    const cornett = getClinicianPageData("heather-cornett");
    expect(cornett?.provider.states_served.some((s) => /psypact/i.test(s))).toBe(true);

    const burns = getClinicianPageData("michael-burns");
    expect(burns?.provider.states_served).toContain("Tennessee");

    const boggs = getClinicianPageData("jatana-boggs");
    expect(boggs?.provider.states_served).toContain("Ohio");
  });
});
