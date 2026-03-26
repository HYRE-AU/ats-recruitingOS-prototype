'use client'

import Link from 'next/link'
import { useATSStore } from '@/store'
import { daysSince } from '@/lib/utils'
import { DashboardCard } from './DashboardCard'

export function ActiveRoles() {
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)
  const submissions = useATSStore((s) => s.submissions)

  const activeRoles = roles.filter((r) => r.status === 'active')

  return (
    <DashboardCard title="Active Roles" href="/roles" count={activeRoles.length}>
      {activeRoles.length === 0 ? (
        <p className="text-sm text-gray-400">No active roles.</p>
      ) : (
        <div className="space-y-2">
          {activeRoles.map((role) => {
            const client = clients.find((c) => c.id === role.clientId)
            const roleSubs = submissions.filter(
              (s) => s.roleId === role.id && s.stage !== 'Rejected' && s.stage !== 'Withdrawn'
            )
            const pipelineCount = roleSubs.length
            const age = daysSince(role.createdAt)

            let healthColor = 'bg-red-500'
            if (pipelineCount >= 4) healthColor = 'bg-green-500'
            else if (pipelineCount >= 2) healthColor = 'bg-amber-500'

            return (
              <div key={role.id} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-50">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${healthColor}`} title={`${pipelineCount} in pipeline`} />
                <div className="min-w-0 flex-1">
                  <Link href={`/roles/${role.id}`} className="text-sm font-medium text-gray-900 hover:text-indigo-600">
                    {role.title}
                  </Link>
                  <span className="ml-1.5 text-xs text-gray-400">{client?.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{pipelineCount} in pipeline</span>
                  <span className="text-gray-300">|</span>
                  <span>{age}d ago</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardCard>
  )
}
