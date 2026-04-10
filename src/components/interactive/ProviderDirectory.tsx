import { useState, useMemo, useCallback } from "preact/hooks";

interface Provider {
  id: string;
  first_name: string;
  last_name: string;
  credentials: string;
  bio: string;
  services_offered: string[];
  states_served: string[];
  image_url?: string;
}

interface ProviderDirectoryProps {
  providers: Provider[];
}

export default function ProviderDirectory({ providers }: ProviderDirectoryProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
        provider.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.bio.toLowerCase().includes(searchTerm.toLowerCase());

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

  return (
    <div class="space-y-6">
      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Search by name or specialty..."
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
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                class="p-4 border border-border rounded-lg bg-surface hover:shadow-md hover:border-border-strong transition-all"
              >
                <div class="flex gap-3 mb-3">
                  {provider.image_url ? (
                    <img
                      src={provider.image_url}
                      alt={provider.first_name}
                      class="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div class="w-12 h-12 rounded-full bg-surface-soft flex items-center justify-center text-sm font-semibold text-site-sub">
                      {provider.first_name[0]}
                      {provider.last_name[0]}
                    </div>
                  )}
                  <div class="flex-1">
                    <h3 class="font-semibold text-site-text">
                      {provider.first_name} {provider.last_name}
                    </h3>
                    <p class="text-xs text-site-sub">{provider.credentials}</p>
                  </div>
                </div>

                <p class="text-sm text-site-sub line-clamp-2 mb-3">
                  {provider.bio}
                </p>

                <div class="space-y-2">
                  <div>
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

                  <div>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
