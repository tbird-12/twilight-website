import { useState, useCallback, useRef, useEffect } from "react";

// ---------------------------------------------------------------------------
// Questions drawn from published CAT-Q (Camouflaging Autistic Traits
// Questionnaire) research — Hull et al. (2019), Autism, 23(1).
// No answers are transmitted, stored, or logged. All computation is local.
// ---------------------------------------------------------------------------

interface Question {
  id: number;
  text: string;
  emoji: string;
  domain: "assimilation" | "compensation" | "camouflage";
}

const QUESTIONS: Question[] = [
  { id: 1, emoji: "🎭", text: "I adjust how I act depending on who I'm around.", domain: "assimilation" },
  { id: 2, emoji: "🪞", text: "I mirror other people's speech patterns or gestures without thinking.", domain: "assimilation" },
  { id: 3, emoji: "👀", text: "I study how people interact so I can do it 'correctly'.", domain: "assimilation" },
  { id: 4, emoji: "😶", text: "I've learned to hide my anxiety in social situations.", domain: "assimilation" },
  { id: 5, emoji: "📡", text: "I constantly monitor people's reactions to check if I've said something wrong.", domain: "assimilation" },
  { id: 6, emoji: "📝", text: "I rehearse conversation starters or responses before social events.", domain: "compensation" },
  { id: 7, emoji: "🔁", text: "I replay past interactions and analyse what I did wrong.", domain: "compensation" },
  { id: 8, emoji: "🤔", text: "I ask myself what a 'normal' person would do before reacting.", domain: "compensation" },
  { id: 9, emoji: "🔋", text: "Social situations drain my energy significantly.", domain: "compensation" },
  { id: 10, emoji: "🧩", text: "I work hard to seem more like the people around me.", domain: "compensation" },
  { id: 11, emoji: "🔒", text: "I actively hide my struggles from most people.", domain: "camouflage" },
  { id: 12, emoji: "🤐", text: "I hold back talking about my interests so I don't seem 'too much'.", domain: "camouflage" },
  { id: 13, emoji: "🌊", text: "After being social, I need significant time alone to recover.", domain: "camouflage" },
  { id: 14, emoji: "🎪", text: "My 'public self' feels very different from who I am alone.", domain: "camouflage" },
  { id: 15, emoji: "💤", text: "I feel exhausted in a way others don't seem to understand.", domain: "camouflage" },
];

// 3 options only — low friction, fast to complete
const OPTIONS = [
  { value: 1, label: "Not me", emoji: "😌" },
  { value: 3, label: "Sometimes", emoji: "🤔" },
  { value: 5, label: "Very me", emoji: "💯" },
];

interface ScoreBand {
  label: string;
  emoji: string;
  tagline: string;
  narrative: string;
  ctaText: string;
  ctaHref: string;
  accentClass: string;
  ringClass: string;
  bgClass: string;
}

// Score range: 15–75
const SCORE_BANDS: ScoreBand[] = [
  {
    label: "Low Masking",
    emoji: "🌿",
    tagline: "You present pretty authentically.",
    narrative: "You invest relatively little energy adapting to fit in. That can mean a supportive environment — or that masking simply hasn't been your dominant strategy. If something still feels off, a professional conversation can help clarify it.",
    ctaText: "Explore Our Services",
    ctaHref: "/services",
    accentClass: "text-emerald-600 dark:text-emerald-400",
    ringClass: "ring-emerald-400/40",
    bgClass: "bg-emerald-50/60 dark:bg-emerald-950/20",
  },
  {
    label: "Moderate Masking",
    emoji: "🌤️",
    tagline: "You work harder than most people realise.",
    narrative: "You've built real skill at adapting and appearing 'fine' — but it costs you. Moderate masking often creates a low-grade exhaustion that's hard to name. Many late-diagnosed adults score in this range.",
    ctaText: "Learn What This Means →",
    ctaHref: "/blog",
    accentClass: "text-amber-600 dark:text-amber-400",
    ringClass: "ring-amber-400/40",
    bgClass: "bg-amber-50/60 dark:bg-amber-950/20",
  },
  {
    label: "High Masking",
    emoji: "🌀",
    tagline: "You've been carrying a lot — quietly.",
    narrative: "Your answers point to a significant, sustained effort to manage how you come across. For many people at this level, masking has become automatic — it feels like personality rather than performance. This pattern often precedes a late-in-life ADHD or autism diagnosis.",
    ctaText: "See Our Evaluations →",
    ctaHref: "/services/psychological-evaluations",
    accentClass: "text-orange-600 dark:text-orange-400",
    ringClass: "ring-orange-400/40",
    bgClass: "bg-orange-50/60 dark:bg-orange-950/20",
  },
  {
    label: "Very High Masking",
    emoji: "🔥",
    tagline: "This level of effort deserves attention.",
    narrative: "Scores here often reflect what clinicians call autistic burnout: a deep exhaustion, reduced tolerance, and retreat from things that used to feel manageable. If you feel like you've been performing a version of yourself your whole life, that experience is real and worth exploring.",
    ctaText: "Start Here →",
    ctaHref: "/resources/new-client",
    accentClass: "text-rose-600 dark:text-rose-400",
    ringClass: "ring-rose-400/40",
    bgClass: "bg-rose-50/60 dark:bg-rose-950/20",
  },
];

function getBand(score: number): ScoreBand {
  if (score <= 30) return SCORE_BANDS[0];
  if (score <= 45) return SCORE_BANDS[1];
  if (score <= 58) return SCORE_BANDS[2];
  return SCORE_BANDS[3];
}

const DOMAIN_META = {
  assimilation: { label: "Fitting In", icon: "🎭" },
  compensation: { label: "Coping Strategies", icon: "🧠" },
  camouflage: { label: "Hiding Self", icon: "🔒" },
} as const;

// ---------------------------------------------------------------------------
// Animated card transition
// ---------------------------------------------------------------------------

interface CardProps {
  children: React.ReactNode;
  animKey: number;
  direction: "forward" | "back";
}

function AnimatedCard({ children, animKey, direction }: CardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [animKey]);

  const base = "transition-all duration-300 ease-out";
  const initial = direction === "forward"
    ? "translate-x-8 opacity-0"
    : "-translate-x-8 opacity-0";

  return (
    <div className={`${base} ${visible ? "translate-x-0 opacity-100" : initial}`}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Domain bar (results)
// ---------------------------------------------------------------------------

function DomainBar({ domain, score, maxScore }: { domain: keyof typeof DOMAIN_META; score: number; maxScore: number }) {
  const pct = Math.round((score / maxScore) * 100);
  const meta = DOMAIN_META[domain];
  const color = pct < 45 ? "bg-emerald-500" : pct < 65 ? "bg-amber-500" : pct < 80 ? "bg-orange-500" : "bg-rose-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-site-text flex items-center gap-2">
          <span>{meta.icon}</span>{meta.label}
        </span>
        <span className="text-site-sub tabular-nums text-xs">{score}/{maxScore}</span>
      </div>
      <div className="h-3 rounded-full bg-surface-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={maxScore}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function MaskingInventory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [showResults, setShowResults] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const isLast = currentIndex === totalQuestions - 1;
  const progress = ((currentIndex) / totalQuestions) * 100;

  const handleAnswer = useCallback((value: number) => {
    const q = QUESTIONS[currentIndex];
    setAnswers((prev) => ({ ...prev, [q.id]: value }));

    if (isLast) {
      setShowResults(true);
    } else {
      setDirection("forward");
      setCardKey((k) => k + 1);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, isLast]);

  const handleBack = useCallback(() => {
    if (currentIndex === 0) return;
    setDirection("back");
    setCardKey((k) => k + 1);
    setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const handleRetake = useCallback(() => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
    setDirection("forward");
    setCardKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (showResults && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [showResults]);

  const totalScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const band = showResults ? getBand(totalScore) : null;

  const domainScore = (d: keyof typeof DOMAIN_META) =>
    QUESTIONS.filter((q) => q.domain === d).reduce((s, q) => s + (answers[q.id] ?? 0), 0);
  const domainMax = (d: keyof typeof DOMAIN_META) =>
    QUESTIONS.filter((q) => q.domain === d).length * 5;

  if (showResults && band) {
    return (
      <div ref={resultsRef} className="space-y-5">
        {/* Score hero */}
        <div className={`rounded-3xl border ring-4 ${band.ringClass} ${band.bgClass} p-6 md:p-8 text-center`}>
          <div className="text-6xl mb-3">{band.emoji}</div>
          <p className={`text-xs font-black uppercase tracking-widest mb-1 ${band.accentClass}`}>
            {band.label}
          </p>
          <p className="font-serif text-2xl md:text-3xl font-black text-site-text mb-3 tracking-tight">
            {band.tagline}
          </p>
          <p className="text-site-sub text-sm md:text-base leading-relaxed max-w-md mx-auto">
            {band.narrative}
          </p>
        </div>

        {/* Domain bars */}
        <div className="bg-surface border border-border rounded-2xl p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-widest text-site-sub mb-4">Your Score Breakdown</p>
          <div className="space-y-4">
            {(["assimilation", "compensation", "camouflage"] as const).map((d) => (
              <DomainBar key={d} domain={d} score={domainScore(d)} maxScore={domainMax(d)} />
            ))}
          </div>
          <p className="mt-4 text-[11px] text-site-sub leading-relaxed">
            Based on CAT-Q research by Hull et al. (2019), <em>Autism, 23</em>(1). Not a diagnostic instrument.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-surface border border-border rounded-2xl p-5 md:p-6">
          <p className="text-site-text font-semibold mb-1">What's a good next step?</p>
          <p className="text-site-sub text-sm leading-relaxed mb-4">
            A psychologist can help you understand what these patterns mean specifically for you.
          </p>
          <a
            href={band.ctaHref}
            className="inline-flex items-center gap-2 bg-cta text-cta-fg px-6 py-3 rounded-xl font-semibold text-sm hover:bg-cta/90 transition-colors duration-150"
          >
            {band.ctaText}
          </a>
        </div>

        <button
          type="button"
          onClick={handleRetake}
          className="text-xs text-site-sub hover:text-site-text underline underline-offset-2 transition-colors duration-150 block"
        >
          Retake the inventory
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-site-sub mb-2">
          <span className="font-mono">{currentIndex + 1} / {totalQuestions}</span>
          <span>{Math.round(progress)}% done</span>
        </div>
        <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-cta transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Dot progress */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < currentIndex
                  ? "w-4 bg-cta"
                  : i === currentIndex
                    ? "w-6 bg-cta"
                    : "w-1.5 bg-surface-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <AnimatedCard animKey={cardKey} direction={direction}>
        <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 mb-5">
          <div className="text-5xl mb-4 text-center">{currentQuestion.emoji}</div>
          <p className="text-site-text text-xl md:text-2xl font-semibold text-center leading-snug">
            {currentQuestion.text}
          </p>
        </div>

        {/* Answer buttons */}
        <div className="grid grid-cols-3 gap-3">
          {OPTIONS.map((opt) => {
            const selected = answers[currentQuestion.id] === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleAnswer(opt.value)}
                aria-pressed={selected}
                className={`
                  flex flex-col items-center gap-2 py-5 px-2 rounded-2xl border-2 font-semibold text-sm
                  transition-all duration-150 cursor-pointer active:scale-95
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2
                  ${selected
                    ? "bg-cta border-cta text-cta-fg scale-105 shadow-md"
                    : "bg-surface border-border text-site-text hover:border-cta/50 hover:bg-surface-2"
                  }
                `}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </AnimatedCard>

      {/* Back nav */}
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="mt-4 text-xs text-site-sub hover:text-site-text transition-colors flex items-center gap-1"
        >
          ← Back
        </button>
      )}

      {/* Privacy note */}
      <p className="mt-6 text-[11px] text-site-sub text-center">
        🔒 Answers stay on your device — nothing is stored or transmitted.
      </p>
    </div>
  );
}
