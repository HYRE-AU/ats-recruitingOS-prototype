'use client'

import { useState, useMemo } from 'react'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import type { Submission, PipelineStage } from '@/types'
import {
  STAGE_COLORS,
  PIPELINE_STAGES,
  formatDate,
  formatDateTime,
} from '@/lib/utils'
import Link from 'next/link'

export function SubmittedTab({ candidateId }: { candidateId: string }) {
  const allSubmissions = useATSStore((s) => s.submissions)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)

  const submissions = useMemo(
    () => allSubmissions.filter((s) => s.candidateId === candidateId),
    [allSubmissions, candidateId]
  )

  if (submissions.length === 0) {
    return <p className="text-sm text-gray-500">No submissions yet.</p>
  }

  return (
    <div className="space-y-4">
      {submissions.map((sub) => {
        const role = roles.find((r) => r.id === sub.roleId)
        const client = clients.find((c) => c.id === sub.clientId)
        return (
          <SubmissionCard
            key={sub.id}
            submission={sub}
            roleTitle={role?.title ?? 'Unknown Role'}
            clientName={client?.name ?? 'Unknown Client'}
          />
        )
      })}
    </div>
  )
}

function SubmissionCard({
  submission,
  roleTitle,
  clientName,
}: {
  submission: Submission
  roleTitle: string
  clientName: string
}) {
  const [showStageUpdate, setShowStageUpdate] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [selectedStage, setSelectedStage] = useState<PipelineStage>(submission.stage)
  const [stageNote, setStageNote] = useState('')
  const updateSubmissionStage = useATSStore((s) => s.updateSubmissionStage)
  const { showToast } = useToast()

  function handleStageUpdate() {
    if (selectedStage === submission.stage) return
    updateSubmissionStage(submission.id, selectedStage, stageNote)
    setShowStageUpdate(false)
    setStageNote('')
    showToast(`Stage updated to ${selectedStage}`)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{roleTitle}</span>
            <span className="text-sm text-gray-500">at {clientName}</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
            <span>Submitted {formatDate(submission.submittedAt)}</span>
            <span>Updated {formatDate(submission.lastUpdatedAt)}</span>
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STAGE_COLORS[submission.stage]}`}>
          {submission.stage}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
        <button
          onClick={() => setShowStageUpdate(!showStageUpdate)}
          className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          Update Stage
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="rounded px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        >
          {showHistory ? 'Hide' : 'Show'} History ({submission.stageHistory.length})
        </button>
        <Link
          href={`/roles/${submission.roleId}`}
          className="ml-auto text-xs text-indigo-600 hover:underline"
        >
          View Role
        </Link>
      </div>

      {showStageUpdate && (
        <div className="mt-3 space-y-2 rounded-md bg-gray-50 p-3">
          <div className="flex items-center gap-2">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value as PipelineStage)}
              className="rounded border border-gray-300 px-2 py-1.5 text-sm"
            >
              {PIPELINE_STAGES.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
            <button
              onClick={handleStageUpdate}
              disabled={selectedStage === submission.stage}
              className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
            >
              Save
            </button>
            <button
              onClick={() => setShowStageUpdate(false)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          <input
            type="text"
            placeholder="Note (optional)"
            value={stageNote}
            onChange={(e) => setStageNote(e.target.value)}
            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
      )}

      {showHistory && (
        <div className="mt-3 rounded-md bg-gray-50 p-3">
          <div className="space-y-2">
            {submission.stageHistory.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="w-28 shrink-0 text-gray-400">{formatDateTime(entry.changedAt)}</span>
                <div>
                  <span className="font-medium text-gray-700">
                    {entry.fromStage ? `${entry.fromStage} → ${entry.toStage}` : entry.toStage}
                  </span>
                  {entry.note && <p className="mt-0.5 text-gray-500">{entry.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
