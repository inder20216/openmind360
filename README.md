# Open Mind Services Limited — Website Rebuild

React + Vite rebuild of [openmind.in](https://www.openmind.in), replacing the existing WordPress site.

Live at: https://inder20216.github.io/openmind360/

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion for animation
- Build-time prerendering (`scripts/prerender.mjs`) so crawlers and AI answer engines see real static HTML, not an empty SPA shell

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build + prerender
npm run preview  # preview the production build
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. Requires **Settings → Pages → Build and deployment → Source** to be set to **GitHub Actions**.

## SEO / AEO

`public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt` cover crawler and AI-answer-engine discoverability. `index.html` carries Open Graph, Twitter card, and JSON-LD Organization structured data.

---

## Changelog — All Changes (Day 1 to Date)

### Phase 1: Project Bootstrap & Core Homepage (Jul 12 – Jul 17, 2026)

- **Initial project setup** — React 19 + Vite scaffold, Tailwind CSS v4, Framer Motion
- **GitHub Pages deployment** — GitHub Actions workflow for auto-deploy on push to `main`
- **Hero section** — Redesigned hero with headline, subheading, and CTA
- **Marquee** — Scrolling industry logos/ticker
- **ServicesOrbit** — Interactive 3D services orbit component replacing static hero illustration; hover pause, enlarged on desktop
- **Chat/Voice widget** — Initial chat and voice widget added to homepage
- **Industry icons** — Added industry-specific icons to the homepage
- **Navbar** — Book a Demo button removed, Case Studies nav link added
- **Hero copy** — Updated headline and subheading text

### Phase 2: Sub-Pages & Routing (Jul 17 – Jul 27, 2026)

- **Real sub-page routing** — React Router setup for `/services`, `/case-studies`, service detail pages
- **Service detail pages** — Built out individual pages for each service
- **Case Studies page** — Initial build with industry picker/filter
- **Services page** — Standalone page with service descriptions
- **Logo swap** — Replaced external logo with local transparent PNG
- **Hero layout fix** — Widened left column so copy isn't cramped on large screens
- **Revenue Impact renamed** to Analytics & Reporting
- **n8n workflows** — Added v1 n8n workflow files for the AI marketing agent system

### Phase 3: Full Service Pages & SEO (Aug 13 – Aug 31, 2026)

- **About page** — Company info, team, mission
- **Analytics & Reporting page** — Bespoke service page
- **AI Chatbots page** — Dedicated chatbot service page
- **Services wheel simplified** — Dropped manual play/speed controls, relabeled hub
- **SEO/AEO/security pass** — Added `robots.txt`, `sitemap.xml`, `llms.txt`, Open Graph tags, Twitter cards, JSON-LD structured data, homepage copy tweaks, removed hero marquee

### Phase 4: Contact, Legal & Live Chatbot (Sep 1, 2026)

- **Contact form** — Real working contact form with validation
- **Legal pages** — Privacy Policy and Terms & Conditions pages
- **Trust stats** — Trust/stats section on homepage
- **Live chatbot backend** — Connected to Suhani bot on n8n Cloud
- **Pre-chat lead capture** — Name, requirement dropdown, validation, and confirmation step in chatbot widget
- **Chatbot widget resized** — Taller panel, more compact header
- **Chatbot fixes** — Bot session opens immediately for Job/Other, real lead-capture webhook wired up, no canned replies
- **Weekly status report** — n8n workflow that verifies project changes from evidence and emails a weekly report
- **CAPTCHA** — Math/robot CAPTCHA added to forms

### Phase 5: Navbar & Custom CRM (Sep 2 – Sep 3, 2026)

- **Home nav link** — Added to navbar
- **Services dropdown** — Dropdown menu with responsive sub-links for all services
- **Custom CRM service page** — Full page with problem-vs-differentiator section, animated before/after graphics, KPI and chart graphics, workflow video
- **CRM home section** — Added Custom CRMs to homepage service sections and sitemap

### Phase 6: Automation & Verified Clients (Sep 4, 2026)

- **OMSL Automation Workflow 3D** — 3D interactive automation workflow component
- **Automation service page styling** — Video, logo marquee, and dedicated styling
- **Verified clients confirmed** — Walmart, Bharti Retail, and Vytals confirmed as real verified clients

### Phase 7: AEO/GEO, FAQ & UI Polish (Sep 4, 2026)

- **AEO/GEO optimization** — Answer Engine Optimization and Generative Engine Optimization pass
- **FAQ expansion** — More questions and answers added
- **UI updates** — General interface polish and improvements

### Phase 8: Omnichannel & IVR Pages (Sep 7, 2026)

- **Omnichannel service page** — Redesigned page with OmnichannelImpact and OmnichannelOrbit3D components
- **Generative AI IVR page** — Dedicated page with GenerativeAiIvrCallFlow component
- **Call button fix** — Fixed 404 by using plain anchor to contact section
- **Vulnerability fix** — Fixed flagged security issue, removed stray committed `sitemap.xml`

### Phase 9: Case Studies, Careers & Playwright Skill (Sep 7 – Sep 8, 2026)

- **Case studies redesign** — Rebuilt with real client data, industry picker, expandable cards
- **Careers page** — Full careers page with job listings
- **Intelligent automation workflow** — Added automation workflow component
- **run-openmind-app skill** — Playwright-based skill to build, launch, and drive the site for testing

### Phase 10: Chat + Voice Widget Merge (Sep 8, 2026)

- **Merged chat and voice into one widget** — Single unified ChatVoiceWidget component
- **Real voice agent wired up** — Connected to live voice agent backend
- **AI chatbot live demo** — Expanded to full page embed

### Phase 11: CTA & Navigation Fixes (Sep 8, 2026)

- **Contact-page redirects** — Updated chatbot and analytics CTAs to redirect to contact page
- **Page CTAs updated** — Improved call-to-action buttons across pages
- **CRM stats block removed** — Cleaned up homepage
- **Analytics carousel nav fixed**

### Phase 12: Team, Testimonials & Careers Redesign (Sep 9 – Sep 10, 2026)

- **Team member assets** — Added team member photos and updated App.jsx
- **Testimonials** — Added testimonials data and Testimonials nav link
- **Generative AI IVR hero** — Redesigned hero animation, fixed client-name/testimonial content
- **Careers page redesigned** — Overhauled careers page layout and content
- **"A Word From Our Partners" removed** — Removed partner quote section from Case Studies page

---

## Project Structure

```
src/
├── App.jsx                        # Main app with routing and layout
├── main.jsx                       # Entry point
├── entry-server.jsx               # SSR entry for prerendering
├── index.css                      # Tailwind + global styles
├── assets/                        # Team photos, testimonial videos, service images
├── components/
│   ├── Navbar.jsx                 # Top nav with services dropdown
│   ├── ServicesOrbit.jsx          # 3D interactive services orbit
│   ├── ChatVoiceWidget.jsx        # Unified chat + voice widget
│   ├── ContactForm.jsx            # Working contact form
│   ├── CaseSection.jsx            # Case study cards
│   ├── AutomationWorkflow.jsx     # Automation workflow component
│   ├── GenerativeAiIvrCallFlow.jsx # IVR call flow animation
│   ├── IndustryDemoDeck.jsx       # Industry demo presentation
│   ├── OmnichannelImpact.jsx      # Omnichannel impact stats
│   ├── OmnichannelOrbit3D.jsx     # Omnichannel 3D orbit
│   ├── OmslAutomationWorkflow3D.jsx # 3D automation workflow
│   ├── TrustStats.jsx             # Trust/stats section
│   ├── FadeInSection.jsx          # Scroll-triggered fade-in animation
│   ├── FaqSchema.jsx              # FAQ structured data
│   ├── JsonLd.jsx                 # JSON-LD structured data
│   └── SeoHead.jsx                # SEO meta tags
├── data/
│   ├── caseStudies.js             # Case study content
│   ├── services.js                # Service definitions
│   └── testimonials.js            # Client testimonials
└── pages/
    ├── AboutPage.jsx              # About Open Mind
    ├── AnalyticsServicePage.jsx   # Analytics & Reporting service
    ├── CareersPage.jsx            # Careers / join us
    ├── CaseStudiesPage.jsx        # Case studies with industry filter
    ├── ChatbotServicePage.jsx     # AI Chatbots service
    ├── CustomCrmServicePage.jsx   # Custom CRM service
    ├── ExploreServicesPage.jsx    # All services overview
    ├── FAQPage.jsx                # Frequently asked questions
    ├── GenerativeAiIvrPage.jsx    # Generative AI IVR service
    ├── OmnichannelServicePage.jsx # Omnichannel support service
    ├── PrivacyPolicyPage.jsx      # Privacy policy
    ├── ServiceDetailPage.jsx      # Generic service detail
    └── TermsPage.jsx              # Terms & conditions
```

## Git History (27 merged PRs)

| # | Branch | Summary |
|---|--------|---------|
| 1 | `add-weekly-status-report` | Weekly project status email report (n8n) |
| 2 | `live-chatbot-old-backend` | Connect chat widget to Suhani bot on n8n Cloud |
| 3 | `chatbot-requirement-dropdown` | Requirement dropdown in pre-chat capture |
| 4 | `fix-chatbot-session-handshake` | Fix bot session open + lead-capture webhook |
| 5 | `chatbot-name-field` | Name field in chatbot pre-chat form |
| 6 | `chatbot-widget-sizing` | Widget resize + validation + confirmation step |
| 7 | `navbar-home-and-remove-demo` | Home nav link, remove Get a Demo button |
| 8 | `update-navbar` | Services dropdown, Custom CRM page |
| 9 | `fix-broken-merge-main` | Fix broken build from merge conflicts |
| 11 | `restore-crm-home-section` | Restore CRM home section, 3D automation component |
| 12 | `update-verified-clidents` | Confirm Walmart, Bharti Retail, Vytals |
| 13 | `aeo-geo-and-ui-updates` | AEO/GEO, CAPTCHA, FAQ, UI polish |
| 14 | `omnichannel-and-ivr-pages` | Omnichannel + Generative AI IVR pages |
| 15 | `omnichannel-and-ivr-pages` | Fix Call button 404 |
| 16 | `fix-audit-and-sitemap` | Security fix, remove stray sitemap.xml |
| 17 | `add-run-openmind-app-skill` | Playwright testing skill |
| 18 | `omnichannel-and-ivr-pages` | Case studies, careers, automation workflow |
| 19 | `update-status-careers-case-studies` | Update docs for careers and case studies |
| 20 | `omnichannel-and-ivr-pages` | Case studies page redesign |
| 21 | `merge-chat-voice-widget` | Merge chat + voice into one widget |
| 22 | `omnichannel-and-ivr-pages` | AI chatbot full page embed |
| 23 | `cta-updates-contact-redirects` | Contact-page redirects on CTAs |
| 24 | `page-cta-and-nav-fixes` | Page CTAs, remove CRM stats, fix carousel |
| 25 | `add-team-assets-and-testimonials` | Team photos + testimonials |
| 26 | `generative-ivr-and-testimonials-updates` | IVR hero redesign, testimonial fixes |
| 27 | `careers-page-redesign` | Careers page overhaul, Testimonials nav link |
