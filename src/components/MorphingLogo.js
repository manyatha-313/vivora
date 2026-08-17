'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function MorphingLogo() {
  const { scrollY } = useScroll()
  const bigRef = useRef(null)

  const [target, setTarget] = useState({
    x: 0,
    y: 0,
    scale: 1,
  })

  useEffect(() => {
    function measure() {
      const bigEl = bigRef.current
      const navbarLogo = document.getElementById('navbar-logo-anchor')

      if (!bigEl || !navbarLogo) return

      const bigRect = bigEl.getBoundingClientRect()
      const smallRect = navbarLogo.getBoundingClientRect()

      setTarget({
        x:
          smallRect.left +
          smallRect.width / 2 -
          (bigRect.left + bigRect.width / 2),

        y:
          smallRect.top +
          smallRect.height / 2 -
          (bigRect.top + bigRect.height / 2),

        scale: smallRect.height / bigRect.height,
      })
    }

    measure()

    window.addEventListener('resize', measure)

    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Smoothly move from the large centered logo
  // directly into the navbar logo.
  const x = useTransform(
    scrollY,
    [0, 350],
    [0, target.x]
  )

  const y = useTransform(
    scrollY,
    [0, 350],
    [0, target.y]
  )

  const scale = useTransform(
    scrollY,
    [0, 350],
    [1, target.scale]
  )

  // Fade out the large logo only near the end.
  const opacity = useTransform(
    scrollY,
    [300, 350],
    [1, 0]
  )

  return (
    <motion.div
      ref={bigRef}
      style={{
        x,
        y,
        scale,
        opacity,
        transformOrigin: 'center center',
      }}
      className="fixed top-[130px] left-1/2 -translate-x-1/2 pointer-events-none z-[100] text-6xl sm:text-7xl font-bold text-[var(--foreground)] tracking-tight whitespace-nowrap"
    >
      Vivora
    </motion.div>
  )
}