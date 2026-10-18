/**
 * High-quality scientific background graphic reflecting physical chemistry research:
 * - Ce-doped NiCo metal–organic framework (MOF) coordination geometry.
 * - Electrochemical polarization / cyclic voltammetry response curves.
 * - Precision laboratory coordinate crosshairs and reciprocal lattice markers.
 * Rendered as pure SVG vectors: zero layout shift, zero raster bytes, crisp on Retina.
 */
export default function HeroBackground() {
  return (
    <svg
      className="hero-background-graphic"
      viewBox="0 0 1200 680"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Subtle radial mask so graphics feather softly at boundaries */}
        <radialGradient
          id="hero-bg-feather"
          cx="60%"
          cy="42%"
          r="62%"
          fx="60%"
          fy="42%"
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="hero-reciprocal-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="20" cy="20" r="0.8" fill="var(--line)" opacity="0.75" />
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="var(--line)"
            strokeWidth="0.5"
            strokeDasharray="2 6"
            opacity="0.35"
          />
        </pattern>
      </defs>

      <g mask="url(#hero-bg-feather)">
        {/* Periodic lattice grid background */}
        <rect
          x="0"
          y="0"
          width="1200"
          height="680"
          fill="url(#hero-reciprocal-grid)"
          opacity="0.45"
        />

        {/* Laboratory coordinate frame / alignment marks */}
        <g stroke="var(--line)" strokeWidth="0.75" opacity="0.6">
          {/* Top-left coordinate anchor */}
          <path d="M 40 30 L 40 50 M 30 40 L 50 40" />
          <path d="M 1160 30 L 1160 50 M 1150 40 L 1170 40" />
          {/* Subtle axis scale ticks */}
          <line x1="60" y1="40" x2="260" y2="40" strokeDasharray="1 15" />
          <line x1="40" y1="60" x2="40" y2="260" strokeDasharray="1 15" />
        </g>

        {/* Electrochemical Potential & Polarization Curves (OER/HER Electrocatalysis) */}
        <g opacity="0.45">
          {/* Baseline reference potentials */}
          <line
            x1="520"
            y1="490"
            x2="1140"
            y2="490"
            stroke="var(--line)"
            strokeWidth="0.75"
            strokeDasharray="4 4"
          />
          {/* Overpotential onset sweep (Tafel exponential curve) */}
          <path
            d="M 540 490 C 680 488, 760 482, 830 455 C 900 420, 950 330, 980 180"
            stroke="var(--accent-line)"
            strokeWidth="1.25"
            strokeDasharray="3 3"
          />
          <path
            d="M 560 490 C 700 489, 780 484, 850 460 C 920 430, 970 345, 1000 200"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          {/* Current density annotations (faint notation) */}
          <text
            x="1010"
            y="215"
            fill="var(--faint)"
            fontSize="9"
            fontFamily="var(--font-mono), monospace"
            letterSpacing="0.08em"
            opacity="0.65"
          >
            j / mA·cm⁻² (OER)
          </text>
          <text
            x="1100"
            y="505"
            fill="var(--faint)"
            fontSize="9"
            fontFamily="var(--font-mono), monospace"
            letterSpacing="0.08em"
            opacity="0.65"
          >
            E / V vs RHE
          </text>
        </g>

        {/* 3D Isometric Ce–NiCo MOF Coordination Motif */}
        <g
          transform="translate(680, 70)"
          stroke="var(--accent-line)"
          strokeWidth="1"
          opacity="0.7"
        >
          {/* Primary unit cell cube vectors in isometric perspective */}
          <polygon
            points="240,40 380,110 380,270 240,200"
            fill="none"
            stroke="var(--line)"
            strokeWidth="0.75"
          />
          <polygon
            points="100,110 240,40 240,200 100,270"
            fill="none"
            stroke="var(--line)"
            strokeWidth="0.75"
          />
          <polygon
            points="100,270 240,200 380,270 240,340"
            fill="none"
            stroke="var(--line)"
            strokeWidth="0.75"
          />

          {/* Organic linkers (BDC dual struts) */}
          <line
            x1="100"
            y1="110"
            x2="240"
            y2="40"
            stroke="var(--graphic-stroke)"
            strokeWidth="1.2"
          />
          <line
            x1="240"
            y1="40"
            x2="380"
            y2="110"
            stroke="var(--graphic-stroke)"
            strokeWidth="1.2"
          />
          <line
            x1="380"
            y1="110"
            x2="380"
            y2="270"
            stroke="var(--graphic-stroke)"
            strokeWidth="1.2"
          />
          <line
            x1="100"
            y1="270"
            x2="100"
            y2="110"
            stroke="var(--graphic-stroke)"
            strokeWidth="1.2"
          />
          <line
            x1="240"
            y1="200"
            x2="240"
            y2="340"
            stroke="var(--graphic-stroke)"
            strokeWidth="1.2"
          />
          <line
            x1="100"
            y1="270"
            x2="240"
            y2="340"
            stroke="var(--graphic-stroke)"
            strokeWidth="1.2"
          />
          <line
            x1="240"
            y1="340"
            x2="380"
            y2="270"
            stroke="var(--graphic-stroke)"
            strokeWidth="1.2"
          />

          {/* Internal coordination bonds radiating to central metal node */}
          <line
            x1="240"
            y1="190"
            x2="170"
            y2="155"
            stroke="var(--accent-line)"
            strokeDasharray="2 2"
          />
          <line
            x1="240"
            y1="190"
            x2="310"
            y2="155"
            stroke="var(--accent-line)"
            strokeDasharray="2 2"
          />
          <line
            x1="240"
            y1="190"
            x2="240"
            y2="265"
            stroke="var(--accent-line)"
            strokeDasharray="2 2"
          />

          {/* Metal Coordination Nodes */}
          {/* Ni Node */}
          <circle cx="100" cy="110" r="5" fill="var(--atom-ni)" opacity="0.8" />
          <circle cx="380" cy="270" r="5" fill="var(--atom-ni)" opacity="0.8" />

          {/* Co Node */}
          <circle cx="380" cy="110" r="5" fill="var(--atom-co)" opacity="0.8" />
          <circle cx="100" cy="270" r="5" fill="var(--atom-co)" opacity="0.8" />

          {/* Cerium (Ce) Active Dopant Site (Highlighted in Gold) */}
          <circle cx="240" cy="40" r="7.5" fill="var(--atom-ce)" opacity="0.9" />
          <circle
            cx="240"
            cy="40"
            r="12"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="0.75"
            strokeDasharray="2 3"
            opacity="0.85"
          />

          {/* Center Lattice Coordination Node */}
          <circle cx="240" cy="190" r="6" fill="var(--atom-ni)" opacity="0.85" />
          <circle cx="240" cy="340" r="5" fill="var(--atom-co)" opacity="0.8" />

          {/* Benzene Ring Linker Motif along top edge */}
          <g transform="translate(170, 75) rotate(-26) scale(0.65)" opacity="0.7">
            <polygon
              points="15,0 30,8 30,24 15,32 0,24 0,8"
              fill="none"
              stroke="var(--graphic-stroke)"
              strokeWidth="1.2"
            />
            <circle
              cx="15"
              cy="16"
              r="7"
              fill="none"
              stroke="var(--graphic-line)"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
