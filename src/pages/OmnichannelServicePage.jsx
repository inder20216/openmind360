import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bot,
  Building2,
  ChevronDown,
  Clock3,
  Languages,
  Mail,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Share2,
  ShoppingBag,
  Ticket,
} from 'lucide-react'
import SeoHead from '../components/SeoHead'
import FaqSchema from '../components/FaqSchema'
import JsonLd from '../components/JsonLd'
import OmnichannelOrbit3D from '../components/OmnichannelOrbit3D'
import OmnichannelImpact from '../components/OmnichannelImpact'
import { services } from '../data/services'

const service = services.find((s) => s.path === 'omnichannel-support')

const capabilities = [
  { Icon: Phone, accent: '#3b82f6',
    detail: 'Trained agents answer every call with the customer\'s full history already on screen, so no one has to repeat themselves.',
    points: ['Call recording and live transcription on every conversation', 'IVR routing, callback queues, and peak hour staffing', 'Calls, emails, and chats all land in the same ticket'] },
  { Icon: Mail, accent: '#8b5cf6',
    detail: 'One unified inbox for email and live chat, so no message ever sits in a separate tool.',
    points: ['Every reply sent from a single screen with full thread history', 'Auto tagging, priority rules, and shared team visibility', 'Response times tracked against your own SLAs'] },
  { Icon: Bot, accent: '#f97316',
    detail: 'AI resolves routine requests instantly and hands off the moment a human touch is needed.',
    points: ['Bots answer FAQs, order status, and form questions 24/7', 'Complex or sensitive cases lift to an agent with the full transcript', 'No repetition and no lost context in the handoff'] },
  { Icon: Ticket, accent: '#10b981',
    detail: 'Every interaction becomes a tracked ticket with status, priority, and history your team can follow end to end.',
    points: ['Real time status and SLA counters on every ticket', 'Full resolution history attached to each customer record', 'Escalation paths and reporting dashboards included'] },
  { Icon: Clock3, accent: '#f59e0b',
    detail: 'Around the clock staffing across time zones, with shifts tuned to your busiest hours.',
    points: ['24/7 coverage every day of the year', 'Shift planning matched to your peak traffic windows', 'Overflow routing so no call ever rings out'] },
  { Icon: Languages, accent: '#ec4899',
    detail: 'Customers who don\'t speak English get the same fast, human response as everyone else.',
    points: ['Multilingual agents and AI for transcripts and replies', 'Native level handling in Hindi and a growing list of languages', 'Consistent tone and quality across every market'] },
]

const flows = [
  { type: 'Hospital', Icon: Building2, color: '#3b82f6', flow: ['Call', 'WhatsApp'], icons: [Phone, MessageCircle], line: 'Patient calls hospital helpline, then follows up on WhatsApp with the same case history visible both ways.', detail: 'A patient dials the helpline and gets a ticket instantly. Minutes later they send a photo of their prescription over WhatsApp, and the agent already sees the same case, the same thread, and the same history. No repeating themselves, no repeat diagnosis questions.' },
  { type: 'Retail', Icon: ShoppingBag, color: '#8b5cf6', flow: ['Email', 'Chat'], icons: [Mail, MessageCircle], line: 'An online shopper chats about a delayed order after emailing support twice.', detail: 'An order is delayed. The customer emails twice, then shows up in live chat. The agent sees both emails and the chat session on one timeline and resolves the refund in a single conversation, with no repeated proof and no waiting.' },
  { type: 'Social', Icon: Share2, color: '#10b981', flow: ['Social', 'Ticket'], icons: [Share2, Ticket], line: 'A complaint shared on social media automatically becomes a tracked support ticket.', detail: 'A complaint posted on social media is picked up automatically, filed as a tracked ticket, and resolved by a human agent with the full thread attached. Reporting shows the exact time taken from post to fix.' },
]

const explore = [
  { label: 'Intelligent Automation', to: '/services/intelligent-automation' },
  { label: 'Voice Support', to: '/services/generative-ai-ivr' },
  { label: 'Chat & WhatsApp', to: '/services/ai-chatbots' },
  { label: 'Ticket Management', to: '/services/omnichannel-support' },
  { label: 'Analytics Dashboard', to: '/services/revenue-impact' },
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

export default function OmnichannelServicePage() {
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
        @keyframes omFloat1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px, 40px) scale(1.05); } }
        @keyframes omFloat2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px, -30px) scale(1.08); } }
      `}</style>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-[#f1f5f9]">
        <div
          className="h-full bg-gradient-to-r from-[#f97316] via-[#8b5cf6] to-[#3b82f6] transition-[width] duration-100 ease-linear"
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
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[110px] bg-gradient-to-br from-orange-100/30 via-purple-100/20 to-blue-100/30" style={{ animation: 'omFloat1 20s ease-in-out infinite' }} />
        <div className="absolute top-[35%] -right-[15%] w-[700px] h-[700px] rounded-full blur-[120px] bg-gradient-to-bl from-blue-100/30 via-purple-100/20 to-orange-100/20" style={{ animation: 'omFloat2 24s ease-in-out infinite' }} />
      </div>

      {/* HERO */}
      <section id="hero" className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="grid md:grid-cols-[0.92fr_1.08fr] gap-8 md:gap-6 lg:gap-10 items-center">
          <div className="min-w-0 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-[omPulseDot_1.6s_ease-in-out_infinite]" />
              <span className="text-[10px] font-[700] tracking-[0.20em] text-[#f97316]">OMNICHANNEL</span>
            </div>
            <h1 className="font-[800] text-[34px] md:text-[52px] lg:text-[56px] leading-[0.95] tracking-[-0.04em] text-[#0f172a]">
              One Team,<br />Every Channel,<br />
              <span className="bg-gradient-to-r from-[#f97316] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
                No Dropped Conversations
              </span>
            </h1>
            <p className="mt-4 text-[15px] md:text-[16px] leading-[1.6] text-[#475569] max-w-[460px] font-[500] min-w-0">
              Customers don't think in channels. They call, then email, then WhatsApp, expecting you to already know. Open Mind's Hub keeps every conversation in one place, with agents picking up where the last channel left off.
            </p>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-[700] tracking-[0.12em] text-[#94a3b8]">TRUSTED BY</span>
              <div className="flex items-center gap-1.5">
                {['Apollo', 'CloudNine', 'Jafron'].map((p) => (
                  <span key={p} className="px-2.5 py-1 rounded-full bg-white border border-[#eef2f6] text-[11px] font-[600] text-[#334155] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">{p}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="min-w-0 relative order-1 md:order-2">
            <OmnichannelOrbit3D />
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

      {/* IMPACT charts */}
      <section id="charts" className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-16 md:pb-20">
        <OmnichannelImpact />
      </section>

      {/* IN PRACTICE */}
      <section id="practice" ref={practice.ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-16 md:pb-20">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[10px] font-[700] tracking-[0.18em] text-[#94a3b8]">IN PRACTICE</span>
          <span className="h-[1px] w-8 bg-[#e2e8f0]" />
          <span className="text-[10px] font-[600] text-[#cbd5e1]">real flows</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {flows.map((f, i) => {
            const TypeIcon = f.Icon
            return (
              <div
                key={f.type}
                className="bg-white rounded-[20px] border border-[#eef2f6] p-5 md:p-6 hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all duration-300"
                style={{ opacity: practice.inView ? 1 : 0, transform: practice.inView ? 'translateY(0)' : 'translateY(12px)', transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-[10px] bg-[#f8fafc] border border-[#eef2f6] flex items-center justify-center">
                    <TypeIcon className="w-4 h-4" style={{ color: f.color }} />
                  </div>
                  <span className="text-[12px] font-[700]">{f.type}</span>
                  <span className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-[800]" style={{ background: f.color }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="rounded-[12px] bg-[#f8fafc] border border-[#eef2f6] p-3 flex items-center justify-center gap-2">
                  {f.flow.map((label, j) => {
                    const StepIcon = f.icons[j]
                    return (
                      <div key={label} className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-9 h-9 rounded-[10px] bg-white border border-[#e2e8f0] shadow-[0_2px_6px_rgba(0,0,0,0.04)] flex items-center justify-center">
                            <StepIcon className="w-4 h-4 text-[#475569]" />
                          </div>
                          <span className="text-[9px] font-[600] text-[#64748b]">{label}</span>
                        </div>
                        {j < f.flow.length - 1 && <ArrowRight className="w-3 h-3 text-[#cbd5e1] -mt-3" />}
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 text-[13px] font-[500] leading-[1.45] text-[#334155]">{f.line}</div>
                <button
                  type="button"
                  onClick={() => togglePractice(i)}
                  aria-expanded={!!practiceOpen[i]}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-[700] tracking-wide hover:opacity-80 transition-opacity"
                  style={{ color: f.color }}
                >
                  {practiceOpen[i] ? 'Hide details' : 'View details'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${practiceOpen[i] ? 'rotate-180' : ''}`} />
                </button>
                <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: practiceOpen[i] ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <p className="pt-3 mt-3 border-t border-[#f1f5f9] text-[12px] leading-[1.6] text-[#64748b]">{f.detail}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-14 md:pb-16">
        <div className="max-w-[780px] mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-[10px] font-[700] tracking-[0.18em] text-[#94a3b8]">FAQ</span>
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
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#f97316]/20 via-[#8b5cf6]/20 to-[#3b82f6]/20 blur-[60px]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-[560px]">
              <div className="text-[10px] font-[700] tracking-[0.18em] text-white/50">LET'S TALK</div>
              <h2 className="mt-2 text-[24px] md:text-[30px] font-[800] tracking-[-0.03em] leading-[1.1]">One conversation across every channel. Let's set up your Omnichannel Hub</h2>
              <p className="mt-3 text-[13px] md:text-[14px] leading-[1.5] text-white/60">Get a live demo of unified queue, AI ↔ human handoff, and 24/7 coverage. See how nothing falls through the cracks.</p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {'<'} 2h response
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <a href={`${import.meta.env.BASE_URL}#contact`} className="h-[40px] px-5 rounded-full bg-white text-[#0f172a] text-[13px] font-[700] inline-flex items-center gap-1.5">Call +91 9811331600</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}