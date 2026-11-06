import { Star } from 'lucide-react'

function RatingStars({ rating, reviews, className = '' }) {
  const rounded = Math.round(rating)

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      aria-label={`Rated ${rating} out of 5`}
    >
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`h-4 w-4 ${
              n <= rounded ? 'fill-amber-400 text-amber-400' : 'text-nx-border'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-white">{rating.toFixed(1)}</span>
      {reviews != null && (
        <span className="text-xs text-nx-muted">({reviews.toLocaleString()})</span>
      )}
    </div>
  )
}

export default RatingStars