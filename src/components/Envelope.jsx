import { useEffect, useRef, useState } from 'react'
import { couple } from '../data'
import { WaxSeal } from './Ornaments'

const AUTO_OPEN_MS = 2200

// Full-screen sealed envelope. It opens by itself after a moment (or sooner if
// the seal is tapped), starts the music and reveals the invitation underneath.
export default function Envelope({ onOpen, onDone }) {
  const [stage, setStage] = useState('closed') // closed → opening → leaving
  const opened = useRef(false)

  function open() {
    if (opened.current) return
    opened.current = true
    setStage('opening')
    onOpen()
    setTimeout(() => setStage('leaving'), 2000)
    setTimeout(onDone, 3000)
  }

  useEffect(() => {
    const id = setTimeout(() => open(), AUTO_OPEN_MS)
    return () => clearTimeout(id)
  })

  return (
    <div
      className={`envelope fixed inset-0 z-50 overflow-hidden bg-maroon-950 transition-all duration-1000 ${
        stage === 'opening' ? 'opening' : ''
      } ${stage === 'leaving' ? 'opening scale-110 opacity-0' : ''}`}
    >
      {/* paper peeking from inside */}
      <div className="paper absolute inset-x-[6%] top-[8%] bottom-[30%] rounded-sm" />

      <div className="env-edges absolute inset-0">
        <div className="env-piece env-left damask" />
        <div className="env-piece env-right damask" />
        <div className="env-piece env-bottom damask" />
      </div>
      <div className="env-edges absolute inset-0" style={{ zIndex: 2 }}>
        <div className="env-piece env-top damask" />
      </div>

      <div className="env-light" style={{ zIndex: 3 }} />

      {/* top label */}
      <div className="env-hint absolute inset-x-0 top-[9%] z-[4] text-center transition-opacity duration-500">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.45em] text-gold-300">The Wedding Of</p>
      </div>

      <div className="absolute left-1/2 top-[50%] z-[5] -translate-x-1/2 -translate-y-1/2">
        <button type="button" onClick={open} aria-label="Open the invitation" className="seal relative block focus:outline-none">
          <span className="absolute inset-0 rounded-full bg-gold-300/40" style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
          <WaxSeal className="relative h-28 w-28 drop-shadow-[0_8px_14px_rgba(0,0,0,.55)] sm:h-32 sm:w-32" />
        </button>
      </div>

      <div className="env-hint absolute inset-x-0 bottom-[11%] z-[4] px-6 text-center transition-opacity duration-500">
        <h1 className="gold-text font-script text-5xl leading-tight sm:text-6xl">
          {couple.groomShort} &amp; {couple.brideShort}
        </h1>
        <p className="mt-2 font-serif text-base italic text-gold-200">4 · 5 · 6 November 2026 — {couple.city}</p>
        <p className="mt-6 animate-pulse font-display text-xs font-semibold uppercase tracking-[0.35em] text-gold-200">
          Opening your invitation…
        </p>
      </div>
    </div>
  )
}
