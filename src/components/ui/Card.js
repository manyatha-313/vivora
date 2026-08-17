export default function Card({ children, hover = false, className = '', ...props }) {
  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 shadow-sm ${hover ? 'hover:-translate-y-1 hover:shadow-md transition-all' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}