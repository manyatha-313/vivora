'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function ConfirmPage() {
  const { code } = useParams()
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [booking, setBooking] = useState(null)
  const [offer, setOffer] = useState(null)
  const [hospital, setHospital] = useState(null)
  const [actionStatus, setActionStatus] = useState('idle') // idle | working

  useEffect(() => {
    async function load() {
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('id, offer_id, status, confirm_code, created_at')
        .eq('confirm_code', code)
        .single()

      if (bookingError || !bookingData) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setBooking(bookingData)

      const { data: offerData } = await supabase
        .from('offers')
        .select('*, hospitals(*)')
        .eq('id', bookingData.offer_id)
        .single()

      if (offerData) {
        setOffer(offerData)
        setHospital(offerData.hospitals)
      }

      setLoading(false)
    }

    if (code) load()
  }, [code])

  async function respond(newStatus) {
    setActionStatus('working')
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('confirm_code', code)

    if (error) {
      setActionStatus('idle')
      alert('Something went wrong: ' + error.message)
      return
    }

    setBooking((prev) => ({ ...prev, status: newStatus }))
    setActionStatus('idle')
  }

  if (loading) {
    return (
      <main className="max-w-md mx-auto p-6 sm:p-10 text-center">
        <p className="text-[var(--muted)]">Loading your booking...</p>
      </main>
    )
  }

  if (notFound) {
    return (
      <main className="max-w-md mx-auto p-6 sm:p-10 text-center">
        <p className="font-semibold">We couldn't find that booking.</p>
        <p className="text-sm text-[var(--muted)] mt-1">This link may be invalid or already used.</p>
      </main>
    )
  }

  const alreadyDecided = booking.status === 'confirmed' || booking.status === 'cancelled'

  return (
    <main className="max-w-md mx-auto p-6 sm:p-10">
      <Card className="text-center">
        {offer && hospital && (
          <>
            <h1 className="text-xl font-bold">{offer.service_name}</h1>
            <p className="text-sm text-[var(--muted)] mt-1">{hospital.name} — {hospital.city}</p>
            <div className="flex items-baseline justify-center gap-2 mt-3">
              <span className="line-through text-[var(--muted)] text-sm">₹{offer.original_price}</span>
              <span className="text-[var(--secondary)] font-bold text-lg">₹{offer.discounted_price}</span>
            </div>
          </>
        )}

        <div className="border-t border-[var(--border)] mt-5 pt-5">
          {booking.status === 'confirmed' && (
            <p className="text-[var(--secondary)] font-semibold">Booked ✓ — continue exploring if you wish.</p>
          )}
          {booking.status === 'cancelled' && (
            <p className="text-red-600 font-semibold">Booking cancelled.</p>
          )}
          {!alreadyDecided && (
            <>
              <p className="font-medium mb-4">Confirm this booking?</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => respond('confirmed')} disabled={actionStatus === 'working'}>
                  {actionStatus === 'working' ? 'Confirming...' : 'Confirm'}
                </Button>
                <Button onClick={() => respond('cancelled')} variant="secondary" disabled={actionStatus === 'working'}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>

        <p className="text-xs text-[var(--muted)] mt-6">
          This is a demonstration booking flow and does not confirm a real medical appointment.
        </p>
      </Card>
    </main>
  )
}