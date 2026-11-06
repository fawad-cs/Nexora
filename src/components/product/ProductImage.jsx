import { useState } from 'react'

const accents = ['#22d3ee', '#3b82f6', '#a78bfa', '#34d399']

function Illustration({ category, accent }) {
  switch (category) {
    case 'lights':
      return (
        <g>
          <circle cx="100" cy="86" r="66" fill={accent} opacity="0.1" />
          <path
            d="M100 40c-24 0-44 19-44 43 0 15 7 26 16 35 4 4 6 8 6 13v6h44v-6c0-5 2-9 6-13 9-9 16-20 16-35 0-24-20-43-44-43z"
            fill="#0b1830"
            stroke={accent}
            strokeWidth="2.5"
          />
          <path
            d="M88 118l8-26 4 10 4-10 8 26"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="78" y="137" width="44" height="9" rx="3" fill="#16284a" stroke={accent} strokeOpacity="0.6" />
          <rect x="82" y="149" width="36" height="9" rx="3" fill="#16284a" stroke={accent} strokeOpacity="0.6" />
          <rect x="91" y="161" width="18" height="8" rx="4" fill="#16284a" stroke={accent} strokeOpacity="0.6" />
        </g>
      )

    case 'cameras':
      return (
        <g>
          <ellipse cx="100" cy="160" rx="62" ry="8" fill={accent} opacity="0.12" />
          <rect x="34" y="68" width="14" height="68" rx="5" fill="#16284a" stroke={accent} strokeOpacity="0.6" />
          <rect x="48" y="80" width="98" height="44" rx="14" fill="#0b1830" stroke={accent} strokeWidth="2.5" />
          <circle cx="132" cy="102" r="21" fill="#06101f" stroke={accent} strokeWidth="2.5" />
          <circle cx="132" cy="102" r="10" fill={accent} opacity="0.85" />
          <circle cx="128" cy="98" r="3" fill="#ffffff" opacity="0.9" />
          <circle cx="66" cy="102" r="3.5" fill="#34d399" />
        </g>
      )

    case 'locks':
      return (
        <g>
          <rect x="64" y="34" width="72" height="132" rx="18" fill="#0b1830" stroke={accent} strokeWidth="2.5" />
          <circle cx="100" cy="62" r="12" fill="none" stroke={accent} strokeWidth="2.5" />
          <circle cx="100" cy="62" r="4" fill={accent} />
          {[96, 114, 132].map((y) =>
            [82, 100, 118].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill={accent} opacity="0.8" />
            ))
          )}
          <rect x="86" y="147" width="28" height="6" rx="3" fill="#16284a" />
        </g>
      )

    case 'speakers':
      return (
        <g>
          <ellipse cx="100" cy="162" rx="50" ry="9" fill={accent} opacity="0.14" />
          <path
            d="M56 72v80c0 7 20 13 44 13s44-6 44-13V72z"
            fill="#0b1830"
            stroke={accent}
            strokeWidth="2.5"
          />
          <ellipse cx="100" cy="72" rx="44" ry="12" fill="#16284a" stroke={accent} strokeWidth="2.5" />
          <ellipse cx="100" cy="72" rx="14" ry="4" fill={accent} opacity="0.9" />
          {[98, 112, 126, 140].map((y) => (
            <path
              key={y}
              d={`M60 ${y}q40 10 80 0`}
              fill="none"
              stroke={accent}
              strokeOpacity="0.35"
              strokeWidth="2"
            />
          ))}
        </g>
      )

    case 'thermostats':
      return (
        <g>
          <rect x="46" y="46" width="108" height="108" rx="32" fill="#0b1830" stroke={accent} strokeWidth="2.5" />
          <circle cx="100" cy="100" r="32" fill="none" stroke="#1a2a47" strokeWidth="7" />
          <circle
            cx="100"
            cy="100"
            r="32"
            fill="none"
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="140 201"
            transform="rotate(-210 100 100)"
          />
          <text
            x="100"
            y="108"
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill="#ffffff"
            fontFamily="Sora, sans-serif"
          >
            22°
          </text>
        </g>
      )

    case 'sensors':
      return (
        <g>
          <circle cx="100" cy="100" r="48" fill="#0b1830" stroke={accent} strokeWidth="2.5" />
          <circle cx="100" cy="100" r="31" fill="#06101f" stroke={accent} strokeOpacity="0.5" />
          <circle cx="100" cy="100" r="12" fill={accent} opacity="0.9" />
          <path d="M150 72a58 58 0 0 1 0 56" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M162 58a78 78 0 0 1 0 84" fill="none" stroke={accent} strokeOpacity="0.28" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )

    default:
      return null
  }
}

function ProductImage({ product, className = '' }) {
  const [failed, setFailed] = useState(false)
  const accent = accents[product.id % accents.length]
  const showPhoto = product.image && !failed

  return (
    <div
      className={`relative overflow-hidden bg-linear-to-br from-nx-card to-nx-surface ${className}`}
    >
      {showPhoto ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.14),transparent_62%)]" />
          <svg
            viewBox="0 0 200 200"
            role="img"
            aria-label={product.name}
            className="relative h-full w-full p-4 sm:p-6"
          >
            <Illustration category={product.category} accent={accent} />
          </svg>
        </>
      )}
    </div>
  )
}

export default ProductImage