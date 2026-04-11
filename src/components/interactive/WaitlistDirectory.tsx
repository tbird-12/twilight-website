import { useState, useMemo, useCallback } from "preact/hooks";

interface Provider {
  id: string;
  name: string;
  credential: string;
  services_offered: string[];
  states_served: string[];
  wait_times: Record<string, string>;
}

interface WaitlistDirectoryProps {
  providers: Provider[];
}

const WAIT_TIME_LABELS: Record<string, string> = {
  testing_insurance: "Testing (Insurance)",
  testing_out_of_pocket: "Testing (Self-Pay)",
  therapy: "Therapy",
  medication_management: "Medication Management",
};

function waitTimeBadgeClass(waitTime: string): string {
  const lower = waitTime.toLowerCase();
  if (lower.includes("immediate"))
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (lower.includes("week"))
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  if (lower.includes("month"))
    return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
  return "bg-surface-soft text-site-sub";
}

export default function WaitlistDirectory({ providers }: WaitlistDirectoryProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const uniqueServices = useMemo(
    () => [...new Set(providers.flatMap((p) => p.services_offered))].sort(),
    [providers]
  );

  const uniqueStates = useMemo(
    () => [...new Set(providers.flatMap((p) => p.states_served))].sort(),
    [providers]
  );

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const matchesSearch =
        searchTerm === "" ||
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.credential.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesServices =
        selectedServices.length === 0 ||
        selectedServices.some((service) =>
          provider.services_offered.includes(service)
        );

      const matchesStates =
        selectedStates.length === 0 ||
        selectedStates.some((state) => provider.states_served.includes(state));

      return matchesSearch && matchesServices && matchesStates;
    });
  }, [providers, searchTerm, selectedServices, selectedStates]);

  const handleServiceToggle = useCallback((service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  }, []);

  const handleStateToggle = useCallback((state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state)
        ? prev.filter((s) => s !== state)
        : [...prev, state]
    );
  }, []);

  const handleReset = useCallback(() => {
    setSelectedServices([]);
    setSelectedStates([]);
    setSearchTerm("");
  }, []);

  const toggleCard = useCallback((id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div class="space-y-6">
      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Search by name or credential..."
          value={searchTerm}
          onInput={(e) => setSearchTerm(e.currentTarget.value)}
          class="w-full px-4 py-2 border border-border rounded-lg bg-surface text-site-text placeholder-site-sub focus:outline-none focus:border-icon transition-colors"
        />
      </div>

      {/* Filters */}
      <div class="grid md:grid-cols-2 gap-6 p-4 rounded-lg bg-surface-soft border border-border">
        {/* Services filter */}
        <div>
          <h3 class="text-sm font-semibold text-site-text mb-3">Services</h3>
          <div class="space-y-2">
            {uniqueServices.map((service) => (
              <label key={service} class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  class="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span class="text-sm text-site-sub">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* States filter */}
        <div>
          <h3 class="text-sm font-semibold text-site-text mb-3">States</h3>
          <div class="space-y-2 max-h-48 overflow-y-auto">
            {uniqueStates.map((state) => (
              <label key={state} class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedStates.includes(state)}
                  onChange={() => handleStateToggle(state)}
                  class="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span class="text-sm text-site-sub">{state}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Reset button */}
      {(selectedServices.length > 0 || selectedStates.length > 0 || searchTerm) && (
        <button
          onClick={handleReset}
          class="px-4 py-2 text-sm font-semibold text-site-sub hover:text-site-text border border-border rounded-lg hover:bg-surface-soft transition-all"
        >
          Reset Filters
        </button>
      )}

      {/* Results */}
      <div>
        <p class="text-sm text-site-sub mb-4">
          {filteredProviders.length} provider{filteredProviders.length !== 1 ? "s" : ""} found
        </p>

        {filteredProviders.length === 0 ? (
          <div class="text-center py-12">
            <p class="text-site-sub">No providers match your filters.</p>
          </div>
        ) : (
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map((provider) => {
              const isExpanded = expandedCard === provider.id;
              const nameParts = provider.name.split(" ");
              const initials =
                (nameParts[0]?.[0] || "") +
                (nameParts[nameParts.length - 1]?.[0] || "");

              return (
                <div
                  key={provider.id}
                  class="p-4 border border-border rounded-lg bg-surface hover:shadow-md hover:border-border-strong transition-all cursor-pointer"
                  onClick={() => toggleCard(provider.id)}
                >
                  {/* Header: initials + name */}
                  <div class="flex gap-3 mb-3">
                    <div class="w-12 h-12 rounded-full bg-surface-soft flex items-center justify-center text-sm font-semibold text-site-sub shrink-0">
                      {initials}
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-site-text">
                        {provider.name}
                      </h3>
                      <p class="text-xs text-site-sub">{provider.credential}</p>
                    </div>
                  </div>

                  {/* Wait times */}
                  <div class="space-y-2 mb-3">
                    <p class="text-xs font-semibold text-site-sub mb-1">Wait Times</p>
                    <div class="flex flex-wrap gap-2">
                      {Object.entries(provider.wait_times).map(([key, value]) => (
                        <div key={key} class="flex flex-col items-start">
                          <span class="text-[11px] text-site-sub mb-0.5">
                            {WAIT_TIME_LABELS[key] || key}
                          </span>
                          <span
                            class={`text-xs font-semibold px-2.5 py-1 rounded-full ${waitTimeBadgeClass(value)}`}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* States */}
                  <div class="mb-2">
                    <p class="text-xs font-semibold text-site-sub mb-1">States</p>
                    <div class="flex flex-wrap gap-1">
                      {provider.states_served.slice(0, 3).map((state) => (
                        <span
                          key={state}
                          class="text-xs px-2 py-1 bg-surface-soft text-site-sub rounded"
                        >
                          {state}
                        </span>
                      ))}
                      {provider.states_served.length > 3 && (
                        <span class="text-xs px-2 py-1 text-site-sub">
                          +{provider.states_served.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand hint */}
                  <p class="text-[11px] text-site-sub text-right select-none">
                    {isExpanded ? "▲ hide services" : "▼ show services"}
                  </p>

                  {/* Expanded services */}
                  {isExpanded && (
                    <div class="mt-3 pt-3 border-t border-border">
                      <p class="text-xs font-semibold text-site-sub mb-1">Services</p>
                      <div class="flex flex-wrap gap-1">
                        {provider.services_offered.map((service) => (
                          <span
                            key={service}
                            class="text-xs px-2 py-1 bg-surface-soft text-site-sub rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
