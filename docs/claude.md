# Perfectly ATS — Prototype

## What this is
A frontend-only prototype of a lightweight ATS (Applicant Tracking System) for an agency recruiter. Everything is simulated with mock data and fake actions. No real backend, APIs, auth, or integrations.

Full PRD with workflows, epics, and data model: `docs/PRD.md`

## Tech stack
- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS**
- **Zustand** for state management
- All data is mock JSON in `/mock/` directory
- No backend. No database. No real API calls.

## Project structure
```
src/
  app/              # Next.js routes
    dashboard/
    clients/
    clients/[id]/
    roles/
    roles/[id]/
    candidates/
    candidates/[id]/
    active-no-roles/
    future-candidates/
    submissions/
  components/        # Shared UI components
  store/             # Zustand stores
  lib/               # Utilities, types
  types/             # TypeScript type definitions
mock/                # Mock data JSON files
docs/                # Full PRD
```

## Core entities and types

See `docs/PRD.md` Part 6 for full type definitions. Key types:

- **Client** — company with 1+ roles
- **Role** — open position under a client (status: active/on_hold/filled/cancelled)
- **Candidate** — person who booked a recruiter screen (status: meeting_scheduled/active_submitted/active_no_roles/future_candidate/archived)
- **Interaction** — touchpoint (types: ai_email, recruiter_note, screen_summary, screen_transcript)
- **SuggestedMatch** — candidate-role pairing with rationale (status: suggested/discussed/converted/dismissed)
- **Submission** — candidate submitted for a role (tracks stage + history)
- **StageHistoryEntry** — immutable log of stage changes
- **Reminder** — follow-up triggers (proxy dates, stale submissions)

## Business rules (always respect these)

1. **Candidates only enter ATS when they book.** The candidate database = people who booked a recruiter screen. Not every lead.
2. **Roles come from completed intake upstream.** Prototype simulates this with "Add Mock Role" button.
3. **Submission triggers Paul → Slack.** Recruiter clicks Submit in ATS → fake confirmation "Submitted via Paul to Slack" + mock Slack reference (e.g., `#acme-hiring / msg_10021`).
4. **Stage updates are manual.** Recruiter updates stages from client communication. Any stage transition allowed (non-linear). Backdating allowed.
5. **Candidate pools matter.** Active, Active but No Roles, Future Candidate, Archived. Pool views must stay in sync with candidate status changes.
6. **Suggestion states:** Suggested → Discussed → Converted (submitted) or Dismissed. "Discussed" means recruiter talked about this role with the candidate but hasn't submitted yet.

## Pipeline stages (use these exact labels)
- Submitted
- 1st Interview
- 2nd Interview
- Final Interview
- Offer
- Placed
- Rejected
- Withdrawn

## 10 screens to build

1. **Dashboard** — Active Roles, Pipeline by Role, Recent Submissions, Active but No Roles, Future Candidates, New Suggested Matches, Waiting on Client
2. **Clients List** — name, active roles, contact, latest role date
3. **Client Detail** — header + roles list
4. **Roles List** — title, client, status, pipeline. "Add Mock Role" button
5. **Role Detail** — header, summary, Suggested Candidates (Submit/View/Dismiss), Submitted Candidates, Pipeline counts
6. **Candidate Database** — all candidates, filterable by status. "Add Mock Booked Candidate" button
7. **Candidate Detail** ⭐ (most important) — Header + 5 tabs: Overview, Interactions, Suggested Roles, Submitted, Notes
8. **Active but No Roles** — dedicated pool view
9. **Future Candidates** — sorted by proxy date, overdue pinned
10. **Submission Tracker** — all submissions, filterable, stage update

## Left nav
Dashboard, Clients, Roles, Candidates, Active but No Roles, Future Candidates, Submissions

## Key interactions that must work

- **Submit candidate for role** → creates submission, fake Slack toast, updates Submitted tab + pipeline counts
- **Update stage** → appends to stage history, updates pipeline view + dashboard
- **Change candidate status** → moves between pools, updates dashboard modules
- **Mark suggestion as Discussed** → badge updates, suggestion stays visible
- **Dismiss suggestion** → removed/dimmed from view
- **Expand/collapse transcript** → summary shown by default, raw transcript hidden
- **Add mock note** → appends to Interactions or Notes tab

## Mock data requirements
- 4–6 clients (Acme AI, Northstar Health, LatticeFlow, Vanta Labs, Novera, Cinder)
- 8–12 roles across those clients
- 18–25 candidates distributed across all status pools
- 6–8 candidates with rich interaction history (emails + transcript + notes)
- 10–15 submissions at mixed stages
- Enough suggestions so profiles and role pages don't feel empty

## Coding conventions
- Use named exports
- Prefer `interface` over `type` for object shapes
- Functional components only
- Use Tailwind utility classes, no custom CSS files
- Keep components under 150 lines — extract subcomponents
- All fake actions update Zustand store state only

## What NOT to build
- No real backend or API
- No authentication
- No real Calendly/Slack/Google Calendar integration
- No complex state machines
- No polished design system — clean and functional is fine
- No search indexing — simple string matching is fine

## When in doubt
Read `docs/PRD.md` for the full specification. The most important screen to get right is **Candidate Detail** — that's where the recruiter lives.