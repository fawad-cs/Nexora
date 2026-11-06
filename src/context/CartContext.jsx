import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { getProductById } from '../data/products'

const CartContext = createContext(null)

export const MAX_QTY = 10
export const FREE_SHIPPING_THRESHOLD = 99
export const SHIPPING_FEE = 9.99

export const getMaxQty = (product) => Math.min(product.stockCount, MAX_QTY)

const toList = (value) => (Array.isArray(value) ? value : [])
const round2 = (value) => Math.round(value * 100) / 100

export function CartProvider({ children }) {
  const [stored, setStored] = useLocalStorage('nexora_cart', [])

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      const product = getProductById(productId)
      if (!product || !product.inStock) return

      const limit = getMaxQty(product)

      setStored((current) => {
        const list = toList(current)
        const existing = list.find((entry) => entry.id === product.id)

        if (existing) {
          return list.map((entry) =>
            entry.id === product.id
              ? { ...entry, qty: Math.min(entry.qty + quantity, limit) }
              : entry
          )
        }

        return [...list, { id: product.id, qty: Math.min(quantity, limit) }]
      })
    },
    [setStored]
  )

  const updateQty = useCallback(
    (productId, quantity) => {
      const product = getProductById(productId)
      if (!product) return

      const next = Math.max(1, Math.min(quantity, getMaxQty(product)))

      setStored((current) =>
        toList(current).map((entry) =>
          entry.id === product.id ? { ...entry, qty: next } : entry
        )
      )
    },
    [setStored]
  )

  const removeFromCart = useCallback(
    (productId) => {
      setStored((current) =>
        toList(current).filter((entry) => String(entry.id) !== String(productId))
      )
    },
    [setStored]
  )

  const clearCart = useCallback(() => setStored([]), [setStored])

  const items = useMemo(
    () =>
      toList(stored)
        .map((entry) => {
          const product = getProductById(entry.id)
          if (!product || !product.inStock) return null

          const qty = Math.max(1, Math.min(entry.qty, getMaxQty(product)))
          return { product, qty }
        })
        .filter(Boolean),
    [stored]
  )

  const getQty = useCallback(
    (productId) =>
      items.find((item) => String(item.product.id) === String(productId))?.qty ?? 0,
    [items]
  )

  const value = useMemo(() => {
    const cartCount = items.reduce((sum, item) => sum + item.qty, 0)
    const subtotal = round2(
      items.reduce((sum, item) => sum + item.product.price * item.qty, 0)
    )
    const savings = round2(
      items.reduce(
        (sum, item) =>
          sum + (item.product.previousPrice - item.product.price) * item.qty,
        0
      )
    )
    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
    const orderTotal = round2(subtotal + shipping)

    return {
      items,
      cartCount,
      subtotal,
      savings,
      shipping,
      orderTotal,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      getQty,
    }
  }, [items, addToCart, updateQty, removeFromCart, clearCart, getQty])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}