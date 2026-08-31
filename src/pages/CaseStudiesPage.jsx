import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeInSection from '../components/FadeInSection'
import healthcareIcon from '../assets/healthcare.png'
import medtechIcon from '../assets/medtech.png'
import retailIcon from '../assets/retail.png'
import ecommIcon from '../assets/ecomm.png'

const partners = [
  { name: 'Cloud Nine Hospitals', sector: 'Healthcare' },
  { name: 'Jafron Biomedical', sector: 'Healthcare / Biomedical' },
]

const industries = [
  { id: 'healthcare', label: 'Healthcare', shortLabel: 'Healthcare Customer Support Case Studies', icon: healthcareIcon, cases: [] },
  { id: 'medtech', label: 'Medtech', shortLabel: 'Medical Equipment Support Helpdesk Case Studies', icon: medtechIcon, cases: [] },
  { id: 'retail', label: 'Retail Store Complaint Management Helpdesk', shortLabel: 'Retail Stores Helpdesk & Complaint Management Case Studies', icon: retailIcon, cases: [] },
  { id: 'ecomm', label: 'Ecomm Customer Support', shortLabel: 'E-Commerce Support & Complaint Management Helpdesk Case Studies', icon: ecommIcon, cases: [] },
]

function IndustryTabsSection() {
  const [activeId, setActiveId] = useState(industries[0].id)
  const active = industries.find((i) => i.id === activeId)

  return (
    <div className="relative max-w-5xl mx-auto mt-10 md:mt-12">
      <FadeInSection delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveId(ind.id)}
              className="flex flex-col items-center gap-3 transition-all duration-300"
            >
              <img
                src={ind.icon}
                alt=""
                aria-hidden="true"
                className={`h-28 md:h-40 w-28 md:w-40 object-contain transition-all duration-300 ${
                  activeId === ind.id ? 'scale-110 drop-shadow-xl' : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              />
              <span className={`text-xs md:text-sm font-semibold text-center leading-tight ${
                activeId === ind.id ? 'text-ox' : 'text-slate-500'
              }`}>
                {ind.shortLabel || ind.label}
              </span>
            </button>
          ))}
        </div>
      </FadeInSection>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {active.cases.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 p-10 text-center">
              <p className="text-sm text-slate-400">
                Case studies for {active.label} are coming soon.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {active.cases.map((c) => (
                <div key={c.name} className="p-6 rounded-2xl bg-white border border-slate-100">
                  <p className="font-semibold text-slate-800">{c.name}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-24 pb-12 md:pt-28 md:pb-16 px-6 md:px-16">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-20 bg-gradient-to-br from-ob to-ox pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-ox via-purple-500 to-ob bg-clip-text text-transparent">Real Partners, Real Results</h1>
            <p className="mt-5 text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              We don't publish a case study until the results are real. Here's how organizations actually work with Open Mind.
            </p>
          </motion.div>
        </div>

        <IndustryTabsSection />
      </section>

      {/* Apollo Hospitals — full case study */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="rounded-3xl border border-slate-100 bg-slate-50/60 p-8 md:p-12">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Healthcare · Apollo Hospitals</span>
              <blockquote className="mt-6 text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                &ldquo;Open Mind has been an exceptional partner for Apollo Hospitals. Their AI-powered support desk improved our patient response time by 60% while maintaining the human touch our patients deserve.&rdquo;
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

      {/* Other named partners — no fabricated metrics */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Also Partnering With</span>
          </FadeInSection>
          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            {partners.map((p, i) => (
              <FadeInSection key={p.name} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <p className="font-semibold text-slate-800">{p.name}</p>
                  <p className="text-sm text-slate-400 mt-1">{p.sector}</p>
                  <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                    Full case study in progress — check back soon for detailed results.
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">Want to be featured next?</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto leading-relaxed">
              If Open Mind has helped your business, we'd love to share your story here.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:connect@openmind.in"
                className="px-8 py-3.5 bg-ox text-white text-sm font-semibold rounded-full shadow-lg shadow-ox/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Email connect@openmind.in
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
