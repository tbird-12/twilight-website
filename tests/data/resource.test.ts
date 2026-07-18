import { describe, it, expect } from "vitest";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_FORMATTED,
  FAX_NUMBER,
  EMAIL_ADDRESS,
  MAIN_OFFICE_STREET_ADDRESS,
  MAIN_OFFICE_STREET_ADDRESS_SCHEMA,
  MAIN_OFFICE_CITY_STATE_ZIP,
  MAIN_OFFICE_ADDRESS_SINGLE_LINE,
  MAIN_OFFICE_MAP_LINK,
  SIGN_IN_LINK,
  WIDGET_LINK,
  REFERRAL_LINK,
  SELF_PAY_REPORT_TURNAROUND_DAYS,
  SELF_PAY_WAITLIST_WEEKS,
} from "../../src/data/resource";

describe("resource constants", () => {
  it("phone number starts with +1", () => {
    expect(PHONE_NUMBER).toMatch(/^\+1\d{10}$/);
  });

  it("formatted phone number is in (xxx) xxx-xxxx format", () => {
    expect(PHONE_NUMBER_FORMATTED).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
  });

  it("fax number starts with +1", () => {
    expect(FAX_NUMBER).toMatch(/^\+1\d{10}$/);
  });

  it("email address is valid format", () => {
    expect(EMAIL_ADDRESS).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("main office address constants stay in sync", () => {
    expect(MAIN_OFFICE_STREET_ADDRESS).toContain("Darby Creek Rd");
    expect(MAIN_OFFICE_STREET_ADDRESS_SCHEMA).toContain("Darby Creek Rd");
    expect(MAIN_OFFICE_ADDRESS_SINGLE_LINE).toBe(`${MAIN_OFFICE_STREET_ADDRESS}, ${MAIN_OFFICE_CITY_STATE_ZIP}`);
  });

  it("all links use HTTPS", () => {
    expect(MAIN_OFFICE_MAP_LINK).toMatch(/^https:\/\//);
    expect(SIGN_IN_LINK).toMatch(/^https:\/\//);
    expect(WIDGET_LINK).toMatch(/^https:\/\//);
    // REFERRAL_LINK can be a relative path to a local document
    expect(REFERRAL_LINK).toBeTruthy();
  });

  it("self-pay benchmarks are positive integers", () => {
    expect(SELF_PAY_REPORT_TURNAROUND_DAYS).toBe(7);
    expect(SELF_PAY_WAITLIST_WEEKS).toBe(3);
  });
});
