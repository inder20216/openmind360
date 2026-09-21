import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import customerPhoto from '../assets/ivr-demo-caller.jpg'

// Standalone hero graphic (replaces the old ServicesOrbit) — a color card
// with a live voice badge, a customer photo floating above it (left-middle,
// separated with its own shadow for depth), and a chat exchange that grows
// over time and overlaps the photo's lower-right edge. No photo
// backdrop/headline here; this sits in the original hero's right-hand
// graphic slot, same as ServicesOrbit did. Photo/avatar are temporary stock
// placeholders; chat is illustrative, not a real transcript or a real
// customer's post.
const script = [
  { from: 'user', text: 'Hi, I just received my order, but the size is wrong!' },
  { from: 'bot', text: "Hi! I'm really sorry about that, I'll be happy to help." },
  { from: 'user', text: 'Could you confirm the size you ordered and received?' },
]

function ChatExchange() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setShown((s) => (s >= script.length ? s : s + 1)), 1300)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col gap-2.5">
      <AnimatePresence initial={false}>
        {script.slice(0, shown).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`flex flex-col ${m.from === 'bot' ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10.5px] font-semibold text-white/70 mb-1 px-1">
              {m.from === 'user' ? 'Customer' : 'AI agent'}
            </span>
            <div className="text-[12.5px] leading-snug rounded-2xl px-3.5 py-2 max-w-[190px] bg-white/30 backdrop-blur-md text-white shadow-[0_8px_20px_rgba(15,23,42,0.2)]">
              {m.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function HeroServiceCollage() {
  return (
    <div className="relative w-[300px] sm:w-[360px] h-[420px] sm:h-[480px] mx-auto">
      {/* Solid color backdrop card */}
      <div className="absolute inset-0 rounded-[36px] bg-[#8677ee] shadow-[0_40px_80px_-20px_rgba(60,40,150,0.35)]" />

      {/* Voice badge — upper right, above the card */}
      <div className="absolute -top-4 right-2 sm:right-4 z-30 w-[180px] rounded-2xl bg-white px-4 py-3 shadow-[0_16px_36px_-10px_rgba(15,23,42,0.25)]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-slate-500">Voice Agent</span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Live
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-[3px] h-4">
            {[6, 12, 8, 15, 5].map((h, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-b from-ox to-ob"
                animate={{ height: [h, h * 1.6, h] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <p className="text-[11.5px] font-medium text-slate-700">Suhani is on a call</p>
        </div>
      </div>

      {/* Customer photo — left-middle of the card, floating above its
          surface (own strong shadow + white ring = visibly separated) */}
      <div className="absolute left-[6%] top-[27%] z-10 w-[150px] h-[150px] sm:w-[175px] sm:h-[175px] rounded-full overflow-hidden ring-[6px] ring-white shadow-[0_30px_55px_-10px_rgba(15,23,42,0.55)]">
        <img src={customerPhoto} alt="" aria-hidden="true" className="w-full h-full object-cover" />
      </div>

      {/* Chat exchange — overlaps the photo's lower-right edge, sitting in
          front of it */}
      <div className="absolute right-[8%] top-[42%] z-20 w-[190px] sm:w-[210px]">
        <ChatExchange />
      </div>
    </div>
  )
}
