'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import { formatDate, daysSince } from '@/lib/utils'
import type { Interaction, SuggestedMatch } from '@/types'

export default function ActiveNoRolesPage() {
  const candidates = useATSStore((s) => s.candidates)
  const interactions = useATSStore((s) => s.interactions)
  const suggestedMatches = useATSStore((s) => s.suggestedMatches)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)

  const pool = useMemo(
    () =>
      candidates
        .filter((c) => c.status === 'active_no_roles')
        .sort((a, b) => {
          const aDate = a.latestScreenDate ? new Date(a.latestScreenDate).getTime() : 0
          const bDate = b.latestScreenDate ? new Date(b.latestScreenDate).getTime() : 0
          return bDate - aDate
        }),
    [candidates]
  )

  const suggestedRolesMap = useMemo(() => {
    const map = new Map<string, { roleTitle: string; clientName: string }[]>()
    for (const sug of suggestedMatches) {
      if (sug.status === 'dismissed' || sug.status === 'converted') continue
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
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">Active — No Roles</h1>
      <p className="mt-1 text-sm text-gray-500">
        {pool.length} candidate{pool.length !== 1 ? 's' : ''} screened and ready, waiting for the right role
      </p>

      {pool.length === 0 ? (
        <p className="mt-8 text-center text-sm text-gray-400">No candidates in this pool.</p>
      ) : (
        <div className="mt-5 space-y-4">
          {pool.map((c) => (
            <ActiveNoRolesCard
              key={c.id}
              candidateId={c.id}
              fullName={c.fullName}
              currentTitle={c.currentTitle}
              currentCompany={c.currentCompany}
              latestScreenDate={c.latestScreenDate}
              suggestedRoles={suggestedRolesMap.get(c.id) ?? []}
              interactions={interactions}
              suggestedMatches={suggestedMatches}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ActiveNoRolesCard({
  candidateId,
  fullName,
  currentTitle,
  currentCompany,
  latestScreenDate,
  suggestedRoles,
  interactions,
  suggestedMatches,
}: {
  candidateId: string
  fullName: string
  currentTitle: string
  currentCompany: string
  latestScreenDate: string | null
  suggestedRoles: { roleTitle: string; clientName: string }[]
  interactions: Interaction[]
  suggestedMatches: SuggestedMatch[]
}) {
  const updateCandidateStatus = useATSStore((s) => s.updateCandidateStatus)
  const { showToast } = useToast()
  const [showFuturePicker, setShowFuturePicker] = useState(false)
  const [followUpDate, setFollowUpDate] = useState('')

  const latestNote = useMemo(() => {
    const sorted = interactions
      .filter((i) => i.candidateId === candidateId)
      .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
    return sorted[0] ?? null
  }, [interactions, candidateId])

  const suggestionCount = useMemo(
    () => suggestedMatches.filter((s) => s.candidateId === candidateId && s.status === 'suggested').length,
    [suggestedMatches, candidateId]
  )

  const daysInPool = latestScreenDate ? daysSince(latestScreenDate) : null

  function handleMoveToFuture() {
    if (!followUpDate) { setShowFuturePicker(true); return }
    updateCandidateStatus(candidateId, 'future_candidate', new Date(followUpDate).toISOString())
    setShowFuturePicker(false)
    setFollowUpDate('')
    showToast(`${fullName} moved to Future Candidate`)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/candidates/${candidateId}`}
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              {fullName}
            </Link>
            {suggestionCount > 0 && (
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                {suggestionCount} new suggestion{suggestionCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-gray-500">
            {currentTitle} at {currentCompany}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {latestScreenDate && <span>Screened {formatDate(latestScreenDate)}</span>}
          {daysInPool !== null && (
            <>
              <span className="text-gray-200">|</span>
              <span>{daysInPool}d in pool</span>
            </>
          )}
        </div>
      </div>

      {/* Suggested Roles */}
      <div className="mt-2.5">
        {suggestedRoles.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {suggestedRoles.map((r, i) => (
              <span key={i} className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                {r.roleTitle} @ {r.clientName}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No suggested roles yet</p>
        )}
      </div>

      {/* Latest interaction snippet */}
      {latestNote && (
        <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-2">
          {latestNote.summary}
        </p>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
        <Link
          href={`/candidates/${candidateId}`}
          className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          View Profile
        </Link>
        <button
          onClick={() => setShowFuturePicker(true)}
          className="rounded border border-purple-300 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-50"
        >
          Move to Future
        </button>
      </div>

      {/* Follow-up date picker */}
      {showFuturePicker && (
        <div className="mt-2 flex items-center gap-2 rounded-md bg-purple-50 p-2.5">
          <label className="text-xs text-purple-700">Follow-up date:</label>
          <input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="rounded border border-purple-200 px-2 py-1 text-xs"
          />
          <button
            onClick={handleMoveToFuture}
            disabled={!followUpDate}
            className="rounded bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700 disabled:opacity-40"
          >
            Confirm
          </button>
          <button
            onClick={() => { setShowFuturePicker(false); setFollowUpDate('') }}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
