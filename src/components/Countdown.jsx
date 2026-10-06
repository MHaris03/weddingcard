import { useEffect, useState } from 'react'
import { weddingDate } from '../data'
import { Divider, Mandala } from './Ornaments'
import Reveal from './Reveal'

function remaining() {
  const ms = Math.max(0, weddingDate.getTime() - Date.now())
  return {
    done: ms === 0,
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor(ms / 3600000) % 24,
    Minutes: Math.floor(ms / 60000) % 60,
    Seconds: Math.floor(ms / 1000) % 60,
  }
}

export default function Countdown() {
  const [t, setT] = useState(remaining)

  useEffect(() => {
    const id = setInterval(() => setT(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown" className="damask relative overflow-hidden px-4 py-20 text-center text-ivory-100">
      <Mandala className="animate-spin-slow pointer-events-none absolute -right-40 -top-40 w-96 opacity-20" />
      <Mandala className="animate-spin-slow pointer-events-none absolute -bottom-40 -left-40 w-96 opacity-20" />

      <Reveal className="relative mx-auto max-w-xl">
        <p className="font-arabic text-3xl leading-loose text-gold-300" dir="rtl" lang="ar">
          وَخَلَقْنَاكُمْ أَزْوَاجًا
        </p>
        <p className="mt-2 font-serif text-lg italic text-ivory-100">“And We created you in pairs.”</p>
        <p className="mt-1 font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-300">Surah An-Naba · 78:8</p>

        <Divider className="my-10" />

        <p className="section-title !text-gold-300">Counting down to the Barat</p>
        {t.done ? (
          <p className="gold-text mt-6 font-script text-5xl">Alhamdulillah — the big day is here!</p>
        ) : (
          <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-4">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((k) => (
              <div key={k} className="gold-border rounded-2xl py-4 [--fill:#2a0710] sm:py-6">
                <p className="gold-text font-display text-3xl font-semibold tabular-nums sm:text-5xl">
                  {String(t[k]).padStart(2, '0')}
                </p>
                <p className="mt-1 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-200 sm:text-[11px]">{k}</p>
              </div>
            ))}
          </div>
        )}
        <p className="mt-6 font-serif text-lg italic text-ivory-100">Thursday, 5th November 2026 · In Sha Allah</p>
      </Reveal>
    </section>
  )
}
