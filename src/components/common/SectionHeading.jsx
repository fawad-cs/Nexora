import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function SectionHeading({ eyebrow, title, text, linkTo, linkLabel }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nx-cyan">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>
        {text && <p className="mt-3 text-nx-muted">{text}</p>}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-nx-cyan transition hover:text-white"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

export default SectionHeading