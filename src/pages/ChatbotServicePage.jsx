import { useState } from 'react'
import robotMascot from '../assets/chatbot/robot-mascot.png'
import channelIcons from '../assets/chatbot/channel-icons.png'

const heroMessages = [
  { from: 'ai', text: 'Hello! How can I help you today?' },
  { from: 'user', text: 'I need to book an appointment' },
  { from: 'ai', text: 'Sure! I can help with that. What date works best for you?' },
]

const approach = [
  { title: 'Journey-First Design', desc: 'We map customer journeys, intents and edge cases before a single line of code. Every bot is tailored to goals and KPIs.' },
  { title: 'Enterprise Integration', desc: 'Deep integration with CRM, ERP, HIMS, HRMS, knowledge bases and APIs. Real actions, not just answers.' },
  { title: 'Continuous Learning', desc: 'Conversation analytics, feedback loops and RAG updates keep the bot accurate, compliant and improving daily.' },
]

const capabilities = [
  { name: 'Website AI Chatbot', dot: '#FF7A00' },
  { name: 'WhatsApp AI Assistant', dot: '#25D366' },
  { name: 'Customer Support Automation', dot: '#7C3AED' },
  { name: 'Lead Qualification & Capture', dot: '#FF7A00' },
  { name: 'Appointment Booking', dot: '#14B8A6' },
  { name: 'FAQ & Knowledge Assistant', dot: '#7C3AED' },
  { name: 'Product & Service Recommendations', dot: '#3B82F6' },
  { name: 'Order Status & Account Enquiries', dot: '#FF7A00' },
  { name: 'Employee Helpdesk', dot: '#1E293B' },
  { name: 'RAG-based Knowledge Search', dot: '#7C3AED' },
  { name: 'Multilingual Conversations', dot: '#3B82F6' },
  { name: 'Live Agent Handover', dot: '#FF7A00' },
  { name: 'Conversation Analytics', dot: '#0F0F12' },
  { name: 'CRM & API Integration', dot: '#7C3AED' },
]

const steps = [
  { n: '01', t: 'Customer interacts', d: 'Natural language via preferred channel' },
  { n: '02', t: 'AI understands', d: 'Intent + context detection' },
  { n: '03', t: 'Retrieves info', d: 'Knowledge base / CRM / ERP' },
  { n: '04', t: 'Completes tasks', d: 'Answers, workflows, bookings' },
  { n: '05', t: 'Handover if needed', d: 'Live agent with full context' },
]

const channels = ['Websites', 'WhatsApp Business', 'Microsoft Teams', 'Mobile Applications', 'Customer Portals', 'Facebook Messenger', 'Instagram', 'Slack', 'Custom Platforms']

const integrations = ['CRM', 'ERP', 'HIMS', 'HRMS', 'Microsoft Dynamics', 'Salesforce', 'Zoho CRM', 'HubSpot', 'Google Workspace', 'Microsoft 365', 'REST APIs', 'Payment Gateways', 'Ticketing Systems', 'Enterprise DBs']

const industries = [
  { title: 'Healthcare', desc: 'Patient enquiries, appointment booking, reports.', icon: '🏥' },
  { title: 'Retail & E-commerce', desc: 'Product discovery, order tracking, returns.', icon: '🛍️' },
  { title: 'Banking & Financial Services', desc: 'Customer enquiries and self-service.', icon: '🏦' },
  { title: 'Hospitality', desc: 'Reservations and guest support.', icon: '🏨' },
  { title: 'Education', desc: 'Admissions and student services.', icon: '🎓' },
  { title: 'Enterprise', desc: 'HR, IT helpdesk, employee self-service, internal knowledge assistants.', icon: '🏢' },
]

const benefits = [
  '24×7 Customer Support', 'Faster Response Times', 'Reduced Support Costs',
  'Increased Lead Conversion', 'Higher Customer Satisfaction', 'Improved Employee Productivity',
  'Consistent Customer Experience', 'Scalable Digital Engagement', 'Actionable Conversation Insights',
]

const faqs = [
  { q: 'Can the chatbot integrate with our CRM?', a: 'Yes. We integrate with Salesforce, Zoho, HubSpot, Dynamics, custom CRMs via REST APIs. Leads, tickets and conversations sync in real time with full context.' },
  { q: 'Does it support multiple languages?', a: 'Yes. 100+ languages with auto-detection, transliteration and locale-aware responses. Including Hindi, Arabic, Spanish and more.' },
  { q: 'Can it transfer chats to live agents?', a: 'Yes. Seamless handover to live agents with complete conversation history, sentiment, and CRM context. Works with Zendesk, Freshdesk, Intercom and custom helpdesks.' },
  { q: 'Can it access company documents and FAQs?', a: 'Yes, through secure knowledge base integration. RAG pipeline ingests PDFs, Notion, SharePoint, websites and databases with role-based access control.' },
]

export default function ChatbotServicePage() {
  const [faqOpen, setFaqOpen] = useState(null)

  return (
    <div className="relative bg-white text-[#0F0F12] selection:bg-[#FF7A00]/20" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 400, height: 400, left: -80, top: -60, background: '#FF7A00', filter: 'blur(100px)', opacity: 0.1 }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, right: -100, top: -40, background: '#7C3AED', filter: 'blur(120px)', opacity: 0.08 }} />
        <div className="absolute rounded-full" style={{ width: 600, height: 600, left: '30%', bottom: -200, background: '#3B82F6', filter: 'blur(130px)', opacity: 0.06 }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 pt-28 pb-14 md:pt-32 md:pb-20 grid grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="col-span-12 md:col-span-6">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] font-semibold text-[#FF7A00] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" /> AI CHATBOTS
          </div>
          <h1 className="text-[32px] md:text-[44px] font-extrabold leading-[1.05] tracking-tight">Intelligent Conversations. Exceptional Customer Experiences.</h1>
          <p className="mt-5 text-[15px] md:text-[16px] leading-7 text-[#4B5563]">
            Deliver instant, intelligent, and personalized customer interactions with Open Mind's AI Chatbots. Built using advanced Generative AI and enterprise integrations, our chatbots automate customer support, qualify leads, schedule appointments, answer FAQs, and assist employees across websites, WhatsApp, mobile apps, and business platforms—24×7.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="mailto:connect@openmind.in" className="bg-[#0F0F12] text-white rounded-full px-6 py-3 text-[14px] font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:translate-y-[-1px] transition inline-block">Book a Live Demo</a>
            <a href="tel:+919811331600" className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-full px-6 py-3 text-[14px] font-semibold text-[#0F0F12] shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-white transition inline-block">Speak with AI Specialist</a>
          </div>
          <div className="mt-8 p-5 rounded-[16px] bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="text-[13.5px] font-bold mb-1">Why Businesses Need AI Chatbots</div>
            <div className="text-[12.5px] leading-5 text-[#6B7280]">Today's customers expect immediate responses. Long wait times, repetitive questions, and limited support availability lead to poor experiences and lost revenue. AI chatbots provide instant assistance while freeing human agents for complex conversations.</div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="relative bg-white/60 backdrop-blur-2xl rounded-[24px] p-6 md:p-8 border border-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-[#0F0F12] text-white text-[10px] font-bold tracking-widest flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE PREVIEW
            </div>
            <img src={robotMascot} alt="Open Mind Chatbot" className="w-full h-[300px] md:h-[320px] object-contain mx-auto animate-float" />
            <div className="mt-2 grid grid-cols-1 gap-3">
              {heroMessages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.from === 'user' ? (
                    <div className="max-w-[75%] bg-[#0F0F12] text-white rounded-[14px] rounded-br-[4px] px-4 py-2.5 text-[13px]">{m.text}</div>
                  ) : (
                    <div className="max-w-[80%] bg-white/80 backdrop-blur-xl border border-white/70 rounded-[14px] rounded-bl-[4px] px-4 py-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                      <div className="text-[11px] font-bold text-[#7C3AED] mb-0.5 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-[#7C3AED]" /> AI Assistant</div>
                      <div className="text-[13px] leading-5">{m.text}</div>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-gradient-to-br from-[#FF7A00]/10 to-[#7C3AED]/10 backdrop-blur-xl border border-white/70 rounded-[14px] rounded-bl-[4px] px-4 py-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                  <div className="mt-0 flex gap-1.5">
                    <span className="text-[10px] bg-white border rounded-full px-2.5 py-1">Tomorrow</span>
                    <span className="text-[10px] bg-white border rounded-full px-2.5 py-1">This week</span>
                    <span className="text-[10px] bg-[#0F0F12] text-white rounded-full px-2.5 py-1">Custom</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/60 flex items-center gap-3">
              <img src={channelIcons} alt="Deployment channels" className="h-[36px] object-contain opacity-80" />
              <div className="text-[11px] leading-4 text-[#6B7280]">Deploy across Websites, WhatsApp Business, Teams, Mobile Apps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live chatbot demo — real embed */}
      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] max-w-none bg-[#FAFBFF] border-y border-white/60 py-14 md:py-20 z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-[#FF7A00]" />
            </span>
            LIVE CHATBOT DEMO
          </div>
          <h2 className="mt-3 text-[26px] md:text-[32px] font-bold tracking-tight">Try a Real Open Mind Chatbot</h2>
          <p className="mt-2 text-[14px] text-[#6B7280] max-w-[640px] mx-auto">
            This isn't a mockup — it's our actual chatbot product, live from chatbotmarketplace.in. Ask it something.
          </p>
        </div>
        <div className="max-w-[1000px] mx-auto px-6 md:px-8 mt-8 md:mt-10">
          <div className="rounded-[20px] overflow-hidden border border-white/60 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
            <iframe
              src="https://www.chatbotmarketplace.in"
              title="Open Mind Chatbot Marketplace — live demo"
              className="w-full h-[640px] border-0"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-center text-[12px] text-[#9CA3AF]">
            Demo not loading?{' '}
            <a href="https://www.chatbotmarketplace.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#6B7280]">
              Open chatbotmarketplace.in in a new tab
            </a>
          </p>
        </div>
      </section>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 py-14 md:py-20 space-y-20">
        {/* Why businesses need AI chatbots */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[16px] p-8 md:p-10 max-w-[900px] mx-auto text-center shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
          <h3 className="text-[24px] md:text-[28px] font-bold">Why Businesses Need AI Chatbots</h3>
          <p className="mt-4 text-[14px] leading-6 text-[#4B5563] max-w-[700px] mx-auto">
            In an era of instant expectations, 73% of customers abandon after a poor support experience. AI Chatbots deliver 24×7 instant assistance, resolve 70% of queries without human intervention, and ensure consistent brand voice across every channel.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/70 rounded-[12px] border border-white/60 p-4"><div className="text-[22px] font-extrabold text-[#FF7A00]">~3s</div><div className="text-[11px] text-[#6B7280]">Avg response time</div></div>
            <div className="bg-white/70 rounded-[12px] border border-white/60 p-4"><div className="text-[22px] font-extrabold text-[#7C3AED]">70%</div><div className="text-[11px] text-[#6B7280]">Queries auto-resolved</div></div>
            <div className="bg-white/70 rounded-[12px] border border-white/60 p-4"><div className="text-[22px] font-extrabold text-[#3B82F6]">24/7</div><div className="text-[11px] text-[#6B7280]">Always available</div></div>
          </div>
        </div>

        {/* What is an AI chatbot */}
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-6">
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[16px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <div className="text-[12px] tracking-[0.18em] font-semibold text-[#7C3AED]">DEFINITION</div>
              <h3 className="mt-2 text-[26px] font-bold leading-tight">What is an AI Chatbot?</h3>
              <p className="mt-4 text-[14px] leading-7 text-[#4B5563]">
                An AI Chatbot is a conversational assistant powered by Large Language Models (LLMs), Natural Language Processing (NLP), and Retrieval-Augmented Generation (RAG). Unlike rule-based bots, AI Chatbots understand natural language, maintain conversation context, access enterprise knowledge, and provide accurate, human-like responses.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['LLM', 'NLP', 'RAG', 'Context Aware', 'Human-like', 'Enterprise Knowledge'].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full bg-white border border-black/5 text-[11px] font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 relative flex justify-center">
            <div className="absolute w-[320px] h-[320px] bg-gradient-to-br from-[#FF7A00]/15 to-[#7C3AED]/15 rounded-full blur-[30px] -z-10 top-1/2 -translate-y-1/2" />
            <img src={robotMascot} alt="Chatbot head" className="w-[360px] h-[360px] object-contain animate-float drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]" />
          </div>
        </div>

        {/* Approach */}
        <div>
          <h3 className="text-[26px] md:text-[28px] font-bold">The Open Mind Approach</h3>
          <p className="text-[14px] text-[#6B7280] mt-2 max-w-[700px]">Over 20 years of CX expertise meets enterprise AI to build assistants aligned to your journeys, not generic flows.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {approach.map((p) => (
              <div key={p.title} className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[16px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#7C3AED] flex items-center justify-center text-white font-bold text-[14px]">↗</div>
                <div className="mt-4 font-bold text-[15px]">{p.title}</div>
                <div className="mt-2 text-[13px] leading-6 text-[#6B7280]">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Capabilities */}
        <div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h3 className="text-[26px] md:text-[28px] font-bold">Core Capabilities</h3>
            <div className="text-[12px] text-[#6B7280] bg-white/60 border border-white/60 rounded-full px-3 py-1">14 enterprise-grade modules</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {capabilities.map((c) => (
              <div key={c.name} className="group bg-white/65 backdrop-blur-xl border border-white/60 rounded-[12px] p-4 flex items-start gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:bg-white/80 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition">
                <span className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ background: c.dot }} />
                <div className="text-[13px] font-medium leading-5">{c.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div>
          <h3 className="text-[26px] md:text-[28px] font-bold text-center">How It Works</h3>
          <div className="relative mt-12">
            <div className="hidden md:block absolute top-[20px] left-[8%] right-[8%] h-[2px] bg-white/70 border border-white/60 rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {steps.map((s) => (
                <div key={s.n} className="text-center">
                  <div className="mx-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex items-center justify-center font-bold text-[12px]">{s.n}</div>
                  <div className="mt-3 font-semibold text-[13px]">{s.t}</div>
                  <div className="mt-1 text-[11.5px] text-[#6B7280] leading-4">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channels + Integrations */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 bg-white/60 backdrop-blur-xl border border-white/60 rounded-[16px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <div className="font-bold text-[15px]">Deployment Channels</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {channels.map((c) => (
                <span key={c} className="px-3.5 py-2 rounded-full bg-white border border-black/5 text-[12px] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" /> {c}
                </span>
              ))}
            </div>
            <img src={channelIcons} alt="channels" className="mt-5 h-[48px] object-contain opacity-70" />
          </div>
          <div className="col-span-12 md:col-span-6 bg-white/60 backdrop-blur-xl border border-white/60 rounded-[16px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <div className="font-bold text-[15px]">Enterprise Integrations</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {integrations.map((t) => (
                <span key={t} className="px-3.5 py-2 rounded-full bg-white/80 border border-white/60 text-[12px] font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Industry use cases */}
        <div>
          <h3 className="text-[26px] md:text-[28px] font-bold">Industry Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {industries.map((ind) => (
              <div key={ind.title} className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/60 rounded-[16px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                <img src={robotMascot} alt="" className="absolute -right-6 -top-6 w-24 h-24 object-contain opacity-[0.08] rotate-12" />
                <div className="text-[18px]">{ind.icon}</div>
                <div className="mt-2 font-bold text-[14px]">{ind.title}</div>
                <div className="mt-1 text-[12.5px] leading-5 text-[#6B7280]">{ind.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Business benefits */}
        <div>
          <h3 className="text-[26px] md:text-[28px] font-bold">Business Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
            {benefits.map((b) => (
              <div key={b} className="bg-white/65 backdrop-blur-xl border border-white/60 rounded-[12px] px-4 py-3.5 flex items-center gap-3 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                <span className="w-6 h-6 rounded-full bg-[#FF7A00] text-white flex items-center justify-center text-[11px]">✓</span>
                <span className="text-[13px] font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Open Mind + FAQ */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 bg-white/70 backdrop-blur-xl border border-white/60 rounded-[16px] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <div className="text-[12px] tracking-[0.18em] font-semibold text-[#FF7A00]">WHY OPEN MIND</div>
            <h3 className="mt-2 text-[22px] font-bold leading-tight">We don't build generic chatbots.</h3>
            <p className="mt-3 text-[13px] leading-6 text-[#4B5563]">
              We design AI-powered conversational experiences aligned with your business objectives, customer journeys, and operational processes. From strategy and implementation to optimization and analytics, Open Mind is your long-term AI transformation partner.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-[12px] bg-[#0F0F12] text-white p-4"><div className="text-[20px] font-bold">20+</div><div className="text-[11px] text-white/70">Years CX Expertise</div></div>
              <div className="rounded-[12px] bg-white border border-black/5 p-4"><div className="text-[20px] font-bold">98%</div><div className="text-[11px] text-[#6B7280]">Client Retention</div></div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 bg-white/60 backdrop-blur-xl border border-white/60 rounded-[16px] p-2 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b last:border-0 border-black/5">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between text-left px-6 py-4 hover:bg-white/50 transition">
                  <span className="text-[14px] font-semibold">{f.q}</span>
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[12px] transition ${faqOpen === i ? 'bg-[#0F0F12] text-white border-[#0F0F12]' : 'bg-white'}`}>{faqOpen === i ? '−' : '+'}</span>
                </button>
                {faqOpen === i && <div className="px-6 pb-4 text-[13px] leading-6 text-[#4B5563]">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="relative overflow-hidden rounded-[24px] bg-[#0F0F12]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute w-[500px] h-[500px] bg-[#FF7A00] rounded-full blur-[120px] opacity-[0.15] -right-32 -top-32 pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] bg-[#7C3AED] rounded-full blur-[100px] opacity-[0.15] -left-20 -bottom-20 pointer-events-none" />
          <div className="relative">
            <h3 className="text-white text-[26px] md:text-[30px] font-bold leading-tight max-w-[520px]">Empower your customers and employees with intelligent AI conversations that are always available, always learning, and always connected.</h3>
            <p className="mt-3 text-white/60 text-[13px] max-w-[480px]">Deploy in 2 weeks. Enterprise SLA. No-code knowledge updates.</p>
          </div>
          <div className="relative flex flex-col gap-3 shrink-0">
            <a href="mailto:connect@openmind.in" className="bg-white text-black rounded-full px-7 py-3.5 text-[14px] font-semibold hover:bg-white/90 transition text-center">Book a Live Demo</a>
            <a href="tel:+919811331600" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full px-7 py-3.5 text-[14px] font-semibold hover:bg-white/15 transition text-center">Speak with AI Specialist</a>
          </div>
        </div>
        <div className="text-center text-[11px] text-[#9CA3AF] pt-4">© Open Mind Services • AI Chatbots • Enterprise Conversational AI</div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .animate-float{ animation: float 4s ease-in-out infinite }
      `}</style>
    </div>
  )
}
