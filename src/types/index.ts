// ── Core Entity Types ──────────────────────────────────────────────

export interface Client {
  id: string
  name: string
  primaryContactName: string
  primaryContactEmail: string
  industry: string
  size: string
  status: string
  blurb: string
  website: string
  linkedInUrl: string
  about: string
  fundingRound: string
  teamSize: string
  roleIds: string[]
}

export interface Role {
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

export type CandidateStatus =
  | 'meeting_scheduled'
  | 'active_submitted'
  | 'active_no_roles'
  | 'future_candidate'
  | 'archived'

export interface Candidate {
  id: string
  fullName: string
  email: string
  mobile: string
  linkedInUrl: string
  currentTitle: string
  currentCompany: string
  status: CandidateStatus
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
  scheduledMeetingDatetime: string | null
  interactionIds: string[]
  suggestedRoleIds: string[]
  submissionIds: string[]
}

export type InteractionType = 'ai_email' | 'recruiter_note' | 'screen_summary' | 'screen_transcript'

export interface Interaction {
  id: string
  candidateId: string
  type: InteractionType
  title: string
  summary: string
  body: string
  occurredAt: string
}

export type SuggestionConfidence = 'strong' | 'moderate' | 'speculative'
export type SuggestionStatus = 'suggested' | 'discussed' | 'converted' | 'dismissed'

export interface SuggestedMatch {
  id: string
  candidateId: string
  roleId: string
  rationale: string
  score: number | null
  confidence: SuggestionConfidence
  status: SuggestionStatus
}

export type PipelineStage =
  | 'Submitted'
  | '1st Interview'
  | '2nd Interview'
  | 'Final Interview'
  | 'Offer'
  | 'Placed'
  | 'Rejected'
  | 'Withdrawn'

export type DeliveryMethod = 'paul_slack' | 'admin_portal'

export interface StageHistoryEntry {
  fromStage: string | null
  toStage: string
  changedAt: string
  note: string
}

export interface Submission {
  id: string
  candidateId: string
  roleId: string
  clientId: string
  stage: PipelineStage
  deliveryMethod: DeliveryMethod
  slackReference: string | null
  submissionNotes: string
  submittedAt: string
  lastUpdatedAt: string
  stageHistory: StageHistoryEntry[]
}

export type ReminderType = 'proxy_date' | 'stale_submission' | 'follow_up'
export type ReminderStatus = 'pending' | 'fired' | 'dismissed'

export interface Reminder {
  id: string
  type: ReminderType
  candidateId: string | null
  submissionId: string | null
  triggerDate: string
  status: ReminderStatus
}
