---
name: run-openmind-app
description: Build, run, and drive openmind-app (the React/Vite rebuild of openmind.in). Use when asked to start openmind-app, build it, run its lint/tests, take a screenshot of its UI, or interact with the running site (nav, chatbot widget, forms, service pages).
---

This is a Vite + React 19 SPA. Drive it by starting the dev server, then
running the Playwright driver at
`.claude/skills/run-openmind-app/driver.mjs` against it — it opens a real
Chromium, clicks/fills the actual DOM, and saves screenshots to
`.claude/skills/run-openmind-app/screenshots/`.

**Verified on Windows + Git Bash** (this repo lives on a Windows machine,
edited via Git Bash / PowerShell — not a Linux container). Commands below
are what actually ran here. If you're on Linux, `npm`/`node`/`npx` steps
should work unmodified; skip the Git-Bash-specific gotcha below.

All paths below are relative to the repo root (`openmind-app/`).

## Prerequisites

Just Node.js (verified with v22.19.0) and npm — no OS packages needed,
this is a plain browser SPA, not a desktop/Electron app.

## Setup

```bash
npm install
```

The driver has its own tiny, separate `package.json` inside the skill
directory (keeps `playwright` out of the actual app's dependencies) —
install it once:

```bash
cd .claude/skills/run-openmind-app
npm install
npx playwright install chromium   # ~300MB download, one-time
cd ../../..
```

## Build

```bash
npm run build
```

Runs `vite build`, then `scripts/prerender.mjs` (prerenders every route to
static HTML) and `scripts/generate-sitemap.mjs`. Takes a few seconds.

## Run (agent path)

1. Start the dev server in the background and note the port it actually
   picks (see Gotchas — it's often not 5173):

```bash
npm run dev > /tmp/openmind-dev.log &
sleep 4 && cat /tmp/openmind-dev.log   # look for "Local: http://localhost:XXXX/"
```

2. Run the driver against that port:

```bash
cd .claude/skills/run-openmind-app
OPENMIND_BASE_URL=http://localhost:XXXX node driver.mjs
```

With no arguments this runs a full smoke pass: loads the homepage, opens
the live chatbot widget, fills its pre-chat form (name/phone/email),
visits `/services` and `/about`, and screenshots each step. Any browser
console/page errors seen during the run are printed at the end.

Screenshots land in `.claude/skills/run-openmind-app/screenshots/` as
`01-home.png`, `02-chat-widget-open.png`, `03-chat-precapture-filled.png`,
`04-services.png`, `05-about.png`.

For ad-hoc single actions instead of the full smoke run:

| command | what it does |
|---|---|
| `node driver.mjs` | full smoke pass (see above) |
| `MSYS_NO_PATHCONV=1 node driver.mjs goto <route> <out.png>` | visit one route, screenshot it |
| `MSYS_NO_PATHCONV=1 node driver.mjs eval <route> "<js>"` | visit a route, run JS in the page, print the result |

Example: `MSYS_NO_PATHCONV=1 node driver.mjs goto /services/custom-crms crm-page.png`

The driver does **not** start/stop the dev server itself — start it once,
then run the driver as many times as you want against the same instance
(fast, no rebuild between runs).

## Run (human path)

```bash
npm run dev     # opens on the next free port from 5173; open it in a browser
```

`Ctrl+C` to stop. `npm run preview` serves the production `dist/` build
the same way, after `npm run build`.

## Test

```bash
npm run lint
```

There's no separate test suite — `npm run build` doubles as the
correctness check (prerendering every route fails loudly on a broken
page) and `npm run lint` (oxlint) catches the rest. Both should be clean
before calling any change done; one pre-existing unused-var warning in
`src/pages/CustomCrmServicePage.jsx:324` is known and not worth chasing.

---

## Gotchas

- **The dev server almost never starts on port 5173 in this environment.**
  Multiple Vite instances tend to already be running (leftover from other
  sessions), so Vite auto-increments — 5174, 5175, 5176... Always read the
  actual `Local: http://localhost:XXXX/` line from its startup output
  rather than assuming 5173; the driver takes the URL via
  `OPENMIND_BASE_URL`, it doesn't guess.
- **Git Bash mangles leading-slash arguments.** Running
  `node driver.mjs goto /services/foo out.png` from Git Bash silently
  rewrites `/services/foo` into a Windows path
  (`C:/Program Files/Git/services/foo`) before Node ever sees it — MSYS's
  automatic POSIX-path-to-Windows-path conversion. Fix: prefix the command
  with `MSYS_NO_PATHCONV=1`. This only affects the `goto`/`eval`
  subcommands (which take a route as a CLI arg); the default smoke run
  hardcodes its routes in the script so it's unaffected.
- **Two different forms share input placeholders.** The homepage's own
  `ContactForm` and the `ChatVoiceWidget`'s pre-chat form both have inputs
  placeholder-texted "Contact number" / "Email address" — an unscoped
  Playwright locator like `page.getByPlaceholder('Contact number')` throws
  a strict-mode "resolved to 2 elements" error. Scope to the right form
  first, e.g. `page.locator('form').filter({ has: page.getByPlaceholder('Your name') })`
  (only the chat widget's form has a name field at all).
- **`/services/ai-chatbots` is slow to reach `networkidle`** (up to ~60s) —
  it embeds a live third-party iframe (chatbotmarketplace.in) that keeps
  making background requests, so Playwright's network-idle wait takes much
  longer there than on any other page. Not a hang, just slow — don't
  assume it's broken if it takes a while.
- **Two expected console errors on every run, not a bug:** `net::ERR_NAME_NOT_RESOLVED`
  fires because `src/components/TrustStats.jsx`'s `STATS_URL` is still the
  literal placeholder `https://YOUR-N8N-DOMAIN/...` (workflow 08 isn't
  live yet — a known, tracked pending item, see the repo's
  `PROJECT-STATUS.md`). Ignore this specific error; treat any *other*
  console error as real.
- **This repo lives inside a OneDrive-synced folder.** `npm run build`
  occasionally throws a transient `EBUSY: resource busy or locked` on
  `dist/sitemap.xml` (OneDrive briefly locking the file mid-sync). Just
  re-run the build — it passes on retry every time this was seen.

## Troubleshooting

- **`locator.fill: Error: strict mode violation: ... resolved to 2 elements`**:
  an unscoped placeholder locator matched both the homepage `ContactForm`
  and the chat widget's pre-chat form. Scope to the containing form (see
  Gotchas above).
- **`page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL`**
  with a mangled `C:/Program Files/Git/...` URL in the error: Git Bash
  path-mangled a leading-slash argument. Re-run with `MSYS_NO_PATHCONV=1`.
- **`EBUSY: resource busy or locked, open '...\dist\sitemap.xml'`** during
  `npm run build`: transient OneDrive file lock. Just re-run
  `npm run build`.
