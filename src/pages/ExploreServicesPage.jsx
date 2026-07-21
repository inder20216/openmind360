import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeInSection from '../components/FadeInSection'
import { services } from '../data/services'

export default function ExploreServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-16">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-20 bg-gradient-to-br from-ox to-ob pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Explore Services</span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">
              <span className="text-ox">AI</span> when possible. <span className="text-ob">Humans</span> when it matters.
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Whether you need experienced support teams, AI-powered automation, or a combination of both — here's everything Open Mind offers.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-4 md:py-8 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6 pb-16">
          {services.map((service, i) => (
            <FadeInSection key={service.path} delay={i * 0.08}>
              <Link
                to={`/services/${service.path}`}
                className="group block h-full p-7 rounded-3xl border border-slate-100 bg-slate-50/60 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-5xl font-light select-none leading-none block" style={{ color: `${service.color}20` }}>
                  {service.num}
                </span>
                <span className="mt-4 block text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: service.color }}>
                  {service.label}
                </span>
                <h2 className="mt-3 text-xl md:text-2xl font-bold text-slate-900 whitespace-pre-line">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm md:text-base text-slate-500 leading-relaxed">
                  {service.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">Not sure which fits your business?</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto leading-relaxed">
              Tell us what you're dealing with and we'll point you to the right combination.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
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
    </>
  )
}
