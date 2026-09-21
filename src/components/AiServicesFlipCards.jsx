import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react'
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
import slide1Icon1 from '../assets/slide1icon.png'
import slide1Icon2 from '../assets/slide1icon2.png'
import slide1Icon3 from '../assets/slide1icon3.png'
import slide3Icon from '../assets/slide3icon.png'
import robotImg from '../assets/chatbot/robot-mascot.png'
import aiDiagramImg from '../assets/slide5icon1.png'

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
  support: [
    { src: slide1Icon1, side: 'right', top: '10%', width: 'w-[4.5rem] sm:w-[5.5rem]', bare: true },
    { src: slide1Icon2, side: 'right', top: '54%', width: 'w-[4.5rem] sm:w-[5.5rem]', bare: true },
    { src: slide1Icon3, side: 'left', top: '28%', width: 'w-[5rem] sm:w-[6.2rem]', bare: true },
  ],
  ivr: { src: headsetImg, size: 'cover', position: 'center 38%', rotate: -6, bare: true, width: 'w-[7rem] sm:w-[9.5rem]', side: 'right', top: '15%', shift: '-mr-1 sm:-mr-2' },
  chatbots: [{ src: slide3Icon, side: 'left', top: '26%', width: 'w-[5rem] sm:w-[6.5rem]', bare: true, rotate: 4 }],
  automation: { src: robotImg, side: 'right', top: '15%', width: 'w-[5.5rem] sm:w-[7.5rem]', bare: true, rotate: -8 },
  growth: { src: aiDiagramImg, size: '440% auto', position: '22% 74%', rotate: -10, top: '24%' },
  'custom-crm': { src: aiDiagramImg, size: '520% auto', position: '50% 87%', rotate: -7, top: '24%' },
}

function CardSticker({ service }) {
  const cfg = STICKERS[service.id]
  const list = Array.isArray(cfg) ? cfg : [cfg]
  return (
    <div className="absolute inset-0 pointer-events-none z-30" style={{ transformStyle: 'preserve-3d' }}>
      {list.map((s, i) => {
        const side = s.side === 'right' ? 'right' : 'left'
        const sideOffset = side === 'right' ? '-right-10 sm:-right-14' : '-left-10 sm:-left-14'
        return (
          <div
            key={`${service.id}-${i}`}
            className={`absolute ${sideOffset} z-30 pointer-events-none transition-opacity duration-300`}
            style={{
              top: s.top || '15%',
              transform: `translateZ(35px) rotate(${s.rotate ?? 0}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {s.bare ? (
              <div className={`animate-[stickerFloat_3.2s_ease-in-out_infinite] ${s.shift || ''}`}>
                <img
                  src={s.src}
                  alt=""
                  aria-hidden="true"
                  className={`${s.width || 'w-24 sm:w-28'} h-auto drop-shadow-[0_20px_35px_rgba(15,23,42,0.35)]`}
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
    <div className="w-full flex-1 flex flex-col overflow-hidden rounded-[20px] bg-slate-50 shadow-[0_16px_32px_rgba(0,0,0,0.18)]">
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
                className={`max-w-[78%] text-[10px] leading-[1.35] px-2.5 py-1.5 rounded-2xl shadow-sm ${
                  m.from === 'bot'
                    ? 'bg-white text-zinc-800 rounded-bl-[4px]'
                    : 'bg-zinc-900 text-white rounded-br-[4px]'
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-[4px] px-2.5 py-1.5 flex items-center gap-1">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-1 h-1 rounded-full bg-zinc-400"
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
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes chatTyping {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-3px); opacity: 1; }
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
                  {service.id === 'support' && (
                    <img
                      src={slide1Img}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-auto rounded-xl shadow-[0_16px_32px_rgba(0,0,0,0.2)]"
                    />
                  )}
                  {service.id === 'chatbots' && (
                    <ChatSupportView service={service} />
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
