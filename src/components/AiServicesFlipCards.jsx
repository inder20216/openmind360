import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react'
import { services } from '../data/services'
import headsetImg from '../assets/headset.png'
import robotImg from '../assets/chatbot/robot-mascot.png'
import channelIconsImg from '../assets/chatbot/channel-icons.png'
import aiDiagramImg from '../assets/ai-image3.png'

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
 * One big 3D sticker per service, cropped straight out of real assets in
 * src/assets (no new image files) via a background-image window:
 *  - support / automation: whole-image "cover" crop of a standalone 3D render
 *    (the headset, the chatbot robot mascot).
 *  - ivr / chatbots: channel-icons.png is 3 icons laid side by side — a
 *    widthwise 300%-size sprite crop picks out the left (call) or right
 *    (chat) one without any distortion.
 *  - growth / custom-crm: ai-image3.png is an 8-badge diagram whose
 *    "REAL-TIME ANALYTICS" and "CRM INTEGRATION" badges line up with those
 *    two services — zoomed in and positioned onto just that badge.
 * Keyed by service id, each entry is plain CSS background-size/position.
 */
const STICKERS = {
  support: { src: headsetImg, size: 'cover', position: 'center 38%', rotate: -9 },
  ivr: { src: channelIconsImg, size: '300% auto', position: '0% 58%', rotate: -6 },
  chatbots: { src: channelIconsImg, size: '300% auto', position: '100% 50%', rotate: -11 },
  automation: { src: robotImg, size: 'cover', position: 'center 42%', rotate: -8 },
  growth: { src: aiDiagramImg, size: '440% auto', position: '22% 74%', rotate: -10 },
  'custom-crm': { src: aiDiagramImg, size: '520% auto', position: '50% 87%', rotate: -7 },
}

function CardSticker({ service }) {
  const cfg = STICKERS[service.id]
  return (
    <div
      className="absolute -left-11 sm:-left-14 top-[22%] z-30 pointer-events-none"
      style={{ transform: `rotate(${cfg.rotate}deg)` }}
    >
      <div className="relative animate-[stickerFloat_3.2s_ease-in-out_infinite]">
        <div
          className="absolute inset-0 rounded-[30%] blur-xl opacity-70"
          style={{ background: service.color }}
        />
        <div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[30%] bg-white ring-[5px] ring-white shadow-[0_22px_44px_-10px_rgba(15,23,42,0.5)]"
          style={{
            backgroundImage: `url(${cfg.src})`,
            backgroundSize: cfg.size,
            backgroundPosition: cfg.position,
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
    </div>
  )
}

/**
 * Compact, auto-flipping 3D card that cycles through every service, with a
 * pair of themed sticker icons piping out of its left edge for each face.
 * Sized to drop into the hero's graphic slot in place of HeroServiceCollage.
 */
export default function AiServicesFlipCards() {
  const [index, setIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(true)
  const [isFlipping, setIsFlipping] = useState(false)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const service = services[index]
  const flair = FLAIR[service.id]

  const goTo = useCallback(
    (target) => {
      if (isFlipping || target === index) return
      setIsFlipping(true)
      setSpinning(true)
      setRotation(90)
      window.setTimeout(() => {
        setSpinning(false)
        setRotation(-90)
        setIndex(target)
        window.setTimeout(() => {
          setSpinning(true)
          setRotation(0)
          window.setTimeout(() => setIsFlipping(false), 320)
        }, 40)
      }, 300)
    },
    [index, isFlipping]
  )

  const next = useCallback(() => goTo((index + 1) % services.length), [index, goTo])
  const prev = useCallback(() => goTo((index - 1 + services.length) % services.length), [index, goTo])

  /* Auto-flip every 3s, paused on hover/focus */
  useEffect(() => {
    if (paused) return undefined
    intervalRef.current = window.setInterval(() => {
      if (!isFlipping) next()
    }, 3000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [paused, isFlipping, next])

  return (
    <div className="relative w-[280px] sm:w-[340px] mx-auto">
      <style>
        {`
          .flip-perspective { perspective: 1400px; }
          @keyframes flipWave {
            0%, 100% { height: 6px; }
            50% { height: 15px; }
          }
          @keyframes stickerFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>

      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous solution"
          className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-all z-10 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next solution"
          className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-all z-10 active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <CardSticker service={service} />

        <div
          className="flip-perspective w-full h-[400px] sm:h-[440px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            onClick={next}
            className="relative w-full h-full cursor-pointer select-none"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transition: spinning ? 'transform 0.32s cubic-bezier(0.4,0,0.2,1)' : 'none',
            }}
          >
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
                    {service.label.toUpperCase()}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-[10px] border border-white/20">
                    {service.num}
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-center text-center text-white">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] flex items-center justify-center text-zinc-900 font-bold text-[15px] tracking-wide">
                      {flair.initials}
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

                <div className="mt-2.5 flex-1 flex flex-col gap-2 px-0.5 justify-center min-h-0">
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
                </div>

                <Link
                  to={`/services/${service.path}`}
                  onClick={(e) => e.stopPropagation()}
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
            onClick={() => goTo(i)}
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
