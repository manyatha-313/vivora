export function H1({ children, className = '' }) {
  return <h1 className={`text-3xl sm:text-4xl font-bold leading-tight ${className}`}>{children}</h1>
}

export function H2({ children, className = '' }) {
  return <h2 className={`text-2xl sm:text-3xl font-bold ${className}`}>{children}</h2>
}

export function H3({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}