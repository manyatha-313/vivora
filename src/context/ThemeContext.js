'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)
const THEMES = ['system', 'light', 'dark', 'pink']

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('vivora-theme')
    if (stored && THEMES.includes(stored)) setTheme(stored)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    function applyTheme(t) {
      const resolved = t === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : t
      document.documentElement.setAttribute('data-theme', resolved)
    }

    applyTheme(theme)
    localStorage.setItem('vivora-theme', theme)

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = () => applyTheme('system')
      mq.addEventListener('change', listener)
      return () => mq.removeEventListener('change', listener)
    }
  }, [theme, mounted])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}