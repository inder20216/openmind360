import { motion } from 'framer-motion'
import FadeInSection from '../components/FadeInSection'

const sections = [
  {
    title: 'What Information We Collect',
    body: "We collect your name, contact details like email or phone number, and details of your query or complaint. Device or location data is only collected with your consent. We do not collect any sensitive data like Aadhaar, PAN, or bank details.",
  },
  {
    title: 'Why We Collect This Information',
    body: 'Your data is used to assist with your requests, improve our chatbot and voice services, and monitor service quality.',
  },
  {
    title: 'Your Permission (Consent)',
    body: 'We only collect and use your data if you clearly agree to it. You can ask during a chat or email us at connect@openmind.in at any time to withdraw your consent.',
  },
  {
    title: 'How Long We Keep Your Data',
    body: 'Information is retained only as long as necessary to resolve your issue, and is then securely deleted.',
  },
  {
    title: 'Who Can See Your Data',
    body: 'We never sell your data. Your information may only be shared with legal authorities (if required by law) or trusted service partners working under strict privacy agreements.',
  },
  {
    title: 'Keeping Your Data Safe',
    body: 'We use secure technology to protect your information from unauthorized access and misuse.',
  },
  {
    title: 'Your Rights',
    body: 'Under the Digital Personal Data Protection Act, 2023, you can request access to your data, ask for corrections or deletion, withdraw consent, or file a complaint.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-16">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-20 bg-gradient-to-br from-ob to-ox pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">Privacy Policy</span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">How We Handle Your Data</h1>
            <p className="mt-5 text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              We at Open Mind Services Limited value your privacy. This policy outlines how we collect, use, store, and protect your personal data when you interact with our chatbot, voicebot, or customer support services.
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
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
              <h2 className="text-lg md:text-xl font-bold text-slate-900">Data Protection Officer</h2>
              <p className="mt-3 text-sm md:text-base text-slate-500 leading-relaxed">
                Ajay Kumar — <a href="mailto:connect@openmind.in" className="text-ox hover:underline">connect@openmind.in</a> — +91 8800600118
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
