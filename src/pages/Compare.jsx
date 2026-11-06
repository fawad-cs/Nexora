import { Link } from 'react-router-dom'
import { Scale, ShoppingBag, X } from 'lucide-react'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import ProductImage from '../components/product/ProductImage'
import RatingStars from '../components/product/RatingStars'
import { formatPrice } from '../data/products'
import { getCategoryName } from '../data/categories'
import { useCompare, MAX_COMPARE } from '../context/CompareContext'
import { useCart } from '../context/CartContext'

function availability(product) {
  if (!product.inStock) return <span className="text-red-400">Out of stock</span>
  if (product.stockCount <= 5) {
    return <span className="text-amber-400">Only {product.stockCount} left</span>
  }
  return <span className="text-emerald-400">In stock</span>
}

function Compare() {
  const { items, removeFromCompare, clearCompare } = useCompare()
  const { addToCart } = useCart()

  if (items.length === 0) {
    return (
      <section className="nx-container py-12 sm:py-16">
        <EmptyState
          icon={Scale}
          title="Nothing to compare yet"
          text={`Tap the compare icon on up to ${MAX_COMPARE} products and see their specifications side by side.`}
          actionLabel="Browse products"
          actionTo="/shop"
        />
      </section>
    )
  }

  const specKeys = [
    ...new Set(items.flatMap((product) => Object.keys(product.specifications))),
  ]

  const rows = [
    {
      label: 'Price',
      render: (p) => (
        <span className="font-display text-lg font-bold text-white">
          {formatPrice(p.price)}
        </span>
      ),
    },
    {
      label: 'Rating',
      render: (p) => <RatingStars rating={p.rating} reviews={p.reviews} />,
    },
    { label: 'Category', render: (p) => getCategoryName(p.category) },
    { label: 'Availability', render: (p) => availability(p) },
    ...specKeys.map((key) => ({
      label: key,
      render: (p) => p.specifications[key] ?? '-',
    })),
  ]

  return (
    <section className="nx-container py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nx-cyan">
            Compare
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            Compare products
          </h1>
          <p className="mt-2 text-nx-muted">
            {items.length} of {MAX_COMPARE} selected
            {items.length === 1 && '. Add at least one more to compare.'}
          </p>
        </div>

        <button
          type="button"
          onClick={clearCompare}
          className="inline-flex items-center gap-2 text-sm font-medium text-nx-muted transition hover:text-red-400"
        >
          <X className="h-4 w-4" />
          Clear all
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-nx-border bg-nx-card">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead>
            <tr>
              <td className="sticky left-0 z-10 w-36 bg-nx-card sm:w-44" />
              {items.map((product) => (
                <th
                  key={product.id}
                  scope="col"
                  className="min-w-52 border-l border-nx-border p-4 align-top font-normal"
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => removeFromCompare(product.id)}
                      aria-label={`Remove ${product.name} from compare`}
                      className="absolute right-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-nx-border bg-nx-bg/80 text-nx-muted transition hover:border-red-400 hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <Link to={`/product/${product.id}`} className="block">
                      <ProductImage
                        product={product}
                        className="mx-auto aspect-square w-full max-w-40 rounded-xl"
                      />
                    </Link>

                    <Link
                      to={`/product/${product.id}`}
                      className="mt-3 block font-display text-sm font-semibold leading-snug text-white transition hover:text-nx-cyan"
                    >
                      {product.name}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-nx-border">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-nx-card px-4 py-4 text-xs font-semibold uppercase tracking-wider text-nx-muted"
                >
                  {row.label}
                </th>
                {items.map((product) => (
                  <td
                    key={product.id}
                    className="border-l border-nx-border px-4 py-4 align-top text-white"
                  >
                    {row.render(product)}
                  </td>
                ))}
              </tr>
            ))}

            <tr className="border-t border-nx-border">
              <th scope="row" className="sticky left-0 z-10 bg-nx-card px-4 py-4" />
              {items.map((product) => (
                <td
                  key={product.id}
                  className="border-l border-nx-border px-4 py-4"
                >
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {product.inStock ? 'Add to Cart' : 'Sold Out'}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Compare