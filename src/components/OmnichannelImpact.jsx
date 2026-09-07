import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'

function useInView(threshold = 0.25) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration])
  return value
}

const cardDetails = [
  'Issues resolved on the very first contact. With a unified view across channels, agents now close 75% of queries immediately, up from 42% when teams worked in silos. Fewer repeat contacts mean lower cost and happier customers.',
  'How fast customers get a response and a resolution. With one shared queue and full thread context, agents pick up faster and average handling time drops by 58%.',
  'Customer satisfaction over six months. Consistent handling across every channel and quicker resolution pushed CSAT up by 18 points from January to July.',
]

export default function OmnichannelImpact() {
  const { ref, inView } = useInView(0.25)
  const fcr = useCountUp(75, inView)
  const speed = useCountUp(58, inView)
  const [open, setOpen] = useState({})
  const toggle = (i) => setOpen((s) => ({ ...s, [i]: !s[i] }))

  return (
    <>
      <style>{`
        @keyframes omChartPulse { 0%,100% { transform: scale(1); opacity:1 } 50% { transform: scale(1.5); opacity:0.6 } }
      `}</style>
      <div ref={ref}>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
          <span className="text-[10px] font-[700] tracking-[0.16em] text-[#f97316]">IMPACT • 3 VISUALS</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {/* FCR donut */}
          <div className="bg-white rounded-[22px] border border-[#e2e8f0] p-5 md:p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-[700] tracking-wide text-[#94a3b8]">FCR</span>
              <span className="px-2 py-0.5 rounded-full bg-[#fff7ed] text-[#f97316] text-[10px] font-[700]">+33%</span>
            </div>
            <div className="relative mx-auto w-[148px] h-[148px]">
              <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="om-fcr-g" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <circle cx="80" cy="86" r="54" fill="none" stroke="#e2e8f0" strokeWidth="14" opacity="0.9" />
                <circle cx="80" cy="80" r="54" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="url(#om-fcr-g)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - (inView ? 0.75 : 0))}`}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '80px 80px', transition: 'stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[32px] font-[800] tracking-[-0.04em] leading-none">{fcr}%</div>
                <div className="mt-1 text-[9px] font-[700] tracking-wide text-[#64748b]">FIRST CONTACT</div>
              </div>
            </div>
            <div className="mt-4 text-center text-[11px] text-[#94a3b8]">vs 42% siloed</div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => toggle(0)}
                aria-expanded={!!open[0]}
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-[700] tracking-wide text-[#64748b] hover:text-[#0f172a] transition-colors"
              >
                {open[0] ? 'View less' : 'View more'}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${open[0] ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open[0] ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <p className="pt-3 text-[11px] md:text-[12px] leading-[1.6] text-[#64748b]">{cardDetails[0]}</p>
              </div>
            </div>
          </div>

          {/* SPEED 3D bars */}
          <div className="bg-white rounded-[22px] border border-[#e2e8f0] p-5 md:p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-[700] tracking-wide text-[#94a3b8]">SPEED</span>
              <span className="text-[10px] font-[700] text-[#10b981]">↓{speed}% faster</span>
            </div>
            <div className="h-[148px] flex items-end justify-center gap-7">
              {[
                { label: 'Before', bars: [64, 68], color: '#e2e8f0', dark: '#cbd5e1', accent: false },
                { label: 'After', bars: [26, 30], color: '#f97316', dark: '#c2410c', accent: true },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="flex items-end gap-1.5">
                    {p.bars.map((h, j) => (
                      <div key={j} className="relative" style={{ height: `${h * 1.4}px`, width: '16px' }}>
                        <div
                          className="absolute left-0 right-[-5px] top-0 h-[6px] rounded-[2px]"
                          style={{ background: p.accent ? '#fb923c' : '#f1f5f9', transform: 'skewX(-16deg) translateX(2px)' }}
                        />
                        <div className="absolute right-[-5px] top-[3px] bottom-0 w-[5px] rounded-[2px]" style={{ background: p.dark, transform: 'skewY(-16deg)' }} />
                        <div
                          className="absolute left-0 right-0 bottom-0 rounded-[6px] rounded-tr-none"
                          style={{ top: '6px', background: p.color, boxShadow: p.accent ? '0 6px 14px rgba(249,115,22,0.32)' : 'none' }}
                        />
                      </div>
                    ))}
                  </div>
                  <span className="mt-2 text-[10px] font-[700] text-[#64748b]">{p.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-center">
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#e2e8f0] to-[#f97316] rounded-full" />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => toggle(1)}
                aria-expanded={!!open[1]}
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-[700] tracking-wide text-[#64748b] hover:text-[#0f172a] transition-colors"
              >
                {open[1] ? 'View less' : 'View more'}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${open[1] ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open[1] ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <p className="pt-3 text-[11px] md:text-[12px] leading-[1.6] text-[#64748b]">{cardDetails[1]}</p>
              </div>
            </div>
          </div>

          {/* CSAT line */}
          <div className="bg-white rounded-[22px] border border-[#e2e8f0] p-5 md:p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-[700] tracking-wide text-[#94a3b8]">CSAT • 6M</span>
              <span className="px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#2563eb] text-[10px] font-[700]">+18%</span>
            </div>
            <div className="relative h-[148px]">
              <svg viewBox="0 0 300 140" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="om-csat-g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 1, 2].map((i) => (
                  <line key={i} x1="0" x2="300" y1={20 + i * 36} y2={20 + i * 36} stroke="#f1f5f9" strokeWidth="1" />
                ))}
                <path
                  d="M0 100 Q 60 86, 120 76 T 220 36 T 300 16 L 300 140 L 0 140 Z"
                  fill="url(#om-csat-g)"
                  style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease 0.3s' }}
                />
                <path
                  d="M0 100 Q 60 86, 120 76 T 220 36 T 300 16"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeDasharray="500"
                  strokeDashoffset={inView ? 0 : 500}
                  style={{ transition: 'stroke-dashoffset 1.6s ease 0.2s' }}
                />
              </svg>
              {[
                { x: '0%', y: '71%' },
                { x: '40%', y: '54%' },
                { x: '73%', y: '26%' },
                { x: '100%', y: '11%' },
              ].map((p, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 -ml-1.5 -mt-1.5"
                  style={{ left: p.x, top: p.y, opacity: inView ? 1 : 0, transition: `opacity 0.3s ease ${500 + i * 100}ms` }}
                >
                  <div
                    className="w-3 h-3 rounded-full bg-[#3b82f6] border-2 border-white shadow-[0_0_0_3px_rgba(59,130,246,0.14)] animate-[omChartPulse_2s_ease-in-out_infinite]"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[9px] font-[600] text-[#94a3b8]">
              <span>Jan</span>
              <span>Jul</span>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => toggle(2)}
                aria-expanded={!!open[2]}
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-[700] tracking-wide text-[#64748b] hover:text-[#0f172a] transition-colors"
              >
                {open[2] ? 'View less' : 'View more'}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${open[2] ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open[2] ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <p className="pt-3 text-[11px] md:text-[12px] leading-[1.6] text-[#64748b]">{cardDetails[2]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}