import { SearchX } from 'lucide-react'
import ProductCard from './ProductCard'
import EmptyState from '../common/EmptyState'

function ProductGrid({
  products,
  gridClassName = 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
}) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No products found"
        text="Try a different search or choose another category."
        actionLabel="View all products"
        actionTo="/shop"
      />
    )
  }

  return (
    <div className={`grid gap-3 sm:gap-5 ${gridClassName}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid