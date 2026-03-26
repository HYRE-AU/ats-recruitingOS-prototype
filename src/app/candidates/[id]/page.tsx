'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useATSStore } from '@/store'
import { CandidateHeader } from '@/components/candidate/CandidateHeader'
import { CandidateTabs } from '@/components/candidate/CandidateTabs'
import Link from 'next/link'

export default function CandidateDetailPage() {
  const { id } = useParams<{ id: string }>()
  const candidates = useATSStore((s) => s.candidates)
  const candidate = useMemo(() => candidates.find((c) => c.id === id), [candidates, id])

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500">Candidate not found.</p>
        <Link href="/candidates" className="mt-2 text-sm text-indigo-600 hover:underline">
          Back to Candidates
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/candidates" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Candidates
      </Link>
      <CandidateHeader candidate={candidate} />
      <CandidateTabs candidateId={candidate.id} />
    </div>
  )
}
