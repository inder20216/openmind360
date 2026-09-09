import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, TrendingUp, DollarSign, Check } from 'lucide-react'
import callerImg from '../assets/ivr-demo-caller.jpg'
import callerHappyImg from '../assets/ivr-demo-caller-happy.jpg'

// Faithful port of the reference call-flow animation (Ivr-Diagram-Only-Real.html)
// handed over for this page's hero — same copy, same two stock photos, same
// choreography, just re-implemented as a React/Tailwind/Framer-Motion
// component sized to fit this page's hero without scrolling.
const PHASES = 5 // 0 idle -> 1 message -> 2 detection -> 3 response -> 4 resolved
const PHASE_MS = 1500
const RESOLVED_HOLD_MS = 2600

const statCards = [
  { Icon: Zap, color: '#2563eb', title: 'Quick', sub: '<2 sec response' },
  { Icon: TrendingUp, color: '#8b5cf6', title: 'Faster', sub: '60% less time' },
  { Icon: DollarSign, color: '#10b981', title: 'Revenue Gainer', sub: '35% more calls' },
]

export default function GenerativeAiIvrCallFlow() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const delay = phase === PHASES - 1 ? RESOLVED_HOLD_MS : PHASE_MS
    const t = setTimeout(() => setPhase((p) => (p + 1) % PHASES), delay)
    return () => clearTimeout(t)
  }, [phase])

  const showMessage = phase >= 1
  const showDetection = phase >= 2
  const showResponse = phase >= 3
  const showResolved = phase >= 4

  return (
    <div className="relative w-full flex flex-col items-center" style={{ perspective: 1400 }}>

      <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-6 lg:gap-0 w-full">
        {/* Caller card */}
        <div className="relative shrink-0 mx-auto lg:mx-0">
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-[38px] left-1/2 -translate-x-1/2 z-20 w-[210px]"
              >
                <div className="relative bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(15,23,42,0.18),0_4px_10px_-6px_rgba(15,23,42,0.08)] rounded-[14px] rounded-bl-[4px] px-3 py-2">
                  <p className="text-[11.5px] leading-[1.35] font-medium text-[#0f172a] tracking-[-0.01em]">
                    My transaction failed yesterday, need help!
                  </p>
                  <div className="absolute -bottom-[5px] left-[16px] w-[9px] h-[9px] bg-white border-r border-b border-[#e2e8f0] rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className="w-[210px] h-[248px] bg-white rounded-[18px] border border-[#e2e8f0] shadow-[0_24px_50px_-18px_rgba(15,23,42,0.16),0_8px_18px_-10px_rgba(15,23,42,0.08)] flex flex-col items-center pt-[16px] pb-[12px] px-[14px] relative overflow-hidden"
            style={{ animation: '4.2s ease-in-out 0s infinite normal none running ivrFloatSubtle' }}
          >
            <div className="relative">
              <div className="w-[92px] h-[92px] rounded-full overflow-hidden ring-1 ring-[#e2e8f0] shadow-[0_12px_24px_-10px_rgba(15,23,42,0.22)] bg-[#f8fafc] flex items-center justify-center">
                <img src={callerImg} alt="Professional caller - Priya Sharma" className="w-full h-full object-cover" />
              </div>
              <div className="absolute right-[4px] bottom-[4px] w-[15px] h-[15px] rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(16,185,129,0.4)] bg-[#10b981]">
                <div className="absolute inset-0 rounded-full bg-[#10b981] animate-ping" style={{ animationDuration: '1.6s' }} />
              </div>
            </div>
            <div className="mt-[10px] text-center">
              <div className="text-[12px] font-semibold tracking-[-0.01em] text-[#0f172a]">Priya Sharma</div>
              <div className="text-[10px] font-medium text-[#64748b] mt-[2px] tracking-[0.01em]">Premium customer • ID 48291</div>
            </div>
            <div className="mt-auto w-full">
              <div className="flex items-center justify-center gap-[3px] h-[16px]">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] bg-[#0f172a] rounded-full"
                    style={{ height: 12, animation: `0.46s ease-in-out ${i * 0.09}s infinite alternate none running ivrBarPulse` }}
                  />
                ))}
              </div>
              <div className="mt-[8px] flex items-center justify-center gap-2 text-[10px] font-medium text-[#64748b]">
                <span className="w-[6px] h-[6px] rounded-full bg-[#10b981] animate-pulse" />
                Customer Calling • Live
              </div>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-[16px] bg-[#0f172a]/[0.07] blur-[14px] rounded-full" />
        </div>

        <FlowArrow active={showMessage} label="0.8s" />

        {/* AI panel */}
        <div className="relative shrink-0 flex flex-col items-center">
          <AnimatePresence>
            {showDetection && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-[10px] left-1/2 -translate-x-1/2 lg:left-[-8px] lg:translate-x-0 z-30 flex gap-2"
              >
                <div className="px-[9px] py-[4px] rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-[9.5px] font-semibold tracking-[0.02em] text-[#2563eb] shadow-[0_4px_12px_-6px_rgba(37,99,235,0.24)] whitespace-nowrap">
                  Natural Language
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showDetection && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute -top-[10px] right-0 lg:right-[-20px] z-30"
              >
                <div className="px-[9px] py-[4px] rounded-full bg-[#fff7ed] border border-[#fed7aa] text-[9.5px] font-semibold tracking-[0.02em] text-[#f97316] shadow-[0_4px_12px_-6px_rgba(249,115,22,0.2)] whitespace-nowrap">
                  Frustration Detected
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-[290px] bg-white rounded-[24px] border border-[#e2e8f0] shadow-[0_28px_70px_-24px_rgba(15,23,42,0.22),0_12px_24px_-12px_rgba(15,23,42,0.10)] px-[14px] pt-[14px] pb-[12px] relative mt-6 lg:mt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#0f172a]">Generative AI IVR</div>
                <div className="w-px h-[10px] bg-[#e2e8f0]" />
                <div className="flex items-center gap-[5px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#10b981] shadow-[0_0_0_3px_rgba(16,185,129,0.18)] animate-pulse" />
                  <span className="text-[9px] font-bold tracking-[0.08em] uppercase text-[#10b981]">Live</span>
                </div>
              </div>
            </div>

            <div className="relative mt-[10px] h-[150px] flex items-center justify-center overflow-hidden rounded-[16px] bg-[radial-gradient(110%_110%_at_50%_0%,#eff6ff_0%,#ffffff_52%,#f8fafc_100%)] border border-[#f1f5f9]">
              <div className="absolute w-[132px] h-[132px] rounded-full border border-[#bfdbfe]/60" />
              <div className="absolute w-[96px] h-[96px] rounded-full" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(139,92,246,0.12))', border: '1px solid rgba(37,99,235,0.18)' }} />
              <div className="absolute w-[58px] h-[58px] rounded-full bg-white border border-[#e2e8f0] shadow-[0_10px_24px_-10px_rgba(37,99,235,0.35),0_4px_10px_-6px_rgba(15,23,42,0.08)] flex items-center justify-center">
                <div className="flex items-center gap-[3px]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="w-[3px] bg-gradient-to-b from-[#2563eb] to-[#8b5cf6] rounded-full" style={{ height: 7, animation: `0.5s ease-in-out ${i * 0.08}s infinite alternate none running ivrWaveInner` }} />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0" style={{ animation: '18s linear 0s infinite normal none running ivrOrbit' }}>
                {[
                  { rot: 0, color: '#2563eb' },
                  { rot: 120, color: '#8b5cf6' },
                  { rot: 240, color: '#10b981' },
                ].map((d, i) => (
                  <div
                    key={i}
                    className="absolute w-[5px] h-[5px] rounded-full shadow-[0_2px_8px_rgba(37,99,235,0.4)]"
                    style={{ left: '50%', top: '50%', background: d.color, transform: `translate(-50%,-50%) rotate(${d.rot}deg) translateY(-68px)` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-[10px] bg-[#0f172a] rounded-[12px] px-[10px] py-[8px] border border-[#1e293b] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
              <div className="space-y-[3px] text-[10px] leading-[1.4]">
                <AnimatePresence>
                  {showDetection && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-[6px]">
                      <span className="text-[#64748b]">›</span>
                      <span className="text-[#94a3b8]">Listening...</span>
                      <span className="ml-auto flex gap-[2px] items-center">
                        <span className="w-[3px] h-[3px] rounded-full bg-[#10b981] animate-pulse" />
                        <span className="w-[3px] h-[3px] rounded-full bg-[#10b981] animate-pulse [animation-delay:0.2s]" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showDetection && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.15 }} className="flex gap-[6px]">
                      <span className="text-[#64748b]">›</span>
                      <span className="text-[#e2e8f0]">"transaction failed"</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showResponse && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-[6px]">
                      <span className="text-[#64748b]">›</span>
                      <span className="text-[#94a3b8]">Intent:</span>
                      <span className="text-[#f8fafc] font-medium">Transaction_Issue</span>
                      <span className="ml-auto text-[#10b981] font-medium">[98%]</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showResponse && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.15 }} className="flex gap-[6px]">
                      <span className="text-[#64748b]">›</span>
                      <span className="text-[#94a3b8]">Action:</span>
                      <span className="text-[#60a5fa] font-medium">Check TXN-4829</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence>
              {showResolved && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-[8px] relative"
                >
                  <div className="rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0_10px_24px_-12px_rgba(15,23,42,0.18),0_4px_10px_-6px_rgba(15,23,42,0.08)] pl-[10px] pr-[10px] py-[8px] border-l-[4px] border-l-[#10b981]">
                    <p className="text-[11.5px] leading-[1.4] tracking-[-0.01em] text-[#0f172a] font-[450]">
                      I see TXN-4829 failed. Refunding ₹2,499 to your account now. You will receive confirmation in 2 minutes.
                    </p>
                    <div className="mt-[6px] flex items-center gap-[6px]">
                      <div className="h-[18px] px-[7px] rounded-full bg-[#f0fdf4] border border-[#bbf7d0] text-[9.5px] font-semibold tracking-[0.02em] text-[#16a34a] flex items-center gap-[3px]">
                        <span className="w-[9px] h-[9px] rounded-full bg-[#16a34a] text-white flex items-center justify-center">
                          <Check className="w-[6px] h-[6px]" strokeWidth={3} />
                        </span>
                        Refunded • TXN-4829
                      </div>
                      <span className="text-[9.5px] text-[#64748b] font-medium">2 min</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <FlowArrow active={showResolved} color="#10b981" />

        {/* Outcome */}
        <div className="relative shrink-0 flex flex-col items-center">
          <AnimatePresence>
            {showResolved && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-[36px] left-1/2 -translate-x-1/2 z-20"
              >
                <div className="relative bg-[#0f172a] text-white text-[11px] font-semibold tracking-[-0.01em] px-[10px] py-[7px] rounded-[12px] rounded-br-[4px] shadow-[0_10px_24px_-8px_rgba(15,23,42,0.32)] whitespace-nowrap">
                  Resolved! Thank you so much!
                  <div className="absolute -bottom-[4px] right-[12px] w-[7px] h-[7px] bg-[#0f172a] rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="w-[210px] bg-white rounded-[18px] border border-[#e2e8f0] shadow-[0_24px_50px_-18px_rgba(15,23,42,0.16),0_8px_18px_-10px_rgba(15,23,42,0.08)] pt-[16px] pb-[12px] px-[14px] flex flex-col items-center relative mt-6 lg:mt-0"
            style={{ animation: '4.8s ease-in-out 0.6s infinite normal none running ivrFloatSubtle' }}
          >
            <div className="relative">
              <div className="w-[92px] h-[92px] rounded-full overflow-hidden ring-1 ring-[#e2e8f0] shadow-[0_12px_24px_-10px_rgba(15,23,42,0.22)] bg-[#f8fafc] flex items-center justify-center">
                <img src={callerHappyImg} alt="Customer resolved - Priya Sharma happy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute right-[4px] bottom-[4px] w-[15px] h-[15px] rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(16,185,129,0.4)] bg-[#10b981]" />
            </div>
            <div className="mt-[10px] flex items-center gap-2">
              <span className="w-[16px] h-[16px] rounded-full bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center">
                <span className="w-[4px] h-[4px] rounded-full bg-[#16a34a]" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-[#0f172a]">Customer Happy</span>
            </div>
            <div className="mt-[2px] text-[10px] font-medium text-[#16a34a]">Issue Closed • CSAT 5/5</div>
          </div>

          <div className="mt-[10px] w-[210px] space-y-[6px]">
            {statCards.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={showResolved ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.96 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative bg-white rounded-[12px] border border-[#e2e8f0] shadow-[0_6px_16px_-8px_rgba(15,23,42,0.12),0_2px_6px_-4px_rgba(15,23,42,0.06)] px-[10px] py-[8px] flex items-center gap-[8px] overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: s.color }} />
                <div className="w-[24px] h-[24px] rounded-[7px] bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-center shrink-0">
                  <s.Icon className="w-[13px] h-[13px]" style={{ color: s.color }} strokeWidth={1.8} />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-[12px] font-semibold tracking-[-0.01em] text-[#0f172a]">{s.title}</div>
                  <div className="text-[10.5px] font-medium text-[#64748b]">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-[16px] bg-[#0f172a]/[0.07] blur-[14px] rounded-full" />
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-[6px]">
        {Array.from({ length: PHASES }).map((_, i) => (
          <div key={i} className={`h-[3px] rounded-full transition-all duration-300 ${i === phase ? 'w-[18px] bg-[#0f172a]' : 'w-[3px] bg-[#e2e8f0]'}`} />
        ))}
      </div>

      <style>{`
        @keyframes ivrFloatSubtle { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes ivrBarPulse { 0% { height: 6px; } 100% { height: 14px; } }
        @keyframes ivrWaveInner { 0% { height: 7px; } 100% { height: 15px; } }
        @keyframes ivrOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function FlowArrow({ active, color = '#2563eb', label }) {
  return (
    <div className="relative w-full min-w-[40px] h-[20px] lg:h-[60px] flex items-center justify-center px-2">
      {label && (
        <div className="hidden lg:block absolute top-[6px] left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ scale: active ? 1.05 : 1 }}
            className="px-[7px] py-[2px] rounded-full text-[9px] font-bold tracking-wide bg-white border text-[#0f172a] whitespace-nowrap"
            style={{ borderColor: active ? '#cbd5e1' : '#e2e8f0', boxShadow: active ? `0 6px 16px -6px ${color}59` : 'none' }}
          >
            {label}
          </motion.div>
        </div>
      )}

      {/* Desktop: horizontal connector that stretches to fill the gap */}
      <div className="hidden lg:flex items-center w-full">
        <div className="relative flex-1 h-[2px] rounded-full bg-[#cbd5e1] overflow-visible">
          <motion.span
            className="absolute top-1/2 w-[7px] h-[7px] rounded-full -translate-y-1/2"
            style={{ background: active ? color : '#cbd5e1' }}
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <svg width="12" height="14" viewBox="0 0 12 14" className="shrink-0 -ml-px overflow-visible">
          <path d="M1 1 L10 7 L1 13" fill="none" stroke={active ? color : '#cbd5e1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Mobile: short vertical connector */}
      <svg width="16" height="32" viewBox="0 0 16 32" className="lg:hidden overflow-visible">
        <path d="M8 2 V24" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 20 L8 27 L12 20" fill="none" stroke={active ? color : '#cbd5e1'} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
