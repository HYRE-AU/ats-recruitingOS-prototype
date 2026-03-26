import type { Reminder } from '@/types'

export const mockReminders: Reminder[] = [
  // ── Future Candidate Proxy Dates ──────────────────────────────────
  {
    id: 'rem_001',
    type: 'proxy_date',
    candidateId: 'cand_012', // Lisa Chang — OpenAI
    submissionId: null,
    triggerDate: '2026-05-18T00:00:00Z',
    status: 'pending',
  },
  {
    id: 'rem_002',
    type: 'proxy_date',
    candidateId: 'cand_013', // Ryan Cooper — Atlassian
    submissionId: null,
    triggerDate: '2026-06-01T00:00:00Z',
    status: 'pending',
  },
  {
    id: 'rem_003',
    type: 'proxy_date',
    candidateId: 'cand_014', // Natasha Volkov — HashiCorp
    submissionId: null,
    triggerDate: '2026-04-15T00:00:00Z',
    status: 'pending',
  },
  {
    id: 'rem_004',
    type: 'proxy_date',
    candidateId: 'cand_015', // Alex Kim — Linear
    submissionId: null,
    triggerDate: '2026-05-01T00:00:00Z',
    status: 'pending',
  },

  // ── Stale Submission Reminders ────────────────────────────────────
  {
    id: 'rem_005',
    type: 'stale_submission',
    candidateId: null,
    submissionId: 'sub_002', // Aisha → Acme AI — Submitted, no movement
    triggerDate: '2026-03-11T10:00:00Z',
    status: 'fired',
  },
  {
    id: 'rem_006',
    type: 'stale_submission',
    candidateId: null,
    submissionId: 'sub_007', // Elena → LatticeFlow Staff ML — Submitted, no movement
    triggerDate: '2026-03-06T14:00:00Z',
    status: 'fired',
  },
  {
    id: 'rem_007',
    type: 'stale_submission',
    candidateId: null,
    submissionId: 'sub_006', // Chris → Northstar CS — Submitted, no movement
    triggerDate: '2026-03-20T11:00:00Z',
    status: 'fired',
  },
  {
    id: 'rem_008',
    type: 'stale_submission',
    candidateId: null,
    submissionId: 'sub_010', // Chris → Vanta GTM — Submitted, no movement
    triggerDate: '2026-03-21T14:00:00Z',
    status: 'pending',
  },

  // ── Follow-up Reminders ───────────────────────────────────────────
  {
    id: 'rem_009',
    type: 'follow_up',
    candidateId: 'cand_004', // Jordan — needs CV
    submissionId: null,
    triggerDate: '2026-03-25T09:00:00Z',
    status: 'pending',
  },
  {
    id: 'rem_010',
    type: 'follow_up',
    candidateId: 'cand_009', // Chris O'Brien — discuss Vanta role further
    submissionId: null,
    triggerDate: '2026-03-26T09:00:00Z',
    status: 'pending',
  },
]
