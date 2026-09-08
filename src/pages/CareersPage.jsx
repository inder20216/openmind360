import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Headset, MessagesSquare, HeartHandshake, MapPin } from 'lucide-react'
import FadeInSection from '../components/FadeInSection'
import SeoHead from '../components/SeoHead'
import work1 from '../assets/careers/work-1.jpg'
import work2 from '../assets/careers/work-2.jpg'
import work3 from '../assets/careers/work-3.jpg'

const heroImages = [work1, work2, work3]

const roles = [
  {
    title: 'Customer Support Executive',
    desc: 'Handle inbound calls with precision and empathy — the first point of contact for our clients\u2019 customers.',
    Icon: Headset,
    color: 'text-ox',
    bg: 'bg-orange-50',
  },
  {
    title: 'Chat Support Executive',
    desc: 'Respond to customer queries across chat and WhatsApp, keeping every conversation fast, clear, and professional.',
    Icon: MessagesSquare,
    color: 'text-ob',
    bg: 'bg-blue-50',
  },
  {
    title: 'Patient Relationship Officer',
    desc: 'Support patients through appointments, follow-ups, and care coordination with clear, caring communication.',
    Icon: HeartHandshake,
    color: 'text-purple-500',
    bg: 'bg-violet-50',
  },
]

const locations = ['Gurugram', 'Ahmedabad']

const CAREERS_FORM_URL = 'https://forms.office.com/r/ANn1SdYadw?embed=true'

export default function CareersPage() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroImages.length), 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <SeoHead
        title="Careers · Join Open Mind | Open Mind"
        description="We are hiring for different roles in Gurugram and Ahmedabad. Join Open Mind Services Limited — valued hard work, fresh ideas, and people who are ready to grow. Apply today."
        canonical="https://www.openmind.in/careers"
      />

      {/* Hero with auto-rotating background slideshow */}
      <section className="relative overflow-hidden pt-24 pb-14 md:pt-32 md:pb-24 px-6 md:px-16">
        <div className="absolute inset-0">
          {heroImages.map((img, i) => (
            <img
              key={img}
              src={img}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                i === slide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/75 to-slate-900/65" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-orange-300">
              Careers
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              Join Open Mind
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow">
              At Open Mind Services Limited, we value hard work, fresh ideas, and people who are ready to
              grow. If you are someone who wants to learn, do well, and be appreciated for what you do, you
              are at the right place.
            </p>
          </motion.div>

          <FadeInSection delay={0.15}>
            <div className="mt-9 inline-flex flex-wrap items-center justify-center gap-3">
              <span className="text-base text-slate-200 font-medium">We are hiring in</span>
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur border border-white/25 text-base font-semibold text-white"
                >
                  <MapPin className="w-4 h-4 text-orange-300" />
                  {loc}
                </span>
              ))}
            </div>
          </FadeInSection>

          <div className="mt-8 flex items-center justify-center gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  slide === i ? 'w-6 bg-orange-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Open Roles</span>
            <h2 className="mt-2 text-2xl md:text-4xl font-bold text-slate-900">
              We are hiring for different roles
            </h2>
            <p className="mt-3 text-slate-500 leading-relaxed max-w-xl">
              Just fill out the form below, and we will get in touch if there is a good match!
            </p>
          </FadeInSection>

          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {roles.map((r, i) => (
              <FadeInSection key={r.title} delay={i * 0.08}>
                <div className="h-full p-6 rounded-2xl bg-white border border-slate-100 shadow-3d hover:shadow-3d-hover transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl ${r.bg} ${r.color} flex items-center justify-center`}>
                    <r.Icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-slate-900">{r.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{r.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Apply Now</span>
            <h2 className="mt-2 text-2xl md:text-4xl font-bold text-slate-900">Fill out the form</h2>
            <p className="mt-3 text-slate-500 leading-relaxed max-w-xl">
              Tell us about yourself through the application form below, and our team will reach out if
              there is a match.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="mt-10 rounded-3xl border border-slate-100 bg-white shadow-3d p-2 md:p-4 overflow-hidden">
              <iframe
                src={CAREERS_FORM_URL}
                title="Open Mind careers application form"
                className="w-full h-[800px] md:h-[900px] border-0"
                allowFullScreen
                frameBorder={0}
                marginWidth={0}
                marginHeight={0}
                loading="lazy"
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Follow up CTA */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">Want to ask us something first?</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto leading-relaxed">
              Send us your questions and resume directly, and we'll get back to you.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`${import.meta.env.BASE_URL}#contact`}
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