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
  domain: "assimilation" | "compensation" | "masking";
}

// Official 25-item CAT-Q (Hull et al., 2019). Items originally reverse-scored
// (3, 12, 19, 22, 24) have been rephrased so that all items are positively keyed
// (higher agreement = more camouflaging) to keep the 3-option scale intuitive.
const QUESTIONS: Question[] = [
  { id: 1,  emoji: "🪞", text: "When I'm with someone, I deliberately copy their body language or facial expressions.", domain: "compensation" },
  { id: 2,  emoji: "😌", text: "I monitor my body language or expressions so that I appear relaxed around others.", domain: "masking" },
  { id: 3,  emoji: "🎭", text: "I feel the need to put on an act to get through social situations.", domain: "assimilation" },
  { id: 4,  emoji: "📋", text: "I have developed a script or routine to follow in social situations.", domain: "compensation" },
  { id: 5,  emoji: "💬", text: "I repeat phrases I've heard others say in the same way I first heard them.", domain: "compensation" },
  { id: 6,  emoji: "🤔", text: "I adjust my facial expressions so that I appear interested in the person I'm talking to.", domain: "masking" },
  { id: 7,  emoji: "🎪", text: "In social situations, I feel like I'm 'performing' rather than being myself.", domain: "assimilation" },
  { id: 8,  emoji: "👀", text: "I use behaviours I've learned from watching other people interact.", domain: "compensation" },
  { id: 9,  emoji: "📡", text: "I always think about the impression I make on other people.", domain: "masking" },
  { id: 10, emoji: "🤝", text: "I need the support of other people in order to socialise.", domain: "assimilation" },
  { id: 11, emoji: "🎬", text: "I practise my facial expressions and body language to make sure they look natural.", domain: "compensation" },
  { id: 12, emoji: "👁️", text: "I force myself to make eye contact with others even when it feels uncomfortable.", domain: "masking" },
  { id: 13, emoji: "💪", text: "I have to force myself to interact with people when I am in social situations.", domain: "assimilation" },
  { id: 14, emoji: "📖", text: "I have tried to improve my understanding of social skills by watching other people.", domain: "compensation" },
  { id: 15, emoji: "🔍", text: "I track my body language or expressions so that I appear interested in social situations.", domain: "masking" },
  { id: 16, emoji: "🚪", text: "When in social situations, I try to find ways to avoid interacting with others.", domain: "assimilation" },
  { id: 17, emoji: "📚", text: "I have researched the rules of social interactions to improve my own social skills.", domain: "compensation" },
  { id: 18, emoji: "🪟", text: "I am always aware of the impression I make on other people.", domain: "masking" },
  { id: 19, emoji: "🔒", text: "I find it difficult to be myself when I am with other people.", domain: "assimilation" },
  { id: 20, emoji: "📺", text: "I watch television or films to learn how people use their bodies and faces to interact.", domain: "compensation" },
  { id: 21, emoji: "😶", text: "I adjust my expressions or posture so that I appear relaxed in social situations.", domain: "masking" },
  { id: 22, emoji: "🌊", text: "Conversations with other people feel effortful rather than natural to me.", domain: "assimilation" },
  { id: 23, emoji: "🎞️", text: "I have spent time learning social skills from TV shows or films and apply them to my interactions.", domain: "compensation" },
  { id: 24, emoji: "🧐", text: "I constantly monitor what my face and body are doing during conversations.", domain: "masking" },
  { id: 25, emoji: "🌀", text: "In social situations, I feel like I am pretending to be 'normal'.", domain: "assimilation" },
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

// Score range: 25 (all "Not me") – 125 (all "Very me") across 25 items.
const SCORE_BANDS: ScoreBand[] = [
  {
    label: "Low Masking",
    emoji: "🌿",
    tagline: "You present pretty authentically.",
    narrative: "You invest relatively little energy adapting to fit in. That can mean a supportive environment — or that masking simply hasn't been your dominant strategy. If something still feels off, a professional conversation can help clarify it.",
    ctaText: "Explore Our Services",
    ctaHref: "/services",
    accentClass: "text-emerald-700 dark:text-emerald-300",
    ringClass: "ring-emerald-400/50 dark:ring-emerald-500/70",
    bgClass: "bg-emerald-50/70 dark:bg-emerald-950/50",
  },
  {
    label: "Moderate Masking",
    emoji: "🌤️",
    tagline: "You work harder than most people realise.",
    narrative: "You've built real skill at adapting and appearing 'fine' — but it costs you. Moderate masking often creates a low-grade exhaustion that's hard to name. Many late-diagnosed adults score in this range.",
    ctaText: "Learn What This Means →",
    ctaHref: "/blog",
    accentClass: "text-amber-700 dark:text-amber-300",
    ringClass: "ring-amber-400/50 dark:ring-amber-500/70",
    bgClass: "bg-amber-50/70 dark:bg-amber-950/50",
  },
  {
    label: "High Masking",
    emoji: "🌀",
    tagline: "You've been carrying a lot — quietly.",
    narrative: "Your answers point to a significant, sustained effort to manage how you come across. For many people at this level, masking has become automatic — it feels like personality rather than performance. This pattern often precedes a late-in-life ADHD or autism diagnosis.",
    ctaText: "See Our Evaluations →",
    ctaHref: "/services/psychological-evaluations",
    accentClass: "text-orange-700 dark:text-orange-300",
    ringClass: "ring-orange-400/50 dark:ring-orange-500/70",
    bgClass: "bg-orange-50/70 dark:bg-orange-950/50",
  },
  {
    label: "Very High Masking",
    emoji: "🔥",
    tagline: "This level of effort deserves attention.",
    narrative: "Scores here often reflect what clinicians call autistic burnout: a deep exhaustion, reduced tolerance, and retreat from things that used to feel manageable. If you feel like you've been performing a version of yourself your whole life, that experience is real and worth exploring.",
    ctaText: "Start Here →",
    ctaHref: "/resources/new-client",
    accentClass: "text-rose-700 dark:text-rose-300",
    ringClass: "ring-rose-400/50 dark:ring-rose-500/70",
    bgClass: "bg-rose-50/70 dark:bg-rose-950/50",
  },
];

// Score range: 25 (all "Not me") – 125 (all "Very me") across 25 items.
function getBand(score: number): ScoreBand {
  if (score <= 50) return SCORE_BANDS[0];
  if (score <= 75) return SCORE_BANDS[1];
  if (score <= 100) return SCORE_BANDS[2];
  return SCORE_BANDS[3];
}

const DOMAIN_META = {
  assimilation: { label: "Fitting In", icon: "🎭" },
  compensation: { label: "Coping Strategies", icon: "🧠" },
  masking: { label: "Hiding Self", icon: "🔒" },
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
            {(["assimilation", "compensation", "masking"] as const).map((d) => (
              <DomainBar key={d} domain={d} score={domainScore(d)} maxScore={domainMax(d)} />
            ))}
          </div>
          <p className="mt-4 text-[11px] text-site-sub leading-relaxed">
            All 25 items from the CAT-Q (Hull et al., 2019), <em>Autism, 23</em>(1). Reverse-scored items rephrased for positive keying. Not a diagnostic instrument.
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
