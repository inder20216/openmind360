# Open Mind — Project Reference

One doc covering the whole project — the website rebuild and the AI agent
system — written so more than one person can pick this up without re-reading
the entire chat history. If you're new here, read **"Rules that matter"**
first; it's short and everything else assumes you already know it.

---

## Rules that matter (read this first)

1. **Never invent stats, numbers, or claims.** This project has repeatedly
   pulled in AI-generated mockup files (About page, Analytics page, Chatbot
   page, etc.) that looked polished but had fabricated numbers baked in —
   fake revenue figures, fake team sizes, fake client names, even fake real
   company logos (DMart, Reliance Retail) used without permission. Every
   time, the fix was the same: strip anything not independently verified.
   Before adding a stat, a client name, or a certification to the site,
   check the **"Verified facts"** section below — if it's not there, don't
   use it without asking.
2. **Build, then lint, before calling anything done.** `npm run build &&
   npm run lint` — both must pass clean. The build also prerenders every
   route and regenerates the sitemap, so a broken route fails loudly here,
   not in production.
3. **Don't commit `Page content/`, `*-Live-Preview.html`, or `OM Bot Updated
   V.1.txt`.** These are large AI-generated mockup/reference files used as
   design/content source material, not part of the actual app. Never add
   them with `git add -A`.
4. **This site is static (GitHub Pages).** There's no backend of its own.
   Anything needing a server — the contact form, the visitor-stats block,
   the live chatbot — talks to **self-hosted n8n** instead. Never put a
   secret (API key, Teams webhook URL, SMTP password) in the website's own
   code — it ships to every visitor's browser in plain text. Secrets live in
   n8n only.

---

## Part 1 — Website (openmind-app)

React + Vite rebuild of openmind.in, hosted on GitHub Pages.

- **Live at:** https://inder20216.github.io/openmind360/ (temporary — the
  real goal is pointing the actual **openmind.in** domain here; see
  "Pending: domain cutover" below)
- **Repo:** this folder, pushed to `main` on GitHub (`inder20216/openmind360`)
- **Stack:** React 19 + Vite 8, Tailwind CSS v4, Framer Motion, React Router
  v7, `lucide-react` for icons on a couple of bespoke pages
- **Deployment:** push to `main` → `.github/workflows/deploy.yml` builds and
  publishes via GitHub Pages. Requires Settings → Pages → Source =
  **GitHub Actions** (this setting has reverted on its own before — if the
  site ever goes blank after a push, check that setting first).

### Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build + prerender + sitemap generation
npm run lint     # oxlint
npm run preview  # preview the production build
```

### Pages and where their content comes from

| Route | Source | Status |
|---|---|---|
| `/` | `src/App.jsx` (`HomePage`) | Live |
| `/about` | `src/pages/AboutPage.jsx` | Live, built from a real fact-checked pass (see Verified facts) |
| `/case-studies` | `src/pages/CaseStudiesPage.jsx` | Live, but all 4 industry tabs are **empty placeholders** — no fabricated case studies, waiting on real client names |
| `/services` | `src/pages/ExploreServicesPage.jsx` | Live |
| `/services/omnichannel-support` | `src/pages/ServiceDetailPage.jsx` + `src/data/services.js` | Live, generic template |
| `/services/generative-ai-ivr` | same generic template | Live |
| `/services/intelligent-automation` | same generic template | Live |
| `/services/ai-chatbots` | `src/pages/ChatbotServicePage.jsx` | Live, bespoke — built from your `Chatbot-Page.html` file, with the fake scripted chat demo replaced by a real iframe of chatbotmarketplace.in |
| `/services/revenue-impact` | `src/pages/AnalyticsServicePage.jsx` | Live, bespoke — built from `Analytics-Glass-From-File-V2.html`, real 3D coverflow dashboard carousel |
| `/privacy-policy` | `src/pages/PrivacyPolicyPage.jsx` | Live, real legal text pulled from the actual old openmind.in site |
| `/terms-conditions` | `src/pages/TermsPage.jsx` | Live, same source |

`src/data/services.js` is the single source of truth for the 5 core
services (Omnichannel Support Hub, Generative AI IVR, AI Chatbots,
Intelligent Automation, **Analytics & Reporting** — renamed from "Revenue
Impact" to match its actual content). Each entry drives the homepage
service cards, the Explore Services grid, and (for the 3 not listed above
as bespoke) its own detail page.

### SEO / AEO / security (done this session)

- `scripts/routes.mjs` — single source of truth for all routes' titles/
  descriptions, used by both of the below.
- `scripts/generate-sitemap.mjs` — auto-generates `sitemap.xml` at build
  time from that route list. No more manually maintaining it.
- `scripts/prerender.mjs` — now prerenders **every** route into its own
  static HTML file with its own `<title>`/meta/OG tags (previously only `/`
  was prerendered; every other route shared one generic shell).
- `src/components/FaqSchema.jsx` — `FAQPage` JSON-LD on service pages with
  real customer-facing FAQs (skipped on the Analytics page — its FAQ
  content is leftover dev commentary about the mockup, not real Q&A).
- `public/llms.txt` — rewritten to drop fabricated stats, add real facts
  (locations, certifications, real client list), and explicitly tell AI
  crawlers not to trust unverified numbers from third-party mockups.
- `public/logo.png` — stable, unhashed logo path for JSON-LD (was pointing
  at a stale remote GitHub URL before).
- `G-C9EKCGDXZN` — real GA4 Measurement ID, wired into `index.html`.
- All flagged `npm audit` dependency vulnerabilities fixed (0 remaining).

### Known non-issues / things not to "fix" again

- Several images (logo, industry icons, chatbot mascot) are 1–1.7MB each —
  flagged, not yet compressed. Low priority, revisit if load time becomes a
  real concern. `npm run build` also warns about the JS bundle exceeding
  500kB — same story, code-splitting is a nice-to-have, not urgent.
- The three large reference files at the repo root / `Page content/` are
  intentionally **not** committed (see Rule 3 above).
- The homepage hero/CTA copy and each service's homepage-visible
  description were rewritten once (Kimon-style, "we don't do X, we do Y"
  contrast statements) and then **reverted** per feedback — don't redo that
  pass without being asked again. The sub-page copy (`pageIntro`/`blurb`
  fields, Case Studies subhead) still has that rewritten tone; that wasn't
  reverted.

### Pending: domain cutover (openmind.in)

The real goal is replacing the live WordPress site at **openmind.in** with
this one — not staying on the `github.io/openmind360` URL. Two things have
to happen close together, since the temporary demo link breaks the moment
the first one ships:

1. **Code:** `vite.config.js` currently hardcodes `base: '/openmind360/'`
   for builds. This needs to become `/` for a custom domain to work (GitHub
   Pages serves a custom domain at its root, not under a subpath). Also
   needs a `public/CNAME` file with the real domain.
2. **DNS:** point `openmind.in` / `www.openmind.in` at GitHub Pages (A
   records for the apex, CNAME for `www`), and add the custom domain in the
   repo's Pages settings. This is a registrar-side action only you can take.

**Not started yet** — was paused to do a full punch-list audit first (see
below), which turned into most of the rest of this session's work.

### Other pending items (from the full-site audit)

- [x] Dead footer links (Careers/Blog/Management/etc., mismatched service
      names) → fixed, now links to real pages or is dropped if nothing real
      exists yet.
- [x] No Privacy Policy / Terms pages → built from real old-site content.
- [x] No real contact form → built (`ContactForm.jsx`), routes through n8n
      (see Part 2).
- [x] No analytics installed → GA4 wired in.
- [ ] 3 service pages still show a literal "Demo Slot — coming soon"
      section (Omnichannel Support, Generative AI IVR, Intelligent
      Automation — the 3 on the generic template).
- [ ] Case Studies' 4 industry tabs are still empty, waiting on real
      client case study content.
- [ ] `Automations.html` and `Voicebots.html` are sitting in
      `Page content/`, same pattern as the Analytics/Chatbot pages —
      presumably for Intelligent Automation and Generative AI IVR. Not
      started.
- [ ] ~10MB of orphaned unused images in `src/assets` never got cleaned up
      (`AI-image*.png`, `headset*`, `hero.png`, default `react.svg`/
      `vite.svg` boilerplate).
- [ ] Favicon doesn't match the brand (generic abstract shape, not the
      circuit/brain mark used in the navbar logo).

---

## Part 2 — AI Marketing Agent System

Goal: automate the marketing/research/lead-handling side of running
openmind.in using a small set of narrow, named agents — not one big
autonomous system. Every agent follows three Lean rules, applied literally:

- **Poka-Yoke (mistake-proofing):** nothing auto-publishes, auto-replies, or
  auto-books anywhere. Every agent either produces information, stops at a
  human-approval gate, or does a real server-side validation (bot checks,
  booking-window checks) before acting.
- **Kaizen (continuous improvement):** tune the prompts over time — if an
  agent keeps needing the same manual fix, edit the prompt, don't just patch
  the output each time.
- **5S:** a shared Google Sheet is the single source of truth agents read
  from/write to (Standardize); dead sources get removed, not left to rot.

### Hosting

Self-hosted n8n via Docker, **not** n8n Cloud — avoids per-execution limits
and monthly fees. Runs on a machine that's on and reachable at all times
(every scheduled trigger requires n8n to literally be running at that
moment — it doesn't "catch up" on missed runs). **Setup is in progress and
not yet confirmed complete** — see `automation/n8n-workflows/README.md` for
the exact import order and what each workflow needs.

### The 13 workflows

All JSON files live in `automation/n8n-workflows/`, imported in numeric
order — **see that folder's own `README.md` for full setup detail**,
credentials needed, and exactly what's still a `TODO` placeholder in each
one. Quick summary:

**Marketing pipeline (1–6):** Research Agent (daily) → Analytics Agent
(weekly) → Planning Agent (weekly, human-approval gate) → Content Agent
(manual, drafts only) → Review Agent (manual, Kaizen quality gate) →
Follow-up Agent (every 4h, flags only, never auto-replies).

**Website integrations (7–8):** Contact Form Router (webhook, server-side
bot re-validation, emails+Teams-notifies Sales) → Public Visitor Stats
(daily GA4 pull cached in Sheets, served to the homepage trust block).

**Live chatbot "Suhani" (9–12, self-hosted rebuild):** Knowledge Base (tool,
returns only verified facts) → Calendar Booking (tool, re-validates the
booking window server-side) → Send Email (tool, routes to
Sales/IT-Support/HR/Admin) → Agent (the main LangChain conversational
agent). Rebuilt from an existing, already-working bot on the old WordPress
site; kept the same persona, security rules, and escalation logic. **Not
what's actually live right now** — see below.

**What's actually live right now:** the chat widget (`ChatVoiceWidget.jsx`)
is pointed at the **old bot's existing n8n Cloud webhook**, not the
self-hosted rebuild above — chosen as the fastest path to a working
chatbot on the new site. The website still captures phone + email in a
small pre-chat step *before* the conversation opens, but since the old
bot's workflow was never built to expect that data, it wouldn't otherwise
go anywhere — so workflow **13 (Chatbot Pre-Chat Lead Capture)** was added
as a separate webhook the widget calls the instant that form is submitted,
independent of the chat backend, and emails Sales. Known gap: the old
bot's own prompt doesn't know about the pre-chat step, so it may ask the
visitor for phone/email again inside the conversation.

### Why no LinkedIn / no raw Google scraping (Research Agent)

Two things were deliberately ruled out, not overlooked:

- **Scraping Google's search results pages directly** — violates Google's
  Terms of Service and gets CAPTCHA-blocked in practice. Uses the official
  Custom Search API instead, restricted to a curated site list (see below)
  since Google deprecated "search the entire web" for new engines.
- **Automated LinkedIn monitoring** — no public, unauthenticated search API
  for other people's posts (unlike Reddit's `search.json`), and LinkedIn
  actively pursues scrapers legally. Stays a manual-check item.
- **Automated Reddit posting/commenting** — Reddit's Responsible Builder
  Policy (Nov 2025) prohibits this. Research and Follow-up Agents are
  read-only on Reddit; any actual reply is written and posted by a human.

### Google Custom Search — current state

- Programmable Search Engine restricted to a curated site list:
  `reddit.com`, `quora.com`, `g2.com`, `capterra.com`, `trustradius.com`,
  `clutch.co`, `producthunt.com`, `news.ycombinator.com`, `cxtoday.com`,
  `callcentrehelper.com`, `nojitter.com`, `customerthink.com`, `cmswire.com`,
  `destinationcrm.com`, `nasscom.in`, `openmind.in`, `chatbotmarketplace.in`.
- Search Engine ID (`cx`): `5526352ba8e614408`
- API key created in Google Cloud Console (project `magnetic-runway-340209`),
  restricted to the Custom Search API only. Key value isn't written down
  here — enter it directly into n8n's credentials, never into this repo.
- Free tier: 100 queries/day, comfortably covers 6 daily keywords.

### Pending / next steps for the agent system

- [ ] Confirm self-hosted n8n is actually running and reachable.
- [ ] Import workflows 1–6 (marketing pipeline) — only Research Agent's
      Google Search node has real `key`/`cx` values so far.
- [ ] Create the shared Google Sheet (tabs: `Research Log`, `Analytics
      Log`, `Posted Content`, `Public Stats`) that several workflows read
      from/write to.
- [ ] Import workflows 7–8 (contact form + visitor stats) and give n8n a
      **public HTTPS URL** — required for the website to reach them. Then
      paste the real webhook URLs into `ContactForm.jsx` / `TrustStats.jsx`.
- [x] Chatbot is live on openmind.in — but pointed at the **old** n8n Cloud
      bot, not the self-hosted rebuild.
- [ ] Import workflow 13 (chatbot lead capture) and give n8n a public
      HTTPS URL, then paste the real webhook URL into `LEAD_CAPTURE_URL`
      in `ChatVoiceWidget.jsx` — this is what makes the pre-chat
      phone/email actually go somewhere.
- [ ] Decide whether to eventually switch the widget over to the
      self-hosted rebuild (workflows 9–12) — if so: import them in order,
      connect OpenAI / Google Calendar / Gmail credentials, re-point the
      Agent's 3 tool nodes at the real imported workflow IDs, activate it,
      then paste its chat webhook URL into `CHAT_WEBHOOK_URL`.
- [ ] Python was discussed as a possible second runtime alongside n8n for
      anything n8n's nodes can't handle. Not started — revisit only when a
      concrete task actually needs it.

---

## Verified facts (the only ones safe to use without asking)

Use this list before adding anything factual to the site or the chatbot's
knowledge base. If it's not here, treat it as unverified.

- **Company:** Open Mind Services Limited, founded 2003. NASSCOM member,
  ISO certified processes.
- **People:** Founder & CEO — Naveen Gulati. COO & Director — Rakhi Gulati.
- **Locations:** Gurgaon, Delhi, and Gujarat, India.
- **Address:** B3-943, 9th Floor, Spaze IT-Tech Park, Sohna Road, Gurgaon.
- **Contact:** connect@openmind.in, +91 9811331600.
- **Team routing:** Sales — Naveen Gulati, naveen@openmind.in. IT/Support/
  Admin — Ajay, ajay@openmind.in. HR — hr@openmind.in.
- **Real clients:** Apollo Hospitals (real quote from COO Neeraj Lal, Gujarat
  Region), Cloud Nine Hospitals, Jafron Biomedical, PSRI Hospitals, Rainbow
  Hospitals, Fortis Hospitals, Baxter Renal Care, Resmed India, Nimrit
  Bharat / ONDC, Lots Wholesale, Vishal Megamart.
- **Real stats (from the About page fact-check):** CSAT 4.8/5, FCR 89%,
  AHT 2m 14s, cost savings up to 60%.
- **Social:** Facebook (facebook.com/openmindserviceslimited), LinkedIn
  (linkedin.com/company/open-mind-services-limited).

**Explicitly NOT real** (appeared in AI-generated mockup files, rejected):
700+ specialists, 120+ brands, delivery centers in India+Philippines,
2M+ interactions/month, any specific revenue/₹ figures, SOC 2 certification,
DMart/Reliance Retail as clients, "Max" hospital, any figure not listed
above.
