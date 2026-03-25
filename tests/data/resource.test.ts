import { describe, it, expect } from "vitest";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_FORMATTED,
  FAX_NUMBER,
  EMAIL_ADDRESS,
  SIGN_IN_LINK,
  WIDGET_LINK,
  REFERRAL_LINK,
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

  it("all links use HTTPS", () => {
    expect(SIGN_IN_LINK).toMatch(/^https:\/\//);
    expect(WIDGET_LINK).toMatch(/^https:\/\//);
    expect(REFERRAL_LINK).toMatch(/^https:\/\//);
  });
});
