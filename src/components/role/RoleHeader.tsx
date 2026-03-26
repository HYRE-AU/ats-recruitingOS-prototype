'use client'

import Link from 'next/link'
import type { Role } from '@/types'
import {
  formatDate,
  ROLE_STATUS_LABELS,
  ROLE_STATUS_COLORS,
  URGENCY_LABELS,
  URGENCY_COLORS,
} from '@/lib/utils'

interface RoleHeaderProps {
  role: Role
  clientName: string
  clientId: string
}

export function RoleHeader({ role, clientName, clientId }: RoleHeaderProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{role.title}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <Link href={`/clients/${clientId}`} className="font-medium text-indigo-600 hover:underline">
              {clientName}
            </Link>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_STATUS_COLORS[role.status]}`}>
              {ROLE_STATUS_LABELS[role.status]}
            </span>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">
          <p>Created {formatDate(role.createdAt)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <Detail icon={LocationIcon} value={role.location} />
        <Detail icon={CurrencyIcon} value={role.compensation} />
        <Detail icon={ClockIcon} value={role.hiringTimeline} label="Timeline" />
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400">Urgency:</span>
          <span className={`font-medium ${URGENCY_COLORS[role.urgency]}`}>
            {URGENCY_LABELS[role.urgency]}
          </span>
        </div>
      </div>
    </div>
  )
}

function Detail({ icon: Icon, value, label }: { icon: () => React.ReactNode; value: string; label?: string }) {
  return (
    <div className="flex items-center gap-1.5 text-gray-600">
      <Icon />
      {label && <span className="text-gray-400">{label}:</span>}
      <span>{value}</span>
    </div>
  )
}

function LocationIcon() {
  return (
    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  )
}

function CurrencyIcon() {
  return (
    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}
