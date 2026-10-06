import { useEffect, useState } from 'react'
import { invitationCards, pdfUrl } from '../data'
import { Glyph } from './Events'
import { Divider } from './Ornaments'
import Reveal from './Reveal'

export default function Cards() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % invitationCards.length)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + invitationCards.length) % invitationCards.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <section id="cards" className="paper px-4 py-20">
      <Reveal className="text-center">
        <p className="section-title">Invitation Cards</p>
        <h2 className="mt-3 font-script text-5xl text-maroon-800 sm:text-6xl">Read the Invitation</h2>
        <Divider className="mt-4" />
        <p className="mx-auto mt-4 max-w-md font-serif text-lg font-medium italic text-maroon-800">Tap a card to view it in full, or open the complete PDF.</p>
      </Reveal>

      <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[12vw] pb-6 sm:mx-auto sm:max-w-4xl sm:justify-center sm:overflow-visible sm:px-0">
        {invitationCards.map((c, i) => (
          <Reveal key={c.src} delay={i * 120} className="w-[72vw] shrink-0 snap-center sm:w-1/3 sm:shrink">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full text-left"
              aria-label={`View ${c.title}`}
            >
              <div className="gold-border overflow-hidden rounded-2xl p-1.5 shadow-[0_24px_40px_-22px_rgba(59,10,20,.6)] transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg]">
                <img src={c.src} alt={c.title} loading="lazy" className="aspect-[2/3] w-full rounded-xl object-cover object-top" />
              </div>
              <p className="mt-3 text-center font-display text-[11px] uppercase tracking-[0.25em] text-maroon-800">{c.title}</p>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4 flex flex-wrap justify-center gap-3">
        <a className="btn-gold" href={pdfUrl} target="_blank" rel="noreferrer">
          <Glyph name="eye" /> View PDF
        </a>
        <a className="btn-ghost border-gold-400 text-maroon-800 hover:bg-gold-200/40" href={pdfUrl} download="Tayyab-Sania-Wedding-Invitation.pdf">
          <Glyph name="download" /> Download PDF
        </a>
      </Reveal>

      {open !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-maroon-950/90 p-4 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <img
            src={invitationCards[open].src}
            alt={invitationCards[open].title}
            className="animate-fade-up max-h-[88vh] max-w-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button type="button" aria-label="Close" className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-gold-200" onClick={() => setOpen(null)}>
            <Glyph name="close" className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Previous card"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-gold-200"
            onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + invitationCards.length) % invitationCards.length) }}
          >
            <Glyph name="left" className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next card"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-gold-200"
            onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % invitationCards.length) }}
          >
            <Glyph name="right" className="h-6 w-6" />
          </button>
          <p className="absolute bottom-4 font-display text-[11px] uppercase tracking-[0.3em] text-gold-200">{invitationCards[open].title}</p>
        </div>
      )}
    </section>
  )
}
