import { motion } from 'framer-motion'
import FadeInSection from '../components/FadeInSection'

const partners = [
  { name: 'Cloud Nine Hospitals', sector: 'Healthcare' },
  { name: 'Jafron Biomedical', sector: 'Healthcare / Biomedical' },
]

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-16">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-20 bg-gradient-to-br from-ob to-ox pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Case Studies</span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">Real Partners, Real Results</h1>
            <p className="mt-5 text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              A look at how organizations work with Open Mind to deliver better customer experiences.
            </p>
          </motion.div>
        </div>
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
