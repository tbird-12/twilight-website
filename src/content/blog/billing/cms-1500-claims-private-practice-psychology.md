---
title: "CMS-1500 Forms and EHR Billing for Private Practice"
seoTitle: "CMS-1500 Claims for Mental Health Billing KY"
description: "How private practice clinicians in Kentucky use the CMS-1500 form, EHR billing tools, and electronic submission to process insurance claims for mental health services."
seoDescription: "CMS-1500 for mental health billing in Kentucky — SimplePractice, electronic vs paper claims, Anthem paper claim surcharges, and timely filing rules. Insurance and Kentucky Medicaid accepted."
pubDate: 2026-08-31
category: billing
author: "Twilight Psychology Team"
tags: ["billing", "cms-1500", "ehr", "simplepractice", "psychological-testing", "kentucky", "electronic-claims", "mental-health", "therapy", "medication-management"]
draft: false
---

> **Disclaimer:** Billing rules, form requirements, and payer policies change. Verify all details with your billing software vendor, payer, and clearinghouse before submitting claims.


Once a clinician is credentialed and their NPI and taxonomy codes are correctly configured (covered in [the previous post in this series](/blog/billing/who-can-bill-psychological-testing-claims)), the next step is understanding the claim form itself and the tools used to submit it.

Private practice mental health billing — whether for [therapy](/services/therapy/), [psychological evaluations](/services/psychological-evaluations/), or [medication management](/services/medication-management/) — uses a specific claim form called the **CMS-1500**. Most practices today submit that form electronically through an EHR or billing platform rather than mailing paper copies. Medical billers are third-party vendors who often handle electronic submission on behalf of the practice. It is a separate topic, not covered in this series. The differences between electronic and paper submission affect processing speed, cost, and denial rates across all service types.

## CMS-1500 vs. CMS-1450: Which Form Applies to Private Practice?

There are two primary claim forms used in the US healthcare billing system.

### CMS-1500 (Professional Claims)

The **CMS-1500** (also called the HCFA-1500 or 1500 Health Insurance Claim Form) is the standard form for **professional services** billed by individual clinicians, group practices, and outpatient settings. It is the form used by:

- Licensed psychologists and LPAs in private practice
- Therapists and counselors in outpatient settings
- Nurse practitioners and prescribers in outpatient mental health
- Any clinician billing professional (non-facility) claims

For [psychological testing](/services/psychological-evaluations/), [therapy](/services/therapy/), and [medication management](/services/medication-management/) billed at Twilight Psychology, the **CMS-1500 is the correct form**.

### CMS-1450 (UB-04, Institutional Claims)

The **CMS-1450** (also called the UB-04) is used for **institutional claims** — hospitals, inpatient facilities, skilled nursing facilities, outpatient hospital departments, and certain community mental health centers.

A private practice psychologist in an outpatient office setting will almost never submit a CMS-1450. If you are seeing this form referenced in your billing workflow, confirm that it applies to your specific practice setting before using it.

## Key Fields on the CMS-1500 for Mental Health Claims

Understanding a few specific boxes on the CMS-1500 helps when reviewing claims or troubleshooting denials. The notes below apply to mental health services broadly — psychological testing, therapy, and medication management — with details specific to testing where noted.

| Box | Field | Notes for Mental Health Claims |
|---|---|---|
| **1** | Insurance type | Medicare, Medicaid, commercial, CHAMPVA, etc. |
| **1a** | Insured's ID number | The member ID exactly as it appears on the card |
| **2** | Patient name | Last, First, MI — must match payer records |
| **21** | Diagnosis codes | ICD-10 codes — must support medical necessity for the CPT codes billed |
| **24D** | CPT codes | The procedure codes for each service line |
| **24F** | Charge amount | Billed charges (not the expected reimbursement) |
| **24I** | Qualifier | Taxonomy code qualifier (ZZ) |
| **24J** | Rendering provider NPI | The NPI-1 of the clinician who performed the service |
| **31** | Signature of physician | Provider or authorized representative signature |
| **33** | Billing provider info | Group NPI-2 and address |
| **33a** | Group NPI | NPI-2 of the billing entity |

For psychological testing, Box 21 is particularly important — the diagnosis codes listed must clinically justify the specific testing administered. For therapy and medication management, the same logic applies: the documented diagnosis must support the CPT codes billed.

## Using an EHR for Claim Submission: SimplePractice

At Twilight Psychology, insurance claims are submitted through **SimplePractice**, a cloud-based EHR and practice management platform designed for behavioral health providers. Using an EHR for billing offers several practical advantages over manual CMS-1500 preparation.

### What SimplePractice Handles Automatically

- Populates claim fields from client profile data (name, DOB, member ID, group number)
- Applies provider NPI and taxonomy codes from the provider profile
- Submits claims electronically through a clearinghouse connection
- Tracks claim status and surfaces denials for follow-up
- Maintains a billing history for each client

### The Cost Trade-off

SimplePractice (and similar platforms) charges a monthly subscription fee plus a per-claim or clearinghouse transaction fee, depending on the plan tier. For most practices with a steady claims volume, this cost is outweighed by the time saved in manual data entry and the faster turnaround from electronic submission.

The alternative — manually completing paper CMS-1500 forms and mailing them — is slower, error-prone, and increasingly penalized by payers.

### What the EHR Cannot Do for You

The EHR automates data transfer but does not validate medical necessity, choose the right CPT codes, or verify that documentation supports the services billed. Those responsibilities remain with the clinician and billing staff. The EHR is a submission tool, not a compliance check — for [therapy](/services/therapy/), [testing](/services/psychological-evaluations/), and [medication management](/services/medication-management/) alike.

## Electronic vs. Paper Claim Submission

Most payers now strongly prefer or require electronic claim submission. The practical differences matter for private practice billing.

### Electronic Claims (Recommended)

- **Faster processing:** Electronic claims are typically adjudicated in 7–14 business days for most commercial payers; Medicare and Medicaid are often faster
- **Acknowledgment receipts:** The clearinghouse confirms receipt within 24–48 hours, giving the practice confirmation that the claim was accepted into the adjudication queue
- **Lower denial rates:** Automated field-level validation catches many formatting errors before the claim reaches the payer
- **No postage or handling costs**
- **No paper storage requirement for submitted claims**

### Paper Claims (Use When Electronic Is Not Available)

Some payers still accept paper CMS-1500 forms, but paper is becoming less common. When paper submission is necessary:

- Mail to the address on the patient's insurance card (or the provider relations address for institutional payers)
- Keep a copy of every submitted claim
- Paper claims typically take **30–45 business days** to process
- Some payers impose additional fees for paper submissions

### Anthem Paper Claim Surcharge

**Anthem Blue Cross Blue Shield** charges a **paper claim processing fee** to providers who submit paper CMS-1500 claims instead of filing electronically. This fee is deducted from the reimbursement on the paper claim. The surcharge is a strong financial incentive to submit all Anthem claims electronically.

Check your Anthem participation agreement or call Anthem provider relations for the current surcharge amount, as rates can change.

## Clearinghouses: The Intermediary Between EHR and Payer

Most practices do not submit claims directly to each payer's system. Instead, claims go through a **clearinghouse** — a third-party service that validates the claim format, routes it to the correct payer, and returns status updates.

At Twilight Psychology, claims are routed through **Availity**, one of the most widely used clearinghouses in behavioral health billing.

### What a Clearinghouse Does

1. **Validation:** Checks that required fields are populated, NPI numbers are formatted correctly, and the claim meets HIPAA transaction standards (ANSI X12 837P for professional claims)
2. **Routing:** Directs the claim to the appropriate payer using the payer's enrollment ID
3. **Status tracking:** Returns acknowledgments, rejections, and ERA (Electronic Remittance Advice) files when the payer processes the claim
4. **ERA delivery:** The 835 ERA file is what populates the payment posting in the EHR when a claim is paid or denied

Clearinghouse fees are typically per-transaction (per claim submitted). Some EHR platforms bundle clearinghouse fees into their subscription; others charge separately.

### Clearinghouse Rejections vs. Payer Denials

A **rejection** from the clearinghouse means the claim had a formatting error and was never sent to the payer. The claim needs to be corrected and resubmitted.

A **denial** from the payer means the claim was received and adjudicated but payment was refused. Denials require a different response — typically an appeal or corrected claim — and are covered in detail in [the denials and appeals post later in this series](/blog/billing/claim-denials-appeals-psychological-testing).

## Fax Submission

Fax submission is a third option for some payers, most commonly for medical records attachments, appeals, and corrected claims rather than initial claim submission. Fax is rarely a recommended route for primary claim submission today. It is slower than electronic filing, provides no acknowledgment receipt comparable to an ERA, and increases the risk of the claim not being received.

Some secondary insurance claims or coordination of benefits situations may require paper or fax submission when the secondary payer does not accept electronic COB transactions. That scenario is covered in a later post in this series.

## Timely Filing Requirements

One of the more consequential deadlines in claims billing is the **timely filing limit** — the maximum number of days after the date of service within which a claim must be submitted to be eligible for payment. Claims submitted after the timely filing deadline are almost always denied, and timely filing denials are rarely appealable because they are not clinical or coverage disputes.

Common timely filing windows:

| Payer type | Typical timely filing limit |
|---|---|
| **Medicare** | 12 months from date of service |
| **Kentucky Medicaid (KY Medicaid FFS)** | 12 months from date of service |
| **Medicaid managed care (e.g., Aetna Better Health, Humana Healthy Horizons)** | Varies — often 365 days; check contract |
| **Commercial insurance** | Varies — often 90–180 days; check contract |
| **TRICARE** | 12 months for most situations |

For complex evaluations with multiple service dates, confirm the timely filing clock starts at the **date of service**, not the date the evaluation was completed or the report was written. Psychological testing is sometimes billed in stages across multiple dates of service; each date has its own timely filing window. The same principle applies to therapy and medication management: each session date has its own clock.

Track claim submission dates in your EHR or billing system. If a claim is submitted and rejected (not denied) by the clearinghouse, the original submission date may not count as timely filing — the corrected and resubmitted claim date is what the payer will use.

## Related Resources

- [Who Can Bill Mental Health Insurance Claims](/blog/billing/who-can-bill-psychological-testing-claims) — Previous in this series: NPI numbers, credentialing, and taxonomy codes
- [Where to Submit Mental Health Insurance Claims](/blog/billing/where-to-submit-mental-health-claims) — Next in this series: payer portals, clearinghouses, and submission options
- [Common CPT Codes Used in Psychological Testing](/blog/billing/common-cpt-codes-used-in-psychological-testing) — The testing and interpretation codes explained
- [CPT Codes Used in Therapy Billing](/blog/billing/cpt-codes-therapy-services) — Therapy-specific codes for reference
- [CPT Codes Used in Medication Management Billing](/blog/billing/cpt-codes-medication-management) — E/M codes and psychiatric add-ons
- [Understanding Your Explanation of Benefits (EOB)](/blog/billing/understanding-your-eob) — How to read what the insurance company sends back after adjudication
