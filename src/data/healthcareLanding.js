// Content for the four PAN-India hospital landing pages (Healthcare Marketing
// Plan, Oct 2026). Each page targets a different channel so Google/Facebook
// ad copy can match the landing page exactly (one ad group -> one page).
// Client names/stats (Apollo, PSRI, Rainbow) approved for use per CEO sign-off.

export const PATIENT_STEPS = [
  { n: '1', title: 'Answer', detail: 'Every call, WhatsApp, website chat and ad enquiry is answered instantly, day and night.' },
  { n: '2', title: 'Book', detail: 'Appointments are booked, changed or cancelled on the spot, no callback needed.' },
  { n: '3', title: 'Follow up', detail: 'Reminders, missed-appointment calls and health-check follow-ups happen automatically.' },
  { n: '4', title: 'Report', detail: 'You see a live view of enquiries, bookings and revenue recovered.' },
]

export const TRUST = {
  current: ['Apollo Hospitals', 'PSRI Hospital'],
  past: 'Rainbow Hospitals — 1 lakh+ appointments booked every month when we ran their patient desk',
  credentials: 'ISO certified · NASSCOM member · nearly 20 years in customer service',
}

export const healthcareLandingPages = {
  'voice-bots': {
    id: 'voice-bots',
    path: '/healthcare/voice-bots',
    navLabel: 'AI Voice Bots',
    pageTitle: 'AI Voice Bots for Hospitals, PAN India',
    metaDescription: 'An AI voice agent that answers every patient call in seconds, day and night, and books the appointment on the spot. Already live at PSRI Hospital.',
    color: '#2563eb',
    accent: '#06b6d4',
    eyebrow: 'For Hospitals · PAN India',
    heroTitle: 'Never Miss a Patient Call Again',
    heroSub: "Our AI voice agent answers every patient call in seconds, day and night, understands natural speech instead of Press-1 Press-2 menus, and books the appointment on the spot. Already live at PSRI Hospital.",
    problem: "A patient calls your hospital at 9pm asking about a doctor or a test. If no one answers, or no one calls back in time, that patient books at another hospital, and you never find out it happened.",
    solution: "Our AI voice agent picks up in seconds, 24/7. It books, reschedules or cancels the appointment on the call itself, detects an anxious or urgent caller, and hands off to a trained human agent with full context whenever a person is genuinely needed.",
    trialLabel: 'Free 7-day trial on a real hospital phone line',
    features: [
      'Picks up every patient call in under 3 rings, 24/7',
      'Understands Hindi, English and regional languages',
      'Books, reschedules or cancels appointments directly on the call',
      'Detects an anxious or urgent caller and prioritises escalation',
      'Hands off to a human agent with full context, no repeating yourself',
      'Works with your existing hospital phone number and systems',
    ],
    faqs: [
      { q: 'Does the AI voice agent replace our front-desk staff?', a: 'No. It answers every call instantly so no enquiry is missed, and hands off anything that needs a person, with full context, to your team or ours.' },
      { q: 'Is patient data safe?', a: 'Yes. Calls and patient details are handled under our standard data-protection process, the same one used for our current hospital clients, and we can share a written statement on request.' },
      { q: 'How fast can this go live?', a: 'A free 7-day trial can run on a real hospital line within days, no change to your existing phone number required.' },
      { q: 'What languages are supported?', a: 'Hindi, English and other regional languages can be configured. Tell us which ones your patients call in and we will confirm coverage.' },
    ],
  },
  chatbots: {
    id: 'chatbots',
    path: '/healthcare/chatbots',
    navLabel: 'AI Chatbots',
    pageTitle: 'AI Chatbots for Hospitals, PAN India',
    metaDescription: 'Patients already message your hospital on WhatsApp. Our AI chatbot answers instantly, books appointments and sends reminders, 24/7.',
    color: '#7c3aed',
    accent: '#d946ef',
    eyebrow: 'For Hospitals · PAN India',
    heroTitle: 'Every Patient Message Gets an Instant Reply',
    heroSub: 'Patients already message your hospital on WhatsApp and your website. Our AI chatbot answers instantly, books appointments, and sends reports and reminders, 24/7.',
    problem: "A patient messages your hospital on WhatsApp asking for an appointment. If the reply comes hours later, or not at all, that patient has already booked somewhere that replied first.",
    solution: "Our AI chatbot answers on WhatsApp and your website in seconds, books or reschedules appointments inside the chat, and remembers the conversation so patients never repeat themselves. It hands off to a human agent the moment one is needed.",
    trialLabel: 'Free 7-day trial on your hospital WhatsApp number',
    features: [
      'Answers WhatsApp and website enquiries in seconds, any time of day',
      'Books, reschedules and confirms appointments inside the chat',
      'Sends automatic reminders so patients actually show up',
      'Shares reports, directions and doctor availability on request',
      'Hands off to a human agent the moment a patient needs one',
      'Remembers the conversation, so patients never repeat themselves',
    ],
    faqs: [
      { q: 'Does this work on our existing WhatsApp number?', a: 'Yes, it connects to your hospital WhatsApp Business number, so patients message the number they already know.' },
      { q: 'Can it send reports or documents?', a: 'Yes, it can share reports, directions, doctor availability and other documents directly in the chat.' },
      { q: 'What happens when a patient needs a real person?', a: 'The chat hands off to a human agent, carrying the full conversation history, so the patient never has to repeat themselves.' },
      { q: 'How fast can this go live?', a: 'A free 7-day trial can be running on your hospital WhatsApp number within days.' },
    ],
  },
  'human-support': {
    id: 'human-support',
    path: '/healthcare/human-support',
    navLabel: 'Human Patient Desk',
    pageTitle: 'Dedicated Patient Desk for Hospitals, PAN India',
    metaDescription: 'A dedicated, trained team answers every call, WhatsApp and email as your patient desk. We ran this exact desk for Rainbow Hospitals, booking 1 lakh+ appointments a month.',
    color: '#f97316',
    accent: '#ec4899',
    eyebrow: 'For Hospitals · PAN India',
    heroTitle: 'A Dedicated Patient Desk, Run by Trained People',
    heroSub: "When patients need a person, not a bot, our trained agents answer every call, WhatsApp and email as your hospital's own patient desk. We ran this exact desk for Rainbow Hospitals, booking 1 lakh+ appointments a month.",
    problem: "A hospital's own staff is already stretched between patients in the building and patients on the phone. Enquiries queue up, calls go unanswered during peak hours, and follow-ups get missed.",
    solution: "We put a dedicated, trained team on your patient desk, answering every call, WhatsApp and email with your hospital's own processes and service levels, backed by nearly two decades of running patient desks for hospitals like Apollo and Rainbow.",
    trialLabel: 'Free assessment of how many patient enquiries you are losing today',
    features: [
      'Dedicated trained agents who learn your hospital, doctors and processes',
      'Every call, WhatsApp and email answered by a person, not a queue',
      'Appointment booking, rescheduling and confirmation handled end to end',
      'Missed-appointment follow-up calls to recover lost bookings',
      'Escalation and complaint handling with defined service levels',
      'Nearly two decades running patient desks for hospitals like Apollo and Rainbow',
    ],
    faqs: [
      { q: 'Is this a dedicated team or a shared pool of agents?', a: 'Both models are available, depending on your enquiry volume and requirements.' },
      { q: 'How quickly can a patient desk be set up?', a: 'Typical onboarding takes 2 to 4 weeks, depending on the complexity of your processes and systems.' },
      { q: 'What hours is the desk staffed?', a: 'Coverage can run 24/7 or match your peak hours, shift-scheduled around your actual call patterns.' },
      { q: 'Can this work alongside AI voice or chat support?', a: 'Yes, see our hybrid option if you want AI for routine enquiries and people for everything else, working together.' },
    ],
  },
  'hybrid-support': {
    id: 'hybrid-support',
    path: '/healthcare/hybrid-support',
    navLabel: 'Hybrid AI + Human',
    pageTitle: 'Hybrid AI + Human Patient Support, PAN India',
    metaDescription: 'AI handles routine patient enquiries instantly, 24/7. Trained agents handle everything that needs a person. The same hybrid model already running for Apollo Hospitals and PSRI Hospital.',
    color: '#0d9488',
    accent: '#22c55e',
    eyebrow: 'For Hospitals · PAN India',
    heroTitle: 'AI for Speed. People for Judgment.',
    heroSub: 'Most patient enquiries are simple and repetitive, perfect for AI. The rest need a person. Our hybrid model gives you both, working together, so no patient is ever left waiting.',
    problem: "An AI-only line frustrates patients with complex or sensitive needs. A people-only desk cannot keep up at 2am or during a surge. Choosing one over the other always leaves a gap.",
    solution: "AI answers and resolves routine enquiries instantly, any time of day. Anything complex, sensitive or urgent is escalated to a trained human agent, with the full conversation carried over, so nothing is ever repeated and nothing is ever missed.",
    trialLabel: 'Free check of how many patients you are losing today',
    features: [
      'AI answers and resolves routine enquiries instantly, 24/7',
      'Complex, sensitive or urgent cases escalate to a trained human agent',
      'One shared view of every conversation, across AI and human agents',
      'You choose the mix: more AI for scale, more people for high-touch care',
      'Full conversation history carried over on every handoff',
      'The same hybrid model already running for Apollo Hospitals and PSRI Hospital',
    ],
    faqs: [
      { q: 'How is the mix of AI and human agents decided?', a: 'We start with a free check of your current enquiry volume and patterns, then recommend a mix. You can adjust it at any time.' },
      { q: 'Does a patient know if they are talking to AI or a person?', a: 'That is configurable to your preference and policy. The handoff itself is seamless either way, with full context carried over.' },
      { q: 'Can we start AI-only or human-only and add the other later?', a: 'Yes. See our dedicated Voice Bots, Chatbots or Human Patient Desk pages if you want to start with one and expand later.' },
      { q: 'Who are you already running this for?', a: 'This hybrid model is already live for Apollo Hospitals and PSRI Hospital.' },
    ],
  },
}

export const healthcareLandingList = Object.values(healthcareLandingPages)
