'use client'

import { ActiveRolesPipeline } from '@/components/dashboard/ActiveRolesPipeline'
import { UpcomingScreenings } from '@/components/dashboard/UpcomingScreenings'
import { ActiveNoRolesModule } from '@/components/dashboard/ActiveNoRolesModule'
import { FutureCandidatesModule } from '@/components/dashboard/FutureCandidatesModule'
import { WaitingOnClient } from '@/components/dashboard/WaitingOnClient'

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Morning operating snapshot</p>

      <div className="mt-6 space-y-5">
        {/* Row 1: full width */}
        <ActiveRolesPipeline />

        {/* Row 2: two columns */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <WaitingOnClient />
          <UpcomingScreenings />
        </div>

        {/* Row 3: two columns */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ActiveNoRolesModule />
          <FutureCandidatesModule />
        </div>
      </div>
    </div>
  )
}
