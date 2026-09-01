# Open Mind AI Marketing Agent System — n8n Workflows

Thirteen workflows, imported into n8n in this order. Each is a starting skeleton
with `TODO` nodes marking where you need to plug in a credential, a shared
data source, or a notification channel — nothing here auto-publishes anything.

Every email-sending workflow uses n8n's **Gmail** node (not generic SMTP) —
that needs a Gmail account connected via OAuth2 in n8n's Credentials manager,
not just a username/password.

Workflows 09–11 (the live chatbot) use n8n's **LangChain** node package
(`@n8n/n8n-nodes-langchain.*`). This ships with n8n's default Docker image from
a recent-enough version — if your instance doesn't show an "AI Agent" node
type when searching, it needs enabling (n8n settings → Community/Verified
nodes, or `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` depending on your
version).

## Import order

1. **01-research-agent.json** — daily 8am. Searches Google + Reddit (public,
   read-only) for BPO/AI-support conversations, filters them with OpenAI.
2. **02-analytics-agent.json** — weekly Monday 9am. Pulls GA4 traffic data,
   merges with any manually-added metrics, ranks what actually changed.
3. **03-planning-agent.json** — weekly Monday 10am. Reads Research + Analytics
   output, drafts 3-5 content actions tied to real signals. Ends at a
   **Poka-Yoke gate** — nothing moves to Content Agent until a human approves.
4. **04-content-agent.json** — manual trigger. Human enters one approved plan
   item; OpenAI drafts the copy. Never invents stats/clients — uses
   `[INSERT VERIFIED STAT]`-style placeholders instead.
5. **05-review-agent.json** — manual trigger. The Kaizen quality gate: checks
   a draft for unsourced claims, tone, and clarity before it goes to a human
   for final sign-off.
6. **06-followup-agent.json** — every 4 hours. Reads a human-maintained list
   of posted links, checks public comments, flags what needs a reply. Never
   drafts or sends a reply itself — Reddit and similar platforms prohibit
   automated posting/commenting.
7. **07-contact-form-router.json** — webhook, triggered by the website's
   contact form (name, email, phone, company, a "what are you looking for"
   services checklist, comments). Re-validates the honeypot/timing bot check
   server-side (never trust client-side checks alone — a bot can skip the
   browser and POST straight to the webhook), emails + Teams-notifies Sales,
   and returns a fake-success response to anything flagged as a bot so it
   doesn't learn to adapt. This is the one workflow the public website talks
   to directly, so it needs to be **activated** in n8n and reachable at a
   stable public HTTPS URL — see "Going live" below.
8. **08-public-visitor-stats.json** — two triggers in one workflow: a daily
   schedule that pulls 30-day GA4 visitor/country counts into a shared
   Google Sheet, and a GET webhook the website calls to read that cached
   value (never calls GA4 live on every page load). Powers the homepage's
   "X visitors, Y countries" trust block, which stays hidden until traffic
   is high enough to be worth showing.

### The live chatbot (Suhani) — import 09, 10, then 11

These three replace the placeholder chat widget with a real, generative,
knowledge-base-grounded assistant. There is no calendar/booking tool — if a
visitor wants to schedule something, Suhani takes their details and emails
the right team, same as any other lead. Import them **in this order** — 11
(the agent) calls the other two as tools, so they need to already exist in
n8n first so you can pick them from the workflow-selector dropdown.

9. **09-chatbot-knowledge-base.json** — a tool workflow. Called by the agent
   every time it needs to answer a question about Open Mind. Returns the
   full verified knowledge base as text (services, real clients, contacts,
   page links) — the agent only answers from what this returns, never from
   its own assumptions. Keep this in sync with the real site content. See
   "How the knowledge base actually works" below.
10. **10-chatbot-send-email.json** — a tool workflow. Notifies the right
    internal team (Sales / IT-Support / HR / Admin) by email once the agent
    has all required fields; asks for whatever's missing instead of sending
    an incomplete lead. Uses the Gmail node.
11. **11-chatbot-agent.json** — the main workflow, and the only one of the
    three the public website talks to directly. A LangChain AI Agent
    ("Suhani") with session memory, a Think tool for internal reasoning, and
    the two tools above. Requires a public HTTPS URL — see "Going live"
    below. After importing, open the KB / Send Email tool nodes and
    re-point each `workflowId` at the real imported workflow (the
    `REPLACE_WITH_..._WORKFLOW_ID` placeholders won't resolve on their own).

**How lead capture actually works here:** the website's chat widget asks for
phone, email, **and what they're looking for** (a dropdown — one of the real
service categories, or "Job", or "Other") in a small pre-chat step *before*
the conversation opens (not inside the LLM conversation) — see
`PreCaptureStep` in `src/components/ChatVoiceWidget.jsx`. That info rides
along with every message sent to workflow 11, so Suhani never has to ask
for it again; she asks for the visitor's name conversationally instead,
then uses the pre-captured phone/email automatically when calling the Send
Email tool, unless the visitor gives different details.

**"Other" and "Job" get a fixed, scripted first reply** instead of a
generative one — handled entirely on the frontend, before the chat backend
is even called (see `OTHER_RESPONSE_TEXT` / `JOB_RESPONSE_TEXT` in
`ChatVoiceWidget.jsx`). Everything else sends the visitor's requirement to
the bot as context on the first message, so its reply actually addresses
what they picked instead of a generic greeting.

**But the widget is currently pointed at the old, already-live n8n Cloud
bot** instead of this self-hosted rebuild (see `CHAT_WEBHOOK_URL` in
`ChatVoiceWidget.jsx`), whose own workflow was never built to expect a
`contactNumber`/`email` field — so that data would otherwise go nowhere.
See workflow 13 below for how that's handled regardless of which backend
the chat itself is pointed at.

### How the knowledge base actually works

Workflow 09 is not a search engine or a vector database — it's much simpler
than that. It's one Code node holding a block of plain text (company facts,
all 5 services with real URLs, real client list, contact/escalation
routing, legal links — see the file itself for the exact wording) that gets
returned **in full, every single time** the agent calls it. The agent then
reads that whole block and answers only from what's actually in it — it
never makes something up, and if the visitor asks something the text
doesn't cover, the system prompt tells Suhani to say so and offer to
connect them with the team instead.

This works because the KB is small enough to hand over in full each time —
there's no need for anything fancier (embeddings, semantic search) at this
size. **The one thing that keeps it accurate is keeping it in sync** — if a
service page, a client, or a contact changes on the real site, that same
change needs to be copied into workflow 09's text block, or the bot will
keep repeating the old version.

### Team status reporting — checks the real code, not a checklist

12. **12-project-status-report.json** — schedule trigger, every Monday 9am
    IST. Not called by the website or by any other workflow — this is purely
    for the team. Nobody reports status into anything; it just looks:
    - Fetches a handful of real files from GitHub (`vite.config.js`,
      `ContactForm.jsx`, `CaseStudiesPage.jsx`, etc.) and checks for
      concrete evidence — e.g. is the `YOUR-N8N-DOMAIN` placeholder gone
      from `ContactForm.jsx` yet?
    - Calls n8n's own REST API (`/api/v1/workflows`) to count how many of
      the 13 workflows are actually imported.
    - Requests `https://openmind.in/` and checks whether it's really
      serving this site (looks for our GA4 ID in the response).
    - Emails a plain checklist (✅/⬜ per item) to
      `inder@openmindserviceslimited.in`. That's it — no file gets edited,
      no PR gets opened, nothing to merge or review. Just 5 nodes: schedule
      → check the code → check n8n → build the email → send it.
    Run it manually in n8n any time you want an on-demand check instead of
    waiting for Monday.

### Chatbot lead capture — works no matter which bot is live

13. **13-chatbot-lead-capture.json** — a separate webhook, called directly
    by the widget the instant the pre-chat form is submitted (before "Hi"
    is even sent to whichever chat backend is active). Validates the
    phone/email/requirement server-side, **appends a row to the shared
    leads Google Sheet**, then emails Sales — same "new lead" signal as the
    main contact form, just triggered earlier in the funnel. Needs its own
    public webhook URL — see "Going live" below. This is what actually
    captures the pre-chat data right now, since the old bot currently in
    use for the chat itself was never built to look for it.

## Credentials you'll need to fill in

- **OpenAI** — used by every workflow's `n8n-nodes-base.openAi` nodes. Set up
  once in n8n's Credentials manager, then assign it to each OpenAI node.
- **Google Custom Search** (Research Agent) — replace `YOUR_GOOGLE_API_KEY`
  and `YOUR_CUSTOM_SEARCH_ENGINE_ID` in the Google Search node.
- **Google Analytics (GA4) OAuth2** (Analytics Agent) — replace
  `YOUR_GA4_PROPERTY_ID` and connect a Google OAuth2 credential.
- **Google Sheets OAuth2** (Planning + Follow-up Agents) — replace
  `YOUR_SHARED_SHEET_ID`. One sheet, three tabs: `Research Log`,
  `Analytics Log`, `Posted Content`. This sheet is the single shared source
  of truth between agents (5S — Standardize).
- **Notification channel** (Email/Slack) — every `TODO: connect output` /
  `TODO: notify human` node needs to be replaced with a real
  Email/Gmail/Slack node once you decide which channel to use.
- **Gmail (OAuth2)** (Contact Form Router) — in n8n's Credentials manager,
  add a **Gmail account** credential (OAuth2 — connect the actual Gmail
  inbox that should send these, e.g. `noreply@openmind.in` if that's a real
  Google Workspace mailbox). Assign it to the `TODO: send Sales email`
  node.
- **Sales targets** (Contact Form Router) — inside the "Validate Submission"
  code node, replace the placeholder `sales@openmind.in` address with the
  real one, and `TODO_SALES_TEAMS_WEBHOOK_URL` with a real Microsoft Teams
  **Incoming Webhook** URL for the Sales channel (Teams: channel →
  Connectors → Incoming Webhook). Keep these inside n8n, never in the
  website's own code — a webhook URL exposed in public JS can be found and
  spammed by anyone.
- **Google Analytics (GA4) OAuth2** (Public Visitor Stats) — same
  credential as Analytics Agent; replace `YOUR_GA4_PROPERTY_ID`.
- **Google Sheets OAuth2** (Public Visitor Stats) — replace
  `YOUR_SHARED_SHEET_ID` with the same shared sheet, tab `Public Stats`
  (columns: `activeUsers30d`, `countries30d`, `updatedAt`).
- **Google Sheets OAuth2** (Chatbot Pre-Chat Lead Capture) — connect your
  own leads sheet: replace `TODO_LEAD_SHEET_ID` (the sheet's ID, from its
  URL) and `TODO_SHEET_TAB_NAME` (the exact tab name) on the
  `TODO: append to Leads Sheet` node, and assign a Google Sheets credential.
  The row written is `Timestamp / Phone / Email / Requirement` — rename the
  columns in the node if your sheet uses different headers.
- **Gmail (OAuth2)** (Chatbot Pre-Chat Lead Capture) — same Gmail credential
  as the Contact Form Router, assigned to workflow 13's
  `TODO: notify Sales` node.
- **OpenAI** (Chatbot Agent) — same OpenAI credential as everything else,
  assigned to the "OpenAI Chat Model" node in workflow 11 (model:
  `gpt-4.1-mini`, or whichever model your account has access to).
- **Gmail (OAuth2)** (Chatbot Send Email) — same Gmail credential as the
  Contact Form Router, assigned to workflow 10's `TODO: send email` node.
- **Team contacts** (Chatbot Send Email) — inside the "Map Team & Validate
  Required Fields" code node, confirm/correct the `TEAM_CONTACTS` addresses
  (Sales, IT/Support, Admin, HR).
- **n8n API Key** (Weekly Project Status Report) — n8n Settings → n8n API →
  create an API key, then add an **HTTP Header Auth** credential in n8n
  named `n8n API Key` with header name `X-N8N-API-Key` and that key as the
  value. Assign it to the "Check n8n Workflows" node, and replace
  `YOUR-N8N-DOMAIN` in that node's URL with the real instance URL. This is
  what lets the workflow verify *which workflows are actually imported*
  instead of trusting anyone's word for it.
- **Gmail (OAuth2)** (Weekly Project Status Report) — same Gmail credential
  as the other email-sending workflows, assigned to workflow 12's
  `TODO: send report` node. Change the `sendTo` there if the report should
  go to more than one address.

## Going live: four workflows need a public n8n URL

Workflows 07, 08, 11, and 13 are the only ones the public website calls
directly (the rest are scheduled/manual, or only called internally by
workflow 11 as tools — n8n reaching itself doesn't need a public URL). For
the site to reach them, this n8n instance needs a stable HTTPS URL reachable
from the internet — a reverse proxy with a real domain, or a tunnel
(Cloudflare Tunnel, ngrok, etc.) if it's staying on the Mac. Once that's set
up:

- Activate workflow 07, copy its production webhook URL, paste it into
  `WEBHOOK_URL` in `src/components/ContactForm.jsx`.
- Activate workflow 08, copy its production webhook URL, paste it into
  `STATS_URL` in `src/components/TrustStats.jsx`.
- Activate workflow 11, copy its production **chat** webhook URL (the
  LangChain Chat Trigger's URL ends in `/chat`), paste it into
  `CHAT_WEBHOOK_URL` in `src/components/ChatVoiceWidget.jsx` — **only if
  you switch the chatbot over to this self-hosted version.** As of now the
  widget is pointed at the old n8n Cloud bot instead (see the note above),
  so this step is on hold.
- Activate workflow 13, copy its production webhook URL, paste it into
  `LEAD_CAPTURE_URL` in `src/components/ChatVoiceWidget.jsx`. This one's
  needed regardless of which chat backend is active, since it's what
  actually captures the pre-chat phone/email.

## Why every workflow ends in a TODO or a gate

This is the Poka-Yoke rule for the whole system: no workflow auto-publishes
or auto-replies anywhere. Research and Analytics only produce information.
Planning stops for human approval. Content only drafts. Review only flags
issues for a human to fix. Follow-up only flags what needs a reply — a person
always writes and sends the actual reply, since Reddit and most platforms
prohibit automated posting/commenting.

## Kaizen loop

Once these are live, treat the OpenAI system prompts as the thing you tune
over time — if Research Agent keeps surfacing irrelevant results, or Content
Agent's drafts need the same fix every time, that's feedback: edit the
prompt in the corresponding `.json` file (or directly in n8n, then re-export
here) rather than manually fixing the output each time.
