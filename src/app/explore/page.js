import { supabase } from '@/lib/supabase'
import ExploreView from '@/components/ExploreView'
import { H1 } from '@/components/ui/Heading'

export const metadata = {
  title: 'Explore',
}
export default async function Explore() {
  const { data: hospitals, error } = await supabase
    .from('hospitals')
    .select('*, offers(*)')

  if (error) {
    return <div className="p-10 text-red-600">Error loading data: {error.message}</div>
  }

  return (
    <main className="max-w-5xl mx-auto p-6 sm:p-10">
      <H1 className="mb-1">Find what you need.</H1>
      <p className="text-[var(--muted)] mb-8">Browse hospitals, clinics and services available through Vivora.</p>
      <ExploreView hospitals={hospitals} />
    </main>
  )
}