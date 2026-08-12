# SERP keyword map - 2026-08-12

## Scope

Research combined 16 Google Trends requests and 12 live Google SERP requests through SerpApi. The goal was to map one search intent to one existing page, not to create more near-duplicate pages.

## Priority map

| Priority | Market | Primary query | Target page | Intent | Action |
| --- | --- | --- | --- | --- | --- |
| P1 | US | AI voice agent developer | `/en/services/ai-voice-agent-developer` | Hire a technical implementer | Keep the service page technical: architecture, integrations, latency, testing, ownership and delivery cost. |
| P1 | US | AI phone agent for business | `/en/solutions/ai-voice-agent-developer` | Evaluate a business solution | Lead with inbound calls, qualification, bookings, human handoff and cost per call. |
| P1 | FR | agent vocal IA entreprise | `/solutions/developpeur-agent-vocal-ia` | Evaluate a business solution | Target agent telephonique IA, standard telephonique IA, appointments and pricing. |
| P1 | US | n8n automation consultant | `/en/services/remote-n8n-automation-consultant` | Hire a consultant | Cover audit, migration, self-hosting, support, rates and public n8n proof. |
| P1 | FR | consultant automatisation n8n | `/services/remote-n8n-automation-consultant` | Hire a consultant | Preserve the production consulting and pricing angle. |
| P2 | US | Next.js Supabase developer | `/en/services/nextjs-supabase-developer-madagascar` | Mixed technical and hiring | Use `hire` and `freelance` in metadata; keep the page focused on SaaS MVP delivery. |
| P2 | FR | developpeur Next.js Supabase freelance | `/services/developpeur-nextjs-supabase-madagascar` | Hire a freelancer | Lead metadata with freelance hiring and a 2-4 week scoped delivery. |
| P2 | Global | OpenAI Codex n8n | `/en/services/codex-n8n-developer` | Learn and implement | Use an integration/tutorial hybrid: API, MCP, GitHub, structured output, security and examples. |
| P3 | US | forward deployed AI engineer consultant | `/en/services/forward-deployed-ai-engineer` | Mostly informational and jobs | Do not create another page. Keep the contract/fractional business outcome distinction. |

## SERP observations

### Voice AI

- `AI voice agent developer` mixes developer marketplaces, platforms and implementation documentation. A technical service page can compete if it demonstrates a real deployment and answers build cost and process questions.
- `AI phone agent for business` is dominated by platforms and buyer guides. The solution page should help a buyer decide whether a custom agent fits, rather than repeat developer credentials.
- `ElevenLabs developer` is controlled by ElevenLabs documentation and product pages. Use ElevenLabs as a supporting entity, not the primary keyword.
- French Google misreads `developpeur agent vocal IA` as a generic software developer query. `agent vocal IA entreprise` and `agent telephonique IA` express the solution more clearly.

### Automation and product development

- `n8n automation consultant` has strong commercial results: expert partners, agencies, consultants and for-hire community pages. Proof, production reliability, migration and pricing matter.
- `OpenAI Codex n8n` is mainly informational: community posts, GitHub, examples and tutorials. The page needs implementation detail before its sales pitch.
- `Next.js Supabase developer` is led by official docs and tutorials. Adding `hire`, `freelance` and `SaaS MVP` distinguishes the commercial page from documentation intent.
- Forward-deployed searches remain dominated by definitions, salaries and jobs. Existing authority should be consolidated instead of creating more FDE pages.

## Measurement plan

1. Keep these page assignments unchanged for at least 28 days.
2. Inspect GSC query and page deltas weekly, but evaluate metadata changes after 28 days.
3. Compare impressions, average position and CTR for each URL against the previous 28-day period.
4. Use PostHog to compare service view, 75% scroll and contact CTA events by locale.
5. Expand content only when GSC exposes a relevant query with repeated impressions. Do not create a page from a single impression.

## Next content candidates

Do not publish these yet. Validate them first in GSC or with customer evidence:

- AI voice agent cost calculator or pricing guide.
- AI phone agent for appointment booking by a specific vertical with a real use case.
- n8n consultant cost and audit checklist.
- OpenAI Codex + n8n MCP implementation guide backed by a public repository.

