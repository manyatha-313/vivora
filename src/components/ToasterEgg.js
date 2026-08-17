'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { motivationalMessages } from '@/content/motivational'

function randomIndex(exclude) {
  if (motivationalMessages.length <= 1) return 0

  let i = exclude

  while (i === exclude) {
    i = Math.floor(Math.random() * motivationalMessages.length)
  }

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

    timerRef.current = setTimeout(() => {
      setPopped(false)
    }, 7000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">

      {/* Motivational Toast */}
      <AnimatePresence>
        {popped && (
          <motion.div
            key={index}
            initial={{
              y: 20,
              opacity: 0,
              scale: 0.8,
              rotate: -4,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={{
              y: 12,
              opacity: 0,
              scale: 0.85,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="relative w-52 aspect-square"
          >

            {/* Close button */}
            <button
              onClick={() => setPopped(false)}
              aria-label="Dismiss motivational toast"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] text-xs flex items-center justify-center shadow-sm hover:text-[var(--foreground)] z-10"
            >
              ✕
            </button>

            {/* Toast image */}
            <Image
              src="/images/toast.png"
              alt=""
              fill
              sizes="208px"
              className="object-contain drop-shadow-lg"
            />

            {/* Thought / motivational text */}
            <div className="absolute inset-0 flex items-center justify-center px-8 pt-4">
              <p
                className="text-center font-semibold leading-snug"
                style={{
                  fontSize: '13px',
                  color: '#3D2E1F',
                }}
              >
                {motivationalMessages[index]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toaster button */}
      <div className="relative self-end">

        {/* Hover message */}
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
          className="w-16 h-16 flex items-center justify-center hover:-translate-y-0.5 transition-transform"
        >
          <Image
            src="/images/toaster.png"
            alt="Toaster"
            width={64}
            height={64}
            className="w-full h-full object-contain drop-shadow-md"
          />
        </button>

      </div>
    </div>
  )
}