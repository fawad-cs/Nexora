import { Minus, Plus } from 'lucide-react'

function QuantitySelector({ value, onChange, min = 1, max = 10, size = 'md' }) {
  const small = size === 'sm'

  const buttonClasses = `flex h-full items-center justify-center text-white transition hover:text-nx-cyan disabled:cursor-not-allowed disabled:opacity-40 ${
    small ? 'w-9' : 'w-11'
  }`

  return (
    <div
      className={`inline-flex items-center rounded-full border border-nx-border bg-nx-surface ${
        small ? 'h-9' : 'h-11'
      }`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className={buttonClasses}
      >
        <Minus className="h-4 w-4" />
      </button>

      <span
        className="min-w-8 text-center text-sm font-semibold text-white"
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className={buttonClasses}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

export default QuantitySelector