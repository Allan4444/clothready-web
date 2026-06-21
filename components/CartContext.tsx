'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface CartCtx { count: number; addItem: (n?: number) => void }
const CartContext = createContext<CartCtx>({ count: 0, addItem: () => {} })

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  const addItem = useCallback((n = 1) => setCount(c => c + n), [])
  return <CartContext.Provider value={{ count, addItem }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
