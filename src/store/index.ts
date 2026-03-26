import { create } from 'zustand'
import type {
  Client,
  Role,
  Candidate,
  Interaction,
  SuggestedMatch,
  Submission,
  Reminder,
  PipelineStage,
  SuggestionStatus,
  CandidateStatus,
} from '@/types'
import { mockClients } from '../../mock/clients'
import { mockRoles } from '../../mock/roles'
import { mockCandidates } from '../../mock/candidates'
import { mockInteractions } from '../../mock/interactions'
import { mockSuggestedMatches } from '../../mock/suggestedMatches'
import { mockSubmissions } from '../../mock/submissions'
import { mockReminders } from '../../mock/reminders'

interface ATSState {
  // Data
  clients: Client[]
  roles: Role[]
  candidates: Candidate[]
  interactions: Interaction[]
  suggestedMatches: SuggestedMatch[]
  submissions: Submission[]
  reminders: Reminder[]

  // Actions
  updateCandidateStatus: (candidateId: string, status: CandidateStatus, followUpDate?: string) => void
  updateSubmissionStage: (submissionId: string, stage: PipelineStage, note?: string) => void
  updateSuggestionStatus: (suggestionId: string, status: SuggestionStatus) => void
  addInteraction: (interaction: Interaction) => void
  addSubmission: (submission: Submission) => void
  addCandidate: (candidate: Candidate) => void
  addRole: (role: Role) => void
  addSuggestedMatches: (matches: SuggestedMatch[]) => void
}

export const useATSStore = create<ATSState>((set) => ({
  // Data - initialized from mock
  clients: mockClients,
  roles: mockRoles,
  candidates: mockCandidates,
  interactions: mockInteractions,
  suggestedMatches: mockSuggestedMatches,
  submissions: mockSubmissions,
  reminders: mockReminders,

  // Actions
  updateCandidateStatus: (candidateId, status, followUpDate) =>
    set((state) => ({
      candidates: state.candidates.map((c) =>
        c.id === candidateId
          ? { ...c, status, followUpDate: followUpDate ?? c.followUpDate }
          : c
      ),
    })),

  updateSubmissionStage: (submissionId, stage, note) =>
    set((state) => ({
      submissions: state.submissions.map((s) => {
        if (s.id !== submissionId) return s
        const now = new Date().toISOString()
        return {
          ...s,
          stage,
          lastUpdatedAt: now,
          stageHistory: [
            ...s.stageHistory,
            {
              fromStage: s.stage,
              toStage: stage,
              changedAt: now,
              note: note ?? '',
            },
          ],
        }
      }),
    })),

  updateSuggestionStatus: (suggestionId, status) =>
    set((state) => ({
      suggestedMatches: state.suggestedMatches.map((s) =>
        s.id === suggestionId ? { ...s, status } : s
      ),
    })),

  addInteraction: (interaction) =>
    set((state) => ({
      interactions: [...state.interactions, interaction],
      candidates: state.candidates.map((c) =>
        c.id === interaction.candidateId
          ? { ...c, interactionIds: [...c.interactionIds, interaction.id] }
          : c
      ),
    })),

  addSubmission: (submission) =>
    set((state) => ({
      submissions: [...state.submissions, submission],
      candidates: state.candidates.map((c) =>
        c.id === submission.candidateId
          ? {
              ...c,
              status: 'active_submitted' as CandidateStatus,
              submissionIds: [...c.submissionIds, submission.id],
            }
          : c
      ),
      roles: state.roles.map((r) =>
        r.id === submission.roleId
          ? { ...r, submissionIds: [...r.submissionIds, submission.id] }
          : r
      ),
    })),

  addCandidate: (candidate) =>
    set((state) => ({ candidates: [...state.candidates, candidate] })),

  addRole: (role) =>
    set((state) => ({
      roles: [...state.roles, role],
      clients: state.clients.map((c) =>
        c.id === role.clientId
          ? { ...c, roleIds: [...c.roleIds, role.id] }
          : c
      ),
    })),

  addSuggestedMatches: (matches) =>
    set((state) => ({
      suggestedMatches: [...state.suggestedMatches, ...matches],
    })),
}))
