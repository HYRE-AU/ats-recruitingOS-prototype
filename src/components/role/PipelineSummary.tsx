'use client'

import { useMemo } from 'react'
import { useATSStore } from '@/store'
import type { PipelineStage } from '@/types'
import { PIPELINE_STAGES, STAGE_COLORS } from '@/lib/utils'

export function PipelineSummary({ roleId }: { roleId: string }) {
  const submissions = useATSStore((s) => s.submissions)

  const stageCounts = useMemo(() => {
    const roleSubs = submissions.filter((s) => s.roleId === roleId)
    const counts: Record<string, number> = {}
    for (const stage of PIPELINE_STAGES) {
      counts[stage] = roleSubs.filter((s) => s.stage === stage).length
    }
    return counts
  }, [submissions, roleId])

  const total = Object.values(stageCounts).reduce((a, b) => a + b, 0)

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Pipeline Summary</h2>
        <span className="text-xs text-gray-400">{total} total</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {PIPELINE_STAGES.map((stage) => (
          <div key={stage} className="flex items-center gap-1.5">
            <span className={`inline-flex min-w-[1.5rem] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ${STAGE_COLORS[stage as PipelineStage]}`}>
              {stageCounts[stage]}
            </span>
            <span className="text-xs text-gray-500">{stage}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
