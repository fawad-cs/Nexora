import { Search, X } from 'lucide-react'
import { categories } from '../../data/categories'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top rated' },
]

function pillClasses(active) {
  return `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
    active
      ? 'border-nx-cyan bg-nx-cyan text-nx-bg'
      : 'border-nx-border text-nx-muted hover:border-nx-cyan hover:text-white'
  }`
}

function ProductFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  resultCount,
  onClear,
}) {
  const hasFilters = Boolean(query) || Boolean(category) || sort !== 'featured'

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-nx-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="h-11 w-full rounded-full border border-nx-border bg-nx-surface pl-11 pr-4 text-sm text-white placeholder:text-nx-muted focus:border-nx-cyan focus:outline-none"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort products"
          className="h-11 rounded-full border border-nx-border bg-nx-surface px-4 text-sm text-white focus:border-nx-cyan focus:outline-none sm:w-56"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-nx-surface">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <button
          type="button"
          onClick={() => onCategoryChange('')}
          aria-pressed={!category}
          className={pillClasses(!category)}
        >
          All
        </button>

        {categories.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => onCategoryChange(item.slug)}
            aria-pressed={category === item.slug}
            className={pillClasses(category === item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <p className="text-nx-muted">
          {resultCount} {resultCount === 1 ? 'product' : 'products'}
        </p>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 font-medium text-nx-cyan transition hover:text-white"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductFilters