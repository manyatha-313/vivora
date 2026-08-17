'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import { Search, X } from 'lucide-react'

export default function ExploreView({ hospitals }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return hospitals

    const q = query.toLowerCase()

    return hospitals
      .map((hospital) => {
        const hospitalMatches =
          hospital.name.toLowerCase().includes(q) ||
          hospital.city.toLowerCase().includes(q) ||
          (hospital.address || '').toLowerCase().includes(q)

        const matchingOffers = hospital.offers.filter((offer) =>
          offer.service_name.toLowerCase().includes(q)
        )

        if (hospitalMatches) return hospital
        if (matchingOffers.length > 0) return { ...hospital, offers: matchingOffers }
        return null
      })
      .filter(Boolean)
  }, [hospitals, query])

  return (
    <div>
      <div className="relative mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hospitals, services, clinics..."
          className="w-full pl-11 pr-10 py-3.5 rounded-full"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-semibold">Hmm... Vivora couldn't find that one.</p>
          <p className="text-sm text-[var(--muted)] mt-1">Try a hospital name, service, or city.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((hospital) => (
            <div key={hospital.id} className="border border-[var(--border)] rounded-2xl p-5 shadow-sm bg-[var(--surface)]">
              <h2 className="text-xl font-semibold">{hospital.name}</h2>
              <p className="text-sm text-[var(--muted)]">{hospital.city} — {hospital.address}</p>
              {hospital.description && (
                <p className="text-[var(--foreground)] mt-2 text-sm">{hospital.description}</p>
              )}

              {hospital.offers.map((offer) => (
                <Link
                  key={offer.id}
                  href={`/service/${offer.id}`}
                  className="block mt-4 pt-4 border-t border-[var(--border)] hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-semibold">{offer.service_name}</span>
                    <span className="line-through text-[var(--muted)] text-sm">₹{offer.original_price}</span>
                    <span className="text-[var(--secondary)] font-bold">₹{offer.discounted_price}</span>
                  </div>
                  {offer.description && (
                    <p className="text-sm text-[var(--muted)] mt-1">{offer.description}</p>
                  )}
                  <span className="text-sm text-[var(--primary)] font-medium mt-2 inline-block">View details →</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}