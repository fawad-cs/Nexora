import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-nx-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nx-bg'

const variants = {
  primary: 'bg-nx-cyan text-nx-bg hover:bg-white',
  outline:
    'border border-nx-border text-white hover:border-nx-cyan hover:text-nx-cyan',
  ghost: 'text-nx-muted hover:text-white',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

function Button({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-50`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button