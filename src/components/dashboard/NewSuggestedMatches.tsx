'use client'

import Link from 'next/link'
import { useATSStore } from '@/store'
import { CONFIDENCE_COLORS } from '@/lib/utils'
import { DashboardCard } from './DashboardCard'

export function NewSuggestedMatches() {
  const suggestions = useATSStore((s) => s.suggestedMatches)
  const candidates = useATSStore((s) => s.candidates)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)

  const unactioned = suggestions.filter((s) => s.status === 'suggested')

  return (
    <DashboardCard title="New Suggested Matches" count={unactioned.length}>
      {unactioned.length === 0 ? (
        <p className="text-sm text-gray-400">All suggestions have been reviewed.</p>
      ) : (
        <div className="space-y-2">
          {unactioned.map((sug) => {
            const candidate = candidates.find((c) => c.id === sug.candidateId)
            const role = roles.find((r) => r.id === sug.roleId)
            const client = role ? clients.find((c) => c.id === role.clientId) : undefined

            return (
              <div key={sug.id} className="rounded-md border border-gray-100 px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/candidates/${sug.candidateId}`}
                      className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                    >
                      {candidate?.fullName ?? 'Unknown'}
                    </Link>
                    <span className="mx-1.5 text-xs text-gray-300">&rarr;</span>
                    <Link
                      href={`/roles/${sug.roleId}`}
                      className="text-sm text-gray-600 hover:text-indigo-600"
                    >
                      {role?.title}
                    </Link>
                    <span className="ml-1 text-xs text-gray-400">at {client?.name}</span>
                  </div>
                  <span className={`text-xs font-medium capitalize ${CONFIDENCE_COLORS[sug.confidence]}`}>
                    {sug.confidence}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{sug.rationale}</p>
              </div>
            )
          })}
        </div>
      )}
    </DashboardCard>
  )
}
