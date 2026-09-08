import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, CircleCheck } from 'lucide-react'
import FadeInSection from '../components/FadeInSection'
import SeoHead from '../components/SeoHead'
import { caseStudies } from '../data/caseStudies'
import medtechIcon from '../assets/medtech.png'
import healthcareIcon from '../assets/healthcare.png'
import headsetIcon from '../assets/headset.png'
import retailIcon from '../assets/retail.png'
import myhrEmployees from '../assets/case-studies/myhr-employees-relationship-center.jpg'
import myhrConclusion from '../assets/case-studies/myhr-conclusion.jpg'

const industryIcons = {
  'medical-equipment-support': medtechIcon,
  'healthcare-multispeciality-hospital': healthcareIcon,
  'patient-care': headsetIcon,
  'hr-segment': retailIcon,
}

const caseImages = {
  'myhr-employees-relationship-center': myhrEmployees,
  'myhr-conclusion': myhrConclusion,
}

function CaseSection({ section }) {
  return (
    <div>
      <h4 className="text-base md:text-lg font-bold text-slate-900">{section.heading}</h4>

      {section.body && <p className="mt-2 text-sm md:text-[15px] text-slate-500 leading-relaxed">{section.body}</p>}

      {section.bullets && (
        <ul className="mt-4 space-y-3">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm md:text-[15px] text-slate-600 leading-relaxed">
              <CircleCheck className="w-4 h-4 text-ox flex-shrink-0 mt-1" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {section.groups && (
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {section.groups.map((g, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <p className="font-semibold text-slate-800 text-sm">{g.label}</p>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
      )}

      {section.quote && (
        <blockquote className="mt-5 rounded-2xl border-l-4 border-ox bg-orange-50/60 p-5 md:p-6">
          <p className="text-sm md:text-base text-slate-700 italic leading-relaxed">
            &ldquo;{section.quote}&rdquo;
          </p>
          {section.attribution && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              — {section.attribution}
            </p>
          )}
        </blockquote>
      )}

      {section.image && (
        <figure className="mt-5">
          <img
            src={caseImages[section.image.src]}
            alt={section.image.alt}
            loading="lazy"
            className="w-full rounded-2xl border border-slate-100"
          />
          <figcaption className="mt-2 text-xs text-slate-400">{section.image.caption}</figcaption>
        </figure>
      )}
    </div>
  )
}

function CaseStudyCard({ cs, index }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <FadeInSection delay={index * 0.05}>
      <div
        className={`rounded-3xl border bg-white transition-all duration-300 ${
          open ? 'border-ox/25 shadow-3d' : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'
        }`}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left p-6 md:p-8 flex gap-4 md:gap-6 items-start focus:outline-none"
          aria-expanded={open}
        >
          <img
            src={industryIcons[cs.id]}
            alt=""
            aria-hidden="true"
            className="h-14 w-14 md:h-16 md:w-16 object-contain flex-shrink-0 mt-1"
          />
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">{cs.industry}</span>
            <h3 className="mt-1 text-xl md:text-2xl font-bold text-slate-900">{cs.title}</h3>
            <p className="text-sm text-slate-400">{cs.subtitle}</p>
            <p className="mt-3 text-sm md:text-base text-slate-500 leading-relaxed">{cs.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.facts.map((f) => (
                <span
                  key={f.label}
                  className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs"
                >
                  <span className="text-slate-400">{f.label}: </span>
                  <span className="font-semibold text-slate-700">{f.value}</span>
                </span>
              ))}
            </div>
          </div>
          <span
            className={`mt-1 flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
              open
                ? 'border-ox bg-ox text-white rotate-180'
                : 'border-slate-200 text-slate-400 hover:border-slate-300'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </span>
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-6 md:px-8 pb-8 pt-8 border-t border-slate-100 space-y-8">
              {cs.sections.map((s, i) => (
                <CaseSection key={i} section={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export default function CaseStudiesPage() {
  return (
    <>
      <SeoHead
        title="Case Studies · Customer Support Outcomes | Open Mind"
        description="Four documented engagements across healthcare, medtech, and retail — the challenge, the solution, and the results. Explore Open Mind's customer support case studies."
        canonical="https://www.openmind.in/case-studies"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-24 pb-12 md:pt-28 md:pb-16 px-6 md:px-16">
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

      {/* Case study cards */}
      <section className="pb-16 md:pb-24 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          {caseStudies.map((cs, i) => (
            <CaseStudyCard key={cs.id} cs={cs} index={i} />
          ))}
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