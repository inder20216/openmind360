import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight, TrendingUp, Check, ArrowUpRight, FileText, Sparkles } from 'lucide-react'
import { services } from '../data/services'

/* Badge label for each service card — overrides `label` from data/services.js
   so the badge text can differ from the site-wide service name. */
const BADGES = {
  support: 'Hybrid Contact Center',
  ivr: 'AI Voice Support',
  chatbots: 'AI Chat Support',
  automation: 'Business Automation',
  growth: 'Reports & Analytics',
  'custom-crm': 'CRM Solutions',
}

/* This homepage carousel shows Generative AI IVR and AI Chatbots as a single
   combined "Gen AI & AI Chatbot" card, even though data/services.js lists
   them as two separate services with two separate pages. Reuse the real
   'ivr' entry (so it still gets the Suhani voice-agent card face and its
   existing sticker/color) just relabeled, and drop 'chatbots' from the
   carousel entirely. */
const cardServices = (() => {
  const rest = services
    .filter((s) => s.id !== 'ivr' && s.id !== 'chatbots')
    .map((s) => ({ ...s }))
  const ivrService = services.find((s) => s.id === 'ivr')
  const combined = { ...ivrService, label: 'Gen AI & AI Chatbot' }
  const automationIdx = rest.findIndex((s) => s.id === 'automation')
  rest.splice(automationIdx, 0, combined)
  // Renumber sequentially for this 5-card carousel only — the real
  // per-service `num` (used on the full service pages/grid) skips one
  // number here since two real services are collapsed into one card.
  rest.forEach((s, i) => { s.num = String(i + 1).padStart(2, '0') })
  return rest
})()

import headsetImg from '../assets/headset.png'
import slide1Img from '../assets/slide1.png'
import robotImg from '../assets/chatbot/robot-mascot.png'
import channelIcons from '../assets/chatbot/channel-icons.png'
import slide5Icon1 from '../assets/slide5icon1.png'
import slide5Icon2 from '../assets/slide5icon2.png'
import suhaniPic from '../assets/suhanipic3.png.png'
import crmLogo from '../assets/crm_logo-removebg-preview.png'

/* Flavor copy + avatar initials for each service card — keyed by service id from data/services.js */
const FLAIR = {
  support: {
    name: 'Hassan',
    initials: 'HS',
    issue: 'My support call just got disconnected!',
    reply: "I'll reconnect you instantly, no need to repeat yourself.",
  },
  ivr: {
    name: 'Suhani',
    initials: 'VS',
    issue: 'Can your AI voice agent handle my billing query?',
    reply: "Yes! Let me pull up your account and check right away.",
  },
  chatbots: {
    name: 'Priya',
    initials: 'CS',
    issue: 'Can I get help over WhatsApp instead of calling?',
    reply: "Of course! I can help right here — no need to call.",
  },
  automation: {
    name: 'Bharat',
    initials: 'BA',
    issue: 'Can we automate our order tracking updates?',
    reply: "Done! You'll get real-time status updates from here on.",
  },
  growth: {
    name: 'Rhea',
    initials: 'RA',
    issue: 'I need last month’s performance report.',
    reply: "Here's your full analytics dashboard and insights.",
  },
  'custom-crm': {
    name: 'Kabir',
    initials: 'CR',
    issue: 'Can this sync with our existing CRM?',
    reply: 'Synced! All your contacts are now updated in the CRM.',
  },
}

/*
 * Floating stickers per service. Each service maps to an array so a card can
 * have more than one floating panel coming off its edges. Crops are pulled
 * straight from existing src/assets (no new image files) via background-image:
 *  - support: transparent PNGs floating in the open air (no white panel).
 *  - automation: whole-image "cover" crop of the chatbot robot mascot.
 *  - chatbots: channel-icons.png is 3 icons side by side — widthwise 300% sprite
 *    crop picks out the right (chat) one without distortion.
 *  - growth / custom-crm: ai-image3.png is an 8-badge diagram whose
 *    "REAL-TIME ANALYTICS" and "CRM INTEGRATION" badges line up with those
 *    two services — zoomed in and positioned onto just that badge.
 * Panels: `bare: true` → transparent <img>, no white panel. Otherwise a white
 * rounded panel with a tinted glow. side: left|right, top: css top of the panel.
 */
const STICKERS = {
  support: { src: slide1Img, side: 'center', top: '20%', width: 'w-[22.4rem] sm:w-[26.4rem]', bare: true, rotate: -2, caption: 'Complete Call Center Solution' },
  ivr: { src: headsetImg, size: 'cover', position: 'center 38%', rotate: -6, bare: true, width: 'w-[7rem] sm:w-[9.5rem]', side: 'right', top: '15%', shift: '-mr-1 sm:-mr-2' },
  chatbots: { src: channelIcons, side: 'right', top: '15%', width: 'w-[6rem] sm:w-[8rem]', bare: true, rotate: -6 },
  automation: { src: robotImg, side: 'right', top: '15%', width: 'w-[5.5rem] sm:w-[7.5rem]', bare: true, rotate: -8 },
  growth: [
    { src: slide5Icon1, side: 'left', top: '24%', width: 'w-[5rem] sm:w-[6.5rem]', bare: true, rotate: -10 },
    { src: slide5Icon2, side: 'right', top: '15%', width: 'w-[4.5rem] sm:w-[6rem]', bare: true, rotate: 8 },
  ],
  'custom-crm': { src: crmLogo, side: 'right', top: '15%', width: 'w-[4.5rem] sm:w-[5.5rem]', bare: true, rotate: 8 },
}

function CardSticker({ service }) {
  const cfg = STICKERS[service.id]
  if (!cfg) return null
  const list = Array.isArray(cfg) ? cfg : [cfg]
  return (
    <div className="absolute inset-0 pointer-events-none z-50" style={{ transformStyle: 'preserve-3d' }}>
      {list.map((s, i) => {
        const side = s.side === 'right' ? 'right' : s.side === 'center' ? 'center' : 'left'
        const sideOffset = side === 'right' ? '-right-10 sm:-right-14' : side === 'center' ? 'left-1/2' : '-left-10 sm:-left-14'
        return (
          <div
            key={`${service.id}-${i}`}
            className={`absolute ${sideOffset} z-50 pointer-events-none transition-opacity duration-300`}
            style={{
              top: s.top || '15%',
              transform: side === 'center'
                ? `translateX(-50%) translateZ(35px) rotate(${s.rotate ?? 0}deg) ${s.transform ?? ''}`
                : `translateZ(35px) rotate(${s.rotate ?? 0}deg) ${s.transform ?? ''}`,
              transformStyle: 'preserve-3d',
            }}
          >
            {s.custom ? (
              <div className={`${s.width || 'w-24 sm:w-28'} ${s.shift || ''}`}>
                {s.content}
              </div>
            ) : s.bare ? (
              <div className={s.shift || ''}>
                <img
                  src={s.src}
                  alt=""
                  aria-hidden="true"
                  className={`${s.width || 'w-24 sm:w-28'} h-auto max-w-none drop-shadow-[0_20px_35px_rgba(15,23,42,0.35)]`}
                />
                {s.caption && (
                  <div className="mt-1 flex justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] text-[11px] sm:text-[12.5px] font-extrabold tracking-tight text-zinc-900 whitespace-nowrap">
                      {s.caption}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-[30%] blur-xl opacity-70"
                  style={{ background: service.color }}
                />
                <div
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[30%] bg-white ring-[5px] ring-white shadow-[0_22px_44px_-10px_rgba(15,23,42,0.5)]"
                  style={{
                    backgroundImage: `url(${s.src})`,
                    backgroundSize: s.size,
                    backgroundPosition: s.position,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* Chat support script for the slide-3 chat viewframe. Messages play one by
   one; bot entries show a typing indicator before they land. */
const CHAT_SCRIPT = {
  chatbots: [
    { from: 'user', text: 'Hi! Can I get help with a billing issue over WhatsApp?' },
    { from: 'bot', text: 'Of course! I can help right here — no need to call. What\'s your account email?' },
    { from: 'user', text: 'vihan@example.com — I was charged twice last month.' },
    { from: 'bot', text: 'Found it. That\'s a duplicate charge from the 15th. Refund initiated — 3-5 business days.' },
    { from: 'bot', text: 'Anything else I can help with today?' },
  ],
}

/* Chat support viewframe for slide 3: a fake support widget where the
   conversation plays itself out, typing indicator and all. */
function ChatSupportView({ service }) {
  const script = CHAT_SCRIPT[service.id] || []
  const [count, setCount] = useState(1)

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((c) => (c >= script.length ? c : c + 1))
    }, 1190)
    return () => window.clearInterval(id)
  }, [script.length])

  const shown = script.slice(0, count)
  const last = shown[shown.length - 1]
  const typing = count < script.length && last && last.from === 'bot'

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden rounded-[20px] bg-white/15 backdrop-blur-md border border-white/25 shadow-[0_16px_32px_rgba(0,0,0,0.25)]">
      {/* Contact header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: `linear-gradient(90deg, ${service.color}, ${service.accent})` }}
      >
        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-zinc-900">
          {FLAIR[service.id].initials}
        </div>
        <div className="min-w-0">
          <p className="text-white text-[10.5px] font-semibold leading-none truncate">{FLAIR[service.id].name}</p>
          <p className="text-white/75 text-[8.5px] leading-tight mt-0.5">AI Chat Support · Online</p>
        </div>
        <div className="ml-auto w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <MessageSquare className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col justify-end gap-1.5 px-2.5 py-2 min-h-0 overflow-hidden">
        <AnimatePresence initial={false}>
          {shown.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[78%] text-[10px] leading-[1.35] px-2.5 py-1.5 rounded-2xl shadow-sm backdrop-blur-sm ${
                  m.from === 'bot'
                    ? 'bg-white/20 text-white border border-white/25 rounded-bl-[4px]'
                    : 'bg-[#6d28d9]/70 text-white rounded-br-[4px]'
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="flex justify-start">
            <div className="bg-white/20 backdrop-blur-sm border border-white/25 rounded-2xl rounded-bl-[4px] px-2.5 py-1.5 flex items-center gap-1">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-1 h-1 rounded-full bg-white/70"
                  style={{ animation: 'chatTyping 1s ease-in-out infinite', animationDelay: `${d * 0.18}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
 
/* Gen AI & AI Chatbot — full-bleed front face, adapted from the
   Exact-Replica voice-agent design. Laid out on a 390px-wide canvas and
   scaled down to the card width. The header panel pokes above the card and
   the avatar pokes out of its left edge, so this face is not clipped like
   the other cards. The chat plays itself: each message rises in at the
   bottom and pushes the earlier ones up, then the thread fades and loops. */
const GENAI_BUBBLE = 'text-white text-[14.5px] leading-[1.38] tracking-[-0.01em] px-4 pt-3 pb-[13px] rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
const GENAI_LABEL = 'text-[11.5px] leading-none font-medium tracking-[0.01em] text-white/70'
const GENAI_CHAT = [
  { who: 'Customer', side: 'right', bg: 'bg-[rgba(184,168,255,0.92)]', lines: ['Hi, I just received my order,', 'but the size is wrong!'] },
  { who: 'AI agent', side: 'left', bg: 'bg-[#A89CFF]', lines: ["Hi! I'm really sorry about", "that, I'll be happy to help."] },
  { who: 'Customer', side: 'right', bg: 'bg-[#A99EFF]', lines: ['Could you confirm the size', 'you ordered and received?'] },
]
const GENAI_SLOT = 96 // px between stacked messages on the 390px canvas

function GenAIVoiceSupportView({ num }) {
  const [count, setCount] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let id
    if (fading) {
      id = setTimeout(() => { setCount(0); setFading(false) }, 500)
    } else if (count < GENAI_CHAT.length) {
      id = setTimeout(() => setCount((c) => c + 1), count === 0 ? 400 : 850)
    } else {
      id = setTimeout(() => setFading(true), 2600)
    }
    return () => clearTimeout(id)
  }, [count, fading])

  return (
    <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,#b3a8ff_0%,#9387f5_30%,#7E6EF0_65%,#6b5ae6_100%)] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.35)]">
      <div className="absolute left-0 top-0 w-[390px] h-[500px] origin-top-left scale-[0.718] sm:scale-[0.872]">
        {/* Card number */}
        <div className="absolute z-10 top-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#6b5ae6] font-black text-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
          {num}
        </div>

        {/* Voice agent header */}
        <div className="absolute z-10 -top-2 right-3 w-[262px] bg-white rounded-[18px] px-[18px] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[0.1em] text-[#6B7280] leading-none">VOICE AGENT</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="text-[12px] font-semibold text-[#22C55E] leading-none">Live</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 mt-2.5">
            <img src={headsetImg} alt="" aria-hidden="true" className="w-9 h-6 object-contain object-center" />
            <span className="text-[15px] font-semibold text-[#111827] leading-5 tracking-[-0.01em]">Suhani is on a call</span>
          </div>
        </div>

        {/* Suhani avatar — larger, hanging off the card's left edge */}
        <div className="absolute z-[3] -left-7 top-[70px] w-[176px] h-[176px] rounded-full border-[6px] border-white overflow-hidden bg-[#EA580C] shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
          <img src={suhaniPic} alt="Suhani" className="w-full h-full object-cover object-top scale-[1.15]" />
        </div>

        {/* Chat thread — newest message at the bottom */}
        {GENAI_CHAT.map((m, i) => {
          const shown = i < count
          const right = m.side === 'right'
          return (
            <div
              key={i}
              className={`absolute z-[4] bottom-2.5 w-[250px] ${right ? 'right-4' : 'left-4'}`}
              style={{
                transform: `translateY(${shown ? -(count - 1 - i) * GENAI_SLOT : 40}px)`,
                opacity: shown && !fading ? 1 : 0,
                transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease',
              }}
            >
              <div className={`mb-[7px] ${right ? 'text-right pr-1.5' : 'pl-1.5'}`}>
                <span className={GENAI_LABEL}>{m.who}</span>
              </div>
              <div className={`${GENAI_BUBBLE} ${m.bg} ${right ? 'rounded-br-[6px]' : 'rounded-bl-[6px]'}`}>
                {m.lines[0]}<br />{m.lines[1]}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* Live Reports & Analytics dashboard — the approved slide-5 (growth) front face.
   Ported from the Reports-Panel-Dynamic design: animated KPIs, weekly bar chart
   with live trend line, rotating toast, news ticker and Explore CTA. */
function useTweenNumber(target, duration = 900) {
  const [value, setValue] = useState(0)
  const current = useRef(0)
  const raf = useRef(0)
  useEffect(() => {
    const from = current.current
    const delta = target - from
    const t0 = performance.now()
    const frame = (now) => {
      const w = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - w, 3)
      current.current = from + delta * eased
      setValue(current.current)
      if (w < 1) raf.current = requestAnimationFrame(frame)
    }
    raf.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])
  return value
}

function Sparkline({ data, color }) {
  const path = useMemo(() => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    return data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * 64
        const y = 22 - ((v - min) / range) * 18 - 2
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
  }, [data])
  return (
    <svg width="64" height="22" viewBox="0 0 64 22" className="w-full h-auto overflow-visible">
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 120, strokeDashoffset: 0, animation: 'raDrawLine 1.2s ease-out forwards' }}
      />
    </svg>
  )
}

const TOASTS = ['Report exported', '3 alerts resolved', 'CSAT up 2%', 'New data synced', 'Export ready']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

function ReportsAnalyticsView() {
  const [csat, setCsat] = useState(94.2)
  const [fcr, setFcr] = useState(89)
  const [aht, setAht] = useState(154)
  const [bars, setBars] = useState([68, 82, 58, 92, 76])
  const [line, setLine] = useState([0, 0, 0, 0, 0])
  const [waves, setWaves] = useState([
    [42, 58, 55, 72, 68, 86],
    [80, 72, 68, 55, 48, 40],
    [35, 50, 48, 62, 70, 88],
  ])
  const [hover, setHover] = useState(null)
  const [toastIdx, setToastIdx] = useState(0)
  const [live, setLive] = useState(false)

  const csatTween = useTweenNumber(csat, 1100)
  const fcrTween = useTweenNumber(fcr, 1000)
  const ahtTween = useTweenNumber(aht, 1000)

  const polyPoints = useMemo(
    () => line.map((v, i) => `${i * 20 + 10},${100 - v}`).join(' '),
    [line]
  )

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.round(s % 60)
    return `${m}m ${String(sec).padStart(2, '0')}s`
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setLine(bars)
      setLive(true)
    }, 180)
    return () => clearTimeout(id)
  }, [bars])

  useEffect(() => {
    if (!live) return
    setLine(bars)
  }, [bars, live])

  useEffect(() => {
    const id = setInterval(() => {
      setCsat((v) => Math.min(99.1, Math.max(92.5, +(v + (Math.random() - 0.5) * 0.8).toFixed(1))))
      setFcr((v) => Math.min(93, Math.max(85, Math.round(v + (Math.random() - 0.5) * 1.6))))
      setAht((v) => Math.min(175, Math.max(135, Math.round(v + (Math.random() - 0.5) * 12))))
      setWaves((arr) =>
        arr.map((w) => {
          const last = w[w.length - 1]
          const next = Math.min(95, Math.max(20, last + (Math.random() - 0.5) * 18))
          return [...w.slice(1), Math.round(next)]
        })
      )
    }, 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setBars((arr) =>
        arr.map((v) => Math.min(95, Math.max(30, Math.round(v + (Math.random() - 0.5) * 22))))
      )
    }, 800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setToastIdx((i) => (i + 1) % TOASTS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full flex-1 min-h-0 flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#ec4899] via-[#f43f8a] to-[#f97316]">
      <div className="absolute inset-0 bg-[radial-gradient(140%_70%_at_0%_0%,rgba(255,255,255,0.35),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_55%_at_100%_100%,rgba(255,255,255,0.18),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 px-2.5 pt-2 flex items-center justify-between">
        <h2 className="text-white font-bold text-[11.5px] tracking-tight leading-none">Real-time Insights</h2>
        <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-2 py-[2px]">
          <span className="relative flex h-[6px] w-[6px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-70" />
            <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-[#10b981] shadow-[0_0_6px_#10b981]" />
          </span>
          <span className="text-[7px] font-semibold text-white tracking-wide">Live • 3s</span>
        </div>
      </div>

      <div className="relative z-10 px-2 mt-1.5 grid grid-cols-3 gap-1.5">
        <div className="bg-white/95 rounded-[10px] p-1.5 shadow-sm border border-white/60 flex flex-col gap-1" style={{ animation: 'raFloat1 3.2s ease-in-out infinite' }}>
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-bold tracking-[0.14em] text-black/55">CSAT</span>
            <span className="bg-emerald-500 text-white text-[6.5px] font-bold px-1 py-[1px] rounded-full">+12%</span>
          </div>
          <div className="text-[13px] font-extrabold tracking-tight text-[#111] leading-none">{csatTween.toFixed(1)}%</div>
          <Sparkline data={waves[0]} color="#ec4899" />
        </div>
        <div className="bg-white/95 rounded-[10px] p-1.5 shadow-sm border border-white/60 flex flex-col gap-1" style={{ animation: 'raFloat2 3.2s ease-in-out infinite', animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-bold tracking-[0.14em] text-black/55">AHT</span>
            <span className="bg-emerald-500 text-white text-[6.5px] font-bold px-1 py-[1px] rounded-full">-28%</span>
          </div>
          <div className="text-[12px] font-extrabold tracking-tight text-[#111] leading-none">{formatTime(ahtTween)}</div>
          <Sparkline data={waves[1]} color="#f97316" />
        </div>
        <div className="bg-white/95 rounded-[10px] p-1.5 shadow-sm border border-white/60 flex flex-col gap-1" style={{ animation: 'raFloat3 3.2s ease-in-out infinite', animationDelay: '0.8s' }}>
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-bold tracking-[0.14em] text-black/55">FCR</span>
            <span className="bg-emerald-500 text-white text-[6.5px] font-bold px-1 py-[1px] rounded-full">+4%</span>
          </div>
          <div className="text-[13px] font-extrabold tracking-tight text-[#111] leading-none">{fcrTween.toFixed(0)}%</div>
          <Sparkline data={waves[2]} color="#10b981" />
        </div>
      </div>

      <div className="relative z-10 mx-2 mt-1.5 bg-white/95 rounded-[12px] p-2 shadow-sm border border-white/70 flex-1 min-h-0 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[9px] font-bold tracking-wide text-[#111]">Weekly Performance</span>
          <span className="flex items-center gap-0.5 text-[8px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-1.5 py-[2px]">
            <TrendingUp className="w-2.5 h-2.5" style={{ animation: 'raArrowBounce 1.2s ease-in-out infinite' }} />
            ↑ +12% wk
          </span>
        </div>
        <div className="relative mt-1 flex-1 min-h-0 flex items-end justify-between gap-1 px-0.5">
          <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none opacity-60">
            <div className="h-px bg-black/[0.06]" />
            <div className="h-px bg-black/[0.06]" />
            <div className="h-px bg-black/[0.06]" />
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute left-1 right-1 top-1 bottom-4 pointer-events-none overflow-visible">
            <polyline
              points={polyPoints}
              fill="none"
              stroke="#ec4899"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={live ? 0 : 200}
              opacity="0.9"
              style={{ transition: 'stroke-dashoffset 1.2s ease 0.6s, all 0.7s ease' }}
            />
            {line.map((v, i) => {
              const x = i * 20 + 10
              const y = 100 - v
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={live ? 2.2 : 0}
                  fill="white"
                  stroke="#ec4899"
                  strokeWidth="1.2"
                  style={{ transition: 'all 0.7s ease', transitionDelay: live ? `${i * 90}ms` : '0ms' }}
                />
              )
            })}
          </svg>
          {bars.map((v, i) => (
            <div
              key={i}
              className="relative h-full flex-1 flex flex-col items-center justify-end"
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onPointerDown={() => setHover(i)}
            >
              {hover === i && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[6.5px] font-bold px-1 py-[2px] rounded shadow z-30 pointer-events-none whitespace-nowrap">
                  {v}%
                </div>
              )}
              <div
                className="w-[68%] rounded-t-[3px] rounded-b-[1px] bg-gradient-to-t from-[#ec4899] to-[#f97316] shadow-sm transition-all duration-[900ms] ease-in-out origin-bottom"
                style={{ height: `${v}%` }}
              />
              <span className="mt-0.5 text-[6px] font-bold text-black/45">{DAYS[i].slice(0, 1)}</span>
            </div>
          ))}
          <div className="absolute right-1 top-1 z-20 pointer-events-none">
            <div key={toastIdx} className="flex items-center gap-1 bg-white shadow-sm border border-black/5 rounded-full px-1.5 py-1 animate-[raFadePop_0.4s_ease]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[7px] font-bold text-[#111] whitespace-nowrap">{TOASTS[toastIdx]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-1 shrink-0 h-[18px] bg-black/10 border-t border-white/15 flex items-center overflow-hidden">
        <div className="flex w-max animate-[raMarquee_14s_linear_infinite] whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} aria-hidden={k === 1} className="flex items-center gap-4 pr-4">
              <span className="text-[7.5px] font-semibold text-white/90 tracking-wide">
                New report generated • CSAT up 2% • 3 alerts resolved • Export ready • Weekly summary live •
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* Business Automation — the automation card's front face, ported from the
   Combo-Light-Green-Dark-Layout design: big three-line headline, an
   Invoice → AI → Done workflow island with integration chips, and a row of
   three KPI tiles. The badge/number header and the Explore CTA come from the
   card chrome (styled green for this card). Figures tick live like the CRM
   card's and wrap back to their starting values so they stay plausible. */
const AUTOMATION_GRADIENT = 'linear-gradient(180deg, #2dd4a8 0%, #18c08a 40%, #14b87f 100%)'

function AutomationView() {
  const [invoice, setInvoice] = useState(4.2)
  const [tasks, setTasks] = useState(1200)
  const [growth, setGrowth] = useState(18)
  const [saved, setSaved] = useState(24.5)
  const [faster, setFaster] = useState(68)
  const [rate, setRate] = useState(98)

  useEffect(() => {
    const id = setInterval(() => {
      setInvoice((Math.random() * 7 + 1.5))
      setTasks((t) => (t >= 1600 ? 1200 : t + Math.floor(Math.random() * 4)))
      setSaved((h) => (h >= 32 ? 24.5 : h + Math.random() * 0.1))
      setRate(97 + Math.random() * 2.8)
    }, 180)
    const id2 = setInterval(() => {
      setGrowth(15 + Math.floor(Math.random() * 7))
      setFaster(64 + Math.floor(Math.random() * 8))
    }, 350)
    return () => { clearInterval(id); clearInterval(id2) }
  }, [])

  return (
    <div className="relative w-full flex-1 min-h-0 flex flex-col px-1">
      <h2 className="mt-1 text-[26px] sm:text-[30px] font-black leading-[0.9] tracking-tight">
        <span className="text-white">Automate</span>
        <br />
        <span className="text-[#a7f3d0]">everything</span>
        <br />
        <span className="text-white">that moves.</span>
      </h2>

      {/* Workflow island */}
      <div className="mt-3 sm:mt-4 rounded-[18px] bg-emerald-900/10 backdrop-blur-md border border-white/20 p-2.5 sm:p-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] bg-white shadow flex flex-col items-center justify-center">
              <div className="text-[7px] font-black text-emerald-700 leading-none">${invoice.toFixed(1)}k</div>
              <FileText className="w-3.5 h-3.5 text-emerald-700 mt-0.5" strokeWidth={2.2} />
            </div>
            <span className="text-[8px] font-bold text-white/80 mt-1 tracking-widest">INVOICE</span>
          </div>
          <span className="text-white/60 text-[13px]">⇢</span>
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-900/20 flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.4} />
            </div>
            <div className="mt-1 bg-white text-emerald-800 text-[7px] font-black px-2 py-0.5 rounded-full leading-none">AI</div>
          </div>
          <span className="text-white/60 text-[13px]">⇢</span>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow">
              <Check className="w-4 h-4" strokeWidth={3} />
            </div>
            <span className="text-[8px] font-bold text-white/80 mt-1 tracking-widest">DONE</span>
          </div>
        </div>
        <div className="flex justify-center gap-1.5 mt-2">
          {['SAP', 'Tally', 'CRM'].map((t) => (
            <span key={t} className="text-[8px] bg-white/90 rounded-full px-2 py-0.5 text-emerald-800 font-bold">{t}</span>
          ))}
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3">
        <div className="rounded-[14px] p-2 bg-white text-emerald-900 shadow">
          <div className="text-[8px] font-bold opacity-60 tracking-widest">TASKS</div>
          <div className="text-[18px] sm:text-[20px] font-black leading-none mt-1">{(tasks / 1000).toFixed(2)}k</div>
          <div className="text-[7.5px] font-bold mt-1 whitespace-nowrap">today • +{growth}%</div>
        </div>
        <div className="rounded-[14px] p-2 bg-emerald-900/10 backdrop-blur border border-white/20 text-white">
          <div className="text-[8px] font-bold opacity-70 tracking-widest">SAVED</div>
          <div className="text-[18px] sm:text-[20px] font-black leading-none mt-1">{saved.toFixed(1)}h</div>
          <div className="text-[7.5px] font-bold mt-1 whitespace-nowrap">↗ {faster}% faster</div>
        </div>
        <div className="rounded-[14px] p-2 bg-emerald-900/10 backdrop-blur border border-white/20 text-white">
          <div className="text-[8px] font-bold opacity-70 tracking-widest">RATE</div>
          <div className="text-[18px] sm:text-[20px] font-black leading-none mt-1">{rate.toFixed(1)}%</div>
          <div className="text-[7.5px] font-bold mt-1 whitespace-nowrap">✓ accurate</div>
        </div>
      </div>
    </div>
  )
}

/* CRM Solutions — the custom-crm card's front face, ported from the
   Crm-05-Fast design: headline with a highlighted last word, a live
   New → Calling → Won deal-flow board and two KPI tiles that tick fast.
   The badge/number header and the CTA come from the card chrome (styled
   blue/navy for this card). Running figures wrap back to their starting
   values so they stay plausible no matter how long the card is up. */
const CRM_GRADIENT = 'linear-gradient(180deg, #93c5fd 0%, #60a5fa 30%, #3b82f6 65%, #2563eb 100%)'

function CrmView() {
  const [tick, setTick] = useState(0)
  const [deals, setDeals] = useState(342)
  const [resp, setResp] = useState('1.8')
  const [calling, setCalling] = useState(12)
  const [won, setWon] = useState(28)
  const [closing, setClosing] = useState(18)

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1)
      setDeals((d) => Math.min(360, Math.max(335, d + Math.floor(Math.random() * 3) - 1)))
      setResp((Math.random() * 0.6 + 1.4).toFixed(1))
      setWon((w) => (w >= 60 ? 28 : w + Math.floor(Math.random() * 2)))
      setCalling((c) => (c >= 30 ? 12 : c + Math.floor(Math.random() * 2)))
    }, 180)
    const id2 = setInterval(() => setClosing(15 + Math.floor(Math.random() * 8)), 350)
    return () => { clearInterval(id); clearInterval(id2) }
  }, [])

  return (
    <div className="relative w-full flex-1 min-h-0 flex flex-col px-1">
      <h2 className="text-[21px] sm:text-[28px] font-black leading-[0.95] tracking-tight text-white">
        Your
        <br />
        pipeline,
        <br />
        <span className="inline-block mt-1 text-[#0f172a] bg-white px-1.5 pb-0.5 rounded-[7px]">supercharged.</span>
      </h2>

      {/* Deal flow board */}
      <div className="mt-2 sm:mt-3 rounded-[18px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-2.5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[8.5px] font-black tracking-widest text-gray-500">DEAL FLOW</span>
          <span className="text-[8.5px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full flex items-center">
            <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1 animate-pulse ${tick % 2 ? 'bg-green-400' : ''}`} />
            Live
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="rounded-[10px] bg-gray-50 p-1.5 border border-gray-100">
            <div className="text-[7.5px] font-bold text-gray-400">NEW</div>
            <div className="mt-1 space-y-1">
              {[['A', 'Acme', 'bg-blue-100'], ['S', 'SaaS Co', 'bg-purple-100']].map(([ch, name, bg]) => (
                <div key={name} className="bg-white rounded-[7px] p-1 shadow-sm flex items-center gap-1">
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-full ${bg} flex items-center justify-center text-[8px]`}>{ch}</div>
                  <div className="text-[7.5px] sm:text-[8px] font-bold truncate">{name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[10px] bg-blue-50 p-1.5 border border-blue-100">
            <div className="text-[7.5px] font-bold text-blue-500">CALLING</div>
            <div className="mt-1 bg-white rounded-[7px] p-1 shadow-sm border border-blue-200">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-[7.5px] font-bold">J</div>
                <div className="text-[7px] sm:text-[7.5px] font-bold leading-tight whitespace-nowrap">John • ${calling}k</div>
              </div>
              <div className="mt-1.5 h-1 bg-blue-100 rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-blue-600" />
              </div>
            </div>
          </div>
          <div className="rounded-[10px] bg-green-50 p-1.5 border border-green-100">
            <div className="text-[7.5px] font-bold text-green-600">WON</div>
            <div className="mt-1 bg-white rounded-[7px] p-1 shadow-sm flex items-center justify-center flex-col">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <div className="text-[8px] font-black mt-0.5 text-green-700">+${won}k</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="mt-2 sm:mt-2.5 flex gap-2">
        <div className="flex-1 rounded-[14px] bg-[#0f172a] p-2 sm:p-2.5 text-white">
          <div className="text-[8px] font-bold opacity-60">ACTIVE DEALS</div>
          <div className="text-[17px] sm:text-[22px] font-black leading-none mt-1">{deals}</div>
          <div className="text-[8px] mt-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-green-400 rounded-full" /> {closing} closing today
          </div>
        </div>
        <div className="flex-1 rounded-[14px] bg-white/90 backdrop-blur p-2 sm:p-2.5">
          <div className="text-[8px] font-bold opacity-60 tracking-widest text-blue-900">RESPONSE</div>
          <div className="text-[17px] sm:text-[22px] font-black leading-none mt-1 text-blue-600">&lt;{resp}m</div>
          <div className="text-[8px] mt-1 font-bold text-blue-600/70">AI auto-reply</div>
        </div>
      </div>
    </div>
  )
}

/* Continuous flip loop constants — rotates continuously without stopping at a steady,
   smooth pace of exactly 3.5s per full rotation cycle (180deg total). */
const SPEED = 180 / 3.5 // ~51.43 deg/s (3.5s per rotation)
const FLIP = 90

/**
 * Compact, auto-flipping 3D card that cycles through every service, with a
 * pair of themed sticker icons piping out of its left edge for each face.
 * Sized to drop into the hero's graphic slot in place of HeroServiceCollage.
 */
export default function AiServicesFlipCards() {
  const [index, setIndex] = useState(1)
  const cardElRef = useRef(null)
  const angleRef = useRef(0)
  const phaseRef = useRef('forward')
  const manualRef = useRef(false)

  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const startTimeRef = useRef(0)
  const totalDragDistRef = useRef(0)
  const SENSITIVITY = 0.55 // deg per px drag

  const service = cardServices[index]
  const isAutomation = service.id === 'automation'
  const isCrm = service.id === 'custom-crm'

  const indexRef = useRef(index)
  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    let rafId
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const el = cardElRef.current
      if (!manualRef.current && !isDraggingRef.current && el) {
        angleRef.current += SPEED * dt
        if (phaseRef.current === 'forward') {
          if (angleRef.current >= FLIP) {
            angleRef.current = -FLIP
            phaseRef.current = 'back'
            setIndex((i) => (i + 1) % cardServices.length)
          }
        } else if (angleRef.current >= 0) {
          angleRef.current = 0
          phaseRef.current = 'forward'
        }
        el.style.transform = `rotateY(${angleRef.current}deg)`
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const goTo = useCallback(
    (target, dir = 1) => {
      if (manualRef.current || target === indexRef.current) return
      const el = cardElRef.current
      if (!el) return
      manualRef.current = true
      phaseRef.current = 'forward'
      const exitAngle = dir * 90
      const enterAngle = dir * -90
      el.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      el.style.transform = `rotateY(${exitAngle}deg)`
      window.setTimeout(() => {
        el.style.transition = 'none'
        el.style.transform = `rotateY(${enterAngle}deg)`
        setIndex(target)
        angleRef.current = enterAngle
        window.setTimeout(() => {
          el.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
          el.style.transform = 'rotateY(0deg)'
          angleRef.current = 0
          window.setTimeout(() => {
            el.style.transition = 'none'
            manualRef.current = false
            phaseRef.current = 'forward'
          }, 360)
        }, 30)
      }, 340)
    },
    []
  )

  const next = useCallback(() => goTo((indexRef.current + 1) % cardServices.length, 1), [goTo])
  const prev = useCallback(() => goTo((indexRef.current - 1 + cardServices.length) % cardServices.length, -1), [goTo])

  const onPointerDown = useCallback((e) => {
    // Only primary left-click or phone touch (button === 0)
    if (e.button !== 0) return

    isDraggingRef.current = true
    lastXRef.current = e.clientX
    startTimeRef.current = performance.now()
    totalDragDistRef.current = 0

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return

    const dx = e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    totalDragDistRef.current += Math.abs(dx)

    // Swiping left (dx < 0) advances forward (+angle), swiping right (dx > 0) goes backward (-angle)
    const dAngle = -dx * SENSITIVITY
    angleRef.current += dAngle

    // Wrap forward past 90deg -> advance slide and continue
    while (angleRef.current >= FLIP) {
      angleRef.current -= 180
      phaseRef.current = 'back'
      setIndex((i) => (i + 1) % cardServices.length)
    }
    // Wrap backward past -90deg -> previous slide and continue
    while (angleRef.current <= -FLIP) {
      angleRef.current += 180
      phaseRef.current = 'forward'
      setIndex((i) => (i - 1 + cardServices.length) % cardServices.length)
    }

    const el = cardElRef.current
    if (el) {
      el.style.transform = `rotateY(${angleRef.current}deg)`
    }
  }, [])

  const onPointerUp = useCallback(
    (e) => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false

      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}

      const dt = performance.now() - startTimeRef.current
      const dist = totalDragDistRef.current

      // If it was just a quick tap without drag (dist < 6px and dt < 300ms), advance to next
      if (dist < 6 && dt < 300) {
        next()
        return
      }

      // Resume continuous rotation from current angle seamlessly
      if (angleRef.current < 0) {
        phaseRef.current = 'back'
      } else {
        phaseRef.current = 'forward'
      }
    },
    [next]
  )

  const onPointerCancel = useCallback((e) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}
    if (angleRef.current < 0) {
      phaseRef.current = 'back'
    } else {
      phaseRef.current = 'forward'
    }
  }, [])

  return (
    <div className="relative w-[280px] sm:w-[340px] mx-auto">
      <style>
        {`
          .flip-perspective { perspective: 1400px; transform-style: preserve-3d; }
          @keyframes flipWave {
            0%, 100% { height: 6px; }
            50% { height: 15px; }
          }
          @keyframes chatTyping {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-3px); opacity: 1; }
          }
          @keyframes raDrawLine {
            from { stroke-dashoffset: 120; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes raMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes raFadePop {
            from { opacity: 0; transform: translateY(4px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes raArrowBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          @keyframes raFloat1 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes raFloat2 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2.5px); }
          }
          @keyframes raFloat3 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3.5px); }
          }
          @keyframes raGlowPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.55); }
            50% { box-shadow: 0 0 0 7px rgba(255,255,255,0); }
          }
          @keyframes raRing {
            0% { transform: scale(0.75); opacity: 0.8; }
            100% { transform: scale(1.35); opacity: 0; }
          }
          @keyframes raFlow {
            from { background-position: 0 0; }
            to { background-position: 16px 0; }
          }
          @keyframes raFlowY {
            from { background-position: 0 0; }
            to { background-position: 0 16px; }
          }
        `}
      </style>

      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous solution"
          className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-all z-40 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next solution"
          className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-all z-40 active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flip-perspective w-full h-[400px] sm:h-[440px]">
          <div
            ref={cardElRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onContextMenu={(e) => e.preventDefault()}
            className="relative w-full h-full cursor-grab active:cursor-grabbing select-none touch-pan-y"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <CardSticker service={service} />
            {service.id === 'ivr' ? (
              <GenAIVoiceSupportView num={service.num} />
            ) : (
            <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(15,23,42,0.35)]">
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: service.id === 'support'
                    ? 'linear-gradient(145deg, rgba(71, 85, 105, 0.42) 0%, rgba(148, 163, 184, 0.26) 100%)'
                    : isAutomation
                      ? AUTOMATION_GRADIENT
                      : isCrm
                        ? CRM_GRADIENT
                      : `linear-gradient(180deg, ${service.color} 0%, ${service.accent} 120%)`,
                  backdropFilter: service.id === 'support' ? 'blur(10px)' : undefined,
                }}
              />
              {!isAutomation && !isCrm && (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.32),transparent)]" />
                  <div className="absolute -top-16 -right-12 w-[180px] h-[180px] bg-white/15 rounded-full blur-[28px]" />
                  <div className="absolute -bottom-12 -left-8 w-[140px] h-[140px] bg-black/10 rounded-full blur-[22px]" />
                </>
              )}

              <div className={`relative h-full flex flex-col ${isAutomation || isCrm ? 'p-4' : 'p-3'}`}>
                {isAutomation ? (
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-white shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[9.5px] font-extrabold tracking-wide text-emerald-900">
                        {BADGES[service.id].toUpperCase()}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-white font-black text-[12px]">
                      {service.num}
                    </div>
                  </div>
                ) : isCrm ? (
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-[#0f172a] shadow">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-[9.5px] font-extrabold tracking-wide text-white">
                        {BADGES[service.id].toUpperCase()}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-black text-[12px] shadow">
                      {service.num}
                    </div>
                  </div>
                ) : (
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[8.5px] font-bold tracking-[0.12em] text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {BADGES[service.id].toUpperCase()}
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] ${service.id === 'support' ? 'bg-white text-zinc-900 shadow-[0_2px_10px_rgba(0,0,0,0.12)]' : 'bg-white/20 backdrop-blur text-white border border-white/20'}`}>
                    {service.num}
                  </div>
                </div>
                )}

                <div className="mt-2.5 flex-1 flex flex-col items-center gap-2 px-0.5 justify-center min-h-0">
                  {service.id === 'automation' && (
                    <AutomationView />
                  )}
                  {service.id === 'growth' && (
                    <ReportsAnalyticsView />
                  )}
                  {service.id === 'chatbots' && (
                    <ChatSupportView service={service} />
                  )}
                  {isCrm && (
                    <CrmView />
                  )}
                </div>

                {isAutomation ? (
                  <Link
                    to={`/services/${service.path}`}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="mt-3 w-full bg-white rounded-full h-[46px] flex items-center justify-between pl-5 pr-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-shadow"
                  >
                    <span className="font-extrabold text-[13px] text-emerald-900">Explore Automation</span>
                    <span className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                      <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                    </span>
                  </Link>
                ) : isCrm ? (
                  <Link
                    to={`/services/${service.path}`}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="mt-2 sm:mt-3 w-full bg-[#0f172a] rounded-full h-[42px] sm:h-[46px] flex items-center justify-between pl-5 pr-1.5 shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    <span className="font-extrabold text-[13px] text-white">Open CRM Dashboard</span>
                    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0f172a]">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2.6} />
                    </span>
                  </Link>
                ) : service.id !== 'support' && (
                  <Link
                    to={`/services/${service.path}`}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="mt-2 bg-white rounded-2xl p-2 flex items-center gap-2 shadow-[0_10px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.24)] transition-shadow"
                  >
                    <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-3 h-3 text-zinc-500" />
                    </div>
                    <div className="flex-1 text-[10px] font-semibold text-zinc-700 truncate">
                      Explore {service.label}
                    </div>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${service.color}, ${service.accent})` }}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                )}

              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {cardServices.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to ${s.label}`}
            onClick={() => goTo(i, i >= index ? 1 : -1)}
            className="group relative py-2"
          >
            <div
              className={`h-[6px] rounded-full transition-all duration-300 ${
                i === index ? 'w-[20px] bg-zinc-900' : 'w-[6px] bg-zinc-300 group-hover:bg-zinc-400'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
