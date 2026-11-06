import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Thermometer,
  Lock,
  Video,
  Sparkles,
} from 'lucide-react'
import Button from '../common/Button'

const perks = [
  { icon: Truck, title: 'Free shipping', text: 'On orders over $99' },
  { icon: ShieldCheck, title: '2-year warranty', text: 'On every device' },
  { icon: RotateCcw, title: '30-day returns', text: 'No questions asked' },
]

function StatusChip({ icon: Icon, label, value, className = '' }) {
  return (
    <div
      className={`absolute flex items-center gap-3 rounded-2xl border border-nx-border bg-nx-surface/90 px-3 py-2.5 shadow-xl backdrop-blur sm:px-4 sm:py-3 ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-nx-cyan/10 text-nx-cyan">
        <Icon className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] text-nx-muted">{label}</span>
        <span className="block text-sm font-semibold text-white">{value}</span>
      </span>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* peeche ki halki roshni */}
      <div className="absolute inset-[12%] rounded-full bg-nx-cyan/20 blur-3xl" />

      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        role="img"
        aria-label="NEXORA smart thermostat"
      >
        <defs>
          <linearGradient id="nx-hero-device" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16284a" />
            <stop offset="100%" stopColor="#09111f" />
          </linearGradient>
          <linearGradient id="nx-hero-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* ghere */}
        <circle cx="200" cy="200" r="190" fill="none" stroke="#1a2a47" strokeWidth="1" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#1a2a47" strokeWidth="1" strokeDasharray="4 8" />

        {/* device ka dhancha */}
        <rect
          x="105"
          y="105"
          width="190"
          height="190"
          rx="56"
          fill="url(#nx-hero-device)"
          stroke="#22d3ee"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <rect
          x="117"
          y="117"
          width="166"
          height="166"
          rx="46"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.06"
        />

        {/* temperature ki ring */}
        <circle cx="200" cy="200" r="56" fill="none" stroke="#1a2a47" strokeWidth="10" />
        <circle
          cx="200"
          cy="200"
          r="56"
          fill="none"
          stroke="url(#nx-hero-ring)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="260 352"
          transform="rotate(-210 200 200)"
        />

        <text
          x="200"
          y="212"
          textAnchor="middle"
          fontSize="34"
          fontWeight="700"
          fill="#ffffff"
          fontFamily="Sora, sans-serif"
        >
          22°
        </text>
        <text
          x="200"
          y="236"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="2.5"
          fill="#8ea2c0"
          fontFamily="Inter, sans-serif"
        >
          COMFORT
        </text>

        <ellipse cx="200" cy="335" rx="95" ry="9" fill="#22d3ee" opacity="0.15" />
      </svg>

      <StatusChip
        icon={Thermometer}
        label="Living room"
        value="22°C, auto"
        className="left-0 top-[10%]"
      />
      <StatusChip
        icon={Lock}
        label="Front door"
        value="Locked"
        className="right-0 top-[46%]"
      />
      <StatusChip
        icon={Video}
        label="Cameras"
        value="4 online"
        className="bottom-[6%] left-[4%]"
      />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-nx-border bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_55%)]">
      <div className="nx-container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-8 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-nx-border bg-nx-surface px-4 py-1.5 text-xs font-medium text-nx-cyan">
            <Sparkles className="h-3.5 w-3.5" />
            New: NEXORA Smart Series 2026
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            The home that{' '}
            <span className="bg-linear-to-r from-nx-cyan to-nx-blue bg-clip-text text-transparent">
              thinks ahead.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-nx-muted sm:text-lg">
            Premium smart lights, cameras, door locks, speakers and thermostats,
            designed to work together and set up in minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/shop" size="lg">
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/shop?category=lights" variant="outline" size="lg">
              Browse Smart Lights
            </Button>
          </div>

          <ul className="mt-10 grid gap-4 border-t border-nx-border pt-8 sm:grid-cols-3">
            {perks.map((perk) => (
              <li key={perk.title} className="flex items-center gap-3">
                <perk.icon className="h-6 w-6 shrink-0 text-nx-cyan" />
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-white">
                    {perk.title}
                  </span>
                  <span className="block text-xs text-nx-muted">{perk.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}

export default Hero