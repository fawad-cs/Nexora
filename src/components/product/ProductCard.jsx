import { Link } from 'react-router-dom'
import { Heart, Scale, ShoppingBag } from 'lucide-react'
import Button from '../common/Button'
import ProductImage from './ProductImage'
import RatingStars from './RatingStars'
import { formatPrice, getDiscount } from '../../data/products'
import { getCategoryName } from '../../data/categories'
import { useCart, getMaxQty } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useCompare } from '../../context/CompareContext'

function ProductCard({ product }) {
  const { addToCart, getQty } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isInCompare, toggleCompare, compareFull } = useCompare()

  const wishlisted = isWishlisted(product.id)
  const inCompare = isInCompare(product.id)
  const compareDisabled = compareFull && !inCompare

  const qtyInCart = getQty(product.id)
  const atLimit = qtyInCart >= getMaxQty(product)

  const discount = getDiscount(product)

  const stockText = !product.inStock
    ? 'Out of stock'
    : product.stockCount <= 5
      ? `Only ${product.stockCount} left`
      : 'In stock'

  const stockColor = !product.inStock
    ? 'text-red-400'
    : product.stockCount <= 5
      ? 'text-amber-400'
      : 'text-emerald-400'

  const cartLabel = !product.inStock
    ? 'Sold Out'
    : atLimit
      ? 'Max in Cart'
      : qtyInCart > 0
        ? `In Cart (${qtyInCart})`
        : 'Add to Cart'

  const compareTitle = compareDisabled
    ? 'Compare list is full (max 3)'
    : inCompare
      ? 'Remove from compare'
      : 'Add to compare'

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-nx-border bg-nx-card transition hover:border-nx-cyan/60">
      <div className="relative">
        <Link
          to={`/product/${product.id}`}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <ProductImage product={product} className="aspect-square" />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-nx-cyan px-2.5 py-1 text-[11px] font-bold text-nx-bg">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-nx-blue px-2.5 py-1 text-[11px] font-bold text-white">
              New
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-nx-border bg-nx-bg/70 backdrop-blur transition hover:border-nx-cyan ${
            wishlisted ? 'text-rose-400' : 'text-white'
          }`}
        >
          <Heart className={`h-[18px] w-[18px] ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-nx-cyan">
          {getCategoryName(product.category)}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="mt-1.5 font-display text-sm font-semibold leading-snug text-white transition hover:text-nx-cyan sm:text-base"
        >
          {product.name}
        </Link>

        <RatingStars
          rating={product.rating}
          reviews={product.reviews}
          className="mt-2"
        />

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-lg font-bold text-white sm:text-xl">
            {formatPrice(product.price)}
          </span>
          {product.previousPrice > product.price && (
            <span className="text-sm text-nx-muted line-through">
              {formatPrice(product.previousPrice)}
            </span>
          )}
        </div>

        <p className={`mt-1 text-xs font-medium ${stockColor}`}>{stockText}</p>

        <div className="mt-auto flex gap-2 pt-4">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => addToCart(product.id)}
            disabled={!product.inStock || atLimit}
          >
            <ShoppingBag className="h-4 w-4" />
            {cartLabel}
          </Button>

          <button
            type="button"
            onClick={() => toggleCompare(product.id)}
            disabled={compareDisabled}
            aria-label={compareTitle}
            aria-pressed={inCompare}
            title={compareTitle}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 ${
              inCompare
                ? 'border-nx-cyan bg-nx-cyan/15 text-nx-cyan'
                : 'border-nx-border text-nx-muted hover:border-nx-cyan hover:text-nx-cyan'
            }`}
          >
            <Scale className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard