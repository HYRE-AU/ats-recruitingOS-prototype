'use client'

import Link from 'next/link'
import { useATSStore } from '@/store'
import type { PipelineStage } from '@/types'
import { STAGE_COLORS } from '@/lib/utils'
import { DashboardCard } from './DashboardCard'

const ACTIVE_STAGES: PipelineStage[] = [
  'Submitted',
  '1st Interview',
  '2nd Interview',
  'Final Interview',
  'Offer',
  'Placed',
]

export function PipelineByRole() {
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)
  const submissions = useATSStore((s) => s.submissions)

  const activeRoles = roles.filter((r) => r.status === 'active')

  return (
    <DashboardCard title="Pipeline by Role" href="/submissions">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-2 pr-4 text-left font-medium text-gray-500">Role</th>
              {ACTIVE_STAGES.map((stage) => (
                <th key={stage} className="pb-2 px-2 text-center font-medium text-gray-500 whitespace-nowrap">
                  {stage === 'Final Interview' ? 'Final' : stage}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeRoles.map((role) => {
              const client = clients.find((c) => c.id === role.clientId)
              const roleSubs = submissions.filter((s) => s.roleId === role.id)

              const stageCounts: Record<string, number> = {}
              for (const stage of ACTIVE_STAGES) {
                stageCounts[stage] = roleSubs.filter((s) => s.stage === stage).length
              }

              return (
                <tr key={role.id} className="border-b border-gray-50">
                  <td className="py-2 pr-4">
                    <Link href={`/roles/${role.id}`} className="font-medium text-gray-900 hover:text-indigo-600">
                      {role.title}
                    </Link>
                    <span className="ml-1 text-gray-400">{client?.name}</span>
                  </td>
                  {ACTIVE_STAGES.map((stage) => (
                    <td key={stage} className="py-2 px-2 text-center">
                      {stageCounts[stage] > 0 ? (
                        <span className={`inline-block min-w-[1.25rem] rounded-full px-1.5 py-0.5 text-xs font-medium ${STAGE_COLORS[stage]}`}>
                          {stageCounts[stage]}
                        </span>
                      ) : (
                        <span className="text-gray-200">&mdash;</span>
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  )
}
