// Background music.
// If public/music.mp3 exists it is played on loop; otherwise a gentle
// santoor-style melody over a tanpura drone is synthesised live with the
// Web Audio API, so the card always has sound without needing an audio file.

const CUSTOM_TRACK = '/music.mp3'

// Raag Yaman flavour, semitone offsets from Sa. null = rest.
const MELODY = [
  12, 11, 9, 7, 9, 7, 6, 4, 2, 4, 6, 7, 4, null, null, null,
  7, 9, 11, 12, 14, 12, 11, 9, 11, 9, 7, 6, 7, null, null, null,
  4, 6, 7, 9, 7, 6, 4, 2, 0, 2, 4, 7, 6, 4, 2, null,
  -1, 2, 4, 6, 7, 6, 4, 2, 4, 2, -1, 2, 0, null, null, null,
]
const STEP = 0.36 // seconds per melody note
const SA = 261.63 // C4

const freq = (semi) => SA * Math.pow(2, semi / 12)

function makeImpulse(ctx, seconds = 3) {
  const len = ctx.sampleRate * seconds
  const buf = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch)
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6)
  }
  return buf
}

function createSynth() {
  let ctx, master, timer, nextTime, step

  function pluck(f, t, { gain = 0.16, decay = 1.6, bright = 3200 } = {}) {
    const g = ctx.createGain()
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(bright, t)
    lp.frequency.exponentialRampToValueAtTime(600, t + decay)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay)
    lp.connect(g).connect(master)
    for (const [mult, type, level] of [[1, 'triangle', 1], [2, 'sine', 0.35], [3.01, 'sine', 0.12]]) {
      const o = ctx.createOscillator()
      const og = ctx.createGain()
      o.type = type
      o.frequency.setValueAtTime(f * mult, t)
      og.gain.value = level
      o.connect(og).connect(lp)
      o.start(t)
      o.stop(t + decay + 0.05)
    }
  }

  function tanpura(t) {
    // Pa - Sa - Sa - Sa(low), the classic tanpura cycle
    const notes = [freq(-17), freq(-12), freq(-12), freq(-24)]
    notes.forEach((f, i) => pluck(f, t + i * STEP * 2, { gain: 0.07, decay: 4, bright: 1400 }))
  }

  function schedule() {
    while (nextTime < ctx.currentTime + 0.25) {
      const note = MELODY[step % MELODY.length]
      if (note !== null) pluck(freq(note), nextTime, { gain: 0.12 + Math.random() * 0.03 })
      if (step % 8 === 0) tanpura(nextTime)
      // soft echo note an octave up every bar for sparkle
      if (step % 16 === 4 && note !== null) pluck(freq(note + 12), nextTime + STEP / 2, { gain: 0.04, decay: 1.2 })
      nextTime += STEP
      step++
    }
  }

  return {
    play() {
      if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)()
        master = ctx.createGain()
        const dry = ctx.createGain()
        const wet = ctx.createGain()
        const verb = ctx.createConvolver()
        verb.buffer = makeImpulse(ctx)
        dry.gain.value = 0.75
        wet.gain.value = 0.45
        master.connect(dry).connect(ctx.destination)
        master.connect(verb).connect(wet).connect(ctx.destination)
      }
      ctx.resume()
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setValueAtTime(0.0001, ctx.currentTime)
      master.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 2)
      step = 0
      nextTime = ctx.currentTime + 0.1
      clearInterval(timer)
      timer = setInterval(schedule, 60)
      schedule()
    },
    // Retry after a user gesture if the browser blocked autoplay.
    resume() {
      if (ctx && ctx.state !== 'running' && timer) ctx.resume()
    },
    pause() {
      if (!ctx) return
      clearInterval(timer)
      master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.25)
      setTimeout(() => ctx.state === 'running' && !timer && ctx.suspend(), 1200)
      timer = null
    },
  }
}

function createTrack() {
  const audio = new Audio(CUSTOM_TRACK)
  audio.loop = true
  audio.volume = 0.6
  let wanted = false
  return {
    play: () => { wanted = true; audio.play().catch(() => {}) },
    resume: () => { if (wanted && audio.paused) audio.play().catch(() => {}) },
    pause: () => { wanted = false; audio.pause() },
  }
}

// Detect a custom track up-front so play() can run synchronously inside the
// tap handler (required for audio to start on iOS/Android).
let hasCustomTrack = false
fetch(CUSTOM_TRACK, { method: 'HEAD' })
  .then((r) => { hasCustomTrack = r.ok && (r.headers.get('content-type') || '').startsWith('audio') })
  .catch(() => {})

let player = null
export const music = {
  play() {
    player ??= hasCustomTrack ? createTrack() : createSynth()
    player.play()
  },
  pause() {
    player?.pause()
  },
  resume() {
    player?.resume()
  },
}

// Browsers only allow sound after the visitor interacts with the page, so when
// the card auto-opens, the music actually starts on the first tap/scroll/key.
for (const type of ['pointerdown', 'touchstart', 'keydown', 'wheel']) {
  window.addEventListener(type, () => music.resume(), { passive: true })
}
