'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import { formatDate, daysUntil, STATUS_LABELS } from '@/lib/utils'

export default function FutureCandidatesPage() {
  const candidates = useATSStore((s) => s.candidates)

  const pool = useMemo(() => {
    const future = candidates.filter((c) => c.status === 'future_candidate')
    return future.sort((a, b) => {
      const aOverdue = a.followUpDate ? daysUntil(a.followUpDate) < 0 : false
      const bOverdue = b.followUpDate ? daysUntil(b.followUpDate) < 0 : false
      // Overdue pinned to top
      if (aOverdue && !bOverdue) return -1
      if (!aOverdue && bOverdue) return 1
      // Then sort by date ascending (soonest first)
      if (!a.followUpDate) return 1
      if (!b.followUpDate) return -1
      return new Date(a.followUpDate).getTime() - new Date(b.followUpDate).getTime()
    })
  }, [candidates])

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">Future Candidates</h1>
      <p className="mt-1 text-sm text-gray-500">
        {pool.length} candidate{pool.length !== 1 ? 's' : ''} — not looking now, follow up later
      </p>

      {pool.length === 0 ? (
        <p className="mt-8 text-center text-sm text-gray-400">No future candidates.</p>
      ) : (
        <div className="mt-5 space-y-4">
          {pool.map((c) => (
            <FutureCandidateCard
              key={c.id}
              candidateId={c.id}
              fullName={c.fullName}
              currentTitle={c.currentTitle}
              currentCompany={c.currentCompany}
              latestScreenDate={c.latestScreenDate}
              futureStatedTimeframe={c.futureStatedTimeframe}
              followUpDate={c.followUpDate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FutureCandidateCard({
  candidateId,
  fullName,
  currentTitle,
  currentCompany,
  latestScreenDate,
  futureStatedTimeframe,
  followUpDate,
}: {
  candidateId: string
  fullName: string
  currentTitle: string
  currentCompany: string
  latestScreenDate: string | null
  futureStatedTimeframe: string | null
  followUpDate: string | null
}) {
  const updateCandidateStatus = useATSStore((s) => s.updateCandidateStatus)
  const { showToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [newDate, setNewDate] = useState(followUpDate ? followUpDate.slice(0, 10) : '')

  const days = followUpDate ? daysUntil(followUpDate) : null
  const isOverdue = days !== null && days < 0

  function handleMoveToActive() {
    updateCandidateStatus(candidateId, 'active_submitted')
    showToast(`${fullName} moved to ${STATUS_LABELS.active_submitted}`)
  }

  function handleMoveToNoRoles() {
    updateCandidateStatus(candidateId, 'active_no_roles')
    showToast(`${fullName} moved to ${STATUS_LABELS.active_no_roles}`)
  }

  function handleSaveDate() {
    if (!newDate) return
    updateCandidateStatus(candidateId, 'future_candidate', new Date(newDate).toISOString())
    setEditing(false)
    showToast('Follow-up date updated')
  }

  return (
    <div className={`rounded-lg border bg-white p-4 ${isOverdue ? 'border-red-200' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/candidates/${candidateId}`}
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              {fullName}
            </Link>
            {isOverdue && (
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                Overdue — Ready to Re-engage
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-gray-500">
            {currentTitle} at {currentCompany}
          </p>
        </div>
      </div>

      {/* Timeline details */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs">
        {latestScreenDate && (
          <span className="text-gray-400">Screened {formatDate(latestScreenDate)}</span>
        )}
        {futureStatedTimeframe && (
          <span className="text-gray-500">
            Stated: <span className="font-medium">{futureStatedTimeframe}</span>
          </span>
        )}
        {followUpDate && (
          <span className={isOverdue ? 'font-medium text-red-600' : 'text-purple-600'}>
            Follow-up: {formatDate(followUpDate)}
          </span>
        )}
        {days !== null && (
          <span className={`font-medium ${isOverdue ? 'text-red-600' : days <= 7 ? 'text-amber-600' : 'text-gray-500'}`}>
            {isOverdue
              ? `Overdue by ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''}`
              : `${days} day${days !== 1 ? 's' : ''} away`}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
        <Link
          href={`/candidates/${candidateId}`}
          className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          View Profile
        </Link>
        <button
          onClick={() => { setEditing(!editing); setNewDate(followUpDate ? followUpDate.slice(0, 10) : '') }}
          className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          Edit Follow-Up
        </button>
        <button
          onClick={handleMoveToActive}
          className="rounded bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
        >
          Move to Active
        </button>
        <button
          onClick={handleMoveToNoRoles}
          className="rounded border border-amber-300 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50"
        >
          Move to Active No Roles
        </button>
      </div>

      {/* Inline date editor */}
      {editing && (
        <div className="mt-2 flex items-center gap-2 rounded-md bg-purple-50 p-2.5">
          <label className="text-xs text-purple-700">New follow-up date:</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="rounded border border-purple-200 px-2 py-1 text-xs"
          />
          <button
            onClick={handleSaveDate}
            disabled={!newDate}
            className="rounded bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700 disabled:opacity-40"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
