import { useState } from 'react'
import { CheckCircle2, ShoppingBag } from 'lucide-react'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import FormField from '../components/common/FormField'
import OrderSummary from '../components/cart/OrderSummary'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'Pakistan',
  payment: 'cod',
  notes: '',
}

const countries = [
  'Pakistan',
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'Canada',
]

const paymentOptions = [
  {
    value: 'cod',
    label: 'Cash on delivery',
    text: 'Pay in cash when your order arrives.',
  },
  {
    value: 'bank',
    label: 'Bank transfer',
    text: 'We will send you the bank details after you place the order.',
  },
]

const fieldOrder = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode']

function validate(values) {
  const errors = {}

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.'
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  const phone = values.phone.trim()
  const digits = phone.replace(/\D/g, '')
  if (!/^[+()\-\s\d]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (values.address.trim().length < 5) {
    errors.address = 'Please enter your full street address.'
  }

  if (values.city.trim().length < 2) {
    errors.city = 'Please enter your city.'
  }

  if (!/^[A-Za-z0-9\- ]{3,10}$/.test(values.postalCode.trim())) {
    errors.postalCode = 'Please enter a valid postal code.'
  }

  return errors
}

function Checkout() {
  const { items, subtotal, shipping, orderTotal, clearCart } = useCart()

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

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

    const firstInvalid = fieldOrder.find((name) => found[name])
    if (firstInvalid) {
      document.getElementById(`checkout-${firstInvalid}`)?.focus()
      return
    }

    // cart khali karne se pehle order ka snapshot rakh lo
    setOrder({
      number: `NX-${Date.now().toString().slice(-8)}`,
      name: values.fullName.trim(),
      email: values.email.trim(),
      payment: paymentOptions.find((option) => option.value === values.payment),
      items,
      shipping,
      orderTotal,
    })

    clearCart()
    window.scrollTo(0, 0)
  }

  // Order ho gaya: success page
  if (order) {
    return (
      <section className="nx-container py-12 sm:py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-nx-border bg-nx-card p-6 text-center sm:p-10">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
          <h1 className="mt-5 font-display text-3xl font-bold text-white">
            Thank you, {order.name.split(' ')[0]}!
          </h1>
          <p className="mt-3 text-nx-muted">
            Your order has been placed. A confirmation will be sent to{' '}
            <span className="text-white">{order.email}</span>.
          </p>

          <p className="mt-6 inline-block rounded-full border border-nx-cyan/40 bg-nx-cyan/10 px-5 py-2 text-sm font-semibold text-nx-cyan">
            Order {order.number}
          </p>

          <ul className="mt-8 space-y-3 border-t border-nx-border pt-6 text-left text-sm">
            {order.items.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="text-nx-muted">
                  {product.name} <span className="text-white">× {qty}</span>
                </span>
                <span className="shrink-0 text-white">
                  {formatPrice(product.price * qty)}
                </span>
              </li>
            ))}
            <li className="flex justify-between border-t border-nx-border pt-3">
              <span className="text-nx-muted">Shipping</span>
              <span className="text-white">
                {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
              </span>
            </li>
            <li className="flex justify-between text-base">
              <span className="font-semibold text-white">Total</span>
              <span className="font-display text-xl font-bold text-nx-cyan">
                {formatPrice(order.orderTotal)}
              </span>
            </li>
          </ul>

          <p className="mt-6 text-sm text-nx-muted">
            Payment: {order.payment?.label}. This is a demo store, so no real
            payment was taken.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/shop" size="lg">
              Continue shopping
            </Button>
            <Button to="/" variant="outline" size="lg">
              Back to home
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="nx-container py-12 sm:py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          text="Add some products to your cart before checking out."
          actionLabel="Start shopping"
          actionTo="/shop"
        />
      </section>
    )
  }

  return (
    <section className="nx-container py-10 sm:py-14">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nx-cyan">
          Checkout
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
          Complete your order
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
        >
          <div className="rounded-2xl border border-nx-border bg-nx-card p-6">
            <h2 className="font-display text-lg font-semibold text-white">
              1. Contact details
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <FormField
                id="checkout-fullName"
                name="fullName"
                label="Full name"
                placeholder="Your full name"
                autoComplete="name"
                value={values.fullName}
                onChange={handleChange}
                error={errors.fullName}
                className="sm:col-span-2"
              />
              <FormField
                id="checkout-email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <FormField
                id="checkout-phone"
                name="phone"
                type="tel"
                label="Phone"
                placeholder="+92 300 1234567"
                autoComplete="tel"
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-nx-border bg-nx-card p-6">
            <h2 className="font-display text-lg font-semibold text-white">
              2. Shipping address
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <FormField
                id="checkout-address"
                name="address"
                label="Street address"
                placeholder="House, street, area"
                autoComplete="street-address"
                value={values.address}
                onChange={handleChange}
                error={errors.address}
                className="sm:col-span-2"
              />
              <FormField
                id="checkout-city"
                name="city"
                label="City"
                autoComplete="address-level2"
                value={values.city}
                onChange={handleChange}
                error={errors.city}
              />
              <FormField
                id="checkout-state"
                name="state"
                label="State / Province (optional)"
                autoComplete="address-level1"
                value={values.state}
                onChange={handleChange}
              />
              <FormField
                id="checkout-postalCode"
                name="postalCode"
                label="Postal code"
                autoComplete="postal-code"
                value={values.postalCode}
                onChange={handleChange}
                error={errors.postalCode}
              />
              <FormField
                id="checkout-country"
                name="country"
                as="select"
                label="Country"
                autoComplete="country-name"
                value={values.country}
                onChange={handleChange}
              >
                {countries.map((country) => (
                  <option key={country} value={country} className="bg-nx-surface">
                    {country}
                  </option>
                ))}
              </FormField>
              <FormField
                id="checkout-notes"
                name="notes"
                as="textarea"
                rows={3}
                label="Order notes (optional)"
                placeholder="Delivery instructions, landmarks..."
                value={values.notes}
                onChange={handleChange}
                className="sm:col-span-2"
              />
            </div>
          </div>

          <fieldset className="rounded-2xl border border-nx-border bg-nx-card p-6">
            <legend className="px-2 font-display text-lg font-semibold text-white">
              3. Payment method
            </legend>
            <div className="mt-3 space-y-3">
              {paymentOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    values.payment === option.value
                      ? 'border-nx-cyan bg-nx-cyan/5'
                      : 'border-nx-border hover:border-nx-cyan/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={values.payment === option.value}
                    onChange={handleChange}
                    className="mt-1 accent-nx-cyan"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-nx-muted">
                      {option.text}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <OrderSummary showItems>
          <Button
            type="submit"
            form="checkout-form"
            size="lg"
            className="w-full"
          >
            Place order · {formatPrice(orderTotal)}
          </Button>
          <Button to="/cart" variant="outline" className="w-full">
            Back to cart
          </Button>
          <p className="text-center text-xs text-nx-muted">
            Demo store: no real payment is taken.
          </p>
        </OrderSummary>
      </div>
    </section>
  )
}

export default Checkout