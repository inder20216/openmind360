import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, ShoppingBag, Shirt, Hotel, Mic, Phone, ArrowLeft, ShieldCheck } from 'lucide-react'

// Same FAQ Bot server as the site's chat/voice widget (ChatVoiceWidget.jsx),
// just the /demo-* routes — see OpenMind FAQ Bot/server/src/demoBots.js.
// TODO: update to the real deployed URL once that server is hosted (same
// pending item as VOICE_SERVER_URL in ChatVoiceWidget.jsx).
const VOICE_SERVER_URL = 'http://localhost:3010'
const LEAD_CAPTURE_URL = 'https://automation.openmindhelpline.com/webhook/openmind-chatbot-lead-capture'
const MAX_CALL_MS = 2 * 60 * 1000 + 30 * 1000

const countryCodes = ['+91', '+1', '+44', '+971', '+65', '+61', '+966', '+974', '+968', '+973', '+965', '+880', '+92', '+94', '+977']

const isValidName = (v) => /[a-zA-Z]/.test(v) && v.trim().length >= 2
const isValidPhone = (v) => /^\d{7,15}$/.test(v.trim())
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

// Mirrors OpenMind FAQ Bot/server/src/demoBots.js meta — kept static here so
// the cards render even if the voice server happens to be down; only
// actually starting a call needs it reachable.
const BOTS = [
  { key: 'healthcare', Icon: Stethoscope, displayName: 'Suraksha Diagnostics & Child Care Centre', tagline: 'Ask Ananya about vaccines, labs & scans', accentColor: '#0d9488', description: "Books kids' vaccinations, lab tests, and prenatal scans by voice." },
  { key: 'ecommerce', Icon: ShoppingBag, displayName: 'TrendMart', tagline: 'Ask Kavya about your order', accentColor: '#7c3aed', description: 'Tracks orders and answers shipping/returns questions.' },
  { key: 'retail', Icon: Shirt, displayName: 'Urban Threads', tagline: "Ask Riya what's in stock", accentColor: '#ea580c', description: 'Checks item/size availability before a store visit.' },
  { key: 'hospitality', Icon: Hotel, displayName: 'The Grand Vista Hotel', tagline: 'Ask Meera about rooms & rates', accentColor: '#1d4ed8', description: 'Compares rooms and quotes a total price for a stay.' },
]

function LeadGate({ onSubmit }) {
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const isValid = isValidName(name) && isValidPhone(phone) && isValidEmail(email)

  return (
    <div className="rounded-[24px] border border-[#eef2f6] bg-white p-6 md:p-8 max-w-[560px] mx-auto">
      <div className="flex items-center gap-2 mb-1">
        <ShieldCheck className="w-4 h-4 text-[#2563eb]" />
        <span className="text-[11px] font-[700] tracking-[0.14em] text-[#2563eb]">QUICK DETAILS FIRST</span>
      </div>
      <p className="text-[13px] leading-[1.6] text-[#64748b] mb-5">
        So we can follow up if you want a version of this built for your own business. Takes 10 seconds — then talk to any of the four demo bots below.
      </p>
      <form
        onSubmit={(e) => { e.preventDefault(); if (isValid) onSubmit({ name: name.trim(), countryCode, phone: phone.trim(), email: email.trim() }) }}
        className="grid sm:grid-cols-2 gap-3"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="px-4 py-3 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb]/40"
        />
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="px-2.5 py-3 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0] text-[13px] text-[#0f172a] outline-none focus:ring-2 focus:ring-[#2563eb]/30"
          >
            {countryCodes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="Contact number"
            className="flex-1 min-w-0 px-4 py-3 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb]/40"
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="sm:col-span-2 px-4 py-3 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb]/40"
        />
        <button
          type="submit"
          disabled={!isValid}
          className="sm:col-span-2 mt-1 h-11 rounded-full bg-[#2563eb] text-white text-[13px] font-[700] hover:bg-[#1d4ed8] transition disabled:opacity-40 disabled:hover:bg-[#2563eb]"
        >
          Unlock the demo bots
        </button>
      </form>
    </div>
  )
}

function BotCard({ bot, onSelect }) {
  const { Icon } = bot
  return (
    <button
      type="button"
      onClick={() => onSelect(bot)}
      className="group text-left rounded-[20px] border border-[#eef2f6] bg-white p-5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{ background: `${bot.accentColor}14` }}>
          <Icon className="w-5 h-5" style={{ color: bot.accentColor }} />
        </div>
        <span className="mt-1 w-8 h-8 rounded-full bg-[#f8fafc] border border-[#eef2f6] flex items-center justify-center group-hover:bg-[#eff6ff] transition-colors">
          <Phone className="w-3.5 h-3.5" style={{ color: bot.accentColor }} />
        </span>
      </div>
      <h3 className="mt-4 text-[14px] font-[700] leading-tight text-[#0f172a]">{bot.displayName}</h3>
      <p className="mt-1 text-[12px] font-[600]" style={{ color: bot.accentColor }}>{bot.tagline}</p>
      <p className="mt-2.5 text-[12px] leading-[1.55] text-[#64748b]">{bot.description}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-[700] tracking-wide text-[#0f172a]">
        Talk to this demo <span aria-hidden>→</span>
      </span>
    </button>
  )
}

function CallPanel({ bot, contact, onBack }) {
  const [status, setStatus] = useState('idle') // idle | connecting | listening | speaking | ended | error
  const [errorText, setErrorText] = useState('')
  const [transcript, setTranscript] = useState([])
  const [remainingMs, setRemainingMs] = useState(MAX_CALL_MS)
  const pcRef = useRef(null)
  const dcRef = useRef(null)
  const micTrackRef = useRef(null)
  const timerIntervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [transcript])

  useEffect(() => () => hangUp(), []) // eslint-disable-line react-hooks/exhaustive-deps

  function addBubble(from, text) {
    if (!text) return
    setTranscript((t) => [...t, { from, text }])
  }

  function startTimer() {
    const startedAt = Date.now()
    timerIntervalRef.current = setInterval(() => {
      setRemainingMs(Math.max(0, MAX_CALL_MS - (Date.now() - startedAt)))
    }, 1000)
    timeoutRef.current = setTimeout(() => {
      addBubble('system', 'Demo call time limit (2:30) reached.')
      hangUp()
    }, MAX_CALL_MS)
  }

  function hangUp() {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timerIntervalRef.current = null
    timeoutRef.current = null
    if (micTrackRef.current) {
      micTrackRef.current.enabled = false
      micTrackRef.current.stop()
    }
    if (pcRef.current) {
      pcRef.current.getSenders().forEach((s) => s.track && s.track.stop())
      pcRef.current.close()
    }
    pcRef.current = null
    dcRef.current = null
    micTrackRef.current = null
  }

  async function handleFunctionCall(msg) {
    const { call_id, name } = msg
    let args = {}
    try { args = msg.arguments ? JSON.parse(msg.arguments) : {} } catch { /* leave {} */ }

    let result
    try {
      const res = await fetch(`${VOICE_SERVER_URL}/api/demo-tools/${encodeURIComponent(name)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args),
      })
      result = await res.json()
    } catch {
      result = { error: 'Tool execution failed.' }
    }

    if (!dcRef.current) return
    dcRef.current.send(JSON.stringify({
      type: 'conversation.item.create',
      item: { type: 'function_call_output', call_id, output: JSON.stringify(result) },
    }))
    dcRef.current.send(JSON.stringify({ type: 'response.create' }))
  }

  function onDataChannelMessage(event) {
    let msg
    try { msg = JSON.parse(event.data) } catch { return }

    switch (msg.type) {
      case 'input_audio_buffer.speech_started':
        setStatus('listening')
        break
      case 'conversation.item.input_audio_transcription.completed':
        addBubble('visitor', msg.transcript)
        break
      case 'response.output_audio_transcript.done':
        addBubble('bot', msg.transcript)
        break
      case 'response.created':
        setStatus('speaking')
        if (micTrackRef.current) micTrackRef.current.enabled = false
        break
      case 'response.done':
        setStatus('listening')
        if (micTrackRef.current) micTrackRef.current.enabled = true
        break
      case 'response.function_call_arguments.done':
        handleFunctionCall(msg)
        break
      case 'error':
        addBubble('system', msg.error?.message || 'An error occurred.')
        break
      default:
        break
    }
  }

  async function onDataChannelOpen() {
    startTimer()
    try {
      const configRes = await fetch(`${VOICE_SERVER_URL}/demo-session-config?bot=${bot.key}`)
      const sessionUpdateEvent = await configRes.json()
      dcRef.current.send(JSON.stringify(sessionUpdateEvent))
      dcRef.current.send(JSON.stringify({ type: 'response.create' }))
    } catch {
      addBubble('system', 'Failed to configure the demo bot.')
      setStatus('error')
    }
  }

  async function startCall() {
    setStatus('connecting')
    setErrorText('')

    let micStream
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setStatus('error')
      setErrorText('Microphone permission denied.')
      return
    }

    try {
      const pc = new RTCPeerConnection()
      pcRef.current = pc

      const remoteAudio = new Audio()
      remoteAudio.autoplay = true
      pc.ontrack = (e) => { remoteAudio.srcObject = e.streams[0] }

      const micTrack = micStream.getAudioTracks()[0]
      micTrack.enabled = false
      micTrackRef.current = micTrack
      micStream.getTracks().forEach((track) => pc.addTrack(track, micStream))

      const dc = pc.createDataChannel('oai-events')
      dc.addEventListener('open', onDataChannelOpen)
      dc.addEventListener('message', onDataChannelMessage)
      dcRef.current = dc

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      const response = await fetch(`${VOICE_SERVER_URL}/rtc-connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/sdp' },
        body: offer.sdp,
      })
      if (!response.ok) throw new Error(`rtc-connect failed (${response.status})`)

      const answerSdp = await response.text()
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp })
      setStatus('listening')
    } catch {
      setStatus('error')
      setErrorText('Connection failed — please try again.')
      hangUp()
    }
  }

  const isActive = status === 'listening' || status === 'speaking'
  const totalSeconds = Math.ceil(remainingMs / 1000)
  const timerLabel = `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`

  return (
    <div className="rounded-[24px] border border-[#eef2f6] bg-white overflow-hidden max-w-[560px] mx-auto">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#eef2f6]" style={{ background: `${bot.accentColor}0d` }}>
        <button
          type="button"
          onClick={() => { hangUp(); onBack() }}
          className="inline-flex items-center gap-1.5 text-[11px] font-[700] text-[#64748b] hover:text-[#0f172a] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All demos
        </button>
        <div className="text-right">
          <p className="text-[13px] font-[700] text-[#0f172a] leading-none">{bot.displayName}</p>
          <p className="text-[11px] mt-0.5" style={{ color: bot.accentColor }}>{bot.tagline}</p>
        </div>
      </div>

      <div ref={listRef} className="h-[280px] overflow-y-auto px-5 py-4 space-y-3 bg-[#f8fafc]">
        {transcript.length === 0 && status === 'idle' && (
          <p className="text-[12px] text-[#94a3b8] text-center pt-16">Sample data only — nothing here is a real transaction. Tap the mic to start.</p>
        )}
        {transcript.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'visitor' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                m.from === 'visitor'
                  ? 'text-white rounded-br-sm'
                  : m.from === 'system'
                    ? 'bg-[#eef2f6] text-[#64748b] text-[11px] italic'
                    : 'bg-white text-[#334155] border border-[#eef2f6] shadow-sm rounded-bl-sm'
              }`}
              style={m.from === 'visitor' ? { background: bot.accentColor } : undefined}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 p-4 border-t border-[#eef2f6] bg-white flex flex-col items-center gap-3">
        {isActive && <p className="text-[11px] text-[#94a3b8]">Time remaining: {timerLabel}</p>}

        <button
          onClick={status === 'idle' || status === 'error' ? startCall : undefined}
          disabled={status === 'connecting'}
          aria-label={`Start call with ${bot.displayName}`}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg disabled:opacity-60"
          style={{ background: bot.accentColor }}
        >
          {status === 'listening' && (
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: bot.accentColor, opacity: 0.4 }}
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <Mic className="w-5 h-5 text-white relative" />
        </button>

        <p className="text-[12.5px] text-[#64748b] text-center min-h-[1.4rem]">
          {status === 'idle' && `Tap the mic to start, ${contact.name}.`}
          {status === 'connecting' && 'Connecting…'}
          {status === 'listening' && 'Listening…'}
          {status === 'speaking' && `${bot.displayName.split(' ')[0]} is speaking…`}
          {status === 'error' && (errorText || 'Something went wrong.')}
          {status === 'ended' && 'Call ended.'}
        </p>

        {isActive && (
          <button
            onClick={() => { addBubble('system', 'Call ended.'); setStatus('ended'); hangUp() }}
            className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-[11px] font-[600] hover:bg-red-100 transition-colors"
          >
            End Call
          </button>
        )}
      </div>
    </div>
  )
}

export default function IndustryDemoDeck() {
  const [contact, setContact] = useState(null)
  const [selectedBot, setSelectedBot] = useState(null)

  function handleGateSubmit(info) {
    setContact(info)
    fetch(LEAD_CAPTURE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: info.name, countryCode: info.countryCode, phone: info.phone, email: info.email, requirement: 'Generative AI IVR — live demo' }),
    }).catch(() => {})
  }

  if (!contact) return <LeadGate onSubmit={handleGateSubmit} />

  if (selectedBot) {
    return <CallPanel bot={selectedBot} contact={contact} onBack={() => setSelectedBot(null)} />
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {BOTS.map((bot) => <BotCard key={bot.key} bot={bot} onSelect={setSelectedBot} />)}
    </div>
  )
}
