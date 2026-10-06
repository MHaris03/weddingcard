// All invitation content lives here so details can be edited in one place.

export const couple = {
  groom: 'Tayyab Nisar',
  groomShort: 'Tayyab',
  groomParent: 'S/O Nisar Ahmad',
  bride: 'Sania Shafique',
  brideShort: 'Sania',
  brideParent: 'D/O Mr. Shafique',
  city: 'Lahore',
}

// Countdown target: Barat departure, Thursday 5 Nov 2026, 6:00 PM PKT (UTC+5)
export const weddingDate = new Date('2026-11-05T18:00:00+05:00')

export const events = [
  {
    id: 'mehndi',
    name: 'Mehndi',
    urdu: 'مہندی',
    tagline: 'An evening of colours, dholki & henna',
    day: 'Wednesday',
    date: '4 November 2026',
    times: [{ label: 'Starts', value: '6:00 PM' }],
    venue: 'DeSom',
    address: 'Girja Chowk, Cantt, Lahore',
    mapQuery: 'Desom, Girja Chowk, Cantt, Lahore',
    mapLink: 'https://maps.app.goo.gl/16bNp46QBoXDMVdG7?g_st=aw',
    calendar: { start: '20261104T130000Z', end: '20261104T180000Z' },
    theme: { from: '#1f5f3a', to: '#c2185b', accent: '#f4c430', icon: 'henna' },
  },
  {
    id: 'sehra',
    name: 'Sehra Bandi',
    urdu: 'سہرا بندی',
    tagline: 'Tying of the sehra with family blessings',
    day: 'Thursday',
    date: '5 November 2026',
    times: [{ label: 'Starts', value: '5:00 PM' }],
    venue: 'Nisar Home',
    address: 'Usman Colony, Soling Road, Lahore',
    mapQuery: 'Usman Colony, Lahore',
    mapLink: null,
    calendar: { start: '20261105T120000Z', end: '20261105T130000Z' },
    theme: { from: '#8a5a12', to: '#c8962e', accent: '#fff1c1', icon: 'sehra' },
  },
  {
    id: 'barat',
    name: 'Barat',
    urdu: 'بارات',
    tagline: 'The grand wedding ceremony',
    day: 'Thursday',
    date: '5 November 2026',
    times: [{ label: 'Barat Departure', value: '6:00 PM' }],
    venue: 'Bel Avenir Event Complex',
    address: '74-A Mohlanwal Road, Iqbal Avenue Phase 3, Lahore',
    mapQuery: 'Bel Avenir Event Complex, 74-A Mohlanwal Road, Iqbal Avenue Phase 3, Lahore',
    mapLink: 'https://maps.app.goo.gl/oHs72CpSeViAXmXu7?g_st=aw',
    calendar: { start: '20261105T130000Z', end: '20261105T180000Z' },
    theme: { from: '#5c0b1e', to: '#a3182f', accent: '#e8c46a', icon: 'rings' },
  },
  {
    id: 'walima',
    name: 'Walima',
    urdu: 'ولیمہ',
    tagline: 'Reception celebrating the newlyweds',
    day: 'Friday',
    date: '6 November 2026',
    times: [{ label: 'Starts', value: '7:00 PM' }],
    venue: 'Dhanak Event Complex',
    address: 'Garrison Golf & Country Club, Hall #15, Lahore',
    mapQuery: 'Dhanak Events Complex, Garrison Golf and Country Club, Lahore',
    mapLink: 'https://maps.app.goo.gl/dWMbpvf41Q2wbhNJ9?g_st=aw',
    calendar: { start: '20261106T140000Z', end: '20261106T180000Z' },
    theme: { from: '#0f0f14', to: '#3a2f1a', accent: '#d4af37', icon: 'chandelier' },
  },
]

export const invitationCards = [
  { src: '/cards/mehndi.jpg', title: 'Mehndi Celebration' },
  { src: '/cards/barat.jpg', title: 'Barat Ceremony' },
  { src: '/cards/walima.jpg', title: 'Walima Reception' },
]

export const pdfUrl = '/wedding-invitation.pdf'

export function mapEmbedUrl(query) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}

export function mapOpenUrl(event) {
  return event.mapLink ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`
}

export function directionsUrl(event) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.mapQuery)}`
}

export function calendarUrl(event) {
  const dates = event.calendar.allDay ?? `${event.calendar.start}/${event.calendar.end}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.name} — ${couple.groomShort} & ${couple.brideShort}`,
    dates,
    location: `${event.venue}, ${event.address}`,
    details: `${event.tagline}. Your presence will make our day special.`,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}
