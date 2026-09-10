import { Users, Heart, Handshake, TrendingUp, Clock, BookOpen, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
import FadeInSection from '../components/FadeInSection'
import SeoHead from '../components/SeoHead'

const CAREERS_FORM_URL = 'https://forms.office.com/r/ANn1SdYadw?embed=true'

// Design ported from the client-provided reference (Career-Open-Mind.html).
// Life-at-Open-Mind and pillar photos are temporary Unsplash placeholders —
// real team photos to be swapped in later (confirmed with Inder).
const pillars = [
  {
    title: 'Employee Engagement',
    Icon: Users,
    iconBg: 'bg-[#f5f3ff]',
    iconColor: 'text-[#8b5cf6]',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop&q=80',
    desc: 'Regular team check-ins, open-door culture, and a space where your voice actually gets heard. We do more than just work — we build connections through team activities and open dialogue.',
  },
  {
    title: 'Satisfaction & Wellbeing',
    Icon: Heart,
    iconBg: 'bg-[#fff7ed]',
    iconColor: 'text-[#f97316]',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop&q=80',
    desc: 'A respectful, supportive workplace that values your time, not just your output. We believe a happy team is a productive team, and we protect your work-life balance fiercely.',
  },
  {
    title: 'Support That Stays',
    Icon: Handshake,
    iconBg: 'bg-[#f5f3ff]',
    iconColor: 'text-[#8b5cf6]',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    desc: 'Hands-on guidance from your team and manager from day one. You are never left alone to figure things out — we grow together with structured onboarding and continuous mentorship.',
  },
  {
    title: 'Growth, Real Growth',
    Icon: TrendingUp,
    iconBg: 'bg-[#fff7ed]',
    iconColor: 'text-[#f97316]',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80',
    desc: 'Real opportunities to build new skills and take on more as you grow. From internal learning sessions to leadership paths, your career trajectory is in your hands with our support.',
  },
]

const galleryPhotos = [
  { label: 'Team Outing', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop&q=80', tall: true },
  { label: 'Learning Session', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&q=80', tall: false },
  { label: 'Office Culture', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=500&fit=crop&q=80', tall: true },
  { label: 'Collaboration', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80', tall: false },
  { label: 'Strategy Meet', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&q=80', tall: false },
  { label: 'Celebrations', image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&h=600&fit=crop&q=80', tall: true },
]

const benefits = [
  { title: 'Open-door culture', desc: 'Direct access to leadership, always.', Icon: Users },
  { title: 'Flexible hours', desc: 'Respect for your time and rhythm.', Icon: Clock },
  { title: 'Learning budget', desc: 'Courses, books, certifications covered.', Icon: BookOpen },
  { title: 'Health & Wellness', desc: 'Comprehensive care for you and family.', Icon: ShieldCheck },
  { title: 'Team activities', desc: 'Regular outings and bonding moments.', Icon: Zap },
  { title: 'Career growth', desc: 'Clear path from IC to leadership.', Icon: TrendingUp },
]

export default function CareersPage() {
  return (
    <>
      <SeoHead
        title="Careers · Join Open Mind | Open Mind"
        description="We are hiring across Delhi, Gurugram and Ahmedabad. Join Open Mind Services Limited — valued hard work, fresh ideas, and people who are ready to grow. Apply today."
        canonical="https://www.openmind.in/careers"
      />

      {/* HERO */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          <FadeInSection>
            <div className="inline-flex items-center h-7 px-3.5 rounded-full bg-[#f5f3ff] text-[#7c3aed] text-[11px] font-bold tracking-[0.14em] uppercase">
              Careers at Open Mind
            </div>
            <h1 className="mt-5 font-extrabold leading-[0.95] tracking-[-0.03em] text-[38px] md:text-[56px] text-[#1e1b4b]">
              Build Your{' '}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#f97316] bg-clip-text text-transparent">
                Future
              </span>
              , Not Just a Career
            </h1>
            <p className="mt-5 text-[18px] md:text-[20px] leading-[1.6] text-[#6b7280] max-w-[520px]">
              Join a team where your voice gets heard, your time is valued, and your growth is real. From Gurugram to global impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="h-[48px] px-7 rounded-full bg-[#8b5cf6] text-white text-[14px] font-semibold flex items-center gap-2 hover:bg-[#7c3aed] transition shadow-[0_8px_24px_rgba(139,92,246,0.25)]"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#life"
                className="h-[48px] px-7 rounded-full bg-white border border-[#e9d5ff] text-[#1e1b4b] text-[14px] font-semibold flex items-center hover:bg-[#faf5ff] transition"
              >
                Life at Open Mind
              </a>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-[#8b5cf6] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">D</div>
                <div className="w-6 h-6 rounded-full bg-[#f97316] border-2 border-white -ml-1.5 flex items-center justify-center text-[10px] font-bold text-white">G</div>
                <div className="w-6 h-6 rounded-full bg-[#1e1b4b] border-2 border-white -ml-1.5 flex items-center justify-center text-[10px] font-bold text-white">A</div>
              </div>
              <div className="text-[13px] leading-[1.3]">
                <div className="font-semibold text-[#1e1b4b]">Growing across Delhi, Gurugram & Ahmedabad</div>
                <div className="text-[#6b7280]">Hiring every month</div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="relative">
              <div className="relative rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(30,27,75,0.18)] bg-[#f5f3ff] aspect-[1.4/1] md:aspect-[700/500]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop&q=80"
                  alt="Team at Open Mind"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/10 to-transparent" />
              </div>
              <div className="absolute left-2 md:-left-4 top-[16%] md:top-[18%] bg-white rounded-[16px] shadow-[0_12px_32px_rgba(30,27,75,0.12)] border border-[#f3e8ff] px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-2.5 md:gap-3 max-w-[200px]">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-[12px] bg-[#8b5cf6] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] md:text-[14px] font-bold leading-none text-[#1e1b4b] truncate">3 Offices</div>
                  <div className="text-[11px] text-[#6b7280] mt-1">Delhi, Gurugram, Ahmedabad</div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* WHY OPEN MIND */}
      <section id="culture" className="bg-[#faf5ff] border-y border-[#f3e8ff]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <FadeInSection>
            <div className="max-w-[640px] mb-10">
              <div className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#8b5cf6]">Why Open Mind</div>
              <h2 className="mt-3 text-[32px] md:text-[40px] font-bold tracking-[-0.02em] leading-[1.05] text-[#1e1b4b]">
                A culture built for humans, not just headcount.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-[#6b7280]">
                We hired you for your mind. We keep you for how you use it. Four pillars that define everyday work here.
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <FadeInSection key={p.title} delay={i * 0.06}>
                <div className="group bg-white rounded-[20px] border border-[#f3e8ff] overflow-hidden shadow-[0_4px_24px_rgba(30,27,75,0.04)] hover:shadow-[0_16px_48px_rgba(30,27,75,0.10)] hover:-translate-y-2 transition-all duration-300">
                  <div className="h-[200px] overflow-hidden bg-[#f5f3ff]">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-500" loading="lazy" />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-[12px] ${p.iconBg} flex items-center justify-center`}>
                        <p.Icon className={`w-5 h-5 ${p.iconColor}`} />
                      </div>
                      <h3 className="text-[18px] font-bold text-[#1e1b4b]">{p.title}</h3>
                    </div>
                    <p className="mt-4 text-[14px] leading-[1.7] text-[#6b7280]">{p.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* LIFE AT OPEN MIND */}
      <section id="life" className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <FadeInSection>
          <div className="text-center max-w-[640px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.02em] text-[#1e1b4b]">Life at Open Mind</h2>
            <p className="mt-3 text-[16px] text-[#6b7280]">Not just work. Real moments, real people, real growth.</p>
          </div>
        </FadeInSection>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[240px]">
          {galleryPhotos.map((g, i) => (
            <FadeInSection key={g.label} delay={i * 0.05} className={g.tall ? 'row-span-2 sm:row-span-1 lg:row-span-2' : ''}>
              <div className="group relative h-full rounded-[16px] overflow-hidden bg-[#f5f3ff] shadow-[0_4px_24px_rgba(30,27,75,0.06)]">
                <img src={g.image} alt={g.label} className="w-full h-full object-cover group-hover:scale-[1.06] transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/70 via-[#1e1b4b]/0 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-between">
                  <span className="inline-flex h-7 px-3 rounded-full bg-white/95 text-[#1e1b4b] text-[12px] font-semibold items-center backdrop-blur">{g.label}</span>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white border-y border-[#f3e8ff]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <FadeInSection>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
              <h3 className="text-[26px] md:text-[30px] font-bold tracking-[-0.02em] text-[#1e1b4b]">Everything you need to do your best work</h3>
              <p className="text-[14px] text-[#6b7280] max-w-[380px]">Benefits that actually matter — designed around deep work, learning, and wellbeing.</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <FadeInSection key={b.title} delay={i * 0.05}>
                <div className="rounded-[16px] bg-white border border-[#e9d5ff] p-5 flex gap-4 hover:border-[#d8b4fe] hover:shadow-[0_8px_24px_rgba(139,92,246,0.08)] transition h-full">
                  <div className="w-10 h-10 rounded-[12px] bg-[#f5f3ff] flex items-center justify-center shrink-0">
                    <b.Icon className="w-5 h-5 text-[#8b5cf6]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-[#1e1b4b]">{b.title}</div>
                    <div className="text-[13px] text-[#6b7280] mt-1 leading-[1.5]">{b.desc}</div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="bg-[#faf5ff]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <FadeInSection>
            <div className="max-w-[640px]">
              <div className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#8b5cf6]">Apply Now</div>
              <h2 className="mt-3 text-[32px] md:text-[40px] font-bold tracking-[-0.02em] leading-[1.05] text-[#1e1b4b]">Fill out the form</h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-[#6b7280]">
                Tell us about yourself through the application form below, and our team will reach out if there is a match.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="mt-10 rounded-[24px] border border-[#e9d5ff] bg-white shadow-[0_4px_24px_rgba(30,27,75,0.06)] p-2 md:p-4 overflow-hidden">
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

          <FadeInSection delay={0.15}>
            <div className="mt-6 rounded-[16px] bg-white border border-dashed border-[#d8b4fe] px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="text-[14px] text-[#1e1b4b]">
                <span className="font-semibold">Prefer email?</span>{' '}
                <span className="text-[#6b7280]">Send your resume and questions directly.</span>
              </div>
              <a href="mailto:careers@openmind.in" className="text-[13px] font-semibold text-[#8b5cf6] hover:text-[#7c3aed]">
                careers@openmind.in →
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-10 md:py-14">
        <FadeInSection>
          <div className="max-w-[1280px] mx-auto rounded-[24px] bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-[260px] h-[260px] md:w-[360px] md:h-[360px] rounded-full bg-white/10 translate-x-[20%] -translate-y-[20%]" />
            <div className="absolute left-0 bottom-0 w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full bg-[#f97316]/20 -translate-x-[20%] translate-y-[20%]" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-[560px]">
                <h2 className="text-[32px] md:text-[44px] font-bold leading-[1.05] tracking-[-0.02em] text-white">Ready to grow with us?</h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-white/80">
                  Bring your curiosity, your craft, and your kindness. We will bring the space to do your best work — from Gurugram to global.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[13px] text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  No cover letter needed
                </div>
              </div>
              <div className="shrink-0 flex flex-col gap-3">
                <a
                  href="#apply"
                  className="h-[48px] px-7 rounded-full bg-white text-[#6d28d9] text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#faf5ff] transition shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                >
                  Send Your Resume
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="text-center text-[12px] text-white/70">
                  or email <span className="text-white font-medium underline underline-offset-4">careers@openmind.in</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  )
}
