import { useRef, useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './components/Navbar'
import ChatVoiceWidget from './components/ChatVoiceWidget'
import ServicesOrbit from './components/ServicesOrbit'
import PlaceholderPage from './pages/PlaceholderPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CareersPage from './pages/CareersPage'
import ExploreServicesPage from './pages/ExploreServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import AboutPage from './pages/AboutPage'
import AnalyticsServicePage from './pages/AnalyticsServicePage'
import ChatbotServicePage from './pages/ChatbotServicePage'
import OmnichannelServicePage from './pages/OmnichannelServicePage'
import GenerativeAiIvrPage from './pages/GenerativeAiIvrPage'
import CustomCrmServicePage from './pages/CustomCrmServicePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'
import FAQPage from './pages/FAQPage'
import JsonLd from './components/JsonLd'
import SeoHead from './components/SeoHead'
import FadeInSection from './components/FadeInSection'
import ContactForm from './components/ContactForm'
import TrustStats from './components/TrustStats'
import { services } from './data/services'
import { TESTIMONIALS } from './data/testimonials'
import logo from './assets/Logo.png'
import apolloLogo from './assets/apollo_logo-removebg-preview.png'
import cloudNineLogo from './assets/cloude_nine_logo-removebg-preview.png'
import fortisLogo from './assets/fortis_logo-removebg-preview.png'
import resmedLogo from './assets/resmed_logo-removebg-preview.png'
import vishalLogo from './assets/vishial_maga_mart_logo-removebg-preview.png'
import bhartiLogo from './assets/bharti_retail_logo-removebg-preview.png'
import rainbowLogo from './assets/rainbow_hospitals_logo-removebg-preview.png'
import vytalsLogo from './assets/vytals_logo-removebg-preview.png'
import walmartLogo from './assets/walmart_logo-removebg-preview.png'
import nimritLogo from './assets/nimrit_bharat_logo-removebg-preview.png'

/* ─── HERO ─── */
function HeroSection() {
  const heroRef = useRef(null)

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-24 pb-10 md:pt-28 md:pb-12">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.4]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Glow behind the ecosystem illustration */}
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[30rem] max-h-[30rem] bg-gradient-to-br from-ox/15 via-ob/10 to-transparent rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16">
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
            className="mt-6 text-lg md:text-xl font-semibold text-slate-700"
          >
            <span className="text-ox">Traditional Contact Centers</span> •{' '}
            <span className="text-ob">AI Automation</span> •{' '}
            <span className="text-purple-600">Hybrid Customer Support</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 text-base md:text-lg text-slate-500 max-w-xl leading-relaxed"
          >
            Whether you're looking to outsource your entire customer support operation, streamline workflows with intelligent AI-driven automation, or{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-ox to-ob">build a tailored hybrid model that blends both</span>,
            {' '}Open Mind has the expertise, technology, and people to help you deliver seamless, exceptional customer experiences at every stage of the journey.
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
            className="md:hidden relative w-full aspect-video rounded-2xl object-cover mb-10 shadow-lg"
          />
          {/* Desktop: covers the whole section, fading out on the text side */}
          <motion.img
            src={service.image}
            alt=""
            aria-hidden="true"
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

      <div className="relative z-10 max-w-7xl mx-auto">
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

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
}

/* ─── TESTIMONIAL ─── */
function TestimonialCard({ t, open, onToggle }) {
  const [needsBtn, setNeedsBtn] = useState(false)
  const [vid, setVid] = useState(0)
  const bodyRef = useRef(null)

  useEffect(() => {
    setNeedsBtn(false)
    const el = bodyRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      if (el.scrollHeight > el.clientHeight + 8) {
        setNeedsBtn(true)
        ro.disconnect()
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [t])

  return (
    <motion.div
      key={t.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="grid md:grid-cols-[320px_1fr] w-full rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50 overflow-hidden"
    >
      {/* Photo — left */}
      <div className="flex flex-col items-center justify-center gap-4 p-8 md:p-10 md:border-r border-slate-100 bg-slate-50/50">
        <div className="relative w-44 h-52 md:w-52 md:h-60 rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-lg shadow-slate-300/40 shrink-0">
          {t.image ? (
            <img
              src={t.image}
              alt={t.name}
              className={`absolute inset-0 w-full h-full ${t.videos ? 'object-contain p-6' : 'object-cover object-top saturate-105 contrast-105'}`}
              loading={t === TESTIMONIALS[0] ? 'eager' : 'lazy'}
            />
          ) : t.captionQuote ? (
            <div className="absolute inset-0 w-full h-full flex flex-col justify-center p-5 bg-gradient-to-br from-ox/5 via-white to-ob/5">
              <span className="text-3xl leading-none text-ox/60 select-none" aria-hidden>&ldquo;</span>
              <p className="mt-1.5 text-[13px] leading-snug text-slate-700 font-medium">{t.captionQuote}</p>
            </div>
          ) : (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-ox/10 via-purple-100 to-ob/10">
              <span className="text-5xl font-bold text-ox/70">{initials(t.name)}</span>
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="font-bold text-lg leading-tight text-slate-900">{t.name}</p>
          <p className="text-slate-500 text-sm mt-1 leading-snug max-w-[240px]">{t.role}</p>
        </div>
      </div>

      {/* Quote / Video — right */}
      <div className="relative p-6 md:p-8 lg:p-10 flex flex-col justify-center">
        {t.videos ? (
          <div className="flex flex-col gap-5">
            <video
              key={vid}
              src={t.videos[vid]}
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-video rounded-2xl bg-slate-900 shadow-lg shadow-slate-300/50"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVid(0)}
                className={`h-10 px-5 rounded-full text-[13px] font-semibold transition ${vid === 0
                  ? 'bg-ox text-white shadow-md shadow-ox/30'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-ox hover:text-ox'}`}
              >
                Video 1
              </button>
              <button
                onClick={() => setVid(1)}
                className={`h-10 px-5 rounded-full text-[13px] font-semibold transition ${vid === 1
                  ? 'bg-ox text-white shadow-md shadow-ox/30'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-ox hover:text-ox'}`}
              >
                Video 2
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-6xl leading-none text-ox/90 select-none" aria-hidden>&ldquo;</div>
            <div ref={bodyRef} className={`relative text-[15px] md:text-[16px] leading-[1.75] text-slate-600 transition-[max-height,column-count] duration-700 ease-out ${open ? 'md:columns-2 md:gap-12 md:text-[17px]' : 'overflow-hidden max-h-[220px]'}`}>
              {t.quote.split('\n').filter(Boolean).map((p, i) => (
                <p key={i} className={i > 0 ? 'mt-3 break-inside-avoid' : 'break-inside-avoid'}>{p}</p>
              ))}
              {!open && needsBtn && (
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>
            {needsBtn && (
              <button
                onClick={onToggle}
                className="mt-4 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-ox hover:text-orange-600 transition-colors"
              >
                {open ? 'View Less' : 'View More'}
                <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

/* ─── TESTIMONIAL: Netflix-style coverflow ─── */
function signedDiff(i, active, len) {
  let d = i - active
  if (d > len / 2) d -= len
  if (d < -len / 2) d += len
  return d
}

function SideMiniCard({ t }) {
  return (
    <div className="w-full rounded-2xl md:rounded-3xl border border-slate-100 bg-white p-3.5 md:p-5 shadow-xl shadow-slate-200/60">
      <div className="flex items-center gap-2.5 md:gap-3">
        <div className="w-9 h-9 md:w-11 md:h-11 rounded-full ring-2 ring-white shadow-md overflow-hidden shrink-0 ring-offset-1">
          <img
            src={t.image}
            alt={t.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[12px] md:text-[13px] leading-tight text-slate-900 truncate">{t.name}</p>
          <p className="hidden md:block text-[11px] text-slate-400 truncate leading-snug">{t.role}</p>
        </div>
      </div>
      {t.quote && (
        <div className="mt-2.5 md:mt-3 text-[11px] md:text-[12.5px] text-slate-500 leading-relaxed line-clamp-3">
          &ldquo;{t.quote}&rdquo;
        </div>
      )}
    </div>
  )
}

function CoverCard({ t, diff, isMobile, hovered, open, innerRef, onHover, onLeave, onClick, onToggle }) {
  const sideX = isMobile ? 150 : 500
  const sideW = isMobile ? 120 : 240
  const isSide = diff !== 0
  const dir = diff === -1 ? -1 : 1

  const pos = !isSide
    ? { x: 0, y: '-54%', scale: 1, opacity: 1, rotateY: 0, zIndex: 30 }
    : hovered
      ? { x: dir * sideX * 0.8, y: '-50%', scale: 0.96, opacity: 1, rotateY: dir * 5, zIndex: 40 }
      : { x: dir * sideX, y: '-50%', scale: 0.85, opacity: 0.65, rotateY: dir * 14, zIndex: 10 }

  const w = !isSide ? (isMobile ? '100%' : open ? 1160 : 720) : sideW
  const ml = !isSide ? (isMobile ? '-50%' : open ? -580 : -360) : -sideW / 2

  return (
    <motion.div
      initial={false}
      animate={{ x: pos.x, y: pos.y, rotateY: pos.rotateY, scale: pos.scale, opacity: pos.opacity, zIndex: pos.zIndex }}
      transition={{ type: 'spring', stiffness: 130, damping: 22, mass: 1 }}
      onHoverStart={isSide ? onHover : undefined}
      onHoverEnd={isSide ? onLeave : undefined}
      onClick={isSide ? onClick : undefined}
      className={`absolute left-1/2 top-1/2 transition-[width,margin-left] duration-700 ease-out ${isSide ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ width: w, marginLeft: ml, transformStyle: 'preserve-3d' }}
    >
      {isSide ? (
        <SideMiniCard t={t} />
      ) : (
        <div ref={innerRef} className="relative">
          <div
            className="absolute -inset-5 md:-inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-ox/20 via-purple-500/10 to-ob/20 blur-2xl"
            aria-hidden
          />
          <TestimonialCard t={t} open={open} onToggle={onToggle} />
        </div>
      )}
    </motion.div>
  )
}

function TestimonialSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hi, setHi] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [cardH, setCardH] = useState(520)
  const [open, setOpen] = useState(false)
  const centerRef = useRef(null)

  useEffect(() => {
    setOpen(false)
  }, [active])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const el = centerRef.current
    if (!el) return
    const setH = () => setCardH(el.offsetHeight + 8)
    setH()
    const ro = new ResizeObserver(setH)
    ro.observe(el)
    return () => ro.disconnect()
  }, [active])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 8000)
    return () => clearInterval(id)
  }, [paused])

  const go = (i) => setActive((i + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <section id="testimonials" className="py-20 md:py-28 px-6 md:px-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <FadeInSection>
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Testimonial</span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              What Our Clients Say
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div
            className="relative mt-12 w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative w-full" style={{ height: cardH, minHeight: isMobile ? 420 : 480, perspective: '1800px' }}>
              {TESTIMONIALS.map((t, i) => {
                const diff = signedDiff(i, active, TESTIMONIALS.length)
                if (Math.abs(diff) > 1) return null
                const side = diff === 0 ? null : diff === -1 ? 'left' : 'right'
                return (
                  <CoverCard
                    key={t.name}
                    t={t}
                    diff={diff}
                    isMobile={isMobile}
                    hovered={side !== null && hi === side}
                    innerRef={centerRef}
                    open={open}
                    onHover={() => side && setHi(side)}
                    onLeave={() => setHi(null)}
                    onClick={() => diff !== 0 && go(active + diff)}
                    onToggle={() => setOpen(!open)}
                  />
                )
              })}
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={() => go(active - 1)}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center shadow-sm hover:bg-slate-50 hover:text-slate-900 transition"
              >
                ‹
              </button>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => go(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-7 bg-ox' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(active + 1)}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center shadow-sm hover:bg-slate-50 hover:text-slate-900 transition"
              >
                ›
              </button>
            </div>
          </div>
        </FadeInSection>
      </div>

      {/* Client logos marquee — full width */}
      <FadeInSection delay={0.2}>
        <p className="mt-16 text-sm font-semibold tracking-[0.2em] uppercase text-slate-400 text-center">Trusted by leading brands</p>
        <div className="mt-10 -mx-6 md:-mx-16 overflow-hidden w-screen" aria-label="Client logos">
          <div className="logo-track">
            {(() => {
              const clientLogos = [
                apolloLogo, cloudNineLogo, fortisLogo, resmedLogo, vishalLogo,
                bhartiLogo, rainbowLogo, vytalsLogo, walmartLogo, nimritLogo,
              ]
              const doubled = clientLogos.concat(clientLogos)
              return doubled.map((src, i) => (
                <img
                  key={`logo-${i}`}
                  src={src}
                  alt="Client logo"
                  className={`logo-item shrink-0 ${src === nimritLogo ? 'h-12 md:h-16' : 'h-18 md:h-24'}`}
                />
              ))
            })()}
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <FadeInSection delay={0.1}>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="mt-6 text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
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

        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
          <FadeInSection delay={0.2}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-300 text-center lg:text-left">Or send us a message</p>
            <ContactForm />
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100">
              <p className="font-semibold text-slate-800">Open Mind Services Limited</p>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                B3-943, 9th Floor, Spaze IT-Tech Park,<br />Sohna Road, Gurgaon
              </p>
              <a href="tel:+919811331600" className="mt-3 block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                +91 9811331600
              </a>
              <a
                href="https://www.google.com/maps?q=28.412598,77.0438633"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ox hover:underline"
              >
                Open in Maps →
              </a>
            </div>
            <div className="mt-6 rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50">
              <iframe
                title="Open Mind Services Limited — location"
                src="https://www.google.com/maps?q=28.412598,77.0438633(Open+Mind+Services+Limited)&z=16&output=embed"
                className="w-full h-[320px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeInSection>
        </div>
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
              <img src={logo} alt="OpenMind Logo" className="h-7 w-auto" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI-powered customer support outsourcing. We help enterprises deliver world-class experiences at scale.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-5">Services</h4>
            <div className="space-y-3">
              {services.map((s) => (
                <Link key={s.path} to={`/services/${s.path}`} className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">{s.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-5">Company</h4>
            <div className="space-y-3">
              <Link to="/about" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">About Us</Link>
              <Link to="/case-studies" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">Case Studies</Link>
              <Link to="/careers" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">Careers</Link>
              <a href="https://www.facebook.com/openmindserviceslimited" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">Facebook</a>
              <a href="https://www.linkedin.com/company/open-mind-services-limited" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-400 hover:text-slate-700 transition-colors">LinkedIn</a>
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
            <Link to="/privacy-policy" className="hover:text-slate-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-slate-500 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── HOME PAGE ─── */
function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Open Mind Services Limited',
    url: 'https://www.openmind.in',
    logo: 'https://www.openmind.in/logo.png',
    description: 'AI-powered customer experience outsourcing: omnichannel support, generative AI IVR, AI chatbots, intelligent automation, and analytics and reporting for enterprise clients.',
    email: 'connect@openmind.in',
    telephone: '+91-9811331600',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B3-943, 9th Floor, Spaze IT-Tech Park',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122002',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/company/open-mind-services-limited',
      'https://www.facebook.com/openmindserviceslimited',
    ],
  }

  return (
    <>
      <SeoHead
        title="AI-Powered Customer Experience Solutions"
        description="Open Mind Services Limited provides AI-powered customer experience outsourcing: omnichannel support, generative AI IVR, AI chatbots, intelligent automation, and analytics for enterprise clients in India."
        canonical="https://www.openmind.in/"
      />
      <JsonLd data={organizationSchema} />
      <HeroSection />
      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}
      <TestimonialSection />
      <TrustStats />
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
function ScrollHandler() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    const id = hash.replace('#', '')
    if (id) {
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [hash, pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/case-studies" element={<Layout><CaseStudiesPage /></Layout>} />
        <Route path="/careers" element={<Layout><CareersPage /></Layout>} />
        <Route path="/services" element={<Layout><ExploreServicesPage /></Layout>} />
        <Route path="/services/revenue-impact" element={<Layout><AnalyticsServicePage /></Layout>} />
        <Route path="/services/omnichannel-support" element={<Layout><OmnichannelServicePage /></Layout>} />
        <Route path="/services/generative-ai-ivr" element={<Layout><GenerativeAiIvrPage /></Layout>} />
        <Route path="/services/ai-chatbots" element={<Layout><ChatbotServicePage /></Layout>} />
        <Route path="/services/custom-crms" element={<Layout><CustomCrmServicePage /></Layout>} />
        <Route path="/services/:slug" element={<Layout><ServiceDetailPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicyPage /></Layout>} />
        <Route path="/terms-conditions" element={<Layout><TermsPage /></Layout>} />
        <Route path="/faq" element={<Layout><FAQPage /></Layout>} />
        <Route path="*" element={<Layout><PlaceholderPage eyebrow="404" title="Page Not Found" /></Layout>} />
      </Routes>
    </>
  )
}
