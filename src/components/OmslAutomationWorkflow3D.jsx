import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  BellRing,
  Brain,
  ChartColumn,
  ChartPie,
  CircleCheck,
  Database,
  Download,
  FileSpreadsheet,
  FileText,
  Layers,
  LayoutDashboard,
  Mail,
  MessageCircleMore,
  Pause,
  Play,
  Settings,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  UsersRound,
  Zap,
} from 'lucide-react'
import referenceImg from '../assets/automation-workflow-reference.jpg'

const n0 = [
  { id: 'email', label: 'Emails', Icon: Mail, color: '#8b5cf6', bg: 'from-violet-500 to-indigo-500', light: '#ede9fe' },
  { id: 'chat', label: 'Live Chat / Chatbots', Icon: MessageCircleMore, color: '#3b82f6', bg: 'from-blue-500 to-cyan-500', light: '#dbeafe' },
  { id: 'form', label: 'Web Forms / Portals', Icon: FileText, color: '#10b981', bg: 'from-emerald-500 to-teal-500', light: '#d1fae5' },
  { id: 'api', label: 'APIs / Integrations', Icon: Database, color: '#ff7a00', bg: 'from-orange-500 to-amber-500', light: '#ffedd5' },
  { id: 'internal', label: 'Internal Inputs', sub: '(Sheets, etc.)', Icon: FileSpreadsheet, color: '#ec4899', bg: 'from-pink-500 to-rose-500', light: '#fce7f3' },
]

const Sp = [
  { id: 'capture', title: 'CAPTURE', desc: 'Collect Data', Icon: Download, color: '#8b5cf6', detail: 'Ingests from all channels in real-time. Auto-parses attachments, threads & payloads.' },
  { id: 'understand', title: 'UNDERSTAND', desc: 'AI / Rules Engine', Icon: Brain, color: '#3b82f6', detail: 'NLP classification, intent detection, entity extraction with custom business rules.' },
  { id: 'process', title: 'PROCESS', desc: 'Automate Tasks', Icon: Settings, color: '#ff7a00', detail: 'Orchestrates workflows, approvals, and decision trees without manual touch.' },
  { id: 'action', title: 'ACTION', desc: 'Execute & Integrate', Icon: CircleCheck, color: '#10b981', detail: 'Pushes to CRMs, ERPs, ticketing and triggers downstream actions.' },
  { id: 'learn', title: 'LEARN', desc: 'Improve Continuously', Icon: ChartColumn, color: '#ec4899', detail: 'Feedback loop trains models, reduces exceptions and improves accuracy.' },
]

const l0 = [
  { id: 'int', label: 'Integrations', sub: 'CRM, ERP, etc.', Icon: Layers, color: '#8b5cf6', bg: 'from-violet-500 to-indigo-500', light: '#ede9fe' },
  { id: 'rep', label: 'Reporting', Icon: ChartPie, color: '#3b82f6', bg: 'from-blue-500 to-cyan-500', light: '#dbeafe' },
  { id: 'alert', label: 'Alerts & Notifications', Icon: BellRing, color: '#ff7a00', bg: 'from-orange-500 to-amber-500', light: '#ffedd5' },
  { id: 'dash', label: 'Dashboards', Icon: LayoutDashboard, color: '#10b981', bg: 'from-emerald-500 to-teal-500', light: '#d1fae5' },
]

const u0 = [
  { id: 'time', label: 'Time Saved', value: '60-90%', num: 75, suffix: '%', Icon: Timer, color: '#8b5cf6' },
  { id: 'effort', label: 'Manual Effort Reduced', value: '70-80%', num: 75, suffix: '%', Icon: Zap, color: '#3b82f6' },
  { id: 'error', label: 'Error Reduction', value: '80-95%', num: 87, suffix: '%', Icon: ShieldCheck, color: '#10b981' },
  { id: 'response', label: 'Faster Response Time', value: 'Faster', Icon: Timer, color: '#ff7a00' },
  { id: 'cx', label: 'Better Customer Experience', value: 'CX ↑', Icon: UsersRound, color: '#ec4899' },
  { id: 'cost', label: 'Lower Operational Costs', value: 'Costs ↓', Icon: BadgeDollarSign, color: '#6366f1' },
  { id: 'growth', label: 'Scalable Business Growth', value: 'Growth', Icon: TrendingUp, color: '#06b6d4' },
]

function useCountUp(active, to, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = null
    let start = null
    const tick = (d) => {
      if (start === null) start = d
      const c = Math.min((d - start) / duration, 1)
      const eased = 1 - Math.pow(1 - c, 3)
      setValue(Math.round(eased * to))
      if (c < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, to, duration])
  return value
}

function ImpactCard({ a, s, inView }) {
  const isRange = a.id === 'time' || a.id === 'effort' || a.id === 'error'
  const p = useCountUp(inView && typeof a.num === 'number', a.num ?? 0)
  return (
    <div
      className="group relative rounded-[14px] bg-white border border-slate-200/70 shadow-[0_6px_20px_rgba(15,23,42,0.05),inset_0_1px_0_white] p-3 sm:p-3.5 hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)] transition-all duration-300"
      style={{ animation: `entrance 0.6s both ${420 + s * 60}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="h-8 w-8 rounded-[10px] grid place-items-center text-white icon-3d" style={{ background: a.color, boxShadow: `0 6px 14px ${a.color}35` }}>
          <a.Icon size={14} />
        </div>
        <span className="text-[10px] font-bold tracking-wide px-1.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500">
          {String(s + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="mt-3">
        <p className="mono text-[18px] sm:text-[20px] font-bold tracking-[-0.02em] leading-none" style={{ color: a.color }}>
          {isRange ? (
            <>
              {inView ? `${p}-${p + 15}` : a.value}
              <span className="text-[12px]">{a.suffix}</span>
            </>
          ) : (
            a.value
          )}
        </p>
        <p className="text-[11px] font-bold leading-[1.2] mt-1.5 text-slate-700">{a.label}</p>
      </div>
      <div className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" style={{ boxShadow: `inset 0 0 0 1px ${a.color}22` }} />
    </div>
  )
}

export default function OmslAutomationWorkflow3D() {
  const [flowing, setFlowing] = useState(true)
  const [hoverInput, setHoverInput] = useState(null)
  const [hoverOutput, setHoverOutput] = useState(null)
  const [hoverStep, setHoverStep] = useState(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [inView, setInView] = useState(false)
  const engineRef = useRef(null)
  const impactRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.2 })
    if (impactRef.current) obs.observe(impactRef.current)
    return () => obs.disconnect()
  }, [])

  const onTilt = (e) => {
    if (!engineRef.current) return
    const rect = engineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8
    const ry = (x / rect.width - 0.5) * 10
    setTilt({ rx, ry })
  }

  const inputConnectors = [
    { id: 'email', y: 108, grad: 'g-violet', col: '#8b5cf6' },
    { id: 'chat', y: 208, grad: 'g-blue', col: '#3b82f6' },
    { id: 'form', y: 308, grad: 'g-green', col: '#10b981' },
    { id: 'api', y: 408, grad: 'g-orange', col: '#ff7a00' },
    { id: 'internal', y: 508, grad: 'g-pink', col: '#ec4899' },
  ]
  const outputConnectors = [
    { id: 'int', y: 118, grad: 'g-violet', col: '#8b5cf6' },
    { id: 'rep', y: 222, grad: 'g-blue', col: '#3b82f6' },
    { id: 'alert', y: 330, grad: 'g-orange', col: '#ff7a00' },
    { id: 'dash', y: 432, grad: 'g-green', col: '#10b981' },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#fbfcff] text-[#0f172a] selection:bg-violet-200 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@500&display=swap');
        *{font-family:"Plus Jakarta Sans",system-ui,sans-serif}
        .mono{font-family:"JetBrains Mono",monospace}
        @keyframes floatA{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-18px) translateX(8px)}}
        @keyframes floatB{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(14px) translateX(-10px)}}
        @keyframes floatCard{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes dashFlow{to{stroke-dashoffset:-40}}
        @keyframes glowPulse{0%,100%{opacity:0.9;filter:brightness(1)}50%{opacity:1;filter:brightness(1.2)}}
        @keyframes entrance{from{opacity:0;transform:translateY(18px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        .entrance{animation:entrance 0.7s cubic-bezier(.16,1,.3,1) both}
        .glass{background:linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78));backdrop-filter:blur(18px) saturate(1.2);border:1px solid #e8eef8}
        .glass-strong{background:linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,255,0.9));backdrop-filter:blur(22px);border:1px solid #e3e8f5}
        .shadow-3d{box-shadow:0 12px 32px rgba(99,102,241,0.10),0 4px 12px rgba(15,23,42,0.06),0 1px 0 rgba(255,255,255,0.9) inset,0 -1px 0 rgba(226,232,240,0.6) inset}
        .shadow-3d-hover:hover{box-shadow:0 20px 48px rgba(99,102,241,0.18),0 8px 20px rgba(15,23,42,0.08),0 1px 0 rgba(255,255,255,0.9) inset}
        .icon-3d{box-shadow:0 8px 18px rgba(0,0,0,0.12),0 2px 6px rgba(0,0,0,0.08),inset 0 1px 1px rgba(255,255,255,0.9),inset 0 -1px 1px rgba(0,0,0,0.08)}
        .dot-grid{background-image:radial-gradient(rgba(148,163,184,0.22) 1px,transparent 1px);background-size:22px 22px}
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8f9ff] to-[#f3f4ff]" />
        <div className="absolute inset-0 dot-grid opacity-[0.5]" />
        <div className="absolute -top-[18%] -left-[10%] w-[62%] h-[62%] rounded-full blur-[110px] opacity-40" style={{ background: 'radial-gradient(60% 60% at 50% 50%, #a78bfa 0%, #c4b5fd 18%, #ddd6fe 36%, transparent 70%)', animation: 'floatA 12s ease-in-out infinite' }} />
        <div className="absolute -bottom-[20%] -right-[12%] w-[58%] h-[58%] rounded-full blur-[110px] opacity-35" style={{ background: 'radial-gradient(60% 60% at 50% 50%, #93c5fd 0%, #bfdbfe 22%, #e0f2fe 40%, transparent 72%)', animation: 'floatB 14s ease-in-out infinite' }} />
        <div className="absolute top-[38%] left-[48%] w-[28%] h-[26%] rounded-full blur-[80px] opacity-25" style={{ background: 'radial-gradient(60% 60% at 50% 50%, #fdba74 0%, #fed7aa 30%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 lg:pt-8 pb-10">
        <header className="entrance flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6 lg:mb-8" style={{ animationDelay: '0ms' }}>
          <div>
            <h2 className="mt-3 text-[28px] sm:text-[32px] lg:text-[40px] font-extrabold tracking-[-0.03em] leading-[0.95]">
              AUTOMATION <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">WORKFLOW</span>
            </h2>
            <p className="mt-1.5 text-[13px] sm:text-[14px] font-semibold tracking-[0.18em] text-slate-500">Automate. Simplify. Accelerate.</p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <img src={referenceImg} alt="reference" className="hidden lg:block h-10 w-10 rounded-lg object-cover border border-slate-200 opacity-60" />
            <button
              onClick={() => setFlowing((a) => !a)}
              className="group inline-flex items-center gap-2 rounded-full glass-strong shadow-3d px-4 h-10 text-[13px] font-bold tracking-wide hover:shadow-3d-hover transition-all"
            >
              <span className={`grid place-items-center h-6 w-6 rounded-full bg-slate-900 text-white transition-transform ${flowing ? '' : 'opacity-60'}`}>
                {flowing ? <Pause size={12} /> : <Play size={12} className="translate-x-[1px]" />}
              </span>
              Animate Flow
              <span className={`h-2 w-2 rounded-full ml-1 ${flowing ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-300'}`} style={flowing ? { animation: 'glowPulse 1.6s infinite' } : undefined} />
            </button>
          </div>
        </header>

        <div className="relative">
          <svg className="hidden lg:block pointer-events-none absolute inset-0 w-full h-[860px] -z-0" viewBox="0 0 1440 860" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g-violet" x1="0" x2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="g-blue" x1="0" x2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="g-green" x1="0" x2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="g-orange" x1="0" x2="1">
                <stop offset="0%" stopColor="#ff7a00" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ff7a00" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="g-pink" x1="0" x2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="c" />
                <feMerge>
                  <feMergeNode in="c" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {inputConnectors.map((a) => {
              const active = hoverInput === a.id || hoverInput === null
              const path = `M 232 ${a.y} C 360 ${a.y}, 380 210, 492 210`
              return (
                <g key={a.id} opacity={active ? 1 : 0.18}>
                  <path d={path} fill="none" stroke={`url(#${a.grad})`} strokeWidth={2.5} strokeLinecap="round" strokeDasharray={active ? '0' : '0'} style={{ filter: 'url(#glow)' }} />
                  <path d={path} fill="none" stroke={a.col} strokeWidth={1} strokeLinecap="round" strokeDasharray="6 10" opacity={0.35} style={{ animation: flowing && active ? 'dashFlow 1s linear infinite' : undefined }} />
                  {flowing &&
                    active && (
                      <>
                        <circle r="5" fill={a.col} filter="url(#glow)">
                          <animateMotion dur={`${2.2 + Math.random()}s`} repeatCount="indefinite" path={path} />
                        </circle>
                        <circle r="2.2" fill="white" opacity={0.9}>
                          <animateMotion dur={`${2.2 + Math.random()}s`} repeatCount="indefinite" path={path} />
                        </circle>
                      </>
                    )}
                </g>
              )
            })}
            {outputConnectors.map((a) => {
              const active = hoverOutput === a.id || hoverOutput === null
              const path = `M 980 210 C 1090 210, 1110 ${a.y}, 1220 ${a.y}`
              return (
                <g key={a.id} opacity={active ? 1 : 0.18}>
                  <path d={path} fill="none" stroke={`url(#${a.grad})`} strokeWidth={2.5} strokeLinecap="round" style={{ filter: 'url(#glow)' }} />
                  <path d={path} fill="none" stroke={a.col} strokeWidth={1} strokeDasharray="6 10" opacity={0.35} style={{ animation: flowing && active ? 'dashFlow 1s linear infinite reverse' : undefined }} />
                  {flowing &&
                    active && (
                      <>
                        <circle r="5" fill={a.col} filter="url(#glow)">
                          <animateMotion dur={`${2 + Math.random()}s`} repeatCount="indefinite" path={path} />
                        </circle>
                        <circle r="2.2" fill="white">
                          <animateMotion dur={`${2 + Math.random()}s`} repeatCount="indefinite" path={path} />
                        </circle>
                      </>
                    )}
                </g>
              )
            })}
          </svg>

          <div className="grid lg:grid-cols-[260px_1fr_260px] gap-5 lg:gap-6 items-start relative z-10">
            {/* Input channels */}
            <div className="entrance lg:sticky lg:top-6" style={{ animationDelay: '80ms' }}>
              <div className="glass rounded-[20px] shadow-3d p-3 sm:p-4">
                <div className="flex items-center gap-2 px-2 pt-1 pb-3">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 grid place-items-center text-white">
                    <Layers size={14} />
                  </div>
                  <h3 className="text-[12px] font-extrabold tracking-[0.14em]">INPUT CHANNELS</h3>
                </div>
                <div className="space-y-2.5">
                  {n0.map((a, s) => (
                    <div
                      key={a.id}
                      onMouseEnter={() => setHoverInput(a.id)}
                      onMouseLeave={() => setHoverInput(null)}
                      className={`group relative rounded-[14px] glass-strong shadow-3d px-3 py-3 flex items-center gap-3 transition-all duration-300 cursor-pointer
                        ${hoverInput === a.id ? 'scale-[1.02] shadow-[0_14px_32px_rgba(99,102,241,0.18)] -translate-y-[1px]' : 'hover:translate-y-[-1px]'}
                      `}
                      style={{ animation: `floatCard 4s ease-in-out ${s * 0.25}s infinite` }}
                    >
                      <div className={`h-11 w-11 rounded-[12px] icon-3d grid place-items-center bg-gradient-to-br ${a.bg} text-white shrink-0`}>
                        <a.Icon size={18} strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold leading-tight tracking-[-0.01em]">{a.label}</p>
                        {a.sub && <p className="text-[11px] font-semibold text-slate-500 leading-none mt-0.5">{a.sub}</p>}
                      </div>
                      <div className="ml-auto h-2 w-2 rounded-full" style={{ background: a.color, boxShadow: `0 0 10px ${a.color}` }} />
                      {hoverInput === a.id && <div className="absolute inset-0 rounded-[14px] pointer-events-none" style={{ boxShadow: `inset 0 0 0 1.5px ${a.color}40` }} />}
                    </div>
                  ))}
                </div>
                <div className="lg:hidden mt-3 flex justify-center">
                  <div className="w-0.5 h-10 rounded-full bg-gradient-to-b from-violet-300 to-transparent" />
                </div>
              </div>
            </div>

            {/* Engine + capabilities */}
            <div className="space-y-5">
              <div
                ref={engineRef}
                onMouseMove={onTilt}
                onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
                className="entrance glass-strong rounded-[22px] shadow-3d p-4 sm:p-5 lg:p-6 relative overflow-hidden"
                style={{
                  animationDelay: '160ms',
                  transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.25s ease-out',
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet-200 to-indigo-100 blur-[28px] opacity-60" />
                  <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 blur-[28px] opacity-60" />
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center shadow-lg">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-extrabold tracking-[0.14em]">OMSL AUTOMATION ENGINE</h3>
                      <p className="text-[11px] font-bold text-slate-500 tracking-wide">5-step autonomous pipeline</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                  </span>
                </div>

                <div className="relative mt-5 lg:mt-6">
                  <div className="absolute top-[42px] left-[28px] right-[28px] h-[2px] hidden sm:block">
                    <div className="h-full w-full bg-gradient-to-r from-violet-200 via-blue-200 via-orange-200 to-pink-200 rounded-full opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[dashFlow_2s_linear_infinite]" style={{ WebkitMaskImage: 'linear-gradient(90deg,transparent,black,transparent)' }} />
                  </div>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3 relative">
                    {Sp.map((a, s) => {
                      const active = hoverStep === a.id
                      return (
                        <div
                          key={a.id}
                          onMouseEnter={() => setHoverStep(a.id)}
                          onMouseLeave={() => setHoverStep(null)}
                          className="group relative flex flex-col items-center"
                          style={{ animation: `floatCard 3.5s ease-in-out ${s * 0.18}s infinite` }}
                        >
                          <div
                            className={`relative h-[62px] w-[62px] sm:h-[72px] sm:w-[72px] rounded-[18px] grid place-items-center icon-3d cursor-pointer transition-all duration-300
                              ${active ? 'scale-[1.08] -translate-y-1' : 'group-hover:-translate-y-1 group-hover:scale-[1.04]'}`}
                            style={{
                              background: `radial-gradient(120% 120% at 30% 20%, white 0%, ${a.color}14 35%, white 70%)`,
                              border: `1px solid ${a.color}22`,
                              boxShadow: active ? `0 16px 32px ${a.color}30, 0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 white` : `0 8px 22px ${a.color}18, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 white`,
                            }}
                          >
                            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-[12px] grid place-items-center text-white" style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}CC)`, boxShadow: `0 6px 14px ${a.color}40` }}>
                              <a.Icon size={18} />
                            </div>
                            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white border border-slate-200 grid place-items-center text-[10px] font-extrabold shadow-sm">{s + 1}</div>
                            {active && <div className="absolute inset-0 rounded-[18px] pointer-events-none animate-pulse" style={{ boxShadow: `0 0 0 2px ${a.color}55` }} />}
                          </div>
                          <div className="mt-2.5 text-center">
                            <p className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.12em]">{a.title}</p>
                            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight mt-0.5 max-w-[92px] sm:max-w-[110px]">{a.desc}</p>
                          </div>
                          {s < Sp.length - 1 && (
                            <div className="hidden sm:grid absolute top-[32px] -right-[10px] h-6 w-6 place-items-center rounded-full bg-white border border-slate-200 shadow-sm">
                              <ArrowRight size={12} className="text-slate-500" />
                            </div>
                          )}
                          <div className={`pointer-events-none absolute bottom-[-8px] translate-y-full left-1/2 -translate-x-1/2 z-20 w-[200px] rounded-xl glass-strong shadow-3d p-3 text-left transition-all duration-300 ${active ? 'opacity-100 translate-y-[8px]' : 'opacity-0 translate-y-[12px]'}`}>
                            <p className="text-[11px] font-bold flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.color }} /> {a.title}
                            </p>
                            <p className="text-[11px] leading-[1.4] text-slate-600 mt-1">{a.detail}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="entrance lg:sticky lg:top-6" style={{ animationDelay: '320ms' }}>
              <div className="glass rounded-[20px] shadow-3d p-3 sm:p-4">
                <div className="flex items-center gap-2 px-2 pt-1 pb-3">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 grid place-items-center text-white">
                    <ChartPie size={14} />
                  </div>
                  <h3 className="text-[12px] font-extrabold tracking-[0.14em]">OUTPUTS</h3>
                </div>
                <div className="space-y-2.5">
                  {l0.map((a, s) => (
                    <div
                      key={a.id}
                      onMouseEnter={() => setHoverOutput(a.id)}
                      onMouseLeave={() => setHoverOutput(null)}
                      className={`group relative rounded-[14px] glass-strong shadow-3d px-3 py-3.5 flex items-center gap-3 transition-all duration-300 cursor-pointer ${hoverOutput === a.id ? 'scale-[1.02] -translate-y-[1px] shadow-[0_14px_32px_rgba(16,185,129,0.18)]' : 'hover:-translate-y-[1px]'}`}
                      style={{ animation: `floatCard 4s ease-in-out ${(s + 2) * 0.28}s infinite` }}
                    >
                      <div className={`h-11 w-11 rounded-[12px] icon-3d grid place-items-center bg-gradient-to-br ${a.bg} text-white shrink-0`}>
                        <a.Icon size={18} strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold leading-tight">{a.label}</p>
                        {a.sub && <p className="text-[11px] font-semibold text-slate-500 leading-none mt-0.5">{a.sub}</p>}
                      </div>
                      <div className="ml-auto h-2 w-2 rounded-full" style={{ background: a.color, boxShadow: `0 0 10px ${a.color}` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-[12px] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-3 flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/10 grid place-items-center">
                    <Zap size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold tracking-wide">REAL-TIME SYNC</p>
                    <p className="text-[11px] opacity-70 leading-tight">All outputs stream continuously</p>
                  </div>
                  <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                </div>
              </div>
            </div>
          </div>

          {/* Business impact */}
          <div ref={impactRef} className="entrance mt-6 lg:mt-8" style={{ animationDelay: '400ms' }}>
            <div className="glass-strong rounded-[20px] shadow-3d p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg bg-slate-900 text-white grid place-items-center">
                  <TrendingUp size={14} />
                </div>
                <h3 className="text-[12px] font-extrabold tracking-[0.16em]">BUSINESS IMPACT</h3>
                <div className="ml-auto hidden sm:flex items-center gap-2 text-[10px] font-bold tracking-wide text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> MEASURED ACROSS CLIENTS
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3">
                {u0.map((a, s) => (
                  <ImpactCard key={a.id} a={a} s={s} inView={inView} />
                ))}
              </div>
            </div>
          </div>

          <footer className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-bold tracking-[0.18em] text-slate-500">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
              AUTOMATE. INNOVATE. ELEVATE.{' '}
              <span className="opacity-60">— POWERED BY OPEN MIND SERVICES LIMITED</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.14em]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> 3D ENGINE v2 • {flowing ? 'FLOWING' : 'PAUSED'}
              </span>
              <span className="hidden sm:inline opacity-60">© 2025 OMSL</span>
            </div>
          </footer>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
    </div>
  )
}