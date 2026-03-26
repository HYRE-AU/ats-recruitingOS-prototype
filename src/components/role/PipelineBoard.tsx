'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import type { Submission, PipelineStage } from '@/types'
import { PIPELINE_STAGES, STAGE_COLORS, daysSince } from '@/lib/utils'

const CORE_STAGES: PipelineStage[] = [
  'Submitted',
  '1st Interview',
  '2nd Interview',
  'Final Interview',
  'Offer',
]

const TERMINAL_STAGES: PipelineStage[] = ['Placed', 'Rejected', 'Withdrawn']

export function PipelineBoard({ roleId }: { roleId: string }) {
  const submissions = useATSStore((s) => s.submissions)
  const candidates = useATSStore((s) => s.candidates)

  const roleSubs = useMemo(
    () => submissions.filter((s) => s.roleId === roleId),
    [submissions, roleId]
  )

  const columns = useMemo(() => {
    const grouped = new Map<PipelineStage, Submission[]>()
    for (const stage of PIPELINE_STAGES) {
      grouped.set(stage, [])
    }
    for (const sub of roleSubs) {
      grouped.get(sub.stage)?.push(sub)
    }

    // Always show core stages; show terminal stages only if they have candidates
    const visible: { stage: PipelineStage; subs: Submission[] }[] = []
    for (const stage of CORE_STAGES) {
      visible.push({ stage, subs: grouped.get(stage) ?? [] })
    }
    for (const stage of TERMINAL_STAGES) {
      const subs = grouped.get(stage) ?? []
      if (subs.length > 0) visible.push({ stage, subs })
    }
    return visible
  }, [roleSubs])

  const total = roleSubs.length

  if (total === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-900">Pipeline</h2>
        <p className="mt-3 text-sm text-gray-400">No candidates in the pipeline yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Pipeline</h2>
        <span className="text-xs text-gray-400">{total} total</span>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {columns.map(({ stage, subs }) => (
          <div key={stage} className="w-52 shrink-0">
            <div className="flex items-center gap-1.5 pb-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STAGE_COLORS[stage]}`}>
                {stage}
              </span>
              <span className="text-xs text-gray-400">({subs.length})</span>
            </div>
            <div className="space-y-2">
              {subs.length === 0 ? (
                <div className="rounded-md border border-dashed border-gray-200 px-3 py-4 text-center text-xs text-gray-300">
                  Empty
                </div>
              ) : (
                subs.map((sub) => {
                  const candidate = candidates.find((c) => c.id === sub.candidateId)
                  return (
                    <PipelineCard
                      key={sub.id}
                      submission={sub}
                      candidateName={candidate?.fullName ?? 'Unknown'}
                      candidateTitle={candidate ? `${candidate.currentTitle} at ${candidate.currentCompany}` : ''}
                    />
                  )
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PipelineCard({
  submission,
  candidateName,
  candidateTitle,
}: {
  submission: Submission
  candidateName: string
  candidateTitle: string
}) {
  const updateSubmissionStage = useATSStore((s) => s.updateSubmissionStage)
  const { showToast } = useToast()

  const daysAtStage = useMemo(() => {
    const lastEntry = submission.stageHistory[submission.stageHistory.length - 1]
    return lastEntry ? daysSince(lastEntry.changedAt) : daysSince(submission.submittedAt)
  }, [submission])

  function handleStageChange(newStage: string) {
    if (newStage === submission.stage) return
    updateSubmissionStage(submission.id, newStage as PipelineStage)
    showToast(`Stage updated: ${candidateName} → ${newStage}`)
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white p-2.5 shadow-sm">
      <Link
        href={`/candidates/${submission.candidateId}`}
        className="text-sm font-medium text-gray-900 hover:text-indigo-600"
      >
        {candidateName}
      </Link>
      <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{candidateTitle}</p>

      <div className="mt-1.5 flex items-center justify-end text-xs">
        <span className={`whitespace-nowrap ${daysAtStage >= 5 ? 'font-medium text-red-600' : 'text-gray-400'}`}>
          {daysAtStage}d
        </span>
      </div>

      <div className="mt-2 border-t border-gray-100 pt-2">
        <select
          value={submission.stage}
          onChange={(e) => handleStageChange(e.target.value)}
          className="w-full rounded border border-gray-200 bg-gray-50 px-1.5 py-1 text-xs text-gray-700"
        >
          {PIPELINE_STAGES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
