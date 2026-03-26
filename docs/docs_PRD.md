# Perfectly ATS — Consolidated PRD & Prototype Spec

**Owner:** Shenny
**Date:** March 2026
**Audience:** Software Engineer
**Build type:** Frontend-only prototype with mock data and fake actions

---

## Part 1: Product Definition

### 1.1 What This Is

This ATS starts after intake and after outreach. It is the system of record for active roles, booked candidates, recruiter screening context, submissions, stage tracking, and candidate resurfacing.

It is an internal recruiter operating system — not a full end-to-end recruiting platform. The intake system, sourcing engine, and AI outreach agent are already built and operate upstream. The ATS receives their outputs and gives the recruiter a single workspace to manage active work.

### 1.2 What This Is Not

- Not an intake tool. Intake is upstream (Admin Portal + Voice Agent). ATS receives the completed result.
- Not a sourcing or outreach tool. Deep Research Engine and SmartLeads handle that upstream. ATS receives candidates only when they book.
- Not a calendar or scheduling tool. Calendly handles scheduling. ATS receives booking events.

### 1.3 The Two Entry Points

1. **Intake Completion → Role Created.** When a client completes an intake upstream, the ATS receives the event and creates a Role (and Client if new). The role enters the ATS as Active immediately.
2. **Calendly Booking → Candidate Created.** When a candidate books a recruiter screen via the designated Calendly link, the ATS creates a Candidate record. Before this moment, the candidate exists only in the upstream sourcing layer. This keeps the ATS clean and high-intent.

### 1.4 Core Entities

| Entity | Description |
|--------|-------------|
| Client | A company engaged with Perfectly. Created on first intake completion. |
| Role | An open position under a Client. Created from completed intake. Enters as Active. |
| Candidate | An individual who booked a recruiter screen via Calendly. The only entry path. |
| Interaction | Any touchpoint: AI email thread (imported from SmartLeads), recruiter screen transcript, recruiter notes. |
| Suggested Match | A candidate-role pairing produced by the matching engine, with a rationale. |
| Submission | A candidate submitted to a client for a role. Delivered via Paul agent → Slack. |
| Stage History | Immutable log of every pipeline stage change for a submission. Manually updated by recruiter. |
| Reminder | Follow-up triggers: future candidate proxy dates, stale submissions, re-engagement prompts. |

### 1.5 Core Business Rules

1. **Not every sourced candidate enters the ATS.** A candidate becomes a full ATS record only when they book a recruiter screen. The candidate database represents booked, engaged candidates — not every lead from upstream sourcing.
2. **Roles come from completed intake.** A role appears in the ATS only when an intake-complete event arrives from upstream.
3. **Submission is triggered from the ATS.** The recruiter clicks Submit inside the ATS. The ATS triggers Paul (the agent) which posts the submission to the correct Slack channel. The ATS is the interface and source of truth; Paul is the delivery mechanism; Slack is the current outbound channel.
4. **Interview stage updates are manual.** The recruiter manually updates stages after the client shares progress via Slack, email, or phone. No automated stage-change feed.
5. **Candidate pools matter.** Candidates segmented into: Active, Active but No Roles, Future Candidate, Archived. The 'Active but No Roles' and 'Future Candidate' pools are reusable intelligence — when new roles arrive, these are the first place the system looks.
6. **Matching should feel intelligent.** The matching engine compares candidate profiles against role requirements. Each suggestion includes a 1–2 sentence rationale. Matching runs on two triggers: new candidate created, and new role created.

### 1.6 Key Constraints

- Single recruiter (Shenny) for v1. Data model should not preclude multi-user later.
- Today's Meetings / Google Calendar sync is NOT in MVP.
- Submission delivery may change from Paul/Slack to direct admin portal notification later. The delivery_method field future-proofs this.

### 1.7 The Question This Product Must Answer

If this ATS existed, would it organize the recruiter's world clearly enough to be worth building for real?

---

## Part 2: Upstream Systems (Context Only)

These systems are already built. Not part of the ATS.

### 2.1 Client Intake System

**What happens upstream:** Client logs into Admin Portal → selects 'Add New Role' → voice agent conducts structured intake → live calibration → transcript generated and parsed → intake marked complete.

**What ATS receives:** An event containing: client info, role info (all structured fields), raw transcript, structured summary, calibration notes, audio URL.

*For the prototype: roles are seeded as mock data or created via 'Add Mock Role' action.*

### 2.2 Sourcing & AI Outreach System

**What happens upstream:** Deep Research Engine profiles candidates → fit assessment → AI email agent (SmartLeads) sends outreach → back-and-forth email → interested candidates receive Calendly link.

**What ATS can query:** Deep Research Engine (by email) returns candidate profile. SmartLeads (by email) returns email thread.

**Key boundary:** Before booking, a candidate exists only in the sourcing layer. Not an ATS record.

*For the prototype: candidates seeded with mock deep research data and mock email threads.*

---

## Part 3: Core Workflows

6 workflows the ATS owns.

| # | Workflow | Trigger |
|---|---------|---------|
| 1 | Completed Intake → Active Role Created | Intake-complete event from upstream |
| 2 | Candidate Books → ATS Profile Created | Calendly booking (designated link only) |
| 3 | Recruiter Screen Completed → Candidate Classified | Screening call completed + transcript received |
| 4 | New Active Role → Candidate Resurfacing | New role created (end of Workflow 1) |
| 5 | Candidate Submitted via ATS → Paul → Slack | Recruiter clicks Submit in ATS |
| 6 | Client Updates → Recruiter Updates Stage | Recruiter receives update from client |

### Workflow 1: Completed Intake → Active Role Created

**Trigger:** Intake-complete event from upstream. Sole entry point for roles.
*Prototype: 'Add Mock Role' button simulates this.*

**Steps:**
1. **Receive intake event.** Payload: client info (company_name, contact_name, contact_email, industry, size), role info (title, department, reporting_to, responsibilities, must_have/nice_to_have qualifications, compensation_range, location_type, location_geo, hiring_timeline, urgency, interview_process, success_criteria, selling_points), intake data (raw_transcript, audio_url, structured_summary, calibration_notes).
2. **Validate payload.** On failure: log error, notify recruiter, do NOT create role.
3. **Client lookup or creation.** Match by primary_contact_email. Create new Client if no match.
4. **Role created.** All fields populated. Status = Active.
5. **Intake transcript stored and linked.**
6. **Role appears on dashboard.** Zero candidates in pipeline.
7. **Matching engine triggered (WF4).** Scans existing candidates. Generates suggestions.
8. **Recruiter notified.** 'New role: [Title] at [Client]. [X] candidates suggested.'

**Existing client adds another role:** Identical flow. Client matched instead of created.

**Edge cases:** Duplicate role flagged. Payload failure = no creation. Client identity conflict = recruiter prompted.

### Workflow 2: Candidate Books → ATS Profile Created

**Trigger:** Calendly booking via designated link. Sole entry point for candidates.
*Prototype: 'Add Mock Booked Candidate' button simulates this.*

**Why this rule matters:** Keeps the ATS clean and high-intent. Every candidate has booked a call.

**Steps:**
1. **Calendly webhook received.** Name, email, time, event URI, custom fields.
2. **Source validated.** Must match designated link. Non-matching silently ignored.
3. **Duplicate check.** By email. If exists: update, no duplicate. If not: create.
4. **Candidate created.** full_name, email, mobile, linkedin_url, scheduled_meeting_datetime. Status = Meeting Scheduled.
5. **Deep research linked.** Query by email. Link if found, queue research if not.
6. **Email thread imported.** From SmartLeads. As Interaction (ai_email_thread).
7. **Suggested roles generated.** Matching engine runs against active roles.
8. **Candidate appears in database.**

**Candidate Profile Structure:**

| Tab | Contents |
|-----|----------|
| Header | Name, email (mailto), mobile (tel), LinkedIn button, CV upload, status badge, photo |
| Overview | Professional summary, current role/company, location, skills, trajectory, source role |
| Interactions | AI email thread, recruiter screen transcript. Each: type, timestamp, expandable |
| Suggested Roles | Active roles that match. Each: title, client, rationale, score, Submit/Dismiss/Mark Discussed |
| Submitted | Roles submitted for. Each: title, client, stage, history, Slack reference |
| Notes | Free-form timestamped recruiter notes |

**Edge cases:** No SmartLeads thread = ok. No deep research = pending state. Cancel/reschedule handled.

### Workflow 3: Recruiter Screen Completed → Candidate Classified

**Trigger:** Screening call completed. Transcript delivered.
*Prototype: candidates seeded with mock transcripts. Status change is a fake action.*

**This is the most important workflow.** Converts raw interest into actionable intelligence.

**Steps:**
1. **Pre-call prep.** Review: deep research (Overview), AI email (Interactions), Suggested Roles.
2. **Call happens.** Covers: current situation, what they want, specific roles, interest levels, next steps.
3. **Transcript received.** Raw + AI summary. Stored as Interaction. Summary prominent; raw collapsed.
4. **Recruiter classifies candidate:**
   - **Active — Submit to Role(s):** Fits roles. Submit triggers WF5. Status: Active — Submitted.
   - **Active but No Roles:** Strong, no current fit. Enters reusable pool.
   - **Future Candidate:** Not looking now. Proxy date calculated (e.g., '2 months' → today + 60 days). Reminder created.
   - **Archived:** Not a fit or declined.
5. **Notes added.** Impressions, clarifications, action items.
6. **Profile enriched.** Confirmed: comp, location, timeline, preferences, deal-breakers, soft factors.
7. **Matching re-evaluates (if applicable).**

**Edge cases:** No-show → auto-archive. Transcript delayed → pending placeholder. Multiple roles → independent submissions. Ambiguous → default Active but No Roles.

### Workflow 4: New Active Role → Candidate Resurfacing

**Trigger:** New role created (end of WF1). Matching engine scans all candidates.
*Prototype: 'Add Mock Role' generates a few mock suggested candidates.*

**Why this matters:** Treats every screened candidate as a reusable asset. Collapses time-to-shortlist.

**Steps:**
1. **New role exists.**
2. **Engine scans all pools in priority order:**
   - **Pool 1 — Active but No Roles (highest):** Already screened, enriched data, highest match quality.
   - **Pool 2 — Future Candidates:** Surfaced if strong fit. Suggestion notes status + proxy date.
   - **Pool 3 — Currently Interviewing/Submitted:** Still surfaced. Notes current activity.
   - **Pool 4 — Archived (lowest):** Surfaced if aligns. Recruiter decides on re-engagement.
3. **Suggestions generated.** Name, status/pool, rationale, confidence (strong/moderate/speculative).
4. **Surface on role page.** Suggested Candidates: Submit/View/Dismiss.
5. **Surface on candidate profiles.** New role on Suggested Roles tab.
6. **Recruiter notified.**

**Edge cases:** No candidates = zero suggestions. 20+ suggestions = ranked. Prior submission to same client noted.

### Workflow 5: Candidate Submitted via ATS → Paul → Slack

**Trigger:** Recruiter clicks Submit in ATS.
*Prototype: creates submission in local state, shows fake 'Submitted via Paul to Slack', generates mock Slack reference.*

**How it works:** Recruiter submits from ATS. ATS triggers Paul → Slack. ATS is interface + source of truth. Paul is delivery. Delivery layer swappable.

**Steps:**
1. **Recruiter initiates.** From Suggested Roles tab or role's Suggested Candidates.
2. **Package prepared.** Editable: summary, experience, CV, pitch notes. Warns if no CV.
3. **Recruiter confirms.** Creates: submission record, stage = Submitted, updates candidate + role views, suggestion → Converted.
4. **Paul triggered.** Sends package to Slack channel. Recruiter stays in ATS.
5. **Confirmation shown.** 'Submitted [Candidate] for [Role]. Sent via Paul.'

**Edge cases:** No CV = warning. Role inactive = warning. Paul fails = record still created, retry button. Multiple roles = independent. Prior submission to same client = notice.

### Workflow 6: Client Updates → Recruiter Updates Stage

**Trigger:** Recruiter receives update from client and logs it.
*Prototype: stage updated via dropdown, history appends in local state.*

**Current reality:** No automated feed. Communication is informal (Slack, email, phone). Recruiter is sole source of truth.

**Pipeline Stages:**
- Submitted
- 1st Interview
- 2nd Interview
- Final Interview
- Offer
- Placed (terminal positive)
- Rejected (terminal negative)
- Withdrawn (terminal negative)

**Steps:**
1. **Receive update** from client.
2. **Navigate to submission.**
3. **Update stage.** Dropdown. Backdatable. Notes. Non-linear transitions allowed.
4. **Stage history updated.** Immutable. Stage, entered_at, exited_at, duration, notes.
5. **Pipeline view updated.** Duration at current stage. Stuck candidates flagged.
6. **Terminal handling.** Placed → prompt closure. Rejected/Withdrawn → record reason, revert status.
7. **Stale detection.** Same stage > 5 days → 'Needs Follow-Up' flag.

**Edge cases:** Client silence → flag after extended period. Feedback without stage change → notes only. Backdating allowed. Stage skipping allowed.

---

## Part 4: Candidate Lifecycle & Suggestion States

### 4.1 Candidate Status

| Status | Definition | Dashboard Location |
|--------|-----------|-------------------|
| Meeting Scheduled | Booked Calendly; screen not yet occurred | Newly Booked |
| Active — Submitted | Submitted to 1+ active roles | Pipeline by Role |
| Active but No Roles | Screened, strong, no matching roles now | Active but No Roles module |
| Future Candidate | Not looking now. Has proxy date. | Future Candidates module |
| Archived | No longer active | Not on dashboard (searchable) |

### 4.2 Valid State Transitions

- Meeting Scheduled → Active — Submitted
- Meeting Scheduled → Active but No Roles
- Meeting Scheduled → Future Candidate
- Meeting Scheduled → Archived
- Active but No Roles → Active — Submitted
- Active but No Roles → Archived
- Future Candidate → Active — Submitted
- Future Candidate → Active but No Roles
- Future Candidate → Archived
- Active — Submitted → Active but No Roles (all submissions terminal)
- Active — Submitted → Archived
- Archived → Active — Submitted (rare)
- Archived → Active but No Roles (rare)

### 4.3 Suggestion States

| Status | Meaning | Triggered By |
|--------|---------|-------------|
| Suggested | Matching engine generated this. Recruiter hasn't acted. | Matching engine |
| Discussed | Recruiter talked to candidate about this role but hasn't submitted. Prevents re-pitching. | 'Mark Discussed' |
| Converted | Recruiter submitted candidate for this role. | 'Submit' on suggestion |
| Dismissed | Not a fit. Hidden but logged for ML training. | 'Dismiss' |

Flow: Suggested → Discussed → Converted or Dismissed. Discussed is optional.

---

## Part 5: Epics & Features

8 epics. P0 = must have. P1 = should have. P2 = fast follow.
*For prototype: P0 with mock data/fake actions. P1 where easy. P2 skip.*

### Epic 1: Core Data Records

| ID | Feature | Pri |
|----|---------|-----|
| 1.01 | Client Record | P0 |
| 1.02 | Role Record | P0 |
| 1.03 | Intake Transcript Record | P0 |
| 1.04 | Candidate Record | P0 |
| 1.05 | Interaction Record | P0 |
| 1.06 | Submission Record | P0 |
| 1.07 | Pipeline Stage Entry | P0 |
| 1.08 | Suggestion Record (status: suggested/discussed/converted/dismissed) | P0 |
| 1.09 | Reminder Record | P0 |

### Epic 2: Role Ingestion

| ID | Feature | Pri |
|----|---------|-----|
| 2.01 | Intake Event Receiver (prototype: 'Add Mock Role') | P0 |
| 2.02 | Client Lookup or Create | P0 |
| 2.03 | Role Creation with all fields, status = Active | P0 |
| 2.04 | Resurfacing Trigger on creation | P0 |
| 2.05 | New Role Notification | P1 |
| 2.06 | Duplicate Detection | P2 |

### Epic 3: Candidate Creation from Booking

| ID | Feature | Pri |
|----|---------|-----|
| 3.01 | Booking Receiver (prototype: 'Add Mock Booked Candidate') | P0 |
| 3.02 | Link Filtering (designated Calendly link only) | P0 |
| 3.03 | Candidate Creation, status = Meeting Scheduled | P0 |
| 3.04 | Duplicate Detection by email | P0 |
| 3.05 | Deep Research Linking | P0 |
| 3.06 | Email Thread Import | P0 |
| 3.07 | Role Suggestions on Creation | P0 |
| 3.08 | Cancel/Reschedule Handling | P1 |

### Epic 4: Candidate Profile

| ID | Feature | Pri |
|----|---------|-----|
| 4.01 | Header / Quick Info | P0 |
| 4.02 | Overview Tab | P0 |
| 4.03 | Interactions Tab (email thread + transcript with expand/collapse) | P0 |
| 4.04 | Suggested Roles Tab (Submit/Dismiss/Mark Discussed/View Role) | P0 |
| 4.05 | Submitted Tab (stage, history, Slack ref) | P0 |
| 4.06 | Notes Tab | P1 |
| 4.07 | CV Upload | P0 |
| 4.08 | Status Management | P0 |
| 4.09 | Future Proxy Date | P0 |
| 4.10 | Post-Screen Enrichment | P1 |

### Epic 5: Matching & Resurfacing

| ID | Feature | Pri |
|----|---------|-----|
| 5.01 | Candidate → Role Matching | P0 |
| 5.02 | Role → Candidate Resurfacing | P0 |
| 5.03 | Suggestions on Role Page | P0 |
| 5.04 | Suggestions on Candidate Profile | P0 |
| 5.05 | Dismiss Suggestion | P1 |
| 5.06 | Mark Discussed | P1 |
| 5.07 | Suggestion Notification | P1 |
| 5.08 | Previous Submission Context | P2 |

### Epic 6: Submission & Stage Tracking

| ID | Feature | Pri |
|----|---------|-----|
| 6.01 | Submit from ATS | P0 |
| 6.02 | Package Builder (editable) | P1 |
| 6.03 | Paul Integration (→ Slack confirmation + reference) | P0 |
| 6.04 | Paul Failure Handling | P0 |
| 6.05 | Manual Stage Update (backdatable, non-linear) | P0 |
| 6.06 | Stage History (immutable log) | P0 |
| 6.07 | Pipeline View (Kanban or table) | P0 |
| 6.08 | Terminal Handling (Placed/Rejected/Withdrawn) | P0 |
| 6.09 | Stale Flagging (>5 days) | P1 |
| 6.10 | Delivery Method field | P1 |
| 6.11 | No-CV Warning | P1 |
| 6.12 | Previous Submission Notice | P2 |

### Epic 7: Network Segmentation & Reminders

| ID | Feature | Pri |
|----|---------|-----|
| 7.01 | Active but No Roles Pool view | P0 |
| 7.02 | Future Candidates Pool view | P0 |
| 7.03 | Proxy Date Reminder + Overdue badge | P0 |
| 7.04 | Stale Submission Reminder | P1 |
| 7.05 | Reminder Dashboard Integration | P1 |
| 7.06 | Re-Engagement Transitions | P0 |

### Epic 8: Recruiter Dashboard

| ID | Feature | Pri |
|----|---------|-----|
| 8.01 | Active Roles (title, client, pipeline count, health color) | P0 |
| 8.02 | Pipeline by Role | P0 |
| 8.03 | Recent Submissions | P1 |
| 8.04 | Active but No Roles module | P0 |
| 8.05 | Future Candidates module | P0 |
| 8.06 | New Suggested Matches | P1 |
| 8.07 | Waiting on Client | P1 |
| 8.08 | Summary Metrics bar | P1 |
| 8.09 | Activity Feed | P2 |

---

## Part 6: Data Model

Frontend types for the prototype. No real database.

### Relationships
- Client 1:N Role
- Role 1:1 Intake Transcript
- Candidate 1:N Interaction
- Candidate N:N Role via Submission
- Submission 1:N StageHistoryEntry
- Candidate N:N Role via SuggestedMatch
- Reminder linked to Candidate or Submission

### Client
```typescript
{
  id: string
  name: string
  primaryContactName: string
  primaryContactEmail: string
  industry: string
  size: string
  status: string
  roleIds: string[]
}
```

### Role
```typescript
{
  id: string
  clientId: string
  title: string
  status: 'active' | 'on_hold' | 'filled' | 'cancelled'
  location: string
  compensation: string
  summary: string
  mustHaves: string
  niceToHaves: string
  hiringTimeline: string
  urgency: 'low' | 'medium' | 'high' | 'urgent'
  interviewProcess: string
  sellingPoints: string
  createdAt: string
  suggestedCandidateIds: string[]
  submissionIds: string[]
}
```

### Candidate
```typescript
{
  id: string
  fullName: string
  email: string
  mobile: string
  linkedInUrl: string
  currentTitle: string
  currentCompany: string
  status: 'meeting_scheduled' | 'active_submitted' | 'active_no_roles' | 'future_candidate' | 'archived'
  owner: string
  cvFileName: string | null
  latestScreenDate: string | null
  followUpDate: string | null
  futureStatedTimeframe: string | null
  summary: string
  currentRoleAndCompany: string
  location: string
  keySkills: string[]
  compensationExpectations: string
  locationPreferences: string
  rolePreferences: string
  dealBreakers: string
  softFactors: string
  tagList: string[]
  interactionIds: string[]
  suggestedRoleIds: string[]
  submissionIds: string[]
}
```

### Interaction
```typescript
{
  id: string
  candidateId: string
  type: 'ai_email' | 'recruiter_note' | 'screen_summary' | 'screen_transcript'
  title: string
  summary: string
  body: string
  occurredAt: string
}
```

### SuggestedMatch
```typescript
{
  id: string
  candidateId: string
  roleId: string
  rationale: string
  score: number | null
  confidence: 'strong' | 'moderate' | 'speculative'
  status: 'suggested' | 'discussed' | 'converted' | 'dismissed'
}
```

### Submission
```typescript
{
  id: string
  candidateId: string
  roleId: string
  clientId: string
  stage: string
  deliveryMethod: 'paul_slack' | 'admin_portal'
  slackReference: string | null
  submissionNotes: string
  submittedAt: string
  lastUpdatedAt: string
  stageHistory: StageHistoryEntry[]
}
```

### StageHistoryEntry
```typescript
{
  fromStage: string | null
  toStage: string
  changedAt: string
  note: string
}
```

### Reminder
```typescript
{
  id: string
  type: 'proxy_date' | 'stale_submission' | 'follow_up'
  candidateId: string | null
  submissionId: string | null
  triggerDate: string
  status: 'pending' | 'fired' | 'dismissed'
}
```

---

## Part 7: Screen Specifications

### Navigation (left nav)
- Dashboard
- Clients
- Roles
- Candidates
- Active but No Roles
- Future Candidates
- Submissions

### Screen 1: Dashboard

**Purpose:** Morning operating snapshot.

| Module | Contents | Interactions |
|--------|----------|-------------|
| Active Roles | Title, client, pipeline count, date, status | Click → Role Detail |
| Pipeline by Role | Per role stage counts | Click → Pipeline View |
| Recent Submissions | Candidate, role, client, date, stage | Click → Candidate Detail |
| Active but No Roles | Count + names | Click → pool view |
| Future Candidates | Count + names + follow-up dates | Click → pool view |
| New Suggested Matches | Candidate, role, rationale | Click → detail |
| Waiting on Client | Stale submissions. 'Last updated X days ago' | Click → submission |

### Screen 2: Clients List
- Fields: name, active role count, primary contact, latest role date
- Click row → Client Detail. Search input.

### Screen 3: Client Detail
- Client header, contact summary, roles list
- Roles show: title, status, date, pipeline count
- Click role → Role Detail

### Screen 4: Roles List
- Fields: title, client, status, date, pipeline summary
- Filters: Active, Closed, search, filter by client
- 'Add Mock Role' button

### Screen 5: Role Detail
1. **Role Header:** title, client, status, location, comp, date
2. **Role Summary:** brief, must-haves, hiring context
3. **Suggested Candidates:** name, title/company, rationale, score. Actions: View, Submit, Dismiss
4. **Submitted Candidates:** name, stage, last updated, Slack ref
5. **Pipeline Summary:** stage counts

Submit on suggested candidate → triggers submission flow (Flow E).

### Screen 6: Candidate Database
- Fields: name, email, mobile, LinkedIn, title/company, status, last interaction, owner, has CV
- Filters: Active, Active but No Roles, Future, Archived, Submitted, search
- 'Add Mock Booked Candidate' button

### Screen 7: Candidate Detail ⭐ Most important screen

**Header:** name, email, mobile, LinkedIn link, CV area, status badge, owner, date

**Tab 1 — Overview:** Summary, screen summary, status, follow-up date (if future), tags, suggested roles preview. Actions: Change Status, Mark Future/Active No Roles/Archived.

**Tab 2 — Interactions:** AI email thread, recruiter notes, screen transcript. Summary by default, raw transcript collapsed. Expand/collapse. Add mock note.

**Tab 3 — Suggested Roles:** Each: title, client, rationale, score. Actions: Submit, Dismiss, Mark Discussed, View Role.

**Tab 4 — Submitted:** Each: client, role, stage, history, last updated, Slack ref. Actions: Update Stage, View Role.

**Tab 5 — Notes/Documents:** CV card, upload button, free-form notes.

### Screen 8: Active but No Roles
- Fields: name, screen date, tags, note snippet, suggested roles count
- Actions: open profile, view suggestions, move to Active, move to Future

### Screen 9: Future Candidates
- Fields: name, follow-up date, screen date, notes, role interests
- Actions: open profile, edit follow-up, move to Active, move to Active but No Roles

### Screen 10: Submission Tracker / Pipeline View
- Fields: candidate, client, role, stage, last updated, Slack ref, owner
- Filters: by client, role, stage, stale
- Actions: update stage, open candidate, open role

---

## Part 8: Prototype Flows

### Flow A: Mock Role Creation
- Trigger: 'Add Mock Role' button
- Adds role to state, assigns client, status = Active, generates mock suggestions

### Flow B: Mock Candidate Creation
- Trigger: 'Add Mock Booked Candidate' button
- Adds candidate, mock booking timestamp, mock email interaction, mock transcript + summary, mock role suggestions

### Flow C: Candidate Classification
- Status change on Candidate Detail
- If Future: follow-up date field. Updates pool views + dashboard.

### Flow D: Suggested Roles Behavior
- Submit → triggers Flow E
- Dismiss → removes/dims suggestion, status → Dismissed
- Mark Discussed → status → Discussed, badge updates

### Flow E: ATS Submission → Paul → Slack
1. Brief loading state
2. Submission created in local state
3. Stage = Submitted
4. Toast: 'Submitted via Paul to Slack'
5. Fake Slack reference (e.g., '#acme-hiring / msg_10021')
6. Updates: Submitted tab, pipeline, dashboard

Optional: 'Simulate Slack Failure' button.

### Flow F: Manual Stage Update
1. Stage updates
2. History appends
3. Pipeline counts update
4. Dashboard updates

---

## Part 9: Mock Data Requirements

### Clients (4–6)
Acme AI, Northstar Health, LatticeFlow, Vanta Labs, Novera, Cinder. Each: name, contact, 1–3 roles.

### Roles (8–12)
Mix: Product Designer, Founding Recruiter, Applied AI Researcher, Product Engineer, GTM Operator, Backend Engineer, Customer Success Lead, Staff ML Engineer. Include: active submissions, suggestion-only, thin pipeline, healthy pipeline.

### Candidates (18–25)
Distributed: Active, Active but No Roles, Future, Archived. Each with full profile data + interactions.

### Interactions
6–8 candidates with rich history. AI email, notes, transcript summary, raw transcript.

### Suggested Matches
Enough so profiles/roles don't feel empty. Each: rationale, score, status.

### Submissions (10–15)
Mixed stages. Each: candidate, client, role, stage, history, Slack ref.

### Slack References
- #acme-hiring / msg_10021
- #nexa-product / msg_10044
- #latticeflow-eng / msg_10087

---

## Part 10: Build Rules & Technical Approach

### 10.1 What This Build Is
Frontend-only prototype. No real APIs, database, auth, Slack, Calendly, Calendar, or transcript ingestion. Matching logic should be present but can use simplified algorithm. Mock data, fake actions, believable simulation.

### 10.2 Tech Stack
- React / Next.js
- Local component state or lightweight store (Zustand recommended)
- Hardcoded mock JSON
- Fake action handlers
- Optional local storage persistence
- No backend

### 10.3 Mock Data Files
- `/mock/clients.ts`
- `/mock/roles.ts`
- `/mock/candidates.ts`
- `/mock/submissions.ts`
- `/mock/suggestedMatches.ts`
- `/mock/interactions.ts`

### 10.4 UI Actions (All Fake / Local State)

**Global:** Add Mock Role, Add Mock Booked Candidate

**Candidate:** Change Status, Add Note, Expand/Collapse Transcript, Submit to Role, Dismiss Suggested, Mark Discussed, Update Follow-Up Date

**Role:** View Candidate, Submit Candidate, Dismiss Suggested

**Submission:** Update Stage, View Candidate, View Role

### 10.5 Visual States

**Candidate badges:** Active, Active but No Roles, Future Candidate, Archived

**Suggestion badges:** Suggested, Discussed, Converted, Dismissed

**Stage badges:** Submitted, 1st Interview, 2nd Interview, Final Interview, Offer, Placed, Rejected, Withdrawn

**Toasts:** 'Submitted via Paul to Slack', 'Stage updated', 'Suggestion dismissed', 'Follow-up date updated', 'Note added'

### 10.6 Behavior Rules

- **A:** Future Candidate → appears in Future view, follow-up date visible, still searchable
- **B:** Active but No Roles → appears in that view, still available for suggestions
- **C:** Suggested role submitted → create submission, update tabs/pipeline/counts, show Slack success
- **D:** Stage change → history appends, Submitted tab updates, pipeline updates, dashboard updates
- **E:** Dismiss → remove or mark dismissed
- **F:** Mark Discussed → update badge, keep visible with Discussed status

### 10.7 Don't Overbuild
No backend, auth, edge-case validation, design system, real integrations, complex state machines, search indexing, permissions.

### 10.8 Nice-to-Have (Only if Quick)
Toast notifications, local storage, fake timestamps, stale logic, empty states, loading states.

### 10.9 Most Important Screen
**Candidate Detail.** Where the recruiter understands who, what happened, what fits, whether submitted, and what to do next.