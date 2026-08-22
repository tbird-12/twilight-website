import { useState, useMemo, useCallback } from "react";
import { useReducedMotion } from "../react/hooks/useReducedMotion";

// ---------------------------------------------------------------------------
// Types (serialisable subset — no ImageMetadata crossing the Astro boundary)
// ---------------------------------------------------------------------------

export interface MatcherProvider {
  id: string;
  name: string;
  name_with_education: string;
  credential: string;
  spec: string;
  image_src: string;
  service_categories: string[];
  services_offered: string[];
  out_of_pocket_rates: Record<string, string>;
  states_served: string[];
  ins: string[];
  wait_times: Record<string, string>;
  age_groups: string[];
  availability_note: string;
  availability_status: "open" | "waitlist" | "closed";
  contact_url: string;
}

interface ClinicalMatcherProps {
  providers: MatcherProvider[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const RATE_LABELS: Record<string, string> = {
  therapy: "Therapy",
  testing_standard: "Testing (standard)",
  testing_dyslexia: "Testing (dyslexia)",
  medication_intake: "Intake visit",
  medication_followup: "Follow-up visit",
  esa_evaluation: "ESA letter",
  guardianship_evaluation: "Guardianship eval",
  disability_evaluation: "Disability eval",
  adoption_evaluation: "Adoption eval",
};

const WAIT_LABELS: Record<string, string> = {
  therapy: "Therapy",
  testing_insurance: "Testing (insurance)",
  testing_out_of_pocket: "Testing (self-pay)",
  medication_management: "Medication Mgmt",
};

function availabilityStyles(status: MatcherProvider["availability_status"]) {
  if (status === "open")
    return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700";
  if (status === "waitlist")
    return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700";
  return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700";
}

function availabilityDot(status: MatcherProvider["availability_status"]) {
  if (status === "open") return "bg-emerald-500";
  if (status === "waitlist") return "bg-amber-500";
  return "bg-red-500";
}

function availabilityLabel(status: MatcherProvider["availability_status"]) {
  if (status === "open") return "Accepting clients";
  if (status === "waitlist") return "Waitlist";
  return "Not accepting";
}

// Derive the cheapest self-pay rate string for a quick cost summary
function cheapestRate(rates: Record<string, string>): string | null {
  const values = Object.values(rates);
  if (values.length === 0) return null;
  // Return the first therapy/lowest-visible rate
  return rates.therapy ?? rates.medication_followup ?? values[0] ?? null;
}

// ---------------------------------------------------------------------------
// Filter pill component
// ---------------------------------------------------------------------------

interface PillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterPill({ label, active, onClick }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer ${
        active
          ? "bg-cta text-cta-fg border-cta shadow-sm"
          : "bg-surface text-site-sub border-border hover:border-cta/40 hover:text-site-text"
      }`}
    >
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Clinician card
// ---------------------------------------------------------------------------

interface CardProps {
  provider: MatcherProvider;
  index: number;
  reduced: boolean;
}

function ClinicianCard({ provider, index, reduced }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const aStyle = availabilityStyles(provider.availability_status);
  const aDot = availabilityDot(provider.availability_status);
  const aLabel = availabilityLabel(provider.availability_status);
  const firstRate = cheapestRate(provider.out_of_pocket_rates);
  const rateEntries = Object.entries(provider.out_of_pocket_rates);

  const nameParts = provider.name.split(" ");
  const initials = (nameParts[0]?.[0] ?? "") + (nameParts[nameParts.length - 1]?.[0] ?? "");

  return (
    <article
      className="flex flex-col border border-border rounded-2xl bg-surface overflow-hidden hover:shadow-lg hover:-translate-y-0.5 hover:border-cta/20 transition-all duration-300"
      style={reduced ? undefined : { animation: `blurIn 400ms ease-out both`, animationDelay: `${index * 60}ms` }}
      aria-label={`${provider.name_with_education}, ${provider.credential}`}
    >
      {/* ── Availability banner ── */}
      <div className={`flex items-center gap-2 px-4 py-2 border-b border-border text-xs font-semibold ${aStyle}`}>
        <span className={`w-2 h-2 rounded-full shrink-0 ${aDot}`} aria-hidden="true" />
        <span>{aLabel}</span>
        <span className="ml-auto font-normal">{provider.availability_note}</span>
      </div>

      {/* ── Card body ── */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header row */}
        <div className="flex gap-3 items-start">
          {provider.image_src ? (
            <img
              src={provider.image_src}
              alt={provider.name}
              width={56}
              height={56}
              loading="lazy"
              className="w-14 h-14 rounded-full object-cover shrink-0 border border-border"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-cta/10 to-accent/10 flex items-center justify-center text-base font-semibold text-cta shrink-0 border border-border">
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-site-text leading-tight">{provider.name_with_education}</h3>
            <p className="text-xs text-site-sub mt-0.5">{provider.credential}</p>
            <p className="text-xs text-site-sub mt-0.5 italic">{provider.spec}</p>
          </div>
        </div>

        {/* ── Q1: What will it cost? ── */}
        <div className="rounded-xl bg-surface-soft border border-border p-3">
          <p className="text-xs font-semibold text-site-text mb-2">💰 What will it cost?</p>
          {firstRate && (
            <p className="text-sm font-bold text-cta mb-1">Starting at {firstRate} / session (self-pay)</p>
          )}
          <p className="text-xs text-site-sub">
            Insurance accepted:{" "}
            <span className="text-site-text font-medium">
              {provider.ins.slice(0, 4).join(", ")}
              {provider.ins.length > 4 ? ` +${provider.ins.length - 4} more` : ""}
            </span>
          </p>
        </div>

        {/* ── Q2: When can I be seen? ── */}
        <div className="rounded-xl bg-surface-soft border border-border p-3">
          <p className="text-xs font-semibold text-site-text mb-2">📅 When can I be seen?</p>
          <div className="flex flex-col gap-1.5">
            {Object.entries(provider.wait_times).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between gap-2">
                <span className="text-xs text-site-sub">{WAIT_LABELS[key] ?? key}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    /immediate/i.test(val)
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700"
                      : /week/i.test(val)
                      ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
                      : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
                  }`}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Age groups + states mini-tags */}
        <div className="flex flex-wrap gap-1.5">
          {provider.age_groups.map((g) => (
            <span key={g} className="text-xs px-2 py-0.5 rounded bg-surface-soft border border-border text-site-sub">
              {g}
            </span>
          ))}
          {provider.states_served.length === 1 ? (
            <span className="text-xs px-2 py-0.5 rounded bg-surface-soft border border-border text-site-sub">
              {provider.states_served[0]}
            </span>
          ) : (
            <span className="text-xs px-2 py-0.5 rounded bg-surface-soft border border-border text-site-sub">
              {provider.states_served[0]}
              {provider.states_served.length > 1 ? ` +${provider.states_served.length - 1} states` : ""}
            </span>
          )}
        </div>

        {/* Expandable: full rates + services */}
        <div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="text-xs text-cta hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/40 rounded"
          >
            {expanded ? "▲ Hide details" : "▼ Show all rates & services"}
          </button>
          <div
            className="grid transition-all duration-300 ease-in-out"
            style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="mt-3 pt-3 border-t border-border space-y-3">
                {rateEntries.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-site-sub mb-1">Self-pay rates</p>
                    <div className="flex flex-col gap-1">
                      {rateEntries.map(([key, val]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-site-sub">{RATE_LABELS[key] ?? key}</span>
                          <span className="font-semibold text-site-text">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-site-sub mb-1">Services offered</p>
                  <div className="flex flex-wrap gap-1">
                    {provider.services_offered.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded bg-surface-soft border border-border text-site-sub">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-site-sub mb-1">All insurance plans</p>
                  <p className="text-xs text-site-sub">{provider.ins.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="px-5 pb-5">
        <a
          href={provider.contact_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Request an appointment with ${provider.name}`}
          className="block w-full text-center bg-cta text-cta-fg hover:bg-cta/80 font-semibold text-sm py-2.5 rounded-xl transition-colors duration-150"
        >
          Request Appointment
        </a>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ClinicalMatcher({ providers }: ClinicalMatcherProps) {
  const reduced = useReducedMotion();

  const [serviceFilter, setServiceFilter] = useState<string | null>(null);
  const [ageFilter, setAgeFilter] = useState<string | null>(null);
  const [insuranceFilter, setInsuranceFilter] = useState<string | null>(null);
  const [stateFilter, setStateFilter] = useState<string | null>(null);

  const allServices = useMemo(
    () => [...new Set(providers.flatMap((p) => p.service_categories))].sort(),
    [providers]
  );
  const allAgeGroups = useMemo(
    () => [...new Set(providers.flatMap((p) => p.age_groups))],
    [providers]
  );
  const allInsurances = useMemo(() => {
    const set = new Set<string>();
    for (const p of providers) for (const ins of p.ins) set.add(ins);
    const sorted = [...set].sort();
    sorted.unshift("Self-Pay");
    return [...new Set(sorted)];
  }, [providers]);
  const allStates = useMemo(
    () => [...new Set(providers.flatMap((p) => p.states_served))].sort(),
    [providers]
  );

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (serviceFilter && !p.service_categories.includes(serviceFilter)) return false;
      if (ageFilter && !p.age_groups.includes(ageFilter)) return false;
      if (insuranceFilter) {
        if (insuranceFilter === "Self-Pay") {
          // All providers accept self-pay — never exclude
        } else if (!p.ins.includes(insuranceFilter)) return false;
      }
      if (stateFilter && !p.states_served.includes(stateFilter)) return false;
      return true;
    });
  }, [providers, serviceFilter, ageFilter, insuranceFilter, stateFilter]);

  const hasFilters = serviceFilter || ageFilter || insuranceFilter || stateFilter;

  const reset = useCallback(() => {
    setServiceFilter(null);
    setAgeFilter(null);
    setInsuranceFilter(null);
    setStateFilter(null);
  }, []);

  return (
    <div className="space-y-8">
      {/* ── Filter bar ── */}
      <div className="rounded-2xl border border-border bg-surface p-5 space-y-5">
        <h2 className="text-sm font-semibold text-site-text">Filter clinicians</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Service */}
          <div>
            <p className="text-xs text-site-sub font-semibold mb-2 uppercase tracking-wide">Service</p>
            <div className="flex flex-wrap gap-2">
              {allServices.map((s) => (
                <FilterPill
                  key={s}
                  label={s}
                  active={serviceFilter === s}
                  onClick={() => setServiceFilter((prev) => (prev === s ? null : s))}
                />
              ))}
            </div>
          </div>

          {/* Age group */}
          <div>
            <p className="text-xs text-site-sub font-semibold mb-2 uppercase tracking-wide">Age Group</p>
            <div className="flex flex-wrap gap-2">
              {allAgeGroups.map((a) => (
                <FilterPill
                  key={a}
                  label={a}
                  active={ageFilter === a}
                  onClick={() => setAgeFilter((prev) => (prev === a ? null : a))}
                />
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div>
            <p className="text-xs text-site-sub font-semibold mb-2 uppercase tracking-wide">Insurance</p>
            <select
              value={insuranceFilter ?? ""}
              onChange={(e) => setInsuranceFilter(e.currentTarget.value || null)}
              aria-label="Filter by insurance"
              className="w-full px-3 py-2 rounded-xl border border-border bg-surface text-site-text text-sm focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta/40"
            >
              <option value="">Any insurance</option>
              {allInsurances.map((ins) => (
                <option key={ins} value={ins}>{ins}</option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <p className="text-xs text-site-sub font-semibold mb-2 uppercase tracking-wide">State</p>
            <select
              value={stateFilter ?? ""}
              onChange={(e) => setStateFilter(e.currentTarget.value || null)}
              aria-label="Filter by state"
              className="w-full px-3 py-2 rounded-xl border border-border bg-surface text-site-text text-sm focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta/40"
            >
              <option value="">Any state</option>
              {allStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-semibold text-site-sub hover:text-site-text border border-border rounded-xl px-4 py-2 hover:bg-surface-soft hover:border-cta/30 transition-all duration-150"
          >
            ✕ Clear all filters
          </button>
        )}
      </div>

      {/* ── Results summary ── */}
      <p className="text-sm text-site-sub">
        {filtered.length} clinician{filtered.length !== 1 ? "s" : ""} match
        {filtered.length !== 1 ? "" : "es"} your filters
      </p>

      {/* ── Card grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-border rounded-2xl bg-surface">
          <p className="text-site-sub text-lg mb-2">No clinicians match these filters.</p>
          <p className="text-site-sub text-sm">Try removing a filter or <a href="/contact" className="text-cta underline">contact us</a> directly.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ClinicianCard key={p.id} provider={p} index={i} reduced={reduced} />
          ))}
        </div>
      )}
    </div>
  );
}
