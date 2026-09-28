import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { cartReducer, initialCartState, cartCount } from '../reducers/cartReducer';
const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const value = useMemo(() => ({ state, dispatch, count: cartCount(state.items) }), [state]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider.');
  return value;
}
