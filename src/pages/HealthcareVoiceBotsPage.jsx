import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import JsonLd from '../components/JsonLd'
import IndustryDemoDeck from '../components/IndustryDemoDeck'
import { TRUST } from '../data/healthcareLanding'
import logo from '../assets/Logo.png'
import apolloLogo from '../assets/apollo_logo-removebg-preview.png'
import rainbowLogo from '../assets/rainbow_hospitals_logo-removebg-preview.png'

const COLOR = '#2563eb'

const HEALTHCARE_BOT = {
  key: 'healthcare',
  displayName: 'Suraksha Diagnostics & Child Care Centre',
  tagline: 'Ask Ananya about vaccines, labs & scans',
  accentColor: COLOR,
  description: "Books kids' vaccinations, lab tests, and prenatal scans by voice.",
}

export default function HealthcareVoiceBotsPage() {
  const canonical = 'https://www.openmind.in/healthcare/voice-bots'
  const pageTitle = 'AI Voice Bots for Hospitals, PAN India'
  const metaDescription = 'Hospitals lose patients to missed calls every day. Talk to our AI voice agent live, right now, and see how it answers, books and never misses a call.'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageTitle,
    description: metaDescription,
    areaServed: 'IN',
    provider: { '@type': 'Organization', name: 'Open Mind Services Limited', url: 'https://www.openmind.in' },
  }

  return (
    <div className="min-h-screen bg-white">
      <SeoHead title={pageTitle} description={metaDescription} canonical={canonical} />
      <JsonLd data={jsonLd} />

      <header className="w-full border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Open Mind" className="h-8 w-auto" />
          </Link>
          <a
            href="tel:+919811331600"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: COLOR }}
          >
            <Phone size={15} /> <span className="hidden sm:inline">Call</span> +91 9811331600
          </a>
        </div>
      </header>

      {/* Hero: pain point + loss, then the bridge to the demo */}
      <section className="relative overflow-hidden pt-14 pb-10 md:pt-20 md:pb-12" style={{ background: `linear-gradient(180deg, ${COLOR}08, white)` }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
            style={{ backgroundColor: `${COLOR}15`, color: COLOR }}
          >
            For Hospitals · PAN India
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
          >
            Every Missed Call Is a Patient You Just Lost
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed"
          >
            A patient calls your hospital at 9pm asking about a doctor or a test. If no one answers, or no one calls back in time, that patient books at another hospital, and you never find out it happened.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 inline-block px-5 py-3 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-700"
          >
            If your hospital misses 60 enquiries a day and 1 in 5 would have booked a ₹800 consultation, that's roughly <span className="font-bold">₹2.9 lakh a month</span> gone, before tests or admissions. <span className="text-red-500">(Illustrative example.)</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-7 text-base md:text-lg font-semibold text-slate-900"
          >
            Our AI voice agent answers every call in seconds, 24/7, and books the appointment on the spot. Talk to it right now, below.
          </motion.p>
        </div>
      </section>

      {/* The live demo IS the page's only form — doubles as lead capture */}
      <section className="py-10 md:py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 text-center mb-2">Talk to the AI voice agent live</h2>
          <p className="text-sm text-slate-500 text-center mb-8">Real voice, real conversation — not a recording. Already live at PSRI Hospital.</p>
          <IndustryDemoDeck
            bots={[HEALTHCARE_BOT]}
            autoSelectSingleBot
            requirementLabel="Hospital Voice Bots — Landing Page Live Demo"
            gateCopy="So we can follow up about a voice agent for your hospital. Takes 10 seconds — then talk to it live below."
          />
        </div>
      </section>

      {/* Short trust strip, no separate sections below it */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-80 mb-5">
            <img src={apolloLogo} alt="Apollo Hospitals" className="h-7 w-auto grayscale" />
            <img src={rainbowLogo} alt="Rainbow Hospitals" className="h-7 w-auto grayscale" />
            <span className="text-sm font-semibold text-slate-500">PSRI Hospital</span>
          </div>
          <p className="text-slate-600 text-sm">{TRUST.past}</p>
          <p className="text-slate-500 text-xs mt-1">{TRUST.credentials}</p>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Open Mind Services Limited</p>
          <div className="flex items-center gap-5">
            <a href="tel:+919811331600" className="hover:text-slate-800 transition-colors flex items-center gap-1.5"><Phone size={14} /> +91 9811331600</a>
            <a href="mailto:connect@openmind.in" className="hover:text-slate-800 transition-colors flex items-center gap-1.5"><Mail size={14} /> connect@openmind.in</a>
            <Link to="/privacy-policy" className="hover:text-slate-800 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
