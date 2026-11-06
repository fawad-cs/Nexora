import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductFilters from '../components/product/ProductFilters'
import ProductGrid from '../components/product/ProductGrid'
import { products } from '../data/products'
import { categories, getCategoryName } from '../data/categories'

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('category') ?? ''
  const sort = searchParams.get('sort') ?? 'featured'

  // galat category (jaise ?category=abc) ho to use ignore kar do
  const category = categories.some((item) => item.slug === categoryParam)
    ? categoryParam
    : ''

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    setSearchParams(next, { replace: true })
  }

  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase()

    const list = products.filter((product) => {
      const matchesCategory = !category || product.category === category
      const matchesQuery =
        !term ||
        [product.name, product.description, getCategoryName(product.category)].some(
          (text) => text.toLowerCase().includes(term)
        )
      return matchesCategory && matchesQuery
    })

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return list
  }, [query, category, sort])

  return (
    <section className="nx-container py-10 sm:py-14">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nx-cyan">
          Shop
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
          {category ? getCategoryName(category) : 'All products'}
        </h1>
        {query.trim() && (
          <p className="mt-2 text-nx-muted">
            Results for &ldquo;{query.trim()}&rdquo;
          </p>
        )}
      </div>

      <ProductFilters
        query={query}
        onQueryChange={(value) => updateParam('q', value)}
        category={category}
        onCategoryChange={(value) => updateParam('category', value)}
        sort={sort}
        onSortChange={(value) =>
          updateParam('sort', value === 'featured' ? '' : value)
        }
        resultCount={visibleProducts.length}
        onClear={() => setSearchParams({}, { replace: true })}
      />

      <div className="mt-8">
        <ProductGrid products={visibleProducts} />
      </div>
    </section>
  )
}

export default Shop