import { supabase } from '@/lib/supabase'
import BookingForm from '@/components/BookingForm'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { H1, H3 } from '@/components/ui/Heading'

export default async function ServiceDetail({ params }) {
  const { id } = await params

  const { data: offer, error } = await supabase
    .from('offers')
    .select('*, hospitals(*)')
    .eq('id', id)
    .single()

  if (error || !offer) {
    return (
      <main className="max-w-2xl mx-auto p-6 sm:p-10">
        <p className="text-red-600">Couldn't find that service.</p>
        <Button href="/explore" variant="secondary">← Back to Explore</Button>
      </main>
    )
  }

  const hospital = offer.hospitals

  return (
    <main className="max-w-2xl mx-auto p-6 sm:p-10">
      <Button href="/explore" variant="secondary">← Back to Explore</Button>

      <div className="w-full h-48 sm:h-64 rounded-2xl bg-[var(--surface-hover)] mt-4 flex items-center justify-center text-[var(--muted)] text-sm">
        Photos coming soon
      </div>

      <h1 className="text-2xl font-bold mt-6">{offer.service_name}</h1>
      <p className="text-[var(--muted)] mt-1">{hospital?.name} — {hospital?.city}</p>

      <div className="flex items-baseline gap-2 mt-4">
        <span className="line-through text-[var(--muted)]">₹{offer.original_price}</span>
        <span className="text-[var(--secondary)] font-bold text-xl">₹{offer.discounted_price}</span>
      </div>

      {offer.description && (
        <p className="text-[var(--foreground)] mt-4">{offer.description}</p>
      )}

      <div className="border-t border-[var(--border)] mt-6 pt-6">
        <h2 className="font-semibold mb-1">About this location</h2>
        {hospital?.address && <p className="text-sm text-[var(--muted)]">{hospital.address}</p>}
        {hospital?.phone && <p className="text-sm text-[var(--muted)]">{hospital.phone}</p>}
        {hospital?.description && <p className="text-sm text-[var(--foreground)] mt-2">{hospital.description}</p>}
      </div>

      <div className="border-t border-[var(--border)] mt-6 pt-6">
        <h2 className="font-semibold mb-2">Request this booking</h2>
        <p className="text-sm text-[var(--muted)] mb-3">No account needed. We'll just use these details to process your request.</p>
        <BookingForm offerId={offer.id} />
      </div>
    </main>
  )
}