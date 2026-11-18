import { useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

type DirectionKey = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

interface CompassNode {
  name: string;
  slug: string;
  desc: string;
  direction: DirectionKey;
}

interface SpecialtyCompassProps {
  nodes: CompassNode[];
  waitWeeks: number;
  reportDays: number;
}

// Clockwise angle from North
const CLOCK_ANGLES: Record<DirectionKey, number> = {
  N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315,
};

function nodeXY(dir: DirectionKey, r = 40): { x: number; y: number } {
  const a = CLOCK_ANGLES[dir] * Math.PI / 180;
  return { x: 50 + r * Math.sin(a), y: 50 - r * Math.cos(a) };
}

// Dawn→Twilight theme per direction — fixed design constants, not UI tokens
const THEME: Record<DirectionKey, { dot: string; glow: string; line: string; text: string }> = {
  N:  { dot: '#FBBF24', glow: 'rgba(251,191,36,0.32)',  line: 'rgba(251,191,36,0.55)',  text: '#fde68a' },
  NE: { dot: '#FB923C', glow: 'rgba(251,146,60,0.28)',  line: 'rgba(251,146,60,0.50)',  text: '#fed7aa' },
  E:  { dot: '#FCA5A5', glow: 'rgba(252,165,165,0.28)', line: 'rgba(252,165,165,0.45)', text: '#fecaca' },
  SE: { dot: '#C084FC', glow: 'rgba(192,132,252,0.28)', line: 'rgba(192,132,252,0.45)', text: '#e9d5ff' },
  S:  { dot: '#818CF8', glow: 'rgba(129,140,248,0.32)', line: 'rgba(129,140,248,0.50)', text: '#c7d2fe' },
  SW: { dot: '#6366F1', glow: 'rgba(99,102,241,0.28)',  line: 'rgba(99,102,241,0.45)',  text: '#a5b4fc' },
  W:  { dot: '#7C3AED', glow: 'rgba(124,58,237,0.28)',  line: 'rgba(124,58,237,0.45)',  text: '#c4b5fd' },
  NW: { dot: '#A78BFA', glow: 'rgba(167,139,250,0.28)', line: 'rgba(167,139,250,0.45)', text: '#ddd6fe' },
};

const DIRECTIONS = Object.keys(CLOCK_ANGLES) as DirectionKey[];

export default function SpecialtyCompass({ nodes, waitWeeks, reportDays }: SpecialtyCompassProps) {
  const [hovered, setHovered] = useState<DirectionKey | null>(null);
  const [active, setActive] = useState<DirectionKey>(() => nodes[0]?.direction ?? 'N');
  const reduced = useReducedMotion();

  // used by mobile feature card only
  const activeNode = nodes.find(n => n.direction === active) ?? nodes[0];

  return (
    <div className="sc-root">
      {/* ── Desktop: compass left · specialty list right ── */}
      <div className="sc-desktop">
        {/* LEFT: Compass rose — decorative; names live in the right panel */}
        <div className="sc-frame">
          <svg
            className="sc-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            style={{ pointerEvents: 'none' }}
          >
            <defs>
              <radialGradient id="scDawnAtmos" cx="62%" cy="18%" r="48%">
                <stop offset="0%"   stopColor="#FBBF24" stopOpacity="0.10" />
                <stop offset="50%"  stopColor="#FB923C" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000"    stopOpacity="0" />
              </radialGradient>
              <radialGradient id="scDuskAtmos" cx="38%" cy="82%" r="48%">
                <stop offset="0%"   stopColor="#6366F1" stopOpacity="0.12" />
                <stop offset="50%"  stopColor="#7C3AED" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000"    stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="100" height="100" fill="url(#scDawnAtmos)" />
            <rect width="100" height="100" fill="url(#scDuskAtmos)" />

            {/* Rings */}
            <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(165,180,252,0.07)" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(165,180,252,0.06)" strokeWidth="0.25" />

            {/* 8 compass spokes: inner radius 12 → outer radius 36 */}
            {DIRECTIONS.map((dir) => {
              const a = CLOCK_ANGLES[dir] * Math.PI / 180;
              const isCardinal = dir === 'N' || dir === 'E' || dir === 'S' || dir === 'W';
              return (
                <line
                  key={dir}
                  x1={50 + 12 * Math.sin(a)} y1={50 - 12 * Math.cos(a)}
                  x2={50 + 36 * Math.sin(a)} y2={50 - 36 * Math.cos(a)}
                  stroke={isCardinal ? 'rgba(165,180,252,0.11)' : 'rgba(165,180,252,0.06)'}
                  strokeWidth={isCardinal ? '0.35' : '0.2'}
                />
              );
            })}

            {/* Horizon line */}
            <line x1="14" y1="50" x2="86" y2="50" stroke="rgba(165,180,252,0.10)" strokeWidth="0.25" strokeDasharray="1.5 2" />

            {/* Center ring + dot */}
            <circle cx="50" cy="50" r="8"   fill="none"               stroke="rgba(165,180,252,0.10)" strokeWidth="0.3" />
            <circle cx="50" cy="50" r="1.5" fill="rgba(165,180,252,0.3)" />

            {/* Constellation lines: drawn on hover via stroke-dashoffset */}
            {nodes.map((node) => {
              const pos = nodeXY(node.direction);
              return (
                <line
                  key={node.direction}
                  x1="50" y1="50"
                  x2={pos.x} y2={pos.y}
                  className="sc-constellation-line"
                  stroke={THEME[node.direction].line}
                  strokeWidth="0.35"
                  style={{
                    strokeDasharray: 40,
                    strokeDashoffset: (reduced || hovered === node.direction) ? 0 : 40,
                    transition: reduced ? 'none' : 'stroke-dashoffset 0.35s ease',
                  }}
                />
              );
            })}
          </svg>

          {/* 8 node anchors — no text labels, names are in the right-panel list */}
          {nodes.map((node) => {
            const pos = nodeXY(node.direction);
            const th  = THEME[node.direction];
            const isHov = hovered === node.direction;
            return (
              <a
                key={node.direction}
                href={`/specialties/${node.slug}/`}
                className="sc-node-anchor"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                aria-label={`Learn about ${node.name}`}
                data-astro-prefetch="viewport"
                onMouseEnter={() => setHovered(node.direction)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.direction)}
                onBlur={() => setHovered(null)}
              >
                <span
                  className={`sc-node-glow${isHov ? ' sc-node-glow--active' : ''}`}
                  aria-hidden="true"
                  style={{ background: th.glow }}
                />
                <span
                  className={`sc-node-dot${isHov ? ' sc-node-dot--active' : ''}`}
                  style={{ background: th.dot }}
                />
              </a>
            );
          })}

          {/* Center: shows active direction letter on hover */}
          <div className="sc-center-info" aria-hidden="true">
            {hovered ? (
              <span className="sc-center-name" style={{ color: 'var(--color-site-text)' }}>
                {hovered}
              </span>
            ) : (
              <span className="sc-center-idle">✦</span>
            )}
          </div>
        </div>

        {/* RIGHT: All 8 specialties — always visible, always clickable */}
        <div className="sc-list" role="list" aria-label="Specialty evaluations">
          {nodes.map((node) => {
            const th = THEME[node.direction];
            const isHov = hovered === node.direction;
            return (
              <a
                key={node.direction}
                href={`/specialties/${node.slug}/`}
                className={`sc-list-item${isHov ? ' sc-list-item--active' : ''}`}
                aria-label={`Learn about ${node.name} evaluation`}
                data-astro-prefetch="viewport"
                role="listitem"
                onMouseEnter={() => setHovered(node.direction)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.direction)}
                onBlur={() => setHovered(null)}
              >
                <div className="sc-list-dir" aria-hidden="true">
                  <span
                    className="sc-list-dir-dot"
                    style={{
                      background: th.dot,
                      boxShadow: isHov ? `0 0 8px ${th.glow}` : undefined,
                    }}
                  />
                  <span className="sc-list-dir-text">
                    {node.direction}
                  </span>
                </div>
                <div className="sc-list-body">
                  <span className="sc-list-name">{node.name}</span>
                  <span className="sc-list-desc">{node.desc}</span>
                </div>
                <span className="sc-list-arrow" aria-hidden="true">→</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Mobile orbit slider ── */}
      <div className="sc-mobile">
        <div className="sc-wheel-container">
          <span className="sc-wheel-indicator" aria-hidden="true" />
          <div
            className="sc-wheel"
            style={{
              transform: `rotate(${-CLOCK_ANGLES[active]}deg)`,
              transition: reduced ? 'none' : 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {/* Decorative SVG inside wheel */}
            <svg
              className="sc-wheel-svg"
              viewBox="0 0 100 100"
              aria-hidden="true"
              style={{ pointerEvents: 'none' }}
            >
              <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(165,180,252,0.07)" strokeWidth="0.5" />
              {DIRECTIONS.map((dir) => {
                const a = CLOCK_ANGLES[dir] * Math.PI / 180;
                const isCardinal = dir === 'N' || dir === 'E' || dir === 'S' || dir === 'W';
                return (
                  <line
                    key={dir}
                    x1={50 + 12 * Math.sin(a)} y1={50 - 12 * Math.cos(a)}
                    x2={50 + 44 * Math.sin(a)} y2={50 - 44 * Math.cos(a)}
                    stroke={isCardinal ? 'rgba(165,180,252,0.10)' : 'rgba(165,180,252,0.05)'}
                    strokeWidth={isCardinal ? '0.4' : '0.25'}
                  />
                );
              })}
            </svg>

            {/* 8 wheel node buttons */}
            {nodes.map((node) => {
              const a = CLOCK_ANGLES[node.direction] * Math.PI / 180;
              const isAct = node.direction === active;
              const th = THEME[node.direction];
              return (
                <button
                  key={node.direction}
                  className="sc-wheel-node"
                  style={{ left: `${50 + 42 * Math.sin(a)}%`, top: `${50 - 42 * Math.cos(a)}%` }}
                  onClick={() => setActive(node.direction)}
                  aria-label={`Select ${node.name}`}
                  aria-pressed={node.direction === active}
                >
                  <span
                    className={`sc-wheel-dot${isAct ? ' sc-wheel-dot--active' : ''}`}
                    style={isAct ? { background: th.dot, boxShadow: `0 0 8px ${th.glow}` } : undefined}
                  />
                  <span
                    className="sc-wheel-dir"
                    aria-hidden="true"
                    style={{
                      transform: `rotate(${CLOCK_ANGLES[active]}deg)`,
                      transition: reduced ? 'none' : 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  >
                    {node.direction}
                  </span>
                </button>
              );
            })}

            <div className="sc-wheel-center" />
          </div>
        </div>

        {/* Feature card */}
        <a
          className="sc-feature-card"
          href={`/specialties/${activeNode.slug}/`}
          aria-label={`Learn about ${activeNode.name} evaluation`}
          data-astro-prefetch="viewport"
          style={
            {
              '--sc-dot':  THEME[active].dot,
              '--sc-glow': THEME[active].glow,
            } as React.CSSProperties
          }
        >
          <span className="sc-feature-dir" style={{ color: THEME[active].text }}>{active}</span>
          <h3 className="sc-feature-name">{activeNode.name}</h3>
          <p className="sc-feature-desc">{activeNode.desc}</p>
          <span className="sc-feature-cta" aria-hidden="true">Learn more →</span>
        </a>
      </div>

      {/* ── Shared footer ── */}
      <div className="sc-footer">
        <p className="sc-footer-badge">
          Private pay · ~{waitWeeks}wk wait · {reportDays}-day report
        </p>
        <div className="sc-footer-links">
          <a
            href="/resources/fees/"
            className="sc-footer-link"
            aria-label="View self-pay evaluation rates"
            data-astro-prefetch="viewport"
          >
            View rates →
          </a>
          <a
            href="/specialties/"
            className="sc-footer-link sc-footer-link--muted"
            aria-label="View all specialty evaluations"
            data-astro-prefetch="viewport"
          >
            All specialties →
          </a>
        </div>
      </div>
    </div>
  );
}
