import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeInSection from '../components/FadeInSection'

const quickStats = [
  { label: 'CSAT', value: '4.8/5' },
  { label: 'FCR', value: '89%' },
  { label: 'AHT', value: '2m 14s' },
  { label: 'Cost savings', value: 'Up to 60%' },
]

const timeline = [
  { year: '2003', title: 'Foundation', desc: 'Started with a focused team building voice support for clients.' },
  { year: '2011', title: 'Expansion', desc: 'Grew delivery capacity and broadened the client base.' },
  { year: '2016', title: 'Digital Pivot', desc: 'Launched omnichannel CX suite — chat, email, social, and automation.' },
  { year: '2024', title: 'Intelligence Layer', desc: 'AI-assisted QA, sentiment, and workforce optimization at scale.' },
]

const pillars = [
  { title: 'People First', desc: 'We hire for empathy, train for excellence. Our culture of continuous learning creates specialists who genuinely care about every customer interaction.' },
  { title: 'Performance Driven', desc: 'SLA is our floor, not ceiling. We obsess over FCR, CSAT, and AHT while balancing human judgment with data-driven decisions.' },
  { title: 'Partnership Mindset', desc: "We operate as an extension of your team — embedded in your tools, your tone, and your growth roadmap from day one." },
]

const visionMission = [
  { k: 'Vision', title: 'A world where every brand interaction feels human.', desc: 'We imagine support not as a department but as a differentiator. Where customers feel heard in seconds, not tickets — and every conversation builds lifetime value.' },
  { k: 'Mission', title: 'Turn customer support into your unfair advantage.', desc: 'We deliver elite people, battle-tested playbooks, and intelligent tooling to make your CX faster, warmer, and measurably more profitable. SLA is baseline, love is the metric.' },
]

const capabilities = [
  { title: 'Customer Support', desc: '24/7 empathetic care across voice, chat, email.' },
  { title: 'Technical Support', desc: 'L1-L3 troubleshooting with rapid resolution.' },
  { title: 'Sales Acceleration', desc: 'Inbound & outbound revenue operations.' },
  { title: 'Lead Generation', desc: 'Qualified pipeline building that converts.' },
  { title: 'Back Office', desc: 'Data, moderation, KYC & operations.' },
  { title: 'Order Management', desc: 'Seamless ecommerce lifecycle support.' },
  { title: 'Customer Success', desc: 'Proactive retention & expansion programs.' },
  { title: 'Quality Assurance', desc: 'AI-assisted monitoring & coaching.' },
  { title: 'Analytics & Insights', desc: 'Voice of customer, sentiment, trends.' },
  { title: 'Chat & Messaging', desc: 'Real-time engagement at scale.' },
  { title: 'Workforce Management', desc: 'Forecasting, scheduling, optimization.' },
  { title: 'Multilingual Coverage', desc: 'A multi-language support model tailored to your customer base.' },
]

const approach = [
  { step: '01', title: 'Discover', desc: 'Deep-dive into your customers, tools, and KPIs.' },
  { step: '02', title: 'Design', desc: 'Craft SOPs, tone guides, and success metrics.' },
  { step: '03', title: 'Deploy', desc: 'Launch pod with trained experts in 14 days.' },
  { step: '04', title: 'Deliver', desc: 'Daily QA, weekly insights, monthly business reviews.' },
  { step: '05', title: 'Drive', desc: 'Continuous optimization and growth initiatives.' },
]

const locations = ['Gurgaon, India', 'Delhi, India', 'Gujarat, India']

const clients = [
  { name: 'PSRI Hospitals', sector: 'Healthcare' },
  { name: 'Rainbow Hospitals', sector: 'Healthcare' },
  { name: 'Cloud Nine Hospitals', sector: 'Healthcare' },
  { name: 'Fortis Hospitals', sector: 'Healthcare' },
  { name: 'Baxter Renal Care', sector: 'Healthcare' },
  { name: 'Resmed India', sector: 'Healthcare' },
  { name: 'Nimrit Bharat / ONDC', sector: 'Retail' },
  { name: 'Lots Wholesale', sector: 'Retail' },
  { name: 'Vishal Megamart', sector: 'Retail' },
]

const values = [
  { title: 'Empathy Over Script', desc: 'Listen first, solve with heart. Every interaction is human.' },
  { title: 'Ownership Mentality', desc: 'We act like founders, not vendors. Your metric is ours.' },
  { title: 'Radical Transparency', desc: 'Real-time dashboards, honest retrospectives, no surprises.' },
  { title: 'Craft & Detail', desc: 'From punctuation to pause — excellence is in the nuance.' },
  { title: 'Growth Together', desc: 'We scale when you scale. Your LTV is our north star.' },
  { title: 'Integrity Always', desc: 'Doing right over being right. Secure, compliant, reliable.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-16">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-20 bg-gradient-to-br from-ob to-ox pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">About Open Mind</span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Building Better{' '}
              <span className="bg-gradient-to-r from-ox via-purple-500 to-ob bg-clip-text text-transparent">
                Customer Experiences
              </span>{' '}
              for More Than Two Decades
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              We started in 2003 with a simple belief — great support isn't a cost center, it's a growth engine. Today, our specialists power CX for brands across healthcare and retail who refuse to compromise on human connection.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap justify-center">
              <a
                href="mailto:connect@openmind.in"
                className="px-7 py-3 bg-ox text-white text-sm font-semibold rounded-full shadow-lg shadow-ox/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Talk To Us
              </a>
              <Link
                to="/services"
                className="px-7 py-3 border border-slate-200 text-slate-500 text-sm font-medium rounded-full hover:border-slate-300 hover:text-slate-700 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="py-12 md:py-16 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {quickStats.map((s, i) => (
            <FadeInSection key={s.label} delay={i * 0.06}>
              <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/60 text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900">{s.value}</div>
                <div className="mt-1 text-xs font-semibold tracking-widest uppercase text-slate-400">{s.label}</div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-16 md:py-24 px-6 md:px-16 bg-slate-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <FadeInSection>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Our Story</span>
              <h2 className="mt-4 text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                From one floor in India to a growing CX partner — built on obsession, not outsourcing.
              </h2>
              <div className="mt-6 space-y-4 text-sm md:text-base leading-relaxed text-slate-500">
                <p>In 2003, customer support was a checkbox. We saw it as leverage. Open Mind Services was founded to prove that empathetic, well-trained people with the right systems could turn every ticket into retention and every conversation into revenue.</p>
                <p>For over two decades, we've partnered with ambitious brands who believe that how you support is how you grow. We've evolved from voice-only to AI-augmented omnichannel, but the principle remains: people, process, performance — in that order.</p>
                <p>Today we power support for brands across healthcare and retail, maintain 4.8+ CSAT, and operate from our delivery centers in Gurgaon, Delhi, and Gujarat.</p>
              </div>
            </FadeInSection>
          </div>
          <div className="md:col-span-5">
            <div className="relative pl-8">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-ox/40 via-purple-500/20 to-transparent" />
              {timeline.map((m, i) => (
                <FadeInSection key={m.year} delay={i * 0.08}>
                  <div className="relative mb-6 last:mb-0">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm grid place-items-center">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-ox to-ob" />
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-100">
                      <div className="text-xs font-bold tracking-widest text-ox">{m.year}</div>
                      <div className="mt-1 text-sm font-semibold text-slate-800">{m.title}</div>
                      <div className="mt-1 text-xs leading-relaxed text-slate-500">{m.desc}</div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Who We Are</span>
            <h2 className="mt-4 text-2xl md:text-4xl font-bold text-slate-900 max-w-xl">Three pillars that make us more than a vendor.</h2>
          </FadeInSection>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {pillars.map((p, i) => (
              <FadeInSection key={p.title} delay={i * 0.08}>
                <div className="p-7 rounded-2xl border border-slate-100 bg-slate-50/60 h-full">
                  <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-slate-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
          {visionMission.map((m, i) => (
            <FadeInSection key={m.k} delay={i * 0.08}>
              <div className="p-8 rounded-2xl border border-slate-100 bg-white h-full">
                <span className="text-xs font-bold tracking-widest text-ox">{m.k.toUpperCase()}</span>
                <h3 className="mt-4 text-xl font-bold text-slate-900 leading-snug">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{m.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section id="capabilities" className="py-16 md:py-24 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">What We Do</span>
            <h2 className="mt-4 text-2xl md:text-4xl font-bold text-slate-900 max-w-xl">Capabilities across the full CX lifecycle.</h2>
          </FadeInSection>
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {capabilities.map((c, i) => (
              <FadeInSection key={c.title} delay={i * 0.04}>
                <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/60 h-full">
                  <div className="text-sm font-semibold text-slate-800">{c.title}</div>
                  <div className="mt-1.5 text-xs leading-relaxed text-slate-500">{c.desc}</div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section id="approach" className="py-16 md:py-24 px-6 md:px-16 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Our Approach</span>
            <h2 className="mt-4 text-2xl md:text-4xl font-bold text-slate-900 max-w-xl">A pipeline built for compounding results.</h2>
          </FadeInSection>
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-5 gap-4">
            {approach.map((a, i) => (
              <FadeInSection key={a.step} delay={i * 0.06}>
                <div className="p-5 rounded-2xl bg-white border border-slate-100 h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-ox">{a.step}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-slate-800">{a.title}</div>
                  <div className="mt-1.5 text-xs leading-relaxed text-slate-500">{a.desc}</div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Work / Clients */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Where We Work</span>
            <h2 className="mt-4 text-2xl md:text-4xl font-bold text-slate-900 max-w-xl">
              Delivery centers in {locations.join(', ')}.
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <p className="mt-8 text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Brands We've Supported</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {clients.map((c) => (
                <span
                  key={c.name}
                  className="px-4 py-2 rounded-full bg-slate-50/60 border border-slate-100 text-sm font-medium text-slate-600"
                >
                  {c.name}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">Logos coming soon.</p>
          </FadeInSection>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="py-16 md:py-24 px-6 md:px-16 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">Core Values</span>
            <h2 className="mt-4 text-2xl md:text-4xl font-bold text-slate-900 max-w-xl">Principles over playbooks.</h2>
          </FadeInSection>
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <FadeInSection key={v.title} delay={i * 0.06}>
                <div className="p-6 rounded-2xl bg-white border border-slate-100 h-full">
                  <h3 className="text-sm font-semibold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{v.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Ready to turn support into your growth engine?</h2>
            <p className="mt-4 text-base md:text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
              Let's talk about how Open Mind can plug into your team and your customers.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.1}>
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
    </>
  )
}
