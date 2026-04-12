import Tabs from '../primitives/Tabs';

interface ContactTabsProps {
  phoneNumber: string;
  phoneNumberFormatted: string;
  faxNumberFormatted: string;
  emailAddress: string;
  signInLink: string;
  widgetLink: string;
  referralLink: string;
}

export default function ContactTabs({
  phoneNumber,
  phoneNumberFormatted,
  faxNumberFormatted,
  emailAddress,
  signInLink,
  widgetLink,
  referralLink,
}: ContactTabsProps) {
  const tabs = [
    { id: 'providers', label: 'Providers', sublabel: 'Referrals and Records' },
    { id: 'existing', label: 'Existing Clients', sublabel: 'Portal and Support' },
    { id: 'future', label: 'Future Clients', sublabel: 'Start Care with Us' },
    { id: 'careers', label: 'Careers', sublabel: 'Opportunities with Us', isLink: true, href: '/about/careers' },
  ];

  return (
    <Tabs tabs={tabs} defaultTab="providers" scrollOnChange>
      <div id="providers">
        <article className="rounded-3xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-surface-soft)' }}>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-site-text mb-3">Referral Information</h2>
          <p className="text-site-sub leading-relaxed text-sm sm:text-base mb-6">
            Providers and care teams can submit a referral using our referral form and fax it to {faxNumberFormatted}. Include relevant records and contact details so we can follow up quickly.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={referralLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex self-start items-center rounded-md bg-cta px-4 py-2 text-sm font-black text-cta-fg hover:bg-cta/80 transition-colors duration-300"
            >
              Submit Referral
            </a>
            <p className="text-sm text-site-sub">
              Questions before referring? Call{' '}
              <a href={`tel:${phoneNumber}`} className="text-cta underline hover:text-site-text transition-colors">
                {phoneNumberFormatted}
              </a>.
            </p>
          </div>
        </article>
      </div>

      <div id="existing">
        <article className="rounded-3xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-surface-soft)' }}>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-site-text mb-3 leading-tight">Existing Client Portal</h2>
          <p className="text-site-sub leading-relaxed text-sm sm:text-base mb-6">
            Already a client? Sign in to your secure portal to message your provider, review documents, and manage upcoming appointments.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={signInLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex self-start items-center rounded-md bg-cta px-4 py-2 text-sm font-black text-cta-fg hover:bg-cta/80 transition-colors duration-300"
            >
              Portal Sign In
            </a>
            <p className="text-sm text-site-sub">
              Need immediate assistance? Call{' '}
              <a href={`tel:${phoneNumber}`} className="text-cta underline hover:text-site-text transition-colors">
                {phoneNumberFormatted}
              </a>.
            </p>
          </div>
        </article>
      </div>

      <div id="future">
        <article className="rounded-3xl border p-6 sm:p-8" style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-surface-soft)' }}>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-site-text mb-3">Begin as a New Client</h2>
          <p className="text-site-sub leading-relaxed text-sm sm:text-base mb-6">
            Use our secure intake form to request an appointment and indicate the type of clinical service you are seeking.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={widgetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex self-start items-center rounded-md bg-cta px-4 py-2 text-sm font-black text-cta-fg hover:bg-cta/80 transition-colors duration-300"
            >
              Open Intake Form
            </a>
            <p className="text-sm text-site-sub">
              Prefer direct contact? Call{' '}
              <a href={`tel:${phoneNumber}`} className="text-cta underline hover:text-site-text transition-colors">
                {phoneNumberFormatted}
              </a>{' '}
              or email{' '}
              <a href={`mailto:${emailAddress}`} className="text-cta underline hover:text-site-text transition-colors">
                {emailAddress}
              </a>.
            </p>
          </div>
        </article>
      </div>
    </Tabs>
  );
}
