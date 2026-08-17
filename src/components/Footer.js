export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <p className="text-lg font-bold text-[var(--foreground)]">Vivora</p>
        <p className="text-sm text-[var(--muted)] mt-1">Healthcare discovery, made a little lighter.</p>
      </div>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-8">
        <p className="text-xs text-[var(--muted)] border-t border-[var(--border)] pt-4">
          Vivora is a healthcare discovery and booking-request prototype. Listings, prices and availability may be for demonstration purposes unless otherwise stated.
        </p>
      </div>
    </footer>
  )
}