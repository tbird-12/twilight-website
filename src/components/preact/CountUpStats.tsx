import { useEffect, useRef, useState } from 'preact/hooks';

interface Stat {
  label: string;
  value: string;
}

interface CountUpStatsProps {
  stats: Stat[];
}

function parseStatValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return { num: 0, prefix: '', suffix: value };
  return { num: parseInt(match[2], 10), prefix: match[1], suffix: match[3] };
}

function useCountUp(target: number, isVisible: boolean, duration = 1200): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCurrent(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, target, duration]);

  return current;
}

function StatItem({ stat, isVisible, index }: { stat: Stat; isVisible: boolean; index: number }) {
  const { num, prefix, suffix } = parseStatValue(stat.value);
  const displayNum = useCountUp(num, isVisible, 1200);

  return (
    <span
      className="flex items-center gap-2"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${index * 80}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${index * 80}ms`,
      }}
    >
      <span className="text-lg sm:text-xl font-serif font-black text-icon">
        {prefix}{displayNum}{suffix}
      </span>
      <span className="text-xs font-semibold text-cta">
        {stat.label}
      </span>
    </span>
  );
}

export default function CountUpStats({ stats }: CountUpStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mt-6 w-full flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3"
    >
      {stats.map((stat, idx) => (
        <StatItem key={idx} stat={stat} isVisible={isVisible} index={idx} />
      ))}
    </div>
  );
}
