'use client'

import { useState, useMemo } from 'react'
import { useATSStore } from '@/store'
import { useToast } from '@/components/Toast'
import { formatDateTime } from '@/lib/utils'

export function NotesTab({ candidateId }: { candidateId: string }) {
  const candidates = useATSStore((s) => s.candidates)
  const interactions = useATSStore((s) => s.interactions)
  const addInteraction = useATSStore((s) => s.addInteraction)
  const { showToast } = useToast()
  const [noteText, setNoteText] = useState('')

  const candidate = useMemo(() => candidates.find((c) => c.id === candidateId), [candidates, candidateId])
  const notes = useMemo(
    () =>
      interactions
        .filter((i) => i.candidateId === candidateId && i.type === 'recruiter_note')
        .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()),
    [interactions, candidateId]
  )

  function handleAddNote() {
    if (!noteText.trim()) return
    addInteraction({
      id: `int_new_${Date.now()}`,
      candidateId,
      type: 'recruiter_note',
      title: 'Recruiter Note',
      summary: noteText.trim().slice(0, 100) + (noteText.length > 100 ? '...' : ''),
      body: noteText.trim(),
      occurredAt: new Date().toISOString(),
    })
    setNoteText('')
    showToast('Note added')
  }

  return (
    <div className="space-y-6">
      {/* CV Card */}
      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-900">CV / Documents</h3>
        <div className="mt-2">
          {candidate?.cvFileName ? (
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <span className="text-sm text-gray-700">{candidate.cvFileName}</span>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No CV uploaded.</p>
          )}
          <button className="mt-2 rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
            Upload CV (mock)
          </button>
        </div>
      </section>

      {/* Add Note */}
      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-900">Add Note</h3>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a note..."
          rows={3}
          className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddNote}
          disabled={!noteText.trim()}
          className="mt-2 rounded bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
        >
          Add Note
        </button>
      </section>

      {/* Existing Notes */}
      {notes.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Notes</h3>
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{note.title}</span>
                  <span className="text-xs text-gray-400">{formatDateTime(note.occurredAt)}</span>
                </div>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-600">
                  {note.body}
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
