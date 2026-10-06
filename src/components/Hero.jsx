import { couple } from '../data'
import { ArchFrame, Divider, Lantern, Mandala } from './Ornaments'

export default function Hero() {
  return (
    <header className="paper relative overflow-hidden px-4 pb-16 pt-6">
      {/* hanging lanterns */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-2 sm:px-10">
        <Lantern className="animate-swing h-40 w-8 sm:h-52 sm:w-10" chain={70} />
        <Lantern className="animate-swing hidden h-28 w-7 sm:block" chain={30} />
        <div className="flex-1" />
        <Lantern className="animate-swing hidden h-28 w-7 sm:block" chain={30} />
        <Lantern className="animate-swing h-40 w-8 sm:h-52 sm:w-10" chain={70} />
      </div>

      <div className="relative mx-auto mt-6 max-w-md sm:max-w-lg">
        <ArchFrame className="absolute inset-0 h-full w-full" />
        <Mandala className="animate-spin-slow pointer-events-none absolute left-1/2 top-[36%] w-[115%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />

        <div className="relative px-9 pb-12 pt-[38%] text-center sm:px-14 sm:pt-[42%]">
          <p className="animate-fade-up font-arabic text-[1.7rem] font-bold leading-[2.2] text-gold-600 sm:text-3xl" dir="rtl" lang="ar">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="animate-fade-up mx-auto mt-3 max-w-[17rem] font-display text-[11px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-maroon-800 [animation-delay:.2s] sm:text-xs">
            In the name of Allah, the Most Beneficent, the Most Merciful
          </p>

          <Divider className="my-6 animate-fade-up [animation-delay:.3s]" />

          <p className="animate-fade-up font-serif text-xl font-medium italic leading-relaxed text-maroon-800 [animation-delay:.4s]">
            You are cordially invited to celebrate
            <br />
            the wedding of
          </p>

          <div className="animate-fade-up mt-6 [animation-delay:.6s]">
            <h1 className="gold-text-deep font-script text-[2.9rem] leading-[1.2] sm:text-6xl">{couple.groom}</h1>
            <p className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.22em] text-maroon-800">{couple.groomParent}</p>
          </div>

          <div className="animate-fade-up my-4 flex items-center justify-center gap-3 [animation-delay:.8s]">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400" />
            <span className="font-script text-5xl text-maroon-700">&amp;</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400" />
          </div>

          <div className="animate-fade-up [animation-delay:1s]">
            <h1 className="gold-text-deep font-script text-[2.9rem] leading-[1.2] sm:text-6xl">{couple.bride}</h1>
            <p className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.22em] text-maroon-800">{couple.brideParent}</p>
          </div>

          <Divider className="my-7" />

          <div className="flex items-stretch justify-center gap-3 font-display text-maroon-800">
            {[
              ['Wed', '04', 'Mehndi'],
              ['Thu', '05', 'Barat'],
              ['Fri', '06', 'Walima'],
            ].map(([d, n, e], i) => (
              <div key={e} className="flex items-center gap-3">
                {i > 0 && <span className="h-12 w-px bg-gold-400/60" />}
                <div className="text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon-700">{d}</p>
                  <p className="text-3xl font-semibold text-gold-600">{n}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">{e}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-maroon-800">November 2026 · {couple.city}</p>
        </div>
      </div>

      <a href="#countdown" className="animate-float mx-auto mt-4 flex w-fit flex-col items-center text-gold-600" aria-label="Scroll down">
        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.4em]">Scroll</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </header>
  )
}
