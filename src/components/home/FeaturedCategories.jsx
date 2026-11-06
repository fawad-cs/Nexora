import { Link } from 'react-router-dom'
import {
  Lightbulb,
  Video,
  Lock,
  Speaker,
  Thermometer,
  Activity,
  ArrowRight,
} from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import { categories } from '../../data/categories'

const icons = {
  lights: Lightbulb,
  cameras: Video,
  locks: Lock,
  speakers: Speaker,
  thermostats: Thermometer,
  sensors: Activity,
}

function FeaturedCategories() {
  return (
    <section className="nx-container py-16 sm:py-20">
      <SectionHeading
        eyebrow="Categories"
        title="Shop by category"
        text="Everything you need to build a connected home, one room at a time."
        linkTo="/shop"
        linkLabel="View all products"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
        {categories.map((category) => {
          const Icon = icons[category.slug]

          return (
            <Link
              key={category.slug}
              to={`/shop?category=${category.slug}`}
              className="group flex flex-col rounded-2xl border border-nx-border bg-nx-card p-5 transition hover:border-nx-cyan sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-nx-cyan/10 text-nx-cyan transition group-hover:bg-nx-cyan group-hover:text-nx-bg">
                <Icon className="h-6 w-6" />
              </span>

              <h3 className="mt-5 font-display text-base font-semibold text-white sm:text-lg">
                {category.name}
              </h3>

              <p className="mt-2 flex-1 text-xs leading-relaxed text-nx-muted sm:text-sm">
                {category.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-nx-cyan">
                Shop now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default FeaturedCategories