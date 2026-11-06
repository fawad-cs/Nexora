import { Link } from 'react-router-dom'

function Logo({ onClick, className = '' }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="NEXORA home"
      className={`flex items-center gap-2.5 ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-nx-cyan to-nx-blue shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-nx-bg"
          aria-hidden="true"
        >
          <path
            d="M5 19V5l14 14V5"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-bold tracking-[0.18em] text-white">
          NEXORA
        </span>
        <span className="mt-1 hidden text-[10px] uppercase tracking-[0.28em] text-nx-muted sm:block">
          Smart Living
        </span>
      </span>
    </Link>
  )
}

export default Logo