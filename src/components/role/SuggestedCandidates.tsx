'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import type { SuggestedMatch, Submission } from '@/types'
import {
  SUGGESTION_STATUS_LABELS,
  SUGGESTION_STATUS_COLORS,
  CONFIDENCE_COLORS,
} from '@/lib/utils'

interface SuggestedCandidatesProps {
  roleId: string
  clientName: string
  clientId: string
}

export function SuggestedCandidates({ roleId, clientName, clientId }: SuggestedCandidatesProps) {
  const suggestedMatches = useATSStore((s) => s.suggestedMatches)
  const candidates = useATSStore((s) => s.candidates)

  const suggestions = useMemo(
    () => suggestedMatches.filter((s) => s.roleId === roleId),
    [suggestedMatches, roleId]
  )
  const visible = useMemo(
    () => suggestions.filter((s) => s.status !== 'dismissed' && s.status !== 'converted'),
    [suggestions]
  )
  const dismissed = useMemo(() => suggestions.filter((s) => s.status === 'dismissed'), [suggestions])

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Suggested Candidates</h2>
        <span className="text-xs text-gray-400">{visible.length} pending</span>
      </div>

      {visible.length === 0 && dismissed.length === 0 && (
        <p className="mt-3 text-sm text-gray-400">No suggestions for this role.</p>
      )}

      {visible.length > 0 && (
        <div className="mt-3 space-y-3">
          {visible.map((sug) => {
            const candidate = candidates.find((c) => c.id === sug.candidateId)
            if (!candidate) return null
            return (
              <SuggestionCard
                key={sug.id}
                suggestion={sug}
                candidateName={candidate.fullName}
                candidateTitle={`${candidate.currentTitle} at ${candidate.currentCompany}`}
                candidateId={sug.candidateId}
                roleId={roleId}
                clientName={clientName}
                clientId={clientId}
              />
            )
          })}
        </div>
      )}

      {dismissed.length > 0 && (
        <div className="mt-4">
          <h4 className="mb-2 text-xs font-medium uppercase text-gray-400">Dismissed</h4>
          {dismissed.map((sug) => {
            const candidate = candidates.find((c) => c.id === sug.candidateId)
            return (
              <div key={sug.id} className="mb-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-400 opacity-60">
                {candidate?.fullName ?? 'Unknown'}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SuggestionCard({
  suggestion,
  candidateName,
  candidateTitle,
  candidateId,
  roleId,
  clientName,
  clientId,
}: {
  suggestion: SuggestedMatch
  candidateName: string
  candidateTitle: string
  candidateId: string
  roleId: string
  clientName: string
  clientId: string
}) {
  const updateSuggestionStatus = useATSStore((s) => s.updateSuggestionStatus)
  const addSubmission = useATSStore((s) => s.addSubmission)
  const { showToast } = useToast()

  const isActionable = suggestion.status === 'suggested' || suggestion.status === 'discussed'

  function handleSubmit() {
    const slackChannel = `#${clientName.toLowerCase().replace(/\s+/g, '-')}-hiring`
    const msgId = `msg_${10000 + Math.floor(Math.random() * 1000)}`

    const submission: Submission = {
      id: `sub_new_${Date.now()}`,
      candidateId,
      roleId,
      clientId,
      stage: 'Submitted',
      deliveryMethod: 'paul_slack',
      slackReference: `${slackChannel} / ${msgId}`,
      submissionNotes: `Submitted from role page. Rationale: ${suggestion.rationale}`,
      submittedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      stageHistory: [
        {
          fromStage: null,
          toStage: 'Submitted',
          changedAt: new Date().toISOString(),
          note: 'Submitted via Paul to Slack',
        },
      ],
    }

    addSubmission(submission)
    updateSuggestionStatus(suggestion.id, 'converted')
    showToast('Submitted via Paul to Slack')
  }

  function handleDismiss() {
    updateSuggestionStatus(suggestion.id, 'dismissed')
    showToast('Suggestion dismissed')
  }

  function handleMarkDiscussed() {
    updateSuggestionStatus(suggestion.id, 'discussed')
    showToast('Marked as Discussed')
  }

  return (
    <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/candidates/${candidateId}`}
              className="text-sm font-medium text-gray-900 hover:text-indigo-600"
            >
              {candidateName}
            </Link>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${SUGGESTION_STATUS_COLORS[suggestion.status]}`}>
              {SUGGESTION_STATUS_LABELS[suggestion.status]}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-gray-500">{candidateTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{suggestion.rationale}</p>
          <div className="mt-1.5 flex items-center gap-3 text-xs">
            {suggestion.score !== null && (
              <span className="text-gray-500">
                Score: <span className="font-medium">{suggestion.score}</span>
              </span>
            )}
            <span className={`font-medium capitalize ${CONFIDENCE_COLORS[suggestion.confidence]}`}>
              {suggestion.confidence}
            </span>
          </div>
        </div>
      </div>

      {isActionable && (
        <div className="mt-2.5 flex items-center gap-2 border-t border-gray-200 pt-2.5">
          <button
            onClick={handleSubmit}
            className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Submit
          </button>
          {suggestion.status === 'suggested' && (
            <button
              onClick={handleMarkDiscussed}
              className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              Mark Discussed
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="rounded px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Dismiss
          </button>
          <Link
            href={`/candidates/${candidateId}`}
            className="ml-auto text-xs text-indigo-600 hover:underline"
          >
            View Candidate
          </Link>
        </div>
      )}
    </div>
  )
}
