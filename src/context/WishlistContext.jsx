import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { getProductById } from '../data/products'

const WishlistContext = createContext(null)

const toList = (value) => (Array.isArray(value) ? value : [])

export function WishlistProvider({ children }) {
  const [stored, setStored] = useLocalStorage('nexora_wishlist', [])

  const ids = useMemo(() => toList(stored), [stored])

  const toggleWishlist = useCallback(
    (productId) => {
      setStored((current) => {
        const list = toList(current)
        return list.includes(productId)
          ? list.filter((id) => id !== productId)
          : [...list, productId]
      })
    },
    [setStored]
  )

  const removeFromWishlist = useCallback(
    (productId) => {
      setStored((current) => toList(current).filter((id) => id !== productId))
    },
    [setStored]
  )

  const clearWishlist = useCallback(() => setStored([]), [setStored])

  const isWishlisted = useCallback((productId) => ids.includes(productId), [ids])

  const items = useMemo(
    () => ids.map((id) => getProductById(id)).filter(Boolean),
    [ids]
  )

  const value = useMemo(
    () => ({
      items,
      wishlistCount: items.length,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
      isWishlisted,
    }),
    [items, toggleWishlist, removeFromWishlist, clearWishlist, isWishlisted]
  )

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used inside WishlistProvider')
  }
  return context
}