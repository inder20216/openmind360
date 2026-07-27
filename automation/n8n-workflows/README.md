# Open Mind AI Marketing Agent System — n8n Workflows

Six workflows, imported into n8n in this order. Each is a starting skeleton with
`TODO` nodes marking where you need to plug in a credential, a shared data
source, or a notification channel — nothing here auto-publishes anything.

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
