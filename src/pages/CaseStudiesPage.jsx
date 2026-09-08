import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import FadeInSection from '../components/FadeInSection'
import SeoHead from '../components/SeoHead'
import CaseSection from '../components/CaseSection'
import { caseStudies } from '../data/caseStudies'
import medtechIcon from '../assets/medtech.png'
import healthcareIcon from '../assets/healthcare.png'
import headsetIcon from '../assets/headset.png'
import retailIcon from '../assets/retail.png'

const industryIcons = {
  'medical-equipment-support': medtechIcon,
  'healthcare-multispeciality-hospital': healthcareIcon,
  'retail-stores-helpdesk': headsetIcon,
  'hr-segment': retailIcon,
}

function CaseStudyButton({ cs, isActive, onClick }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [hover, setHover] = useState(false)

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = ((y / rect.height) - 0.5) * -14
    const ry = ((x / rect.width) - 0.5) * 14
    setTilt({ rx, ry })
  }

  return (
    <button
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ rx: 0, ry: 0 }) }}
      className="group w-full flex flex-col items-center justify-center gap-3 p-4 md:p-8 transition-all duration-300 [transform-style:preserve-3d] [perspective:900px]"
      style={{
        transform: hover ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-6px) scale(1.03)` : 'perspective(900px) translateY(0) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="relative h-28 w-28 md:h-44 md:w-44 transition-transform duration-300"
        style={{
          transform: hover ? `translateZ(40px) scale(1.1)` : `translateZ(10px) scale(1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-60 blur-md pointer-events-none transition-all duration-300"
          style={{
            background: 'radial-gradient(60% 60% at 50% 55%, #fdba74, transparent 70%)',
            transform: 'translateZ(-20px) scale(0.9)',
            opacity: hover || isActive ? 0.85 : 0.4,
          }}
        />
        <img
          src={industryIcons[cs.id]}
          alt=""
          aria-hidden="true"
          className="relative h-full w-full object-contain drop-shadow-[0_18px_24px_rgba(249,115,22,0.35)] transition-all duration-300"
          style={{ transform: hover ? 'translateZ(14px) scale(1.05)' : 'translateZ(0)' }}
        />
      </div>
      <span
        className="text-[11px] md:text-[13px] font-semibold text-center leading-snug line-clamp-2 min-h-[2.75em] w-full transition-colors duration-300"
        style={{
          color: isActive ? '#ea580c' : hover ? '#9a3412' : '#475569',
          transform: hover ? 'translateZ(24px)' : 'translateZ(0)',
        }}
      >
        {cs.title}
      </span>
      <span
        className={`mt-1 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isActive
            ? 'border-orange-500 text-orange-500 rotate-180'
            : 'border-slate-200 text-slate-400 group-hover:border-orange-200 group-hover:text-orange-500'
        }`}
      >
        <ChevronDown className="w-4 h-4" />
      </span>
    </button>
  )
}

export default function CaseStudiesPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, setExpanded] = useState({})
  const [openCardSlug, setOpenCardSlug] = useState(null)
  const toggleExpand = (key) => setExpanded((p) => ({ ...p, [key]: !p[key] }))

  const openCard = caseStudies
    .flatMap((cs) => cs.cards || [])
    .find((c) => c.slug === openCardSlug)

  const renderSingleCard = (cs) => {
    const isOpen = !!expanded[cs.id]
    return (
      <div className="rounded-3xl border border-ox/25 bg-white shadow-3d overflow-hidden">
        <div className="p-6 md:p-10 border-b border-slate-100">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">{cs.industry}</span>
          <h2 className="mt-1 text-2xl md:text-4xl font-bold text-slate-900">{cs.title}</h2>
          <p className="text-sm text-slate-400 mt-1">{cs.subtitle}</p>
          <p className="mt-4 text-sm md:text-base text-slate-500 leading-relaxed max-w-3xl">{cs.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {cs.facts.map((f) => (
              <span key={f.label} className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-400">{f.label}: </span>
                <span className="font-semibold text-slate-700">{f.value}</span>
              </span>
            ))}
          </div>
        </div>
        {isOpen && (
          <div className="px-6 md:px-10 py-8 space-y-10">
            {cs.sections.map((s, j) => (
              <CaseSection key={j} section={s} />
            ))}
          </div>
        )}
        <div className="flex items-center justify-center p-6 md:p-8">
          <button
            onClick={() => toggleExpand(cs.id)}
            className="inline-flex items-center gap-2 rounded-full border border-ox/30 text-ox text-sm font-semibold px-6 py-2.5 hover:bg-ox hover:text-white transition-colors"
          >
            {isOpen ? 'View Less' : 'View More'}
            <ChevronDown className={`w-4 h-4 ${isOpen ? 'rotate-180' : ''} transition-transform`} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SeoHead
        title="Case Studies · Customer Support Outcomes | Open Mind"
        description="Four documented engagements across healthcare, medtech, and retail — the challenge, the solution, and the results. Explore Open Mind's customer support case studies."
        canonical="https://www.openmind.in/case-studies"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-24 pb-8 md:pt-28 md:pb-10 px-6 md:px-16">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-20 bg-gradient-to-br from-ob to-ox pointer-events-none" />
        <div className="absolute top-40 -left-24 w-[320px] h-[320px] rounded-full blur-[110px] opacity-15 bg-gradient-to-tr from-purple-500 to-ob pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">
              Customer Support Case Studies
            </span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold bg-gradient-to-r from-ox via-purple-500 to-ob bg-clip-text text-transparent">
              Real Work. Real Results.
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              Four engagements across healthcare, medtech, and retail — documented end to end, from the
              challenge to the outcome.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Icon buttons */}
      <section className="relative overflow-hidden px-6 md:px-16 pb-4 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="absolute -top-20 -left-24 w-[360px] h-[360px] rounded-full blur-[110px] opacity-15 bg-gradient-to-tr from-purple-500 to-ob pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-20 bg-gradient-to-br from-ob to-ox pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-15 bg-gradient-to-tl from-white via-purple-200 to-orange-200 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {caseStudies.map((cs, i) => (
              <CaseStudyButton
                key={cs.id}
                cs={cs}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Active case study content — full width */}
      <section className="relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-14 pb-16 md:pb-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="absolute top-10 -left-24 w-[420px] h-[420px] rounded-full blur-[120px] opacity-20 bg-gradient-to-br from-purple-500 to-ob pointer-events-none" />
        <div className="absolute top-40 -right-24 w-[460px] h-[460px] rounded-full blur-[120px] opacity-15 bg-gradient-to-bl from-ob to-ox pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-[380px] h-[380px] rounded-full blur-[110px] opacity-15 bg-gradient-to-tr from-orange-200 via-white to-purple-200 pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto">
        {caseStudies.map((cs, i) => {
          const isActive = activeIndex === i
            return (
              <div
                key={cs.id}
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="pt-6">
                    {cs.cards ? (
                      <div>
                        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                          {cs.cards.map((card) => {
                            const isOpen = openCardSlug === card.slug
                            return (
                              <div key={card.title} className="rounded-3xl border border-ox/25 bg-white shadow-3d overflow-hidden flex flex-col">
                                <div className="p-5 md:p-6 border-b border-slate-100">
                                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ox">{card.industry}</span>
                                  <h2 className="mt-1 text-xl md:text-2xl font-bold text-slate-900">{card.title}</h2>
                                  <p className="text-[13px] text-slate-400 mt-0.5">{card.subtitle}</p>
                                  <p className="mt-3 text-sm md:text-[14px] text-slate-500 leading-relaxed">{card.summary}</p>
                                </div>
                                <div className="mt-auto flex items-center justify-center p-5">
                                  <button
                                    onClick={() => setOpenCardSlug(isOpen ? null : card.slug)}
                                    className={`inline-flex items-center gap-2 rounded-full border text-[13px] font-semibold px-5 py-2 transition-colors ${
                                      isOpen
                                        ? 'border-ox/30 bg-ox text-white hover:bg-ox'
                                        : 'border-ox/30 text-ox hover:bg-ox hover:text-white'
                                    }`}
                                  >
                                    {isOpen ? 'View Less' : 'View More'}
                                    <ChevronDown className={`w-4 h-4 ${isOpen ? 'rotate-180' : ''} transition-transform`} />
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        {openCardSlug && openCard && (
                          <div className="mt-6 rounded-3xl border border-ox/25 bg-white shadow-3d overflow-hidden">
                            <div className="p-6 md:p-10 border-b border-slate-100">
                              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">{openCard.industry}</span>
                              <h2 className="mt-1 text-2xl md:text-4xl font-bold text-slate-900">{openCard.title}</h2>
                              <p className="text-sm text-slate-400 mt-1">{openCard.subtitle}</p>
                              <p className="mt-4 text-sm md:text-base text-slate-500 leading-relaxed max-w-3xl">{openCard.summary}</p>
                              <div className="mt-5 flex flex-wrap gap-2">
                                {openCard.facts.map((f) => (
                                  <span key={f.label} className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs">
                                    <span className="text-slate-400">{f.label}: </span>
                                    <span className="font-semibold text-slate-700">{f.value}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="px-6 md:px-10 py-8 space-y-10">
                              {openCard.sections.map((s, j) => (
                                <CaseSection key={j} section={s} />
                              ))}
                            </div>
                            <div className="flex items-center justify-center p-6 md:p-8">
                              <button
                                onClick={() => setOpenCardSlug(null)}
                                className="inline-flex items-center gap-2 rounded-full border border-ox/30 text-ox text-sm font-semibold px-6 py-2.5 hover:bg-ox hover:text-white transition-colors"
                              >
                                View Less <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      renderSingleCard(cs)
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Partner quote */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
              A Word From Our Partners
            </span>
            <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-8 md:p-12 shadow-3d">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">
                Healthcare · Apollo Hospitals
              </span>
              <blockquote className="mt-6 text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                &ldquo;Open Mind has been an exceptional partner for Apollo Hospitals. Their AI-powered support
                desk improved our patient response time by 60% while maintaining the human touch our patients
                deserve.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ox to-ob flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  NL
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Neeraj Lal</p>
                  <p className="text-sm text-slate-400">COO, Apollo Hospitals, Gujarat Region</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pb-14">
        <div className="rounded-[24px] bg-[#0f172a] text-white p-7 md:p-10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#f97316]/20 via-[#8b5cf6]/20 to-[#3b82f6]/20 blur-[60px]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-[560px]">
              <div className="text-[10px] font-[700] tracking-[0.18em] text-white/50">LET'S TALK</div>
              <h2 className="mt-2 text-[24px] md:text-[30px] font-[800] tracking-[-0.03em] leading-[1.1]">Want to be featured next?</h2>
              <p className="mt-3 text-[13px] md:text-[14px] leading-[1.5] text-white/60">If Open Mind has helped your business, we'd love to share your story here — from the first call to the final outcome.</p>
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