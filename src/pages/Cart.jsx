import { ShoppingBag, Trash2 } from 'lucide-react'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import CartItem from '../components/cart/CartItem'
import OrderSummary from '../components/cart/OrderSummary'
import { useCart } from '../context/CartContext'

function Cart() {
  const { items, cartCount, updateQty, removeFromCart, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <section className="nx-container py-12 sm:py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          text="Looks like you have not added anything yet. Explore our smart devices and find something you love."
          actionLabel="Start shopping"
          actionTo="/shop"
        />
      </section>
    )
  }

  return (
    <section className="nx-container py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nx-cyan">
            Cart
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            Your shopping cart
          </h1>
          <p className="mt-2 text-nx-muted">
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-2 text-sm font-medium text-nx-muted transition hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <ul className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onQtyChange={updateQty}
              onRemove={removeFromCart}
            />
          ))}
        </ul>

        <OrderSummary>
          <Button to="/checkout" size="lg" className="w-full">
            Proceed to Checkout
          </Button>
          <Button to="/shop" variant="outline" className="w-full">
            Continue shopping
          </Button>
        </OrderSummary>
      </div>
    </section>
  )
}

export default Cart