'use client'

import { useState, useMemo } from 'react'
import type { Candidate, CandidateStatus } from '@/types'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import {
  STATUS_LABELS,
  STATUS_COLORS,
  STAGE_COLORS,
  CANDIDATE_STATUSES,
  formatDate,
} from '@/lib/utils'

export function CandidateHeader({ candidate }: { candidate: Candidate }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false)
  const [showFollowUpInput, setShowFollowUpInput] = useState(false)
  const [followUpDate, setFollowUpDate] = useState('')
  const updateCandidateStatus = useATSStore((s) => s.updateCandidateStatus)
  const submissions = useATSStore((s) => s.submissions)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)
  const { showToast } = useToast()

  const activeSubmissions = useMemo(() => {
    const terminal = new Set(['Rejected', 'Withdrawn'])
    return submissions
      .filter((s) => s.candidateId === candidate.id && !terminal.has(s.stage))
      .map((s) => {
        const role = roles.find((r) => r.id === s.roleId)
        const client = clients.find((c) => c.id === s.clientId)
        return {
          id: s.id,
          label: `${role?.title ?? 'Unknown'} at ${client?.name ?? 'Unknown'}`,
          stage: s.stage,
        }
      })
  }, [submissions, roles, clients, candidate.id])

  function handleStatusChange(status: CandidateStatus) {
    if (status === 'future_candidate') {
      setShowFollowUpInput(true)
      setShowStatusMenu(false)
      return
    }
    updateCandidateStatus(candidate.id, status)
    setShowStatusMenu(false)
    showToast(`Status updated to ${STATUS_LABELS[status]}`)
  }

  function handleFollowUpSubmit() {
    if (!followUpDate) return
    updateCandidateStatus(candidate.id, 'future_candidate', new Date(followUpDate).toISOString())
    setShowFollowUpInput(false)
    setFollowUpDate('')
    showToast('Status updated to Future Candidate')
  }

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-700">
            {candidate.fullName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-xl font-bold">{candidate.fullName}</h1>
            <p className="text-sm text-gray-500">{candidate.currentRoleAndCompany}</p>
            <p className="mt-0.5 text-sm text-gray-400">{candidate.location}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[candidate.status]}`}
          >
            {STATUS_LABELS[candidate.status]}
            <svg className="ml-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {showStatusMenu && (
            <div className="absolute right-0 z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              {CANDIDATE_STATUSES.filter((s) => s !== candidate.status).map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submission pills */}
      {activeSubmissions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {activeSubmissions.map((sub) => (
            <span
              key={sub.id}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STAGE_COLORS[sub.stage]}`}
            >
              {sub.label} — {sub.stage}
            </span>
          ))}
        </div>
      )}

      {showFollowUpInput && (
        <div className="mt-3 flex items-center gap-2 rounded-md bg-purple-50 p-3">
          <label className="text-sm text-purple-700">Follow-up date:</label>
          <input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="rounded border border-purple-200 px-2 py-1 text-sm"
          />
          <button
            onClick={handleFollowUpSubmit}
            className="rounded bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
          >
            Confirm
          </button>
          <button
            onClick={() => setShowFollowUpInput(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <a href={`mailto:${candidate.email}`} className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          {candidate.email}
        </a>
        <a href={`tel:${candidate.mobile}`} className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          {candidate.mobile}
        </a>
        <a href={candidate.linkedInUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <div className="flex items-center gap-1.5 text-gray-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          {candidate.cvFileName ? (
            <span className="text-green-700">{candidate.cvFileName}</span>
          ) : (
            <span className="text-gray-400">No CV uploaded</span>
          )}
        </div>
        {candidate.latestScreenDate && (
          <span className="text-gray-400">
            Screened {formatDate(candidate.latestScreenDate)}
          </span>
        )}
        {candidate.followUpDate && (
          <span className="text-purple-600">
            Follow-up: {formatDate(candidate.followUpDate)}
          </span>
        )}
      </div>
    </div>
  )
}
