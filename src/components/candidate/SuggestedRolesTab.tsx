'use client'

import { useMemo } from 'react'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import type { SuggestedMatch, Submission } from '@/types'
import {
  SUGGESTION_STATUS_LABELS,
  SUGGESTION_STATUS_COLORS,
  CONFIDENCE_COLORS,
} from '@/lib/utils'
import Link from 'next/link'

export function SuggestedRolesTab({ candidateId }: { candidateId: string }) {
  const suggestedMatches = useATSStore((s) => s.suggestedMatches)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)

  const suggestions = useMemo(
    () => suggestedMatches.filter((s) => s.candidateId === candidateId),
    [suggestedMatches, candidateId]
  )
  const visible = useMemo(() => suggestions.filter((s) => s.status !== 'dismissed'), [suggestions])
  const dismissed = useMemo(() => suggestions.filter((s) => s.status === 'dismissed'), [suggestions])

  if (suggestions.length === 0) {
    return <p className="text-sm text-gray-500">No suggested roles yet.</p>
  }

  return (
    <div className="space-y-4">
      {visible.map((sug) => {
        const role = roles.find((r) => r.id === sug.roleId)
        const client = role ? clients.find((c) => c.id === role.clientId) : undefined
        return (
          <SuggestionCard
            key={sug.id}
            suggestion={sug}
            roleTitle={role?.title ?? 'Unknown Role'}
            clientName={client?.name ?? 'Unknown Client'}
            roleId={sug.roleId}
            clientId={role?.clientId ?? ''}
            candidateId={candidateId}
          />
        )
      })}
      {dismissed.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-2 text-xs font-medium text-gray-400 uppercase">Dismissed</h4>
          {dismissed.map((sug) => {
            const role = roles.find((r) => r.id === sug.roleId)
            const client = role ? clients.find((c) => c.id === role.clientId) : undefined
            return (
              <div key={sug.id} className="mb-2 rounded-md border border-gray-100 bg-gray-50 px-4 py-3 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-500">{role?.title}</span>
                    <span className="text-sm text-gray-400"> at {client?.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">Dismissed</span>
                </div>
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
  roleTitle,
  clientName,
  roleId,
  clientId,
  candidateId,
}: {
  suggestion: SuggestedMatch
  roleTitle: string
  clientName: string
  roleId: string
  clientId: string
  candidateId: string
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
      submissionNotes: `Submitted from suggestion. Rationale: ${suggestion.rationale}`,
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
    showToast(`Submitted via Paul to Slack`)
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
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{roleTitle}</span>
            <span className="text-sm text-gray-500">at {clientName}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${SUGGESTION_STATUS_COLORS[suggestion.status]}`}>
              {SUGGESTION_STATUS_LABELS[suggestion.status]}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-gray-600">{suggestion.rationale}</p>
          <div className="mt-2 flex items-center gap-3 text-xs">
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

      <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
        {isActionable && (
          <>
            <button
              onClick={handleSubmit}
              className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
            >
              Submit
            </button>
            {suggestion.status === 'suggested' && (
              <button
                onClick={handleMarkDiscussed}
                className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Mark Discussed
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="rounded px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              Dismiss
            </button>
          </>
        )}
        <Link
          href={`/roles/${roleId}`}
          className="ml-auto text-xs text-indigo-600 hover:underline"
        >
          View Role
        </Link>
      </div>
    </div>
  )
}
