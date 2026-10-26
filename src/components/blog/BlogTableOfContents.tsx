import { useState, useEffect, useCallback } from 'react';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface BlogTableOfContentsProps {
  headings: Heading[];
}

export default function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '-20px 0% -70% 0%',
      threshold: 0,
    });

    headings.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, handleObserver]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-site-sub">
        On this page
      </p>
      <ul className="space-y-0.5 border-l-2 border-border pl-3">
        {headings.map(({ depth, slug, text }) => (
          <li key={slug} className={depth === 3 ? 'pl-3' : ''}>
            <a
              href={`#${slug}`}
              className={[
                'block py-1 leading-snug transition-colors duration-150',
                depth === 3 ? 'text-[0.7rem]' : 'text-sm',
                activeId === slug
                  ? 'font-semibold text-cta'
                  : 'text-site-sub hover:text-site-text',
              ].join(' ')}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
