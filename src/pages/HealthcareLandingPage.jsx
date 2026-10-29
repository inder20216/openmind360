import { useState, useRef } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, Check, Minus, Plus } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import JsonLd from '../components/JsonLd'
import FaqSchema from '../components/FaqSchema'
import { healthcareLandingPages, PATIENT_STEPS, TRUST } from '../data/healthcareLanding'
import logo from '../assets/Logo.png'
import apolloLogo from '../assets/apollo_logo-removebg-preview.png'
import rainbowLogo from '../assets/rainbow_hospitals_logo-removebg-preview.png'

// Tested, confirmed-working lead-capture webhook (see
// automation/n8n-workflows/13-chatbot-lead-capture.json and its README) —
// reused here rather than ContactForm.jsx's WEBHOOK_URL, which is still an
// unactivated placeholder and does not currently deliver anywhere.
const LEAD_CAPTURE_URL = 'https://automation.openmindhelpline.com/webhook/openmind-chatbot-lead-capture'

const countryCodes = ['+91', '+1', '+44', '+971', '+65']
const isValidName = (v) => /[a-zA-Z]/.test(v) && v.trim().length >= 2
const isValidPhone = (v) => /^\d{7,15}$/.test(v.trim())
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

function LeadForm({ variant }) {
  const [name, setName] = useState('')
  const [hospital, setHospital] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [touched, setTouched] = useState(false)

  const isValid = isValidName(name) && isValidPhone(phone) && isValidEmail(email)

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return
    setStatus('sending')
    try {
      const res = await fetch(LEAD_CAPTURE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          countryCode,
          phone,
          email,
          requirement: `Hospital ${variant.navLabel} — Landing Page${hospital ? ` (hospital: ${hospital})` : ''}`,
        }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium text-center">
        Thanks — our team will call you back shortly to get this started.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        name="name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2"
        style={{ '--tw-ring-color': `${variant.color}40` }}
      />
      <input
        name="hospital"
        placeholder="Hospital name"
        value={hospital}
        onChange={(e) => setHospital(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2"
        style={{ '--tw-ring-color': `${variant.color}40` }}
      />
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="px-3 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2">
          {countryCodes.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          required
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2"
        />
      </div>
      <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2"
      />
      {touched && !isValid && (
        <p className="text-xs text-red-500">Please fill in a valid name, phone and email.</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full px-8 py-3.5 text-white text-sm font-semibold rounded-full shadow-lg transition-all duration-300 disabled:opacity-60"
        style={{ backgroundColor: variant.color }}
      >
        {status === 'sending' ? 'Sending…' : variant.trialLabel}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-500 text-center">Something went wrong — please call us directly instead.</p>
      )}
      <p className="text-xs text-slate-400 text-center">We'll call you back within minutes. No spam, ever.</p>
    </form>
  )
}

function FaqItem({ q, a, color }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-800">{q}</span>
        <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      {open && <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{a}</div>}
    </div>
  )
}

function MiniHeader({ variant }) {
  return (
    <header className="w-full border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Open Mind" className="h-8 w-auto" />
        </Link>
        <a
          href="tel:+919811331600"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: variant.color }}
        >
          <Phone size={15} /> <span className="hidden sm:inline">Call</span> +91 9811331600
        </a>
      </div>
    </header>
  )
}

function MiniFooter() {
  return (
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
  )
}

function LandingContent({ variant }) {
  const formRef = useRef(null)
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  const canonical = `https://www.openmind.in${variant.path}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: variant.pageTitle,
    description: variant.metaDescription,
    areaServed: 'IN',
    provider: { '@type': 'Organization', name: 'Open Mind Services Limited', url: 'https://www.openmind.in' },
  }

  return (
    <div className="min-h-screen bg-white">
      <SeoHead title={variant.pageTitle} description={variant.metaDescription} canonical={canonical} />
      <JsonLd data={jsonLd} />
      <FaqSchema faqs={variant.faqs} />

      <MiniHeader variant={variant} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-20" style={{ background: `linear-gradient(180deg, ${variant.color}08, white)` }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
            style={{ backgroundColor: `${variant.color}15`, color: variant.color }}
          >
            {variant.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
          >
            {variant.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {variant.heroSub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={scrollToForm}
              className="px-8 py-3.5 text-white text-sm font-semibold rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ backgroundColor: variant.color }}
            >
              {variant.trialLabel}
            </button>
            <a
              href="tel:+919811331600"
              className="px-8 py-3.5 text-sm font-semibold rounded-full border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors flex items-center gap-2"
            >
              <Phone size={15} /> Call +91 9811331600
            </a>
          </motion.div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 opacity-80">
            <img src={apolloLogo} alt="Apollo Hospitals" className="h-7 w-auto grayscale" />
            <img src={rainbowLogo} alt="Rainbow Hospitals" className="h-7 w-auto grayscale" />
            <span className="text-sm font-semibold text-slate-500">PSRI Hospital</span>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <p className="text-xs font-bold tracking-wide text-slate-400 mb-3">TODAY, WITHOUT US</p>
            <p className="text-slate-700 leading-relaxed">{variant.problem}</p>
          </div>
          <div className="p-6 rounded-2xl border" style={{ backgroundColor: `${variant.color}08`, borderColor: `${variant.color}30` }}>
            <p className="text-xs font-bold tracking-wide mb-3" style={{ color: variant.color }}>WITH OPEN MIND</p>
            <p className="text-slate-700 leading-relaxed">{variant.solution}</p>
          </div>
        </div>
      </section>

      {/* 4 steps */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">How it works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {PATIENT_STEPS.map((s) => (
              <div key={s.n} className="p-5 rounded-2xl border border-slate-200">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4" style={{ backgroundColor: variant.color }}>
                  {s.n}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">What you get</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {variant.features.map((f) => (
              <div key={f} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200">
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: `${variant.color}15`, color: variant.color }}>
                  <Check size={13} />
                </span>
                <span className="text-sm text-slate-700 leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Why hospitals trust us</h2>
          <p className="text-slate-600 mb-2">Current clients: <span className="font-semibold text-slate-800">{TRUST.current.join(' · ')}</span></p>
          <p className="text-slate-600 mb-2">{TRUST.past}</p>
          <p className="text-slate-500 text-sm">{TRUST.credentials}</p>
        </div>
      </section>

      {/* Lead form */}
      <section ref={formRef} className="py-16 bg-slate-50">
        <div className="max-w-md mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">{variant.trialLabel}</h2>
          <p className="text-sm text-slate-500 text-center mb-8">Leave your details and we'll call you back shortly.</p>
          <LeadForm variant={variant} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">Questions hospitals ask us</h2>
          <div className="space-y-3">
            {variant.faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} color={variant.color} />
            ))}
          </div>
        </div>
      </section>

      <MiniFooter />
    </div>
  )
}

export default function HealthcareLandingPage({ variantId }) {
  const params = useParams()
  const id = variantId || params.variant
  const variant = healthcareLandingPages[id]

  if (!variant) return <Navigate to="/" replace />

  return <LandingContent variant={variant} />
}
