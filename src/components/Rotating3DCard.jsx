import { useRef, useEffect, useState } from 'react'
import slide1 from '../assets/slide1.png'

const servicePanels = [
  { id: 0, name: 'Omnichannel Support Hub', render: renderOmnichannelPanel },
  { id: 1, name: 'Gen AI & AI Chatbot', render: renderGenAIPanel },
  { id: 2, name: 'Intelligent Automation', render: renderAutomationPanel },
  { id: 3, name: 'Analysis & Reporting', render: renderAnalyticsPanel },
  { id: 4, name: "Custom CRM's", render: renderCRMPanel },
]

const PANEL_COUNT = servicePanels.length
const FLIP_DURATION = 800
const PAUSE_DURATION = 3500

export default function Rotating3DCard() {
  const [rotation, setRotation] = useState(0)
  const [frontIndex, setFrontIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const timeoutRef = useRef(null)
  const flipTimeoutRef = useRef(null)

  useEffect(() => {
    const startFlip = () => {
      setIsFlipping(true)
      setRotation(180)

      flipTimeoutRef.current = setTimeout(() => {
        // Flip complete - swap front to next, reset rotation instantly
        const nextIndex = (frontIndex + 1) % PANEL_COUNT
        setFrontIndex(nextIndex)
        setRotation(0)
        setIsFlipping(false)

        timeoutRef.current = setTimeout(startFlip, PAUSE_DURATION)
      }, FLIP_DURATION)
    }

    timeoutRef.current = setTimeout(startFlip, PAUSE_DURATION)
    return () => {
      clearTimeout(timeoutRef.current)
      clearTimeout(flipTimeoutRef.current)
    }
  }, [frontIndex])

  const frontPanel = servicePanels[frontIndex]
  const backPanel = servicePanels[(frontIndex + 1) % PANEL_COUNT]

  return (
    <div className="relative flex items-center justify-center" style={{ width: 416, height: 496, maxWidth: '92vw', perspective: '1800px' }}>
      <div className="relative shrink-0" style={{
        width: 304,
        height: 432,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transform: `rotateX(-3deg) rotateY(${rotation}deg)`,
        transition: isFlipping ? `transform ${FLIP_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
      }}>
        {/* Thickness / Side Faces */}
        <CardThickness />
        <CardFace panel={frontPanel} isFront={true} />
        <CardFace panel={backPanel} isFront={false} />
      </div>
      <style>{`@keyframes wave { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1.3); } }
@keyframes slideInRight28 { from { opacity: 0; transform: translateZ(28px) translateX(30px); } to { opacity: 1; transform: translateZ(28px) translateX(0); } }
@keyframes slideInRight36 { from { opacity: 0; transform: translateZ(36px) translateX(30px); } to { opacity: 1; transform: translateZ(36px) translateX(0); } }
@keyframes slideInLeft22 { from { opacity: 0; transform: translateZ(22px) translateX(-30px); } to { opacity: 1; transform: translateZ(22px) translateX(0); } }`}</style>
    </div>
  )
}

function CardFace({ panel, isFront }) {
  return (
    <div className="absolute inset-0" style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: isFront ? 'rotateY(0deg) translateZ(16px)' : 'rotateY(180deg) translateZ(16px)',
      transformStyle: 'preserve-3d',
      borderRadius: 28,
      overflow: 'hidden'
    }}>
      <CardBase panel={panel} />
    </div>
  )
}

function CardThickness() {
  const thickness = 16
  const w = 304
  const h = 432
  const r = 28

  const edgeStyle = {
    position: 'absolute',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
    border: '1px solid rgba(255,255,255,0.2)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }

  return (
    <div style={{ transformStyle: 'preserve-3d' }}>
      {/* Top edge */}
      <div style={{ ...edgeStyle, width: w - 2 * r, height: thickness, left: r, top: 0, borderRadius: '0 0 0 0', transform: `rotateX(-90deg) translateZ(${thickness / 2}px) translateY(-${thickness / 2}px)` }} />
      {/* Bottom edge */}
      <div style={{ ...edgeStyle, width: w - 2 * r, height: thickness, left: r, bottom: 0, borderRadius: '0 0 0 0', transform: `rotateX(90deg) translateZ(${thickness / 2}px) translateY(${thickness / 2}px)` }} />
      {/* Left edge */}
      <div style={{ ...edgeStyle, width: thickness, height: h - 2 * r, left: 0, top: r, borderRadius: '0 0 0 0', transform: `rotateY(90deg) translateZ(${thickness / 2}px) translateX(-${thickness / 2}px)` }} />
      {/* Right edge */}
      <div style={{ ...edgeStyle, width: thickness, height: h - 2 * r, right: 0, top: r, borderRadius: '0 0 0 0', transform: `rotateY(-90deg) translateZ(${thickness / 2}px) translateX(${thickness / 2}px)` }} />
      {/* Top-left corner */}
      <div style={{ ...edgeStyle, width: r * 2, height: r * 2, left: 0, top: 0, borderRadius: `${r}px 0 0 0`, transform: `translateZ(-${thickness}px)` }} />
      {/* Top-right corner */}
      <div style={{ ...edgeStyle, width: r * 2, height: r * 2, right: 0, top: 0, borderRadius: `0 ${r}px 0 0`, transform: `translateZ(-${thickness}px)` }} />
      {/* Bottom-left corner */}
      <div style={{ ...edgeStyle, width: r * 2, height: r * 2, left: 0, bottom: 0, borderRadius: `0 0 0 ${r}px`, transform: `translateZ(-${thickness}px)` }} />
      {/* Bottom-right corner */}
      <div style={{ ...edgeStyle, width: r * 2, height: r * 2, right: 0, bottom: 0, borderRadius: `0 0 ${r}px 0`, transform: `translateZ(-${thickness}px)` }} />
    </div>
  )
}

function CardBase({ panel }) {
  const isOmnichannel = panel.id === 0
  return (
    <>
      {/* MAIN BASE */}
      <div className="absolute inset-0" style={{
        borderRadius: 28,
        background: isOmnichannel 
          ? 'linear-gradient(135deg, rgba(255,140,0,0.9) 0%, rgba(255,95,0,0.85) 50%, rgba(230,80,0,0.9) 100%)'
          : `linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.25) 100%)`,
        backdropFilter: isOmnichannel ? 'none' : 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: isOmnichannel ? 'inset 0 1px 0 rgba(255,255,255,0.3), 0 20px 40px rgba(255,140,0,0.2)' : 'none',
      }} />

      {/* WHITE HEADING BACKGROUND BAR - matches slide 2 design */}
      <div className="absolute top-0 left-0 right-0 h-[68px] rounded-t-[28px]" style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        zIndex: 10,
      }} />

      {/* HEADING - FLAT */}
      <div className="absolute top-0 left-0 right-0 px-5 pt-5 pb-3 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#6D5BD0] rounded-full" />
          <span className="text-xs font-extrabold tracking-[0.14em] text-[#6D5BD0] uppercase">SERVICE • {String(panel.id + 1).padStart(2, '0')} / 05</span>
        </div>
        <div className="mt-2 text-lg font-extrabold leading-[1.1] text-slate-900">{panel.name}</div>
      </div>

      {panel.render()}
    </>
  )
}

function renderGenAIPanel() {
  return (
    <div className="absolute rounded-2xl overflow-hidden" style={{
      left: '10px', right: '10px', top: '68px', bottom: '12px',
      background: 'rgba(123, 110, 246, 0.82)',
      backdropFilter: 'blur(16px) saturate(160%)',
      WebkitBackdropFilter: 'blur(16px) saturate(160%)',
      border: '1px solid rgba(255,255,255,0.22)',
      boxShadow: '0 12px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
      transform: 'none',
    }}>
      {/* Voice Agent Pill */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-3 py-2 flex items-center gap-2 whitespace-nowrap z-10" style={{
        transform: 'translateZ(32px)', transformStyle: 'preserve-3d', boxShadow: '0 10px 22px rgba(0,0,0,0.18)',
      }}>
        <div className="flex flex-col" style={{ transform: 'translateZ(12px)' }}>
          <div className="flex items-center gap-2">
            <span className="text-[8.5px] font-extrabold tracking-wide text-slate-600">VOICE AGENT</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /><span className="text-[8.5px] font-bold text-emerald-600">Live</span></span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="flex items-end gap-1 h-4">
              <span className="w-1 h-1 bg-[#FF8A3D] rounded-full" style={{ animation: 'wave 0.6s infinite' }} />
              <span className="w-1 h-1 bg-[#8B5CF6] rounded-full" style={{ animation: 'wave 0.6s infinite 0.1s' }} />
              <span className="w-1 h-1 bg-[#8B5CF6] rounded-full" style={{ animation: 'wave 0.6s infinite 0.2s' }} />
              <span className="w-1 h-1 bg-[#FF8A3D] rounded-full" style={{ animation: 'wave 0.6s infinite 0.3s' }} />
            </span>
            <span className="text-[10.5px] font-semibold text-slate-800">Suhani is on a call</span>
          </div>
        </div>
      </div>

      {/* Woman Pic */}
      <div className="absolute left-4 top-12 w-20 h-20 rounded-full p-1 bg-white" style={{ boxShadow: '0 8px 18px rgba(0,0,0,0.18)' }}>
        <img src={slide1} alt="Suhani" className="w-full h-full rounded-full object-cover" />
      </div>

      {/* Bubbles - with entrance animations */}
      <div className="absolute left-4 right-4 top-40 flex flex-col gap-2" style={{ transformStyle: 'preserve-3d' }}>
        <div className="self-end max-w-[90%] bg-white rounded-xl rounded-br-sm px-3 py-2 text-sm leading-[1.3] text-slate-800" style={{ 
          transform: 'translateZ(28px)', transformStyle: 'preserve-3d', boxShadow: '0 5px 14px rgba(0,0,0,0.14)',
          animation: 'slideInRight28 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards', opacity: 0
        }}>
          <span style={{ transform: 'translateZ(8px)', display: 'block' }}>Hi, I just received my order, but the size is wrong!</span>
        </div>
        <div className="self-end max-w-[90%] bg-white rounded-xl rounded-br-sm px-3 py-2 text-sm leading-[1.3] text-slate-800" style={{ 
          transform: 'translateZ(36px)', transformStyle: 'preserve-3d', boxShadow: '0 6px 16px rgba(0,0,0,0.16)',
          animation: 'slideInRight36 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards', opacity: 0
        }}>
          <span style={{ transform: 'translateZ(8px)', display: 'block' }}>Hi! I'm really sorry about that, I'll be happy to help.</span>
        </div>
        <div className="self-start max-w-[88%] bg-white rounded-xl rounded-bl-sm px-3 py-2 text-sm leading-[1.3] text-slate-800" style={{ 
          transform: 'translateZ(22px)', transformStyle: 'preserve-3d', boxShadow: '0 5px 14px rgba(0,0,0,0.14)',
          animation: 'slideInLeft22 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards', opacity: 0
        }}>
          <span style={{ transform: 'translateZ(8px)', display: 'block' }}>Could you confirm the size you ordered and received?</span>
        </div>
      </div>
    </div>
  )
}

function renderOmnichannelPanel() {
  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {/* Floating channel icons orbiting center */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(24px)' }}>
        {/* Center hub */}
        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
          transform: 'translateZ(16px)',
          animation: 'pulse 3s ease-in-out infinite',
        }}>
          <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          {/* Orbiting rings */}
          <div className="absolute inset-0 rounded-[1.2rem] border-2 border-orange-300/50" style={{ animation: 'spin 20s linear infinite', transform: 'translateZ(-8px)' }} />
          <div className="absolute inset-0 rounded-[1.2rem] border-2 border-orange-200/30" style={{ animation: 'spin 15s linear infinite reverse', transform: 'translateZ(-16px)' }} />
        </div>

        {/* Channel icons positioned around center - staggered entrance */}
        <ChannelIconOrbit name="WhatsApp" icon="💬" angle={0} distance={85} delay={0} />
        <ChannelIconOrbit name="Email" icon="📧" angle={60} distance={85} delay={0.15} />
        <ChannelIconOrbit name="Live Chat" icon="💭" angle={120} distance={85} delay={0.3} />
        <ChannelIconOrbit name="SMS" icon="📱" angle={180} distance={85} delay={0.45} />
        <ChannelIconOrbit name="Social" icon="🌐" angle={240} distance={85} delay={0.6} />
        <ChannelIconOrbit name="Voice" icon="📞" angle={300} distance={85} delay={0.75} />
      </div>

      {/* Bottom feature tags */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {['Unified Inbox', 'Real-time Sync', 'AI Routing', 'Analytics'].map((feat, i) => (
          <div key={feat} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/90" style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            transform: 'translateZ(8px)',
            animation: `fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) ${1.2 + i * 0.1}s forwards`,
            opacity: 0,
          }}>{feat}</div>
        ))}
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { box-shadow: 0 12px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5); } 50% { box-shadow: 0 16px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5); } }
        @keyframes spin { from { transform: translateZ(-8px) rotate(0deg); } to { transform: translateZ(-8px) rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateZ(8px) translateY(10px); } to { opacity: 1; transform: translateZ(8px) translateY(0); } }
        @keyframes iconEntrance { from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>
    </div>
  )
}

function ChannelIconOrbit({ name, icon, angle, distance, delay }) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * distance
  const y = Math.sin(rad) * distance

  return (
    <div className="absolute" style={{
      left: '50%', top: '50%',
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(28px)`,
      transformStyle: 'preserve-3d',
      animation: `iconEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards`,
      opacity: 0,
    }}>
      <div className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl cursor-default group" style={{
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.4)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s',
        transform: 'translateZ(0)',
      }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateZ(16px) scale(1.15)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateZ(0) scale(1)'}>
        {icon}
        {/* Tooltip */}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[10px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity" style={{
          background: 'rgba(0,0,0,0.8)',
          transform: 'translateZ(20px) translateY(4px)',
        }}>{name}</span>
      </div>
    </div>
  )
}

function renderAutomationPanel() {
  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {/* Pink gradient body background */}
      <div className="absolute top-[68px] bottom-0 left-0 right-0 rounded-b-[28px]" style={{
        background: 'linear-gradient(135deg, rgba(244,114,182,0.9) 0%, rgba(236,72,153,0.95) 50%, rgba(219,39,119,0.9) 100%)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.2), 0 20px 40px rgba(244,114,182,0.3)',
      }} />

      {/* Central automation hub with orbiting feature icons */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(24px)' }}>
        {/* Center hub */}
        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
          transform: 'translateZ(16px)',
          animation: 'pulse 3s ease-in-out infinite',
        }}>
          <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div className="absolute inset-0 rounded-[1.2rem] border-2 border-pink-300/50" style={{ animation: 'spin 20s linear infinite', transform: 'translateZ(-8px)' }} />
          <div className="absolute inset-0 rounded-[1.2rem] border-2 border-pink-200/30" style={{ animation: 'spin 15s linear infinite reverse', transform: 'translateZ(-16px)' }} />
        </div>

        {/* Feature icons orbiting - 6 automation features */}
        <AutomationOrbitIcon name="Auto-reply" icon="⚡" angle={0} distance={95} delay={0} color="pink" />
        <AutomationOrbitIcon name="Ticket Routing" icon="🎯" angle={60} distance={95} delay={0.15} color="pink" />
        <AutomationOrbitIcon name="Data Sync" icon="🔄" angle={120} distance={95} delay={0.3} color="pink" />
        <AutomationOrbitIcon name="SLA Alerts" icon="⏱️" angle={180} distance={95} delay={0.45} color="pink" />
        <AutomationOrbitIcon name="Reports" icon="📊" angle={240} distance={95} delay={0.6} color="pink" />
        <AutomationOrbitIcon name="Integrations" icon="🔗" angle={300} distance={95} delay={0.75} color="pink" />
      </div>

      {/* Bottom capability tags */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {['Visual Builder', 'No-code Logic', 'Real-time Triggers', 'Audit Trail'].map((feat, i) => (
          <div key={feat} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/90" style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            transform: 'translateZ(8px)',
            animation: `fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) ${1.2 + i * 0.1}s forwards`,
            opacity: 0,
          }}>{feat}</div>
        ))}
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { box-shadow: 0 12px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5); } 50% { box-shadow: 0 16px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5); } }
        @keyframes spin { from { transform: translateZ(-8px) rotate(0deg); } to { transform: translateZ(-8px) rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateZ(8px) translateY(10px); } to { opacity: 1; transform: translateZ(8px) translateY(0); } }
        @keyframes iconEntrance { from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>
    </div>
  )
}

function AutomationOrbitIcon({ name, icon, angle, distance, delay }) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * distance
  const y = Math.sin(rad) * distance

  return (
    <div className="absolute" style={{
      left: '50%', top: '50%',
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(28px)`,
      transformStyle: 'preserve-3d',
      animation: `iconEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards`,
      opacity: 0,
    }}>
      <div className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl cursor-default group" style={{
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.4)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s',
        transform: 'translateZ(0)',
      }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateZ(16px) scale(1.15)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateZ(0) scale(1)'}>
        {icon}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[10px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity" style={{
          background: 'rgba(0,0,0,0.8)',
          transform: 'translateZ(20px) translateY(4px)',
        }}>{name}</span>
      </div>
    </div>
  )
}

function renderAnalyticsPanel() {
  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {/* Teal/Emerald gradient body background */}
      <div className="absolute top-[68px] bottom-0 left-0 right-0 rounded-b-[28px]" style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.9) 0%, rgba(5,150,105,0.95) 50%, rgba(4,120,87,0.9) 100%)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.2), 0 20px 40px rgba(16,185,129,0.3)',
      }} />

      {/* Central analytics hub with orbiting metric icons */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(24px)' }}>
        {/* Center hub */}
        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
          transform: 'translateZ(16px)',
          animation: 'pulse 3s ease-in-out infinite',
        }}>
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17V9m-4 8V5m4 12v-8" />
          </svg>
          <div className="absolute inset-0 rounded-[1.2rem] border-2 border-emerald-300/50" style={{ animation: 'spin 20s linear infinite', transform: 'translateZ(-8px)' }} />
          <div className="absolute inset-0 rounded-[1.2rem] border-2 border-emerald-200/30" style={{ animation: 'spin 15s linear infinite reverse', transform: 'translateZ(-16px)' }} />
        </div>

        {/* Metric icons orbiting - 6 analytics features */}
        <AnalyticsOrbitIcon name="CSAT Trends" icon="😊" angle={0} distance={95} delay={0} color="emerald" />
        <AnalyticsOrbitIcon name="Resolution Time" icon="⏱️" angle={60} distance={95} delay={0.15} color="emerald" />
        <AnalyticsOrbitIcon name="Agent Performance" icon="👥" angle={120} distance={95} delay={0.3} color="emerald" />
        <AnalyticsOrbitIcon name="Volume Heatmap" icon="🔥" angle={180} distance={95} delay={0.45} color="emerald" />
        <AnalyticsOrbitIcon name="Intent Analysis" icon="🎯" angle={240} distance={95} delay={0.6} color="emerald" />
        <AnalyticsOrbitIcon name="Custom Reports" icon="📋" angle={300} distance={95} delay={0.75} color="emerald" />
      </div>

      {/* Bottom capability tags */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {['Real-time Dashboards', 'Export & Share', 'AI Insights', 'Custom KPIs'].map((feat, i) => (
          <div key={feat} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/90" style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            transform: 'translateZ(8px)',
            animation: `fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) ${1.2 + i * 0.1}s forwards`,
            opacity: 0,
          }}>{feat}</div>
        ))}
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { box-shadow: 0 12px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5); } 50% { box-shadow: 0 16px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5); } }
        @keyframes spin { from { transform: translateZ(-8px) rotate(0deg); } to { transform: translateZ(-8px) rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateZ(8px) translateY(10px); } to { opacity: 1; transform: translateZ(8px) translateY(0); } }
        @keyframes iconEntrance { from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>
    </div>
  )
}

function AnalyticsOrbitIcon({ name, icon, angle, distance, delay }) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * distance
  const y = Math.sin(rad) * distance

  return (
    <div className="absolute" style={{
      left: '50%', top: '50%',
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(28px)`,
      transformStyle: 'preserve-3d',
      animation: `iconEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards`,
      opacity: 0,
    }}>
      <div className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl cursor-default group" style={{
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.4)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s',
        transform: 'translateZ(0)',
      }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateZ(16px) scale(1.15)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateZ(0) scale(1)'}>
        {icon}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[10px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity" style={{
          background: 'rgba(0,0,0,0.8)',
          transform: 'translateZ(20px) translateY(4px)',
        }}>{name}</span>
      </div>
    </div>
  )
}

function renderCRMPanel() {
  return (
    <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
      {/* Rose gradient body background */}
      <div className="absolute top-[68px] bottom-0 left-0 right-0 rounded-b-[28px]" style={{
        background: 'linear-gradient(135deg, rgba(244,63,94,0.9) 0%, rgba(225,29,72,0.95) 50%, rgba(190,18,60,0.9) 100%)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.2), 0 20px 40px rgba(244,63,94,0.3)',
      }} />

      {/* Central CRM hub with orbiting feature icons */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(24px)' }}>
        {/* Center hub */}
        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center" style={{
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
          transform: 'translateZ(16px)',
          animation: 'pulse 3s ease-in-out infinite',
        }}>
          <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div className="absolute inset-0 rounded-[1.2rem] border-2 border-rose-300/50" style={{ animation: 'spin 20s linear infinite', transform: 'translateZ(-8px)' }} />
          <div className="absolute inset-0 rounded-[1.2rem] border-2 border-rose-200/30" style={{ animation: 'spin 15s linear infinite reverse', transform: 'translateZ(-16px)' }} />
        </div>

        {/* CRM feature icons orbiting - 6 CRM features */}
        <CRMOrbitIcon name="Custom Fields" icon="📝" angle={0} distance={95} delay={0} color="rose" />
        <CRMOrbitIcon name="Pipeline Stages" icon="📈" angle={60} distance={95} delay={0.15} color="rose" />
        <CRMOrbitIcon name="Activity Log" icon="📋" angle={120} distance={95} delay={0.3} color="rose" />
        <CRMOrbitIcon name="Email Sync" icon="📧" angle={180} distance={95} delay={0.45} color="rose" />
        <CRMOrbitIcon name="Automation" icon="⚙️" angle={240} distance={95} delay={0.6} color="rose" />
        <CRMOrbitIcon name="Mobile App" icon="📱" angle={300} distance={95} delay={0.75} color="rose" />
      </div>

      {/* Bottom capability tags */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {['Drag-drop Builder', 'Workflow Engine', 'Team Collaboration', 'Mobile First'].map((feat, i) => (
          <div key={feat} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/90" style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            transform: 'translateZ(8px)',
            animation: `fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) ${1.2 + i * 0.1}s forwards`,
            opacity: 0,
          }}>{feat}</div>
        ))}
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { box-shadow: 0 12px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5); } 50% { box-shadow: 0 16px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5); } }
        @keyframes spin { from { transform: translateZ(-8px) rotate(0deg); } to { transform: translateZ(-8px) rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateZ(8px) translateY(10px); } to { opacity: 1; transform: translateZ(8px) translateY(0); } }
        @keyframes iconEntrance { from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>
    </div>
  )
}

function CRMOrbitIcon({ name, icon, angle, distance, delay }) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * distance
  const y = Math.sin(rad) * distance

  return (
    <div className="absolute" style={{
      left: '50%', top: '50%',
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(28px)`,
      transformStyle: 'preserve-3d',
      animation: `iconEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards`,
      opacity: 0,
    }}>
      <div className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl cursor-default group" style={{
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.4)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s',
        transform: 'translateZ(0)',
      }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateZ(16px) scale(1.15)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateZ(0) scale(1)'}>
        {icon}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[10px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity" style={{
          background: 'rgba(0,0,0,0.8)',
          transform: 'translateZ(20px) translateY(4px)',
        }}>{name}</span>
      </div>
    </div>
  )
}