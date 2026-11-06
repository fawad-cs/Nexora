import { Quote } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import RatingStars from '../product/RatingStars'

const testimonials = [
  {
    name: 'Hamza R.',
    role: 'Homeowner',
    product: 'Vault Fingerprint Smart Lock',
    rating: 5,
    quote:
      'Setup took ten minutes and the fingerprint reader has never missed. I can give my family access from my phone.',
  },
  {
    name: 'Sana K.',
    role: 'Apartment renter',
    product: 'Aurora Smart Bulb',
    rating: 5,
    quote:
      'No wiring, no tools. The scenes make my small apartment feel completely different in the evening.',
  },
  {
    name: 'Bilal A.',
    role: 'Small business owner',
    product: 'Sentinel 4K Outdoor Camera',
    rating: 4,
    quote:
      'The night footage is sharp and alerts arrive instantly. Great value compared with other brands I tried.',
  },
]

function Testimonials() {
  return (
    <section className="border-y border-nx-border bg-nx-surface/50">
      <div className="nx-container py-16 sm:py-20">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by smart homes"
          text="What our customers say after living with NEXORA."
        />

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl border border-nx-border bg-nx-card p-6"
            >
              <Quote className="h-8 w-8 text-nx-cyan/50" />

              <RatingStars rating={item.rating} className="mt-4" />

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-nx-text">
                {item.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-nx-border pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-nx-cyan to-nx-blue font-display font-bold text-nx-bg">
                  {item.name.charAt(0)}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-white">
                    {item.name}
                  </span>
                  <span className="block text-xs text-nx-muted">
                    {item.role} · {item.product}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials