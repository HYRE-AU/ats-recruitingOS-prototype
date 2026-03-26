'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { formatDate, daysUntil } from '@/lib/utils'
import { DashboardCard } from './DashboardCard'

export function FutureCandidatesModule() {
  const candidates = useATSStore((s) => s.candidates)

  const sorted = useMemo(() => {
    const future = candidates.filter((c) => c.status === 'future_candidate')
    return future.sort((a, b) => {
      if (!a.followUpDate) return 1
      if (!b.followUpDate) return -1
      return new Date(a.followUpDate).getTime() - new Date(b.followUpDate).getTime()
    })
  }, [candidates])

  return (
    <DashboardCard title="Future Candidates" href="/future-candidates" count={sorted.length}>
      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400">No future candidates.</p>
      ) : (
        <div className="max-h-[15rem] space-y-1.5 overflow-y-auto">
          {sorted.map((c) => {
            const days = c.followUpDate ? daysUntil(c.followUpDate) : null
            const isOverdue = days !== null && days < 0

            return (
              <div key={c.id} className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-gray-50">
                <Link
                  href={`/candidates/${c.id}`}
                  className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                >
                  {c.fullName}
                </Link>
                {c.followUpDate && (
                  <span className={`text-xs font-medium ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                    {isOverdue ? (
                      <>Overdue ({Math.abs(days!)}d)</>
                    ) : (
                      formatDate(c.followUpDate)
                    )}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </DashboardCard>
  )
}
