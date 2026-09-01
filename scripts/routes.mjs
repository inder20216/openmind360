// Single source of truth for static routes — used by the sitemap generator
// and (next step) per-page prerendered <title>/meta. Kept as plain data
// (not imported from src/data/services.js) because that file imports image
// assets that only Vite can resolve, not plain Node.
export const routes = [
  {
    path: '/',
    title: 'Open Mind Services Limited · AI-Powered Customer Experience',
    description: 'AI-powered voice bots, intelligent IVR, and automation systems that transform customer experience into revenue growth.',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/about',
    title: 'About Open Mind · Customer Experience Expertise',
    description: "Open Mind's story, values, and delivery locations in Gurgaon, Delhi, and Gujarat — two decades of customer experience work.",
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/case-studies',
    title: 'Case Studies · Real Partners, Real Results | Open Mind',
    description: 'How organizations across healthcare, medtech, retail, and ecommerce actually work with Open Mind.',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/services',
    title: 'Explore Services · Open Mind',
    description: 'Five ways Open Mind handles customer experience, from the first ring to the dashboard leadership actually reads.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/services/omnichannel-support',
    title: 'Omnichannel Support Hub · Open Mind',
    description: "Open Mind's Omnichannel Support Hub keeps every conversation in one place, handled by trained agents who pick up exactly where the last channel left off.",
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/services/generative-ai-ivr',
    title: 'Generative AI IVR · Open Mind',
    description: "Open Mind's Generative AI IVR listens to what's actually being asked, in natural language, and routes the call immediately — no menu trees.",
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/services/ai-chatbots',
    title: 'AI Chatbots · Open Mind',
    description: "Open Mind's AI Chatbots respond instantly on WhatsApp, web, and social, remembering context across the conversation.",
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/services/intelligent-automation',
    title: 'Intelligent Automation · Open Mind',
    description: "Open Mind's Intelligent Automation handles ticket routing, CRM updates, and lead follow-ups, so agents spend their time on conversations, not admin.",
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/services/revenue-impact',
    title: 'Analytics & Reporting · Open Mind',
    description: "Open Mind's Analytics & Reporting turns support activity into dashboards leadership can actually use.",
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy · Open Mind',
    description: 'How Open Mind Services Limited collects, uses, stores, and protects your personal data.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/terms-conditions',
    title: 'Terms & Conditions · Open Mind',
    description: "Open Mind Services Limited's terms of service.",
    changefreq: 'yearly',
    priority: '0.3',
  },
]

export const siteUrl = 'https://www.openmind.in'
