'use client'

import Link from 'next/link'
import { useATSStore } from '@/store'
import { daysSince, STAGE_COLORS } from '@/lib/utils'
import { DashboardCard } from './DashboardCard'

const STALE_THRESHOLD_DAYS = 7

export function WaitingOnClient() {
  const submissions = useATSStore((s) => s.submissions)
  const candidates = useATSStore((s) => s.candidates)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)

  const nonTerminalStages = new Set(['Submitted', '1st Interview', '2nd Interview', 'Final Interview', 'Offer'])
  const stale = submissions
    .filter((s) => nonTerminalStages.has(s.stage) && daysSince(s.lastUpdatedAt) >= STALE_THRESHOLD_DAYS)
    .sort((a, b) => daysSince(b.lastUpdatedAt) - daysSince(a.lastUpdatedAt))

  return (
    <DashboardCard title="Waiting on Client" href="/submissions" count={stale.length}>
      {stale.length === 0 ? (
        <p className="text-sm text-gray-400">No stale submissions.</p>
      ) : (
        <div className="space-y-2">
          {stale.map((sub) => {
            const candidate = candidates.find((c) => c.id === sub.candidateId)
            const role = roles.find((r) => r.id === sub.roleId)
            const client = clients.find((c) => c.id === sub.clientId)
            const staleDays = daysSince(sub.lastUpdatedAt)

            return (
              <div key={sub.id} className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-gray-50">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/candidates/${sub.candidateId}`}
                    className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {candidate?.fullName ?? 'Unknown'}
                  </Link>
                  <span className="ml-1.5 text-xs text-gray-400">
                    for {role?.title} at {client?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STAGE_COLORS[sub.stage]}`}>
                    {sub.stage}
                  </span>
                  <span className="text-xs font-medium text-red-600 whitespace-nowrap">
                    {staleDays}d at stage
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardCard>
  )
}
