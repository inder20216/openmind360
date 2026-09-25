import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FadeInSection from '../components/FadeInSection'

const sections = [
  {
    title: 'Services Overview',
    body: 'Open Mind Services Limited provides managed customer support, AI-enabled voice and chat solutions, workflow automation, analytics and related customer-experience services. Specific services, deliverables and service levels are governed by the applicable proposal or agreement, not by these website Terms. Descriptions of services on this website are general information only.',
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
    body: 'This section applies to use of the website only. It does not apply to warranties, service levels or liability under a contracted engagement, which are governed by the relevant customer agreement. This section is under legal review and will be updated to reflect wording appropriate to website use under Indian law.',
  },
  {
    title: 'Modifications to the Terms',
    body: 'We may update these Terms from time to time. Material changes will be reflected in the "Last updated" date above. Continued use of the website after a change takes effect constitutes acceptance of the revised Terms.',
  },
  {
    title: 'Termination',
    body: 'We reserve the right to suspend or terminate access to the website at our discretion, with or without notice, for lawful reasons such as a violation of these Terms. This does not affect rights or obligations under a separate signed customer agreement.',
  },
  {
    title: 'Links to Other Websites',
    body: "Our website may link to third-party websites, including chatbotmarketplace.in and other partner or reference sites. We do not control and are not responsible for the content, policies or practices of any third-party website.",
  },
  {
    title: 'Governing Law',
    body: 'These Terms are governed by the laws of India.',
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
              These Terms govern access to and use of the website operated by Open Mind Services Limited. Demonstrations, trials, and contracted services are governed by their own separate agreements, not these website Terms.
            </p>
            <p className="mt-3 text-xs text-slate-400">Last updated: 25 September 2026</p>
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
                Open Mind Services Limited — B3-943, 9th Floor, Spaze IT-Tech Park, Sohna Road, Gurugram, India.
              </p>
              <p className="mt-2 text-sm md:text-base text-slate-500 leading-relaxed">
                Questions about these Terms? Email <a href="mailto:connect@openmind.in" className="text-ox hover:underline">connect@openmind.in</a>
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
