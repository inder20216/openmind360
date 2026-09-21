import { useState, useRef, useMemo } from 'react'
import robotLogo from '../assets/chatbot/robot-mascot.png'

// TODO: replace with the real production webhook URL from n8n workflow
// 07-contact-form-router.json once it's activated and n8n has a public URL.
// See automation/n8n-workflows/README.md — "Going live" section.
const WEBHOOK_URL = 'https://YOUR-N8N-DOMAIN/webhook/openmind-contact-form'

const countryCodes = [
  { code: '+91', label: 'India (+91)' },
  { code: '+1', label: 'US/Canada (+1)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+971', label: 'UAE (+971)' },
  { code: '+65', label: 'Singapore (+65)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+966', label: 'Saudi Arabia (+966)' },
  { code: '+974', label: 'Qatar (+974)' },
  { code: '+968', label: 'Oman (+968)' },
  { code: '+973', label: 'Bahrain (+973)' },
  { code: '+965', label: 'Kuwait (+965)' },
  { code: '+880', label: 'Bangladesh (+880)' },
  { code: '+92', label: 'Pakistan (+92)' },
  { code: '+94', label: 'Sri Lanka (+94)' },
  { code: '+977', label: 'Nepal (+977)' },
]

const requirements = [
  { value: 'hybrid-call-center', label: 'Hybrid Call Center', info: 'A blend of trained human agents and AI automation working together — not one replacing the other.' },
  { value: 'inbound-call-center', label: 'Inbound Call Center', info: 'Trained agents handling inbound calls, emails, and chats in one connected queue — the first point of contact for your customers.' },
  { value: 'lead-management-sales', label: 'Lead Management & Sales', info: 'Automatic lead routing, prioritization, and timely follow-ups synced with your CRM, so no lead goes quiet.' },
  { value: 'custom-crms', label: 'Custom CRMs', info: 'Bespoke CRM systems built and configured around your exact sales and support workflows — not a generic off-the-shelf setup.' },
  { value: 'voice-bots', label: 'Voice Bots (Automated Generative IVRs)', info: "AI-powered voice IVR that understands natural language instead of rigid menu trees. It detects sentiment, routes calls immediately, resolves queries in seconds across multiple languages, and hands off to a human agent with full context when something needs a person." },
  { value: 'chatbots', label: 'Chatbots', info: 'Context-aware AI chatbots deployed across WhatsApp, website, and social channels. They respond instantly, remember context across the conversation, and handle sales, support, and scheduling in one thread — available 24/7 without added headcount.' },
  { value: 'advanced-automations', label: 'Advanced Automations', info: 'CRM-integrated workflow automation — ticket routing, prioritization, and the repetitive admin work behind every fast resolution.' },
  { value: 'dashboard-mis-reporting', label: 'Dashboard & MIS Reporting', info: 'Automated MIS reporting with an interactive dashboard built for faster, right decisions.' },
  { value: 'corporate-training-counselling', label: 'Corporate Training / Student Counselling', info: 'Delivered by experienced trainers, tailored to corporate teams or student groups.' },
  { value: 'technical-consulting', label: 'Technical Consulting', info: 'Hands-on guidance on system integration, automation strategy, and technology choices for your support operations.' },
]

function InfoTooltip({ text }) {
  const [open, setOpen] = useState(false)
  return (
    <span
      className="relative inline-block ml-1.5 align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label="More info"
        className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold flex items-center justify-center hover:bg-slate-300 transition-colors"
      >
        i
      </button>
      {open && (
        <span className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 rounded-lg bg-slate-900 text-white text-xs leading-relaxed shadow-lg">
          {text}
        </span>
      )}
    </span>
  )
}

function MathCaptcha({ onValid }) {
  const [answer, setAnswer] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [checked, setChecked] = useState(false)

  const { a, b, op, expected } = useMemo(() => {
    const ops = ['+', '-']
    const o = ops[Math.floor(Math.random() * ops.length)]
    const x = Math.floor(Math.random() * 8) + 2
    const y = Math.floor(Math.random() * 8) + 1
    const res = o === '+' ? x + y : x - y
    return { a: x, b: y, op: o, expected: res }
  }, [])

  const isCorrect = Number(answer) === expected

  function handleCheck() {
    setChecked(true)
    if (isCorrect) onValid()
  }

  return (
    <div className="space-y-2">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white cursor-pointer select-none"
        onClick={() => { if (!checked) handleCheck() }}
      >
        <div className={`w-6 h-6 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors ${checked && isCorrect ? 'bg-ox border-ox' : 'bg-white border-slate-300'}`}>
          {checked && isCorrect && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 14 2 6 2 2 6 2 18 6 22 14 22 20 18" />
            </svg>
          )}
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="9" cy="16" r="1" fill="#94a3b8" />
          <circle cx="15" cy="16" r="1" fill="#94a3b8" />
          <path d="M12 11V7" />
          <path d="M8 7h8" />
          <circle cx="12" cy="4" r="2" />
        </svg>
        <span className="text-sm text-slate-700 font-medium">I'm not a robot</span>
        <img src={robotLogo} alt="" className="ml-auto" width="56" height="56" />
      </div>
      {checked && !isCorrect && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white">
          <span className="text-sm font-semibold text-slate-700">
            What is {a} {op} {b}?
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value)
              setAttempted(false)
              if (Number(e.target.value) === expected) onValid()
            }}
            onBlur={() => setAttempted(true)}
            className={`w-16 px-3 py-1.5 rounded-lg border text-sm text-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-ox/30 ${attempted && !isCorrect ? 'border-red-300' : 'border-slate-200'}`}
            placeholder="?"
            autoComplete="off"
          />
          {attempted && !isCorrect && answer && (
            <span className="text-xs text-red-500 font-medium">Wrong answer</span>
          )}
          {isCorrect && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Verified
            </span>
          )}
        </div>
      )}
      {checked && isCorrect && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          <span className="text-xs text-emerald-600 font-medium">Verified — you're not a robot</span>
        </div>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [selected, setSelected] = useState([])
  const [notRobot, setNotRobot] = useState(false)
  const mountedAt = useRef(Date.now())

  function toggleRequirement(value) {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!notRobot) return
    const form = e.currentTarget
    const data = new FormData(form)
    const elapsedMs = Date.now() - mountedAt.current

    setStatus('sending')

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          countryCode: data.get('countryCode'),
          phone: data.get('phone'),
          companyName: data.get('companyName'),
          companyWebsite: data.get('companyWebsite'),
          requirements: selected,
          comments: data.get('comments'),
          website: data.get('website'),
          elapsedMs,
        }),
      })
      const result = await res.json()
      if (result.success) {
        setStatus('success')
        form.reset()
        setSelected([])
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-10 max-w-xl mx-auto p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
        Thanks — we've got your message and will get back to you shortly.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto text-left space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <input required name="name" placeholder="Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-ox/30" />
        <input required type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-ox/30" />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-3">
        <select name="countryCode" defaultValue="+91" className="px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-ox/30 bg-white">
          {countryCodes.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
        <input required type="tel" name="phone" placeholder="Contact number" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-ox/30" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input required name="companyName" placeholder="Company name" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-ox/30" />
        <input type="url" name="companyWebsite" placeholder="Company website (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-ox/30" />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-700 mb-3">What are you looking for?</p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {requirements.map((r) => (
            <label key={r.value} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 cursor-pointer hover:border-slate-300 transition-colors has-[:checked]:border-ox has-[:checked]:bg-ox/5">
              <input
                type="checkbox"
                name="requirements"
                value={r.value}
                checked={selected.includes(r.value)}
                onChange={() => toggleRequirement(r.value)}
                className="accent-ox"
              />
              <span className="flex items-center">
                {r.label}
                {r.info && <InfoTooltip text={r.info} />}
              </span>
            </label>
          ))}
        </div>
      </div>

      <textarea name="comments" placeholder="Comments (any specific details you would like to add)" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-ox/30 resize-none" />

      {!notRobot && status === 'error' && (
        <p className="text-xs text-red-500 text-center">Please solve the math question to confirm you're not a robot.</p>
      )}

      <MathCaptcha onValid={() => setNotRobot(true)} />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full px-8 py-3.5 bg-ox text-white text-sm font-semibold rounded-full shadow-lg shadow-ox/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-500 text-center">Something went wrong — please try calling or emailing us directly instead.</p>
      )}
    </form>
  )
}
