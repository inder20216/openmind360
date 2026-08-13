# Open Mind — Project Status

One reference doc covering both halves of this project: the website rebuild and
the AI marketing agent system. Written so work can continue from a different
machine without needing the full chat history.

---

## Part 1 — Website (openmind-app)

React + Vite rebuild of openmind.in, hosted on GitHub Pages.

- **Live at:** https://inder20216.github.io/openmind360/
- **Repo:** this folder, pushed to `main` on GitHub (`inder20216/openmind360`)
- **Stack:** React 19 + Vite, Tailwind CSS v4, Framer Motion, React Router v7
- **Deployment:** push to `main` → `.github/workflows/deploy.yml` builds and
  publishes via GitHub Pages. Requires Settings → Pages → Source =
  **GitHub Actions** (this setting has reverted on its own before — if the
  site ever goes blank after a push, check that setting first).

### Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build + prerender (scripts/prerender.mjs)
npm run preview  # preview the production build
```

### Structure worth knowing

- `src/data/services.js` — single source of truth for the 5 services
  (Omnichannel Support Hub, Generative AI IVR, AI Chatbots, Intelligent
  Automation, **Analytics & Reporting** — renamed from "Revenue Impact" to
  match its actual dashboarding/reporting content). Each entry drives both
  the homepage service cards and its own `/services/:slug` detail page.
- `src/pages/CaseStudiesPage.jsx` — leads with "Real Partners, Real Results"
  (gradient heading matching the homepage brand gradient), then a row of 4
  large industry icon images (Healthcare, Medtech, Retail, Ecomm — icons in
  `src/assets/{healthcare,medtech,retail,ecomm}.png`) that switch a
  case-study list below. **All 4 tabs are currently empty placeholders** —
  do not add fabricated case studies. Real content only gets added once real
  client names/emails are supplied; only Apollo Hospitals (real quote),
  Cloud Nine Hospitals, and Jafron Biomedical are genuine partners mentioned
  elsewhere on the page.
- `src/components/Navbar.jsx` / `src/App.jsx` — logo now served from the
  local transparent `src/assets/Logo.png`, not a remote URL.
- `public/404.html` + the redirect script in `index.html` — GitHub Pages SPA
  routing workaround (rafgraph pattern), needed because GitHub Pages has no
  native support for client-side routes.

### Known non-issues / things not to "fix" again

- The logo and industry icon PNGs are large (1–1.7MB each) — flagged, not
  yet compressed. Low priority, revisit if load time becomes a real concern.
- `Your-New-Case-Studies-Page-Live-Preview.html` in the repo root is a
  6.7MB static mockup file used as a design reference — intentionally **not**
  committed to git (too large, not part of the actual app).

---

## Part 2 — AI Marketing Agent System

Goal: automate the marketing/research side of running openmind.in using a
small set of narrow, named agents — not one big autonomous system. Every
agent is designed around three Lean rules, applied literally, not as
buzzwords:

- **Poka-Yoke (mistake-proofing):** nothing auto-publishes or auto-replies
  anywhere in the system. Every agent either produces information, or stops
  at an explicit human-approval gate.
- **Kaizen (continuous improvement):** the system is meant to be tuned over
  time — if an agent's output needs the same manual fix repeatedly, that's a
  signal to edit its prompt, not just patch the output each time.
- **5S:** one shared Google Sheet is the single source of truth agents read
  from/write to (Standardize), and irrelevant/broken sources get removed
  rather than accumulating cruft (Sort/Sustain).

### Hosting

Self-hosted n8n via Docker, **not** n8n Cloud — avoids per-execution limits
and monthly fees. Runs on a machine that's on and reachable at all times
(every scheduled trigger requires the n8n engine to literally be running at
that moment — it doesn't "catch up" on missed runs).

### The 6 agents

All workflow JSON files live in `automation/n8n-workflows/` in this repo —
see that folder's own `README.md` for full import/setup detail. Summary:

1. **Research Agent** (daily 8am) — searches Google (Custom Search API,
   site-restricted list, see below) and Reddit (public `search.json`
   endpoint, no auth needed) for BPO/AI-support conversations, filters with
   OpenAI.
2. **Analytics Agent** (weekly Monday 9am) — pulls GA4 traffic data plus any
   manually-added metrics, ranks what actually changed week over week.
3. **Planning Agent** (weekly Monday 10am) — reads Research + Analytics
   output, drafts 3-5 content actions tied to real signals, **stops at a
   human-approval gate** before anything moves further.
4. **Content Agent** (manual trigger) — human enters one approved plan item,
   OpenAI drafts the copy. Never invents stats/clients — uses
   `[INSERT VERIFIED STAT]`-style placeholders instead.
5. **Review Agent** (manual trigger) — Kaizen quality gate: checks a draft
   for unsourced claims, tone, and clarity before a human signs off.
6. **Follow-up Agent** (every 4 hours) — reads a human-maintained list of
   posted links, checks public comments, flags what needs a reply. Never
   drafts or sends a reply itself.

### Why no LinkedIn / no raw Google scraping

Two things were deliberately ruled out, not overlooked:

- **Scraping Google's search results pages directly** — violates Google's
  Terms of Service and gets CAPTCHA-blocked in practice. Using the official
  Custom Search API instead.
- **Automated LinkedIn monitoring** — there's no public, unauthenticated
  search API for other people's posts (unlike Reddit's `search.json`), and
  LinkedIn actively pursues scrapers legally. LinkedIn stays a manual-check
  item, not an automated one.
- **Automated Reddit posting/commenting** — Reddit's Responsible Builder
  Policy (Nov 2025) prohibits this. Research and Follow-up Agents are
  read-only on Reddit; any actual reply is written and posted by a human.

### Google Custom Search setup — current state

- Programmable Search Engine created, "Search the entire web" is **not**
  available on new engines (Google deprecated it) — so this engine is
  restricted to a curated site list instead:
  `reddit.com`, `quora.com`, `g2.com`, `capterra.com`, `trustradius.com`,
  `clutch.co`, `producthunt.com`, `news.ycombinator.com`, `cxtoday.com`,
  `callcentrehelper.com`, `nojitter.com`, `customerthink.com`, `cmswire.com`,
  `destinationcrm.com`, `nasscom.in`, plus `openmind.in` and
  `chatbotmarketplace.in`.
- Search Engine ID (`cx`): `5526352ba8e614408`
- API key created in Google Cloud Console (project: "My First Project" /
  `magnetic-runway-340209`), restricted to the Custom Search API only. The
  actual key value is intentionally not written down here — it's entered
  directly into the Google Search HTTP Request node's credentials in n8n.
- Free tier: 100 queries/day, which comfortably covers 6 daily keywords.

### Not yet done / next steps

- [ ] Finish wiring the Research Agent's remaining nodes in n8n (Reddit
      Search, Merge, OpenAI, output) — Google Search node should already have
      real `key`/`cx` values filled in.
- [ ] Confirm an OpenAI credential exists in this n8n instance (may need to
      be re-created if this is a different instance than earlier testing).
- [ ] Decide and wire up a real output destination (Email/Slack/Sheet) to
      replace the `TODO: connect output` placeholder nodes across all 6
      workflows.
- [ ] Create the shared Google Sheet (tabs: `Research Log`, `Analytics Log`,
      `Posted Content`) that Planning and Follow-up Agents read from.
- [ ] Build out Analytics → Planning → Content → Review → Follow-up agents
      in the n8n UI, same manual node-by-node approach used for Research
      Agent (JSON import is unreliable across n8n versions — build directly
      in the UI, using the `.json` files as a settings/prompt reference).
- [ ] Python was discussed as a possible second runtime alongside n8n for
      anything n8n's nodes can't handle (heavier data processing, custom
      logic, no existing n8n node). Not started — no concrete task has
      needed it yet. Revisit only when one actually comes up.
