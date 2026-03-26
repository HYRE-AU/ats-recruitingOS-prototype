import type { CandidateStatus, PipelineStage, SuggestionStatus, SuggestionConfidence } from '@/types'

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? '1 month ago' : `${months} months ago`
}

export function daysUntil(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function daysSince(iso: string): number {
  const diff = Date.now() - new Date(iso).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export const STATUS_LABELS: Record<CandidateStatus, string> = {
  meeting_scheduled: 'Meeting Scheduled',
  active_submitted: 'Active — Submitted',
  active_no_roles: 'Active — No Roles',
  future_candidate: 'Future Candidate',
  archived: 'Archived',
}

export const STATUS_COLORS: Record<CandidateStatus, string> = {
  meeting_scheduled: 'bg-blue-100 text-blue-800',
  active_submitted: 'bg-green-100 text-green-800',
  active_no_roles: 'bg-amber-100 text-amber-800',
  future_candidate: 'bg-purple-100 text-purple-800',
  archived: 'bg-gray-100 text-gray-600',
}

export const STAGE_COLORS: Record<PipelineStage, string> = {
  'Submitted': 'bg-blue-100 text-blue-800',
  '1st Interview': 'bg-indigo-100 text-indigo-800',
  '2nd Interview': 'bg-violet-100 text-violet-800',
  'Final Interview': 'bg-purple-100 text-purple-800',
  'Offer': 'bg-amber-100 text-amber-800',
  'Placed': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800',
  'Withdrawn': 'bg-gray-100 text-gray-600',
}

export const SUGGESTION_STATUS_LABELS: Record<SuggestionStatus, string> = {
  suggested: 'Suggested',
  discussed: 'Discussed',
  converted: 'Converted',
  dismissed: 'Dismissed',
}

export const SUGGESTION_STATUS_COLORS: Record<SuggestionStatus, string> = {
  suggested: 'bg-blue-100 text-blue-800',
  discussed: 'bg-amber-100 text-amber-800',
  converted: 'bg-green-100 text-green-800',
  dismissed: 'bg-gray-100 text-gray-500',
}

export const CONFIDENCE_COLORS: Record<SuggestionConfidence, string> = {
  strong: 'text-green-700',
  moderate: 'text-amber-700',
  speculative: 'text-gray-500',
}

export const PIPELINE_STAGES: PipelineStage[] = [
  'Submitted',
  '1st Interview',
  '2nd Interview',
  'Final Interview',
  'Offer',
  'Placed',
  'Rejected',
  'Withdrawn',
]

export const CANDIDATE_STATUSES: CandidateStatus[] = [
  'meeting_scheduled',
  'active_submitted',
  'active_no_roles',
  'future_candidate',
  'archived',
]

export type RoleStatus = 'active' | 'on_hold' | 'filled' | 'cancelled'
export type Urgency = 'low' | 'medium' | 'high' | 'urgent'

export const ROLE_STATUS_LABELS: Record<RoleStatus, string> = {
  active: 'Active',
  on_hold: 'On Hold',
  filled: 'Filled',
  cancelled: 'Cancelled',
}

export const ROLE_STATUS_COLORS: Record<RoleStatus, string> = {
  active: 'bg-green-100 text-green-800',
  on_hold: 'bg-amber-100 text-amber-800',
  filled: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-100 text-gray-600',
}

export const URGENCY_LABELS: Record<Urgency, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
}

export const URGENCY_COLORS: Record<Urgency, string> = {
  low: 'text-gray-500',
  medium: 'text-amber-600',
  high: 'text-orange-600',
  urgent: 'text-red-600',
}
