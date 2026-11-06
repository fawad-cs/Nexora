import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Heart,
  Scale,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  PackageSearch,
} from 'lucide-react'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import SectionHeading from '../components/common/SectionHeading'
import ProductImage from '../components/product/ProductImage'
import ProductGrid from '../components/product/ProductGrid'
import QuantitySelector from '../components/product/QuantitySelector'
import RatingStars from '../components/product/RatingStars'
import {
  products,
  getProductById,
  formatPrice,
  getDiscount,
} from '../data/products'
import { getCategoryName } from '../data/categories'
import { useCart, getMaxQty } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useCompare } from '../context/CompareContext'

const perks = [
  { icon: Truck, text: 'Free shipping on orders over $99' },
  { icon: ShieldCheck, text: 'Warranty included' },
  { icon: RotateCcw, text: '30-day returns' },
]

function ProductView({ product }) {
  const [quantity, setQuantity] = useState(1)

  const { addToCart, getQty } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isInCompare, toggleCompare, compareFull } = useCompare()

  const wishlisted = isWishlisted(product.id)
  const inCompare = isInCompare(product.id)
  const compareDisabled = compareFull && !inCompare

  const qtyInCart = getQty(product.id)
  const remaining = Math.max(getMaxQty(product) - qtyInCart, 0)
  const canAdd = product.inStock && remaining > 0
  const safeQuantity = Math.min(quantity, Math.max(remaining, 1))

  const handleAddToCart = () => {
    addToCart(product.id, safeQuantity)
    setQuantity(1)
  }

  const discount = getDiscount(product)

  const stockText = !product.inStock
    ? 'Out of stock'
    : product.stockCount <= 5
      ? `Only ${product.stockCount} left in stock`
      : 'In stock'

  const stockColor = !product.inStock
    ? 'text-red-400'
    : product.stockCount <= 5
      ? 'text-amber-400'
      : 'text-emerald-400'

  const cartLabel = !product.inStock
    ? 'Sold Out'
    : remaining === 0
      ? 'Maximum in cart'
      : 'Add to Cart'

  const related = [
    ...products.filter(
      (item) => item.category === product.category && item.id !== product.id
    ),
    ...products.filter((item) => item.category !== product.category),
  ].slice(0, 4)

  return (
    <div className="nx-container py-8 sm:py-12">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-nx-muted"
      >
        <Link to="/" className="transition hover:text-nx-cyan">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/shop" className="transition hover:text-nx-cyan">Shop</Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          to={`/shop?category=${product.category}`}
          className="transition hover:text-nx-cyan"
        >
          {getCategoryName(product.category)}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative">
          <ProductImage
            product={product}
            className="aspect-square rounded-3xl border border-nx-border"
          />
          <div className="absolute left-4 top-4 flex flex-col items-start gap-1.5">
            {discount > 0 && (
              <span className="rounded-full bg-nx-cyan px-3 py-1 text-xs font-bold text-nx-bg">
                -{discount}%
              </span>
            )}
            {product.isNew && (
              <span className="rounded-full bg-nx-blue px-3 py-1 text-xs font-bold text-white">
                New
              </span>
            )}
          </div>
        </div>

        <div>
          <Link
            to={`/shop?category=${product.category}`}
            className="text-xs font-semibold uppercase tracking-wider text-nx-cyan"
          >
            {getCategoryName(product.category)}
          </Link>

          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            {product.name}
          </h1>

          <RatingStars
            rating={product.rating}
            reviews={product.reviews}
            className="mt-4"
          />

          <div className="mt-5 flex flex-wrap items-baseline gap-x-3">
            <span className="font-display text-4xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.previousPrice > product.price && (
              <span className="text-lg text-nx-muted line-through">
                {formatPrice(product.previousPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-nx-muted">
            {product.description}
          </p>

          <p className={`mt-5 text-sm font-semibold ${stockColor}`}>{stockText}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {canAdd && (
              <QuantitySelector
                value={safeQuantity}
                onChange={setQuantity}
                min={1}
                max={remaining}
              />
            )}

            <Button
              size="lg"
              className="min-w-48 flex-1 sm:flex-none"
              onClick={handleAddToCart}
              disabled={!canAdd}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartLabel}
            </Button>
          </div>

          {qtyInCart > 0 && (
            <p className="mt-3 text-sm text-nx-muted">
              {qtyInCart} in your cart ·{' '}
              <Link to="/cart" className="font-medium text-nx-cyan hover:text-white">
                View cart
              </Link>
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => toggleWishlist(product.id)}>
              <Heart
                className={`h-4 w-4 ${wishlisted ? 'fill-current text-rose-400' : ''}`}
              />
              {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
            </Button>

            <Button
              variant="outline"
              onClick={() => toggleCompare(product.id)}
              disabled={compareDisabled}
              title={compareDisabled ? 'Compare list is full (max 3)' : undefined}
            >
              <Scale className={`h-4 w-4 ${inCompare ? 'text-nx-cyan' : ''}`} />
              {inCompare ? 'In Compare' : 'Compare'}
            </Button>
          </div>

          <ul className="mt-8 space-y-3 border-t border-nx-border pt-6">
            {perks.map((perk) => (
              <li key={perk.text} className="flex items-center gap-3 text-sm text-nx-text">
                <perk.icon className="h-5 w-5 shrink-0 text-nx-cyan" />
                {perk.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-white">
          Specifications
        </h2>
        <dl className="mt-6 overflow-hidden rounded-2xl border border-nx-border bg-nx-card">
          {Object.entries(product.specifications).map(([label, value], index) => (
            <div
              key={label}
              className={`grid gap-1 px-5 py-4 text-sm sm:grid-cols-[14rem_1fr] sm:gap-4 ${
                index > 0 ? 'border-t border-nx-border' : ''
              }`}
            >
              <dt className="font-medium text-nx-muted">{label}</dt>
              <dd className="text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Related"
          title="You may also like"
          linkTo="/shop"
          linkLabel="Shop all products"
        />
        <ProductGrid
          products={related}
          gridClassName="grid-cols-2 lg:grid-cols-4"
        />
      </section>
    </div>
  )
}

function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)

  if (!product) {
    return (
      <section className="nx-container py-16">
        <EmptyState
          icon={PackageSearch}
          title="Product not found"
          text="This product does not exist or may have been removed."
          actionLabel="Back to shop"
          actionTo="/shop"
        />
      </section>
    )
  }

  // key badalne se jab user related product kholta hai, quantity dobara 1 se shuru hoti hai
  return <ProductView key={product.id} product={product} />
}

export default ProductDetails