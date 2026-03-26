'use client'

import { useMemo } from 'react'
import { useATSStore } from '@/store'
import { STATUS_LABELS, STATUS_COLORS, formatDate } from '@/lib/utils'
import Link from 'next/link'

export function OverviewTab({ candidateId }: { candidateId: string }) {
  const candidates = useATSStore((s) => s.candidates)
  const suggestedMatches = useATSStore((s) => s.suggestedMatches)
  const roles = useATSStore((s) => s.roles)
  const clients = useATSStore((s) => s.clients)
  const interactions = useATSStore((s) => s.interactions)

  const candidate = useMemo(() => candidates.find((c) => c.id === candidateId), [candidates, candidateId])
  const suggestions = useMemo(() => suggestedMatches.filter((s) => s.candidateId === candidateId), [suggestedMatches, candidateId])
  const screenSummary = useMemo(
    () => interactions.find((i) => i.candidateId === candidateId && i.type === 'screen_summary'),
    [interactions, candidateId]
  )
  const activeSuggestions = useMemo(
    () => suggestions.filter((s) => s.status === 'suggested' || s.status === 'discussed'),
    [suggestions]
  )

  if (!candidate) return null

  return (
    <div className="space-y-6">
      {/* Screen Summary */}
      {screenSummary && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900">Screen Summary</h3>
          <div className="mt-1 whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
            {screenSummary.summary}
          </div>
        </section>
      )}

      {/* Profile Details */}
      <div className="grid grid-cols-2 gap-6">
        <DetailField label="Compensation" value={candidate.compensationExpectations} />
        <DetailField label="Location Preferences" value={candidate.locationPreferences} />
        <DetailField label="Role Preferences" value={candidate.rolePreferences} />
        <DetailField label="Deal Breakers" value={candidate.dealBreakers} />
        <DetailField label="Soft Factors" value={candidate.softFactors} />
      </div>

      {/* Skills */}
      {candidate.keySkills.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900">Key Skills</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {candidate.keySkills.map((skill) => (
              <span key={skill} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Tags */}
      {candidate.tagList.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900">Tags</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {candidate.tagList.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Suggested Roles Preview */}
      {activeSuggestions.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900">Suggested Roles</h3>
          <div className="mt-2 space-y-2">
            {activeSuggestions.slice(0, 3).map((sug) => {
              const role = roles.find((r) => r.id === sug.roleId)
              const client = role ? clients.find((c) => c.id === role.clientId) : undefined
              if (!role) return null
              return (
                <div key={sug.id} className="flex items-center justify-between rounded-md bg-blue-50 px-3 py-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">{role.title}</span>
                    <span className="text-gray-500"> at {client?.name}</span>
                  </div>
                  <Link href={`/roles/${role.id}`} className="text-xs text-indigo-600 hover:underline">
                    View Role
                  </Link>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Status & Dates */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900">Status</h3>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[candidate.status]}`}>
            {STATUS_LABELS[candidate.status]}
          </span>
          {candidate.latestScreenDate && (
            <span className="text-sm text-gray-500">
              Screened: {formatDate(candidate.latestScreenDate)}
            </span>
          )}
          {candidate.followUpDate && (
            <span className="text-sm text-purple-600">
              Follow-up: {formatDate(candidate.followUpDate)}
            </span>
          )}
          {candidate.futureStatedTimeframe && (
            <span className="text-sm text-gray-500">
              ({candidate.futureStatedTimeframe})
            </span>
          )}
        </div>
      </section>
    </div>
  )
}

function DetailField({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div>
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-gray-700">{value}</dd>
    </div>
  )
}
