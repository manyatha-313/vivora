export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`border border-[var(--border)] bg-[var(--surface)] rounded-lg px-3.5 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow ${className}`}
      {...props}
    />
  )
}