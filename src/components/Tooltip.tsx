'use client'

import { useState, useRef, useCallback } from 'react'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  width?: string
}

export function Tooltip({ content, children, width = 'w-80' }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const showTimer = useRef<ReturnType<typeof setTimeout>>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const show = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    showTimer.current = setTimeout(() => setVisible(true), 300)
  }, [])

  const hide = useCallback(() => {
    if (showTimer.current) clearTimeout(showTimer.current)
    hideTimer.current = setTimeout(() => setVisible(false), 150)
  }, [])

  return (
    <span className="relative inline-block" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div
          className={`absolute left-0 top-full z-30 mt-1.5 ${width} rounded-lg border border-gray-200 bg-white p-3 shadow-lg`}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {content}
        </div>
      )}
    </span>
  )
}
