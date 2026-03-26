'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import { Tooltip } from '@/components/Tooltip'
import type { Role, Client, SuggestedMatch, Submission } from '@/types'
import { formatDate, ROLE_STATUS_LABELS, ROLE_STATUS_COLORS } from '@/lib/utils'

const MOCK_TITLES = [
  'Data Platform Engineer',
  'Head of Design',
  'Senior iOS Engineer',
  'VP of Engineering',
  'Growth Marketing Lead',
  'DevOps Engineer',
  'Principal Architect',
  'People Operations Lead',
]

interface PipelineCounts {
  submitted: number
  interviewing: number
  offer: number
  placed: number
}

function getPipelineCounts(subs: Submission[]): PipelineCounts {
  let submitted = 0, interviewing = 0, offer = 0, placed = 0
  for (const s of subs) {
    switch (s.stage) {
      case 'Submitted': submitted++; break
      case '1st Interview': case '2nd Interview': case 'Final Interview': interviewing++; break
      case 'Offer': offer++; break
      case 'Placed': placed++; break
    }
  }
  return { submitted, interviewing, offer, placed }
}

export default function RolesPage() {
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)
  const submissions = useATSStore((s) => s.submissions)
  const candidates = useATSStore((s) => s.candidates)
  const addRole = useATSStore((s) => s.addRole)
  const addSuggestedMatches = useATSStore((s) => s.addSuggestedMatches)
  const { showToast } = useToast()

  const [statusFilter, setStatusFilter] = useState('')
  const [clientFilter, setClientFilter] = useState('')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let result = roles.map((r) => {
      const roleSubs = submissions.filter(
        (s) => s.roleId === r.id && s.stage !== 'Rejected' && s.stage !== 'Withdrawn'
      )
      return {
        role: r,
        client: clients.find((c) => c.id === r.clientId),
        pipeline: getPipelineCounts(roleSubs),
        totalActive: roleSubs.length,
      }
    })
    if (statusFilter) result = result.filter((r) => r.role.status === statusFilter)
    if (clientFilter) result = result.filter((r) => r.role.clientId === clientFilter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((r) => r.role.title.toLowerCase().includes(q))
    }
    result.sort((a, b) => new Date(b.role.createdAt).getTime() - new Date(a.role.createdAt).getTime())
    return result
  }, [roles, clients, submissions, statusFilter, clientFilter, search])

  function handleAddMockRole() {
    const title = MOCK_TITLES[Math.floor(Math.random() * MOCK_TITLES.length)]
    const client = clients[Math.floor(Math.random() * clients.length)]
    const roleId = `role_mock_${Date.now()}`

    const role: Role = {
      id: roleId,
      clientId: client.id,
      title,
      status: 'active',
      location: 'Remote (US)',
      compensation: '$150k–$200k + equity',
      summary: `New ${title} role at ${client.name}. This is a mock role created for prototype testing.`,
      mustHaves: '3+ years relevant experience, strong communication skills',
      niceToHaves: 'Startup experience, distributed team experience',
      hiringTimeline: '3-4 weeks',
      urgency: 'medium',
      interviewProcess: 'Recruiter screen → Technical → Team fit → Offer',
      sellingPoints: 'Fast-growing team, competitive comp, high impact',
      createdAt: new Date().toISOString(),
      suggestedCandidateIds: [],
      submissionIds: [],
    }

    addRole(role)

    const pool = candidates.filter(
      (c) => c.status === 'active_no_roles' || c.status === 'future_candidate'
    )
    const picked = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(3, pool.length))
    const suggestions: SuggestedMatch[] = picked.map((c) => ({
      id: `sug_mock_${Date.now()}_${c.id}`,
      candidateId: c.id,
      roleId,
      rationale: `${c.fullName} has relevant experience as ${c.currentTitle} at ${c.currentCompany}. Profile aligns with ${title} requirements.`,
      score: 60 + Math.floor(Math.random() * 30),
      confidence: Math.random() > 0.5 ? 'moderate' : 'strong',
      status: 'suggested',
    }))
    if (suggestions.length > 0) addSuggestedMatches(suggestions)

    showToast(`Mock role added: ${title} at ${client.name}`)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Roles</h1>
          <p className="mt-1 text-sm text-gray-500">{roles.length} roles</p>
        </div>
        <button
          onClick={handleAddMockRole}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + Add Mock Role
        </button>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-52 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="on_hold">On Hold</option>
          <option value="filled">Filled</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700"
        >
          <option value="">All Clients</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {(statusFilter || clientFilter || search) && (
          <button
            onClick={() => { setStatusFilter(''); setClientFilter(''); setSearch('') }}
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
          <p className="px-4 py-8 text-center text-sm text-gray-400">No roles match these filters.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Comp</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Pipeline</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(({ role, client, pipeline, totalActive }) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Tooltip content={<RoleTooltip role={role} />} width="w-96">
                      <Link href={`/roles/${role.id}`} className="text-sm font-medium text-indigo-600 hover:underline">
                        {role.title}
                      </Link>
                    </Tooltip>
                  </td>
                  <td className="px-4 py-3">
                    {client && (
                      <Tooltip content={<ClientTooltip client={client} />} width="w-72">
                        <Link href={`/clients/${client.id}`} className="text-sm text-gray-700 hover:text-indigo-600">
                          {client.name}
                        </Link>
                      </Tooltip>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_STATUS_COLORS[role.status]}`}>
                      {ROLE_STATUS_LABELS[role.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{role.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{role.compensation}</td>
                  <td className="px-4 py-3">
                    <PipelineCell pipeline={pipeline} total={totalActive} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(role.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function PipelineCell({ pipeline, total }: { pipeline: PipelineCounts; total: number }) {
  if (total === 0) {
    return <span className="text-xs text-gray-300">No candidates</span>
  }

  const segments: { label: string; count: number; color: string }[] = []
  if (pipeline.submitted > 0) segments.push({ label: 'Submitted', count: pipeline.submitted, color: 'text-blue-700' })
  if (pipeline.interviewing > 0) segments.push({ label: 'Interviewing', count: pipeline.interviewing, color: 'text-violet-700' })
  if (pipeline.offer > 0) segments.push({ label: 'Offer', count: pipeline.offer, color: 'text-amber-700' })
  if (pipeline.placed > 0) segments.push({ label: 'Placed', count: pipeline.placed, color: 'text-green-700' })

  return (
    <span className="text-xs">
      {segments.map((seg, i) => (
        <span key={seg.label}>
          {i > 0 && <span className="text-gray-300"> · </span>}
          <span className={seg.color}>{seg.count} {seg.label}</span>
        </span>
      ))}
    </span>
  )
}

function RoleTooltip({ role }: { role: Role }) {
  return (
    <div className="space-y-2 text-xs">
      <div>
        <p className="font-medium text-gray-900">Summary</p>
        <p className="mt-0.5 leading-relaxed text-gray-600 line-clamp-3">{role.summary}</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">Must-Haves</p>
        <p className="mt-0.5 leading-relaxed text-gray-600 line-clamp-3">{role.mustHaves}</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">Selling Points</p>
        <p className="mt-0.5 leading-relaxed text-gray-600 line-clamp-3">{role.sellingPoints}</p>
      </div>
    </div>
  )
}

function ClientTooltip({ client }: { client: Client }) {
  return (
    <div className="space-y-1.5 text-xs">
      <p className="font-medium text-gray-900">{client.name}</p>
      <div className="flex items-center gap-3 text-gray-500">
        <span>{client.industry}</span>
        <span className="text-gray-300">|</span>
        <span>{client.size} employees</span>
      </div>
      {client.blurb && (
        <p className="leading-relaxed text-gray-600">{client.blurb}</p>
      )}
    </div>
  )
}
