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

function PreCaptureStep({ onSubmit }) {
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [requirement, setRequirement] = useState('')
  const isValid = name.trim().length >= 2 && phone.trim().length >= 6 && /\S+@\S+\.\S+/.test(email) && requirement !== ''

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50 flex flex-col justify-end gap-3">
      <div className="flex justify-start">
        <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white text-slate-700 border border-slate-100 shadow-sm text-sm leading-relaxed">
          Hi! I'm Suhani from Open Mind. Before we start — what's your name, the best number and email to reach you at, and what are you looking for?
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (isValid) onSubmit({ name: name.trim(), countryCode, phone: phone.trim(), email: email.trim(), requirement })
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
            onChange={(e) => setPhone(e.target.value)}
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

function ChatPanel({ onClose }) {
  const { sessionId, chatId } = useChatSession()
  const [contact, setContact] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  async function sendToBot(text, contactInfo) {
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
          name: contactInfo ? contactInfo.name || '' : '',
          contactNumber: contactInfo ? `${contactInfo.countryCode} ${contactInfo.phone}` : '',
          email: contactInfo ? contactInfo.email : '',
          requirement: contactInfo ? contactInfo.requirement || '' : '',
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

  function handlePreCaptureSubmit(info) {
    setContact(info)
    // Fire-and-forget: capture the lead immediately, don't let a slow or
    // failed capture request delay or block the chat itself starting.
    fetch(LEAD_CAPTURE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: info.name, countryCode: info.countryCode, phone: info.phone, email: info.email, requirement: info.requirement }),
    }).catch(() => {})

    // Every requirement, including Other/Job, goes to the bot as context —
    // no fixed/scripted replies. It always answers generatively.
    sendToBot(`Hi, my name is ${info.name}, I'm looking for: ${info.requirement}`, info)
  }

  function send() {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    sendToBot(text, contact)
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
            <p className="text-[12px] font-semibold leading-none">Suhani · Open Mind Assistant</p>
            <p className="text-[9px] text-white/70 mt-0.5">Usually replies instantly</p>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close chat" className="text-white/80 hover:text-white transition-colors">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6l-12 12" /></svg>
        </button>
      </div>

      {!contact ? (
        <PreCaptureStep onSubmit={handlePreCaptureSubmit} />
      ) : (
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
      )}
    </motion.div>
  )
}

function VoicePanel({ onClose }) {
  const [state, setState] = useState('idle') // idle | listening | responded

  function tap() {
    if (state !== 'idle') return
    setState('listening')
    setTimeout(() => setState('responded'), 2200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-[300px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl shadow-slate-400/30 border border-slate-100 overflow-hidden"
    >
      <div className="px-5 py-4 bg-gradient-to-r from-ox via-purple-600 to-ob text-white flex items-center justify-between">
        <p className="text-sm font-semibold">Open Mind Voice Bot</p>
        <button onClick={onClose} aria-label="Close voice bot" className="text-white/80 hover:text-white transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6l-12 12" /></svg>
        </button>
      </div>

      <div className="p-6 flex flex-col items-center gap-4">
        <button
          onClick={tap}
          className="relative w-20 h-20 rounded-full bg-gradient-to-br from-ox via-purple-600 to-ob flex items-center justify-center shadow-lg"
        >
          {state === 'listening' && (
            <motion.span
              className="absolute inset-0 rounded-full bg-ob/40"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0" />
            <path d="M12 18v3" />
          </svg>
        </button>

        <div className="flex items-end gap-1 h-6">
          {[6, 14, 20, 12, 8, 16, 10].map((h, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-ob to-ox"
              style={{ height: h }}
              animate={state === 'listening' ? { scaleY: [0.4, 1.2, 0.4] } : { scaleY: 0.3 }}
              transition={{ duration: 0.8, repeat: state === 'listening' ? Infinity : 0, delay: i * 0.07 }}
            />
          ))}
        </div>

        <p className="text-sm text-slate-500 text-center min-h-[2.5rem] flex items-center">
          {state === 'idle' && 'Tap the mic to try a demo voice interaction.'}
          {state === 'listening' && 'Listening…'}
          {state === 'responded' && '"Hi! I can help with support, billing, or booking a demo — just ask."'}
        </p>
      </div>
    </motion.div>
  )
}

export default function ChatVoiceWidget() {
  const [open, setOpen] = useState(null) // null | 'chat' | 'voice'

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence mode="wait">
        {open === 'chat' && <ChatPanel key="chat" onClose={() => setOpen(null)} />}
        {open === 'voice' && <VoicePanel key="voice" onClose={() => setOpen(null)} />}
      </AnimatePresence>

      {!open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col gap-3 items-end"
        >
          <button
            onClick={() => setOpen('voice')}
            aria-label="Open voice bot demo"
            className="w-[52px] h-[52px] rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-300/40 flex items-center justify-center text-ob hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0" />
              <path d="M12 18v3" />
            </svg>
          </button>
          <button
            onClick={() => setOpen('chat')}
            aria-label="Open chat bot demo"
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
