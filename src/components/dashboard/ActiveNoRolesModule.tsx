'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { DashboardCard } from './DashboardCard'

export function ActiveNoRolesModule() {
  const candidates = useATSStore((s) => s.candidates)
  const activeNoRoles = useMemo(
    () => candidates.filter((c) => c.status === 'active_no_roles'),
    [candidates]
  )

  return (
    <DashboardCard title="Active — No Roles" href="/active-no-roles" count={activeNoRoles.length}>
      {activeNoRoles.length === 0 ? (
        <p className="text-sm text-gray-400">No candidates in this pool.</p>
      ) : (
        <div className="max-h-[15rem] space-y-1.5 overflow-y-auto">
          {activeNoRoles.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-gray-50">
              <Link
                href={`/candidates/${c.id}`}
                className="text-sm font-medium text-gray-900 hover:text-indigo-600"
              >
                {c.fullName}
              </Link>
              <span className="text-xs text-gray-400">{c.currentTitle}</span>
            </div>
          ))}
        </div>
      )}
    </DashboardCard>
  )
}
