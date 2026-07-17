import { useState } from 'react'

const iconProps = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }

function BotIcon(props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.9} {...iconProps} {...props}>
      <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
    </svg>
  )
}
function MicIcon(props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.9} {...iconProps} {...props}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}
function HeadsetIcon(props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.9} {...iconProps} {...props}>
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </svg>
  )
}
function Settings2Icon(props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.9} {...iconProps} {...props}>
      <path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
    </svg>
  )
}
function Link2Icon(props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.9} {...iconProps} {...props}>
      <path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" />
    </svg>
  )
}
function ChartColumnIcon(props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.9} {...iconProps} {...props}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
    </svg>
  )
}
function RouteIcon(props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.9} {...iconProps} {...props}>
      <circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" />
    </svg>
  )
}
function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.9} {...iconProps} {...props}>
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  )
}
function BrainIcon(props) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.9} {...iconProps} {...props}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  )
}
function PlayIcon(props) {
  return <svg viewBox="0 0 24 24" fill="white" {...props}><polygon points="6 3 20 12 6 21 6 3" /></svg>
}
function PauseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="white" {...props}>
      <rect x="14" y="4" width="4" height="16" rx="1" /><rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}

const services = [
  { label: 'AI CHATBOTS', icon: BotIcon, from: 'from-blue-400', to: 'to-blue-600', dot: '#60A5FA', text: 'text-blue-600', border: 'border-blue-100' },
  { label: 'AI VOICE BOTS', icon: MicIcon, from: 'from-violet-400', to: 'to-violet-600', dot: '#A78BFA', text: 'text-violet-600', border: 'border-violet-100' },
  { label: 'AGENT ASSIST', icon: HeadsetIcon, from: 'from-fuchsia-400', to: 'to-pink-500', dot: '#E879F9', text: 'text-fuchsia-600', border: 'border-fuchsia-100' },
  { label: 'SMART AUTOMATION', icon: Settings2Icon, from: 'from-orange-400', to: 'to-amber-500', dot: '#FB923C', text: 'text-orange-600', border: 'border-orange-100' },
  { label: 'CRM INTEGRATION', icon: Link2Icon, from: 'from-sky-400', to: 'to-blue-600', dot: '#38BDF8', text: 'text-sky-600', border: 'border-sky-100' },
  { label: 'REAL-TIME ANALYTICS', icon: ChartColumnIcon, from: 'from-purple-400', to: 'to-indigo-600', dot: '#A78BFA', text: 'text-indigo-600', border: 'border-indigo-100' },
  { label: 'INTELLIGENT ROUTING', icon: RouteIcon, from: 'from-pink-400', to: 'to-rose-500', dot: '#FB7185', text: 'text-pink-600', border: 'border-pink-100' },
  { label: 'OMNICHANNEL SUPPORT', icon: GlobeIcon, from: 'from-amber-400', to: 'to-orange-500', dot: '#FBBF24', text: 'text-amber-600', border: 'border-amber-100' },
]

export default function ServicesOrbit({ className = '' }) {
  const [playing, setPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const duration = 32 / speed

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <style>{`
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitCounterSpin { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>

      <div className="relative w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] shrink-0">
        <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 blur-2xl opacity-60 pointer-events-none" />

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="rounded-full p-[3px] bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 shadow-[0_12px_40px_-12px_rgba(124,58,237,0.4),0_4px_16px_rgba(0,0,0,0.08)]">
            <div className="bg-white rounded-full w-[90px] h-[90px] sm:w-[118px] sm:h-[118px] lg:w-[132px] lg:h-[132px] flex flex-col items-center justify-center relative">
              <div className="absolute inset-[10px] rounded-full border border-zinc-100" />
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-[0_8px_20px_-8px_rgba(99,102,241,0.6)] mb-1 sm:mb-1.5">
                <BrainIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-center leading-[1.05]">
                <div className="text-[9px] sm:text-[11px] font-extrabold tracking-tight text-zinc-900">Open Mind</div>
                <div className="text-[7px] sm:text-[8.5px] font-bold tracking-[0.18em] text-zinc-400 mt-[2px]">- SERVICES -</div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 rounded-full bg-white blur-xl opacity-70 scale-[1.35]" />
        </div>

        {/* Rotating ring */}
        <div
          className="absolute inset-0"
          style={{ animation: `orbitSpin ${duration}s linear infinite`, animationPlayState: playing ? 'running' : 'paused' }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="124" stroke="#E9E9EF" strokeWidth="1.2" strokeDasharray="7 7" strokeLinecap="round" opacity="0.9" />
            {services.map((s, i) => {
              const a = (i * 45 * Math.PI) / 180
              const sin = Math.sin(a)
              const cos = Math.cos(a)
              const ix = 200 + sin * 56
              const iy = 200 - cos * 56
              const ox = 200 + sin * 124
              const oy = 200 - cos * 124
              return (
                <g key={i}>
                  <line x1={ix} y1={iy} x2={ox} y2={oy} stroke="#E7E7EE" strokeWidth="1.25" strokeLinecap="round" />
                  <circle cx={ix} cy={iy} r="3.2" fill="white" stroke={s.dot} strokeWidth="1.2" />
                  <circle cx={ix} cy={iy} r="1.2" fill={s.dot} />
                  <circle cx={ox} cy={oy} r="3.2" fill="white" stroke={s.dot} strokeWidth="1.2" />
                  <circle cx={ox} cy={oy} r="1.2" fill={s.dot} />
                </g>
              )
            })}
          </svg>

          {services.map((s, i) => {
            const a = (i * 45 * Math.PI) / 180
            const left = 50 + Math.sin(a) * 35.5
            const top = 50 - Math.cos(a) * 35.5
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="absolute"
                style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div style={{ animation: `orbitCounterSpin ${duration}s linear infinite`, animationPlayState: playing ? 'running' : 'paused' }}>
                  <div className="flex flex-col items-center">
                    <div className={`w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] rounded-full bg-gradient-to-br ${s.from} ${s.to} shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25),0_4px_12px_-4px_rgba(0,0,0,0.15)] flex items-center justify-center relative ring-[3px] ring-white`}>
                      <Icon className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] text-white drop-shadow-sm" />
                      <div className="absolute top-[14%] left-[22%] w-[8px] h-[5px] bg-white/30 rounded-full blur-[0.5px] rotate-[-20deg]" />
                    </div>
                    <div className={`mt-2 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-white border ${s.border} shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.06)] flex items-center justify-center`}>
                      <span className={`text-[7px] sm:text-[8.5px] font-extrabold tracking-[0.06em] ${s.text} whitespace-nowrap`}>{s.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-3 bg-white border border-zinc-200 rounded-full p-1.5 pr-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)]">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black transition-colors shadow-sm"
          aria-label={playing ? 'Pause rotation' : 'Play rotation'}
        >
          {playing ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5 ml-0.5" />}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-wide text-zinc-500 uppercase">Speed</span>
          <input
            type="range"
            min={0.25}
            max={2.5}
            step={0.25}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-20 accent-zinc-900 h-1 cursor-pointer"
          />
          <span className="text-[10px] font-semibold text-zinc-900 w-6 text-right tabular-nums">{speed.toFixed(2)}x</span>
        </div>
      </div>
    </div>
  )
}
