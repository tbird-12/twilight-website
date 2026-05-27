import { describe, it, expect } from "vitest";
import {
  aboutMenuItems,
  allServicesMenuItems,
  clientResourcesMenuItems,
  isNavigationNestedItem,
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

  it("about menu item slugs are URL-safe", () => {
    for (const item of aboutMenuItems) {
      expect(item.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("aboutMenuItems includes service-area entry", () => {
    const serviceArea = aboutMenuItems.find((item) => item.slug === "service-area");
    expect(serviceArea).toBeDefined();
    expect(serviceArea?.name).toBeTruthy();
  });

  it("aboutMenuItems includes locations entry", () => {
    const locations = aboutMenuItems.find((item) => item.slug === "locations");
    expect(locations).toBeDefined();
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

  it("servicesMenuItems is capped at 4 items for the nav dropdown", () => {
    expect(servicesMenuItems.length).toBeLessThanOrEqual(4);
  });

  it("allServicesMenuItems includes more entries than the nav dropdown", () => {
    expect(allServicesMenuItems.length).toBeGreaterThan(servicesMenuItems.length);
  });

  it("telehealth service is not in the nav dropdown but is in allServicesMenuItems", () => {
    const inDropdown = servicesMenuItems.some((item) => item.slug === "telehealth");
    const inAll = allServicesMenuItems.some((item) => item.slug === "telehealth");
    expect(inDropdown).toBe(false);
    expect(inAll).toBe(true);
  });

  it("services menu includes a nested therapy group with child pages", () => {
    const therapyItem = servicesMenuItems
      .filter(isNavigationNestedItem)
      .find((item) => item.slug === "therapy");

    expect(therapyItem).toBeDefined();
    expect(therapyItem?.childLabel).toBe("Therapy Pages");
    expect(therapyItem?.children.length).toBeGreaterThan(1);
  });

  it("nested about menu groups include labeled child links", () => {
    const nestedItems = aboutMenuItems.filter(isNavigationNestedItem);

    expect(nestedItems.length).toBeGreaterThan(0);

    for (const item of nestedItems) {
      expect(item.childLabel).toBeTruthy();
      expect(item.childHrefBase).toMatch(/^\/[a-z-/]+$/);
      expect(item.children.length).toBeGreaterThan(0);

      for (const child of item.children) {
        expect(child.name).toBeTruthy();
        expect(child.slug).toMatch(/^[A-Za-z0-9-/]+$/);
      }
    }
  });
});
