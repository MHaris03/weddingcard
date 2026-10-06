import { useState } from 'react'
import Cards from './components/Cards'
import Countdown from './components/Countdown'
import Envelope from './components/Envelope'
import Events from './components/Events'
import { Closing, MusicButton, Petals } from './components/Extras'
import Hero from './components/Hero'
import Locations from './components/Locations'
import { events } from './data'
import { music } from './music'

// Visiting with ?open skips the envelope intro (music then starts from the button).
const skipIntro = new URLSearchParams(window.location.search).has('open')

function App() {
  const [envelope, setEnvelope] = useState(!skipIntro)
  const [playing, setPlaying] = useState(false)
  const [revealed, setRevealed] = useState(skipIntro)
  const [mapId, setMapId] = useState(events[0].id)

  function startMusic() {
    music.play()
    setPlaying(true)
    setTimeout(() => setRevealed(true), 1800)
  }

  function toggleMusic() {
    if (playing) music.pause()
    else music.play()
    setPlaying(!playing)
  }

  function showMap(id) {
    setMapId(id)
    document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {envelope && <Envelope onOpen={startMusic} onDone={() => setEnvelope(false)} />}

      <main className={`${envelope ? 'h-screen overflow-hidden' : ''} ${revealed ? '' : 'pre-reveal'}`}>
        <Hero />
        <Countdown />
        <Events onShowMap={showMap} />
        <Locations active={mapId} onChange={setMapId} />
        <Cards />
        <Closing />
      </main>

      {!envelope && <Petals />}
      <MusicButton playing={playing} onToggle={toggleMusic} />
    </>
  )
}

export default App
