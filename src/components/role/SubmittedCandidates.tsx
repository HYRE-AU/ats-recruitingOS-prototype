'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { formatDate, timeAgo, STAGE_COLORS } from '@/lib/utils'

export function SubmittedCandidates({ roleId }: { roleId: string }) {
  const submissions = useATSStore((s) => s.submissions)
  const candidates = useATSStore((s) => s.candidates)

  const roleSubs = useMemo(
    () =>
      submissions
        .filter((s) => s.roleId === roleId)
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()),
    [submissions, roleId]
  )

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Submitted Candidates</h2>
        <span className="text-xs text-gray-400">{roleSubs.length} submitted</span>
      </div>

      {roleSubs.length === 0 ? (
        <p className="mt-3 text-sm text-gray-400">No submissions yet.</p>
      ) : (
        <div className="mt-3 overflow-hidden rounded-md border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Candidate</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Stage</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {roleSubs.map((sub) => {
                const candidate = candidates.find((c) => c.id === sub.candidateId)
                return (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5">
                      <Link
                        href={`/candidates/${sub.candidateId}`}
                        className="font-medium text-gray-900 hover:text-indigo-600"
                      >
                        {candidate?.fullName ?? 'Unknown'}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STAGE_COLORS[sub.stage]}`}>
                        {sub.stage}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-gray-500">
                      {timeAgo(sub.lastUpdatedAt)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
