'use client'

import Link from 'next/link'

interface DashboardCardProps {
  title: string
  href?: string
  count?: number
  children: React.ReactNode
}

export function DashboardCard({ title, href, count, children }: DashboardCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          {count !== undefined && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {count}
            </span>
          )}
        </div>
        {href && (
          <Link href={href} className="text-xs text-indigo-600 hover:underline">
            View all
          </Link>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
