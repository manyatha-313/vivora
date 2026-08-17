'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Monitor, Sun, Moon, Flower2 } from 'lucide-react'

const OPTIONS = [
  { id: 'system', label: 'System', Icon: Monitor },
  { id: 'light', label: 'Light', Icon: Sun },
  { id: 'dark', label: 'Dark', Icon: Moon },
  { id: 'pink', label: 'Pink', Icon: Flower2 },
]

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = OPTIONS.find((o) => o.id === theme) || OPTIONS[0]
  const CurrentIcon = current.Icon

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
        aria-expanded={open}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors text-[var(--foreground)]"
      >
        <CurrentIcon size={16} strokeWidth={2} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg p-1.5 flex flex-col gap-0.5 z-50">
          {OPTIONS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setTheme(id); setOpen(false) }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left transition-colors ${
                theme === id
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold'
                  : 'text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}