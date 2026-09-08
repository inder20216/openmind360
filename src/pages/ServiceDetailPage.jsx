import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import FadeInSection from '../components/FadeInSection'
import FaqSchema from '../components/FaqSchema'
import JsonLd from '../components/JsonLd'
import SeoHead from '../components/SeoHead'
import PlaceholderPage from './PlaceholderPage'
import OmslAutomationWorkflow3D from '../components/OmslAutomationWorkflow3D'
import { services } from '../data/services'

function CheckIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const [openFaq, setOpenFaq] = useState(null)
  const service = services.find((s) => s.path === slug)

  if (!service) {
    return <PlaceholderPage eyebrow="404" title="Service Not Found" />
  }

  const otherServices = services.filter((s) => s.path !== service.path)

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
      {/* Hero — skipped on Intelligent Automation where the workflow acts as the page header */}
      {service.path !== 'intelligent-automation' && (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-16">
          <div
            className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-30 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${service.color}, transparent 70%)` }}
          />
          <div className="relative max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: service.color }}>
                {service.label}
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900 whitespace-pre-line mx-auto">
                {service.pageTitle.split('\n')[0]}
                {service.pageTitle.includes('\n') && (
                  <span className="block bg-gradient-to-r from-ox via-purple-500 to-ob bg-clip-text text-transparent">
                    {service.pageTitle.slice(service.pageTitle.indexOf('\n') + 1)}
                  </span>
                )}
              </h1>
              <p className="mt-5 text-base md:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
                {service.pageIntro}
              </p>
              <div className="mt-6 flex items-center gap-3 justify-center">
                <span className="w-8 h-px" style={{ backgroundColor: service.color }} />
                <span className="text-sm font-medium" style={{ color: service.color }}>{service.stat}</span>
                <span className="w-8 h-px" style={{ backgroundColor: service.color }} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* OMSL Automation Workflow (Intelligent Automation only) */}
      {service.path === 'intelligent-automation' && (
        <section className="pt-28 md:pt-32 px-0 md:px-0 bg-white overflow-hidden">
          <OmslAutomationWorkflow3D />
        </section>
      )}

      {/* Features */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">What's Included</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold text-slate-900">Built for real support teams</h2>
          </FadeInSection>
          <div className="mt-10 grid sm:grid-cols-2 gap-5 text-left">
            {service.features.map((f, i) => (
              <FadeInSection key={f} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-5 rounded-2xl border border-slate-100 bg-slate-50/60">
                  <CheckIcon color={service.color} />
                  <span className="text-sm md:text-base text-slate-600 leading-relaxed">{f}</span>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Where this fits — concrete use cases */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: service.color }}>Where This Fits</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold text-slate-900">In practice</h2>
          </FadeInSection>
          <div className="mt-10 space-y-4 text-left">
            {service.useCases.map((u, i) => (
              <FadeInSection key={u} delay={i * 0.07}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100">
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                    style={{ backgroundColor: service.color }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{u}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bots / automation / AI agent demo slot */}
      {service.path !== 'omnichannel-support' && (
      <section className="py-20 md:py-28 px-6 md:px-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: service.color }}>See It In Action</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold text-slate-900">Live demo coming soon</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed">
              An interactive bot, voice agent, or automation walkthrough for {service.label} will go here.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <div
              className="mt-10 rounded-3xl border-2 border-dashed p-16 flex flex-col items-center justify-center gap-3"
              style={{ borderColor: `${service.color}40`, background: `${service.color}08` }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide"
                style={{ backgroundColor: `${service.color}15`, color: service.color }}
              >
                Demo Slot
              </span>
              <p className="text-sm text-slate-400 max-w-sm">
                Reserved for the {service.label.toLowerCase()} demo — bot, voice agent, or workflow walkthrough.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
      )}

      {/* FAQs */}
      {service.path === 'intelligent-automation' ? (
        <section className="py-20 md:py-28 relative z-10 max-w-[1280px] mx-auto w-full px-6 md:px-10 bg-white">
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
                    aria-expanded={openFaq === i}
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
      ) : (
        <section className="py-20 md:py-28 px-6 md:px-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInSection>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">FAQ</span>
              <h2 className="mt-3 text-2xl md:text-4xl font-bold text-slate-900">Common questions</h2>
            </FadeInSection>
            <div className="mt-10 space-y-6 text-left">
              {service.faqs.map((f, i) => (
                <FadeInSection key={f.q} delay={i * 0.06}>
                  <div className="pb-6 border-b border-slate-100">
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">{f.q}</h3>
                    <p className="mt-2 text-sm md:text-base text-slate-500 leading-relaxed">{f.a}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore other services */}
      <section className="py-16 px-6 md:px-16 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Explore More</span>
          <div className="mt-5 flex flex-wrap gap-3 justify-center">
            {otherServices.map((s) => (
              <Link
                key={s.path}
                to={`/services/${s.path}`}
                className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact us */}
      {service.path === 'intelligent-automation' ? (
        <section className="relative z-10 max-w-[1280px] mx-auto w-full px-6 md:px-10 pb-14 md:pb-16 bg-white">
          <div className="rounded-[24px] bg-[#0f172a] text-white p-7 md:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#f97316]/20 via-[#8b5cf6]/20 to-[#3b82f6]/20 blur-[60px]" />
            <div className="relative flex flex-col items-center justify-center gap-6 text-center">
              <div className="max-w-[560px] mx-auto">
                <div className="text-[10px] font-[700] tracking-[0.18em] text-white/50">LET'S TALK</div>
                <h2 className="mt-2 text-[24px] md:text-[30px] font-[800] tracking-[-0.03em] leading-[1.1]">The busywork behind every fast resolution, automated. Permanently.</h2>
                <p className="mt-3 text-[13px] md:text-[14px] leading-[1.5] text-white/60">Get a live demo of ticket routing, zero-touch lead nurturing, real-time dashboards, and AI-driven insights. See your support stack run itself.</p>
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {'<'} 2h response
                </div>
              </div>
              <a href={`${import.meta.env.BASE_URL}#contact`} className="h-[40px] px-5 rounded-full bg-white text-[#0f172a] text-[13px] font-[700] inline-flex items-center justify-center gap-1.5">Contact Us <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 md:py-28 px-6 md:px-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInSection>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                Ready to talk about {service.label}?
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
                Schedule a live conversation with our team and see how this fits your business.
              </p>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919811331600"
                  className="px-8 py-3.5 bg-ox text-white text-sm font-semibold rounded-full shadow-lg shadow-ox/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Call +91 9811331600
                </a>
                <a
                  href="mailto:connect@openmind.in"
                  className="px-8 py-3.5 border border-slate-200 text-slate-500 text-sm font-medium rounded-full hover:border-slate-300 hover:text-slate-700 transition-all duration-300"
                >
                  Email connect@openmind.in
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}
    </>
  )
}
