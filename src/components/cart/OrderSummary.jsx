import { formatPrice } from '../../data/products'
import { useCart, FREE_SHIPPING_THRESHOLD } from '../../context/CartContext'

function OrderSummary({ showItems = false, children }) {
  const { items, subtotal, savings, shipping, orderTotal } = useCart()

  const remainingForFree = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  return (
    <aside className="h-fit rounded-2xl border border-nx-border bg-nx-card p-6 lg:sticky lg:top-28">
      <h2 className="font-display text-xl font-bold text-white">Order summary</h2>

      {showItems && (
        <ul className="mt-5 space-y-3 border-b border-nx-border pb-5">
          {items.map(({ product, qty }) => (
            <li key={product.id} className="flex justify-between gap-3 text-sm">
              <span className="text-nx-muted">
                {product.name} <span className="text-white">× {qty}</span>
              </span>
              <span className="shrink-0 text-white">
                {formatPrice(product.price * qty)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-nx-muted">Subtotal</dt>
          <dd className="text-white">{formatPrice(subtotal)}</dd>
        </div>

        {savings > 0 && (
          <div className="flex justify-between">
            <dt className="text-nx-muted">You save</dt>
            <dd className="text-emerald-400">-{formatPrice(savings)}</dd>
          </div>
        )}

        <div className="flex justify-between">
          <dt className="text-nx-muted">Shipping</dt>
          <dd className="text-white">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </dd>
        </div>

        <div className="flex justify-between border-t border-nx-border pt-4 text-base">
          <dt className="font-semibold text-white">Total</dt>
          <dd className="font-display text-xl font-bold text-nx-cyan">
            {formatPrice(orderTotal)}
          </dd>
        </div>
      </dl>

      {subtotal > 0 && remainingForFree > 0 && (
        <p className="mt-4 rounded-xl bg-nx-cyan/10 px-4 py-3 text-xs text-nx-cyan">
          Add {formatPrice(remainingForFree)} more to get free shipping.
        </p>
      )}

      {children && <div className="mt-6 space-y-3">{children}</div>}
    </aside>
  )
}

export default OrderSummary