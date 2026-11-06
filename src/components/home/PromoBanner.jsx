import { ArrowRight } from 'lucide-react'
import Button from '../common/Button'

function PromoBanner() {
  return (
    <section className="nx-container py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-nx-border bg-linear-to-br from-nx-blue/25 via-nx-surface to-nx-cyan/15 px-6 py-12 sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-nx-cyan/15 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nx-cyan">
              Smart Home Sale
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Build your smart home for less
            </h2>
            <p className="mt-4 max-w-xl text-nx-muted">
              Save up to 27% on selected lights, cameras, locks and more. Prices
              are already reduced, no code needed.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/shop" size="lg">
                Shop the Sale
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/shop?category=cameras" variant="outline" size="lg">
                Security Cameras
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full border border-nx-cyan/40 bg-nx-bg/60 text-center sm:h-56 sm:w-56">
              <span className="text-sm text-nx-muted">Up to</span>
              <span className="font-display text-6xl font-extrabold text-white">
                27%
              </span>
              <span className="text-sm font-semibold uppercase tracking-widest text-nx-cyan">
                Off
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner