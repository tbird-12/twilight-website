import Tabs from '../primitives/Tabs';

interface FeeService {
  name: string;
  price: string;
  note?: string;
}

interface FeeCategory {
  id: string;
  title: string;
  services: FeeService[];
}

interface FeeTabsProps {
  categories: FeeCategory[];
  className?: string;
}

export default function FeeTabs({ categories, className = '' }: FeeTabsProps) {
  const tabs = categories.map((cat, idx) => ({
    id: cat.id,
    label: cat.title,
    badge: String(idx + 1),
    sublabel: `${cat.services.length} services`,
  }));

  return (
    <Tabs tabs={tabs} defaultTab={categories[0]?.id} className={className}>
      {categories.map((cat) => (
        <div key={cat.id} id={cat.id}>
          <article className="bg-surface-soft border rounded-3xl p-6 sm:p-8" style={{ borderColor: 'var(--color-border-strong)' }}>
            <h3 className="font-serif text-2xl font-black text-site-text mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-cta rounded-full" />
              {cat.title}
            </h3>
            <div className="space-y-1">
              {cat.services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start py-3.5 border-b group/fee hover:bg-surface-soft/50 rounded-lg px-2 -mx-2 transition-colors duration-200"
                  style={{
                    borderColor: 'var(--color-border)',
                    animation: `blurIn 350ms ease-out both`,
                    animationDelay: `${idx * 50}ms`,
                  }}
                >
                  <div>
                    <p className="text-site-text font-bold group-hover/fee:text-cta transition-colors duration-200">{service.name}</p>
                    {service.note && (
                      <p className="text-xs text-site-sub uppercase tracking-wider mt-0.5">{service.note}</p>
                    )}
                  </div>
                  <span className="text-cta font-black shrink-0 ml-4 tabular-nums">{service.price}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      ))}
    </Tabs>
  );
}
