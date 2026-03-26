'use client'

import { useState } from 'react'
import { OverviewTab } from './OverviewTab'
import { InteractionsTab } from './InteractionsTab'
import { SuggestedRolesTab } from './SuggestedRolesTab'
import { SubmittedTab } from './SubmittedTab'
import { NotesTab } from './NotesTab'

const TABS = ['Overview', 'Interactions', 'Suggested Roles', 'Submitted', 'Notes'] as const
type Tab = (typeof TABS)[number]

export function CandidateTabs({ candidateId }: { candidateId: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 pb-3 pt-1 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-5">
        {activeTab === 'Overview' && <OverviewTab candidateId={candidateId} />}
        {activeTab === 'Interactions' && <InteractionsTab candidateId={candidateId} />}
        {activeTab === 'Suggested Roles' && <SuggestedRolesTab candidateId={candidateId} />}
        {activeTab === 'Submitted' && <SubmittedTab candidateId={candidateId} />}
        {activeTab === 'Notes' && <NotesTab candidateId={candidateId} />}
      </div>
    </div>
  )
}
