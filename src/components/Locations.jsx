import { directionsUrl, events, mapEmbedUrl, mapOpenUrl } from '../data'
import { Glyph } from './Events'
import { Divider } from './Ornaments'
import Reveal from './Reveal'

export default function Locations({ active, onChange }) {
  const ev = events.find((e) => e.id === active) ?? events[0]

  return (
    <section id="locations" className="damask relative px-4 py-20 text-ivory-100">
      <Reveal className="text-center">
        <p className="section-title !text-gold-300">Find your way</p>
        <h2 className="gold-text mt-3 font-script text-5xl sm:text-6xl">Venues &amp; Maps</h2>
        <Divider className="mt-4" />
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-3xl">
        <div role="tablist" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:px-0">
          {events.map((e) => (
            <button
              key={e.id}
              role="tab"
              type="button"
              aria-selected={e.id === ev.id}
              onClick={() => onChange(e.id)}
              className={`shrink-0 rounded-full border px-4 py-2 font-display text-[11px] uppercase tracking-[0.18em] transition ${
                e.id === ev.id
                  ? 'border-gold-300 bg-gradient-to-br from-gold-300 to-gold-500 font-semibold text-maroon-950 shadow-lg'
                  : 'border-gold-400/40 text-gold-200 hover:border-gold-300'
              }`}
            >
              {e.name}
            </button>
          ))}
        </div>

        <div className="gold-border mt-6 overflow-hidden rounded-3xl [--fill:#2a0710]">
          <div className="map-frame relative aspect-[4/3] w-full bg-maroon-900 sm:aspect-[16/9]">
            <iframe
              key={ev.id}
              title={`Map — ${ev.venue}`}
              src={mapEmbedUrl(ev.mapQuery)}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
                {ev.name} · {ev.day}, {ev.date}
                {ev.times[0] ? ` · ${ev.times[0].value}` : ''}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-gold-200">{ev.venue}</h3>
              <p className="font-serif text-lg text-ivory-100">{ev.address}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <a className="btn-gold" href={mapOpenUrl(ev)} target="_blank" rel="noreferrer">
                <Glyph name="external" /> Open Map
              </a>
              <a className="btn-ghost border-gold-400/60 text-gold-200 hover:bg-gold-400/10" href={directionsUrl(ev)} target="_blank" rel="noreferrer">
                <Glyph name="nav" /> Directions
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
