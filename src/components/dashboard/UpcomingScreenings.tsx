'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { DashboardCard } from './DashboardCard'

const MAX_PILLS = 3

function formatScreeningDate(iso: string): { label: string; isToday: boolean } {
  const date = new Date(iso)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return { label: 'Today', isToday: true }
  if (diffDays === 1) return { label: 'Tomorrow', isToday: false }
  return {
    label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    isToday: false,
  }
}

export function UpcomingScreenings() {
  const candidates = useATSStore((s) => s.candidates)
  const suggestedMatches = useATSStore((s) => s.suggestedMatches)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)

  const scheduled = useMemo(
    () =>
      candidates
        .filter((c) => c.status === 'meeting_scheduled')
        .sort((a, b) => {
          const aTime = a.scheduledMeetingDatetime ? new Date(a.scheduledMeetingDatetime).getTime() : Infinity
          const bTime = b.scheduledMeetingDatetime ? new Date(b.scheduledMeetingDatetime).getTime() : Infinity
          return aTime - bTime
        }),
    [candidates]
  )

  const suggestionsMap = useMemo(() => {
    const map = new Map<string, { roleTitle: string; clientName: string }[]>()
    for (const sug of suggestedMatches) {
      if (sug.status === 'dismissed') continue
      const role = roles.find((r) => r.id === sug.roleId)
      if (!role) continue
      const client = clients.find((c) => c.id === role.clientId)
      const entry = { roleTitle: role.title, clientName: client?.name ?? '' }
      const existing = map.get(sug.candidateId)
      if (existing) existing.push(entry)
      else map.set(sug.candidateId, [entry])
    }
    return map
  }, [suggestedMatches, roles, clients])

  return (
    <DashboardCard title="Upcoming Candidate Screenings" href="/candidates" count={scheduled.length}>
      {scheduled.length === 0 ? (
        <p className="text-sm text-gray-400">No screenings scheduled.</p>
      ) : (
        <div className="max-h-[22rem] space-y-2.5 overflow-y-auto">
          {scheduled.map((c) => {
            const suggestions = suggestionsMap.get(c.id) ?? []
            const dateInfo = c.scheduledMeetingDatetime
              ? formatScreeningDate(c.scheduledMeetingDatetime)
              : null

            return (
              <div key={c.id} className="rounded-md border border-gray-100 px-3 py-2.5">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/candidates/${c.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                    >
                      {c.fullName}
                    </Link>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {c.currentTitle} at {c.currentCompany}
                    </p>
                  </div>
                  {dateInfo && (
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                        dateInfo.isToday
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {dateInfo.label}
                    </span>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {suggestions.slice(0, MAX_PILLS).map((s, i) => (
                      <span
                        key={i}
                        className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-indigo-700"
                      >
                        {s.roleTitle} @ {s.clientName}
                      </span>
                    ))}
                    {suggestions.length > MAX_PILLS && (
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
                        +{suggestions.length - MAX_PILLS} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </DashboardCard>
  )
}
