import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Points at the existing Suhani bot already running on the old site's n8n
// Cloud instance — not the rebuilt self-hosted workflow. Its prompt doesn't
// know about the pre-chat contact capture step below, so it may ask for
// phone/email again inside the conversation; that's a known gap, not a bug.
const CHAT_WEBHOOK_URL = 'https://inder20216.app.n8n.cloud/webhook/dbffbebc-7366-4bb8-89aa-190c9e39f050/chat'

// Fires the instant the pre-chat form is submitted, independent of whatever
// happens in the conversation after — this is what actually captures the
// lead. See automation/n8n-workflows/13-chatbot-lead-capture.json.
const LEAD_CAPTURE_URL = 'https://automation.openmindhelpline.com/webhook/openmind-chatbot-lead-capture'

// The real-time voice agent ("OpenMind FAQ Bot") — a separate Express
// server, not part of this app's own build. Points at the local dev
// instance for now; TODO: update to the real deployed URL (e.g.
// https://faq.openmind.in) once it's hosted per that project's own
// README ("What's pending" #2/#3 — DNS + EC2/PM2/nginx, Inder's side).
const VOICE_SERVER_URL = 'http://localhost:3010'

const countryCodes = ['+91', '+1', '+44', '+971', '+65', '+61', '+966', '+974', '+968', '+973', '+965', '+880', '+92', '+94', '+977']

const requirementOptions = [
  'Call outsourcing services',
  'Inbound Call center',
  'Lead Management support',
  'Helpdesk',
  'Voice Bots',
  'Chatbots',
  'Dynamic MIS Dashboards',
  'Advance automations',
  'Custom CRMs',
  'Job',
  'Other',
]

// Renders bot replies as HTML (the backend converts links to real <a> tags),
// but only after stripping anything outside a small safe allowlist — LLM
// output is never fully trusted, even with the model's own instructions.
function sanitizeBotHtml(html) {
  const template = document.createElement('template')
  template.innerHTML = html
  const allowedTags = new Set(['A', 'STRONG', 'EM', 'B', 'I', 'BR', 'P'])

  function clean(node) {
    ;[...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (!allowedTags.has(child.tagName)) {
          child.replaceWith(...child.childNodes)
          return
        }
        ;[...child.attributes].forEach((attr) => {
          const isSafeHref = attr.name === 'href' && /^(https?:|mailto:|tel:)/i.test(attr.value)
          const isAllowedAttr = attr.name === 'href' ? isSafeHref : ['target', 'rel'].includes(attr.name)
          if (!isAllowedAttr) child.removeAttribute(attr.name)
        })
        if (child.tagName === 'A') {
          child.setAttribute('target', '_blank')
          child.setAttribute('rel', 'noopener noreferrer')
        }
        clean(child)
      } else if (child.nodeType !== Node.TEXT_NODE) {
        child.remove()
      }
    })
  }
  clean(template.content)
  return template.innerHTML
}

function formatBotText(text) {
  let out = String(text)
  const hasLinks = /<a\s+[^>]*href/i.test(out)
  if (!hasLinks) {
    out = out.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
  out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/\*(.*?)\*/g, '<em>$1</em>')
  out = out.replace(/\n/g, '<br>')
  return sanitizeBotHtml(out)
}

function useChatSession() {
  const [sessionId] = useState(() => {
    const existing = sessionStorage.getItem('om_chat_session_id')
    if (existing) return existing
    const fresh = 'om_session_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11)
    sessionStorage.setItem('om_chat_session_id', fresh)
    return fresh
  })
  const [chatId] = useState('om_chat_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11))
  return { sessionId, chatId }
}

// Real validation, not just "is it non-empty" — a visitor who types garbage
// here can't be reached later even if they ask for a callback mid-chat, so
// catching that up front matters more than it would on a normal form.
const isValidName = (v) => /[a-zA-Z]/.test(v) && v.trim().length >= 2
const isValidPhone = (v) => /^\d{7,15}$/.test(v.trim())
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

function PreCaptureStep({ onSubmit }) {
  const [step, setStep] = useState('form')
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [requirement, setRequirement] = useState('')
  const isValid = isValidName(name) && isValidPhone(phone) && isValidEmail(email) && requirement !== ''

  if (step === 'confirm') {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50 flex flex-col justify-end gap-3">
        <div className="flex justify-start">
          <div className="max-w-[90%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white text-slate-700 border border-slate-100 shadow-sm text-sm leading-relaxed">
            Just to make sure we can reach you if you ask for a callback later — please confirm these are correct:
            <div className="mt-2 space-y-0.5 text-slate-600">
              <p><span className="text-slate-400">Name:</span> {name.trim()}</p>
              <p><span className="text-slate-400">Phone:</span> {countryCode} {phone.trim()}</p>
              <p><span className="text-slate-400">Email:</span> {email.trim()}</p>
              <p><span className="text-slate-400">Looking for:</span> {requirement}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 max-w-[85%]">
          <button
            type="button"
            onClick={() => setStep('form')}
            className="flex-1 px-3.5 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onSubmit({ name: name.trim(), countryCode, phone: phone.trim(), email: email.trim(), requirement })}
            className="flex-1 px-3.5 py-2.5 rounded-full bg-ox text-white text-sm font-medium hover:shadow-lg hover:shadow-ox/30 transition-shadow"
          >
            Yes, that's right
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50 flex flex-col justify-end gap-3">
      <div className="flex justify-start">
        <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white text-slate-700 border border-slate-100 shadow-sm text-sm leading-relaxed">
          Hi! Talk to us — what's your name, the best number and email to reach you at, and what are you looking for?
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (isValid) setStep('confirm')
        }}
        className="flex flex-col gap-2 max-w-[85%]"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="px-3.5 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-ob/30"
        />
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="px-2.5 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-ob/30"
          >
            {countryCodes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="Contact number"
            className="flex-1 px-3.5 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-ob/30"
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="px-3.5 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-ob/30"
        />
        <div className="flex gap-2">
          <select
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-ob/30"
          >
            <option value="" disabled>Looking for...</option>
            {requirementOptions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <button
            type="submit"
            disabled={!isValid}
            aria-label="Continue"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-ox text-white flex items-center justify-center hover:shadow-lg hover:shadow-ox/30 transition-shadow disabled:opacity-40 disabled:hover:shadow-none"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </form>
    </div>
  )
}

// Shown right after the lead is captured — the visitor picks how they want
// to continue. Both options already have the captured name/phone/email/
// requirement available; neither has to ask for it again.
function ChooseModeStep({ name, onChoose }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50 flex flex-col justify-end gap-3">
      <div className="flex justify-start">
        <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white text-slate-700 border border-slate-100 shadow-sm text-sm leading-relaxed">
          Thanks, {name}! How would you like to continue?
        </div>
      </div>
      <div className="flex flex-col gap-2 max-w-[85%]">
        <button
          type="button"
          onClick={() => onChoose('chat')}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:border-ox/40 hover:shadow-md transition-all text-left"
        >
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-ox via-purple-600 to-ob flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5h16v11H8l-4 4V5z" />
            </svg>
          </span>
          <span>
            <span className="block text-sm font-medium text-slate-800">Chat with our AI agent</span>
            <span className="block text-xs text-slate-400">Type your questions, get instant replies</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => onChoose('voice')}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:border-ox/40 hover:shadow-md transition-all text-left"
        >
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-ob via-purple-600 to-ox flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0" />
              <path d="M12 18v3" />
            </svg>
          </span>
          <span>
            <span className="block text-sm font-medium text-slate-800">Talk to our AI agent</span>
            <span className="block text-xs text-slate-400">Speak instead of typing</span>
          </span>
        </button>
      </div>
    </div>
  )
}

function ChatStep({ contact, messages, setMessages }) {
  const { sessionId, chatId } = useChatSession()
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)
  const sentInitial = useRef(false)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  async function sendToBot(text) {
    setTyping(true)
    try {
      const res = await fetch(CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          chatInput: text,
          chatId,
          sessionId,
          route: 'general',
          name: contact.name || '',
          contactNumber: `${contact.countryCode} ${contact.phone}`,
          email: contact.email,
          requirement: contact.requirement || '',
        }),
      })
      const data = await res.json().catch(() => null)
      const botText = data?.output || data?.message || data?.response || data?.text || data?.chatOutput
        || "I'm having trouble reaching our team right now — please try again in a moment, or call +91 9811331600."
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: botText }])
    } catch {
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: "Unable to connect right now — please try again shortly, or call +91 9811331600." }])
    }
  }

  useEffect(() => {
    // Every requirement, including Other/Job, goes to the bot as context —
    // no fixed/scripted replies. It always answers generatively. Only ever
    // fires once per mount, even under React StrictMode's double-invoke.
    if (sentInitial.current) return
    sentInitial.current = true
    sendToBot(`Hi, my name is ${contact.name}, I'm looking for: ${contact.requirement}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function send() {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    sendToBot(text)
  }

  return (
    <>
      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.from === 'user'
                  ? 'bg-ox text-white rounded-br-sm'
                  : 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-bl-sm'
              }`}
            >
              {m.from === 'bot'
                ? <span dangerouslySetInnerHTML={{ __html: formatBotText(m.text) }} />
                : m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-slate-300"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 p-3 border-t border-slate-100 bg-white flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message…"
          className="flex-1 px-3.5 py-2.5 rounded-full bg-slate-100 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-ob/30"
        />
        <button
          onClick={send}
          aria-label="Send"
          className="flex-shrink-0 w-10 h-10 rounded-full bg-ox text-white flex items-center justify-center hover:shadow-lg hover:shadow-ox/30 transition-shadow"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </>
  )
}

const MAX_CALL_MS = 2 * 60 * 1000 + 30 * 1000 // 2:30, matches the server's own tool/prompt rules

// Real-time speech-to-speech via OpenAI's Realtime API over WebRTC — the
// browser connects *directly* to OpenAI for audio; VOICE_SERVER_URL only
// relays the WebRTC handshake (so the OpenAI key stays server-side) and
// executes tool calls (escalate_to_team, book_appointment). No audio ever
// flows through VOICE_SERVER_URL itself. See "OpenMind FAQ Bot/README.md"
// for the full architecture this was ported from.
function VoiceStep({ contact, priorMessages }) {
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
  const hasPriorChat = priorMessages && priorMessages.length > 0

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [transcript])

  // Cleanup if the visitor closes the widget or switches away mid-call.
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
      addBubble('system', 'Call time limit (2:30) reached.')
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
      const res = await fetch(`${VOICE_SERVER_URL}/api/tools/${encodeURIComponent(name)}`, {
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
      case 'input_audio_buffer.speech_stopped':
        break
      case 'conversation.item.input_audio_transcription.completed':
        addBubble('visitor', msg.transcript)
        break
      // The FAQ Bot project this was ported from expected 'response.audio_transcript.done' -
      // the live API sends 'response.output_audio_transcript.done' now (confirmed by logging
      // every real event type during testing). Likely API drift since that code was last
      // verified — same kind of thing their own README warned about for the model name.
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
      // Same "pre-captured, don't re-ask" fields the chat step uses, plus the
      // chat transcript-so-far if voice was started via the call button
      // mid-conversation — empty/omitted if voice was opened directly.
      const priorChat = hasPriorChat
        ? priorMessages.map((m) => `${m.from === 'user' ? 'Visitor' : 'Suhani'}: ${m.text}`).join('\n').slice(-1500)
        : ''
      const params = new URLSearchParams({
        name: contact.name || '',
        phone: `${contact.countryCode || ''} ${contact.phone || ''}`.trim(),
        email: contact.email || '',
        requirement: contact.requirement || '',
        ...(priorChat ? { priorChat } : {}),
      })
      const configRes = await fetch(`${VOICE_SERVER_URL}/session-config?${params.toString()}`)
      const sessionUpdateEvent = await configRes.json()
      dcRef.current.send(JSON.stringify(sessionUpdateEvent))
      dcRef.current.send(JSON.stringify({ type: 'response.create' }))
    } catch {
      addBubble('system', 'Failed to configure the assistant.')
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
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
      {hasPriorChat && status === 'idle' && (
        <div className="mx-4 mt-3 px-3.5 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-500 text-center">
          Continuing from your chat — Suhani already has that context.
        </div>
      )}

      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {transcript.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'visitor' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.from === 'visitor'
                  ? 'bg-ox text-white rounded-br-sm'
                  : m.from === 'system'
                    ? 'bg-slate-100 text-slate-500 text-xs italic'
                    : 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-bl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 p-4 border-t border-slate-100 bg-white flex flex-col items-center gap-3">
        {isActive && <p className="text-xs text-slate-400">Time remaining: {timerLabel}</p>}

        <button
          onClick={status === 'idle' || status === 'error' ? startCall : undefined}
          disabled={status === 'connecting'}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-ox via-purple-600 to-ob flex items-center justify-center shadow-lg disabled:opacity-60"
        >
          {status === 'listening' && (
            <motion.span
              className="absolute inset-0 rounded-full bg-ob/40"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0" />
            <path d="M12 18v3" />
          </svg>
        </button>

        <p className="text-sm text-slate-500 text-center min-h-[1.5rem]">
          {status === 'idle' && `Tap the mic to start, ${contact.name}.`}
          {status === 'connecting' && 'Connecting…'}
          {status === 'listening' && 'Listening…'}
          {status === 'speaking' && 'Suhani is speaking…'}
          {status === 'error' && (errorText || 'Something went wrong.')}
          {status === 'ended' && 'Call ended.'}
        </p>

        {isActive && (
          <button
            onClick={() => { addBubble('system', 'Call ended.'); setStatus('ended'); hangUp() }}
            className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
          >
            End Call
          </button>
        )}
      </div>
    </div>
  )
}

const stepHeaders = {
  precapture: { title: 'Talk to us', subtitle: 'Usually replies instantly' },
  choose: { title: 'Talk to us', subtitle: 'Usually replies instantly' },
  chat: { title: 'Suhani · Open Mind Assistant', subtitle: 'Usually replies instantly' },
  voice: { title: 'Open Mind Voice Agent', subtitle: 'Preview — not live yet' },
}

function WidgetPanel({ onClose }) {
  const [step, setStep] = useState('precapture') // precapture | choose | chat | voice
  const [contact, setContact] = useState(null)
  // Lifted up (not local to ChatStep) so the call button below can hand the
  // transcript-so-far to VoiceStep when the visitor switches mid-chat.
  const [chatMessages, setChatMessages] = useState([])
  const header = stepHeaders[step]

  function handlePreCaptureSubmit(info) {
    setContact(info)
    // Fire-and-forget: capture the lead immediately, don't let a slow or
    // failed capture request delay or block anything that happens next.
    fetch(LEAD_CAPTURE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: info.name, countryCode: info.countryCode, phone: info.phone, email: info.email, requirement: info.requirement }),
    }).catch(() => {})
    setStep('choose')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-[340px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl shadow-slate-400/30 border border-slate-100 flex flex-col overflow-hidden"
    >
      <div className="px-4 py-2 bg-gradient-to-r from-ob via-purple-600 to-ox text-white flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <div>
            <p className="text-[12px] font-semibold leading-none">{header.title}</p>
            <p className="text-[9px] text-white/70 mt-0.5">{header.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {step === 'chat' && (
            <button
              onClick={() => setStep('voice')}
              aria-label="Switch to a call with our AI agent"
              title="Talk to our AI agent instead"
              className="relative text-white/90 hover:text-white transition-colors"
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-white/40"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
          )}
          <button onClick={onClose} aria-label="Close" className="text-white/80 hover:text-white transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6l-12 12" /></svg>
          </button>
        </div>
      </div>

      {step === 'precapture' && <PreCaptureStep onSubmit={handlePreCaptureSubmit} />}
      {step === 'choose' && <ChooseModeStep name={contact.name} onChoose={setStep} />}
      {step === 'chat' && <ChatStep contact={contact} messages={chatMessages} setMessages={setChatMessages} />}
      {step === 'voice' && <VoiceStep contact={contact} priorMessages={chatMessages} />}
    </motion.div>
  )
}

export default function ChatVoiceWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence mode="wait">
        {open && <WidgetPanel key="widget" onClose={() => setOpen(false)} />}
      </AnimatePresence>

      {!open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex items-center gap-2.5"
        >
          <span className="px-3.5 py-2 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-300/40 text-sm font-medium text-slate-700">
            Talk to us
          </span>
          <button
            onClick={() => setOpen(true)}
            aria-label="Talk to us"
            className="w-14 h-14 rounded-full bg-gradient-to-br from-ox via-purple-600 to-ob shadow-lg shadow-purple-500/30 flex items-center justify-center text-white hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5h16v11H8l-4 4V5z" />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  )
}
