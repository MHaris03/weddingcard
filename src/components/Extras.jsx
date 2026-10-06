import { couple } from '../data'
import { Glyph } from './Events'
import { Divider, Mandala, WaxSeal } from './Ornaments'
import Reveal from './Reveal'

// Generated once at module load so renders stay pure.
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3 + Math.random() * 6) % 100}%`,
  size: `${10 + Math.random() * 10}px`,
  dur: `${11 + Math.random() * 9}s`,
  delay: `${-Math.random() * 18}s`,
  drift: `${(Math.random() - 0.5) * 30}vw`,
}))

export function Petals() {
  return PETALS.map((p, i) => (
    <span
      key={i}
      className="petal"
      style={{ left: p.left, '--size': p.size, '--dur': p.dur, '--delay': p.delay, '--drift': p.drift }}
    />
  ))
}

export function MusicButton({ playing, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/70 bg-maroon-900/90 text-gold-200 shadow-[0_10px_30px_-8px_rgba(0,0,0,.6)] backdrop-blur transition active:scale-90"
    >
      {playing && <span className="absolute inset-0 rounded-full border border-gold-300" style={{ animation: 'pulse-ring 2.4s ease-out infinite' }} />}
      {playing ? (
        <span className="flex h-5 items-end gap-[3px]">
          {[0, 0.25, 0.5, 0.15].map((d) => (
            <span key={d} className="w-[3px] rounded-full bg-gold-300" style={{ animation: `eq .9s ease-in-out ${d}s infinite` }} />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M9 18V6l11-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="17.5" cy="16" r="2.5" />
          <path d="M3 3l18 18" />
        </svg>
      )}
    </button>
  )
}

export function Closing() {
  async function share() {
    const data = { title: `${couple.groomShort} & ${couple.brideShort} — Wedding Invitation`, url: window.location.href }
    if (navigator.share) {
      try { await navigator.share(data) } catch { /* user cancelled */ }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${data.title}\n${data.url}`)}`, '_blank', 'noopener')
    }
  }

  return (
    <footer className="damask relative overflow-hidden px-4 pb-28 pt-20 text-center text-ivory-100">
      <Mandala className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 w-[640px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-10" />
      <Reveal className="relative mx-auto max-w-lg">
        <WaxSeal className="mx-auto h-20 w-20" />
        <p className="mt-6 font-serif text-2xl italic leading-relaxed text-ivory-100">
          Your presence and prayers will make our day truly special.
        </p>
        <Divider className="my-8" />
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-gold-300">With love</p>
        <h2 className="gold-text mt-3 font-script text-6xl">
          {couple.groomShort} &amp; {couple.brideShort}
        </h2>
        <p className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold-200">04 – 06 · 11 · 2026 · {couple.city}</p>

        <button type="button" onClick={share} className="btn-gold mt-10">
          <Glyph name="share" /> Share Invitation
        </button>
      </Reveal>
    </footer>
  )
}
