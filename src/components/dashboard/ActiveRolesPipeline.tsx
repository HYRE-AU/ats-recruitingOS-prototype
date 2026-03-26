'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import type { PipelineStage, Submission } from '@/types'
import { daysSince, STAGE_COLORS } from '@/lib/utils'
import { Tooltip } from '@/components/Tooltip'
import { DashboardCard } from './DashboardCard'

const ACTIVE_STAGES: PipelineStage[] = [
  'Submitted',
  '1st Interview',
  '2nd Interview',
  'Final Interview',
  'Offer',
  'Placed',
]

export function ActiveRolesPipeline() {
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)
  const submissions = useATSStore((s) => s.submissions)
  const candidates = useATSStore((s) => s.candidates)

  const activeRoles = useMemo(() => roles.filter((r) => r.status === 'active'), [roles])

  const candidateNameMap = useMemo(() => {
    const map = new Map<string, { id: string; name: string }>()
    for (const c of candidates) {
      map.set(c.id, { id: c.id, name: c.fullName })
    }
    return map
  }, [candidates])

  return (
    <DashboardCard title="Active Roles & Pipeline" href="/roles" count={activeRoles.length}>
      {activeRoles.length === 0 ? (
        <p className="text-sm text-gray-400">No active roles.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 pr-3 text-left font-medium text-gray-500">Role</th>
                {ACTIVE_STAGES.map((stage) => (
                  <th key={stage} className="pb-2 px-1.5 text-center font-medium text-gray-500 whitespace-nowrap">
                    {stage === 'Final Interview' ? 'Final' : stage}
                  </th>
                ))}
                <th className="pb-2 pl-2 text-right font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {activeRoles.map((role) => {
                const client = clients.find((c) => c.id === role.clientId)
                const roleSubs = submissions.filter((s) => s.roleId === role.id)
                const age = daysSince(role.createdAt)

                const stageData: Record<string, Submission[]> = {}
                let total = 0
                for (const stage of ACTIVE_STAGES) {
                  const subs = roleSubs.filter((s) => s.stage === stage)
                  stageData[stage] = subs
                  total += subs.length
                }

                let healthColor = 'text-red-600 bg-red-50'
                if (total >= 4) healthColor = 'text-green-700 bg-green-50'
                else if (total >= 2) healthColor = 'text-amber-700 bg-amber-50'

                return (
                  <tr key={role.id} className="border-b border-gray-50">
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="min-w-0">
                          <Link href={`/roles/${role.id}`} className="font-medium text-gray-900 hover:text-indigo-600">
                            {role.title}
                          </Link>
                          <div className="flex items-center gap-2 text-gray-400">
                            <span>{client?.name}</span>
                            <span>{age}d ago</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    {ACTIVE_STAGES.map((stage) => {
                      const subs = stageData[stage]
                      return (
                        <td key={stage} className="py-2 px-1.5 text-center">
                          {subs.length > 0 ? (
                            <Tooltip
                              width="w-48"
                              content={
                                <div className="space-y-1">
                                  {subs.map((s) => {
                                    const c = candidateNameMap.get(s.candidateId)
                                    return (
                                      <Link
                                        key={s.id}
                                        href={`/candidates/${s.candidateId}`}
                                        className="block text-xs font-medium text-gray-800 hover:text-indigo-600"
                                      >
                                        {c?.name ?? 'Unknown'}
                                      </Link>
                                    )
                                  })}
                                </div>
                              }
                            >
                              <span className={`inline-block min-w-[1.25rem] cursor-default rounded-full px-1.5 py-0.5 font-medium ${STAGE_COLORS[stage]}`}>
                                {subs.length}
                              </span>
                            </Tooltip>
                          ) : (
                            <span className="text-gray-200">&mdash;</span>
                          )}
                        </td>
                      )
                    })}
                    <td className="py-2 pl-2 text-right">
                      <span className={`inline-block rounded-full px-2 py-0.5 font-semibold ${healthColor}`}>
                        {total}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardCard>
  )
}
