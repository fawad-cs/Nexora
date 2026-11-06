import { Sparkles, ShieldCheck, Tag } from 'lucide-react'
import Button from '../components/common/Button'
import { products } from '../data/products'
import { categories } from '../data/categories'

const stats = [
  { value: products.length, label: 'Smart devices' },
  { value: categories.length, label: 'Product categories' },
  { value: '30 days', label: 'Easy returns' },
  { value: 'Up to 2 yrs', label: 'Warranty' },
]

const values = [
  {
    icon: Sparkles,
    title: 'Design that disappears',
    text: 'Our devices look good on a shelf or a door and fade into the background when you do not need them.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy first',
    text: 'Encrypted connections and clear controls, so you always decide what is stored and who can see it.',
  },
  {
    icon: Tag,
    title: 'Honest pricing',
    text: 'You see the real price and the previous price. No hidden fees, no surprises at checkout.',
  },
]

function About() {
  return (
    <>
      <section className="border-b border-nx-border bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_55%)]">
        <div className="nx-container py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nx-cyan">
            About NEXORA
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            We make smart homes that feel{' '}
            <span className="bg-linear-to-r from-nx-cyan to-nx-blue bg-clip-text text-transparent">
              effortless.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-nx-muted">
            NEXORA is a store for people who want a connected home without the
            complicated setup. We pick devices that look great, work together
            and are simple enough for the whole family to use.
          </p>
        </div>
      </section>

      <section className="nx-container py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-nx-muted">
            <h2 className="font-display text-3xl font-bold text-white">
              Our story
            </h2>
            <p className="leading-relaxed">
              Too many smart home products ask you to become a technician. We
              wanted the opposite: devices you can unbox, plug in and forget
              about, until they quietly make your day easier.
            </p>
            <p className="leading-relaxed">
              Every product in our range is chosen for build quality, honest
              specifications and support you can actually reach. From lights and
              cameras to locks, speakers, thermostats and sensors, everything is
              designed to work as one system.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-nx-border bg-nx-card p-6"
              >
                <dt className="text-sm text-nx-muted">{item.label}</dt>
                <dd className="mt-2 font-display text-3xl font-bold text-nx-cyan">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-nx-border bg-nx-surface/50">
        <div className="nx-container py-16 sm:py-20">
          <h2 className="font-display text-3xl font-bold text-white">
            What we stand for
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-6">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-nx-border bg-nx-card p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-nx-cyan/10 text-nx-cyan">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-nx-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nx-container py-16 sm:py-20">
        <div className="rounded-3xl border border-nx-border bg-nx-card px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to upgrade your home?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-nx-muted">
            Browse the full range, or get in touch if you need help choosing the
            right devices.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/shop" size="lg">
              Shop now
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default About