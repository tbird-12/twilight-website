import { useState, useEffect } from 'react';
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

const DIRECTIONS = Object.keys(CLOCK_ANGLES) as DirectionKey[];
const ACCENT_COLOR = 'var(--color-icon)';
const ACCENT_LINE = 'color-mix(in srgb, var(--color-icon) 55%, transparent)';
const ACCENT_GLOW = 'color-mix(in srgb, var(--color-icon) 30%, transparent)';
const ACCENT_FAINT = 'color-mix(in srgb, var(--color-icon) 7%, transparent)';
const ACCENT_SUBTLE = 'color-mix(in srgb, var(--color-icon) 11%, transparent)';

export default function SpecialtyCompass({ nodes, waitWeeks, reportDays }: SpecialtyCompassProps) {
  const [hovered, setHovered] = useState<DirectionKey | null>(null);
  const [active, setActive] = useState<DirectionKey>(() => nodes[0]?.direction ?? 'N');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const directions = nodes
      .map(n => n.direction)
      .sort((a, b) => CLOCK_ANGLES[a] - CLOCK_ANGLES[b]);

    if (directions.length < 2) return;
    const id = window.setInterval(() => {
      setActive(previous => {
        const currentIndex = directions.indexOf(previous);
        return directions[(currentIndex + 1) % directions.length];
      });
    }, 2000);
    return () => window.clearInterval(id);
  }, [nodes, reduced]);

  const activeNode = nodes.find(n => n.direction === active) ?? nodes[0];
  const highlighted = hovered ?? active;

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
                <stop offset="0%"   stopColor="var(--color-icon)" stopOpacity="0.10" />
                <stop offset="50%"  stopColor="var(--color-icon)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000"    stopOpacity="0" />
              </radialGradient>
              <radialGradient id="scDuskAtmos" cx="38%" cy="82%" r="48%">
                <stop offset="0%"   stopColor="var(--color-icon)" stopOpacity="0.12" />
                <stop offset="50%"  stopColor="var(--color-icon)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000"    stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="100" height="100" fill="url(#scDawnAtmos)" />
            <rect width="100" height="100" fill="url(#scDuskAtmos)" />

            {/* Rings */}
            <circle cx="50" cy="50" r="47" fill="none" stroke={ACCENT_FAINT} strokeWidth="0.4" />
            <circle cx="50" cy="50" r="40" fill="none" stroke={ACCENT_FAINT} strokeWidth="0.25" />

            {/* 8 compass spokes: inner radius 12 → outer radius 36 */}
            {DIRECTIONS.map((dir) => {
              const a = CLOCK_ANGLES[dir] * Math.PI / 180;
              const isCardinal = dir === 'N' || dir === 'E' || dir === 'S' || dir === 'W';
              return (
                <line
                  key={dir}
                  x1={50 + 12 * Math.sin(a)} y1={50 - 12 * Math.cos(a)}
                  x2={50 + 36 * Math.sin(a)} y2={50 - 36 * Math.cos(a)}
                  stroke={isCardinal ? ACCENT_SUBTLE : ACCENT_FAINT}
                  strokeWidth={isCardinal ? '0.35' : '0.2'}
                />
              );
            })}

            {/* Horizon line */}
            <line x1="14" y1="50" x2="86" y2="50" stroke={ACCENT_SUBTLE} strokeWidth="0.25" strokeDasharray="1.5 2" />

            {/* Center ring + dot */}
            <circle cx="50" cy="50" r="8"   fill="none" stroke={ACCENT_SUBTLE} strokeWidth="0.3" />
            <circle cx="50" cy="50" r="1.5" fill={ACCENT_GLOW} />

            {/* Constellation lines: drawn on hover via stroke-dashoffset */}
            {nodes.map((node) => {
              const pos = nodeXY(node.direction);
              return (
                <line
                  key={node.direction}
                  x1="50" y1="50"
                  x2={pos.x} y2={pos.y}
                  className="sc-constellation-line"
                  stroke={ACCENT_LINE}
                  strokeWidth="0.35"
                  style={{
                    strokeDasharray: 40,
                    strokeDashoffset: (reduced || highlighted === node.direction) ? 0 : 40,
                    transition: reduced ? 'none' : 'stroke-dashoffset 0.35s ease',
                  }}
                />
              );
            })}
          </svg>

          {/* 8 node anchors — no text labels, names are in the right-panel list */}
          {nodes.map((node) => {
            const pos = nodeXY(node.direction);
            const isHighlighted = highlighted === node.direction;
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
                  className={`sc-node-glow${isHighlighted ? ' sc-node-glow--active' : ''}`}
                  aria-hidden="true"
                  style={{ background: ACCENT_GLOW }}
                />
                <span
                  className={`sc-node-dot${isHighlighted ? ' sc-node-dot--active' : ''}`}
                  aria-hidden="true"
                />
              </a>
            );
          })}

          {/* Center: shows the highlighted direction */}
          <div className="sc-center-info" aria-hidden="true">
            <span className="sc-center-name" style={{ color: 'var(--color-site-text)' }}>
              {highlighted}
            </span>
          </div>
        </div>

        {/* RIGHT: All 8 specialties — always visible, always clickable */}
        <div className="sc-list" role="list" aria-label="Specialty evaluations">
          {nodes.map((node) => {
            const isHighlighted = highlighted === node.direction;
            return (
              <a
                key={node.direction}
                href={`/specialties/${node.slug}/`}
                className={`sc-list-item${isHighlighted ? ' sc-list-item--active' : ''}`}
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
                    className={`sc-list-dir-dot${isHighlighted ? ' sc-list-dir-dot--active' : ''}`}
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
          <div className="sc-wheel">
            <svg
              className="sc-wheel-svg"
              viewBox="0 0 100 100"
              aria-hidden="true"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <radialGradient id="scMobileDawnAtmos" cx="62%" cy="18%" r="48%">
                  <stop offset="0%" stopColor="var(--color-icon)" stopOpacity="0.10" />
                  <stop offset="50%" stopColor="var(--color-icon)" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="scMobileDuskAtmos" cx="38%" cy="82%" r="48%">
                  <stop offset="0%" stopColor="var(--color-icon)" stopOpacity="0.12" />
                  <stop offset="50%" stopColor="var(--color-icon)" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" fill="url(#scMobileDawnAtmos)" />
              <rect width="100" height="100" fill="url(#scMobileDuskAtmos)" />
              <circle cx="50" cy="50" r="47" fill="none" stroke={ACCENT_FAINT} strokeWidth="0.4" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={ACCENT_FAINT} strokeWidth="0.25" />
              {DIRECTIONS.map((dir) => {
                const a = CLOCK_ANGLES[dir] * Math.PI / 180;
                const isCardinal = dir === 'N' || dir === 'E' || dir === 'S' || dir === 'W';
                return (
                  <line
                    key={dir}
                    x1={50 + 12 * Math.sin(a)} y1={50 - 12 * Math.cos(a)}
                    x2={50 + 36 * Math.sin(a)} y2={50 - 36 * Math.cos(a)}
                    stroke={isCardinal ? ACCENT_SUBTLE : ACCENT_FAINT}
                    strokeWidth={isCardinal ? '0.35' : '0.2'}
                  />
                );
              })}
              <line x1="14" y1="50" x2="86" y2="50" stroke={ACCENT_SUBTLE} strokeWidth="0.25" strokeDasharray="1.5 2" />
              {nodes.map((node) => {
                const pos = nodeXY(node.direction);
                return (
                  <line
                    key={node.direction}
                    x1="50" y1="50"
                    x2={pos.x} y2={pos.y}
                    className="sc-constellation-line"
                    stroke={ACCENT_LINE}
                    strokeWidth="0.35"
                    style={{
                      strokeDasharray: 40,
                      strokeDashoffset: (reduced || active === node.direction) ? 0 : 40,
                      transition: reduced ? 'none' : 'stroke-dashoffset 0.35s ease',
                    }}
                  />
                );
              })}
            </svg>

            {nodes.map((node) => {
              const a = CLOCK_ANGLES[node.direction] * Math.PI / 180;
              const isActive = node.direction === active;
              return (
                <button
                  key={node.direction}
                  className={`sc-wheel-node${isActive ? ' sc-wheel-node--active' : ''}`}
                  style={{ left: `${50 + 40 * Math.sin(a)}%`, top: `${50 - 40 * Math.cos(a)}%` }}
                  onClick={() => setActive(node.direction)}
                  aria-label={`Select ${node.name}`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`sc-wheel-dot${isActive ? ' sc-wheel-dot--active' : ''}`}
                  />
                  <span className="sc-wheel-dir" aria-hidden="true">
                    {node.direction}
                  </span>
                  {isActive && <span className="sc-wheel-arrow" aria-hidden="true">→</span>}
                </button>
              );
            })}

            <div className="sc-wheel-center" aria-hidden="true">
              <span>{active}</span>
            </div>
          </div>
        </div>

        <a
          className="sc-feature-card"
          href={`/specialties/${activeNode.slug}/`}
          aria-label={`Learn about ${activeNode.name} evaluation`}
          data-astro-prefetch="viewport"
        >
          <span className="sc-feature-dir" style={{ color: ACCENT_COLOR }}>{active}</span>
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
