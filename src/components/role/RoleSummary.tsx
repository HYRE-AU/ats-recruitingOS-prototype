'use client'

import type { Role } from '@/types'

export function RoleSummary({ role }: { role: Role }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-gray-900">Role Summary</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{role.summary}</p>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Section title="Must-Haves" content={role.mustHaves} />
        <Section title="Nice-to-Haves" content={role.niceToHaves} />
        <Section title="Interview Process" content={role.interviewProcess} />
        <Section title="Selling Points" content={role.sellingPoints} />
      </div>
    </div>
  )
}

function Section({ title, content }: { title: string; content: string }) {
  if (!content) return null

  const items = content.includes(',')
    ? content.split(',').map((s) => s.trim()).filter(Boolean)
    : null

  return (
    <div>
      <h3 className="text-xs font-medium uppercase text-gray-500">{title}</h3>
      {items ? (
        <ul className="mt-1.5 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1.5 text-sm text-gray-700">{content}</p>
      )}
    </div>
  )
}
