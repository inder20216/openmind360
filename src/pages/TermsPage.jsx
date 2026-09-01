import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FadeInSection from '../components/FadeInSection'

const sections = [
  {
    title: 'Services Overview',
    body: 'Open Mind Services Limited provides AI-powered automation services including but not limited to voice bots, chatbots, and customer engagement platforms designed to enhance business communication.',
  },
  {
    title: 'User Responsibilities',
    body: 'By using our services, you agree to use them lawfully, refrain from attempting to disrupt our systems, and provide truthful information during service interactions.',
  },
  {
    title: 'Intellectual Property',
    body: 'All content, technology, and branding on our site and services are owned or licensed by Open Mind Services Limited and are protected by applicable copyright, trademark, and intellectual property laws.',
  },
  {
    title: 'Limitations of Liability',
    body: 'We make no guarantees regarding uptime, accuracy, or fitness for a specific purpose. We are not liable for any direct or indirect damages resulting from the use of our services.',
  },
  {
    title: 'Modifications to the Terms',
    body: 'We may update these Terms from time to time. Continued use of our services after such changes constitutes your consent to the revised Terms.',
  },
  {
    title: 'Termination',
    body: 'We reserve the right to suspend or terminate access to our services at our discretion, with or without notice, for any violation of these Terms.',
  },
  {
    title: 'Governing Law',
    body: 'These Terms shall be governed by and interpreted in accordance with the laws of India.',
  },
]

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-16">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-20 bg-gradient-to-br from-ob to-ox pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Terms &amp; Conditions</span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">Terms of Service</h1>
            <p className="mt-5 text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              By accessing and using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((s, i) => (
            <FadeInSection key={s.title} delay={i * 0.05}>
              <h2 className="text-lg md:text-xl font-bold text-slate-900">{s.title}</h2>
              <p className="mt-3 text-sm md:text-base text-slate-500 leading-relaxed">{s.body}</p>
            </FadeInSection>
          ))}

          <FadeInSection delay={sections.length * 0.05}>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900">Privacy</h2>
              <p className="mt-3 text-sm md:text-base text-slate-500 leading-relaxed">
                Your use of our services is also governed by our{' '}
                <Link to="/privacy-policy" className="text-ox hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={(sections.length + 1) * 0.05}>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
              <h2 className="text-lg md:text-xl font-bold text-slate-900">Contact</h2>
              <p className="mt-3 text-sm md:text-base text-slate-500 leading-relaxed">
                Questions about these Terms? Email <a href="mailto:connect@openmind.in" className="text-ox hover:underline">connect@openmind.in</a>
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
