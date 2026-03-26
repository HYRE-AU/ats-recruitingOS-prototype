'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/utils'

export default function CandidatesPage() {
  const candidates = useATSStore((s) => s.candidates)
  const submissions = useATSStore((s) => s.submissions)
  const clients = useATSStore((s) => s.clients)

  const submittedClientNames = useMemo(() => {
    const map = new Map<string, string[]>()
    const activeStages = new Set(['Submitted', '1st Interview', '2nd Interview', 'Final Interview', 'Offer'])
    for (const sub of submissions) {
      if (!activeStages.has(sub.stage)) continue
      const client = clients.find((c) => c.id === sub.clientId)
      if (!client) continue
      const existing = map.get(sub.candidateId)
      if (existing) {
        if (!existing.includes(client.name)) existing.push(client.name)
      } else {
        map.set(sub.candidateId, [client.name])
      }
    }
    return map
  }, [submissions, clients])

  return (
    <div>
      <h1 className="text-2xl font-bold">Candidates</h1>
      <p className="mt-1 text-sm text-gray-500">{candidates.length} candidates</p>
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title / Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {candidates.map((c) => {
              const clientNames = c.status === 'active_submitted' ? submittedClientNames.get(c.id) : undefined
              return (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/candidates/${c.id}`} className="text-sm font-medium text-indigo-600 hover:underline">
                      {c.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {c.currentTitle} at {c.currentCompany}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[c.status]}`}>
                      {STATUS_LABELS[c.status]}
                    </span>
                    {clientNames && clientNames.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {clientNames.map((name) => (
                          <span key={name} className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                            {name}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{c.location}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
