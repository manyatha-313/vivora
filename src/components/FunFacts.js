'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { facts } from '@/content/facts'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { H2 } from '@/components/ui/Heading'

function randomIndex(exclude) {
  if (facts.length <= 1) return 0
  let i = exclude
  while (i === exclude) i = Math.floor(Math.random() * facts.length)
  return i
}

export default function FunFacts() {
  const [index, setIndex] = useState(0)
  const [spin, setSpin] = useState(false)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * facts.length))
  }, [])

  function nextFact() {
    setIndex((prev) => randomIndex(prev))
    setSpin(true)
    setTimeout(() => setSpin(false), 400)
  }

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center">
        <H2>While you're here...</H2>
        <p className="text-[var(--muted)] mt-2 text-sm">Randomly useful. Occasionally ridiculous.</p>

        <Card className="mt-8 py-8 relative overflow-hidden">
          <Sparkles
            size={18}
            className={`absolute top-4 right-4 text-[var(--primary)] transition-transform duration-300 ${spin ? 'rotate-180 scale-125' : ''}`}
          />
          <p className="text-lg font-medium min-h-[3.5rem] flex items-center justify-center px-4">
            {facts[index]}
          </p>
        </Card>

        <Button onClick={nextFact} variant="secondary" className="mt-5">
          Another one →
        </Button>
      </div>
    </section>
  )
}