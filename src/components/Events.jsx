import { calendarUrl, events } from '../data'
import { Divider, EventIcon } from './Ornaments'
import Reveal from './Reveal'

export default function Events({ onShowMap }) {
  return (
    <section id="events" className="paper relative px-4 py-20">
      <Reveal className="text-center">
        <p className="section-title">The Celebrations</p>
        <h2 className="mt-3 font-script text-5xl text-maroon-800 sm:text-6xl">Wedding Festivities</h2>
        <Divider className="mt-4" />
      </Reveal>

      <ol className="relative mx-auto mt-14 max-w-3xl">
        {/* timeline spine */}
        <span className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-gold-400/0 via-gold-400 to-gold-400/0 sm:left-1/2" />

        {events.map((ev, i) => (
          <Reveal as="li" key={ev.id} delay={80} className={`relative mb-12 pl-14 last:mb-0 sm:w-1/2 sm:pl-0 ${i % 2 ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12'}`}>
            {/* node */}
            <span
              className={`absolute left-6 top-8 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-ivory-100 ${
                i % 2 ? 'sm:left-0' : 'sm:left-full'
              }`}
              style={{ background: `linear-gradient(135deg, ${ev.theme.from}, ${ev.theme.to})`, color: ev.theme.accent }}
            >
              <EventIcon type={ev.theme.icon} className="h-7 w-7" />
            </span>

            <article className="group overflow-hidden rounded-3xl shadow-[0_20px_40px_-20px_rgba(59,10,20,.45)] transition duration-500 hover:-translate-y-1">
              <div
                className="relative px-6 pb-5 pt-6 text-ivory-50"
                style={{ background: `linear-gradient(135deg, ${ev.theme.from}, ${ev.theme.to})` }}
              >
                <EventIcon type={ev.theme.icon} className="absolute -bottom-6 -right-6 h-28 w-28 opacity-[0.08]" />
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-script text-[2.6rem] leading-[1.05] sm:text-5xl" style={{ color: ev.theme.accent }}>{ev.name}</h3>
                  <span className="shrink-0 whitespace-nowrap font-urdu text-2xl leading-[2.4]" style={{ color: ev.theme.accent }} lang="ur" dir="rtl">{ev.urdu}</span>
                </div>
                <p className="mt-1 font-serif text-lg font-medium italic leading-snug">{ev.tagline}</p>
              </div>

              <div className="space-y-4 bg-ivory-50 px-6 py-5">
                <Row icon="calendar" title={ev.day} text={ev.date} />
                {ev.times.map((t) => <Row key={t.label} icon="clock" title={t.label} text={t.value} />)}
                <Row icon="pin" title={ev.venue} text={ev.address} />

                <div className="grid grid-cols-2 gap-2 pt-1 [&>*]:px-3">
                  <button type="button" className="btn-gold" onClick={() => onShowMap(ev.id)}>
                    <Glyph name="pin" /> Location
                  </button>
                  <a className="btn-ghost border-gold-400 text-maroon-800 hover:bg-gold-200/40" href={calendarUrl(ev)} target="_blank" rel="noreferrer">
                    <Glyph name="calendar" /> Save Date
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Row({ icon, title, text }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-200/60 text-gold-600">
        <Glyph name={icon} />
      </span>
      <div>
        <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-maroon-700">{title}</p>
        <p className="font-serif text-lg font-semibold leading-snug text-maroon-950">{text}</p>
      </div>
    </div>
  )
}

export function Glyph({ name, className = 'h-4 w-4' }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const d = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" {...p} /><path d="M3 10h18M8 3v4M16 3v4" {...p} /></>,
    clock: <><circle cx="12" cy="12" r="9" {...p} /><path d="M12 7v5l3 2" {...p} /></>,
    pin: <><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" {...p} /><circle cx="12" cy="10" r="2.5" {...p} /></>,
    nav: <path d="M3 11l18-8-8 18-2-8z" {...p} />,
    external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" {...p} />,
    download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" {...p} />,
    eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" {...p} /><circle cx="12" cy="12" r="3" {...p} /></>,
    share: <><circle cx="18" cy="5" r="2.5" {...p} /><circle cx="6" cy="12" r="2.5" {...p} /><circle cx="18" cy="19" r="2.5" {...p} /><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" {...p} /></>,
    close: <path d="M6 6l12 12M18 6L6 18" {...p} />,
    left: <path d="M15 5l-7 7 7 7" {...p} />,
    right: <path d="M9 5l7 7-7 7" {...p} />,
  }
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{d[name]}</svg>
}
