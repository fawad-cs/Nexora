import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import ProductImage from '../product/ProductImage'
import QuantitySelector from '../product/QuantitySelector'
import { formatPrice } from '../../data/products'
import { getCategoryName } from '../../data/categories'
import { getMaxQty } from '../../context/CartContext'

function CartItem({ item, onQtyChange, onRemove }) {
  const { product, qty } = item

  return (
    <li className="flex gap-4 rounded-2xl border border-nx-border bg-nx-card p-4 sm:gap-5 sm:p-5">
      <Link to={`/product/${product.id}`} className="w-24 shrink-0 sm:w-28">
        <ProductImage product={product} className="aspect-square rounded-xl" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-nx-cyan">
              {getCategoryName(product.category)}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="mt-1 block font-display text-sm font-semibold leading-snug text-white transition hover:text-nx-cyan sm:text-base"
            >
              {product.name}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Remove ${product.name} from cart`}
            title="Remove"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-nx-muted transition hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-1 text-sm text-nx-muted">
          {formatPrice(product.price)} each
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <QuantitySelector
            size="sm"
            value={qty}
            min={1}
            max={getMaxQty(product)}
            onChange={(next) => onQtyChange(product.id, next)}
          />
          <p className="font-display text-lg font-bold text-white">
            {formatPrice(product.price * qty)}
          </p>
        </div>
      </div>
    </li>
  )
}

export default CartItem