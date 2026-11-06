import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send } from 'lucide-react'
import Button from '../components/common/Button'
import FormField from '../components/common/FormField'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emptyForm = { name: '', email: '', subject: '', message: '' }

// Ye sample details hain, live karne se pehle apni asli details likh dena
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@nexora.example',
    href: 'mailto:support@nexora.example',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 010-0199',
    href: 'tel:+15550100199',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '100 Innovation Way, San Francisco, CA',
  },
  {
    icon: Clock,
    label: 'Support hours',
    value: 'Mon to Sat, 9:00 am to 6:00 pm',
  },
]

function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }
  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (values.subject.trim().length < 3) {
    errors.subject = 'Please enter a subject.'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Your message should be at least 10 characters.'
  }

  return errors
}

function Contact() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) return

    setSent(true)
    setValues(emptyForm)
  }

  return (
    <section className="nx-container py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nx-cyan">
          Contact
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
          We would love to hear from you
        </h1>
        <p className="mt-3 text-nx-muted">
          Questions about a product, an order or setting up your smart home?
          Send us a message and we will get back to you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div className="space-y-4">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-2xl border border-nx-border bg-nx-card p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-nx-cyan/10 text-nx-cyan">
                <item.icon className="h-5 w-5" />
              </span>
              <div className="leading-snug">
                <p className="text-xs uppercase tracking-wider text-nx-muted">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1 block text-sm font-medium text-white transition hover:text-nx-cyan"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-medium text-white">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-nx-border bg-nx-card p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="h-14 w-14 text-emerald-400" />
              <h2 className="mt-5 font-display text-2xl font-bold text-white">
                Message sent
              </h2>
              <p className="mt-2 max-w-sm text-sm text-nx-muted">
                Thank you for contacting NEXORA. We will reply as soon as we
                can.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSent(false)}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  id="contact-name"
                  name="name"
                  label="Your name"
                  placeholder="Enter your name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <FormField
                  id="contact-email"
                  name="email"
                  type="email"
                  label="Your email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              <FormField
                id="contact-subject"
                name="subject"
                label="Subject"
                placeholder="How can we help?"
                value={values.subject}
                onChange={handleChange}
                error={errors.subject}
              />

              <FormField
                id="contact-message"
                name="message"
                as="textarea"
                rows={5}
                label="Message"
                placeholder="Tell us a little more..."
                value={values.message}
                onChange={handleChange}
                error={errors.message}
              />

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-nx-cyan px-8 text-sm font-semibold text-nx-bg transition hover:bg-white"
              >
                Send message
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact