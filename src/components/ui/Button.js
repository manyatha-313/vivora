import Link from 'next/link'

const variants = {
  primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
  secondary: 'bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-hover)]',
}

const sizes = {
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  href, children, variant = 'primary', size = 'md',
  type = 'button', onClick, disabled, className = '', ...props
}) {
  const classes = `inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return <Link href={href} className={classes} {...props}>{children}</Link>
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  )
}