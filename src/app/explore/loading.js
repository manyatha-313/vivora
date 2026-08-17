export default function LoadingExplore() {
  return (
    <main className="max-w-5xl mx-auto p-6 sm:p-10">
      <div className="h-8 w-56 bg-[var(--surface-hover)] rounded-lg animate-pulse mb-2" />
      <div className="h-4 w-80 bg-[var(--surface-hover)] rounded-lg animate-pulse mb-8" />
      <div className="h-14 w-full bg-[var(--surface-hover)] rounded-full animate-pulse mb-8" />

      <div className="grid sm:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-[var(--border)] rounded-2xl p-5 bg-[var(--surface)]">
            <div className="h-6 w-2/3 bg-[var(--surface-hover)] rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-[var(--surface-hover)] rounded animate-pulse mb-4" />
            <div className="h-4 w-full bg-[var(--surface-hover)] rounded animate-pulse mb-1" />
            <div className="h-4 w-2/3 bg-[var(--surface-hover)] rounded animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  )
}