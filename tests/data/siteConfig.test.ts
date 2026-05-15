import { describe, expect, it } from "vitest";
import { siteConfig } from "../../src/data/siteConfig";

describe("siteConfig", () => {
  it("exposes stable site metadata for shared SEO components", () => {
    expect(siteConfig.gaId).toMatch(/^G-[A-Z0-9]+$/);
    expect(siteConfig.siteName).toBe("Twilight Psychology");
    expect(siteConfig.blogName).toContain(siteConfig.siteName);
    expect(siteConfig.siteUrl).toMatch(/^https:\/\/www\.twilightpsychology\.com\/?$/);
  });

  it("lists valid social profiles", () => {
    expect(siteConfig.socialProfiles.length).toBeGreaterThan(0);

    const labels = new Set<string>();

    for (const profile of siteConfig.socialProfiles) {
      expect(profile.label).toBeTruthy();
      expect(profile.icon).toBeTruthy();
      expect(profile.href).toMatch(/^https:\/\//);
      labels.add(profile.label);
    }

    expect(labels.size).toBe(siteConfig.socialProfiles.length);
  });
});
