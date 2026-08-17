'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeSelector from './ThemeSelector'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  const isHome = pathname === '/'
  const isExplore = pathname === '/explore'

  const { scrollY } = useScroll()

  // On the homepage, the small navbar logo fades in
  // as the large logo reaches the navbar.
  const logoOpacity = useTransform(
    scrollY,
    [285, 350],
    [0, 1]
  )

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-[var(--foreground)] tracking-tight"
        >
          <motion.span
            id="navbar-logo-anchor"
            style={{
              opacity: isHome ? logoOpacity : 1,
            }}
          >
            Vivora
          </motion.span>
        </Link>


        {/* Desktop Navigation */}
        {!isHome && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--muted)]">

            <Link
              href="/"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Home
            </Link>

            {/* Don't show Explore when already on /explore */}
            {!isExplore && (
              <Link
                href="/explore"
                className="hover:text-[var(--foreground)] transition-colors"
              >
                Explore
              </Link>
            )}

          </nav>
        )}


        {/* Desktop Theme Selector */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeSelector />
        </div>


        {/* Mobile Menu Button */}
        {!isHome && (
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--surface-hover)] transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        )}


        {/* Theme Selector on Home - Mobile */}
        {isHome && (
          <div className="md:hidden">
            <ThemeSelector />
          </div>
        )}

      </div>


      {/* Mobile Navigation Menu */}
      {open && !isHome && (
        <div className="md:hidden border-t border-[var(--border)] px-5 py-4 flex flex-col gap-4 bg-[var(--background)]">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Home
          </Link>

          {/* Don't show Explore when already on /explore */}
          {!isExplore && (
            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Explore
            </Link>
          )}

        </div>
      )}
    </header>
  )
}