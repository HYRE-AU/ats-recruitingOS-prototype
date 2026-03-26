'use client'

import Link from 'next/link'
import { useATSStore } from '@/store'
import { formatDate, STAGE_COLORS } from '@/lib/utils'
import { DashboardCard } from './DashboardCard'

export function RecentSubmissions() {
  const submissions = useATSStore((s) => s.submissions)
  const candidates = useATSStore((s) => s.candidates)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const recent = submissions
    .filter((s) => new Date(s.submittedAt).getTime() >= sevenDaysAgo)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

  return (
    <DashboardCard title="Recent Submissions" href="/submissions" count={recent.length}>
      {recent.length === 0 ? (
        <p className="text-sm text-gray-400">No submissions in the last 7 days.</p>
      ) : (
        <div className="space-y-2">
          {recent.map((sub) => {
            const candidate = candidates.find((c) => c.id === sub.candidateId)
            const role = roles.find((r) => r.id === sub.roleId)
            const client = clients.find((c) => c.id === sub.clientId)

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
                  <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(sub.submittedAt)}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardCard>
  )
}
