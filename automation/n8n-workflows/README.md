# Open Mind AI Marketing Agent System — n8n Workflows

Thirteen workflows, imported into n8n in this order. Each is a starting skeleton
with `TODO` nodes marking where you need to plug in a credential, a shared
data source, or a notification channel — nothing here auto-publishes anything.

Workflows 09–12 (the live chatbot) use n8n's **LangChain** node package
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

### The live chatbot (Suhani) — import 09, 10, 11, then 12

These four replace the placeholder chat widget with a real, generative,
knowledge-base-grounded assistant. Import them **in this order** — 12 (the
agent) calls the other three as tools, so they need to already exist in n8n
first so you can pick them from the workflow-selector dropdown.

9. **09-chatbot-knowledge-base.json** — a tool workflow. Called by the agent
   every time it needs to answer a question about Open Mind. Returns the
   full verified knowledge base as text (services, real clients, contacts,
   page links) — the agent only answers from what this returns, never from
   its own assumptions. Keep this in sync with the real site content.
10. **10-chatbot-calendar-booking.json** — a tool workflow. Books an
    appointment once the agent has all required details. Re-validates the
    booking window **server-side** (Tue–Fri, 11am–4pm IST, 30-minute slots)
    — never trust the agent alone to have gotten this right.
11. **11-chatbot-send-email.json** — a tool workflow. Notifies the right
    internal team (Sales / IT-Support / HR / Admin) by email once the agent
    has all required fields; asks for whatever's missing instead of sending
    an incomplete lead.
12. **12-chatbot-agent.json** — the main workflow, and the only one of the
    four the public website talks to directly. A LangChain AI Agent
    ("Suhani") with session memory, a Think tool for internal reasoning, and
    the three tools above. Requires a public HTTPS URL — see "Going live"
    below. After importing, open the KB / Calendar / Send Email tool nodes
    and re-point each `workflowId` at the real imported workflow (the
    `REPLACE_WITH_..._WORKFLOW_ID` placeholders won't resolve on their own).

**How lead capture actually works here:** the website's chat widget asks for
phone + email in a small pre-chat step *before* the conversation opens (not
inside the LLM conversation) — see `PreCaptureStep` in
`src/components/ChatVoiceWidget.jsx`. That contact info rides along with
every message sent to workflow 12, so Suhani never has to ask for it again;
she asks for the visitor's name conversationally instead, then uses the
pre-captured phone/email automatically when calling Send Email or Calendar,
unless the visitor gives different details.

### Team status reporting

13. **13-project-status-report.json** — schedule trigger, every Monday 9am
    IST. Not called by the website or by any other workflow — this is purely
    for the team. It fetches `PROJECT-STATUS.md` straight from `main` on
    GitHub, parses its `- [ ]` / `- [x]` checklist items (grouped by
    section), pulls the last 7 days of commits from the GitHub API, and
    emails a plain-language summary to `inder@openmindserviceslimited.in`.
    No fabricated content — it only ever reports what's actually written in
    the doc and the real commit log, so **keeping this useful means keeping
    PROJECT-STATUS.md's checklists current** as items get done. No GitHub
    auth needed (public repo, read-only, well under the unauthenticated rate
    limit for a weekly run) — the only credential this one needs is the same
    SMTP/Gmail one used elsewhere. Run it manually in n8n any time you want
    an on-demand report instead of waiting for Monday.

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
- **SMTP/Gmail** (Contact Form Router) — configure a credential on the
  `TODO: send Sales email` node.
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
- **OpenAI** (Chatbot Agent) — same OpenAI credential as everything else,
  assigned to the "OpenAI Chat Model" node in workflow 12 (model:
  `gpt-4.1-mini`, or whichever model your account has access to).
- **Google Calendar OAuth2** (Chatbot Calendar Booking) — replace
  `YOUR_GOOGLE_CALENDAR_ID` and connect a credential on the
  `TODO: create Google Calendar event` node.
- **SMTP/Gmail** (Chatbot Send Email) — configure a credential on the
  `TODO: send email` node.
- **Team contacts** (Chatbot Send Email) — inside the "Map Team & Validate
  Required Fields" code node, confirm/correct the `TEAM_CONTACTS` addresses
  (Sales, IT/Support, Admin, HR).
- **SMTP/Gmail** (Weekly Project Status Report) — same credential as the
  other email-sending workflows, assigned to workflow 13's
  `TODO: send report` node. Change the `toEmail` there if the report should
  go to more than one address.

## Going live: three workflows need a public n8n URL

Workflows 07, 08, and 12 are the only ones the public website calls directly
(the rest are scheduled/manual, or only called internally by workflow 12 as
tools — n8n reaching itself doesn't need a public URL). For the site to
reach them, this n8n instance needs a stable HTTPS URL reachable from the
internet — a reverse proxy with a real domain, or a tunnel (Cloudflare
Tunnel, ngrok, etc.) if it's staying on the Mac. Once that's set up:

- Activate workflow 07, copy its production webhook URL, paste it into
  `WEBHOOK_URL` in `src/components/ContactForm.jsx`.
- Activate workflow 08, copy its production webhook URL, paste it into
  `STATS_URL` in `src/components/TrustStats.jsx`.
- Activate workflow 12, copy its production **chat** webhook URL (the
  LangChain Chat Trigger's URL ends in `/chat`), paste it into
  `CHAT_WEBHOOK_URL` in `src/components/ChatVoiceWidget.jsx`.

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
