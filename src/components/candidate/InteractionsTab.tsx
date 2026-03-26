'use client'

import { useState, useMemo } from 'react'
import { useATSStore } from '@/store'
import type { Interaction } from '@/types'
import { formatDateTime } from '@/lib/utils'

const TYPE_ICONS: Record<string, string> = {
  ai_email: 'AI Email',
  recruiter_note: 'Note',
  screen_summary: 'Screen Summary',
  screen_transcript: 'Transcript',
}

const TYPE_COLORS: Record<string, string> = {
  ai_email: 'bg-sky-100 text-sky-800',
  recruiter_note: 'bg-amber-100 text-amber-800',
  screen_summary: 'bg-green-100 text-green-800',
  screen_transcript: 'bg-violet-100 text-violet-800',
}

export function InteractionsTab({ candidateId }: { candidateId: string }) {
  const interactions = useATSStore((s) => s.interactions)

  const sorted = useMemo(
    () =>
      interactions
        .filter((i) => i.candidateId === candidateId && i.type !== 'recruiter_note')
        .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()),
    [interactions, candidateId]
  )

  if (sorted.length === 0) {
    return <p className="text-sm text-gray-500">No interactions yet.</p>
  }

  return (
    <div className="space-y-4">
      {sorted.map((interaction) => (
        <InteractionCard key={interaction.id} interaction={interaction} />
      ))}
    </div>
  )
}

function InteractionCard({ interaction }: { interaction: Interaction }) {
  const [expanded, setExpanded] = useState(false)
  const isTranscript = interaction.type === 'screen_transcript'
  const isEmail = interaction.type === 'ai_email'
  const isCollapsible = isTranscript || isEmail

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-start justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[interaction.type]}`}>
              {TYPE_ICONS[interaction.type]}
            </span>
            <h4 className="text-sm font-medium text-gray-900">{interaction.title}</h4>
          </div>
          <p className="mt-0.5 text-xs text-gray-400">{formatDateTime(interaction.occurredAt)}</p>
        </div>
        {isCollapsible && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-3 flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            {expanded ? 'Collapse' : 'Expand'}
            <svg
              className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        )}
      </div>

      {/* Summary always visible */}
      <div className="border-t border-gray-100 px-4 py-3">
        <p className="text-sm leading-relaxed text-gray-700">{interaction.summary}</p>
      </div>

      {/* Body: shown inline for notes/summary, collapsed for transcripts/emails */}
      {isCollapsible ? (
        expanded && (
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-600">
              {interaction.body}
            </pre>
          </div>
        )
      ) : (
        interaction.body && (
          <div className="border-t border-gray-100 px-4 py-3">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-600">
              {interaction.body}
            </pre>
          </div>
        )
      )}
    </div>
  )
}
