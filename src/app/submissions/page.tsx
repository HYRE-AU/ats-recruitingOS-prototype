'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import type { PipelineStage } from '@/types'
import {
  STAGE_COLORS,
  PIPELINE_STAGES,
  formatDate,
  daysSince,
} from '@/lib/utils'

const STALE_THRESHOLD = 7

export default function SubmissionsPage() {
  const submissions = useATSStore((s) => s.submissions)
  const candidates = useATSStore((s) => s.candidates)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)

  const [clientFilter, setClientFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [staleOnly, setStaleOnly] = useState(false)

  const nonTerminalStages = useMemo(
    () => new Set<string>(['Submitted', '1st Interview', '2nd Interview', 'Final Interview', 'Offer']),
    []
  )

  // Distinct clients/roles that appear in submissions for filter dropdowns
  const filterClients = useMemo(() => {
    const ids = new Set(submissions.map((s) => s.clientId))
    return clients.filter((c) => ids.has(c.id)).sort((a, b) => a.name.localeCompare(b.name))
  }, [submissions, clients])

  const filterRoles = useMemo(() => {
    let pool = submissions
    if (clientFilter) pool = pool.filter((s) => s.clientId === clientFilter)
    const ids = new Set(pool.map((s) => s.roleId))
    return roles.filter((r) => ids.has(r.id)).sort((a, b) => a.title.localeCompare(b.title))
  }, [submissions, roles, clientFilter])

  const filtered = useMemo(() => {
    let result = [...submissions]
    if (clientFilter) result = result.filter((s) => s.clientId === clientFilter)
    if (roleFilter) result = result.filter((s) => s.roleId === roleFilter)
    if (stageFilter) result = result.filter((s) => s.stage === stageFilter)
    if (staleOnly) {
      result = result.filter(
        (s) => nonTerminalStages.has(s.stage) && daysSince(s.lastUpdatedAt) >= STALE_THRESHOLD
      )
    }
    result.sort((a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime())
    return result
  }, [submissions, clientFilter, roleFilter, stageFilter, staleOnly, nonTerminalStages])

  const activeFilterCount = [clientFilter, roleFilter, stageFilter].filter(Boolean).length + (staleOnly ? 1 : 0)

  function clearFilters() {
    setClientFilter('')
    setRoleFilter('')
    setStageFilter('')
    setStaleOnly(false)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold">Submissions</h1>
      <p className="mt-1 text-sm text-gray-500">{submissions.length} total submissions</p>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select
          value={clientFilter}
          onChange={(e) => { setClientFilter(e.target.value); setRoleFilter('') }}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700"
        >
          <option value="">All Clients</option>
          {filterClients.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700"
        >
          <option value="">All Roles</option>
          {filterRoles.map((r) => (
            <option key={r.id} value={r.id}>{r.title}</option>
          ))}
        </select>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700"
        >
          <option value="">All Stages</option>
          {PIPELINE_STAGES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 select-none">
          <input
            type="checkbox"
            checked={staleOnly}
            onChange={(e) => setStaleOnly(e.target.checked)}
            className="rounded border-gray-300"
          />
          Stale only (7+ days)
        </label>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-indigo-600 hover:underline"
          >
            Clear filters
          </button>
        )}

        <span className="ml-auto text-xs text-gray-400">{filtered.length} showing</span>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-400">No submissions match these filters.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Candidate</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Stage</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Last Updated</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((sub) => {
                const candidate = candidates.find((c) => c.id === sub.candidateId)
                const role = roles.find((r) => r.id === sub.roleId)
                const client = clients.find((c) => c.id === sub.clientId)
                const stale = nonTerminalStages.has(sub.stage) && daysSince(sub.lastUpdatedAt) >= STALE_THRESHOLD

                return (
                  <SubmissionRow
                    key={sub.id}
                    submissionId={sub.id}
                    candidateName={candidate?.fullName ?? 'Unknown'}
                    candidateId={sub.candidateId}
                    clientName={client?.name ?? ''}
                    roleTitle={role?.title ?? ''}
                    roleId={sub.roleId}
                    stage={sub.stage}
                    lastUpdatedAt={sub.lastUpdatedAt}
                    isStale={stale}
                  />
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function SubmissionRow({
  submissionId,
  candidateName,
  candidateId,
  clientName,
  roleTitle,
  roleId,
  stage,
  lastUpdatedAt,
  isStale,
}: {
  submissionId: string
  candidateName: string
  candidateId: string
  clientName: string
  roleTitle: string
  roleId: string
  stage: PipelineStage
  lastUpdatedAt: string
  isStale: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [selectedStage, setSelectedStage] = useState<PipelineStage>(stage)
  const [note, setNote] = useState('')
  const updateSubmissionStage = useATSStore((s) => s.updateSubmissionStage)
  const { showToast } = useToast()

  function handleSave() {
    if (selectedStage === stage) { setEditing(false); return }
    updateSubmissionStage(submissionId, selectedStage, note)
    setEditing(false)
    setNote('')
    showToast(`Stage updated to ${selectedStage}`)
  }

  const days = daysSince(lastUpdatedAt)

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3">
          <Link href={`/candidates/${candidateId}`} className="text-sm font-medium text-indigo-600 hover:underline">
            {candidateName}
          </Link>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{clientName}</td>
        <td className="px-4 py-3">
          <Link href={`/roles/${roleId}`} className="text-sm text-gray-700 hover:text-indigo-600">
            {roleTitle}
          </Link>
        </td>
        <td className="px-4 py-3">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STAGE_COLORS[stage]}`}>
            {stage}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-sm text-gray-500">{formatDate(lastUpdatedAt)}</span>
          {isStale && (
            <span className="ml-1.5 text-xs font-medium text-red-600">({days}d)</span>
          )}
        </td>
        <td className="px-4 py-3">
          <button
            onClick={() => { setEditing(!editing); setSelectedStage(stage) }}
            className="rounded border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            {editing ? 'Cancel' : 'Update'}
          </button>
        </td>
      </tr>
      {editing && (
        <tr className="bg-gray-50">
          <td colSpan={6} className="px-4 py-3">
            <div className="flex items-center gap-2">
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value as PipelineStage)}
                className="rounded border border-gray-300 px-2 py-1.5 text-sm"
              >
                {PIPELINE_STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="flex-1 rounded border border-gray-300 px-2 py-1.5 text-sm"
              />
              <button
                onClick={handleSave}
                disabled={selectedStage === stage}
                className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
              >
                Save
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
