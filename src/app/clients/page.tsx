'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useATSStore } from '@/store'

export default function ClientsPage() {
  const clients = useATSStore((s) => s.clients)
  const roles = useATSStore((s) => s.roles)

  const [search, setSearch] = useState('')

  const rows = useMemo(() => {
    let result = clients.map((c) => ({
      client: c,
      activeRoleCount: roles.filter((r) => r.clientId === c.id && r.status === 'active').length,
    }))
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((r) => r.client.name.toLowerCase().includes(q))
    }
    return result.sort((a, b) => a.client.name.localeCompare(b.client.name))
  }, [clients, roles, search])

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold">Clients</h1>
      <p className="mt-1 text-sm text-gray-500">{clients.length} clients</p>

      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-indigo-600 hover:underline">
            Clear
          </button>
        )}
        <span className="ml-auto text-xs text-gray-400">{rows.length} showing</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-400">No clients match your search.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Industry</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Active Roles</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map(({ client, activeRoleCount }) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/clients/${client.id}`} className="text-sm font-medium text-indigo-600 hover:underline">
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{client.industry}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{client.size}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{activeRoleCount}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{client.primaryContactName}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${client.primaryContactEmail}`} className="text-sm text-gray-500 hover:text-indigo-600">
                      {client.primaryContactEmail}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
