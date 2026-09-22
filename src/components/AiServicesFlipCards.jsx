import { Fragment, useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight, TrendingUp, Zap, Inbox, ShieldCheck, Layers, Check, Users, ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'

/* Badge label for each service card — overrides `label` from data/services.js
   so the badge text can differ from the site-wide service name. */
const BADGES = {
  support: 'Hybrid Contact Support',
  ivr: 'AI Voice Support',
  chatbots: 'AI Chat Support',
  automation: 'Business Automation',
  growth: 'Reports & Analytics',
  'custom-crm': 'CRM Solutions',
}

/* Slides that still show the agent demo (avatar + headline + chat bubbles).
   Slides 1, 3, 4, 5, 6 are emptied and are filled per-card later. */
const KEEP_DEMO = new Set(['ivr'])
import headsetImg from '../assets/headset.png'
import slide2Icon from '../assets/slide2icon.png'
import slide1Img from '../assets/slide1.png'
import slide3Icon from '../assets/slide3icon.png'
import robotImg from '../assets/chatbot/robot-mascot.png'
import slide5Icon1 from '../assets/slide5icon1.png'
import slide5Icon2 from '../assets/slide5icon2.png'

/* Flavor copy + avatar initials for each service card — keyed by service id from data/services.js */
const FLAIR = {
  support: {
    name: 'Hassan',
    initials: 'HS',
    issue: 'My support call just got disconnected!',
    reply: "I'll reconnect you instantly, no need to repeat yourself.",
  },
  ivr: {
    name: 'Vihan',
    initials: 'VS',
    issue: 'Can AI actually handle my billing query?',
    reply: 'Yes! Let me pull up your account and check right away.',
  },
  chatbots: {
    name: 'Suhani',
    initials: 'CS',
    issue: 'I just received my order, but the size is wrong!',
    reply: "So sorry about that — I'll set up the exchange now.",
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
  support: { src: slide1Img, side: 'center', top: '20%', width: 'w-[22.4rem] sm:w-[26.4rem]', bare: true, rotate: -2 },
  ivr: { src: headsetImg, size: 'cover', position: 'center 38%', rotate: -6, bare: true, width: 'w-[7rem] sm:w-[9.5rem]', side: 'right', top: '15%', shift: '-mr-1 sm:-mr-2' },
  chatbots: [{ src: slide3Icon, side: 'left', top: '26%', width: 'w-[5rem] sm:w-[6.5rem]', bare: true, rotate: 4 }],
  automation: { src: robotImg, side: 'right', top: '15%', width: 'w-[5.5rem] sm:w-[7.5rem]', bare: true, rotate: -8 },
  growth: [
    { src: slide5Icon1, side: 'left', top: '24%', width: 'w-[5rem] sm:w-[6.5rem]', bare: true, rotate: -10 },
    { src: slide5Icon2, side: 'right', top: '15%', width: 'w-[4.5rem] sm:w-[6rem]', bare: true, rotate: 8 },
  ],
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
                ? `translateX(-50%) translateZ(35px) rotate(${s.rotate ?? 0}deg)`
                : `translateZ(35px) rotate(${s.rotate ?? 0}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {s.bare ? (
              <div className={`animate-[stickerFloat_3.2s_ease-in-out_infinite] ${s.shift || ''}`}>
                <img
                  src={s.src}
                  alt=""
                  aria-hidden="true"
                  className={`${s.width || 'w-24 sm:w-28'} h-auto max-w-none drop-shadow-[0_20px_35px_rgba(15,23,42,0.35)]`}
                />
              </div>
            ) : (
              <div className="relative animate-[stickerFloat_3.2s_ease-in-out_infinite]">
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
    { from: 'user', text: 'Hi! I just received my order, but the size is wrong!' },
    { from: 'bot', text: "So sorry about that — could you confirm which size you ordered and which you received?" },
    { from: 'user', text: 'I ordered a Medium but got a Large.' },
    { from: 'bot', text: "Thanks! I'll set up the exchange right away." },
    { from: 'bot', text: 'Done — your Medium is on the way. Enjoy!' },
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
  const TOASTS = ['Report exported', '3 alerts resolved', 'CSAT up 2%', 'New data synced', 'Export ready']
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

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
  }, [])

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

/* Business & Automation — the slide-4 (automation) front face. Mirrors the site's
   AutomationWorkflow design language: a light slate panel with color-coded icon
   stages (Capture → Process → Action → Learn) linked by a flowing dashed line,
   plus a cycling live status line. No duplicate heading — the card badge carries it. */
function AutomationView() {
  const [stIndex, setStIndex] = useState(0)
  const STATUS = ['Capturing request…', 'Processing workflow…', 'Action synced to CRM ✓']

  useEffect(() => {
    const id = setInterval(() => setStIndex((i) => (i + 1) % STATUS.length), 2200)
    return () => clearInterval(id)
  }, [STATUS.length])

  const STAGES = [
    { Icon: Inbox, label: 'Capture', color: '#8b5cf6', bg: 'from-violet-500 to-indigo-500' },
    { Icon: Zap, label: 'Process', color: '#ff7a00', bg: 'from-orange-500 to-amber-500' },
    { Icon: TrendingUp, label: 'Action', color: '#10b981', bg: 'from-emerald-500 to-teal-500' },
    { Icon: ShieldCheck, label: 'Learn', color: '#ec4899', bg: 'from-pink-500 to-rose-500' },
  ]

  return (
    <div className="relative w-full flex-1 min-h-0 flex flex-col overflow-hidden">
      <div className="absolute -top-10 -left-8 w-24 h-24 rounded-full blur-2xl opacity-50 pointer-events-none" style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.35) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-10 -right-8 w-24 h-24 rounded-full blur-2xl opacity-40 pointer-events-none" style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0.18) 0%, transparent 70%)' }} />

      <div className="relative z-10 px-2.5 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md bg-white/25 backdrop-blur-sm text-white grid place-items-center shadow-sm border border-white/20">
            <Zap className="w-3 h-3" />
          </span>
          <span className="text-[9px] font-extrabold tracking-[0.14em] text-white drop-shadow-sm">AUTOMATION FLOW</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-[2px] backdrop-blur-sm">
          <span className="relative flex h-[6px] w-[6px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-70" />
            <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-emerald-300" />
          </span>
          <span className="text-[7px] font-bold text-white">Live</span>
        </div>
      </div>

      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center gap-3 px-2">
        <div className="relative text-[8px] font-semibold tracking-wide text-white/80">
          Zero-touch workflows that run themselves
        </div>

        <div className="relative w-full px-4">
          <div className="relative flex items-center gap-2.5 z-10">
            {[STAGES[0], STAGES[1]].map(({ Icon, label, color, bg }, i) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="relative">
                  <span
                    className="absolute inset-0 rounded-[14px]"
                    style={{ border: `2px solid ${color}70`, animation: 'raRing 1.8s ease-out infinite', animationDelay: `${i * 0.5}s` }}
                  />
                  <div className={`w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br ${bg} grid place-items-center text-white shadow-[0_8px_18px_rgba(15,23,42,0.3)]`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <span className="text-[8px] font-bold tracking-wide text-white/85">{label}</span>
              </div>
            ))}
          </div>

          <div className="absolute left-1/2 top-[46px] bottom-[46px] w-[2px] -translate-x-1/2 rounded-full z-0"
            style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.5) 0 4px, transparent 4px 8px)', animation: 'raFlowY 1s linear infinite' }} />

          <div className="relative flex items-center gap-2.5 z-10 mt-2.5">
            {[STAGES[2], STAGES[3]].map(({ Icon, label, color, bg }, i) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="relative">
                  <span
                    className="absolute inset-0 rounded-[14px]"
                    style={{ border: `2px solid ${color}70`, animation: 'raRing 1.8s ease-out infinite', animationDelay: `${i * 0.5}s` }}
                  />
                  <div className={`w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br ${bg} grid place-items-center text-white shadow-[0_8px_18px_rgba(15,23,42,0.3)]`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <span className="text-[8px] font-bold tracking-wide text-white/85">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div key={stIndex} className="relative flex items-center gap-1.5 bg-white/95 border border-white/60 text-zinc-800 rounded-full px-3 py-1 text-[8px] font-bold shadow-sm animate-[raFadePop_0.4s_ease]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {STATUS[stIndex]}
        </div>
      </div>
    </div>
  )
}

/* Slide 6 (custom-crm): CRM pipeline mock, ported from the CRM Solutions
   design (Crm-Solutions-Card). Renders inside the shared card chrome — the
   badge/number header and bottom Explore link come from the card itself, so
   the duplicated header (with the "08" circle) is intentionally omitted. */
function CrmView() {
  const [bars, setBars] = useState([18, 28, 16, 34, 22, 38, 26])
  const STAGES = [
    { label: 'Lead', count: '24', active: false },
    { label: 'Qualified', count: '12', active: true },
    { label: 'Won', count: '8', active: false },
  ]

  useEffect(() => {
    const id = setInterval(() => {
      setBars((arr) => arr.map((v, i) => (i === 5 ? 34 + Math.round(Math.random() * 8) : Math.max(12, Math.min(34, v + (Math.random() - 0.5) * 10)))))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full flex-1 min-h-0 pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1.2px, transparent 0)', backgroundSize: '20px 20px' }}
      />
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[200px] bg-white/20 blur-[30px] rounded-[32px]" />

      {/* DEAL WON chip (left) */}
      <div className="absolute left-[-14px] top-[32%] z-20" style={{ animation: 'raFloat1 3.2s ease-in-out infinite' }}>
        <div className="w-[88px] h-[78px] rotate-[-10deg] rounded-[18px] bg-gradient-to-br from-[#FF9A6B] to-[#FF6B35] shadow-[0_12px_28px_rgba(255,107,53,0.4),0_0_0_1px_rgba(255,255,255,0.4)_inset] p-[10px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-[20px] h-[20px] rounded-full bg-white/90 flex items-center justify-center">
              <Check className="w-[10px] h-[10px] text-[#FF6B35]" strokeWidth={2.4} />
            </div>
            <div className="w-[12px] h-[12px] rounded-full bg-white/25" />
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-wide text-white/90 leading-none">DEAL WON</div>
            <div className="text-[13px] font-extrabold text-white mt-[3px] tracking-tight leading-none">+$8.2k</div>
          </div>
        </div>
      </div>

      {/* Pipeline Board (center) */}
      <div className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 w-[216px] z-30 rotate-[-1deg]">
        <div className="rounded-[20px] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.28),0_1px_0_0_rgba(255,255,255,0.8)_inset,0_0_0_1px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-[14px] pt-[12px] pb-[10px] flex items-center justify-between border-b border-black/[0.06]">
            <div className="flex items-center gap-[7px]">
              <div className="w-[24px] h-[24px] rounded-[8px] bg-[#F3F0FF] border border-[#E9E2FF] flex items-center justify-center">
                <Layers className="w-[12px] h-[12px] text-[#7B5BFF]" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#111] leading-none tracking-tight">Pipeline Board</div>
                <div className="text-[8.5px] text-black/40 font-medium mt-[2px]">12 deals • 3 teams</div>
              </div>
            </div>
            <div className="flex gap-[4px]">
              <div className="w-[4px] h-[4px] rounded-full bg-black/10" />
              <div className="w-[4px] h-[4px] rounded-full bg-black/10" />
              <div className="w-[4px] h-[4px] rounded-full bg-black/10" />
            </div>
          </div>

          <div className="px-[14px] pt-[10px] flex items-center justify-between">
            <div className="flex -space-x-[7px]">
              <div className="w-[22px] h-[22px] rounded-full bg-[#E8E6FF] border-[2px] border-white flex items-center justify-center text-[9px] font-bold text-[#5B3DF0]">AL</div>
              <div className="w-[22px] h-[22px] rounded-full bg-[#FFE8E0] border-[2px] border-white flex items-center justify-center text-[9px] font-bold text-[#FF6B35]">MK</div>
              <div className="w-[22px] h-[22px] rounded-full bg-[#DCF5E5] border-[2px] border-white flex items-center justify-center">
                <div className="w-[11px] h-[11px] rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#22C55E]" />
                </div>
              </div>
              <div className="w-[22px] h-[22px] rounded-full bg-[#111] border-[2px] border-white flex items-center justify-center text-[8px] font-bold text-white">+5</div>
            </div>
            <div className="h-[19px] px-[7px] rounded-full bg-[#F6F3FF] border border-[#ECE6FF] flex items-center gap-[4px]">
              <span className="w-[5px] h-[5px] rounded-full bg-[#7B5BFF] animate-pulse" />
              <span className="text-[8.5px] font-bold text-[#5B3DF0]">Live sync</span>
            </div>
          </div>

          <div className="px-[14px] pt-[14px]">
            <div className="flex items-center justify-between">
              {STAGES.map((s, i) => (
                <Fragment key={s.label}>
                  <div className={`flex flex-col items-center ${s.active ? 'opacity-100' : 'opacity-60'}`}>
                    <div className={`w-[30px] h-[5px] rounded-full ${s.active ? 'bg-[#7B5BFF]' : 'bg-black/10'} mb-[5px]`} />
                    <div className="text-[9px] font-semibold text-black/70 leading-none">{s.label}</div>
                    <div className={`text-[10px] font-extrabold mt-[2px] ${s.active ? 'text-[#5B3DF0]' : 'text-black/50'}`}>{s.count}</div>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="flex-1 mx-[5px] h-[1px] bg-gradient-to-r from-black/10 to-black/5 relative top-[-8px]">
                      <div className={`absolute top-1/2 -translate-y-1/2 ${i === 0 ? 'left-[60%] bg-[#7B5BFF]' : 'left-[20%] bg-black/20'} w-[6px] h-[6px] rounded-full border-[1.5px] border-white shadow-sm`} />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="px-[14px] pt-[12px] pb-[12px]">
            <div className="rounded-[12px] bg-[#FAF8FF] border border-[#F0EBFF] p-[9px]">
              <div className="flex items-center justify-between mb-[7px]">
                <div className="text-[9px] font-bold tracking-wide text-black/50 uppercase">Deal Value</div>
                <div className="flex items-center gap-[4px] text-[9px] font-bold text-[#22C55E]">
                  <ArrowUpRight className="w-[9px] h-[9px]" strokeWidth={2.5} />
                  12%
                </div>
              </div>
              <div className="flex items-end gap-[3px] h-[26px]">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-[3px] bg-gradient-to-t from-[#7B5BFF]/15 to-[#7B5BFF] transition-all duration-700"
                    style={{ height: `${h}px`, opacity: i === 5 ? 1 : 0.55 + i * 0.06 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-[10px] left-[8%] right-[8%] h-[18px] bg-black/20 blur-[12px] rounded-full -z-10" />
      </div>

      {/* Contacts (right top) */}
      <div className="absolute right-[2px] top-[13%] z-40" style={{ animation: 'raFloat2 3.2s ease-in-out infinite', animationDelay: '0.4s' }}>
        <div className="w-[92px] rotate-[7deg] rounded-[16px] bg-white shadow-[0_14px_32px_-8px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.04)] p-[9px] border border-black/[0.03]">
          <div className="flex items-center justify-between mb-[7px]">
            <div className="text-[8.5px] font-extrabold tracking-[0.06em] text-black/40 uppercase">Contacts</div>
            <div className="w-[15px] h-[15px] rounded-full bg-[#F3F0FF] flex items-center justify-center">
              <Users className="w-[9px] h-[9px] text-[#7B5BFF]" strokeWidth={2} />
            </div>
          </div>
          <div className="flex -space-x-[5px] mb-[7px]">
            <div className="w-[20px] h-[20px] rounded-full bg-gradient-to-br from-[#FFD6C8] to-[#FF9A6B] border-[2px] border-white" />
            <div className="w-[20px] h-[20px] rounded-full bg-gradient-to-br from-[#C8D6FF] to-[#7B9CFF] border-[2px] border-white" />
            <div className="w-[20px] h-[20px] rounded-full bg-gradient-to-br from-[#C8FFD6] to-[#5BC07A] border-[2px] border-white" />
          </div>
          <div className="h-[4px] w-full rounded-full bg-black/5 overflow-hidden">
            <div className="h-full w-[72%] bg-[#111] rounded-full" />
          </div>
        </div>
      </div>

      {/* GROWTH (right bottom) */}
      <div className="absolute right-[-8px] bottom-[28%] z-30" style={{ animation: 'raFloat3 3.2s ease-in-out infinite', animationDelay: '0.8s' }}>
        <div className="w-[86px] rotate-[-6deg] rounded-[16px] bg-[#111111] shadow-[0_16px_36px_-10px_rgba(0,0,0,0.5)] p-[9px] border border-white/10">
          <div className="flex items-center justify-between mb-[7px]">
            <div className="w-[18px] h-[18px] rounded-full bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-[10px] h-[10px] text-white" strokeWidth={2} />
            </div>
            <div className="text-[8px] font-bold text-white/50 tracking-wide">GROWTH</div>
          </div>
          <svg width="68" height="26" viewBox="0 0 72 28" className="overflow-visible">
            <path d="M2 22 Q 12 18 20 14 T 38 10 T 58 6 T 70 2" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
            <path d="M2 22 Q 12 18 20 14 T 38 10 T 58 6 T 70 2 L 70 26 L 2 26 Z" fill="white" opacity="0.08" />
            <circle cx="70" cy="2" r="3" fill="white" stroke="#111" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* revenue pill (bottom center-left) */}
      <div className="absolute left-[34%] bottom-[15%] z-40" style={{ animation: 'raFloat1 3.4s ease-in-out infinite', animationDelay: '1.2s' }}>
        <div className="h-[32px] rotate-[2deg] rounded-full bg-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.04)] flex items-center gap-[7px] pl-[5px] pr-[11px] border border-black/[0.04]">
          <div className="w-[22px] h-[22px] rounded-full bg-[#111] flex items-center justify-center">
            <span className="text-[11px] font-bold text-white">$</span>
          </div>
          <div className="flex items-baseline gap-[5px]">
            <span className="text-[12px] font-extrabold tracking-tight text-[#111]">$12.4k</span>
            <span className="text-[9px] font-semibold text-black/40">revenue</span>
          </div>
          <div className="ml-[1px] w-[16px] h-[16px] rounded-full bg-[#E8FFE9] flex items-center justify-center">
            <Check className="w-[9px] h-[9px] text-[#22C55E]" strokeWidth={2.8} />
          </div>
        </div>
      </div>

      {/* sparkles */}
      <div className="absolute left-[24%] top-[9%] w-[6px] h-[6px] rotate-45 bg-white/80 shadow-[0_0_8px_white]" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 50%, 61% 65%, 50% 100%, 39% 65%, 2% 50%, 39% 35%)' }} />
      <div className="absolute right-[24%] top-[52%] w-[4px] h-[4px] rotate-45 bg-white/60" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 50%, 61% 65%, 50% 100%, 39% 65%, 2% 50%, 39% 35%)' }} />
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
  const [index, setIndex] = useState(0)
  const cardElRef = useRef(null)
  const angleRef = useRef(0)
  const phaseRef = useRef('forward')
  const manualRef = useRef(false)

  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const startTimeRef = useRef(0)
  const totalDragDistRef = useRef(0)
  const SENSITIVITY = 0.55 // deg per px drag

  const service = services[index]
  const flair = FLAIR[service.id]

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
            setIndex((i) => (i + 1) % services.length)
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

  const next = useCallback(() => goTo((indexRef.current + 1) % services.length, 1), [goTo])
  const prev = useCallback(() => goTo((indexRef.current - 1 + services.length) % services.length, -1), [goTo])

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
      setIndex((i) => (i + 1) % services.length)
    }
    // Wrap backward past -90deg -> previous slide and continue
    while (angleRef.current <= -FLIP) {
      angleRef.current += 180
      phaseRef.current = 'forward'
      setIndex((i) => (i - 1 + services.length) % services.length)
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
          @keyframes stickerFloat {
            0%, 100% { transform: translateY(0) rotate(-3deg); }
            50% { transform: translateY(-16px) rotate(3deg); }
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
            <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(15,23,42,0.35)]">
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ background: `linear-gradient(180deg, ${service.color} 0%, ${service.accent} 120%)` }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.32),transparent)]" />
              <div className="absolute -top-16 -right-12 w-[180px] h-[180px] bg-white/15 rounded-full blur-[28px]" />
              <div className="absolute -bottom-12 -left-8 w-[140px] h-[140px] bg-black/10 rounded-full blur-[22px]" />

              <div className="relative h-full p-3 flex flex-col">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[8.5px] font-bold tracking-[0.12em] text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {BADGES[service.id].toUpperCase()}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-[10px] border border-white/20">
                    {service.num}
                  </div>
                </div>

{KEEP_DEMO.has(service.id) && (
                  <div className="mt-6 flex flex-col items-center text-center text-white">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] flex items-center justify-center text-zinc-900 font-bold text-[15px] tracking-wide overflow-hidden">
                        {service.id === 'ivr' ? (
                          <img src={slide2Icon} alt="" aria-hidden="true" className="w-full h-full object-cover scale-[1.72]" />
                        ) : (
                          flair.initials
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-zinc-900 border-2 border-white flex items-center justify-center shadow-sm">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="mt-2.5 font-semibold text-[13px] leading-none tracking-[-0.01em]">
                      {flair.name} is on it
                    </div>
                    <div className="mt-2 flex items-center gap-[2.5px] h-[15px]">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="w-[2.5px] bg-white/90 rounded-full"
                          style={{ animation: 'flipWave 0.9s ease-in-out infinite', animationDelay: `${i * 0.07}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-2.5 flex-1 flex flex-col items-center gap-2 px-0.5 justify-center min-h-0">
                  {service.id === 'chatbots' && (
                    <ChatSupportView service={service} />
                  )}
                  {service.id === 'automation' && (
                    <AutomationView />
                  )}
                  {service.id === 'growth' && (
                    <ReportsAnalyticsView />
                  )}
                  {service.id === 'custom-crm' && (
                    <CrmView />
                  )}
{KEEP_DEMO.has(service.id) && (
                    <>
                      <div className="self-end max-w-[85%]">
                        <div className="bg-[#FFF8E7] text-zinc-900 text-[10.5px] leading-[1.3] px-3 py-2 rounded-2xl rounded-br-[6px] shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
                          {flair.issue}
                        </div>
                      </div>
                      <div className="self-start max-w-[85%]">
                        <div className="bg-zinc-900 text-white text-[10.5px] leading-[1.3] px-3 py-2 rounded-2xl rounded-bl-[6px] shadow-[0_6px_16px_rgba(0,0,0,0.22)]">
                          {flair.reply}
                        </div>
                      </div>
                    </>
                  )}
                </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {services.map((s, i) => (
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
