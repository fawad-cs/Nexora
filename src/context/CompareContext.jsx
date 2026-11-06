import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { getProductById } from '../data/products'

const CompareContext = createContext(null)

export const MAX_COMPARE = 3

const toList = (value) => (Array.isArray(value) ? value : [])

export function CompareProvider({ children }) {
  const [stored, setStored] = useLocalStorage('nexora_compare', [])

  const ids = useMemo(() => toList(stored), [stored])

  const toggleCompare = useCallback(
    (productId) => {
      setStored((current) => {
        const list = toList(current)

        if (list.includes(productId)) {
          return list.filter((id) => id !== productId)
        }
        if (list.length >= MAX_COMPARE) {
          return list
        }
        return [...list, productId]
      })
    },
    [setStored]
  )

  const removeFromCompare = useCallback(
    (productId) => {
      setStored((current) => toList(current).filter((id) => id !== productId))
    },
    [setStored]
  )

  const clearCompare = useCallback(() => setStored([]), [setStored])

  const isInCompare = useCallback((productId) => ids.includes(productId), [ids])

  const items = useMemo(
    () => ids.map((id) => getProductById(id)).filter(Boolean),
    [ids]
  )

  const value = useMemo(
    () => ({
      items,
      compareCount: items.length,
      compareFull: items.length >= MAX_COMPARE,
      toggleCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
    }),
    [items, toggleCompare, removeFromCompare, clearCompare, isInCompare]
  )

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare must be used inside CompareProvider')
  }
  return context
}