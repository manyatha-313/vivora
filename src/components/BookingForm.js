'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { QRCodeSVG } from 'qrcode.react'

export default function BookingForm({ offerId }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [confirmCode, setConfirmCode] = useState(null)
  const [bookingId, setBookingId] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

    setStatus('submitting')
    setErrorMsg('')

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        offer_id: offerId,
        name,
        phone,
        email,
        status: 'pending_payment',
      })
      .select('id, confirm_code')
      .single()

    if (error) {
      console.error('Booking error:', error)
      setStatus('error')
      setErrorMsg(error.message)
      return
    }

    console.log('Booking created:', data)

    setBookingId(data.id)
    setConfirmCode(data.confirm_code)
    setStatus('awaiting')
  }

  // Watch for confirmation/cancellation from the phone
  useEffect(() => {
    if (status !== 'awaiting' || !bookingId) {
      return
    }

    const channel = supabase
      .channel(`booking-${bookingId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: `id=eq.${bookingId}`,
        },
        (payload) => {
          console.log('Booking updated:', payload)

          if (payload.new.status === 'confirmed') {
            setStatus('confirmed')
          }

          if (payload.new.status === 'cancelled') {
            setStatus('cancelled')
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [status, bookingId])

  // Confirmed
  if (status === 'confirmed') {
    return (
      <p className="text-[var(--secondary)] text-sm mt-3 bg-[var(--surface-hover)] border border-[var(--border)] rounded-lg px-3 py-2">
        Booked ✓ — continue exploring if you wish.
      </p>
    )
  }

  // Cancelled
  if (status === 'cancelled') {
    return (
      <p className="text-red-600 text-sm mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
        Booking cancelled. Feel free to try again anytime.
      </p>
    )
  }

  // Waiting for phone confirmation
  if (status === 'awaiting' && confirmCode) {
    const confirmUrl = `${window.location.origin}/confirm/${confirmCode}`

    return (
      <div className="mt-3 flex flex-col items-center gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">

        <p className="text-sm font-medium text-[var(--foreground)]">
          Scan to confirm on your phone
        </p>

        <div className="bg-white p-3 rounded-xl">
          <QRCodeSVG
            value={confirmUrl}
            size={180}
          />
        </div>

        <p className="text-xs text-[var(--muted)] text-center">
          Scan this QR code with your phone to confirm or cancel your booking.
        </p>

      </div>
    )
  }

  // Booking form
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 flex flex-wrap gap-2"
    >
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="flex-1 min-w-[120px]"
      />

      <Input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="flex-1 min-w-[120px]"
      />

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 min-w-[140px]"
      />

      <Button
        type="submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Booking...' : 'Book This'}
      </Button>

      {status === 'error' && (
        <p className="text-red-600 text-sm w-full">
          Error: {errorMsg}
        </p>
      )}
    </form>
  )
}