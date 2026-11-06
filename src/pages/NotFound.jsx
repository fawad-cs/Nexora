import { SearchX } from 'lucide-react'
import Button from '../components/common/Button'

function NotFound() {
  return (
    <section className="nx-container flex flex-col items-center py-20 text-center sm:py-28">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-nx-cyan/10 text-nx-cyan">
        <SearchX className="h-8 w-8" />
      </span>

      <p className="mt-6 bg-linear-to-r from-nx-cyan to-nx-blue bg-clip-text font-display text-8xl font-extrabold text-transparent">
        404
      </p>

      <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
        This page could not be found
      </h1>
      <p className="mt-3 max-w-md text-nx-muted">
        The page you are looking for may have moved or never existed. Let us get
        you back on track.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/" size="lg">
          Back to home
        </Button>
        <Button to="/shop" variant="outline" size="lg">
          Browse shop
        </Button>
      </div>
    </section>
  )
}

export default NotFound