'use client'
import { createContext, useContext, useState, useCallback } from 'react'

export interface CartItem {
  id: string
  name: string
  sku: string
  color: string
  size: string
  qty: number
  price: number
  img: string
}

interface CartCtx {
  items: CartItem[]
  count: number
  addItem: (item: CartItem) => void
  updateQty: (index: number, qty: number) => void
  removeItem: (index: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartCtx>({
  items: [], count: 0,
  addItem: () => {},
  updateQty: () => {},
  removeItem: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const count = items.reduce((s, i) => s + i.qty, 0)

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id && i.color === item.color && i.size === item.size)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty }
        return next
      }
      return [...prev, item]
    })
  }, [])

  const updateQty = useCallback((index: number, qty: number) => {
    setItems(prev => {
      if (qty <= 0) return prev.filter((_, i) => i !== index)
      const next = [...prev]
      next[index] = { ...next[index], qty }
      return next
    })
  }, [])

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, count, addItem, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
