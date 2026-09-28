import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OrdersContext = createContext(null);
const KEY = 'restaurant.orders.v1';
const reducer = (state, action) => {
  switch (action.type) {
    case 'HYDRATE': return action.orders;
    case 'CREATE': return [action.order, ...state];
    case 'STATUS': return state.map((order) => order.id === action.id ? { ...order, status: action.status, updatedAt: new Date().toISOString() } : order);
    case 'CLEAR': return [];
    default: return state;
  }
};
export function OrdersProvider({ children }) {
  const [orders, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { let active = true; AsyncStorage.getItem(KEY).then((raw) => { if (!active) return; if (raw) dispatch({ type:'HYDRATE', orders:JSON.parse(raw) }); }).catch(() => {}).finally(() => { if (active) setHydrated(true); }); return () => { active = false; }; }, []);
  useEffect(() => { if (hydrated) AsyncStorage.setItem(KEY, JSON.stringify(orders)).catch(() => {}); }, [orders, hydrated]);
  const value = useMemo(() => ({ orders, dispatch, hydrated }), [orders, hydrated]);
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}
export function useOrders() { const value = useContext(OrdersContext); if (!value) throw new Error('useOrders must be used inside OrdersProvider.'); return value; }
