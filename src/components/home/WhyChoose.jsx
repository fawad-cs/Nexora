import { Zap, Wifi, Lock, Headphones, Truck, RotateCcw } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'

const reasons = [
  {
    icon: Zap,
    title: 'Set up in minutes',
    text: 'Plug in, scan and go. Most devices are ready in under ten minutes.',
  },
  {
    icon: Wifi,
    title: 'Works with your ecosystem',
    text: 'Compatible with Alexa, Google Home and Apple Home on supported devices.',
  },
  {
    icon: Lock,
    title: 'Privacy by design',
    text: 'Encrypted connections and clear controls, so you decide what is stored.',
  },
  {
    icon: Headphones,
    title: 'Real human support',
    text: 'Friendly help seven days a week from people who know the products.',
  },
  {
    icon: Truck,
    title: 'Free shipping',
    text: 'Free delivery on every order over $99.',
  },
  {
    icon: RotateCcw,
    title: '30-day returns',
    text: 'Not happy with it? Send it back within 30 days for a refund.',
  },
]

function WhyChoose() {
  return (
    <section className="border-y border-nx-border bg-nx-surface/50">
      <div className="nx-container py-16 sm:py-20">
        <SectionHeading
          eyebrow="Why NEXORA"
          title="Smart living, made simple"
          text="We design every device to be easy to install, easy to use and built to last."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-nx-border bg-nx-card p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-nx-cyan/10 text-nx-cyan">
                <reason.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-nx-muted">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose