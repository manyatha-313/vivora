'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { motivationalMessages } from '@/content/motivational'

function randomIndex(exclude) {
  if (motivationalMessages.length <= 1) return 0
  let i = exclude
  while (i === exclude) i = Math.floor(Math.random() * motivationalMessages.length)
  return i
}

export default function ToasterEgg() {
  const [popped, setPopped] = useState(false)
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const timerRef = useRef(null)

  function handleClick() {
    setIndex((prev) => randomIndex(prev))
    setPopped(true)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setPopped(false), 6000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-center">
      <AnimatePresence>
        {popped && (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0, scale: 0.7, rotate: -6 }}
            animate={{ y: -90, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="absolute bottom-0"
          >
            <ToastSlice message={motivationalMessages[index]} onClose={() => setPopped(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {hovered && !popped && (
          <div className="absolute bottom-full mb-2 right-0 whitespace-nowrap bg-[var(--foreground)] text-[var(--background)] text-xs font-medium px-3 py-1.5 rounded-full">
            Click to check out a Motiva-Toast
          </div>
        )}

        <button
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Get a motivational toast"
          className="w-16 h-16 rounded-2xl overflow-hidden shadow-md hover:-translate-y-0.5 transition-transform"
        >
          <Image src="/images/toaster.jpg" alt="Toaster" width={64} height={64} className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  )
}

function ToastSlice({ message, onClose }) {
  return (
    <div className="relative w-48">
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] text-xs flex items-center justify-center shadow-sm hover:text-[var(--foreground)] z-10"
      >
        ✕
      </button>

      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
        <Image src="/images/toast.jpg" alt="Toast" fill className="object-cover" />

        <div className="absolute inset-0 flex items-center justify-center p-5">
          <p
            className="text-center font-semibold leading-snug"
            style={{
              fontSize: '12px',
              color: '#4A3B28',
              textShadow: '0 1px 2px rgba(255,255,255,0.6)',
            }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}