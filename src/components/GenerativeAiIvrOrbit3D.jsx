import { useState } from 'react'
import {
  AudioWaveform,
  BarChart3,
  Database,
  Languages,
  Mic,
  PhoneCall,
} from 'lucide-react'

const orbitIcons = [
  { Icon: Mic },
  { Icon: AudioWaveform },
  { Icon: PhoneCall },
  { Icon: Languages },
  { Icon: Database },
  { Icon: BarChart3 },
]

export default function GenerativeAiIvrOrbit3D() {
  const [hovering, setHovering] = useState(false)
  const [tilt, setTilt] = useState({ x: 5, y: -8 })

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const nx = (e.clientX - cx) / r.width
    const ny = (e.clientY - cy) / r.height
    setTilt({ x: 5 - ny * 10, y: -8 + nx * 16 })
  }

  const rx = hovering ? tilt.x * 0.4 : tilt.x
  const ry = hovering ? tilt.y * 0.4 : tilt.y

  return (
    <>
      <style>{`
        @keyframes ivrFloat { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-8px) } }
        @keyframes ivrPulseDot { 0%,100% { transform: scale(1); opacity:1 } 50% { transform: scale(1.5); opacity:0.6 } }
        @keyframes ivrPulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.4), 0 0 40px rgba(56,189,248,0.22) } 50% { box-shadow: 0 0 0 18px rgba(56,189,248,0), 0 0 60px rgba(56,189,248,0.4) } }
        @keyframes ivrDashFlow { to { stroke-dashoffset:-20 } }
        @keyframes ivrOrbit0 { from{ transform: rotate(0deg) translateX(64px) rotate(0deg) } to{ transform: rotate(360deg) translateX(64px) rotate(-360deg) } }
        @keyframes ivrOrbit1 { from{ transform: rotate(60deg) translateX(64px) rotate(-60deg) } to{ transform: rotate(420deg) translateX(64px) rotate(-420deg) } }
        @keyframes ivrOrbit2 { from{ transform: rotate(120deg) translateX(64px) rotate(-120deg) } to{ transform: rotate(480deg) translateX(64px) rotate(-480deg) } }
        @keyframes ivrOrbit3 { from{ transform: rotate(180deg) translateX(64px) rotate(-180deg) } to{ transform: rotate(540deg) translateX(64px) rotate(-540deg) } }
        @keyframes ivrOrbit4 { from{ transform: rotate(240deg) translateX(64px) rotate(-240deg) } to{ transform: rotate(600deg) translateX(64px) rotate(-600deg) } }
        @keyframes ivrOrbit5 { from{ transform: rotate(300deg) translateX(64px) rotate(-300deg) } to{ transform: rotate(660deg) translateX(64px) rotate(-660deg) } }
      `}</style>

      <div
        className="relative will-change-transform select-none"
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setHovering(false); setTilt({ x: 5, y: -8 }) }}
      >
        <div
          className="relative min-w-0 h-[420px] md:h-[480px] rounded-[28px] overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.35)]"
          style={{
            background: 'linear-gradient(135deg, #0b1226 0%, #101d3f 55%, #0ea5e9 100%)',
            transform: `perspective(1200px) rotateY(${ry}deg) rotateX(${rx}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* grid overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" width="100%" height="100%">
            <defs>
              <pattern id="ivr-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ivr-grid)" />
          </svg>

          {/* center glow wash */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full bg-sky-400/10 blur-[60px] pointer-events-none" />

          {/* badges */}
          <div className="absolute top-4 left-5 right-5 flex justify-between items-center pointer-events-none z-10">
            <span className="text-[9px] font-[700] tracking-[0.16em] text-white/60">AI IVR</span>
            <span className="flex items-center gap-1.5 text-[9px] font-[700] text-[#38bdf8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-[ivrPulseDot_1.6s_ease-in-out_infinite]" />
              LISTENING
            </span>
          </div>

          {/* connector: caller to core */}
          <svg className="absolute left-[20%] top-[24%] w-[120px] h-[70px] hidden md:block z-10">
            <path d="M6,64 Q60,52 116,12" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="5 7" style={{ animation: 'ivrDashFlow 1.4s linear infinite' }} />
            <circle r="3" fill="#38bdf8"><animateMotion dur="2s" repeatCount="indefinite" path="M6,64 Q60,52 116,12" /></circle>
          </svg>

          {/* connector: core to handoff */}
          <svg className="absolute left-[52%] top-[58%] w-[180px] h-[70px] hidden md:block z-10">
            <path d="M8,60 Q90,54 168,16" fill="none" stroke="white" strokeOpacity="0.28" strokeWidth="1.4" strokeDasharray="5 7" style={{ animation: 'ivrDashFlow 1.6s linear infinite' }} />
            <circle r="3" fill="#f97316"><animateMotion dur="2.2s" repeatCount="indefinite" path="M8,60 Q90,54 168,16" /></circle>
          </svg>

          {/* CALLER card */}
          <div className="absolute left-[3%] top-[14%] z-20" style={{ transform: 'translateZ(40px)' }}>
            <div className="relative w-[104px] md:w-[120px]">
              <div className="bg-white/95 backdrop-blur rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.6)_inset] p-2.5 pb-3">
                <div className="w-full aspect-[0.95] rounded-[14px] overflow-hidden bg-gradient-to-br from-[#fef3c7] to-[#fde68a] flex items-end justify-center relative">
                  <div className="ml-auto mt-3 mr-3 w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-[3px] border-white shadow-lg" />
                  <div className="mb-2 absolute bottom-1 w-14 h-6 rounded-full bg-white/90" />
                  <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-white/90 shadow flex items-center justify-center text-[9px]">🎧</div>
                </div>
                <div className="mt-2 flex items-center gap-1.5 px-1">
                  <div className="w-5 h-5 rounded-full bg-[#2563eb] flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white/90" />
                  </div>
                  <span className="text-[10px] font-bold text-[#0f172a] leading-none">CALLER</span>
                </div>
              </div>
              <div className="absolute -right-3 -top-2 w-9 h-9 rounded-full bg-[#38bdf8] shadow-[0_10px_30px_rgba(56,189,248,0.6)] flex items-center justify-center animate-[ivrFloat_3s_ease-in-out_infinite]" style={{ transform: 'translateZ(30px)' }}>
                <PhoneCall className="w-[18px] h-[18px] text-white" />
              </div>
            </div>
          </div>

          {/* center core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="relative w-[188px] h-[188px] md:w-[204px] md:h-[204px] rounded-full flex items-center justify-center">
              <div className="absolute inset-[-26px] rounded-full border border-dashed border-white/10 pointer-events-none" />
              <div className="absolute inset-0 rounded-full border border-dashed border-white/15 pointer-events-none" />
              <div className="absolute inset-[22px] rounded-full border border-dashed border-white/10 pointer-events-none" />
              <div className="absolute inset-0 rounded-full" style={{ animation: 'ivrPulseGlow 3s ease-in-out infinite' }} />
              <div className="absolute inset-[12px] rounded-full bg-gradient-to-br from-[#38bdf8]/30 to-[#2563eb]/30 blur-[18px]" />
              <div className="absolute inset-[30px] rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_20px_60px_rgba(59,130,246,0.4)]" />

              {/* orbiting icons */}
              <div className="absolute inset-0">
                {orbitIcons.map(({ Icon }, i) => (
                  <div key={i} className="absolute left-1/2 top-1/2 w-0 h-0">
                    <div
                      className="w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.4)] flex items-center justify-center"
                      style={{ animation: `ivrOrbit${i} ${12 + i * 0.6}s linear infinite` }}
                    >
                      <Icon className="w-[16px] h-[16px] text-white" />
                    </div>
                  </div>
                ))}
              </div>

              {/* core face */}
              <div className="relative w-[62px] h-[62px] md:w-[68px] md:h-[68px] rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#2563eb] shadow-[0_12px_30px_rgba(37,99,235,0.6)] flex items-center justify-center border border-white/30">
                <div className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                  <span className="text-[22px]">🤖</span>
                </div>
              </div>
            </div>
            <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 whitespace-nowrap z-20">
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[10px] tracking-[0.2em] font-bold text-white/80">GEN AI CORE</div>
            </div>
          </div>

          {/* right cards: CHATBOT + HUMAN AGENT */}
          <div className="absolute right-[3%] bottom-[13%] flex flex-col gap-3 z-20" style={{ transform: 'translateZ(40px)' }}>
            <div className="w-[104px] md:w-[126px] bg-white/95 backdrop-blur rounded-[18px] shadow-[0_16px_40px_rgba(0,0,0,0.3)] p-3 border border-white/60 relative">
              <div className="w-9 h-9 rounded-full bg-[#0f172a] flex items-center justify-center mx-auto -mt-6 shadow-lg border-[3px] border-white">
                <span className="text-[16px]">💬</span>
              </div>
              <div className="mt-2 text-[11px] font-bold tracking-wide text-center">CHATBOT</div>
              <div className="mt-1.5 flex gap-1 justify-center">
                <div className="w-8 h-1.5 rounded-full bg-[#e2e8f0]" />
                <div className="w-4 h-1.5 rounded-full bg-[#e2e8f0]" />
              </div>
              <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-white shadow border border-[#e2e8f0] flex items-center justify-center -translate-y-1/2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="w-[104px] md:w-[126px] bg-gradient-to-br from-[#fff7ed] to-white backdrop-blur rounded-[18px] shadow-[0_16px_40px_rgba(0,0,0,0.3)] p-3 border border-white/60 relative">
              <div className="w-9 h-9 rounded-full bg-[#f97316] flex items-center justify-center mx-auto -mt-6 shadow-lg border-[3px] border-white">
                <span className="text-[16px]">🎧</span>
              </div>
              <div className="mt-2 text-[11px] font-bold tracking-wide text-center">HUMAN AGENT</div>
              <div className="mt-1.5 flex items-center justify-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-[10px] text-[#64748b]">Escalated</div>
              </div>
              <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-white shadow border border-[#e2e8f0] flex items-center justify-center -translate-y-1/2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
              </div>
            </div>
          </div>

          {/* bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="absolute -bottom-7 left-8 right-8 h-12 bg-[#0b1226]/60 blur-[24px] rounded-[24px] -z-10" />
      </div>

      <div className="mt-3 md:hidden text-center text-[10px] font-[600] text-[#94a3b8]">Drag to tilt · voice flows through the core</div>
    </>
  )
}