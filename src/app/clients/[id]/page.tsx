'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { formatDate, ROLE_STATUS_LABELS, ROLE_STATUS_COLORS } from '@/lib/utils'

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const clients = useATSStore((s) => s.clients)
  const allRoles = useATSStore((s) => s.roles)
  const submissions = useATSStore((s) => s.submissions)

  const client = useMemo(() => clients.find((c) => c.id === id), [clients, id])
  const roles = useMemo(
    () =>
      allRoles
        .filter((r) => r.clientId === id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [allRoles, id]
  )

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500">Client not found.</p>
        <Link href="/clients" className="mt-2 text-sm text-indigo-600 hover:underline">
          Back to Clients
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/clients" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Clients
      </Link>

      {/* Client Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h1 className="text-xl font-bold text-gray-900">{client.name}</h1>
        {client.about && (
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{client.about}</p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:grid-cols-4">
          <div>
            <span className="text-xs font-medium uppercase text-gray-400">Industry</span>
            <p className="text-gray-700">{client.industry}</p>
          </div>
          <div>
            <span className="text-xs font-medium uppercase text-gray-400">Team Size</span>
            <p className="text-gray-700">{client.teamSize || client.size}</p>
          </div>
          <div>
            <span className="text-xs font-medium uppercase text-gray-400">Funding</span>
            <p className="text-gray-700">{client.fundingRound || '—'}</p>
          </div>
          <div>
            <span className="text-xs font-medium uppercase text-gray-400">Contact</span>
            <p className="text-gray-700">{client.primaryContactName}</p>
          </div>
          <div>
            <span className="text-xs font-medium uppercase text-gray-400">Email</span>
            <a href={`mailto:${client.primaryContactEmail}`} className="text-indigo-600 hover:underline">
              {client.primaryContactEmail}
            </a>
          </div>
          {client.website && (
            <div>
              <span className="text-xs font-medium uppercase text-gray-400">Website</span>
              <a href={client.website} target="_blank" rel="noopener noreferrer" className="block text-indigo-600 hover:underline">
                {client.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {client.linkedInUrl && (
            <div>
              <span className="text-xs font-medium uppercase text-gray-400">LinkedIn</span>
              <a href={client.linkedInUrl} target="_blank" rel="noopener noreferrer" className="block text-indigo-600 hover:underline">
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Roles List */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-900">
          Roles <span className="ml-1 text-gray-400">({roles.length})</span>
        </h2>

        {roles.length === 0 ? (
          <p className="mt-3 text-sm text-gray-400">No roles for this client.</p>
        ) : (
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Pipeline</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {roles.map((role) => {
                  const pipelineCount = submissions.filter(
                    (s) => s.roleId === role.id && s.stage !== 'Rejected' && s.stage !== 'Withdrawn'
                  ).length
                  return (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link href={`/roles/${role.id}`} className="text-sm font-medium text-indigo-600 hover:underline">
                          {role.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_STATUS_COLORS[role.status]}`}>
                          {ROLE_STATUS_LABELS[role.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{pipelineCount} active</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(role.createdAt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
