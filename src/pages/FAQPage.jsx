import React from 'react'
import JsonLd from '../components/JsonLd'
import SeoHead from '../components/SeoHead'
import { services } from '../data/services'

const companyFaqs = [
  {
    question: 'What services does Open Mind Services Limited provide?',
    answer: 'Open Mind Services Limited provides AI-powered customer experience outsourcing including omnichannel support, generative AI IVR, AI chatbots, intelligent workflow automation, analytics and reporting, and custom CRM development for enterprise clients across healthcare, retail, and other sectors.',
  },
  {
    question: 'How does Open Mind combine human agents with AI automation?',
    answer: 'Open Mind handles routine queries with AI chatbots and IVR while human agents focus on complex conversations. Both work from the same data, so escalations carry full context without the customer repeating themselves.',
  },
  {
    question: 'Which industries does Open Mind serve?',
    answer: 'Open Mind serves healthcare, hospitals, e-commerce, retail, and enterprise clients. Current clients include Apollo Hospitals, Cloud Nine Hospitals, Fortis Hospitals, Rainbow Hospitals, and Walmart-affiliated retail brands.',
  },
  {
    question: 'Does Open Mind provide dedicated or shared support teams?',
    answer: 'Both models are available depending on call volume and requirements. Dedicated teams handle high-volume or specialised operations, while shared pools work for businesses with variable demand.',
  },
  {
    question: 'What CRM platforms does Open Mind integrate with?',
    answer: 'Open Mind integrates with Salesforce, Zoho, HubSpot, Freshdesk, and custom-built CRM systems. The automation layer works alongside your existing tools, not in place of them.',
  },
  {
    question: 'Is Open Mind NASSCOM certified?',
    answer: 'Yes, Open Mind is a NASSCOM member with ISO-certified processes, following industry standards for data security and operational quality.',
  },
  {
    question: 'How do I get started with Open Mind?',
    answer: 'Contact the team at connect@openmind.in or call +91 9811331600 to discuss your requirements. The process starts with a discovery call to understand your goals, users, and timeline before proposing a solution.',
  },
  {
    question: 'Where is Open Mind located?',
    answer: 'Open Mind Services Limited is headquartered in Gurgaon, Haryana, India at B3-943, 9th Floor, Spaze IT-Tech Park, Sohna Road, with delivery capabilities across India.',
  },
]

const allFaqs = [
  ...companyFaqs,
  ...services.flatMap((s) => (s.faqs || []).map((f) => ({ question: f.q, answer: f.a }))),
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function FAQPage() {
  return (
    <>
      <SeoHead
        title="Frequently Asked Questions"
        description="Answers to common questions about Open Mind Services Limited: our AI-powered customer experience services, integrations, certifications, and how to get started."
        canonical="https://www.openmind.in/faq"
      />
      <JsonLd data={faqSchema} />
      <section className="pt-28 pb-20 px-6 md:px-16 max-w-4xl mx-auto">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ox">FAQ</span>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl">
          Answers to common questions about our services, integrations, certifications, and how to get started.
        </p>

        <div className="mt-12 space-y-8">
          {companyFaqs.map((faq) => (
            <div key={faq.question} className="border-b border-slate-100 pb-8">
              <h2 className="text-lg md:text-xl font-semibold text-slate-800">{faq.question}</h2>
              <p className="mt-3 text-slate-500 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Per-service FAQ sections */}
        {services.map((service) => (
          service.faqs?.length > 0 && (
            <div key={service.id} className="mt-16">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">{service.label}</h2>
              <div className="mt-6 space-y-6">
                {service.faqs.map((faq) => (
                  <div key={faq.q} className="border-b border-slate-100 pb-6">
                    <h3 className="text-base md:text-lg font-semibold text-slate-800">{faq.q}</h3>
                    <p className="mt-2 text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </section>
    </>
  )
}
