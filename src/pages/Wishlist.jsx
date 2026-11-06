import { Heart, Trash2 } from 'lucide-react'
import EmptyState from '../components/common/EmptyState'
import ProductGrid from '../components/product/ProductGrid'
import { useWishlist } from '../context/WishlistContext'

function Wishlist() {
  const { items, wishlistCount, clearWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <section className="nx-container py-12 sm:py-16">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          text="Tap the heart on any product to save it here for later."
          actionLabel="Browse products"
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
            Wishlist
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            Saved for later
          </h1>
          <p className="mt-2 text-nx-muted">
            {wishlistCount} {wishlistCount === 1 ? 'product' : 'products'}
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="inline-flex items-center gap-2 text-sm font-medium text-nx-muted transition hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
          Clear wishlist
        </button>
      </div>

      <ProductGrid products={items} />
    </section>
  )
}

export default Wishlist