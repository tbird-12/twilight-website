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
});
