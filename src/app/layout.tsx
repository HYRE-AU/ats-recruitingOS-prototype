import type { Metadata } from 'next'
import './globals.css'
import { LeftNav } from '@/components/LeftNav'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Perfectly ATS',
  description: 'Applicant Tracking System for agency recruiters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <LeftNav />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
