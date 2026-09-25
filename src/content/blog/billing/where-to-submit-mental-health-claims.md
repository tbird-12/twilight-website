---
title: "Where to Submit Mental Health Insurance Claims"
seoTitle: "Submitting Mental Health Claims in KY"
description: "A guide to payer portals, clearinghouses, and submission channels for mental health insurance claims in Kentucky — including free portal options and timely filing tips."
seoDescription: "Free payer portals, Availity clearinghouse, and submission options for mental health insurance claims in Kentucky — therapy, testing, and medication management. Insurance and Kentucky Medicaid accepted."
pubDate: 2026-09-02
category: billing
author: "Twilight Psychology Team"
tags: ["billing", "claims-submission", "availity", "medicaid", "kentucky", "payer-portals", "psychological-testing", "mental-health", "therapy", "medication-management"]
draft: false
---

> **Disclaimer:** Portal addresses, fee structures, and submission requirements can change. Verify current details with each payer's provider relations team before selecting a submission channel.


After a claim is prepared — provider NPI and taxonomy confirmed, CMS-1500 fields populated, diagnosis and CPT codes selected — the next decision is **where and how to submit it**. In Kentucky behavioral health practice, there are three main channels: direct payer portals, a clearinghouse, and paper or fax submission. Each has trade-offs in cost, speed, and administrative overhead.

This applies whether you are submitting claims for [therapy](/services/therapy/), [psychological testing](/services/psychological-evaluations/), [medication management](/services/medication-management/), or [telehealth](/services/telehealth/) services. The submission mechanics are the same; what varies is the payer-specific enrollment, the timely filing windows, and whether a particular payer requires direct portal submission for certain service types.

This is the third post in our series on billing for mental health services.

## Direct Payer Portals (Usually Free)

Several major payers offer free provider portals where claims can be submitted directly without going through a clearinghouse. These portals are particularly useful for:

- Single-claim submissions or resubmissions after a denial
- Checking claim status in real time
- Downloading remittance advice (ERAs) directly
- Submitting secondary claims when the primary payer's COB data needs to be attached

### Free Portals Commonly Used in Kentucky Behavioral Health

| Payer | Portal | Notes |
|---|---|---|
| **UnitedHealthcare (UHC)** | UHCprovider.com | Free claim submission, status, and EOB lookup |
| **Humana** | Availity | Free portal; covers commercial and Humana Healthy Horizons Medicaid |
| **TRICARE** | Tricare.mil or via Humana Military Health Administrators | Free for providers; use the correct regional contractor |
| **Medicare** | Availity (MAC-specific) or CGS (for KY Part B) | Submit through the Medicare Administrative Contractor for Kentucky |
| **Kentucky Medicaid FFS (KY FFS)** | kymmis.com | Free; used for fee-for-service Medicaid claims outside managed care plans |
| **Aetna Better Health of Kentucky** | Portal via Aetna or Availity | Aetna Better Health is the Medicaid managed care plan for KY; pre-auth required for testing |
| **Anthem BCBS (commercial)** | Availity | Anthem strongly prefers electronic submission; paper claims incur a surcharge |

Using a free portal directly reduces per-claim clearinghouse transaction fees. The trade-off is that portal submission is typically a manual, per-claim process, while clearinghouse submission from your EHR is more efficient for high claim volume.

### When to Use a Portal Instead of a Clearinghouse

- Resubmitting a corrected claim that was denied (the portal may be faster than waiting for the clearinghouse cycle)
- Checking status on a specific claim when the clearinghouse ERA is delayed
- Submitting attachments or medical records that accompany a claim (most portals have a document upload function)
- Secondary claim submission when the primary EOB needs to be attached electronically

## Clearinghouses (Availity)

We recommend that claims not submitted through a direct portal are routed through **Availity**, the clearinghouse integrated with SimplePractice. Availity connects to the majority of commercial payers and Medicaid managed care plans used in Kentucky.

### How Availity Fits into the Workflow

1. Claims are prepared and submitted from SimplePractice (the EHR)
2. SimplePractice sends the claim batch to Availity in the ANSI X12 837P format
3. Availity validates the format and routes the claim to the correct payer
4. Acknowledgments (999 and 277CA files) are returned to confirm receipt or surface formatting errors
5. When the payer adjudicates the claim, the ERA (835 file) is returned through Availity and posted back into SimplePractice

This automated loop reduces manual status-checking and speeds up payment posting. The per-transaction clearinghouse fee is typically bundled into the SimplePractice subscription or charged at a low per-claim rate.

### Clearinghouse vs. Portal: Choosing the Right Channel

| Scenario | Recommended channel |
|---|---|
| Routine new claim for established patient | Clearinghouse (automated, efficient) |
| Corrected claim after a denial | Payer portal (faster, direct) |
| Status check on a specific claim | Payer portal |
| Medical records attachment required | Payer portal (upload function) |
| Secondary claim with COB | Payer portal or paper/fax if portal doesn't support COB |
| KY Medicaid FFS claim | kyanets.ky.gov directly (free) |

## Fax Submission

Fax is rarely used for primary claim submission. It is slower than electronic filing, provides no acknowledgment receipt, and creates a manual handling burden on both the provider and payer sides.

Fax submission may be necessary in specific situations:
- A payer that has not yet activated electronic claim enrollment for your NPI
- Appeals documentation that must accompany a reconsideration request
- Records requests where the payer's portal does not support document uploads
- Certain secondary claim situations where the primary EOB is only available as a paper document

When submitting via fax, keep a fax confirmation sheet and a copy of everything transmitted. Fax submission does not create the same audit trail as an electronic ERA.

## Secondary Insurance and Coordination of Benefits (COB)

When a client has both primary and secondary insurance, the claim must first be submitted to the **primary payer**. After the primary payer adjudicates the claim and sends an EOB or ERA, the **secondary claim** can be submitted.

The secondary claim must include the primary payer's:
- Payment amount
- Adjustment reason codes
- Patient responsibility amounts (deductible, copay, coinsurance)

This information is typically embedded in the electronic 835 ERA file, which most payers can transmit electronically as part of the secondary claim (this is called **electronic COB** or crossover claims for Medicare/Medicaid).

### Medicare Crossover Claims

For clients who have Medicare as primary and Medicaid as secondary, Medicare will often **automatically forward the claim** to the state Medicaid program after adjudication — this is the Medicare-Medicaid crossover claim process. You do not need to re-submit these manually if crossover is enabled for the client.

Verify that the client's Medicaid ID is associated with their Medicare records. If the crossover does not happen automatically, a paper secondary claim to KY Medicaid FFS may be required.

### When Secondary Insurance Changes the Billing Approach

In some cases, primary and secondary insurance together cover the full patient responsibility. In others, the secondary payer has its own deductibles, plan rules, or claim requirements. Always confirm the client's coordination of benefits arrangement during the eligibility verification step — not after the claim is already denied.

Eligibility verification and COB determination are covered in detail in [the next post in this series](/blog/insurance/verifying-insurance-eligibility-psychological-testing).

## Timely Filing by Payer Type

Every claim must be submitted within the payer's **timely filing window** — the maximum days from the date of service by which the claim must arrive. Missing the timely filing deadline results in a denial that is almost never overturned, even on appeal.

| Payer type | Common timely filing limit |
|---|---|
| Medicare | 12 months from date of service |
| Kentucky Medicaid FFS | 12 months from date of service |
| Medicaid managed care (Aetna Better Health, Humana Healthy Horizons, WellCare, Ambetter) | 365 days; check your provider agreement |
| TRICARE | 12 months from date of service |
| Commercial (Anthem, UHC, Cigna, Aetna) | 90–180 days; check your provider agreement |

**Practical tip:** Do not assume commercial managed care plans follow the same 12-month rule as Medicare. Many commercial plans have 90-day or 180-day windows. If your EHR does not flag aging claims automatically, set a manual tickler system for any claim older than 60 days that hasn't been adjudicated.

For psychological testing specifically, claims are sometimes delayed because:
- Pre-authorization was pending when the service occurred
- The evaluation spans multiple dates of service
- The feedback session is billed on a different date than testing administration

Each service date has its own timely filing clock. Track each claim separately if the evaluation involves multiple dates.

## Anthem and Paper Claim Surcharges (A Real Cost to Monitor)

As noted in the previous post, **Anthem Blue Cross Blue Shield** assesses a **paper claim processing fee** that is deducted from the reimbursement on any paper CMS-1500 submission. For a practice that sees even a moderate number of Anthem patients, paper submission is a direct reduction in net reimbursement.

Always submit Anthem claims electronically via Availity or the Anthem provider portal. If a corrected Anthem claim needs to go back, use the Availity Anthem channel or the Anthem portal — not paper.

## Setting Up Enrollment for Each Payer

Before a clearinghouse or EHR can submit claims to a specific payer, the practice must complete **payer enrollment** — registering the group NPI-2 and individual NPI-1s with that payer's EDI (Electronic Data Interchange) system. This is a one-time setup step per payer.

Steps for electronic enrollment:
1. Log in to Availity (or your clearinghouse) and request enrollment for the target payer
2. Complete the payer's enrollment form (sometimes called an EDI Trading Partner Agreement)
3. Wait for enrollment confirmation (2–4 weeks for most commercial payers)
4. Test with a small batch of claims before relying on full volume

Some payers auto-enroll when you submit claims through their portal. Others require an explicit enrollment before any electronic claim will be accepted.

## What Comes Next in This Series

With submission channels in place, the critical pre-submission step is **insurance eligibility verification** — confirming that the client is covered by the plan, that the plan will cover the requested mental health services, and that any coordination of benefits is correctly identified before the service is rendered.

The [next post in this series covers insurance eligibility verification](/blog/insurance/verifying-insurance-eligibility-psychological-testing), including methods, COB determination, and why verifying before the date of service protects the practice from write-offs — for evaluations, therapy, and medication management alike.

## Related Resources

- [Who Can Bill Mental Health Insurance Claims](/blog/billing/who-can-bill-psychological-testing-claims) — NPI numbers, credentialing, and taxonomy codes
- [CMS-1500 Forms and EHR Billing for Private Practice](/blog/billing/cms-1500-claims-private-practice-psychology) — The claim form, SimplePractice, and timely filing
- [Verifying Insurance Eligibility for Mental Health Services](/blog/insurance/verifying-insurance-eligibility-psychological-testing) — Next in this series: eligibility, COB, and pre-service verification
- [Common CPT Codes Used in Psychological Testing](/blog/billing/common-cpt-codes-used-in-psychological-testing) — The testing and interpretation codes explained
- [Accepted Insurance Plans](/resources/insurances-accepted) — Insurance and Kentucky Medicaid plans accepted at Twilight Psychology
