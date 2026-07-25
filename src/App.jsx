import { useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './components/Navbar'
import ChatVoiceWidget from './components/ChatVoiceWidget'
import ServicesOrbit from './components/ServicesOrbit'
import PlaceholderPage from './pages/PlaceholderPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import ExploreServicesPage from './pages/ExploreServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import FadeInSection from './components/FadeInSection'
import { services } from './data/services'

/* ─── MARQUEE CONTENT ─── */
const industries = [
  { icon: '🏥', text: 'Healthcare' },
  { icon: '🛒', text: 'E-commerce' },
  { icon: '🏦', text: 'Banking' },
  { icon: '💳', text: 'FinTech' },
  { icon: '🎓', text: 'Education' },
  { icon: '🏨', text: 'Hospitality' },
  { icon: '🏢', text: 'Enterprise' },
  { icon: '🚚', text: 'Logistics' },
  { icon: '📡', text: 'Telecom' },
  { icon: '🏭', text: 'Manufacturing' },
  { icon: '🏛️', text: 'Government' },
  { icon: '🛍️', text: 'Retail' },
]
const benefits = [
  { icon: '⚡', text: 'Up to 70% Faster Response' },
  { icon: '🤖', text: 'Up to 80% Automated Queries' },
  { icon: '📈', text: 'Higher Customer Satisfaction' },
  { icon: '🎯', text: 'Improved First Contact Resolution' },
  { icon: '👨‍💼', text: 'Increased Agent Productivity' },
  { icon: '🌐', text: 'Enhanced Customer Experience' },
]

const dotColors = ['bg-ox', 'bg-ob', 'bg-purple-500']

const marqueeSequence = [
  { type: 'label', icon: '🏢', text: 'Industries Served' },
  ...industries.map((i) => ({ type: 'item', text: i.text, icon: i.icon })),
  { type: 'divider' },
  { type: 'label', icon: '🚀', text: 'Business Benefits' },
  ...benefits.map((b) => ({ type: 'item', text: b.text, icon: b.icon })),
]
const marqueeRow = [...marqueeSequence, ...marqueeSequence]

/* ─── HERO ─── */
function HeroSection() {
  const heroRef = useRef(null)
  let itemIndex = 0

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-12 pb-10 md:pt-14 md:pb-12">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.4]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Glow behind the ecosystem illustration */}
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[30rem] max-h-[30rem] bg-gradient-to-br from-ox/15 via-ob/10 to-transparent rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16">
        {/* Industries + Outcomes marquee, flush against the navbar, continuous loop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 md:mb-5 -mx-6 md:-mx-16 overflow-hidden py-1.5"
        >
          <div className="flex items-center w-max gap-4 md:gap-5 animate-marquee-half motion-reduce:animate-none hover:[animation-play-state:paused]">
            {marqueeRow.map((entry, i) => {
              if (entry.type === 'divider') {
                return <span key={i} className="flex-shrink-0 w-px h-5 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
              }
              if (entry.type === 'label') {
                return (
                  <span
                    key={i}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-ob via-purple-600 to-ox text-white text-xs md:text-sm font-bold tracking-wide shadow-[0_4px_16px_-2px_rgba(124,58,237,0.4)] whitespace-nowrap"
                  >
                    <span aria-hidden="true">{entry.icon}</span>
                    {entry.text}
                  </span>
                )
              }
              const dot = dotColors[itemIndex % dotColors.length]
              itemIndex += 1
              return (
                <span
                  key={i}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-orange-100/80 backdrop-blur-md border border-white/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_18px_-6px_rgba(59,130,246,0.18),0_6px_18px_-6px_rgba(249,115,22,0.12)] text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),0_10px_28px_-6px_rgba(124,58,237,0.35)]"
                >
                  {entry.icon ? (
                    <span aria-hidden="true">{entry.icon}</span>
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  )}
                  {entry.text}
                </span>
              )
            })}
          </div>
        </motion.div>

        {/* Mobile: orbit graphic above the text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:hidden mb-8"
        >
          <ServicesOrbit className="mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.15] tracking-tight text-slate-900"
          >
            <span>AI-Powered Customer Experience Solutions</span><br />
            <span className="sm:whitespace-nowrap bg-gradient-to-r from-ox via-purple-500 to-ob bg-clip-text text-transparent">
              That Fits Your Business
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-4 text-base md:text-lg font-semibold text-slate-700"
          >
            <span className="text-ox">Traditional Contact Centers</span> •{' '}
            <span className="text-ob">AI Automation</span> •{' '}
            <span className="text-purple-600">Hybrid Customer Support</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-3 text-sm md:text-base text-slate-500 max-w-xl leading-relaxed"
          >
            Whether you need experienced customer support teams, AI-powered automation, or{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-ox to-ob">a combination of both</span>,
            {' '}Open Mind helps you deliver exceptional customer experiences at every stage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex gap-4 flex-wrap"
          >
            <Link
              to="/services"
              className="px-7 py-3 bg-ox text-white text-sm font-semibold rounded-full shadow-lg shadow-ox/20 hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex items-start justify-center -mt-8"
          >
            <ServicesOrbit />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── SERVICE SECTIONS ─── */
function ServiceSection({ service, index }) {
  const isReversed = index % 2 === 1
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const maskDirection = isReversed ? 'to right' : 'to left'
  const maskGradient = `linear-gradient(${maskDirection}, black 45%, transparent 95%)`

  return (
    <section ref={sectionRef} id={service.id} className="relative py-20 md:py-32 px-6 md:px-16 bg-white overflow-hidden">
      {/* Colorful glow accents, revealed through the faded side of the video */}
      <div
        className={`absolute -top-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-40 ${isReversed ? '-right-24' : '-left-24'}`}
        style={{ background: `radial-gradient(circle, ${service.color}, transparent 70%)` }}
      />
      <div
        className={`absolute bottom-0 w-[380px] h-[380px] rounded-full blur-[120px] opacity-30 ${isReversed ? '-left-16' : '-right-16'}`}
        style={{ background: `radial-gradient(circle, ${service.accent}, transparent 70%)` }}
      />

      {/* Media merged across the full section, faded toward the text side */}
      {service.video ? (
        <>
          {/* Mobile: contained, above the text */}
          <video
            src={service.video}
            autoPlay
            loop
            muted
            playsInline
            className="md:hidden relative w-full aspect-video rounded-2xl object-cover mb-10 shadow-lg"
          />
          {/* Desktop: covers the whole section, fading out on the text side */}
          <motion.video
            src={service.video}
            autoPlay
            loop
            muted
            playsInline
            style={{
              y: mediaY,
              WebkitMaskImage: maskGradient,
              maskImage: maskGradient,
            }}
            className={`hidden md:block pointer-events-none absolute inset-y-0 w-1/2 h-full object-cover ${
              isReversed ? 'left-0' : 'right-0'
            }`}
          />
        </>
      ) : service.image ? (
        <>
          {/* Mobile: contained card, above the text */}
          <img
            src={service.image}
            alt=""
            aria-hidden="true"
            className="md:hidden relative w-full rounded-2xl object-contain bg-white mb-10 shadow-lg border border-slate-200/70 p-3"
          />
          {/* Desktop: a floating, tilted dashboard card that overlaps into the text side */}
          <motion.div
            style={{ y: mediaY }}
            initial={{ opacity: 0, rotate: 0 }}
            whileInView={{ opacity: 1, rotate: isReversed ? -4 : 4 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`hidden md:block pointer-events-none absolute top-1/2 -translate-y-1/2 w-[62vw] max-w-3xl ${
              isReversed ? 'left-[2%]' : 'right-[2%]'
            }`}
          >
            <img
              src={service.image}
              alt=""
              aria-hidden="true"
              className="w-full h-auto rounded-[1.75rem] object-contain bg-white shadow-2xl shadow-slate-300/60 border border-slate-200/70 p-4"
            />
          </motion.div>
        </>
      ) : (
        <div
          className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-[36vw] max-w-lg aspect-square items-center justify-center rounded-full opacity-[0.08] ${
            isReversed ? 'left-0' : 'right-0'
          }`}
          style={{ background: service.color }}
        >
          <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto">
        <div className={`flex ${isReversed ? 'md:justify-end' : 'md:justify-start'}`}>
          <FadeInSection>
            <div className="space-y-5 max-w-lg">
              <span className="text-7xl md:text-8xl font-light select-none pointer-events-none leading-none block" style={{ color: `${service.color}15` }}>
                {service.num}
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase block" style={{ color: service.color }}>
                {service.label}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-slate-900 whitespace-pre-line">
                {service.title}
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-slate-500">
                {service.desc}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="w-8 h-px" style={{ backgroundColor: service.color }} />
                <span className="text-sm font-medium" style={{ color: service.color }}>
                  {service.stat}
                </span>
              </div>
              <Link
                to={`/services/${service.path}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

/* ─── TESTIMONIAL ─── */
function TestimonialSection() {
  return (
    <section id="case-studies" className="py-20 md:py-28 px-6 md:px-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto text-center">
        <FadeInSection>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Testimonial</span>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <blockquote className="mt-8 text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
            &ldquo;Open Mind has been an exceptional partner for Apollo Hospitals. Their AI-powered support desk improved our patient response time by 60% while maintaining the human touch our patients deserve.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Placeholder avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ox to-ob flex items-center justify-center text-white font-bold text-sm">
              NL
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-800">Neeraj Lal</p>
              <p className="text-sm text-slate-400">COO, Apollo Hospitals, Gujarat Region</p>
            </div>
          </div>
        </FadeInSection>
        {/* Client logos placeholder */}
        <FadeInSection delay={0.2}>
          <div className="mt-16 flex items-center justify-center gap-8 md:gap-16 flex-wrap opacity-30">
            {['Apollo', 'Cloud Nine', 'Jafron'].map((name) => (
              <div key={name} className="h-8 flex items-center text-sm font-semibold text-slate-300 tracking-widest uppercase">
                {name}
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-16 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <FadeInSection>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Get Started</span>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">
            Ready to Transform Your<br />Customer Experience?
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
            Schedule a live demo with our team and see how Open Mind can help you scale support without compromising quality.
          </p>
        </FadeInSection>
        <FadeInSection delay={0.2}>
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
  )
}

/* ─── FOOTER ─── */
function FooterSection() {
  return (
    <footer className="border-t border-slate-100 py-16 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://raw.githubusercontent.com/inder20216/openmind-assets/main/logo.png" alt="OpenMind Logo" className="h-7 w-auto" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI-powered customer support outsourcing. We help enterprises deliver world-class experiences at scale.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-5">Services</h4>
            <div className="space-y-3">
              {['Inbound Call Center', 'Customer Support', 'Lead Management', 'AI Chatbots', 'IVR Solutions'].map((s) => (
                <a key={s} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-5">Company</h4>
            <div className="space-y-3">
              {['Overview', 'Our Mission', 'Management', 'Careers', 'Blog'].map((s) => (
                <a key={s} href="#" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a href="tel:+919811331600" className="block hover:text-slate-700 transition-colors">+91 9811331600</a>
              <a href="mailto:connect@openmind.in" className="block hover:text-slate-700 transition-colors">connect@openmind.in</a>
              <p className="leading-relaxed">
                B3-943, 9th Floor, Spaze IT-Tech Park<br />
                Sohna Road, Gurgaon
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-300">
          <p>&copy; 2026 Open Mind Services Limited. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Conditions'].map((s) => (
              <a key={s} href="#" className="hover:text-slate-500 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── HOME PAGE ─── */
function HomePage() {
  return (
    <>
      <HeroSection />
      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}
      <TestimonialSection />
      <CTASection />
    </>
  )
}

/* ─── LAYOUT ─── */
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-ox/20">
      <Navbar />
      {children}
      <FooterSection />
      <ChatVoiceWidget />
    </div>
  )
}

/* ─── APP ─── */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/case-studies" element={<Layout><CaseStudiesPage /></Layout>} />
      <Route path="/services" element={<Layout><ExploreServicesPage /></Layout>} />
      <Route path="/services/:slug" element={<Layout><ServiceDetailPage /></Layout>} />
      <Route path="*" element={<Layout><PlaceholderPage eyebrow="404" title="Page Not Found" /></Layout>} />
    </Routes>
  )
}
