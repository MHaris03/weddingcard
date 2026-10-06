// Decorative SVG pieces shared across sections.

export function Divider({ className = '' }) {
  return (
    <svg viewBox="0 0 240 24" className={`mx-auto h-5 w-56 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="dv" x1="0" x2="1">
          <stop offset="0" stopColor="#d4af37" stopOpacity="0" />
          <stop offset=".5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 12H96M144 12H240" stroke="url(#dv)" strokeWidth="1" />
      <path d="M120 2l7 10-7 10-7-10z" fill="#d4af37" />
      <path d="M104 12l6-5 6 5-6 5zM124 12l6-5 6 5-6 5z" fill="none" stroke="#d4af37" strokeWidth="1" />
      <circle cx="98" cy="12" r="1.6" fill="#d4af37" />
      <circle cx="142" cy="12" r="1.6" fill="#d4af37" />
    </svg>
  )
}

const PETALS = Array.from({ length: 16 }, (_, i) => i * 22.5)

export function Mandala({ className = '', color = '#d4af37' }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth=".6">
        <circle r="96" />
        <circle r="90" strokeDasharray="2 3" />
        <circle r="44" />
        <circle r="20" />
        {PETALS.map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M0-44C14-58 14-74 0-88C-14-74-14-58 0-44Z" />
            <path d="M0-50C7-60 7-70 0-80C-7-70-7-60 0-50Z" />
            <path d="M0-20C6-28 6-36 0-44C-6-36-6-28 0-20Z" />
            <circle cy="-92" r="2" fill={color} />
          </g>
        ))}
      </g>
    </svg>
  )
}

export function Lantern({ className = '', chain = 80 }) {
  return (
    <svg viewBox={`0 0 40 ${chain + 70}`} className={className} aria-hidden="true">
      <defs>
        <radialGradient id="lglow">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset=".5" stopColor="#ffc857" stopOpacity=".7" />
          <stop offset="1" stopColor="#ffc857" stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="20" y1="0" x2="20" y2={chain} stroke="#b8902a" strokeWidth="1" strokeDasharray="3 2" />
      <g transform={`translate(0 ${chain})`}>
        <circle cx="20" cy="34" r="22" fill="url(#lglow)" className="animate-flicker" />
        <path d="M14 2h12l2 6H12z" fill="#b8902a" />
        <path d="M11 8h18l4 10v22l-4 8H11l-4-8V18z" fill="rgba(255,214,120,.35)" stroke="#d4af37" strokeWidth="1.4" />
        <path d="M20 8v40M7 18h26M7 40h26" stroke="#d4af37" strokeWidth=".8" />
        <ellipse cx="20" cy="30" rx="3" ry="6" fill="#fff3c4" className="animate-flicker" />
        <path d="M12 48h16l-4 8h-8z" fill="#b8902a" />
        <path d="M20 56v8" stroke="#b8902a" strokeWidth="1.2" />
        <circle cx="20" cy="66" r="2" fill="#d4af37" />
      </g>
    </svg>
  )
}

// Mughal ogee arch used as a frame. The dome keeps its aspect ratio (so its
// narrow tip never squeezes the text); only the straight sides stretch.
export function ArchFrame({ className = '' }) {
  const grad = (
    <linearGradient id="arch" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#8a6a1f" />
      <stop offset=".35" stopColor="#f6e6b4" />
      <stop offset=".6" stopColor="#d4af37" />
      <stop offset="1" stopColor="#8a6a1f" />
    </linearGradient>
  )
  const outer = 'M6 241C6 160 110 146 160 92C178 72 192 52 200 18C208 52 222 72 240 92C290 146 394 160 394 241'
  const inner = 'M20 241C20 172 118 158 170 106C184 90 194 72 200 50C206 72 216 90 230 106C282 158 380 172 380 241'
  return (
    <div className={`pointer-events-none flex flex-col ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 240" className="block w-full shrink-0">
        <defs>{grad}</defs>
        <path d={outer} fill="none" stroke="url(#arch)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <path d={inner} fill="none" stroke="url(#arch)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="-mt-px block w-full flex-1">
        <path d="M6 0V100M394 0V100" stroke="#c9a14a" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <path d="M20 0V100M380 0V100" stroke="#d4af37" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

export function EventIcon({ type, className = '' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    henna: (
      <g {...common}>
        <path d="M24 44c-8 0-12-6-12-13V18a3 3 0 016 0v8M18 18v-6a3 3 0 016 0v14M24 14v-4a3 3 0 016 0v16M30 14a3 3 0 016 0v17c0 7-4 13-12 13" />
        <circle cx="24" cy="32" r="4" />
        <path d="M24 28v-2M24 38v-2M20 32h-2M30 32h-2" />
      </g>
    ),
    sehra: (
      <g {...common}>
        <path d="M10 18c4-6 24-6 28 0" />
        <path d="M10 18c2 2 26 2 28 0" />
        {[12, 16, 20, 24, 28, 32, 36].map((x) => (
          <g key={x}>
            <path d={`M${x} 19v${x % 8 === 0 ? 22 : 18}`} strokeDasharray="1.5 2.5" />
            <circle cx={x} cy={x % 8 === 0 ? 43 : 39} r="1.4" fill="currentColor" />
          </g>
        ))}
        <path d="M24 12l2-4 2 4" />
      </g>
    ),
    rings: (
      <g {...common}>
        <circle cx="19" cy="29" r="10" />
        <circle cx="29" cy="29" r="10" />
        <path d="M16 15l3-5 3 5-3 4z" />
      </g>
    ),
    chandelier: (
      <g {...common}>
        <path d="M24 4v8M12 20c0 6 24 6 24 0M16 20v-6h16v6M10 24c4 6 24 6 28 0" />
        <path d="M12 26v6M24 28v8M36 26v6" />
        <path d="M12 32l-2 3 2 3 2-3zM24 36l-2 3 2 3 2-3zM36 32l-2 3 2 3 2-3z" />
      </g>
    ),
  }
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {paths[type]}
    </svg>
  )
}

// Wavy-edged wax seal.
const SEAL_PATH = (() => {
  const pts = []
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2
    const r = 48 + Math.sin(i * 1.7) * 1.6 + Math.cos(i * 3.1) * 1.2
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`)
  }
  return `M${pts.join('L')}Z`
})()

export function WaxSeal({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#fbeec2" />
          <stop offset=".45" stopColor="#d9b766" />
          <stop offset=".85" stopColor="#a8822f" />
          <stop offset="1" stopColor="#7d5f1d" />
        </radialGradient>
        <filter id="emboss">
          <feGaussianBlur in="SourceAlpha" stdDeviation=".8" result="b" />
          <feOffset dx=".8" dy="1" in="b" result="o" />
          <feComposite in="SourceGraphic" in2="o" operator="over" />
        </filter>
      </defs>
      <path d={SEAL_PATH} fill="url(#wax)" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#8a6a1f" strokeWidth="1.2" opacity=".7" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#fff3c4" strokeWidth=".6" opacity=".6" strokeDasharray="1 2" />
      <text x="50" y="60" textAnchor="middle" fontFamily="Great Vibes, cursive" fontSize="30" fill="#7d5f1d" filter="url(#emboss)">
        T&amp;S
      </text>
    </svg>
  )
}
