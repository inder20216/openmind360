import { useState } from 'react'
import {
  Globe,
  Search,
  ShoppingCart,
  Store,
  User,
  Users,
} from 'lucide-react'

const channels = [
  { id: 'ecom', label: 'eCommerce site', short: 'eCommerce site', Icon: ShoppingCart, color: '#16a34a', light: '#4ade80', dark: '#15803d', angle: 270, dist: 112 },
  { id: 'brickPink', label: 'Brick and Mortar Store', short: 'Brick and Mortar', Icon: Store, color: '#ec4899', light: '#f9a8d4', dark: '#be185d', angle: 322, dist: 118 },
  { id: 'search', label: 'Search', short: 'Search', Icon: Search, color: '#f59e0b', light: '#fcd34d', dark: '#b45309', angle: 18, dist: 124 },
  { id: 'brickRed', label: 'Brick and Mortar Store', short: 'Brick and Mortar', Icon: Store, color: '#ef4444', light: '#fca5a5', dark: '#b91c1c', angle: 78, dist: 112 },
  { id: 'wom', label: 'World of Mouth', short: 'World of Mouth', Icon: Users, color: '#8b5cf6', light: '#c4b5fd', dark: '#6d28d9', angle: 140, dist: 118 },
  { id: 'social', label: 'Social Networks', short: 'Social Networks', Icon: Globe, color: '#3b82f6', light: '#93c5fd', dark: '#1d4ed8', angle: 200, dist: 124 },
]

function ChannelLabel({ short }) {
  const parts = {
    'eCommerce site': ['eCommerce', 'site'],
    'Brick and Mortar': ['Brick and', 'Mortar Store'],
    'World of Mouth': ['World of', 'Mouth'],
    'Social Networks': ['Social', 'Networks'],
  }[short]
  return parts ? (
    <>
      {parts[0]}
      <br />
      {parts[1]}
    </>
  ) : (
    short
  )
}

const orbitDots = [
  { r: 88, d: 6, dur: 12, col: '#3b82f6' },
  { r: 96, d: 3.5, dur: 18, col: '#ec4899' },
  { r: 106, d: 4, dur: 14, col: '#16a34a' },
  { r: 118, d: 2.8, dur: 20, col: '#f59e0b' },
]

export default function OmnichannelOrbit3D() {
  const [hovering, setHovering] = useState(false)
  const [tilt, setTilt] = useState({ x: 5, y: -8 })
  const [active, setActive] = useState(null)

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
        @keyframes omFloat { 0%,100% { transform: translateY(0px) perspective(1200px) rotateY(var(--ry)) rotateX(var(--rx)); } 50% { transform: translateY(-10px) perspective(1200px) rotateY(var(--ry)) rotateX(var(--rx)); } }
        @keyframes omFloatNode { 0%,100%{ transform: translate3d(var(--tx), var(--ty), 0) translateY(0px) rotateY(var(--ry,0deg)) scale(var(--sc,1)); } 50%{ transform: translate3d(var(--tx), var(--ty), 0) translateY(-12px) rotateY(var(--ry,0deg)) scale(var(--sc,1)); } }
        @keyframes omPulseDot { 0%,100% { transform: scale(1); opacity:1 } 50% { transform: scale(1.5); opacity:0.6 } }
        @keyframes omPulseCustomer { 0%,100%{ box-shadow: 0 0 0 0 rgba(15,23,42,0.08), 0 0 0 12px rgba(59,130,246,0.08), 0 22px 48px rgba(15,23,42,0.12); transform: scale(1); } 50%{ box-shadow: 0 0 0 6px rgba(15,23,42,0.06), 0 0 0 20px rgba(59,130,246,0.14), 0 28px 60px rgba(15,23,42,0.16); transform: scale(1.03); } }
        @keyframes omOrbit { from{ transform: rotate(0deg) translateX(var(--or)) rotate(0deg); } to{ transform: rotate(360deg) translateX(var(--or)) rotate(-360deg); } }
        @keyframes omDashFlow { to{ stroke-dashoffset: -120; } }
      `}</style>

      <div
        className="relative will-change-transform select-none"
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setHovering(false); setTilt({ x: 5, y: -8 }) }}
        style={{
          '--rx': `${rx}deg`,
          '--ry': `${ry}deg`,
          animation: hovering ? 'none' : 'omFloat 5s ease-in-out infinite',
        }}
      >
        <div
          className="relative mx-auto w-full max-w-[560px] aspect-[1.08/1] md:aspect-[1.1/1] rounded-[28px] bg-gradient-to-br from-white via-[#fcfdff] to-[#f8fafc] border border-[#eef2f6] shadow-[0_24px_80px_rgba(15,23,42,0.10),0_1px_0_0_rgba(255,255,255,0.9)_inset] overflow-visible"
          style={{ transform: `perspective(1100px) rotateY(${ry}deg) rotateX(${rx}deg)`, transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-orange-100/20 via-transparent to-blue-100/20 blur-[0px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] h-[68%] rounded-full bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] blur-[20px] opacity-60" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[88%] h-[88%] max-w-[460px] max-h-[460px] md:w-[440px] md:h-[440px]">
              {/* connector lines + travelling dots */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" viewBox="0 0 440 440" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {channels.map((p) => (
                    <linearGradient key={p.id} id={`om-grad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={p.color} stopOpacity="0" />
                      <stop offset="50%" stopColor={p.color} stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0.08" />
                    </linearGradient>
                  ))}
                </defs>
                {channels.map((p, i) => {
                  const a = (p.angle * Math.PI) / 180
                  const x = 220 + Math.cos(a) * p.dist
                  const y = 220 + Math.sin(a) * p.dist
                  return (
                    <g key={p.id}>
                      <line x1={x} y1={y} x2="220" y2="220" stroke={`url(#om-grad-${p.id})`} strokeWidth="1.2" strokeDasharray="4 6" style={{ animation: 'omDashFlow 2.8s linear infinite' }} />
                      <circle r="3.2" fill={p.color} opacity="0.9">
                        <animateMotion dur={`${2.2 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${(i % 3) * 0.7}s`} path={`M ${x} ${y} L 220 220`} />
                      </circle>
                    </g>
                  )
                })}
              </svg>

              {/* orbiting dots */}
              <div className="absolute left-1/2 top-1/2 w-0 h-0 z-[2] pointer-events-none">
                {orbitDots.map((p, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${p.d * 2}px`,
                      height: `${p.d * 2}px`,
                      background: p.col,
                      boxShadow: `0 0 8px ${p.col}80`,
                      '--or': `${p.r}px`,
                      left: `${-p.d}px`,
                      top: `${-p.d}px`,
                      animation: `omOrbit ${p.dur}s linear infinite`,
                      animationDelay: `${i * -2.3}s`,
                    }}
                  />
                ))}
              </div>

              {/* channel nodes */}
              {channels.map((p, i) => {
                const a = (p.angle * Math.PI) / 180
                const x = Math.cos(a) * p.dist
                const y = Math.sin(a) * p.dist
                const isActive = active === p.id
                const Icon = p.Icon
                return (
                  <div
                    key={p.id}
                    className="absolute left-1/2 top-1/2 z-[3] cursor-pointer"
                    style={{
                      '--tx': `${x}px`,
                      '--ty': `${y}px`,
                      '--ry': `${i % 2 === 0 ? '8deg' : '-8deg'}`,
                      '--sc': isActive ? '1.12' : '1',
                      transform: `translate3d(${x}px, ${y}px, 0)`,
                      animation: `omFloatNode ${3.2 + i * 0.28}s ease-in-out infinite`,
                      animationDelay: `${i * 0.22}s`,
                      marginLeft: '-66px',
                      marginTop: '-66px',
                      zIndex: isActive ? 20 : 3,
                      transition: 'transform 0.32s cubic-bezier(.2,.8,.2,1), filter 0.32s',
                    }}
                    onMouseEnter={() => setActive(p.id)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <div
                      className="relative w-[120px] h-[120px] md:w-[132px] md:h-[132px] rounded-full flex items-center justify-center"
                      style={{
                        background: `radial-gradient(115% 115% at 28% 22%, ${p.light} 0%, ${p.color} 42%, ${p.dark} 100%)`,
                        boxShadow: isActive
                          ? `0 18px 36px ${p.color}44, 0 4px 12px ${p.color}33, inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -8px 18px rgba(0,0,0,0.18)`
                          : `0 12px 28px ${p.color}30, 0 2px 8px ${p.color}22, inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -6px 14px rgba(0,0,0,0.14)`,
                        transform: `translateZ(${isActive ? 24 : 12}px)`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="absolute inset-[7%] rounded-full bg-gradient-to-br from-white/55 via-white/15 to-transparent pointer-events-none" />
                      <div className="absolute top-[14%] left-[18%] w-[34%] h-[22%] rounded-[100%] bg-white/70 blur-[0.5px] rotate-[-18deg] pointer-events-none opacity-80" />
                      <div className="absolute inset-[3px] rounded-full border border-white/30 pointer-events-none" />
                      <div className="relative z-10 flex flex-col items-center justify-center px-2 text-center">
                        <div className="w-7 h-7 rounded-full bg-white/92 backdrop-blur flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)] mb-1.5">
                          <Icon className="w-3.5 h-3.5" style={{ color: p.dark }} />
                        </div>
                        <span className="text-[10.5px] md:text-[11px] font-[700] leading-[1.15] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] tracking-[-0.01em] max-w-[88px]">
                          <ChannelLabel short={p.short} />
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* center customer hub */}
              <div className="absolute left-1/2 top-1/2 z-[10] -translate-x-1/2 -translate-y-1/2">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92px] h-[92px] md:w-[106px] md:h-[106px] rounded-full bg-[#0f172a]/10 blur-[1px] translate-y-[7px]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92px] h-[92px] md:w-[106px] md:h-[106px] rounded-full bg-[#0f172a]/[0.07] translate-y-[4px]" />
                <div
                  className="relative w-[86px] h-[86px] md:w-[100px] md:h-[100px] rounded-full bg-white flex flex-col items-center justify-center border border-[#eef2f6]"
                  style={{
                    animation: 'omPulseCustomer 2.6s ease-in-out infinite',
                    background: 'radial-gradient(120% 120% at 30% 20%, #ffffff 0%, #fcfdff 48%, #f1f5f9 100%)',
                    boxShadow: '0 1px 0 0 white inset, 0 -2px 10px rgba(15,23,42,0.06) inset, 0 12px 28px rgba(15,23,42,0.12), 0 0 0 1px #eef2f6',
                  }}
                >
                  <div className="absolute inset-[5%] rounded-full bg-gradient-to-b from-white via-transparent to-transparent opacity-80 pointer-events-none" />
                  <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[56%] h-[20%] rounded-full bg-white/90 blur-[0.2px]" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#0f172a] flex items-center justify-center shadow-[0_4px_12px_rgba(15,23,42,0.18)]">
                      <User className="w-5 h-5 md:w-[22px] md:h-[22px] text-white" />
                    </div>
                    <span className="mt-1.5 text-[11px] md:text-[12px] font-[800] tracking-[-0.02em] text-[#0f172a]">Customer</span>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[122%] h-[122%] rounded-full border border-[#3b82f6]/20 pointer-events-none animate-[omPulseDot_2.2s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>

          {/* badges */}
          <div className="absolute top-3 left-4 right-4 flex justify-between items-center pointer-events-none">
            <span className="text-[9px] font-[700] tracking-[0.16em] text-[#94a3b8]">OMNICHANNEL FLOW · 3D</span>
            <span className="flex items-center gap-1.5 text-[9px] font-[700] text-[#10b981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-[omPulseDot_1.6s_ease-in-out_infinite]" />
              LIVE SYNC
            </span>
          </div>
        </div>

        <div className="absolute -bottom-7 left-8 right-8 h-12 bg-[#0f172a]/[0.08] blur-[22px] rounded-[24px] -z-10" />
      </div>

      <div className="mt-3 md:hidden text-center text-[10px] font-[600] text-[#94a3b8]">Tap circles · tilt for 3D · center pulses</div>
    </>
  )
}