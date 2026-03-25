import { describe, it, expect } from "vitest";
import {
  aboutMenuItems,
  clientResourcesMenuItems,
  servicesMenuItems,
  specialtiesMenuItems,
} from "../../src/data/navigationData";

describe("navigation data", () => {
  it("aboutMenuItems is non-empty", () => {
    expect(aboutMenuItems.length).toBeGreaterThan(0);
  });

  it("every about menu item has name and slug", () => {
    for (const item of aboutMenuItems) {
      expect(item.name).toBeTruthy();
      expect(item.slug).toBeTruthy();
    }
  });

  it("clientResourcesMenuItems is non-empty", () => {
    expect(clientResourcesMenuItems.length).toBeGreaterThan(0);
  });

  it("every client resource item has name, slug, and desc", () => {
    for (const item of clientResourcesMenuItems) {
      expect(item.name).toBeTruthy();
      expect(item.slug).toBeTruthy();
      expect(item.desc).toBeTruthy();
    }
  });

  it("servicesMenuItems and specialtiesMenuItems are non-empty", () => {
    expect(servicesMenuItems.length).toBeGreaterThan(0);
    expect(specialtiesMenuItems.length).toBeGreaterThan(0);
  });
});
