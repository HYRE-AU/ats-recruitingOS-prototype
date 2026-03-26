'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { RoleHeader } from '@/components/role/RoleHeader'
import { RoleSummary } from '@/components/role/RoleSummary'
import { SuggestedCandidates } from '@/components/role/SuggestedCandidates'
import { PipelineBoard } from '@/components/role/PipelineBoard'

export default function RoleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)

  const role = useMemo(() => roles.find((r) => r.id === id), [roles, id])
  const client = useMemo(
    () => (role ? clients.find((c) => c.id === role.clientId) : undefined),
    [clients, role]
  )

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500">Role not found.</p>
        <Link href="/roles" className="mt-2 text-sm text-indigo-600 hover:underline">
          Back to Roles
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/roles" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Roles
      </Link>
      <RoleHeader role={role} clientName={client?.name ?? ''} clientId={role.clientId} />
      <div className="mt-6 space-y-6">
        <RoleSummary role={role} />
        <PipelineBoard roleId={role.id} />
        <SuggestedCandidates roleId={role.id} clientName={client?.name ?? ''} clientId={role.clientId} />
      </div>
    </div>
  )
}
