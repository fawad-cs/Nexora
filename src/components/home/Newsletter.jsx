import { useState } from 'react'
import { Send } from 'lucide-react'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!emailPattern.test(email.trim())) {
      setStatus('error')
      return
    }

    setStatus('success')
    setEmail('')
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (status !== 'idle') setStatus('idle')
  }

  return (
    <section className="nx-container py-16 sm:py-20">
      <div className="rounded-3xl border border-nx-border bg-nx-card px-6 py-12 text-center sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nx-cyan">
          Newsletter
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Get smart home tips and early offers
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-nx-muted">
          Join the NEXORA list for new product news and subscriber-only deals.
          No spam, unsubscribe any time.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-full border border-nx-border bg-nx-surface px-5 text-sm text-white placeholder:text-nx-muted focus:border-nx-cyan focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-nx-cyan px-7 text-sm font-semibold text-nx-bg transition hover:bg-white"
          >
            Subscribe
            <Send className="h-4 w-4" />
          </button>
        </form>

        <p
          role="status"
          className={`mt-4 min-h-5 text-sm ${
            status === 'error'
              ? 'text-red-400'
              : status === 'success'
                ? 'text-emerald-400'
                : ''
          }`}
        >
          {status === 'error' && 'Please enter a valid email address.'}
          {status === 'success' && 'Thank you! You are on the list.'}
        </p>
      </div>
    </section>
  )
}

export default Newsletter