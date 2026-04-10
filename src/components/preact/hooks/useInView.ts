import { useRef, useState, useEffect } from 'preact/hooks';

export function useInView(options?: IntersectionObserverInit & { once?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options?.once !== false) observer.disconnect();
        }
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: options?.rootMargin ?? '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView] as const;
}
