'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function BookingForm({ offerId }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    const { error } = await supabase.from('bookings').insert({
      offer_id: offerId,
      name,
      phone,
      email,
    })

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-[var(--secondary)] text-sm mt-3 bg-[var(--surface-hover)] border border-[var(--border)] rounded-lg px-3 py-2">
        Booking request sent! We'll contact you shortly.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-wrap gap-2">
      <Input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="flex-1 min-w-[120px]" />
      <Input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="flex-1 min-w-[120px]" />
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 min-w-[140px]" />
      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Booking...' : 'Book This'}
      </Button>
      {status === 'error' && <p className="text-red-600 text-sm w-full">Error: {errorMsg}</p>}
    </form>
  )
}