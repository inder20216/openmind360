import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AudioWaveform,
  Banknote,
  ChevronDown,
  Languages,
  Mic,
  Minus,
  PhoneCall,
  Plus,
  Puzzle,
  Radio,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Zap,
} from 'lucide-react'
import SeoHead from '../components/SeoHead'
import FaqSchema from '../components/FaqSchema'
import JsonLd from '../components/JsonLd'
import GenerativeAiIvrOrbit3D from '../components/GenerativeAiIvrOrbit3D'
import { services } from '../data/services'

const service = services.find((s) => s.path === 'generative-ai-ivr')

const capabilities = [
  { Icon: Mic, accent: '#3b82f6',
    detail: 'Callers describe the problem in normal speech instead of punching through menu numbers. The IVR understands intent, asks clarifying questions, and never forces a "press three for billing" step.',
    points: ['Open ended conversation instead of rigid menu trees', 'Handles accents, mumbling, and interrupted sentences', 'Confirms intent naturally before acting'] },
  { Icon: PhoneCall, accent: '#06b6d4',
    detail: 'Every call is routed by what the caller actually means, matched to the right queue, team, or system in real time instead of a fixed number tree.',
    points: ['Intent based routing to the right team instantly', 'Peak hour overflow balanced automatically', 'Priority lanes for repeating and high value callers'] },
  { Icon: UserCheck, accent: '#f97316',
    detail: 'The moment a caller needs a person, the call moves to a human agent without a reset. Transcript, intent, and frustration score ride along with the transfer.',
    points: ['Handoff with full context carried over', 'No repetition and no lost history for the customer', 'Agents see intent and sentiment before they pick up'] },
  { Icon: AudioWaveform, accent: '#ec4899',
    detail: 'The AI reads tone, pace, and repeated attempts to spot frustration early, then escalates before the caller gives up or churns.',
    points: ['Sentiment scored in real time on every call', 'Repeated attempts trigger faster routing', 'At risk callers reach senior agents first'] },
  { Icon: Languages, accent: '#8b5cf6',
    detail: 'Callers speak in their own language and still get the same fast, natural response, with no separate lines and no language menus.',
    points: ['Hindi, Tamil, Telugu, Bengali, Marathi and English variants', 'Language detected from the first sentence', 'Consistent tone across every market served'] },
  { Icon: Puzzle, accent: '#10b981',
    detail: 'The IVR sits on top of your existing telephony stack and connects to your CRM, billing, and knowledge bases through APIs.',
    points: ['SIP and PSTN connectors for your current setup', 'CRM and billing data pulled into the conversation', 'Deployed as an overlay, not a rip and replace'] },
]

const practices = [
  { n: '01', title: 'Banking and finance', Icon: Banknote, accent: 'from-[#dbeafe] to-[#eff6ff]', color: '#2563eb',
    line: 'Handles balance checks, loan inquiries, and payment requests through natural conversation instead of rigid IVR menus.',
    detail: 'A customer asks about a failed transaction in their own words. The IVR pulls the latest account status, resolves the query instantly, and only hands over to a human when authentication or a dispute file is required.' },
  { n: '02', title: 'Telecom and ISPs', Icon: Radio, accent: 'from-[#fef3c7] to-[#fffbeb]', color: '#d97706',
    line: 'Resolves billing questions, plan changes, and outage updates automatically, escalating only when technical diagnostics are needed.',
    detail: 'A subscriber reporting a service outage is routed straight to the right queue in their preferred language. Routine plan changes and billing questions are resolved without a transfer, and only real faults reach the technical desk.' },
  { n: '03', title: 'Frustrated caller detection', Icon: Zap, accent: 'from-[#fce7f3] to-[#fdf2f8]', color: '#db2777',
    line: 'Detects tone and repeated attempts, prioritizes and routes to senior agents with full context to prevent churn.',
    detail: 'A frustrated caller is detected by tone and routing history, then prioritized for faster human escalation with the full conversation context attached, turning a likely churn into a salvageable relationship.' },
]

const explore = [
  { label: 'Omnichannel Support Hub', to: '/services/omnichannel-support' },
  { label: 'AI Chatbots', to: '/services/ai-chatbots' },
  { label: 'Intelligent Automation', to: '/services/intelligent-automation' },
  { label: 'Analytics & Reporting', to: '/services/revenue-impact' },
  { label: 'Custom CRMs', to: '/services/custom-crms' },
]

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return progress
}

export default function GenerativeAiIvrPage() {
  const progress = useScrollProgress()
  const included = useInView(0.12)
  const practice = useInView(0.12)
  const [openFaq, setOpenFaq] = useState(null)
  const [incOpen, setIncOpen] = useState({})
  const [practiceOpen, setPracticeOpen] = useState({})
  const toggleInc = (i) => setIncOpen((s) => ({ ...s, [i]: !s[i] }))
  const togglePractice = (i) => setPracticeOpen((s) => ({ ...s, [i]: !s[i] }))

  return (
    <>
      <SeoHead
        title={service.pageTitle.split('\n').join(' ')}
        description={service.pageIntro}
        canonical={`https://www.openmind.in/services/${service.path}`}
      />
      <FaqSchema faqs={service.faqs} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.label,
        serviceType: service.label,
        description: service.pageIntro,
        provider: {
          '@type': 'Organization',
          name: 'Open Mind Services Limited',
          url: 'https://www.openmind.in',
        },
        areaServed: { '@type': 'Country', name: 'India' },
        url: `https://www.openmind.in/services/${service.path}`,
      }} />

      <style>{`
        @keyframes giFloat1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px, 40px) scale(1.05); } }
        @keyframes giFloat2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px, -30px) scale(1.08); } }
      `}</style>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#f1f5f9]">
        <div
          className="h-full bg-gradient-to-r from-[#2563eb] via-[#06b6d4] to-[#ec4899] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Dotted grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.5]"
        style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '22px 22px' }}
      />

      {/* Floating gradient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[110px] bg-gradient-to-br from-blue-100/30 via-cyan-100/20 to-pink-100/30" style={{ animation: 'giFloat1 20s ease-in-out infinite' }} />
        <div className="absolute top-[35%] -right-[15%] w-[700px] h-[700px] rounded-full blur-[120px] bg-gradient-to-bl from-pink-100/30 via-cyan-100/20 to-blue-100/20" style={{ animation: 'giFloat2 24s ease-in-out infinite' }} />
      </div>

      {/* HERO */}
      <section id="hero" className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="grid md:grid-cols-[0.92fr_1.08fr] gap-8 md:gap-6 lg:gap-10 items-center">
          <div className="min-w-0 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-[giPulseDot_1.6s_ease-in-out_infinite]" />
              <span className="text-[10px] font-[700] tracking-[0.20em] text-[#2563eb]">GENERATIVE AI IVR</span>
            </div>
            <h1 className="font-[800] text-[34px] md:text-[52px] lg:text-[56px] leading-[0.95] tracking-[-0.04em] text-[#0f172a]">
              Say What You Need,
              <br />
              <span className="bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
                Skip the Menu
              </span>
            </h1>
            <p className="mt-4 text-[15px] md:text-[16px] leading-[1.6] text-[#475569] max-w-[460px] font-[500] min-w-0">
              Traditional IVRs make customers punch through five menus to reach a human. Open Mind's Generative AI IVR listens to what's actually being asked, in natural language, and routes the call immediately, detecting frustration early and escalating it before it becomes a bigger problem.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-[#eff6ff] border border-[#dbeafe] text-[10px] font-[700] tracking-[0.10em] text-[#2563eb]">24/7 MULTILINGUAL</span>
              <span className="px-3 py-1.5 rounded-full bg-[#fdf2f8] border border-[#fce7f3] text-[10px] font-[700] tracking-[0.10em] text-[#db2777]">ALWAYS ON IVR</span>
              <span className="px-3 py-1.5 rounded-full bg-[#f5f3ff] border border-[#ede9fe] text-[10px] font-[700] tracking-[0.10em] text-[#7c3aed]">HUMAN HANDOFF</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12.5px] font-[600] text-[#64748b]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[giPulseDot_2s_ease-in-out_infinite]" />
              Natural language · No DTMF menus · Human handoff with context
            </div>
          </div>
          <div className="min-w-0 relative order-1 md:order-2">
            <GenerativeAiIvrOrbit3D />
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="included" ref={included.ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-16 md:pb-20">
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-[10px] font-[700] tracking-[0.18em] text-[#94a3b8]">WHAT'S INCLUDED</span>
          <span className="h-[1px] w-10 bg-[#e2e8f0]" />
          <span className="text-[10px] font-[600] text-[#cbd5e1]">6 core capabilities · tap View more to expand</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {service.features.map((f, i) => {
            const { Icon, accent } = capabilities[i]
            return (
              <div
                key={f}
                className="group relative bg-white rounded-[20px] border border-[#eef2f6] p-5 md:p-6 flex gap-4 items-start hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-400"
                style={{ opacity: included.inView ? 1 : 0, transform: included.inView ? 'translateY(0)' : 'translateY(14px)', transitionDelay: `${i * 50}ms` }}
              >
                <div className="relative w-[52px] h-[52px] flex-shrink-0 [perspective:600px]">
                  <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-white to-[#f8fafc] border border-[#e2e8f0] shadow-[0_8px_18px_rgba(15,23,42,0.08),inset_0_1px_0_white] flex items-center justify-center group-hover:scale-[1.05] transition-transform duration-300">
                    <Icon className="w-[22px] h-[22px]" style={{ color: accent }} />
                  </div>
                  <div className="absolute -right-[5px] top-[5px] bottom-[5px] w-[5px] rounded-r-[12px] opacity-80" style={{ background: accent, filter: 'brightness(0.8)' }} />
                  <div className="absolute -bottom-[5px] left-[5px] right-[5px] h-[5px] rounded-b-[12px] opacity-60" style={{ background: accent, filter: 'brightness(0.85)' }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[13px] md:text-[14px] font-[600] leading-[1.35] tracking-[-0.01em] text-[#0f172a]">{f}</h3>
                    <button
                      type="button"
                      onClick={() => toggleInc(i)}
                      aria-expanded={!!incOpen[i]}
                      className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-[700] tracking-wide text-[#64748b] hover:text-[#0f172a] transition-colors"
                    >
                      {incOpen[i] ? 'View less' : 'View more'}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${incOpen[i] ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: incOpen[i] ? '1fr' : '0fr' }}>
                    <div className="overflow-hidden">
                      <div>
                        <div className="mt-3 w-7 h-[2px] rounded-full opacity-30" style={{ background: accent }} />
                        <p className="mt-3 text-[12px] md:text-[13px] leading-[1.6] text-[#64748b]">{capabilities[i].detail}</p>
                        <ul className="mt-3 space-y-1.5">
                          {capabilities[i].points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2 text-[11.5px] md:text-[12px] leading-[1.45] text-[#475569]">
                              <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* IN PRACTICE */}
      <section id="practice" ref={practice.ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-16 md:pb-20">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[10px] font-[700] tracking-[0.18em] text-[#94a3b8]">WHERE THIS FITS</span>
          <span className="h-[1px] w-8 bg-[#e2e8f0]" />
          <span className="text-[10px] font-[600] text-[#cbd5e1]">in practice</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {practices.map((p, i) => {
            const Icon = p.Icon
            return (
              <div
                key={p.title}
                className="group relative rounded-[24px] border border-[#eef2f6] bg-white p-5 md:p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all duration-300"
                style={{ opacity: practice.inView ? 1 : 0, transform: practice.inView ? 'translateY(0)' : 'translateY(12px)', transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-[800] text-[12px]">{p.n}</div>
                  <div className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${p.accent} border border-[#e2e8f0]/60 flex items-center justify-center`}>
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                </div>
                <h3 className="mt-5 text-[16px] font-[700] leading-tight text-[#0f172a]">{p.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-[#475569]">{p.line}</p>
                <button
                  type="button"
                  onClick={() => togglePractice(i)}
                  aria-expanded={!!practiceOpen[i]}
                  className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-[700] tracking-wide hover:opacity-80 transition-opacity"
                  style={{ color: p.color }}
                >
                  {practiceOpen[i] ? 'Hide details' : 'View details'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${practiceOpen[i] ? 'rotate-180' : ''}`} />
                </button>
                <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: practiceOpen[i] ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <p className="pt-3 mt-3 border-t border-[#f1f5f9] text-[12px] leading-[1.6] text-[#64748b]">{p.detail}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SEE IT IN ACTION */}
      <section id="action" className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-16 md:pb-20">
        <div className="max-w-[720px]">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
            <span className="text-[10px] font-[700] tracking-[0.18em] text-[#2563eb]">SEE IT IN ACTION</span>
          </div>
          <h2 className="text-[26px] md:text-[34px] font-[800] tracking-[-0.02em] text-[#0f172a]">Live demo coming soon</h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-[#475569]">We're building an interactive walkthrough so you can hear how the AI handles real calls, routes, and handoffs.</p>
        </div>
        <div className="mt-8 relative">
          <div className="rounded-[24px] border-[1.5px] border-dashed border-[#cbd5e1] bg-white/70 backdrop-blur p-8 md:p-10 flex flex-col items-center text-center hover:border-[#94a3b8] transition-colors">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a] text-white text-[11px] font-[700] tracking-[0.18em]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              DEMO SLOT RESERVED
            </div>
            <div className="mt-6 w-full max-w-[420px] h-[168px] rounded-[18px] bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.18)] flex items-center justify-center">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '18px 18px' }} />
              <div className="relative flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center">
                  <Mic className="w-[22px] h-[22px] text-white" />
                </div>
                <div className="mt-3 text-white/70 text-[12px] tracking-[0.18em] font-[700]">INTERACTIVE PREVIEW</div>
                <div className="mt-1.5 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-white/40 animate-[giBar_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
              <div className="absolute right-6 bottom-6 w-9 h-9 rounded-full bg-[#38bdf8] shadow-[0_8px_20px_rgba(56,189,248,0.5)] flex items-center justify-center animate-[giFloatCard_3s_ease-in-out_infinite]">
                <PhoneCall className="w-[18px] h-[18px] text-white" />
              </div>
            </div>
            <div className="mt-4 text-[13px] text-[#64748b] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
              Reserved for your IVR demo preview
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-14 md:pb-16">
        <div className="grid md:grid-cols-[320px_1fr] gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-[700] tracking-[0.18em] text-[#94a3b8]">FAQ</span>
            </div>
            <h2 className="text-[26px] md:text-[32px] font-[800] tracking-[-0.02em] text-[#0f172a]">Common questions</h2>
            <p className="mt-3 text-[13.5px] leading-[1.6] text-[#64748b]">Everything about handoff, languages and telephony integration.</p>
          </div>
          <div className="space-y-2.5">
            {service.faqs.map((f, i) => (
              <div key={f.q} className="bg-white rounded-[16px] border border-[#eef2f6] overflow-hidden hover:border-[#e2e8f0] transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-[13px] md:text-[14px] font-[600]">{f.q}</span>
                  <span className="w-7 h-7 rounded-full bg-[#f8fafc] border border-[#eef2f6] flex items-center justify-center flex-shrink-0">
                    {openFaq === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>
                <div className="grid transition-all duration-300" style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <div className="px-5 pb-4 text-[13px] leading-[1.5] text-[#475569]">{f.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section id="explore" className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-[700] tracking-[0.18em] text-[#94a3b8]">EXPLORE MORE</span>
          <span className="h-[1px] w-8 bg-[#e2e8f0]" />
        </div>
        <div className="flex flex-wrap gap-2">
          {explore.map((p) => (
            <Link
              key={p.label}
              to={p.to}
              className="px-3.5 py-2 rounded-full bg-white border border-[#e2e8f0] text-[12px] font-[600] text-[#334155] shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-[#cbd5e1] transition-colors"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-14">
        <div className="rounded-[24px] bg-[#0f172a] text-white p-7 md:p-10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#2563eb]/25 via-[#06b6d4]/20 to-[#ec4899]/20 blur-[60px]" />
          <div className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#06b6d4]/15 to-[#8b5cf6]/15 blur-[80px]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-[560px]">
              <div className="text-[10px] font-[700] tracking-[0.18em] text-white/50">LET'S TALK</div>
              <h2 className="mt-2 text-[24px] md:text-[30px] font-[800] tracking-[-0.03em] leading-[1.1]">Ready to talk about Generative AI IVR?</h2>
              <p className="mt-3 text-[13px] md:text-[14px] leading-[1.5] text-white/60">Schedule a live conversation with our product team. We'll walk you through routing, language coverage, and handoff design for your stack.</p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {'<'} 2h response
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link to={`${import.meta.env.BASE_URL}#contact`} className="h-[40px] px-5 rounded-full bg-white text-[#0f172a] text-[13px] font-[700] inline-flex items-center gap-1.5">Call +91 9811331600</Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes giPulseDot { 0%,100% { transform: scale(1); opacity:1 } 50% { transform: scale(1.5); opacity:0.6 } }
        @keyframes giBar { 0%,100% { transform: scale(1); opacity:0.4 } 50% { transform: scale(1.4); opacity:1 } }
        @keyframes giFloatCard { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
      `}</style>
    </>
  )
}