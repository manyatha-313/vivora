export default function LoadingService() {
  return (
    <main className="max-w-2xl mx-auto p-6 sm:p-10">
      <div className="h-9 w-36 bg-[var(--surface-hover)] rounded-full animate-pulse" />
      <div className="w-full h-48 sm:h-64 rounded-2xl bg-[var(--surface-hover)] mt-4 animate-pulse" />
      <div className="h-8 w-2/3 bg-[var(--surface-hover)] rounded animate-pulse mt-6" />
      <div className="h-4 w-1/3 bg-[var(--surface-hover)] rounded animate-pulse mt-2" />
      <div className="h-6 w-1/4 bg-[var(--surface-hover)] rounded animate-pulse mt-4" />
    </main>
  )
}